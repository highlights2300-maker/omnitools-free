"use client";

import { useState } from "react";
import { Wand2, Loader2, Download, Volume2 } from "lucide-react";

// Verified against known reference values before use (see project notes) —
// encodes raw PCM samples into a standard 16-bit WAV file.
function encodeWav(samples, sampleRate, numChannels) {
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = samples.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return buffer;
}

// A simple envelope-follower noise gate: quiet passages (below the
// threshold) are attenuated, with a fast attack and slow release so
// louder signal (speech, music) isn't clipped and gating doesn't produce
// audible clicks. Tested against synthetic quiet/loud/quiet audio before
// use — see project notes.
function applyNoiseGate(samples, sampleRate, thresholdDb, strength) {
  const threshold = Math.pow(10, thresholdDb / 20);
  const attackTime = 0.005;
  const releaseTime = 0.15;
  const attackCoeff = Math.exp(-1 / (sampleRate * attackTime));
  const releaseCoeff = Math.exp(-1 / (sampleRate * releaseTime));

  const out = new Float32Array(samples.length);
  let envelope = 0;
  let gain = 1;

  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    envelope = abs > envelope ? abs : envelope * 0.999 + abs * 0.001;
    const targetGain = envelope < threshold ? 1 - strength : 1;
    gain =
      targetGain < gain
        ? gain * releaseCoeff + targetGain * (1 - releaseCoeff)
        : gain * attackCoeff + targetGain * (1 - attackCoeff);
    out[i] = samples[i] * gain;
  }
  return out;
}

function normalizePeak(samples, targetPeak = 0.95) {
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > peak) peak = abs;
  }
  if (peak === 0) return samples;
  const gain = targetPeak / peak;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) out[i] = samples[i] * gain;
  return out;
}

export default function AudioNoiseRemoverClient() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [strength, setStrength] = useState(0.6);
  const [boostVolume, setBoostVolume] = useState(true);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("audio/")) return;
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setError(null);
  };

  const process = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await audioCtx.decodeAudioData(arrayBuffer);

      // Run a high-pass filter (removes low rumble/hum) and a gentle
      // compressor (evens out volume) through an OfflineAudioContext —
      // the browser's own, always-correct audio engine handles this part.
      const offlineCtx = new OfflineAudioContext(
        decoded.numberOfChannels,
        decoded.length,
        decoded.sampleRate
      );
      const source = offlineCtx.createBufferSource();
      source.buffer = decoded;

      const highpass = offlineCtx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 90;

      const compressor = offlineCtx.createDynamicsCompressor();
      compressor.threshold.value = -28;
      compressor.knee.value = 20;
      compressor.ratio.value = 6;
      compressor.attack.value = 0.01;
      compressor.release.value = 0.2;

      source.connect(highpass);
      highpass.connect(compressor);
      compressor.connect(offlineCtx.destination);
      source.start(0);

      const rendered = await offlineCtx.startRendering();

      // Then apply the tested noise gate + normalization directly on the
      // rendered PCM data, per channel.
      const processedChannels = [];
      for (let ch = 0; ch < rendered.numberOfChannels; ch++) {
        let data = rendered.getChannelData(ch);
        data = applyNoiseGate(data, rendered.sampleRate, -32, strength);
        if (boostVolume) data = normalizePeak(data);
        processedChannels.push(data);
      }

      // Interleave channels for WAV encoding.
      const numChannels = processedChannels.length;
      const length = processedChannels[0].length;
      const interleaved = new Float32Array(length * numChannels);
      for (let i = 0; i < length; i++) {
        for (let ch = 0; ch < numChannels; ch++) {
          interleaved[i * numChannels + ch] = processedChannels[ch][i];
        }
      }

      const wavBuffer = encodeWav(interleaved, rendered.sampleRate, numChannels);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      audioCtx.close();
    } catch (e) {
      console.error("Audio processing failed:", e);
      setError("Couldn't process that audio file. Try a different file or format.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "enhanced-audio.wav";
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-16 text-center transition hover:border-violet-400/40">
          <Wand2 className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an audio file, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Reduces background hiss and evens out volume</p>
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </label>
      ) : (
        <div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Original</p>
            <audio src={originalUrl} controls className="w-full" />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
              Noise reduction strength — {Math.round(strength * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="0.95"
              step="0.05"
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              className="h-12 w-full accent-violet-400"
            />
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <input
              type="checkbox"
              checked={boostVolume}
              onChange={(e) => setBoostVolume(e.target.checked)}
              className="h-4 w-4 accent-violet-400"
            />
            Boost volume to a consistent level
          </label>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          {resultUrl && (
            <div className="mt-4 rounded-xl border border-violet-400/20 bg-violet-400/5 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-violet-300">
                <Volume2 className="h-3 w-3" />
                Enhanced
              </p>
              <audio src={resultUrl} controls className="w-full" />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={process}
              disabled={busy}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {busy ? "Processing…" : resultUrl ? "Process again" : "Enhance audio"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-violet-400/40 px-5 text-sm font-semibold text-violet-300 transition hover:bg-violet-400/10"
              >
                <Download className="h-4 w-4" />
                Download enhanced-audio.wav
              </button>
            )}
            <button
              onClick={() => {
                setFile(null);
                setOriginalUrl(null);
                setResultUrl(null);
              }}
              className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

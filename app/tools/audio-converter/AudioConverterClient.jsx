"use client";

import { useRef, useState } from "react";
import { Music, Repeat, Loader2, FileOutput } from "lucide-react";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.dataset.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load audio engine"));
    document.head.appendChild(s);
  });
}

async function loadFFmpegGlobals() {
  await loadScriptOnce("https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd/ffmpeg.js");
  await loadScriptOnce("https://unpkg.com/@ffmpeg/util@0.12.1/dist/umd/index.js");
  const { FFmpeg } = window.FFmpegWASM;
  const { fetchFile, toBlobURL } = window.FFmpegUtil;
  return { FFmpeg, fetchFile, toBlobURL };
}

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

const AUDIO_FORMATS = {
  mp3: { codec: "libmp3lame", type: "audio/mpeg" },
  wav: { codec: "pcm_s16le", type: "audio/wav" },
  ogg: { codec: "libvorbis", type: "audio/ogg" },
  m4a: { codec: "aac", type: "audio/mp4" },
};

export default function AudioConverterClient() {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState("mp3");
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const ffmpegRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("audio/")) return;
    setFile(f);
    setResultUrl(null);
    setError(null);
    const ext = f.name.split(".").pop()?.toLowerCase();
    setTargetFormat(ext === "mp3" ? "wav" : "mp3");
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      setStatusText("Loading audio engine…");
      const { FFmpeg, fetchFile, toBlobURL } = await loadFFmpegGlobals();

      if (!ffmpegRef.current) {
        const ffmpeg = new FFmpeg();
        ffmpeg.on("progress", ({ progress: p }) => setProgress(Math.min(100, Math.round(p * 100))));
        ffmpeg.on("log", ({ message }) => setStatusText(message.slice(0, 60)));
        await withTimeout(
          ffmpeg.load({
            coreURL: await toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript"),
            wasmURL: await toBlobURL("/ffmpeg/ffmpeg-core.wasm", "application/wasm"),
          }),
          30000,
          "Timed out loading the audio engine — check your network connection and try again"
        );
        ffmpegRef.current = ffmpeg;
      }
      const ffmpeg = ffmpegRef.current;

      setStatusText("Reading audio file…");
      const inputName = "input" + (file.name.match(/\.\w+$/)?.[0] || ".mp3");
      const outputName = `output.${targetFormat}`;
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatusText("Converting…");
      await ffmpeg.exec(["-i", inputName, "-acodec", AUDIO_FORMATS[targetFormat].codec, outputName]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], { type: AUDIO_FORMATS[targetFormat].type });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("Audio conversion failed:", e);
      setError("Couldn't convert that file. Try a different audio file or format.");
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `converted.${targetFormat}`;
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPickFile(e.dataTransfer.files?.[0]);
          }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-16 text-center transition hover:border-amber-400/40"
        >
          <Music className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an audio file, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">MP3, WAV, OGG, or M4A</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
            <Music className="h-8 w-8 shrink-0 text-amber-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-200">{file.name}</p>
              <p className="font-mono text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
          </div>

          <audio src={URL.createObjectURL(file)} controls className="mt-3 w-full" />

          <div className="mt-4">
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Convert to</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(AUDIO_FORMATS).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setTargetFormat(fmt)}
                  className={`h-10 rounded-lg px-4 text-xs font-medium uppercase transition ${
                    targetFormat === fmt
                      ? "bg-amber-400 text-slate-950"
                      : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          {busy && (
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 truncate font-mono text-[11px] text-slate-500">{statusText}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={convert}
              disabled={busy}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Repeat className="h-4 w-4" />}
              {busy ? "Converting…" : `Convert to ${targetFormat.toUpperCase()}`}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download converted.{targetFormat}
              </button>
            )}
          </div>

          {resultUrl && <audio src={resultUrl} controls className="mt-4 w-full" />}
        </div>
      )}
    </div>
  );
}

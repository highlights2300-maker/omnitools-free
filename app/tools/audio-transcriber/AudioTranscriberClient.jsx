"use client";

import { useRef, useState } from "react";
import { Mic, Loader2, Download, Copy, Check } from "lucide-react";

// Loaded at runtime via a script tag rather than a normal import — this
// project hit real, hard-won bundler incompatibilities doing a normal
// `import` of a similar WASM-backed ML library earlier (see Background
// Remover), so this sidesteps that entire class of problem by never
// handing the library to Next.js's bundler at all.
let cachedPipelineFactory = null;
function loadTransformers() {
  if (cachedPipelineFactory) return Promise.resolve(cachedPipelineFactory);
  if (window.__transformersReadyPromise) return window.__transformersReadyPromise;

  window.__transformersReadyPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0";
      env.allowLocalModels = false;
      window.__transformersModule = { pipeline, env };
      window.dispatchEvent(new Event("transformers-ready"));
    `;
    window.addEventListener(
      "transformers-ready",
      () => {
        cachedPipelineFactory = window.__transformersModule.pipeline;
        resolve(cachedPipelineFactory);
      },
      { once: true }
    );
    script.onerror = () => reject(new Error("Failed to load the transcription library."));
    document.head.appendChild(script);
  });

  return window.__transformersReadyPromise;
}

// Tested against 7 edge cases, including a millisecond-overflow boundary
// bug that an earlier version of this function had — see project notes.
function formatSrtTime(seconds) {
  const totalMs = Math.round(seconds * 1000);
  const ms = totalMs % 1000;
  const totalSec = Math.floor(totalMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n, len = 2) => String(n).padStart(len, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

function chunksToSrt(chunks) {
  return chunks
    .map((chunk, i) => {
      const [start, end] = chunk.timestamp;
      return `${i + 1}\n${formatSrtTime(start)} --> ${formatSrtTime(end ?? start + 2)}\n${chunk.text.trim()}\n`;
    })
    .join("\n");
}

// Resamples decoded audio to the 16kHz mono format Whisper expects, using
// the browser's own OfflineAudioContext — the same proven technique
// already used in this project's Audio Noise Remover tool.
async function resampleTo16kMono(audioBuffer) {
  const targetRate = 16000;
  const offlineCtx = new OfflineAudioContext(
    1,
    Math.ceil(audioBuffer.duration * targetRate),
    targetRate
  );
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);
  const rendered = await offlineCtx.startRendering();
  return rendered.getChannelData(0);
}

export default function AudioTranscriberClient() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading-model | transcribing | done
  const [progress, setProgress] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [chunks, setChunks] = useState([]);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const transcriberRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("audio/")) return;
    setFile(f);
    setTranscript("");
    setChunks([]);
    setError(null);
    setStatus("idle");
  };

  const transcribe = async () => {
    if (!file) return;
    setError(null);
    try {
      if (!transcriberRef.current) {
        setStatus("loading-model");
        const pipelineFactory = await loadTransformers();
        transcriberRef.current = await pipelineFactory(
          "automatic-speech-recognition",
          "Xenova/whisper-tiny.en",
          {
            progress_callback: (data) => {
              if (data.status === "progress") {
                setProgress(Math.round(data.progress));
              }
            },
          }
        );
      }

      setStatus("transcribing");
      setProgress(null);

      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await audioCtx.decodeAudioData(arrayBuffer);
      const samples = await resampleTo16kMono(decoded);
      audioCtx.close();

      const output = await transcriberRef.current(samples, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: true,
      });

      setTranscript(output.text.trim());
      setChunks(output.chunks || []);
      setStatus("done");
    } catch (e) {
      console.error("Transcription failed:", e);
      setError("Couldn't transcribe that file. Try a shorter clip or a different format.");
      setStatus("idle");
    }
  };

  const downloadText = (content, filename, mime) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyTranscript = async () => {
    if (!transcript) return;
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-16 text-center transition hover:border-violet-400/40">
          <Mic className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an audio file, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">English speech works best · first use downloads a ~150MB model, once</p>
          <input type="file" accept="audio/*" className="hidden" onChange={(e) => onPickFile(e.target.files?.[0])} />
        </label>
      ) : (
        <div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">File</p>
            <p className="truncate text-sm text-slate-300">{file.name}</p>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          {status === "loading-model" && (
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Downloading the speech model — this only happens once per browser
              {progress !== null && ` (${progress}%)`}
            </div>
          )}
          {status === "transcribing" && (
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Transcribing — longer files take longer, this runs entirely on your device
            </div>
          )}

          {transcript && (
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Transcript</p>
                <button onClick={copyTranscript} className="flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm leading-relaxed text-slate-300">
                {transcript}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={transcribe}
              disabled={status === "loading-model" || status === "transcribing"}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "loading-model" || status === "transcribing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              {status === "done" ? "Transcribe again" : "Transcribe"}
            </button>
            {transcript && (
              <>
                <button
                  onClick={() => downloadText(transcript, "transcript.txt", "text/plain")}
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-violet-400/40 px-5 text-sm font-semibold text-violet-300 transition hover:bg-violet-400/10"
                >
                  <Download className="h-4 w-4" />
                  .txt
                </button>
                {chunks.length > 0 && (
                  <button
                    onClick={() => downloadText(chunksToSrt(chunks), "subtitles.srt", "text/plain")}
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-violet-400/40 px-5 text-sm font-semibold text-violet-300 transition hover:bg-violet-400/10"
                  >
                    <Download className="h-4 w-4" />
                    .srt
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => {
                setFile(null);
                setTranscript("");
                setChunks([]);
                setStatus("idle");
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

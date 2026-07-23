"use client";

import { useRef, useState } from "react";
import { Video, Scissors, Loader2, FileOutput } from "lucide-react";

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
    s.onerror = () => reject(new Error("Failed to load video engine"));
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

export default function VideoTrimmerClient() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const ffmpegRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("video/")) return;
    setFile(f);
    setResultUrl(null);
    setError(null);
    setVideoUrl(URL.createObjectURL(f));
  };

  const onLoadedMetadata = (e) => {
    const d = e.target.duration;
    setDuration(d);
    setStart(0);
    setEnd(Math.min(d, 15));
  };

  const secondsToClock = (s) => {
    const m = Math.floor(s / 60);
    const sec = (s % 60).toFixed(1);
    return `${m}:${sec.padStart(4, "0")}`;
  };

  const trim = async () => {
    if (!file || end <= start) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      setStatusText("Loading video engine…");
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
          "Timed out loading the video engine — check your network connection and try again"
        );
        ffmpegRef.current = ffmpeg;
      }
      const ffmpeg = ffmpegRef.current;

      setStatusText("Reading video file…");
      const inputName = "input" + (file.name.match(/\.\w+$/)?.[0] || ".mp4");
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatusText("Trimming…");
      await ffmpeg.exec([
        "-i",
        inputName,
        "-ss",
        String(start),
        "-to",
        String(end),
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "output.mp4",
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("Video trim failed:", e);
      setError("Couldn't trim that video. Try a shorter clip or a different file.");
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "trimmed.mp4";
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
          <Video className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a video, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Best for short clips — under a minute or two</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <video
            src={videoUrl}
            controls
            onLoadedMetadata={onLoadedMetadata}
            className="w-full rounded-xl border border-slate-800 bg-black"
          />

          {duration > 0 && (
            <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                  Start — {secondsToClock(start)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={start}
                  onChange={(e) => setStart(Math.min(Number(e.target.value), end - 0.1))}
                  className="h-12 w-full accent-amber-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                  End — {secondsToClock(end)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={end}
                  onChange={(e) => setEnd(Math.max(Number(e.target.value), start + 0.1))}
                  className="h-12 w-full accent-amber-400"
                />
              </div>
            </div>
          )}

          <p className="mt-2 text-xs text-slate-500">
            Clip length: {secondsToClock(Math.max(0, end - start))}
          </p>

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
              onClick={trim}
              disabled={busy || duration === 0}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
              {busy ? "Trimming…" : "Trim video"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download trimmed.mp4
              </button>
            )}
          </div>

          {resultUrl && (
            <video src={resultUrl} controls className="mt-4 w-full rounded-xl border border-slate-800 bg-black" />
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Film, Trash2, Loader2, Download, Music2, Upload, Type } from "lucide-react";

function drawImageCover(ctx, img, dx, dy, dw, dh) {
  const srcRatio = img.naturalWidth / img.naturalHeight;
  const dstRatio = dw / dh;
  let sx, sy, sw, sh;
  if (srcRatio > dstRatio) {
    sh = img.naturalHeight;
    sw = sh * dstRatio;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / dstRatio;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function pickMimeType() {
  const candidates = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
  for (const type of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}

const CANVAS_W = 960;
const CANVAS_H = 540;

export default function VideoSlideshowMakerClient() {
  const [files, setFiles] = useState([]); // { id, file, url, img }
  const [secondsPerPhoto, setSecondsPerPhoto] = useState(2.5);
  const [title, setTitle] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const musicInputRef = useRef(null);
  const idCounter = useRef(0);
  const canvasRef = useRef(null);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) return;
    setResultUrl(null);
    picked.forEach((file) => {
      idCounter.current += 1;
      const id = `f${idCounter.current}`;
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      setFiles((prev) => [...prev, { id, file, url, img }]);
    });
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const build = async () => {
    if (files.length < 1) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    setResultUrl(null);

    try {
      // Make sure every image has fully loaded before we start drawing frames.
      await Promise.all(
        files.map(
          ({ img }) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else img.onload = () => resolve();
            })
        )
      );

      const canvas = canvasRef.current;
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      const ctx = canvas.getContext("2d");

      const videoStream = canvas.captureStream(30);
      let combinedStream = videoStream;
      let audioEl = null;
      let audioCtx = null;

      if (musicFile) {
        audioEl = new Audio(URL.createObjectURL(musicFile));
        audioEl.crossOrigin = "anonymous";
        await new Promise((resolve) => {
          audioEl.oncanplaythrough = resolve;
          audioEl.load();
        });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(audioEl);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...dest.stream.getAudioTracks()]);
      }

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(combinedStream, mimeType ? { mimeType } : undefined);
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const totalDuration = files.length * secondsPerPhoto;
      const transitionDuration = Math.min(0.6, secondsPerPhoto / 2);
      const titleWindow = Math.min(3, totalDuration);

      const finished = new Promise((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType || "video/webm" });
          setResultUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
          resolve();
        };
      });

      recorder.start();
      if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play();
      }
      const startTime = performance.now();

      const drawFrame = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        if (elapsed >= totalDuration) {
          recorder.stop();
          audioEl?.pause();
          return;
        }
        setProgress(Math.min(100, Math.round((elapsed / totalDuration) * 100)));

        const idx = Math.floor(elapsed / secondsPerPhoto);
        const t = elapsed % secondsPerPhoto;
        const current = files[idx]?.img;

        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        if (current) drawImageCover(ctx, current, 0, 0, CANVAS_W, CANVAS_H);

        const next = files[idx + 1]?.img;
        if (next && t > secondsPerPhoto - transitionDuration) {
          const fade = (t - (secondsPerPhoto - transitionDuration)) / transitionDuration;
          ctx.globalAlpha = fade;
          drawImageCover(ctx, next, 0, 0, CANVAS_W, CANVAS_H);
          ctx.globalAlpha = 1;
        }

        if (title.trim() && elapsed < titleWindow) {
          const fadeIn = Math.min(1, elapsed / 0.4);
          const fadeOut = Math.min(1, (titleWindow - elapsed) / 0.4);
          ctx.globalAlpha = Math.min(fadeIn, fadeOut);
          ctx.font = "700 44px Arial, sans-serif";
          ctx.textAlign = "center";
          ctx.lineWidth = 6;
          ctx.strokeStyle = "rgba(0,0,0,0.6)";
          ctx.strokeText(title, CANVAS_W / 2, CANVAS_H / 2);
          ctx.fillStyle = "#ffffff";
          ctx.fillText(title, CANVAS_W / 2, CANVAS_H / 2);
          ctx.globalAlpha = 1;
        }

        requestAnimationFrame(drawFrame);
      };
      requestAnimationFrame(drawFrame);

      await finished;
      audioCtx?.close();
    } catch (e) {
      console.error("Slideshow build failed:", e);
      setError("Couldn't build the video. Try fewer or smaller images.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "slideshow.webm";
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <canvas ref={canvasRef} className="hidden" />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-10 text-center transition hover:border-violet-400/40"
      >
        <Film className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop photos here, or tap to add</p>
        <p className="mt-1 text-xs text-slate-500">They'll play in this order with a crossfade between each</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {files.map((f) => (
            <div key={f.id} className="group relative h-16 w-16 overflow-hidden rounded-lg border border-slate-800">
              <img src={f.url} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => removeFile(f.id)}
                aria-label="Remove photo"
                className="absolute right-0.5 top-0.5 rounded-full bg-slate-950/80 p-0.5 text-slate-300 opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
            <Type className="h-3 w-3" />
            Title (optional, shown first 3 seconds)
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summer Trip 2026"
            className="h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:border-violet-400/50"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            Seconds per photo — {secondsPerPhoto.toFixed(1)}s
          </label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.5"
            value={secondsPerPhoto}
            onChange={(e) => setSecondsPerPhoto(Number(e.target.value))}
            className="h-12 w-full accent-violet-400"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
          <Music2 className="h-3 w-3" />
          Background music (optional — use only music you have rights to)
        </label>
        <button
          onClick={() => musicInputRef.current?.click()}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-700 px-4 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <Upload className="h-3.5 w-3.5" />
          {musicFile ? musicFile.name : "Choose an audio file"}
        </button>
        <input
          ref={musicInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
        />
        {musicFile && (
          <button onClick={() => setMusicFile(null)} className="ml-3 text-xs text-slate-500 underline">
            Remove
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      {busy && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-violet-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {resultUrl && (
        <video src={resultUrl} controls className="mt-4 w-full rounded-xl border border-slate-800 bg-black" />
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={build}
          disabled={!files.length || busy}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Film className="h-4 w-4" />}
          {busy ? "Building…" : "Build video"}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-violet-400/40 px-5 text-sm font-semibold text-violet-300 transition hover:bg-violet-400/10"
          >
            <Download className="h-4 w-4" />
            Download slideshow.webm
          </button>
        )}
      </div>
    </div>
  );
}

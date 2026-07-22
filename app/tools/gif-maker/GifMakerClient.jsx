"use client";

import { useRef, useState } from "react";
import { Clapperboard, ChevronUp, ChevronDown, Trash2, Loader2, FileOutput } from "lucide-react";

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
    s.onerror = () => reject(new Error("Failed to load GIF encoder"));
    document.head.appendChild(s);
  });
}

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

export default function GifMakerClient() {
  const [files, setFiles] = useState([]); // { id, file, url }
  const [delay, setDelay] = useState(400);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) return;
    setResultUrl(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file, url: URL.createObjectURL(file) };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const move = (index, dir) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const build = async () => {
    if (files.length < 2) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      await loadScriptOnce("https://unpkg.com/gif.js@0.2.0/dist/gif.js");
      const GIF = window.GIF;

      // gif.js runs its encoder in a Web Worker. Pointing a worker directly at
      // a cross-origin CDN URL is blocked by most browsers' same-origin
      // policy for workers. Fetching the script and wrapping it in a local
      // Blob makes the browser treat it as same-origin instead.
      const workerResponse = await fetch("https://unpkg.com/gif.js@0.2.0/dist/gif.worker.js");
      const workerScriptText = await workerResponse.text();
      const workerBlobUrl = URL.createObjectURL(
        new Blob([workerScriptText], { type: "application/javascript" })
      );

      const FRAME_SIZE = 480;
      const loaded = await Promise.all(
        files.map(
          ({ url }) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.src = url;
            })
        )
      );

      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: workerBlobUrl,
        width: FRAME_SIZE,
        height: FRAME_SIZE,
      });

      loaded.forEach((img) => {
        const canvas = document.createElement("canvas");
        canvas.width = FRAME_SIZE;
        canvas.height = FRAME_SIZE;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, FRAME_SIZE, FRAME_SIZE);
        drawImageCover(ctx, img, 0, 0, FRAME_SIZE, FRAME_SIZE);
        gif.addFrame(canvas, { copy: true, delay });
      });

      gif.on("progress", (p) => setProgress(Math.round(p * 100)));
      gif.on("finished", (blob) => {
        setResultUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setBusy(false);
      });
      gif.render();
    } catch (e) {
      console.error("GIF build failed:", e);
      setError("Couldn't build the GIF. Try fewer or smaller images.");
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "animation.gif";
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-10 text-center transition hover:border-amber-400/40"
      >
        <Clapperboard className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop photos here, or tap to add (2 or more)</p>
        <p className="mt-1 text-xs text-slate-500">They'll play in this order, looping forever</p>
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
        <div className="mt-4 flex flex-col gap-2">
          {files.map((f, i) => (
            <div
              key={f.id}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2"
            >
              <img src={f.url} alt="" className="h-8 w-8 shrink-0 rounded object-cover" />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-800 font-mono text-[11px] text-slate-400">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Move up"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === files.length - 1}
                aria-label="Move down"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeFile(f.id)}
                aria-label="Remove photo"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
          Frame delay — {delay}ms per photo
        </label>
        <input
          type="range"
          min="100"
          max="1200"
          step="50"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="h-12 w-full accent-amber-400"
        />
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      {resultUrl && (
        <div className="mt-4 flex justify-center overflow-hidden rounded-xl border border-slate-800 bg-white p-2">
          <img src={resultUrl} alt="GIF preview" className="max-h-64" />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={build}
          disabled={files.length < 2 || busy}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clapperboard className="h-4 w-4" />}
          {busy ? `Encoding… ${progress}%` : "Build GIF"}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download animation.gif
          </button>
        )}
      </div>
    </div>
  );
}

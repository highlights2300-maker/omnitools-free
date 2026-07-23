"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGrid, Loader2, FileOutput, X } from "lucide-react";

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

export default function PhotoCollageClient() {
  const [files, setFiles] = useState([]); // { id, file, url }
  const [gap, setGap] = useState(12);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [outUrl, setOutUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) return;
    setFiles((prev) => [
      ...prev,
      ...picked.slice(0, 9 - prev.length).map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file, url: URL.createObjectURL(file) };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  useEffect(() => {
    if (files.length < 2) {
      setOutUrl(null);
      return;
    }
    setBusy(true);
    const cols = Math.ceil(Math.sqrt(files.length));
    const rows = Math.ceil(files.length / cols);
    const cell = 360;
    const canvas = document.createElement("canvas");
    canvas.width = cols * cell + gap * (cols + 1);
    canvas.height = rows * cell + gap * (rows + 1);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    Promise.all(
      files.map(
        ({ url }) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
          })
      )
    ).then((imgs) => {
      imgs.forEach((img, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const dx = gap + col * (cell + gap);
        const dy = gap + row * (cell + gap);
        drawImageCover(ctx, img, dx, dy, cell, cell);
      });
      canvas.toBlob((blob) => {
        if (!blob) return;
        setOutUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setBusy(false);
      }, "image/png");
    });
  }, [files, gap, bgColor]);

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = "collage.png";
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
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-8 text-center transition hover:border-amber-400/40"
      >
        <LayoutGrid className="mb-2 h-7 w-7 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop photos here, or tap to add (up to 9)</p>
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
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f) => (
            <div key={f.id} className="group relative h-16 w-16 overflow-hidden rounded-lg border border-slate-800">
              <img src={f.url} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => removeFile(f.id)}
                aria-label="Remove photo"
                className="absolute right-0.5 top-0.5 rounded-full bg-slate-950/80 p-0.5 text-slate-300 opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length >= 2 && (
        <>
          <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Gap — {gap}px</label>
              <input
                type="range"
                min="0"
                max="40"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="h-12 w-full accent-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white p-2">
            {busy || !outUrl ? (
              <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
            ) : (
              <img src={outUrl} alt="Collage preview" className="max-h-64 w-full object-contain" />
            )}
          </div>

          <button
            onClick={download}
            disabled={!outUrl}
            className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileOutput className="h-4 w-4" />
            Download collage.png
          </button>
        </>
      )}
      {files.length === 1 && (
        <p className="mt-3 text-xs text-slate-500">Add at least one more photo to build a collage.</p>
      )}
    </div>
  );
}

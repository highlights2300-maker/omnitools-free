"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud, Loader2, FileOutput } from "lucide-react";

const selectClass =
  "h-12 rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function ImageCompressorClient() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState("image/jpeg");
  const [maxWidth] = useState(1920);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);
    setCompressedUrl(null);
    const img = new Image();
    img.onload = () => setDims({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  };

  useEffect(() => {
    if (!file || !originalUrl) return;
    setBusy(true);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setBusy(false);
            return;
          }
          setCompressedUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
          setCompressedSize(blob.size);
          setBusy(false);
        },
        format,
        format === "image/png" ? undefined : quality
      );
    };
    img.src = originalUrl;
  }, [file, originalUrl, quality, format, maxWidth]);

  const download = () => {
    if (!compressedUrl) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = `compressed.${ext}`;
    a.click();
  };

  const savings = file && compressedSize ? Math.max(0, 100 - (compressedSize / file.size) * 100) : 0;

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
          <UploadCloud className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">JPG, PNG or WebP — compressed entirely on your device</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Original</p>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-white">
                <img src={originalUrl} alt="Original, before compression" className="max-h-48 w-full object-contain" />
              </div>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {formatBytes(file.size)} · {dims.w}×{dims.h}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Compressed</p>
              <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                {compressedUrl ? (
                  <img src={compressedUrl} alt="Compressed result" className="max-h-48 w-full object-contain" />
                ) : (
                  <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-amber-400">
                {compressedSize ? `${formatBytes(compressedSize)} · ${savings.toFixed(0)}% smaller` : "…"}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:grid sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Quality — {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={quality}
                disabled={format === "image/png"}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="h-12 w-full accent-amber-400 disabled:opacity-30"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Format</label>
              <select className={`${selectClass} w-full`} value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG (lossless)</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={download}
              disabled={!compressedUrl || busy}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-4 w-4" />
              Download compressed image
            </button>
            <button
              onClick={() => {
                setFile(null);
                setOriginalUrl(null);
                setCompressedUrl(null);
              }}
              className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

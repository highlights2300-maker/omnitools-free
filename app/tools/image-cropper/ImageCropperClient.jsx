"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Crop, UploadCloud, Loader2, FileOutput } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function ImageCropperClient() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [targetWidth, setTargetWidth] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [outUrl, setOutUrl] = useState(null);
  const [outSize, setOutSize] = useState(0);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    setOutUrl(null);
    setInsets({ top: 0, right: 0, bottom: 0, left: 0 });
    const img = new Image();
    img.onload = () => {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setTargetWidth(img.naturalWidth);
    };
    img.src = url;
  };

  const cropDims = useMemo(() => {
    const cw = Math.max(1, Math.round(natural.w * (1 - (insets.left + insets.right) / 100)));
    const ch = Math.max(1, Math.round(natural.h * (1 - (insets.top + insets.bottom) / 100)));
    return { cw, ch, ratio: cw / ch };
  }, [natural, insets]);

  const targetHeight = lockAspect
    ? Math.round((targetWidth || 1) / (cropDims.ratio || 1))
    : Math.round(cropDims.ch);

  useEffect(() => {
    if (!file || !imageUrl || !natural.w) return;
    const img = new Image();
    img.onload = () => {
      const sx = Math.round(natural.w * (insets.left / 100));
      const sy = Math.round(natural.h * (insets.top / 100));
      const sw = cropDims.cw;
      const sh = cropDims.ch;
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth || sw;
      canvas.height = targetHeight || sh;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setOutUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
          setOutSize(blob.size);
        },
        format,
        0.92
      );
    };
    img.src = imageUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, imageUrl, insets, targetWidth, targetHeight, format]);

  const download = () => {
    if (!outUrl) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `cropped.${ext}`;
    a.click();
  };

  const updateInset = (side, value) => setInsets((prev) => ({ ...prev, [side]: Number(value) }));

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
          <p className="mt-1 text-xs text-slate-500">Crop with the sliders, then set an exact export size</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Crop region</p>
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-white">
              <img src={imageUrl} alt="Source, before cropping" className="block w-full" />
              <div
                className="pointer-events-none absolute inset-0 bg-slate-950/60"
                style={{
                  clipPath: `polygon(0% 0%, 0% 100%, ${insets.left}% 100%, ${insets.left}% ${insets.top}%, ${
                    100 - insets.right
                  }% ${insets.top}%, ${100 - insets.right}% ${100 - insets.bottom}%, ${insets.left}% ${
                    100 - insets.bottom
                  }%, ${insets.left}% 100%, 100% 100%, 100% 0%)`,
                }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["top", "Top"],
                ["bottom", "Bottom"],
                ["left", "Left"],
                ["right", "Right"],
              ].map(([side, label]) => (
                <div key={side}>
                  <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                    {label} — {insets[side]}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    value={insets[side]}
                    onChange={(e) => updateInset(side, e.target.value)}
                    className="h-12 w-full accent-amber-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Preview & export</p>
            <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
              {outUrl ? (
                <img src={outUrl} alt="Cropped preview" className="max-h-48 w-full object-contain" />
              ) : (
                <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {cropDims.cw}×{cropDims.ch} cropped {outSize ? `· ${formatBytes(outSize)} exported` : ""}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:grid sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Export width</label>
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Export height</label>
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={targetHeight}
                  disabled={lockAspect}
                  onChange={() => {}}
                />
              </div>
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
              Lock aspect ratio to crop region
            </label>

            <div className="mt-3">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Format</label>
              <select className={inputClass} value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={download}
                disabled={!outUrl}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FileOutput className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setImageUrl(null);
                  setOutUrl(null);
                }}
                className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Choose another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

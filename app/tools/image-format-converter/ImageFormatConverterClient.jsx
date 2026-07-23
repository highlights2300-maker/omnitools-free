"use client";

import { useEffect, useRef, useState } from "react";
import { Repeat, UploadCloud, Loader2, FileOutput } from "lucide-react";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function ImageFormatConverterClient() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [format, setFormat] = useState("image/png");
  const [outUrl, setOutUrl] = useState(null);
  const [outSize, setOutSize] = useState(0);
  const [supportsAlpha, setSupportsAlpha] = useState(true);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setOutUrl(null);
    setFormat(f.type === "image/png" ? "image/jpeg" : "image/png");
  };

  useEffect(() => {
    if (!file || !imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      setSupportsAlpha(format !== "image/jpeg");
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
  }, [file, imageUrl, format]);

  const extFor = (f) => (f === "image/png" ? "png" : f === "image/webp" ? "webp" : f === "image/jpeg" ? "jpg" : "bmp");

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `converted.${extFor(format)}`;
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
          <UploadCloud className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP or BMP — pick your target format</p>
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
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">
                Original · {file.type.split("/")[1]?.toUpperCase()}
              </p>
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                <img src={imageUrl} alt="Original, before conversion" className="max-h-44 w-full object-contain" />
              </div>
              <p className="mt-1 font-mono text-xs text-slate-400">{formatBytes(file.size)}</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">
                Converted · {extFor(format).toUpperCase()}
              </p>
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                {outUrl ? (
                  <img src={outUrl} alt="Converted result" className="max-h-44 w-full object-contain" />
                ) : (
                  <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-amber-400">{outSize ? formatBytes(outSize) : "…"}</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Convert to</label>
            <div className="flex flex-wrap gap-2">
              {[
                ["image/png", "PNG"],
                ["image/jpeg", "JPG"],
                ["image/webp", "WebP"],
                ["image/bmp", "BMP"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFormat(val)}
                  className={`h-10 rounded-lg px-4 text-xs font-medium transition ${
                    format === val ? "bg-amber-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {!supportsAlpha && (
              <p className="mt-2 text-[11px] text-slate-500">JPG doesn't support transparency — it's filled with white.</p>
            )}
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
              Choose another image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, FileOutput } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

export default function MemeGeneratorClient() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [outUrl, setOutUrl] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  };

  useEffect(() => {
    if (!file || !imageUrl || !natural.w) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = natural.w;
      canvas.height = natural.h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, natural.w, natural.h);

      const fontSize = Math.round(natural.w * 0.09);
      ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.lineWidth = fontSize * 0.08;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";

      const drawCaption = (text, y) => {
        if (!text) return;
        const upper = text.toUpperCase();
        ctx.strokeText(upper, natural.w / 2, y);
        ctx.fillText(upper, natural.w / 2, y);
      };

      drawCaption(topText, fontSize * 1.1);
      drawCaption(bottomText, natural.h - fontSize * 0.4);

      canvas.toBlob((blob) => {
        if (!blob) return;
        setOutUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      }, "image/png");
    };
    img.src = imageUrl;
  }, [file, imageUrl, natural, topText, bottomText]);

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = "meme.png";
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
          <ImagePlus className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Add top & bottom captions, classic meme style</p>
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
          <div className="flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black">
            {outUrl ? (
              <img src={outUrl} alt="Meme preview" className="max-h-64 w-full object-contain" />
            ) : (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:grid sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Top text</label>
              <input className={inputClass} value={topText} onChange={(e) => setTopText(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Bottom text</label>
              <input className={inputClass} value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={download}
              disabled={!outUrl}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-4 w-4" />
              Download PNG
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

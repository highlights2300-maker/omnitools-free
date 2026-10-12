"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { UploadCloud, Loader2, FileOutput, RotateCcw, RotateCw, AlertCircle } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

const labelClass = "mb-1 block text-[11px] uppercase tracking-wider text-slate-500";

// Aspect-ratio presets. These are plain width:height ratios — not platform
// pixel sizes. "free" = four independent edge sliders; "custom" = user ratio.
const PRESETS = [
  { key: "free", label: "Free" },
  { key: "1:1", label: "1:1", ratio: 1 },
  { key: "4:5", label: "4:5", ratio: 4 / 5 },
  { key: "3:2", label: "3:2", ratio: 3 / 2 },
  { key: "4:3", label: "4:3", ratio: 4 / 3 },
  { key: "16:9", label: "16:9", ratio: 16 / 9 },
  { key: "9:16", label: "9:16", ratio: 9 / 16 },
  { key: "custom", label: "Custom" },
];

// Browsers cap canvas size (commonly 16,384 px per side; Safari also caps total area).
const MAX_SIDE = 16384;
const MAX_AREA = 100_000_000;

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function defaultFormatFor(file) {
  if (file.type === "image/jpeg") return "image/jpeg";
  if (file.type === "image/webp") return "image/webp";
  return "image/png"; // PNG and anything else (GIF, BMP…) exports as PNG, keeping transparency
}

function extFor(format) {
  return format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
}

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

export default function ImageCropperClient() {
  const uid = useId();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [error, setError] = useState("");

  // Crop controls
  const [presetKey, setPresetKey] = useState("free");
  const [customRatio, setCustomRatio] = useState({ w: "", h: "" });
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 }); // "free" mode, % per edge
  const [zoom, setZoom] = useState(1); // ratio modes
  const [pan, setPan] = useState({ x: 50, y: 50 }); // ratio modes, 0–100

  // Export controls
  const [widthOverride, setWidthOverride] = useState(null);
  const [heightOverride, setHeightOverride] = useState(null);
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(92);

  const [outUrl, setOutUrl] = useState(null);
  const [outSize, setOutSize] = useState(0);

  const fileInputRef = useRef(null);
  const imageUrlRef = useRef(null);
  const outUrlRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(
    () => () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
    },
    []
  );

  const swapImageUrl = (url) => {
    const old = imageUrlRef.current;
    imageUrlRef.current = url;
    setImageUrl(url);
    if (old) URL.revokeObjectURL(old);
  };

  const resetCrop = () => {
    setInsets({ top: 0, right: 0, bottom: 0, left: 0 });
    setZoom(1);
    setPan({ x: 50, y: 50 });
    setWidthOverride(null);
    setHeightOverride(null);
  };

  const clearAll = () => {
    swapImageUrl(null);
    if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
    outUrlRef.current = null;
    setOutUrl(null);
    setOutSize(0);
    setFile(null);
    setNatural({ w: 0, h: 0 });
    resetCrop();
    setPresetKey("free");
  };

  const onPickFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("That file isn't an image. Please choose a JPG, PNG, WebP or similar image file.");
      return;
    }
    setError("");
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      swapImageUrl(url);
      setFile(f);
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setFormat(defaultFormatFor(f));
      setPresetKey("free");
      resetCrop();
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
      outUrlRef.current = null;
      setOutUrl(null);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError(
        "This browser couldn't read that image. Try a JPG, PNG or WebP file (some formats, like HEIC, aren't supported by all browsers)."
      );
    };
    img.src = url;
  };

  const rotate = (dir) => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalHeight;
      c.height = img.naturalWidth;
      const ctx = c.getContext("2d");
      ctx.translate(c.width / 2, c.height / 2);
      ctx.rotate((dir * Math.PI) / 2);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      c.toBlob((blob) => {
        if (!blob) {
          setError("Couldn't rotate this image — it may be too large for your browser.");
          return;
        }
        swapImageUrl(URL.createObjectURL(blob));
        setNatural({ w: c.width, h: c.height });
        resetCrop();
      }, "image/png");
    };
    img.src = imageUrl;
  };

  // ---- Crop rectangle, in source pixels -----------------------------------
  const ratio = useMemo(() => {
    const p = PRESETS.find((x) => x.key === presetKey);
    if (presetKey === "custom") {
      const cw = Number(customRatio.w);
      const ch = Number(customRatio.h);
      return cw > 0 && ch > 0 ? cw / ch : null;
    }
    return p?.ratio ?? null;
  }, [presetKey, customRatio]);

  const rect = useMemo(() => {
    const { w, h } = natural;
    if (!w || !h) return { sx: 0, sy: 0, sw: 1, sh: 1 };
    let sx, sy, sw, sh;
    if (ratio) {
      const baseW = w / h > ratio ? h * ratio : w;
      const baseH = w / h > ratio ? h : w / ratio;
      sw = Math.max(1, Math.round(baseW / zoom));
      sh = Math.max(1, Math.round(baseH / zoom));
      sx = Math.round((w - sw) * (pan.x / 100));
      sy = Math.round((h - sh) * (pan.y / 100));
    } else {
      sx = Math.round(w * (insets.left / 100));
      sy = Math.round(h * (insets.top / 100));
      sw = Math.max(1, Math.round(w * (1 - (insets.left + insets.right) / 100)));
      sh = Math.max(1, Math.round(h * (1 - (insets.top + insets.bottom) / 100)));
    }
    sx = clamp(sx, 0, w - 1);
    sy = clamp(sy, 0, h - 1);
    sw = Math.min(sw, w - sx);
    sh = Math.min(sh, h - sy);
    return { sx, sy, sw, sh };
  }, [natural, ratio, zoom, pan, insets]);

  const exportW = Math.max(1, Math.round(widthOverride ?? rect.sw));
  const exportH = Math.max(
    1,
    lockAspect ? Math.round((exportW * rect.sh) / rect.sw) : Math.round(heightOverride ?? rect.sh)
  );
  const tooLarge = exportW > MAX_SIDE || exportH > MAX_SIDE || exportW * exportH > MAX_AREA;

  // ---- Render the export (debounced) ---------------------------------------
  useEffect(() => {
    if (!imageUrl || !natural.w || tooLarge) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        const canvas = document.createElement("canvas");
        canvas.width = exportW;
        canvas.height = exportH;
        const ctx = canvas.getContext("2d");
        if (format === "image/jpeg") {
          ctx.fillStyle = "#ffffff"; // JPG has no transparency — avoid black fill
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, rect.sx, rect.sy, rect.sw, rect.sh, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (cancelled || !blob) return;
            const url = URL.createObjectURL(blob);
            const old = outUrlRef.current;
            outUrlRef.current = url;
            setOutUrl(url);
            setOutSize(blob.size);
            if (old) URL.revokeObjectURL(old);
          },
          format,
          quality / 100
        );
      };
      img.src = imageUrl;
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [imageUrl, natural, rect, exportW, exportH, format, quality, tooLarge]);

  const download = () => {
    if (!outUrl) return;
    const base = (file?.name || "image").replace(/\.[^.]+$/, "").replace(/[^\w\- ]+/g, "").trim() || "image";
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `${base}-cropped.${extFor(format)}`;
    a.click();
  };

  const updateInset = (side, value) => setInsets((prev) => ({ ...prev, [side]: Number(value) }));

  const choosePreset = (key) => {
    if (key === presetKey) return;
    if (key === "free") {
      // Carry the current crop over so switching to "free" doesn't jump.
      const { w, h } = natural;
      setInsets({
        left: (rect.sx / w) * 100,
        top: (rect.sy / h) * 100,
        right: ((w - rect.sx - rect.sw) / w) * 100,
        bottom: ((h - rect.sy - rect.sh) / h) * 100,
      });
    } else {
      setZoom(1);
      setPan({ x: 50, y: 50 });
    }
    setWidthOverride(null);
    setHeightOverride(null);
    setPresetKey(key);
  };

  // Drag the preview to move the crop window (ratio modes only).
  const onDragStart = (e) => {
    if (!ratio) return;
    dragRef.current = { x: e.clientX, y: e.clientY, pan: { ...pan }, bounds: e.currentTarget.getBoundingClientRect() };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onDragMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dxSrc = ((e.clientX - d.x) / d.bounds.width) * natural.w;
    const dySrc = ((e.clientY - d.y) / d.bounds.height) * natural.h;
    const spanX = natural.w - rect.sw;
    const spanY = natural.h - rect.sh;
    setPan({
      x: spanX > 0 ? clamp(d.pan.x + (dxSrc / spanX) * 100, 0, 100) : 50,
      y: spanY > 0 ? clamp(d.pan.y + (dySrc / spanY) * 100, 0, 100) : 50,
    });
  };
  const onDragEnd = () => {
    dragRef.current = null;
  };

  // Overlay shading, as percentages of the displayed image
  const ov = natural.w
    ? {
        l: (rect.sx / natural.w) * 100,
        t: (rect.sy / natural.h) * 100,
        r: ((rect.sx + rect.sw) / natural.w) * 100,
        b: ((rect.sy + rect.sh) / natural.h) * 100,
      }
    : { l: 0, t: 0, r: 100, b: 100 };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Choose an image to crop"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPickFile(e.dataTransfer.files?.[0]);
          }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-16 text-center transition hover:border-amber-400/40 focus:border-amber-400/60 focus:outline-none"
        >
          <UploadCloud className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG, WebP and other browser-readable images — nothing is uploaded
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              onPickFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className={labelClass}>Aspect ratio</p>
            <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Aspect ratio presets">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  aria-pressed={presetKey === p.key}
                  onClick={() => choosePreset(p.key)}
                  className={`h-10 rounded-lg border px-3 text-xs font-semibold transition ${
                    presetKey === p.key
                      ? "border-amber-400 bg-amber-400/15 text-amber-300"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {presetKey === "custom" && (
              <div className="mb-3 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  inputMode="decimal"
                  aria-label="Custom ratio width"
                  placeholder="W"
                  className={`${inputClass} !w-24`}
                  value={customRatio.w}
                  onChange={(e) => setCustomRatio((r) => ({ ...r, w: e.target.value }))}
                />
                <span className="text-slate-500">:</span>
                <input
                  type="number"
                  min="1"
                  inputMode="decimal"
                  aria-label="Custom ratio height"
                  placeholder="H"
                  className={`${inputClass} !w-24`}
                  value={customRatio.h}
                  onChange={(e) => setCustomRatio((r) => ({ ...r, h: e.target.value }))}
                />
                {!ratio && <span className="text-xs text-slate-500">Enter both numbers, e.g. 5 : 7</span>}
              </div>
            )}

            <p className={labelClass}>Crop region{ratio ? " — drag the image to move it" : ""}</p>
            <div
              className={`relative overflow-hidden rounded-xl border border-slate-800 bg-white ${
                ratio ? "cursor-move touch-none" : ""
              }`}
              onPointerDown={onDragStart}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerCancel={onDragEnd}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Source, before cropping" className="block w-full select-none" draggable={false} />
              <div
                className="pointer-events-none absolute inset-0 bg-slate-950/60"
                style={{
                  clipPath: `polygon(0% 0%, 0% 100%, ${ov.l}% 100%, ${ov.l}% ${ov.t}%, ${ov.r}% ${ov.t}%, ${ov.r}% ${ov.b}%, ${ov.l}% ${ov.b}%, ${ov.l}% 100%, 100% 100%, 100% 0%)`,
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => rotate(-1)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Rotate left
              </button>
              <button
                type="button"
                onClick={() => rotate(1)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
              >
                <RotateCw className="h-3.5 w-3.5" /> Rotate right
              </button>
            </div>

            {ratio ? (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor={`${uid}-zoom`} className={labelClass}>
                    Zoom — {Math.round(zoom * 100)}%
                  </label>
                  <input
                    id={`${uid}-zoom`}
                    type="range"
                    min="1"
                    max="4"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="h-12 w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-px`} className={labelClass}>
                    Left ↔ right
                  </label>
                  <input
                    id={`${uid}-px`}
                    type="range"
                    min="0"
                    max="100"
                    value={pan.x}
                    onChange={(e) => setPan((p) => ({ ...p, x: Number(e.target.value) }))}
                    className="h-12 w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-py`} className={labelClass}>
                    Up ↕ down
                  </label>
                  <input
                    id={`${uid}-py`}
                    type="range"
                    min="0"
                    max="100"
                    value={pan.y}
                    onChange={(e) => setPan((p) => ({ ...p, y: Number(e.target.value) }))}
                    className="h-12 w-full accent-amber-400"
                  />
                </div>
              </div>
            ) : presetKey === "custom" ? (
              <p className="mt-3 text-xs text-slate-500">Enter a ratio above to start cropping to it.</p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  ["top", "Top"],
                  ["bottom", "Bottom"],
                  ["left", "Left"],
                  ["right", "Right"],
                ].map(([side, label]) => (
                  <div key={side}>
                    <label htmlFor={`${uid}-${side}`} className={labelClass}>
                      {label} — {Math.round(insets[side])}%
                    </label>
                    <input
                      id={`${uid}-${side}`}
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
            )}
          </div>

          <div>
            <p className={labelClass}>Preview & export</p>
            <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
              {tooLarge ? (
                <p className="px-4 text-center text-xs text-red-600">
                  That export size is too large for a browser to create. Keep each side under{" "}
                  {MAX_SIDE.toLocaleString()} px.
                </p>
              ) : outUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={outUrl} alt="Cropped preview" className="max-h-48 w-full object-contain" />
              ) : (
                <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500" aria-live="polite">
              {rect.sw}×{rect.sh} cropped → {exportW}×{exportH} export
              {outSize && !tooLarge ? ` · ${formatBytes(outSize)}` : ""}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:grid sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-w`} className={labelClass}>
                  Export width (px)
                </label>
                <input
                  id={`${uid}-w`}
                  type="number"
                  min="1"
                  inputMode="numeric"
                  className={inputClass}
                  value={exportW}
                  onChange={(e) => setWidthOverride(Number(e.target.value) > 0 ? Number(e.target.value) : null)}
                />
              </div>
              <div>
                <label htmlFor={`${uid}-h`} className={labelClass}>
                  Export height (px)
                </label>
                <input
                  id={`${uid}-h`}
                  type="number"
                  min="1"
                  inputMode="numeric"
                  className={`${inputClass} disabled:opacity-50`}
                  value={exportH}
                  disabled={lockAspect}
                  onChange={(e) => setHeightOverride(Number(e.target.value) > 0 ? Number(e.target.value) : null)}
                />
              </div>
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => {
                  setLockAspect(e.target.checked);
                  setHeightOverride(null);
                }}
              />
              Keep the crop&apos;s proportions (untick to set width and height separately — the image will stretch)
            </label>
            {(widthOverride !== null || heightOverride !== null) && (
              <button
                type="button"
                onClick={() => {
                  setWidthOverride(null);
                  setHeightOverride(null);
                }}
                className="mt-2 text-xs text-amber-400 underline underline-offset-2"
              >
                Reset to the cropped size
              </button>
            )}

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-fmt`} className={labelClass}>
                  Format
                </label>
                <select
                  id={`${uid}-fmt`}
                  className={inputClass}
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WebP</option>
                  <option value="image/png">PNG (keeps transparency)</option>
                </select>
              </div>
              {format !== "image/png" && (
                <div>
                  <label htmlFor={`${uid}-q`} className={labelClass}>
                    Quality — {quality}%
                  </label>
                  <input
                    id={`${uid}-q`}
                    type="range"
                    min="50"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="h-12 w-full accent-amber-400"
                  />
                </div>
              )}
            </div>
            {format === "image/jpeg" && (
              <p className="mt-2 text-[11px] text-slate-500">JPG can&apos;t store transparency — transparent areas become white.</p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={download}
                disabled={!outUrl || tooLarge}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FileOutput className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={clearAll}
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

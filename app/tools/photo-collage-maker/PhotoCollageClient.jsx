"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LayoutGrid, Loader2, FileOutput, X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

const MAX_PHOTOS = 9;

const LAYOUTS = [
  { key: "grid", label: "Grid" },
  { key: "row", label: "One row" },
  { key: "column", label: "One column" },
];

const SIZES = [
  { value: 360, label: "Standard (360 px per photo)" },
  { value: 540, label: "Large (540 px per photo)" },
  { value: 720, label: "Extra large (720 px per photo)" },
];

const labelClass = "mb-1 block text-[11px] uppercase tracking-wider text-slate-500";
const selectClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

// Draw `img` so it fills the dw×dh cell (centre-cropped, never stretched).
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

function roundedRectPath(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  if (rad <= 0) {
    ctx.rect(x, y, w, h);
  } else if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, rad);
  } else {
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }
}

function layoutDims(layout, n) {
  if (layout === "row") return { cols: n, rows: 1 };
  if (layout === "column") return { cols: 1, rows: n };
  const cols = Math.ceil(Math.sqrt(n));
  return { cols, rows: Math.ceil(n / cols) };
}

export default function PhotoCollageClient() {
  const uid = useId();
  const [files, setFiles] = useState([]); // { id, name, url, img }
  const [layout, setLayout] = useState("grid");
  const [gap, setGap] = useState(12);
  const [radius, setRadius] = useState(0);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [cell, setCell] = useState(360);
  const [format, setFormat] = useState("image/png");
  const [outUrl, setOutUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);
  const outUrlRef = useRef(null);
  const filesRef = useRef([]);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(
    () => () => {
      filesRef.current.forEach((f) => URL.revokeObjectURL(f.url));
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
    },
    []
  );

  const addFiles = async (fileList) => {
    const all = Array.from(fileList || []);
    const images = all.filter((f) => f.type.startsWith("image/"));
    const notImages = all.length - images.length;
    const room = MAX_PHOTOS - filesRef.current.length;
    const picked = images.slice(0, Math.max(0, room));
    const tooMany = images.length - picked.length;

    const loaded = await Promise.all(
      picked.map(
        (file) =>
          new Promise((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => resolve({ file, url, img });
            img.onerror = () => {
              URL.revokeObjectURL(url);
              resolve(null);
            };
            img.src = url;
          })
      )
    );
    const ok = loaded.filter(Boolean);
    const unreadable = loaded.length - ok.length;

    if (ok.length) {
      setFiles((prev) => [
        ...prev,
        ...ok.slice(0, MAX_PHOTOS - prev.length).map(({ file, url, img }) => {
          idCounter.current += 1;
          return { id: `f${idCounter.current}`, name: file.name, url, img };
        }),
      ]);
    }

    const parts = [];
    if (tooMany > 0) parts.push(`Only ${MAX_PHOTOS} photos fit in one collage — ${tooMany} extra left out.`);
    if (unreadable > 0)
      parts.push(
        `${unreadable} file${unreadable > 1 ? "s" : ""} couldn't be read by this browser (try JPG, PNG or WebP).`
      );
    if (notImages > 0) parts.push(`${notImages} non-image file${notImages > 1 ? "s were" : " was"} skipped.`);
    setNotice(parts.join(" "));
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const gone = prev.find((f) => f.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  const move = (index, delta) => {
    setFiles((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const clearAll = () => {
    filesRef.current.forEach((f) => URL.revokeObjectURL(f.url));
    setFiles([]);
    setNotice("");
  };

  // Render the collage (debounced; stale renders are discarded)
  useEffect(() => {
    if (files.length < 2) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      setBusy(true);
      const { cols, rows } = layoutDims(layout, files.length);
      const canvas = document.createElement("canvas");
      canvas.width = cols * cell + gap * (cols + 1);
      canvas.height = rows * cell + gap * (rows + 1);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingQuality = "high";

      files.forEach(({ img }, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Centre an incomplete last row instead of leaving a gap on the right
        const inLastRow = row === rows - 1;
        const countInRow = inLastRow ? files.length - row * cols : cols;
        const offset = ((cols - countInRow) * (cell + gap)) / 2;
        const dx = gap + col * (cell + gap) + offset;
        const dy = gap + row * (cell + gap);
        ctx.save();
        roundedRectPath(ctx, dx, dy, cell, cell, radius);
        ctx.clip();
        drawImageCover(ctx, img, dx, dy, cell, cell);
        ctx.restore();
      });

      canvas.toBlob(
        (blob) => {
          if (cancelled || !blob) {
            if (!cancelled) setBusy(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const old = outUrlRef.current;
          outUrlRef.current = url;
          setOutUrl(url);
          setBusy(false);
          if (old) URL.revokeObjectURL(old);
        },
        format,
        0.92
      );
    }, 80);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [files, layout, gap, radius, bgColor, cell, format]);

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `collage.${format === "image/png" ? "png" : "jpg"}`;
    a.click();
  };

  const ready = files.length >= 2;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div
        role="button"
        tabIndex={0}
        aria-label="Add photos to the collage"
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
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-8 text-center transition hover:border-amber-400/40 focus:border-amber-400/60 focus:outline-none"
      >
        <LayoutGrid className="mb-2 h-7 w-7 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">
          Drag & drop photos here, or tap to add (up to {MAX_PHOTOS})
        </p>
        <p className="mt-1 text-xs text-slate-500">Nothing is uploaded — photos stay in your browser</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {notice && (
        <div
          role="status"
          className="mt-3 flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {files.length > 0 && (
        <>
          <ul className="mt-4 flex flex-wrap gap-3" aria-label="Photos in your collage, in order">
            {files.map((f, i) => (
              <li key={f.id} className="w-20">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt={`Photo ${i + 1}: ${f.name}`} className="h-full w-full object-cover" />
                  <span className="absolute left-1 top-1 rounded bg-slate-950/80 px-1.5 text-[10px] font-semibold text-slate-200">
                    {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    aria-label={`Remove photo ${i + 1}`}
                    className="absolute right-1 top-1 rounded-full bg-slate-950/85 p-1 text-slate-200 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="mt-1 flex justify-between">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label={`Move photo ${i + 1} earlier`}
                    className="flex h-8 w-9 items-center justify-center rounded-md border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === files.length - 1}
                    aria-label={`Move photo ${i + 1} later`}
                    className="flex h-8 w-9 items-center justify-center rounded-md border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={clearAll}
            className="mt-3 text-xs text-slate-500 underline underline-offset-2 hover:text-slate-300"
          >
            Remove all photos
          </button>
        </>
      )}

      {ready && (
        <>
          <div className="mt-4">
            <p className={labelClass}>Layout</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Collage layout">
              {LAYOUTS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  aria-pressed={layout === l.key}
                  onClick={() => setLayout(l.key)}
                  className={`h-10 rounded-lg border px-4 text-xs font-semibold transition ${
                    layout === l.key
                      ? "border-amber-400 bg-amber-400/15 text-amber-300"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-3">
            <div>
              <label htmlFor={`${uid}-gap`} className={labelClass}>
                Spacing — {gap}px
              </label>
              <input
                id={`${uid}-gap`}
                type="range"
                min="0"
                max="40"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="h-12 w-full accent-amber-400"
              />
            </div>
            <div>
              <label htmlFor={`${uid}-rad`} className={labelClass}>
                Rounded corners — {radius}px
              </label>
              <input
                id={`${uid}-rad`}
                type="range"
                min="0"
                max="80"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="h-12 w-full accent-amber-400"
              />
            </div>
            <div>
              <label htmlFor={`${uid}-bg`} className={labelClass}>
                Background
              </label>
              <input
                id={`${uid}-bg`}
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-size`} className={labelClass}>
                Export size
              </label>
              <select
                id={`${uid}-size`}
                className={selectClass}
                value={cell}
                onChange={(e) => setCell(Number(e.target.value))}
              >
                {SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${uid}-fmt`} className={labelClass}>
                Format
              </label>
              <select
                id={`${uid}-fmt`}
                className={selectClass}
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="image/png">PNG (sharpest, larger file)</option>
                <option value="image/jpeg">JPG (smaller file)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white p-2">
            {busy || !outUrl ? (
              <Loader2 className="h-6 w-6 animate-spin text-amber-400" aria-label="Building collage" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={outUrl} alt="Collage preview" className="max-h-80 w-full object-contain" />
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Each photo is centre-cropped to a square so the layout stays even.
          </p>

          <button
            onClick={download}
            disabled={!outUrl || busy}
            className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileOutput className="h-4 w-4" />
            Download collage.{format === "image/png" ? "png" : "jpg"}
          </button>
        </>
      )}
      {files.length === 1 && (
        <p className="mt-3 text-xs text-slate-500">Add at least one more photo to build a collage.</p>
      )}
    </div>
  );
}

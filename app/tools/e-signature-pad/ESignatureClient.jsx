"use client";

import { useRef, useState } from "react";
import { FileOutput, Undo2 } from "lucide-react";

const W = 1000;
const H = 400;
const MAX_UNDO = 30;

export default function ESignatureClient() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const historyRef = useRef([]);
  const [color, setColor] = useState("#0f172a");
  const [thickness, setThickness] = useState(3);
  const [hasStroke, setHasStroke] = useState(false);
  const [undoCount, setUndoCount] = useState(0);

  // Map pointer position to canvas pixels, and report the CSS->canvas scale
  // so line width looks the same on every screen size.
  const getPos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    return {
      x: (e.clientX - rect.left) * scale,
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
      scale,
    };
  };

  const applyStyle = (ctx, scale) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = thickness * scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const start = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* capture is optional */
    }
    // snapshot for undo
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historyRef.current.length > MAX_UNDO) historyRef.current.shift();
    setUndoCount(historyRef.current.length);

    drawingRef.current = true;
    const pos = getPos(canvas, e);
    lastPointRef.current = pos;
    // a tap leaves a dot
    applyStyle(ctx, pos.scale);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, (thickness * pos.scale) / 2, 0, Math.PI * 2);
    ctx.fill();
    setHasStroke(true);
  };

  const move = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(canvas, e);
    applyStyle(ctx, pos.scale);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPointRef.current = pos;
  };

  const end = (e) => {
    drawingRef.current = false;
    try {
      if (e && canvasRef.current.hasPointerCapture(e.pointerId)) {
        canvasRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ignore */
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    historyRef.current = [];
    setUndoCount(0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStroke(false);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prev = historyRef.current.pop();
    if (!prev) return;
    ctx.putImageData(prev, 0, 0);
    setUndoCount(historyRef.current.length);
    if (historyRef.current.length === 0) {
      // back to the very first snapshot: blank unless something is still drawn
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let any = false;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) {
          any = true;
          break;
        }
      }
      setHasStroke(any);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let minX = width,
      minY = height,
      maxX = -1,
      maxY = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < minX || maxY < minY) return;
    const pad = 16;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width, maxX + pad);
    maxY = Math.min(height, maxY + pad);

    const trimmed = document.createElement("canvas");
    trimmed.width = maxX - minX;
    trimmed.height = maxY - minY;
    trimmed.getContext("2d").drawImage(canvas, minX, minY, trimmed.width, trimmed.height, 0, 0, trimmed.width, trimmed.height);

    trimmed.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "signature.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="overflow-hidden rounded-xl border-2 border-dashed border-slate-700 bg-white">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="Signature drawing area"
          className="block aspect-[5/2] w-full cursor-crosshair touch-none"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
      </div>
      {!hasStroke && (
        <p className="mt-2 text-center text-xs text-slate-500">Sign above with your mouse, trackpad, finger or stylus</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500">Ink color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-12 cursor-pointer rounded border border-slate-800 bg-transparent"
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <label className="whitespace-nowrap text-xs text-slate-500">Thickness — {thickness}px</label>
          <input
            type="range"
            min="1"
            max="8"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="h-10 w-full accent-amber-400"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={download}
          disabled={!hasStroke}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileOutput className="h-4 w-4" />
          Download signature.png
        </button>
        <button
          onClick={undo}
          disabled={undoCount === 0}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Undo2 className="h-4 w-4" />
          Undo
        </button>
        <button
          onClick={clear}
          className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Clear
        </button>
      </div>
      <p className="mt-3 text-[11px] text-slate-600">
        Downloads as a tightly-cropped transparent PNG, ready to drop into a document, slide, or PDF.
      </p>
    </div>
  );
}

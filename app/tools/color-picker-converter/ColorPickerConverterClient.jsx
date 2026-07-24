"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (isNaN(num) || full.length !== 6) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-violet-400/50";

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">{label}</label>
      <div className="flex gap-2">
        <div className={`${inputClass} flex items-center font-mono`}>{value}</div>
        <button
          onClick={copy}
          aria-label={`Copy ${label}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function ColorPickerConverterClient() {
  const [hex, setHex] = useState("#fbbf24");
  const [hexInput, setHexInput] = useState("#fbbf24");

  const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const applyHexInput = (value) => {
    setHexInput(value);
    const parsed = hexToRgb(value);
    if (parsed) setHex(value.startsWith("#") ? value : `#${value}`);
  };

  const updateRgb = (channel, value) => {
    const next = { ...rgb, [channel]: clamp(Number(value) || 0, 0, 255) };
    const newHex = rgbToHex(next.r, next.g, next.b);
    setHex(newHex);
    setHexInput(newHex);
  };

  const updateHsl = (channel, value) => {
    const max = channel === "h" ? 360 : 100;
    const next = { ...hsl, [channel]: clamp(Number(value) || 0, 0, max) };
    const newRgb = hslToRgb(next.h, next.s, next.l);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setHexInput(newHex);
  };

  const onNativePicker = (value) => {
    setHex(value);
    setHexInput(value);
  };

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[220px_1fr]">
        <div>
          <div
            className="h-40 w-full rounded-xl border border-slate-800 shadow-inner lg:h-full"
            style={{ backgroundColor: hex }}
          />
          <label className="mt-3 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 transition hover:bg-slate-800">
            Pick a color
            <input
              type="color"
              value={/^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#000000"}
              onChange={(e) => onNativePicker(e.target.value)}
              className="h-0 w-0 opacity-0"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">HEX</label>
            <input
              className={`${inputClass} font-mono`}
              value={hexInput}
              onChange={(e) => applyHexInput(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">RGB</p>
            <div className="grid grid-cols-3 gap-2">
              {["r", "g", "b"].map((ch) => (
                <input
                  key={ch}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="255"
                  className={`${inputClass} text-center font-mono`}
                  value={rgb[ch]}
                  onChange={(e) => updateRgb(ch, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">HSL</p>
            <div className="grid grid-cols-3 gap-2">
              {["h", "s", "l"].map((ch) => (
                <input
                  key={ch}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max={ch === "h" ? 360 : 100}
                  className={`${inputClass} text-center font-mono`}
                  value={hsl[ch]}
                  onChange={(e) => updateHsl(ch, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <CopyField label="Hex code" value={hex} />
            <CopyField label="RGB" value={rgbString} />
            <CopyField label="HSL" value={hslString} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Wand2, Loader2, FileOutput } from "lucide-react";

// Loads the background-removal library via a runtime-injected native
// <script type="module"> element rather than a JS import() expression.
// This library has repeatedly broken when Next.js's bundler (both Webpack
// and Turbopack) tries to statically process it — a plain <script> tag's
// text content is parsed and executed only by the browser itself, so no
// bundler ever touches it, regardless of build configuration.
let cachedRemoveBackground = null;

function loadRemoveBackground() {
  if (cachedRemoveBackground) return Promise.resolve(cachedRemoveBackground);
  if (window.__imglyRemoveBackground) {
    cachedRemoveBackground = window.__imglyRemoveBackground;
    return Promise.resolve(cachedRemoveBackground);
  }
  return new Promise((resolve, reject) => {
    const onReady = () => {
      window.removeEventListener("imgly-bg-removal-ready", onReady);
      cachedRemoveBackground = window.__imglyRemoveBackground;
      if (cachedRemoveBackground) resolve(cachedRemoveBackground);
      else reject(new Error("Background removal module loaded but export was missing"));
    };
    window.addEventListener("imgly-bg-removal-ready", onReady);
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import removeBackground from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm";
      window.__imglyRemoveBackground = removeBackground;
      window.dispatchEvent(new Event("imgly-bg-removal-ready"));
    `;
    script.onerror = () => {
      window.removeEventListener("imgly-bg-removal-ready", onReady);
      reject(new Error("Failed to load the background removal module script"));
    };
    document.head.appendChild(script);
  });
}

export default function BackgroundRemoverClient() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setError(null);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setStatusText("Loading on-device model…");
    try {
      const removeBackground = await loadRemoveBackground();
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          if (key.startsWith("fetch")) {
            setStatusText(`Downloading model — ${Math.round((current / total) * 100)}%`);
          } else {
            setStatusText(`Processing image — ${Math.round((current / total) * 100)}%`);
          }
        },
      });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("Background removal failed:", e);
      const isNetworkError = String(e?.message || e).toLowerCase().includes("fetch");
      setError(
        isNetworkError
          ? "Couldn't download the AI model — an ad blocker or privacy extension may be blocking it. Try an incognito/private window, or disable extensions for this site."
          : "Couldn't process that image. Try a smaller file or a different photo."
      );
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "background-removed.png";
    a.click();
  };

  const checkerBg = {
    backgroundImage: "repeating-conic-gradient(#e2e8f0 0% 25%, #f8fafc 0% 50%) 50% / 20px 20px",
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
          <Wand2 className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a photo, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">
            First use downloads a small AI model, cached in your browser after that
          </p>
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
              <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                <img src={imageUrl} alt="Original, before background removal" className="max-h-52 w-full object-contain" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Background removed</p>
              <div
                className="flex h-52 items-center justify-center overflow-hidden rounded-xl border border-slate-800"
                style={checkerBg}
              >
                {busy ? (
                  <div className="flex flex-col items-center gap-2 px-4 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
                    <p className="text-[11px] text-slate-600">{statusText}</p>
                  </div>
                ) : resultUrl ? (
                  <img src={resultUrl} alt="Background removed result" className="max-h-52 w-full object-contain" />
                ) : (
                  <p className="px-4 text-center text-xs text-slate-500">Tap "Remove background" to start</p>
                )}
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={busy}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {busy ? "Processing…" : resultUrl ? "Run again" : "Remove background"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download PNG
              </button>
            )}
            <button
              onClick={() => {
                setFile(null);
                setImageUrl(null);
                setResultUrl(null);
              }}
              className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

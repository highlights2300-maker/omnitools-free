"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Shrink, FileText, Loader2, FileOutput } from "lucide-react";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function PdfCompressorClient() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [dpi, setDpi] = useState(110);
  const [quality, setQuality] = useState(0.6);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = async (f) => {
    if (!f || f.type !== "application/pdf") return;
    setError(null);
    setResultUrl(null);
    setFile(f);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes.slice(0));
      setPageCount(doc.getPageCount());
    } catch (e) {
      setPageCount(0);
    }
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const bytes = await file.arrayBuffer();
      const srcDoc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= srcDoc.numPages; i++) {
        setStatusText(`Rendering page ${i} of ${srcDoc.numPages}…`);
        const page = await srcDoc.getPage(i);
        const pointsViewport = page.getViewport({ scale: 1 });
        const renderViewport = page.getViewport({ scale: dpi / 72 });

        const canvas = document.createElement("canvas");
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;

        const jpegBytes = await new Promise((resolve) =>
          canvas.toBlob((b) => b.arrayBuffer().then(resolve), "image/jpeg", quality)
        );
        const embedded = await outDoc.embedJpg(jpegBytes);
        const outPage = outDoc.addPage([pointsViewport.width, pointsViewport.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: pointsViewport.width, height: pointsViewport.height });
      }

      setStatusText("Finalizing…");
      const outBytes = await outDoc.save();
      const blob = new Blob([outBytes], { type: "application/pdf" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setResultSize(blob.size);
    } catch (e) {
      setError("Couldn't compress that PDF. Try a different file.");
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "compressed.pdf";
    a.click();
  };

  const savings = file && resultSize ? Math.max(0, 100 - (resultSize / file.size) * 100) : 0;

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
          <Shrink className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a PDF, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Best for scanned documents or image-heavy PDFs</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
            <FileText className="h-8 w-8 shrink-0 text-amber-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-200">{file.name}</p>
              <p className="font-mono text-xs text-slate-500">
                {formatBytes(file.size)} {pageCount ? `· ${pageCount} pages` : ""}
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[11px] text-amber-200/80">
            Pages are re-rendered as images to shrink file size — text in the output PDF will no longer be
            selectable or searchable. Best suited to scans and image-heavy documents.
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Resolution — {dpi} DPI
              </label>
              <input
                type="range"
                min="72"
                max="200"
                step="6"
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value))}
                className="h-12 w-full accent-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Image quality — {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.2"
                max="0.9"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="h-12 w-full accent-amber-400"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={compress}
              disabled={busy}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shrink className="h-4 w-4" />}
              {busy ? statusText || "Compressing…" : "Compress PDF"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download · {formatBytes(resultSize)} ({savings.toFixed(0)}% smaller)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

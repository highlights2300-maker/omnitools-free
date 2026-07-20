"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { Scissors, FileText, Loader2, FileOutput } from "lucide-react";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function PdfSplitterClient() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = async (f) => {
    if (!f || f.type !== "application/pdf") return;
    setError(null);
    setResultUrl(null);
    setFile(f);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch (e) {
      setError("Couldn't read that PDF — make sure it isn't password-protected.");
      setPageCount(0);
    }
  };

  const split = async () => {
    if (!file || pageCount < 2) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const zip = new JSZip();
      const baseName = file.name.replace(/\.pdf$/i, "");
      for (let i = 0; i < src.getPageCount(); i++) {
        const single = await PDFDocument.create();
        const [page] = await single.copyPages(src, [i]);
        single.addPage(page);
        const pdfBytes = await single.save();
        zip.file(`${baseName}-page-${i + 1}.pdf`, pdfBytes);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(zipBlob);
      });
    } catch (e) {
      setError("Something went wrong splitting that PDF. Try a different file.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "split-pages.zip";
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
          <Scissors className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a PDF, or tap to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Every page becomes its own PDF, packed into a ZIP</p>
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

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={split}
              disabled={pageCount < 2 || busy}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
              {busy ? "Splitting…" : `Split into ${pageCount || "…"} PDFs`}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download split-pages.zip
              </button>
            )}
            <button
              onClick={() => {
                setFile(null);
                setResultUrl(null);
                setPageCount(0);
              }}
              className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

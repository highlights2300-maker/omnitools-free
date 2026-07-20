"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileStack, ChevronUp, ChevronDown, Trash2, Loader2, Layers, FileOutput } from "lucide-react";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function PdfMergerClient() {
  const [files, setFiles] = useState([]); // { id, file }
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type === "application/pdf");
    if (!picked.length) return;
    setResultUrl(null);
    setError(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const move = (index, dir) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const { file } of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const mergedBytes = await merged.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      setError("Couldn't merge those files — make sure each one is a valid, unencrypted PDF.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "merged.pdf";
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-10 text-center transition hover:border-amber-400/40"
      >
        <FileStack className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop PDFs here, or tap to add files</p>
        <p className="mt-1 text-xs text-slate-500">Add two or more — reorder them below before merging</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((f, i) => (
            <div
              key={f.id}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-800 font-mono text-xs text-slate-400">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
              <span className="hidden font-mono text-[11px] text-slate-500 sm:inline">{formatBytes(f.file.size)}</span>
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Move up"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === files.length - 1}
                aria-label="Move down"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeFile(f.id)}
                aria-label="Remove file"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={merge}
          disabled={files.length < 2 || busy}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layers className="h-4 w-4" />}
          {busy ? "Merging…" : `Merge ${files.length || ""} PDFs`}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download merged.pdf
          </button>
        )}
      </div>
    </div>
  );
}

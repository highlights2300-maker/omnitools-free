"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { Archive, Trash2, Loader2, FileOutput } from "lucide-react";

const inputClass =
  "h-12 rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function FileArchiverClient() {
  const [files, setFiles] = useState([]); // { id, file }
  const [zipName, setZipName] = useState("archive");
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []);
    if (!picked.length) return;
    setResultUrl(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);

  const zipIt = async () => {
    if (!files.length) return;
    setBusy(true);
    try {
      const zip = new JSZip();
      files.forEach(({ file }) => zip.file(file.name, file));
      const blob = await zip.generateAsync({ type: "blob" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setResultSize(blob.size);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${zipName || "archive"}.zip`;
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
        <Archive className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop any files here, or tap to add</p>
        <p className="mt-1 text-xs text-slate-500">Any file type — they'll be packed into one ZIP</p>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
              <span className="hidden font-mono text-[11px] text-slate-500 sm:inline">{formatBytes(f.file.size)}</span>
              <button
                onClick={() => removeFile(f.id)}
                aria-label="Remove file"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <p className="pt-1 text-[11px] text-slate-500">
            {files.length} file{files.length > 1 ? "s" : ""} · {formatBytes(totalSize)} total
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="text-xs text-slate-500">Archive name</label>
        <input className={`${inputClass} w-40`} value={zipName} onChange={(e) => setZipName(e.target.value)} />
        <span className="text-xs text-slate-500">.zip</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={zipIt}
          disabled={!files.length || busy}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Archive className="h-4 w-4" />}
          {busy ? "Zipping…" : `Zip ${files.length || ""} files`}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-amber-400/40 px-5 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download {zipName || "archive"}.zip · {formatBytes(resultSize)}
          </button>
        )}
      </div>
    </div>
  );
}

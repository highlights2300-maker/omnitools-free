"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileOutput } from "lucide-react";

const textareaClass =
  "h-64 w-full rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-100 outline-none transition focus:border-amber-400/50";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const cleaned = rows.filter((r) => !(r.length === 1 && r[0] === ""));
  if (!cleaned.length) return [];
  const headers = cleaned[0];
  return cleaned.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => (obj[h] = r[idx] ?? ""));
    return obj;
  });
}

function toCsv(arr) {
  if (!Array.isArray(arr) || !arr.length) return "";
  const headers = Array.from(
    arr.reduce((set, row) => {
      Object.keys(row || {}).forEach((k) => set.add(k));
      return set;
    }, new Set())
  );
  const escape = (val) => {
    const s = val === null || val === undefined ? "" : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.map(escape).join(",")];
  arr.forEach((row) => lines.push(headers.map((h) => escape(row[h])).join(",")));
  return lines.join("\n");
}

export default function CsvJsonConverterClient() {
  const [mode, setMode] = useState("csv-to-json");
  const [input, setInput] = useState(
    "name,role,department\nAva Chen,Designer,Product\nLiam Ortiz,Engineer,Platform"
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      if (mode === "csv-to-json") {
        setOutput(JSON.stringify(parseCsv(input), null, 2));
      } else {
        const parsed = JSON.parse(input);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        setOutput(toCsv(arr));
      }
    } catch (e) {
      setError(mode === "csv-to-json" ? "Couldn't parse that as CSV." : "That doesn't look like valid JSON.");
      setOutput("");
    }
  }, [input, mode]);

  const onPickFile = (f) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result || ""));
    reader.readAsText(f);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!output) return;
    const ext = mode === "csv-to-json" ? "json" : "csv";
    const type = mode === "csv-to-json" ? "application/json" : "text/csv";
    const blob = new Blob([output], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          {[
            ["csv-to-json", "CSV → JSON"],
            ["json-to-csv", "JSON → CSV"],
          ].map(([m, label]) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setInput(
                  m === "csv-to-json"
                    ? "name,role,department\nAva Chen,Designer,Product\nLiam Ortiz,Engineer,Platform"
                    : '[\n  { "name": "Ava Chen", "role": "Designer" },\n  { "name": "Liam Ortiz", "role": "Engineer" }\n]'
                );
              }}
              className={`h-10 rounded-lg px-4 text-xs font-medium transition ${
                mode === m ? "bg-amber-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-4 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <UploadCloud className="h-3.5 w-3.5" />
          Load a file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,text/csv,application/json"
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0])}
        />
      </div>

      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            {mode === "csv-to-json" ? "CSV input" : "JSON input"}
          </label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaClass} />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            {mode === "csv-to-json" ? "JSON output" : "CSV output"}
          </label>
          <textarea readOnly value={output} className={textareaClass} />
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={download}
          disabled={!output}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileOutput className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={copy}
          disabled={!output}
          className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
    </div>
  );
}

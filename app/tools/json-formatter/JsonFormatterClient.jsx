"use client";

import { useState } from "react";
import { Copy, Check, Trash2, AlertCircle } from "lucide-react";

const textareaClass =
  "h-72 w-full resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-100 outline-none transition focus:border-violet-400/50";

export default function JsonFormatterClient() {
  const [input, setInput] = useState('{\n  "name": "Ava Chen",\n  "role": "Designer",\n  "active": true,\n  "projects": ["Website", "Brand Kit"]\n}');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  let formatted = "";
  let parsedOk = false;
  try {
    const parsed = JSON.parse(input);
    formatted = JSON.stringify(parsed, null, indent);
    parsedOk = true;
  } catch (e) {
    formatted = "";
  }

  const validate = () => {
    try {
      JSON.parse(input);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const beautify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const copy = async () => {
    const toCopy = formatted || input;
    if (!toCopy) return;
    await navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={beautify}
          className="h-10 rounded-lg bg-violet-400 px-4 text-xs font-semibold text-slate-950 transition hover:bg-violet-300"
        >
          Beautify
        </button>
        <button
          onClick={minify}
          className="h-10 rounded-lg border border-slate-700 px-4 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Minify
        </button>
        <button
          onClick={validate}
          className="h-10 rounded-lg border border-slate-700 px-4 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Validate
        </button>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs text-slate-500">Indent</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="h-10 rounded-lg border border-slate-800 bg-slate-950/60 px-2 text-xs text-slate-100 outline-none"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        spellCheck={false}
        className={textareaClass}
        placeholder="Paste your JSON here…"
      />

      <div className="mt-2 flex items-center gap-2 text-xs">
        {error ? (
          <span className="flex items-center gap-1.5 text-red-400">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </span>
        ) : (
          <span className={parsedOk ? "text-emerald-400" : "text-slate-500"}>
            {parsedOk ? "Valid JSON" : "Waiting for valid JSON…"}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={copy}
          disabled={!formatted && !input}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy result"}
        </button>
        <button
          onClick={() => {
            setInput("");
            setError(null);
          }}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
      </div>
    </div>
  );
}

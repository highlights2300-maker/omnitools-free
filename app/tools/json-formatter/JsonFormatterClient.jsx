"use client";

import { useState } from "react";
import { Copy, Check, Trash2, AlertCircle, Download } from "lucide-react";

const textareaClass =
  "h-72 w-full resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-100 outline-none transition focus:border-violet-400/50";

const SAMPLE = '{\n  "name": "Ava Chen",\n  "role": "Designer",\n  "active": true,\n  "projects": ["Website", "Brand Kit"]\n}';
const BROKEN_SAMPLE = "{\n  'name': 'Ava Chen',\n  \"projects\": [\"Website\", \"Brand Kit\",],\n}";

const INCOMPLETE = /end of json|unterminated|unexpected eof|unexpected end|end of data/i;

function lineCol(text, pos) {
  const before = text.slice(0, pos);
  return { line: before.split("\n").length, col: pos - before.lastIndexOf("\n") };
}

// Some browsers report only the offending token, not where it is. Find the first place the text stops being a
// valid start of JSON (a prefix error that is not just "ran out of input"), using a binary search.
function findErrorOffset(text) {
  if (text.length > 200000) return null;
  const incomplete = (n) => {
    try {
      JSON.parse(text.slice(0, n));
      return true;
    } catch (e) {
      // "ran out of input" wording, or an error reported exactly at the end of the prefix
      const at = /position (\d+)/i.exec(e.message);
      return INCOMPLETE.test(e.message) || (at !== null && Number(at[1]) >= n);
    }
  };
  let lo = 0;
  let hi = text.length;
  if (incomplete(hi)) return null;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (incomplete(mid)) lo = mid + 1;
    else hi = mid;
  }
  return Math.max(0, lo - 1);
}

// Make the browser's error message easier to act on by adding a line and column when it doesn't give one.
function explain(message, text) {
  if (/line \d+/i.test(message)) return message;
  const m = /position (\d+)/i.exec(message);
  const pos = m ? Number(m[1]) : findErrorOffset(text);
  if (pos == null) return message;
  const { line, col } = lineCol(text, pos);
  return `${message} (near line ${line}, column ${col})`;
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, k) => {
        acc[k] = sortKeys(value[k]);
        return acc;
      }, {});
  }
  return value;
}

export default function JsonFormatterClient() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const [sorted, setSorted] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  let formatted = "";
  let parsedOk = false;
  let liveError = null;
  let precisionWarning = false;
  if (input.trim()) {
    try {
      let parsed = JSON.parse(input);
      if (sorted) parsed = sortKeys(parsed);
      formatted = JSON.stringify(parsed, null, indent);
      parsedOk = true;
      // JavaScript keeps ~15-17 significant digits; longer integers get rounded when re-written.
      const longInts = input.match(/(?<![\w."-])-?\d{16,}(?![\w."])/g) || [];
      precisionWarning = longInts.some((n) => !formatted.includes(n));
    } catch (e) {
      liveError = explain(e.message, input);
    }
  }

  const apply = (fn) => {
    try {
      let parsed = JSON.parse(input);
      if (sorted) parsed = sortKeys(parsed);
      setInput(fn(parsed));
      setError(null);
    } catch (e) {
      setError(explain(e.message, input));
    }
  };

  const validate = () => setError(liveError);
  const minify = () => apply((p) => JSON.stringify(p));
  const beautify = () => apply((p) => JSON.stringify(p, null, indent));

  const copy = async () => {
    const toCopy = formatted || input;
    if (!toCopy) return;
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopyFailed(true);
    }
  };

  const download = () => {
    if (!formatted) return;
    const url = URL.createObjectURL(new Blob([formatted], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shownError = error || (input.trim() && !parsedOk ? liveError : null);
  const bytes = new Blob([input]).size;

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
        <label htmlFor="json-sort" className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
          <input
            id="json-sort"
            type="checkbox"
            checked={sorted}
            onChange={(e) => setSorted(e.target.checked)}
            className="h-4 w-4 accent-violet-400"
          />
          Sort keys A–Z
        </label>
        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="json-indent" className="text-xs text-slate-500">
            Indent
          </label>
          <select
            id="json-indent"
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
        aria-label="JSON input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        spellCheck={false}
        className={textareaClass}
        placeholder="Paste your JSON here…"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs" aria-live="polite">
        {shownError ? (
          <span className="flex items-start gap-1.5 text-red-400">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {shownError}
          </span>
        ) : (
          <span className={parsedOk ? "text-emerald-400" : "text-slate-500"}>
            {parsedOk ? "Valid JSON" : "Waiting for JSON…"}
          </span>
        )}
        <span className="text-slate-600">{bytes.toLocaleString()} bytes</span>
      </div>
      {precisionWarning && (
        <p className="mt-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
          This JSON has a whole number with more than 15 digits. Browsers round those when re-writing JSON, so the
          formatted result may show a slightly different number. Keep such values as text (in quotes) if exactness matters.
        </p>
      )}
      {copyFailed && (
        <p className="mt-2 text-xs text-amber-300">Your browser blocked copying. Select the text and copy it manually.</p>
      )}

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
          onClick={download}
          disabled={!formatted}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download className="h-4 w-4" />
          Download .json
        </button>
        <button
          onClick={() => {
            setInput(BROKEN_SAMPLE);
            setError(null);
          }}
          className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Try a broken example
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

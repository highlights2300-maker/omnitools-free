"use client";

import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";

function toWords(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}

const TRANSFORMS = {
  "UPPERCASE": (s) => s.toUpperCase(),
  "lowercase": (s) => s.toLowerCase(),
  "Title Case": (s) =>
    s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  "Sentence case": (s) => {
    const lower = s.toLowerCase();
    return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  },
  "camelCase": (s) => {
    const words = toWords(s).map((w) => w.toLowerCase());
    return words.map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))).join("");
  },
  "PascalCase": (s) =>
    toWords(s)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(""),
  "snake_case": (s) => toWords(s).map((w) => w.toLowerCase()).join("_"),
  "kebab-case": (s) => toWords(s).map((w) => w.toLowerCase()).join("-"),
  "CONSTANT_CASE": (s) => toWords(s).map((w) => w.toUpperCase()).join("_"),
};

export default function TextCaseConverterClient() {
  const [text, setText] = useState("The Quick Brown Fox Jumps Over the Lazy Dog");
  const [copied, setCopied] = useState(false);

  const apply = (fn) => setText((prev) => fn(prev));

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        className="h-40 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100 outline-none transition focus:border-violet-400/50"
      />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(TRANSFORMS).map(([label, fn]) => (
          <button
            key={label}
            onClick={() => apply(fn)}
            className="h-11 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={copy}
          disabled={!text}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
        <button
          onClick={() => setText("")}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
      </div>
    </div>
  );
}

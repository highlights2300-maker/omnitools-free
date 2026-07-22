"use client";

import { useState } from "react";

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
      <div className="font-mono text-xl font-semibold text-amber-400">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

export default function WordCounterClient() {
  const [text, setText] = useState("");

  const trimmed = text.trim();
  const words = trimmed.length ? trimmed.split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || (trimmed ? 1 : 0) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        className="h-64 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100 outline-none transition focus:border-amber-400/50"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatBox label="Words" value={words} />
        <StatBox label="Characters" value={chars} />
        <StatBox label="No spaces" value={charsNoSpaces} />
        <StatBox label="Sentences" value={sentences} />
        <StatBox label="Paragraphs" value={paragraphs} />
        <StatBox label="Read time" value={`${readingTime} min`} />
      </div>
    </div>
  );
}

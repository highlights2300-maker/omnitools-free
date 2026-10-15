"use client";

import { useMemo, useState } from "react";

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
      <div className="font-mono text-xl font-semibold text-amber-400">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

// Small English stop-word list so the "top words" view shows meaningful words.
const STOP = new Set(
  "a an and are as at be but by for from had has have he her his i if in is it its me my of on or our she so that the their them they this to was we were what when which who will with you your".split(
    " "
  )
);

const LIMITS = [
  { label: "X post (standard)", max: 280 },
  { label: "SMS (one segment)", max: 160 },
  { label: "Meta description (guideline)", max: 160 },
  { label: "Page title (guideline)", max: 60 },
];

function fmtMinutes(words, wpm) {
  if (words === 0) return "0 min";
  const mins = words / wpm;
  if (mins < 1) return `${Math.max(1, Math.round(mins * 60))} sec`;
  return `${Math.round(mins)} min`;
}

export default function WordCounterClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordList = trimmed ? trimmed.split(/\s+/) : [];
    const chars = [...text].length; // counts emoji and accented letters as one character each
    const charsNoSpaces = [...text.replace(/\s/g, "")].length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || 1 : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length).length : 0;

    const freq = new Map();
    for (const raw of wordList) {
      const w = raw.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
      if (w.length < 2 || STOP.has(w)) continue;
      freq.set(w, (freq.get(w) || 0) + 1);
    }
    const top = [...freq.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6);

    return { words: wordList.length, chars, charsNoSpaces, sentences, paragraphs, top };
  }, [text]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <textarea
        aria-label="Text to count"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        className="h-64 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100 outline-none transition focus:border-amber-400/50"
      />
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => setText("")}
          disabled={!text}
          className="h-9 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear text
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-live="polite">
        <StatBox label="Words" value={stats.words.toLocaleString()} />
        <StatBox label="Characters" value={stats.chars.toLocaleString()} />
        <StatBox label="No spaces" value={stats.charsNoSpaces.toLocaleString()} />
        <StatBox label="Sentences" value={stats.sentences.toLocaleString()} />
        <StatBox label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
        <StatBox label="Reading time" value={fmtMinutes(stats.words, 200)} />
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Reading time assumes 200 words per minute. Speaking time at 130 words per minute: {fmtMinutes(stats.words, 130)}.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <h2 className="mb-2 text-xs font-medium text-slate-300">Character limits (typical values)</h2>
          <ul className="space-y-1.5 text-xs">
            {LIMITS.map((l) => {
              const left = l.max - stats.chars;
              return (
                <li key={l.label} className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">
                    {l.label}: {l.max}
                  </span>
                  <span className={`font-mono ${left < 0 ? "text-red-400" : "text-emerald-400"}`}>
                    {left < 0 ? `${Math.abs(left)} over` : `${left} left`}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-[11px] text-slate-500">Platforms change their limits, so check the current rule.</p>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <h2 className="mb-2 text-xs font-medium text-slate-300">Most repeated words</h2>
          {stats.top.length === 0 ? (
            <p className="text-xs text-slate-500">Words that appear more than once will be listed here.</p>
          ) : (
            <ul className="flex flex-wrap gap-2 text-xs">
              {stats.top.map(([w, n]) => (
                <li key={w} className="rounded-full border border-slate-700 px-2.5 py-1 text-slate-300">
                  {w} <span className="font-mono text-amber-400">×{n}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-[11px] text-slate-500">Common English words such as “the” and “and” are left out.</p>
        </section>
      </div>
    </div>
  );
}

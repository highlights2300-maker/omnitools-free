"use client";

import { useMemo, useState } from "react";
import { GitCompare, ArrowLeftRight } from "lucide-react";

const textareaClass =
  "h-56 w-full resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-100 outline-none transition focus:border-violet-400/50";

// Largest dynamic-programming table we are willing to build (cells). Beyond this the
// comparison would freeze the tab, so we ask the user to compare smaller pieces.
const MAX_CELLS = 16_000_000;

// Longest-common-subsequence diff over arrays of strings. `keys` are the values that
// are compared (possibly normalised); `texts` are the originals shown to the user.
function lcsDiff(aKeys, bKeys, aTexts, bTexts) {
  let start = 0;
  while (start < aKeys.length && start < bKeys.length && aKeys[start] === bKeys[start]) start++;
  let endA = aKeys.length;
  let endB = bKeys.length;
  while (endA > start && endB > start && aKeys[endA - 1] === bKeys[endB - 1]) {
    endA--;
    endB--;
  }
  const n = endA - start;
  const m = endB - start;
  if ((n + 1) * (m + 1) > MAX_CELLS) return null;

  const w = m + 1;
  const dp = new Uint32Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * w + j] =
        aKeys[start + i] === bKeys[start + j]
          ? dp[(i + 1) * w + j + 1] + 1
          : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
    }
  }

  const out = [];
  for (let k = 0; k < start; k++) out.push({ type: "same", text: bTexts[k] });
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (aKeys[start + i] === bKeys[start + j]) {
      out.push({ type: "same", text: bTexts[start + j] });
      i++;
      j++;
    } else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) {
      out.push({ type: "removed", text: aTexts[start + i] });
      i++;
    } else {
      out.push({ type: "added", text: bTexts[start + j] });
      j++;
    }
  }
  while (i < n) out.push({ type: "removed", text: aTexts[start + i++] });
  while (j < m) out.push({ type: "added", text: bTexts[start + j++] });
  for (let k = endB; k < bTexts.length; k++) out.push({ type: "same", text: bTexts[k] });
  return out;
}

const splitWords = (s) => s.match(/\s+|[^\s]+/g) || [];

// For a removed line paired with an added line, mark which words differ.
// Skipped (returns null) for very long lines, so the page never freezes on big pastes.
const WORD_CELLS_PER_LINE = 90_000;
function wordParts(oldLine, newLine, budget) {
  const a = splitWords(oldLine);
  const b = splitWords(newLine);
  const cost = (a.length + 1) * (b.length + 1);
  if (cost > WORD_CELLS_PER_LINE || cost > budget.left) return null;
  budget.left -= cost;
  return lcsDiff(a, b, a, b);
}

function diffText(original, changed, { ignoreCase, ignoreSpace }) {
  const norm = (s) => {
    let v = s;
    if (ignoreSpace) v = v.trim().replace(/\s+/g, " ");
    if (ignoreCase) v = v.toLowerCase();
    return v;
  };
  const a = original.replace(/\r\n?/g, "\n").split("\n");
  const b = changed.replace(/\r\n?/g, "\n").split("\n");
  const lines = lcsDiff(a.map(norm), b.map(norm), a, b);
  if (!lines) return null;

  // Pair up each run of removed lines with the added lines that follow it, so changed
  // words can be highlighted inside a replaced line.
  const budget = { left: 3_000_000 };
  let k = 0;
  while (k < lines.length) {
    if (lines[k].type !== "removed") {
      k++;
      continue;
    }
    let r = k;
    while (r < lines.length && lines[r].type === "removed") r++;
    let ad = r;
    while (ad < lines.length && lines[ad].type === "added") ad++;
    const pairs = Math.min(r - k, ad - r);
    for (let p = 0; p < pairs; p++) {
      const oldL = lines[k + p];
      const newL = lines[r + p];
      const parts = wordParts(oldL.text, newL.text, budget);
      if (parts) {
        oldL.parts = parts.filter((x) => x.type !== "added");
        newL.parts = parts.filter((x) => x.type !== "removed");
      }
    }
    k = ad;
  }
  return lines;
}

function Line({ line }) {
  const base = "px-2 py-0.5 whitespace-pre-wrap break-words border-l-2 ";
  const cls =
    line.type === "added"
      ? base + "border-emerald-400 bg-emerald-400/10 text-emerald-300"
      : line.type === "removed"
      ? base + "border-red-400 bg-red-400/10 text-red-300"
      : base + "border-transparent text-slate-400";
  const mark = line.type === "added" ? "+ " : line.type === "removed" ? "− " : "  ";
  const hi = line.type === "added" ? "bg-emerald-400/30 text-emerald-100 rounded-sm" : "bg-red-400/30 text-red-100 rounded-sm";
  return (
    <div className={cls}>
      <span aria-hidden="true" className="select-none opacity-60">
        {mark}
      </span>
      <span className="sr-only">{line.type === "added" ? "Added: " : line.type === "removed" ? "Removed: " : ""}</span>
      {line.parts
        ? line.parts.map((p, i) => (
            <span key={i} className={p.type === "same" ? "" : hi}>
              {p.text}
            </span>
          ))
        : line.text || " "}
    </div>
  );
}

function Toggle({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-amber-400"
      />
      {children}
    </label>
  );
}

export default function TextDiffCheckerClient() {
  const [original, setOriginal] = useState("The quick brown fox\njumps over the lazy dog.\nThe end.");
  const [changed, setChanged] = useState("The quick brown fox\njumps over the sleepy dog.\nThe very end.");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreSpace, setIgnoreSpace] = useState(false);
  const [onlyChanges, setOnlyChanges] = useState(false);

  const diff = useMemo(
    () => diffText(original, changed, { ignoreCase, ignoreSpace }),
    [original, changed, ignoreCase, ignoreSpace]
  );
  const addedCount = diff ? diff.filter((d) => d.type === "added").length : 0;
  const removedCount = diff ? diff.filter((d) => d.type === "removed").length : 0;
  const identical = diff && addedCount === 0 && removedCount === 0;
  const shown = diff ? (onlyChanges ? diff.filter((d) => d.type !== "same") : diff) : [];

  const swap = () => {
    setOriginal(changed);
    setChanged(original);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diff-original" className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            Original
          </label>
          <textarea
            id="diff-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            spellCheck={false}
            className={textareaClass}
          />
        </div>
        <div>
          <label htmlFor="diff-changed" className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            Changed
          </label>
          <textarea
            id="diff-changed"
            value={changed}
            onChange={(e) => setChanged(e.target.value)}
            spellCheck={false}
            className={textareaClass}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          onClick={swap}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Swap sides
        </button>
        <Toggle id="diff-case" checked={ignoreCase} onChange={setIgnoreCase}>
          Ignore upper/lower case
        </Toggle>
        <Toggle id="diff-space" checked={ignoreSpace} onChange={setIgnoreSpace}>
          Ignore extra spaces
        </Toggle>
        <Toggle id="diff-only" checked={onlyChanges} onChange={setOnlyChanges}>
          Show only changed lines
        </Toggle>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs" aria-live="polite">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {addedCount} line{addedCount !== 1 ? "s" : ""} added
        </span>
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          {removedCount} line{removedCount !== 1 ? "s" : ""} removed
        </span>
      </div>

      <div className="mt-3">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
          <GitCompare className="h-3 w-3" />
          Result
        </p>
        {diff === null ? (
          <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
            These two texts are too different and too long to compare in one go. Try comparing a smaller section at a time.
          </p>
        ) : (
          <div className="max-h-96 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs">
            {identical && (
              <p className="mb-2 rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-300">
                No differences found. The two texts match{ignoreCase || ignoreSpace ? " with the options above applied" : ""}.
              </p>
            )}
            {shown.map((line, idx) => (
              <Line key={idx} line={line} />
            ))}
          </div>
        )}
        <p className="mt-2 text-[11px] text-slate-500">
          Lines are compared one by one. Inside a line that was changed, the words that differ are highlighted.
        </p>
      </div>
    </div>
  );
}

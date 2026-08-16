"use client";

import { useMemo, useState } from "react";
import { GitCompare } from "lucide-react";

const textareaClass =
  "h-56 w-full resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-100 outline-none transition focus:border-violet-400/50";

function diffLines(oldText, newText) {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const n = oldLines.length,
    m = newLines.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = oldLines[i] === newLines[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const result = [];
  let i = 0,
    j = 0;
  while (i < n && j < m) {
    if (oldLines[i] === newLines[j]) {
      result.push({ type: "same", text: oldLines[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "removed", text: oldLines[i] });
      i++;
    } else {
      result.push({ type: "added", text: newLines[j] });
      j++;
    }
  }
  while (i < n) {
    result.push({ type: "removed", text: oldLines[i] });
    i++;
  }
  while (j < m) {
    result.push({ type: "added", text: newLines[j] });
    j++;
  }
  return result;
}

export default function TextDiffCheckerClient() {
  const [original, setOriginal] = useState("The quick brown fox\njumps over the lazy dog.\nThe end.");
  const [changed, setChanged] = useState("The quick brown fox\njumps over the sleepy dog.\nThe very end.");

  const diff = useMemo(() => diffLines(original, changed), [original, changed]);
  const addedCount = diff.filter((d) => d.type === "added").length;
  const removedCount = diff.filter((d) => d.type === "removed").length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Original</label>
          <textarea value={original} onChange={(e) => setOriginal(e.target.value)} spellCheck={false} className={textareaClass} />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Changed</label>
          <textarea value={changed} onChange={(e) => setChanged(e.target.value)} spellCheck={false} className={textareaClass} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs">
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
        <div className="max-h-96 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs">
          {diff.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === "added"
                  ? "border-l-2 border-emerald-400 bg-emerald-400/10 px-2 py-0.5 text-emerald-300"
                  : line.type === "removed"
                  ? "border-l-2 border-red-400 bg-red-400/10 px-2 py-0.5 text-red-300 line-through decoration-red-500/50"
                  : "border-l-2 border-transparent px-2 py-0.5 text-slate-400"
              }
            >
              {line.text || " "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

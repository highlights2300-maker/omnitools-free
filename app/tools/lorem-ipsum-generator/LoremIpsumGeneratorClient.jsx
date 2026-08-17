"use client";

import { useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim",
  "id", "est", "laborum", "at", "vero", "eos", "accusamus", "iusto", "odio", "dignissimos",
  "ducimus", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos",
];

const inputClass =
  "h-12 rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-violet-400/50";

function randomWord() {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence() {
  const len = 6 + Math.floor(Math.random() * 10);
  const words = Array.from({ length: len }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentenceCount) {
  return Array.from({ length: sentenceCount }, generateSentence).join(" ");
}

export default function LoremIpsumGeneratorClient() {
  const [unit, setUnit] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [startClassic, setStartClassic] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    // eslint-disable-next-line no-unused-expressions
    seed; // re-run generation when seed changes
    if (unit === "words") {
      const words = Array.from({ length: Math.max(1, count) }, randomWord);
      if (startClassic && words.length) {
        const classic = ["lorem", "ipsum", "dolor", "sit", "amet"];
        for (let i = 0; i < Math.min(classic.length, words.length); i++) words[i] = classic[i];
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(" ") + ".";
    }
    if (unit === "sentences") {
      const sentences = Array.from({ length: Math.max(1, count) }, generateSentence);
      if (startClassic) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      }
      return sentences.join(" ");
    }
    // paragraphs
    const paragraphs = Array.from({ length: Math.max(1, count) }, () =>
      generateParagraph(3 + Math.floor(Math.random() * 3))
    );
    if (startClassic && paragraphs.length) {
      paragraphs[0] =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        paragraphs[0];
    }
    return paragraphs.join("\n\n");
  }, [unit, count, startClassic, seed]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Generate</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={`${inputClass} w-36`}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Count</label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className={`${inputClass} w-24 font-mono`}
          />
        </div>
        <label className="mb-1 flex h-12 items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={startClassic}
            onChange={(e) => setStartClassic(e.target.checked)}
            className="h-4 w-4 accent-violet-400"
          />
          Start with classic opening
        </label>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="mb-1 inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-4 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Regenerate
        </button>
      </div>

      <div className="mt-4 max-h-96 overflow-y-auto whitespace-pre-line rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-300">
        {output}
      </div>

      <button
        onClick={copy}
        className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy to clipboard"}
      </button>
    </div>
  );
}

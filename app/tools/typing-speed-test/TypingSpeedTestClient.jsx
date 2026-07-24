"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Timer } from "lucide-react";

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant hills, painting the sky in brilliant shades of orange and pink.",
  "Learning to type quickly and accurately takes practice, but small daily improvements add up over time into a skill that saves hours of work every single week.",
  "A good cup of coffee in the morning can make even the busiest day feel a little more manageable, especially when paired with a quiet moment before the world wakes up.",
  "Technology changes fast, but the fundamentals of clear communication, careful thinking, and steady practice remain just as valuable as they were decades ago.",
  "Somewhere between the first draft and the final version, a piece of writing usually finds its true shape, often after several rounds of careful, patient editing.",
  "The best time to plant a tree was twenty years ago, and the second best time is now, which is a reminder that starting today still matters more than waiting.",
];

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
      <div className="font-mono text-xl font-semibold text-violet-400">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

export default function TypingSpeedTestClient() {
  const [passage, setPassage] = useState(PASSAGES[0]);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const inputRef = useRef(null);
  const tickRef = useRef(null);

  const pickNewPassage = () => {
    const next = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
    setPassage(next);
    setTyped("");
    setStartTime(null);
    setFinished(false);
    setElapsedMs(0);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (startTime && !finished) {
      tickRef.current = setInterval(() => setElapsedMs(Date.now() - startTime), 100);
    }
    return () => clearInterval(tickRef.current);
  }, [startTime, finished]);

  const onChange = (e) => {
    const value = e.target.value;
    if (value.length > passage.length) return;
    if (!startTime && value.length > 0) setStartTime(Date.now());
    setTyped(value);
    if (value.length === passage.length) {
      setFinished(true);
      setElapsedMs(Date.now() - (startTime || Date.now()));
      clearInterval(tickRef.current);
    }
  };

  let correctCount = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === passage[i]) correctCount++;
  }
  const accuracy = typed.length ? Math.round((correctCount / typed.length) * 100) : 100;
  const minutes = Math.max(elapsedMs / 60000, 1 / 600); // avoid divide-by-zero
  const wpm = typed.length ? Math.round(correctCount / 5 / minutes) : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div
        onClick={() => inputRef.current?.focus()}
        className="cursor-text rounded-xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-base leading-relaxed"
      >
        {passage.split("").map((char, i) => {
          let className = "text-slate-500";
          if (i < typed.length) {
            className = typed[i] === char ? "text-emerald-400" : "text-red-400 underline";
          } else if (i === typed.length) {
            className = "text-slate-100 bg-violet-400/30 rounded";
          }
          return (
            <span key={i} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={onChange}
        disabled={finished}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="mt-3 h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 font-mono text-sm text-slate-100 outline-none transition focus:border-violet-400/50"
        placeholder="Start typing here…"
      />

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatBox label="WPM" value={wpm} />
        <StatBox label="Accuracy" value={`${accuracy}%`} />
        <StatBox label="Time" value={`${(elapsedMs / 1000).toFixed(1)}s`} />
      </div>

      {finished && (
        <div className="mt-4 rounded-lg border border-violet-400/20 bg-violet-400/5 px-3 py-2 text-center text-sm text-violet-200">
          Finished! {wpm} words per minute at {accuracy}% accuracy.
        </div>
      )}

      <button
        onClick={pickNewPassage}
        className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
      >
        <RefreshCw className="h-4 w-4" />
        {finished ? "Try another passage" : "New passage"}
      </button>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-600">
        <Timer className="h-3 w-3" />
        The timer starts the moment you type your first character.
      </p>
    </div>
  );
}

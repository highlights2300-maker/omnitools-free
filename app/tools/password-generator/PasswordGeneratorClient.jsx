"use client";

import { useEffect, useState } from "react";
import { KeyRound, Copy, RefreshCw, Check } from "lucide-react";

const CHAR_SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};
const AMBIGUOUS = "il1Lo0O";

function secureRandomInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword({ length, lower, upper, numbers, symbols, excludeAmbiguous }) {
  let pool = "";
  if (lower) pool += CHAR_SETS.lower;
  if (upper) pool += CHAR_SETS.upper;
  if (numbers) pool += CHAR_SETS.numbers;
  if (symbols) pool += CHAR_SETS.symbols;
  if (!pool) return "";
  if (excludeAmbiguous) {
    pool = pool
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[secureRandomInt(pool.length)];
  }
  return result;
}

function estimateStrength(pw, options) {
  if (!pw) return { label: "—", pct: 0, color: "bg-slate-700" };
  let poolSize = 0;
  if (options.lower) poolSize += 26;
  if (options.upper) poolSize += 26;
  if (options.numbers) poolSize += 10;
  if (options.symbols) poolSize += CHAR_SETS.symbols.length;
  const entropy = pw.length * Math.log2(Math.max(poolSize, 1));
  if (entropy < 40) return { label: "Weak", pct: 25, color: "bg-red-400" };
  if (entropy < 60) return { label: "Fair", pct: 50, color: "bg-amber-400" };
  if (entropy < 80) return { label: "Strong", pct: 75, color: "bg-emerald-400" };
  return { label: "Very strong", pct: 100, color: "bg-emerald-400" };
}

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const options = { length, lower, upper, numbers, symbols, excludeAmbiguous };

  const regenerate = () => setPassword(generatePassword(options));

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, lower, upper, numbers, symbols, excludeAmbiguous]);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = estimateStrength(password, options);
  const noOptionsSelected = !lower && !upper && !numbers && !symbols;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-2">
        <div className="flex h-12 flex-1 items-center overflow-x-auto px-3 font-mono text-base text-slate-100">
          {password || (noOptionsSelected ? "Select at least one character type" : "…")}
        </div>
        <button
          onClick={copy}
          disabled={!password}
          aria-label="Copy password"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-100 disabled:opacity-30"
        >
          {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
        </button>
        <button
          onClick={regenerate}
          aria-label="Generate new password"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: `${strength.pct}%` }} />
        </div>
        <p className="mt-1 text-xs text-slate-500">{strength.label}</p>
      </div>

      <div className="mt-5">
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
          Length — {length} characters
        </label>
        <input
          type="range"
          min="6"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="h-12 w-full accent-violet-400"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          ["Lowercase (a-z)", lower, setLower],
          ["Uppercase (A-Z)", upper, setUpper],
          ["Numbers (0-9)", numbers, setNumbers],
          ["Symbols (!@#$…)", symbols, setSymbols],
          ["Exclude look-alikes (l, 1, O, 0)", excludeAmbiguous, setExcludeAmbiguous],
        ].map(([label, value, setter]) => (
          <label key={label} className="flex items-center gap-2 text-xs text-slate-300">
            <input type="checkbox" checked={value} onChange={(e) => setter(e.target.checked)} className="h-4 w-4 accent-violet-400" />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={regenerate}
        className="mt-5 inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
      >
        <KeyRound className="h-4 w-4" />
        Generate new password
      </button>
    </div>
  );
}

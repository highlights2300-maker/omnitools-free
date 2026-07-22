"use client";

import { useState } from "react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
      <div className="font-mono text-xl font-semibold text-amber-400">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

export default function TipCalculatorClient() {
  const [bill, setBill] = useState("50");
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);

  const billNum = Number(bill) || 0;
  const tipAmount = billNum * (tipPct / 100);
  const total = billNum + tipAmount;
  const perPerson = total / Math.max(1, Number(people) || 1);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Bill amount</label>
          <input
            type="number"
            inputMode="decimal"
            className={inputClass}
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Number of people</label>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            className={inputClass}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
          Tip percentage — {tipPct}%
        </label>
        <input
          type="range"
          min="0"
          max="30"
          value={tipPct}
          onChange={(e) => setTipPct(Number(e.target.value))}
          className="h-12 w-full accent-amber-400"
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatBox label="Tip" value={`$${tipAmount.toFixed(2)}`} />
        <StatBox label="Total" value={`$${total.toFixed(2)}`} />
        <StatBox label="Per person" value={`$${perPerson.toFixed(2)}`} />
      </div>
    </div>
  );
}

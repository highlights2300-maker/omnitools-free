"use client";

import { useState } from "react";

const inputClass =
  "h-12 rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

export default function PercentageCalculatorClient() {
  const [x, setX] = useState("20");
  const [y, setY] = useState("150");
  const [cost, setCost] = useState("100");
  const [markupPct, setMarkupPct] = useState("30");

  const percentOfValue = (Number(x) / 100) * Number(y || 0);
  const whatPercent = Number(y) ? (Number(x) / Number(y)) * 100 : 0;
  const markupPrice = Number(cost || 0) * (1 + Number(markupPct || 0) / 100);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <p className="mb-2 text-xs font-medium text-slate-300">What is X% of Y?</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <input
            type="number"
            inputMode="decimal"
            className={`${inputClass} w-24`}
            value={x}
            onChange={(e) => setX(e.target.value)}
          />
          <span className="text-slate-500">% of</span>
          <input
            type="number"
            inputMode="decimal"
            className={`${inputClass} w-28`}
            value={y}
            onChange={(e) => setY(e.target.value)}
          />
          <span className="text-slate-500">=</span>
          <span className="font-mono text-amber-400">
            {percentOfValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <p className="mb-1 text-xs font-medium text-slate-300">X is what % of Y?</p>
        <p className="font-mono text-amber-400">
          {whatPercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
        </p>
        <p className="mt-1 text-[11px] text-slate-500">Uses the same X and Y values entered above.</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <p className="mb-2 text-xs font-medium text-slate-300">Markup: cost + margin → sale price</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-500">Cost</span>
          <input
            type="number"
            inputMode="decimal"
            className={`${inputClass} w-24`}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <span className="text-slate-500">+ markup</span>
          <input
            type="number"
            inputMode="decimal"
            className={`${inputClass} w-20`}
            value={markupPct}
            onChange={(e) => setMarkupPct(e.target.value)}
          />
          <span className="text-slate-500">% =</span>
          <span className="font-mono text-amber-400">
            ${markupPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
      </section>
    </div>
  );
}

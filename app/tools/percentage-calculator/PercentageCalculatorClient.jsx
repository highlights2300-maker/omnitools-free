"use client";

import { useState } from "react";

const inputClass =
  "h-12 rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

// Empty or non-numeric input -> NaN so results show a dash instead of a wrong 0.
const num = (v) => (v.trim() === "" ? NaN : Number(v));
const fmt = (n, max = 2) =>
  Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: max }) : "—";

function NumberInput({ id, label, value, onChange, width = "w-28", step = "any" }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[11px] uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        className={`${inputClass} ${width}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Card({ title, children, result, note }) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <h2 className="mb-3 text-xs font-medium text-slate-300">{title}</h2>
      <div className="flex flex-wrap items-end gap-3 text-sm">{children}</div>
      <div className="mt-3 font-mono text-amber-400" aria-live="polite">
        {result}
      </div>
      {note && <p className="mt-1 text-[11px] text-slate-500">{note}</p>}
    </section>
  );
}

export default function PercentageCalculatorClient() {
  // 1. X% of Y
  const [a1, setA1] = useState("20");
  const [b1, setB1] = useState("150");
  // 2. X is what % of Y
  const [a2, setA2] = useState("30");
  const [b2, setB2] = useState("120");
  // 3. change from A to B
  const [from, setFrom] = useState("80");
  const [to, setTo] = useState("100");
  // 4. discount / increase
  const [price, setPrice] = useState("100");
  const [pct, setPct] = useState("15");
  // 5. markup and margin
  const [cost, setCost] = useState("100");
  const [markup, setMarkup] = useState("30");

  const r1 = (num(a1) / 100) * num(b1);
  const r2 = num(b2) === 0 ? NaN : (num(a2) / num(b2)) * 100;

  const f = num(from);
  const t = num(to);
  const change = f === 0 ? NaN : ((t - f) / Math.abs(f)) * 100;

  const p = num(price);
  const pc = num(pct);
  const afterDiscount = p * (1 - pc / 100);
  const afterIncrease = p * (1 + pc / 100);

  const c = num(cost);
  const m = num(markup);
  const salePrice = c * (1 + m / 100);
  const margin = salePrice === 0 ? NaN : ((salePrice - c) / salePrice) * 100;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <Card
        title="What is X% of Y?"
        result={`${fmt(num(a1), 10)}% of ${fmt(num(b1), 10)} = ${fmt(r1)}`}
      >
        <NumberInput id="pc-a1" label="Percent" value={a1} onChange={setA1} width="w-24" />
        <NumberInput id="pc-b1" label="Of" value={b1} onChange={setB1} />
      </Card>

      <Card
        title="X is what percent of Y?"
        result={
          num(b2) === 0
            ? "Y can't be zero"
            : `${fmt(num(a2), 10)} is ${fmt(r2)}% of ${fmt(num(b2), 10)}`
        }
      >
        <NumberInput id="pc-a2" label="X" value={a2} onChange={setA2} width="w-24" />
        <NumberInput id="pc-b2" label="Y" value={b2} onChange={setB2} />
      </Card>

      <Card
        title="Percentage change from one value to another"
        result={
          f === 0
            ? "Can't calculate a % change from 0"
            : Number.isFinite(change)
            ? `${change > 0 ? "Increase" : change < 0 ? "Decrease" : "No change"} of ${fmt(Math.abs(change))}%`
            : "—"
        }
        note="Change = (new − old) ÷ old. Going from 80 to 100 is +25%, but going from 100 back to 80 is −20%."
      >
        <NumberInput id="pc-from" label="Old value" value={from} onChange={setFrom} />
        <NumberInput id="pc-to" label="New value" value={to} onChange={setTo} />
      </Card>

      <Card
        title="Discount or increase a price by a percentage"
        result={
          <>
            <div>
              {fmt(pc, 10)}% off → {fmt(afterDiscount)} (you save {fmt(p - afterDiscount)})
            </div>
            <div>
              {fmt(pc, 10)}% on top → {fmt(afterIncrease)} (adds {fmt(afterIncrease - p)})
            </div>
          </>
        }
      >
        <NumberInput id="pc-price" label="Price" value={price} onChange={setPrice} />
        <NumberInput id="pc-pct" label="Percent" value={pct} onChange={setPct} width="w-24" />
      </Card>

      <Card
        title="Markup: cost + markup → sale price and margin"
        result={
          <>
            <div>Sale price: {fmt(salePrice)}</div>
            <div>Profit margin: {fmt(margin)}% of the sale price</div>
          </>
        }
        note="Markup is a percentage of cost; margin is a percentage of the sale price, so margin is always the smaller number."
      >
        <NumberInput id="pc-cost" label="Cost" value={cost} onChange={setCost} />
        <NumberInput id="pc-markup" label="Markup %" value={markup} onChange={setMarkup} width="w-24" />
      </Card>
    </div>
  );
}

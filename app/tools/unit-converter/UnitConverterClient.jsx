"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";
const selectClass =
  "h-12 rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

const LENGTH_UNITS = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 };
const WEIGHT_UNITS = { mg: 0.000001, g: 0.001, kg: 1, oz: 0.0283495, lb: 0.453592 };

export default function UnitConverterClient() {
  const [type, setType] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [value, setValue] = useState("1");

  const units = type === "length" ? LENGTH_UNITS : type === "weight" ? WEIGHT_UNITS : null;

  const convert = () => {
    const v = Number(value) || 0;
    if (type === "temperature") {
      if (from === to) return v;
      let celsius = from === "C" ? v : from === "F" ? ((v - 32) * 5) / 9 : v - 273.15;
      if (to === "C") return celsius;
      if (to === "F") return (celsius * 9) / 5 + 32;
      return celsius + 273.15;
    }
    const base = v * units[from];
    return base / units[to];
  };

  const result = convert();
  const unitList = type === "temperature" ? ["C", "F", "K"] : Object.keys(units);

  const changeType = (t) => {
    setType(t);
    if (t === "temperature") {
      setFrom("C");
      setTo("F");
    } else {
      const u = t === "length" ? LENGTH_UNITS : WEIGHT_UNITS;
      const keys = Object.keys(u);
      setFrom(keys[0]);
      setTo(keys[1]);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {["length", "weight", "temperature"].map((t) => (
          <button
            key={t}
            onClick={() => changeType(t)}
            className={`h-10 rounded-lg px-4 text-xs font-medium capitalize transition ${
              type === t ? "bg-amber-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              className={inputClass}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <select className={`${selectClass} w-24`} value={from} onChange={(e) => setFrom(e.target.value)}>
              {unitList.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="hidden items-center justify-center pb-2.5 text-slate-600 sm:flex">
          <ArrowRight className="h-4 w-4" />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">To</label>
          <div className="flex gap-2">
            <div className={`${inputClass} flex items-center font-mono text-amber-400`}>
              {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </div>
            <select className={`${selectClass} w-24`} value={to} onChange={(e) => setTo(e.target.value)}>
              {unitList.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

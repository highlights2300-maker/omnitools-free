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

export default function AgeCalculatorClient() {
  const [birth, setBirth] = useState("2000-01-01");
  const [until, setUntil] = useState(new Date().toISOString().slice(0, 10));

  const start = new Date(birth);
  const end = new Date(until);
  let years = 0,
    months = 0,
    days = 0;

  if (!isNaN(start) && !isNaN(end) && end >= start) {
    years = end.getFullYear() - start.getFullYear();
    months = end.getMonth() - start.getMonth();
    days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  }

  const totalDays = !isNaN(start) && !isNaN(end) ? Math.max(0, Math.round((end - start) / 86400000)) : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">From date</label>
          <input type="date" className={inputClass} value={birth} onChange={(e) => setBirth(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">To date</label>
          <input type="date" className={inputClass} value={until} onChange={(e) => setUntil(e.target.value)} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBox label="Years" value={years} />
        <StatBox label="Months" value={months} />
        <StatBox label="Days" value={days} />
        <StatBox label="Total days" value={totalDays.toLocaleString()} />
      </div>
    </div>
  );
}

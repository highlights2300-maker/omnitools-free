"use client";

import { useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

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

export default function TimesheetCalculatorClient() {
  const [rate, setRate] = useState("20");
  const [rows, setRows] = useState([
    { id: "1", day: "Monday", hours: "8" },
    { id: "2", day: "Tuesday", hours: "8" },
  ]);
  const rowIdCounter = useRef(2);

  const updateRow = (id, field, val) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  };
  const addRow = () => {
    rowIdCounter.current += 1;
    setRows((prev) => [...prev, { id: String(rowIdCounter.current), day: "", hours: "0" }]);
  };
  const removeRow = (id) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const totalHours = rows.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);
  const totalPay = totalHours * (Number(rate) || 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center gap-2">
        <label className="text-xs text-slate-500">Hourly rate</label>
        <input
          type="number"
          inputMode="decimal"
          className={`${inputClass} w-28`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-[1fr_100px_44px] items-center gap-2">
            <input
              className={inputClass}
              placeholder="Day"
              value={r.day}
              onChange={(e) => updateRow(r.id, "day", e.target.value)}
            />
            <input
              type="number"
              inputMode="decimal"
              className={`${inputClass} text-right font-mono`}
              value={r.hours}
              onChange={(e) => updateRow(r.id, "hours", e.target.value)}
            />
            <button
              onClick={() => removeRow(r.id)}
              aria-label="Remove day"
              className="flex h-12 w-12 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addRow}
        className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-4 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
      >
        <Plus className="h-3.5 w-3.5" />
        Add day
      </button>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatBox label="Total hours" value={totalHours} />
        <StatBox label="Total pay" value={`$${totalPay.toFixed(2)}`} />
      </div>
    </div>
  );
}

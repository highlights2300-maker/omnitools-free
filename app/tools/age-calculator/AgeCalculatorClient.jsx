"use client";

import { useState, useSyncExternalStore } from "react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

const DAY = 86400000;
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
      <div className="font-mono text-xl font-semibold text-amber-400">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

// "YYYY-MM-DD" -> { y, m, d } with no time-zone involvement (new Date("2000-01-01")
// is parsed as UTC, which shifts the day for users west of UTC).
function parseYmd(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
  if (!mt) return null;
  const y = +mt[1],
    m = +mt[2],
    d = +mt[3];
  const check = new Date(Date.UTC(y, m - 1, d));
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) return null;
  return { y, m, d };
}
const utc = ({ y, m, d }) => Date.UTC(y, m - 1, d);
const daysInMonth = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate(); // m is 1-based

function localToday() {
  const n = new Date();
  const p = (v) => String(v).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}
const subscribe = () => () => {};

export default function AgeCalculatorClient() {
  // Server renders "" (no date), the browser reports the visitor's local today.
  // useSyncExternalStore avoids a hydration mismatch without an effect.
  const today = useSyncExternalStore(subscribe, localToday, () => "");
  const [birth, setBirth] = useState("2000-01-01");
  const [untilPicked, setUntilPicked] = useState("");
  const until = untilPicked || today;

  const a = parseYmd(birth);
  const b = parseYmd(until);

  let content;
  if (!a || !b) {
    content = <p className="mt-5 text-center text-xs text-slate-500">Enter two valid dates to see the result.</p>;
  } else if (utc(b) < utc(a)) {
    content = (
      <p className="mt-5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-center text-xs text-amber-200">
        The end date is before the start date. Swap them or change one of the dates.
      </p>
    );
  } else {
    // Whole months from the start date (day clamped to the month's length, so
    // 31 Jan + 1 month = 28/29 Feb), then the leftover days.
    let totalMonthsRaw = (b.y - a.y) * 12 + (b.m - a.m);
    const anchor = (k) => {
      const idx = a.y * 12 + (a.m - 1) + k;
      const ay = Math.floor(idx / 12);
      const am = (idx % 12) + 1;
      return Date.UTC(ay, am - 1, Math.min(a.d, daysInMonth(ay, am)));
    };
    if (anchor(totalMonthsRaw) > utc(b)) totalMonthsRaw -= 1;
    const years = Math.floor(totalMonthsRaw / 12);
    const months = totalMonthsRaw % 12;
    const days = Math.round((utc(b) - anchor(totalMonthsRaw)) / DAY);
    const totalDays = Math.round((utc(b) - utc(a)) / DAY);
    const totalMonths = totalMonthsRaw;

    // Next birthday/anniversary on or after the "To" date. 29 Feb falls on 28 Feb in non-leap years.
    const annivIn = (y) => {
      const d = a.m === 2 && a.d === 29 && daysInMonth(y, 2) === 28 ? 28 : a.d;
      return { y, m: a.m, d };
    };
    let next = annivIn(b.y);
    if (utc(next) < utc(b)) next = annivIn(b.y + 1);
    const untilNext = Math.round((utc(next) - utc(b)) / DAY);
    const weekday = WEEKDAYS[new Date(utc(next)).getUTCDay()];

    content = (
      <>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <StatBox label="Years" value={years} />
          <StatBox label="Months" value={months} />
          <StatBox label="Days" value={days} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatBox label="Total months" value={totalMonths.toLocaleString()} />
          <StatBox label="Total weeks" value={Math.floor(totalDays / 7).toLocaleString()} />
          <StatBox label="Total days" value={totalDays.toLocaleString()} />
        </div>
        <p className="mt-4 text-center text-xs text-slate-400" aria-live="polite">
          {untilNext === 0
            ? "That's the birthday / anniversary itself."
            : `Next birthday / anniversary: in ${untilNext.toLocaleString()} day${untilNext === 1 ? "" : "s"} (${weekday}).`}
        </p>
      </>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <div>
          <label htmlFor="age-from" className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            From date (birth date)
          </label>
          <input id="age-from" type="date" className={inputClass} value={birth} onChange={(e) => setBirth(e.target.value)} />
        </div>
        <div>
          <label htmlFor="age-to" className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            To date (defaults to today)
          </label>
          <input id="age-to" type="date" className={inputClass} value={until} onChange={(e) => setUntilPicked(e.target.value)} />
        </div>
      </div>
      {content}
    </div>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, Trash2, Printer } from "lucide-react";
import AdSlot from "../../components/AdSlot";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";
const textareaClass =
  "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

export default function ProposalBuilderClient() {
  const [business, setBusiness] = useState({ name: "Your Business Name", email: "you@business.com" });
  const [client, setClient] = useState({ name: "Prospective Client", company: "Client Co." });
  const [meta, setMeta] = useState({
    title: "Website Redesign Proposal",
    date: new Date().toISOString().slice(0, 10),
    currency: "$",
  });
  const [overview, setOverview] = useState(
    "This proposal outlines a plan to redesign your website with a modern, conversion-focused layout, improved mobile experience, and faster load times."
  );
  const [scopeItems, setScopeItems] = useState([
    { id: "1", text: "Discovery workshop and content audit" },
    { id: "2", text: "New responsive design across all key pages" },
    { id: "3", text: "Implementation, QA, and launch support" },
  ]);
  const [pricing, setPricing] = useState([
    { id: "1", desc: "Design & development", amount: 3200 },
    { id: "2", desc: "Post-launch support (1 month)", amount: 400 },
  ]);
  const [timeline, setTimeline] = useState("4–6 weeks from kickoff to launch.");
  const idCounter = useRef(3);

  const updateScope = (id, value) =>
    setScopeItems((prev) => prev.map((it) => (it.id === id ? { ...it, text: value } : it)));
  const addScope = () => {
    idCounter.current += 1;
    setScopeItems((prev) => [...prev, { id: String(idCounter.current), text: "" }]);
  };
  const removeScope = (id) => setScopeItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

  const updatePricing = (id, field, value) =>
    setPricing((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  const addPricing = () => {
    idCounter.current += 1;
    setPricing((prev) => [...prev, { id: String(idCounter.current), desc: "", amount: 0 }]);
  };
  const removePricing = (id) => setPricing((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

  const total = useMemo(() => pricing.reduce((sum, it) => sum + (Number(it.amount) || 0), 0), [pricing]);
  const fmt = (n) => `${meta.currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .proposal-print-area, .proposal-print-area * { visibility: visible; }
          .proposal-print-area {
            position: absolute; top: 0; left: 0; width: 100%; margin: 0;
            box-shadow: none !important; border: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="no-print mb-4 flex items-center justify-end">
        <button
          onClick={() => window.print()}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_400px]">
        <div className="no-print flex flex-col gap-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Proposal details</h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              <input className={`${inputClass} md:col-span-2`} placeholder="Proposal title" value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
              <input type="date" className={inputClass} value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} />
              <select className={inputClass} value={meta.currency} onChange={(e) => setMeta({ ...meta, currency: e.target.value })}>
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">From / To</h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              <input className={inputClass} placeholder="Your business name" value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} />
              <input className={inputClass} placeholder="Your email" value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} />
              <input className={inputClass} placeholder="Client name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
              <input className={inputClass} placeholder="Client company" value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Overview</h2>
            <textarea className={textareaClass} rows={3} value={overview} onChange={(e) => setOverview(e.target.value)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scope of work</h2>
              <button onClick={addScope} className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {scopeItems.map((it) => (
                <div key={it.id} className="flex items-center gap-2">
                  <input className={inputClass} value={it.text} onChange={(e) => updateScope(it.id, e.target.value)} />
                  <button onClick={() => removeScope(it.id)} aria-label="Remove scope item" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Investment</h2>
              <button onClick={addPricing} className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {pricing.map((it) => (
                <div key={it.id} className="flex flex-col gap-2 rounded-lg border border-slate-800 p-3 md:grid md:grid-cols-[1fr_110px_40px] md:items-center md:gap-2 md:border-0 md:p-0">
                  <input className={inputClass} placeholder="Description" value={it.desc} onChange={(e) => updatePricing(it.id, "desc", e.target.value)} />
                  <div className="flex gap-2 md:contents">
                    <input type="number" inputMode="decimal" min="0" step="0.01" className={`${inputClass} text-right font-mono`} value={it.amount} onChange={(e) => updatePricing(it.id, "amount", e.target.value)} />
                    <button onClick={() => removePricing(it.id)} aria-label="Remove pricing item" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400 md:h-12 md:w-10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Timeline</h2>
            <textarea className={textareaClass} rows={2} value={timeline} onChange={(e) => setTimeline(e.target.value)} />
          </section>

          <AdSlot variant="banner" />
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="proposal-print-area rounded-2xl border border-slate-800 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <p className="text-xs uppercase tracking-widest text-slate-400">Proposal</p>
            <h3 className="mt-1 text-xl font-bold">{meta.title}</h3>
            <p className="mt-1 font-mono text-xs text-slate-500">{meta.date}</p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-200 py-4 text-xs">
              <div>
                <p className="uppercase tracking-widest text-slate-400">Prepared by</p>
                <p className="mt-1 font-semibold">{business.name}</p>
                <p className="text-slate-500">{business.email}</p>
              </div>
              <div className="text-right">
                <p className="uppercase tracking-widest text-slate-400">Prepared for</p>
                <p className="mt-1 font-semibold">{client.name}</p>
                <p className="text-slate-500">{client.company}</p>
              </div>
            </div>

            {overview && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Overview</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">{overview}</p>
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Scope of work</p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate-700">
                {scopeItems.filter((it) => it.text.trim()).map((it) => (
                  <li key={it.id}>{it.text}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Investment</p>
              <table className="mt-2 w-full text-xs">
                <tbody>
                  {pricing.map((it) => (
                    <tr key={it.id} className="border-b border-slate-100">
                      <td className="py-1.5 pr-2">{it.desc || "—"}</td>
                      <td className="py-1.5 text-right font-mono">{fmt(Number(it.amount) || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 flex justify-end">
                <div className="flex w-48 justify-between border-t border-slate-200 py-2 text-sm font-bold">
                  <span>Total</span>
                  <span className="font-mono">{fmt(total)}</span>
                </div>
              </div>
            </div>

            {timeline && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Timeline</p>
                <p className="mt-1 text-xs text-slate-700">{timeline}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

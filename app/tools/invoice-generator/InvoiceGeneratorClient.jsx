"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, Trash2, Printer } from "lucide-react";
import AdSlot from "../../components/AdSlot";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";
const textareaClass =
  "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

let itemIdCounter = 3;

export default function InvoiceGeneratorClient() {
  const [business, setBusiness] = useState({
    name: "Your Business Name",
    email: "you@business.com",
    phone: "+1 555 000 1234",
    address: "123 Market Street, Suite 4\nSpringfield",
  });
  const [client, setClient] = useState({
    name: "Client Name",
    email: "client@email.com",
    address: "45 Client Avenue\nRivertown",
  });
  const [meta, setMeta] = useState({
    number: "INV-1001",
    date: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    currency: "$",
  });
  const [items, setItems] = useState([
    { id: "1", desc: "Website design & development", qty: 1, rate: 850 },
    { id: "2", desc: "Hosting setup (one-time)", qty: 1, rate: 60 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("Thank you for your business. Payment due within 14 days.");

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };
  const addItem = () => {
    itemIdCounter += 1;
    setItems((prev) => [...prev, { id: String(itemIdCounter), desc: "", qty: 1, rate: 0 }]);
  };
  const removeItem = (id) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0),
    [items]
  );
  const taxAmount = useMemo(() => subtotal * ((Number(taxRate) || 0) / 100), [subtotal, taxRate]);
  const total = subtotal + taxAmount;

  const fmt = (n) =>
    `${meta.currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .invoice-print-area, .invoice-print-area * { visibility: visible; }
          .invoice-print-area {
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

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_380px]">
        {/* Editable form — hidden on print */}
        <div className="no-print flex flex-col gap-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Your business</h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Business name"
                value={business.name}
                onChange={(e) => setBusiness({ ...business, name: e.target.value })}
              />
              <input
                type="email"
                className={inputClass}
                placeholder="Email"
                value={business.email}
                onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              />
              <input
                type="tel"
                inputMode="tel"
                className={inputClass}
                placeholder="Phone"
                value={business.phone}
                onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
              />
              <textarea
                className={`${textareaClass} md:col-span-2`}
                rows={2}
                placeholder="Address"
                value={business.address}
                onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Bill to</h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Client name"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
              />
              <input
                type="email"
                className={inputClass}
                placeholder="Client email"
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
              />
              <textarea
                className={`${textareaClass} md:col-span-2`}
                rows={2}
                placeholder="Client address"
                value={client.address}
                onChange={(e) => setClient({ ...client, address: e.target.value })}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Invoice details</h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-4">
              <input
                className={inputClass}
                placeholder="Invoice #"
                value={meta.number}
                onChange={(e) => setMeta({ ...meta, number: e.target.value })}
              />
              <input
                type="date"
                className={inputClass}
                value={meta.date}
                onChange={(e) => setMeta({ ...meta, date: e.target.value })}
              />
              <input
                type="date"
                className={inputClass}
                value={meta.dueDate}
                onChange={(e) => setMeta({ ...meta, dueDate: e.target.value })}
              />
              <select
                className={inputClass}
                value={meta.currency}
                onChange={(e) => setMeta({ ...meta, currency: e.target.value })}
              >
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Line items</h2>
              <button
                onClick={addItem}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" />
                Add item
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex flex-col gap-2 rounded-lg border border-slate-800 p-3 md:grid md:grid-cols-[1fr_80px_110px_40px] md:items-center md:gap-2 md:border-0 md:p-0"
                >
                  <input
                    className={inputClass}
                    placeholder="Description"
                    value={it.desc}
                    onChange={(e) => updateItem(it.id, "desc", e.target.value)}
                  />
                  <div className="flex gap-2 md:contents">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      className={`${inputClass} text-center`}
                      placeholder="Qty"
                      value={it.qty}
                      onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                    />
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      className={`${inputClass} text-right font-mono`}
                      placeholder="Rate"
                      value={it.rate}
                      onChange={(e) => updateItem(it.id, "rate", e.target.value)}
                    />
                    <button
                      onClick={() => removeItem(it.id)}
                      aria-label="Remove item"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400 md:h-12 md:w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs text-slate-500">Tax rate (%)</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                className={`${inputClass} w-24 font-mono`}
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Notes</h2>
            <textarea
              className={textareaClass}
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>

          <AdSlot variant="banner" />
        </div>

        {/* Live preview + printable area */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div
            id="invoice-print-area"
            className="invoice-print-area rounded-2xl border border-slate-800 bg-white p-6 text-slate-900 shadow-2xl sm:p-8"
          >
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-bold">{business.name}</h3>
                <p className="whitespace-pre-line text-xs text-slate-500">{business.address}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {business.email} · {business.phone}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs uppercase tracking-widest text-slate-400">Invoice</p>
                <p className="font-mono text-sm font-semibold">{meta.number}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="uppercase tracking-widest text-slate-400">Bill to</p>
                <p className="mt-1 font-semibold">{client.name}</p>
                <p className="whitespace-pre-line text-slate-500">{client.address}</p>
                <p className="text-slate-500">{client.email}</p>
              </div>
              <div className="text-right">
                <p>
                  <span className="uppercase tracking-widest text-slate-400">Date </span>
                  <span className="font-mono">{meta.date}</span>
                </p>
                <p className="mt-1">
                  <span className="uppercase tracking-widest text-slate-400">Due </span>
                  <span className="font-mono">{meta.dueDate}</span>
                </p>
              </div>
            </div>

            <table className="mt-6 w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left uppercase tracking-widest text-slate-400">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 text-right font-medium">Qty</th>
                  <th className="py-2 text-right font-medium">Rate</th>
                  <th className="py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-slate-100">
                    <td className="py-2 pr-2">{it.desc || "—"}</td>
                    <td className="py-2 text-right font-mono">{Number(it.qty) || 0}</td>
                    <td className="py-2 text-right font-mono">{fmt(Number(it.rate) || 0)}</td>
                    <td className="py-2 text-right font-mono">
                      {fmt((Number(it.qty) || 0) * (Number(it.rate) || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-48 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-mono">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tax ({Number(taxRate) || 0}%)</span>
                  <span className="font-mono">{fmt(taxAmount)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-slate-200 py-2 text-sm font-bold">
                  <span>Total</span>
                  <span className="font-mono">{fmt(total)}</span>
                </div>
              </div>
            </div>

            {notes && <div className="mt-6 border-t border-slate-200 pt-4 text-[11px] text-slate-500">{notes}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

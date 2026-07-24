"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import AdSlot from "../../components/AdSlot";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";
const textareaClass =
  "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

export default function ContractTemplateClient() {
  const [provider, setProvider] = useState({ name: "Your Business Name", address: "123 Market Street, Springfield" });
  const [client, setClient] = useState({ name: "Client Name", address: "45 Client Avenue, Rivertown" });
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [services, setServices] = useState(
    "The Service Provider will design and develop a marketing website for the Client, including up to 5 pages, responsive layout, and one round of revisions."
  );
  const [payment, setPayment] = useState({ amount: "2500", currency: "$", schedule: "50% upfront, 50% on completion" });
  const [term, setTerm] = useState("This agreement begins on the effective date and continues until the services described above are completed.");
  const [termination, setTermination] = useState("Either party may terminate this agreement with 14 days' written notice.");
  const [governingLaw, setGoverningLaw] = useState("State of Delaware");

  return (
    <div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .contract-print-area, .contract-print-area * { visibility: visible; }
          .contract-print-area {
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
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[11px] text-amber-200/80">
            This is a simple, general-purpose starting template — not a substitute for advice from a
            qualified lawyer for anything high-stakes or unusual.
          </div>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Parties</h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              <input className={inputClass} placeholder="Service provider name" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
              <input className={inputClass} placeholder="Provider address" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
              <input className={inputClass} placeholder="Client name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
              <input className={inputClass} placeholder="Client address" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Effective date</label>
              <input type="date" className={`${inputClass} sm:w-48`} value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Services</h2>
            <textarea className={textareaClass} rows={3} value={services} onChange={(e) => setServices(e.target.value)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Payment</h2>
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[80px_1fr]">
              <select className={inputClass} value={payment.currency} onChange={(e) => setPayment({ ...payment, currency: e.target.value })}>
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input type="number" inputMode="decimal" className={inputClass} placeholder="Total amount" value={payment.amount} onChange={(e) => setPayment({ ...payment, amount: e.target.value })} />
            </div>
            <textarea className={`${textareaClass} mt-3`} rows={2} placeholder="Payment schedule" value={payment.schedule} onChange={(e) => setPayment({ ...payment, schedule: e.target.value })} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Term & termination</h2>
            <textarea className={textareaClass} rows={2} value={term} onChange={(e) => setTerm(e.target.value)} />
            <textarea className={`${textareaClass} mt-3`} rows={2} value={termination} onChange={(e) => setTermination(e.target.value)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Governing law</h2>
            <input className={inputClass} value={governingLaw} onChange={(e) => setGoverningLaw(e.target.value)} />
          </section>

          <AdSlot variant="banner" />
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="contract-print-area rounded-2xl border border-slate-800 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <h3 className="text-center text-base font-bold uppercase tracking-wide">Service Agreement</h3>
            <p className="mt-1 text-center font-mono text-[11px] text-slate-500">Effective {effectiveDate}</p>

            <p className="mt-5 text-xs leading-relaxed text-slate-700">
              This Service Agreement is entered into between <strong>{provider.name}</strong> ("Service
              Provider"), located at {provider.address}, and <strong>{client.name}</strong> ("Client"),
              located at {client.address}.
            </p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">1. Services</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{services}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">2. Payment</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">
                The total fee for these services is {payment.currency}
                {Number(payment.amount || 0).toLocaleString()}. {payment.schedule}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">3. Term</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{term}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">4. Termination</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{termination}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">5. Governing Law</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">
                This agreement is governed by the laws of the {governingLaw}.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 text-xs">
              <div>
                <div className="h-10 border-b border-slate-400" />
                <p className="mt-1 text-slate-500">{provider.name} · Date</p>
              </div>
              <div>
                <div className="h-10 border-b border-slate-400" />
                <p className="mt-1 text-slate-500">{client.name} · Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

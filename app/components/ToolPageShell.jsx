import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "./Logo";

export default function ToolPageShell({ title, subtitle, badges, children, article }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="no-print border-b border-slate-900 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
              <LogoMark className="h-4 w-4" />
            </div>
            <span className="text-base font-black tracking-tight text-slate-50">
              Quick<span className="text-amber-400">Zeta</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            All tools
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight text-slate-50 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-sm text-slate-400">{subtitle}</p>}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-500">
            {(
              badges || [
                { icon: ShieldCheck, text: "No account needed", color: "text-emerald-400" },
                { icon: Lock, text: "Processed locally", color: "text-sky-400" },
                { icon: Zap, text: "Instant results", color: "text-amber-400" },
              ]
            ).map(({ icon: Icon, text, color }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1"
              >
                <Icon className={`h-3 w-3 ${color}`} />
                {text}
              </span>
            ))}
          </div>
        </div>

        {children}

        {article && (
          <article className="no-print mt-16 max-w-3xl space-y-8 border-t border-slate-900 pt-10 text-sm leading-relaxed text-slate-300">
            {article}
          </article>
        )}

        <footer className="no-print mt-12 border-t border-slate-900 pt-6 text-center text-[11px] text-slate-600">
          <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-500">
            <Link href="/about" className="hover:text-slate-300">About</Link>
            <Link href="/faq" className="hover:text-slate-300">FAQ</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
          </nav>
          QuickZeta — no accounts, no file uploads, no tracking. Everything above runs on your own device.
        </footer>
      </main>
    </div>
  );
}

// Shared FAQ accordion block, built with native <details> so it needs no
// client-side JS and is fully crawlable/indexable as-is.
export function FaqBlock({ items }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-100">Frequently asked questions</h2>
      <div className="mt-3 divide-y divide-slate-900">
        {items.map((item) => (
          <details key={item.q} className="group py-3">
            <summary className="cursor-pointer list-none text-sm font-medium text-slate-200 marker:content-none">
              <span className="mr-2 inline-block text-amber-400 transition group-open:rotate-45">+</span>
              {item.q}
            </summary>
            <p className="mt-2 pl-5 text-slate-400">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

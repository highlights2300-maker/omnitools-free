import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "./Logo";

export default function CategoryHubShell({ title, subtitle, icon: Icon, accentClass, tools, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-8">
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

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="mb-8 flex items-start gap-4">
          {Icon && (
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentClass}`}>
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-50 sm:text-3xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 text-[11px] font-mono text-slate-500">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            No account needed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1">
            <Lock className="h-3 w-3 text-sky-400" />
            Processed locally
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1">
            <Zap className="h-3 w-3 text-amber-400" />
            Instant results
          </span>
        </div>

        <section className="mb-12 space-y-4 text-sm leading-relaxed text-slate-300">{children}</section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Every tool in this category</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3.5 transition hover:border-amber-400/30 hover:bg-slate-900"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-100">{tool.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{tool.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-amber-400" />
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-slate-900 pt-6 text-center text-[11px] text-slate-600">
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

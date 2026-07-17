import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function StaticPageShell({ title, eyebrow, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
              <Zap className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <span className="text-base font-black tracking-tight text-slate-50">
              Omni<span className="text-amber-400">Tools</span> Free
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        {eyebrow && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-400">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-black tracking-tight text-slate-50">{title}</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">{children}</div>
      </main>

      <footer className="border-t border-slate-900 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center text-[11px] text-slate-600 md:px-8">
          OmniTools Free — no accounts, no file uploads, no tracking of your own data.
        </div>
      </footer>
    </div>
  );
}

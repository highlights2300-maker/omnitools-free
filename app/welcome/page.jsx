import Link from "next/link";
import { ShieldCheck, Lock, Zap, ArrowRight } from "lucide-react";
import LogoMark from "../components/Logo";

export const metadata = {
  title: "QuickZeta — Remove Any Photo's Background, Free & Instant",
  description: "Cut the background out of any photo in seconds. No sign up, no upload, nothing watermarked.",
  robots: { index: false, follow: true }, // dedicated ad landing page — not meant for organic search
};

function BeforeAfterSvg() {
  return (
    <svg viewBox="0 0 600 320" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
      {/* Before panel */}
      <g>
        <rect x="0" y="0" width="290" height="320" rx="16" fill="#87BFEA" />
        <rect x="0" y="230" width="290" height="90" fill="#5EA85E" />
        <ellipse cx="145" cy="110" rx="42" ry="48" fill="#3C2D23" />
        <rect x="115" y="150" width="60" height="90" fill="#1E3C78" />
        <rect x="90" y="155" width="28" height="70" fill="#1E3C78" />
        <rect x="172" y="155" width="28" height="70" fill="#1E3C78" />
        <rect x="120" y="238" width="22" height="62" fill="#141414" />
        <rect x="148" y="238" width="22" height="62" fill="#141414" />
        <text x="145" y="300" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="700" opacity="0.55">
          BEFORE
        </text>
      </g>

      {/* Arrow */}
      <g transform="translate(290,150)">
        <circle cx="10" cy="10" r="26" fill="#fbbf24" />
        <path d="M2 10 H18 M12 4 L18 10 L12 16" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* After panel — checkerboard transparency */}
      <g>
        <defs>
          <pattern id="checker" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#e2e8f0" />
            <rect width="10" height="10" fill="#f8fafc" />
            <rect x="10" y="10" width="10" height="10" fill="#f8fafc" />
          </pattern>
        </defs>
        <rect x="330" y="0" width="270" height="320" rx="16" fill="url(#checker)" />
        <ellipse cx="465" cy="110" rx="42" ry="48" fill="#3C2D23" />
        <rect x="435" y="150" width="60" height="90" fill="#1E3C78" />
        <rect x="410" y="155" width="28" height="70" fill="#1E3C78" />
        <rect x="492" y="155" width="28" height="70" fill="#1E3C78" />
        <rect x="440" y="238" width="22" height="62" fill="#141414" />
        <rect x="468" y="238" width="22" height="62" fill="#141414" />
        <text x="465" y="300" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="700" opacity="0.55">
          AFTER
        </text>
      </g>
    </svg>
  );
}

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-center py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-slate-950">
            <LogoMark className="h-4 w-4" />
          </div>
          <span className="text-base font-black tracking-tight text-slate-50">
            Quick<span className="text-amber-400">Zeta</span>
          </span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-4 pb-16 text-center">
        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-50 sm:text-4xl">
          Remove any photo's background.
          <br />
          <span className="text-amber-400">Free. Instant. Nothing uploaded.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm text-slate-400">
          An AI model runs right in your browser to cut out the subject — your photo never touches a
          server. No sign up, no watermark, no daily limit.
        </p>

        <div className="mt-8 flex justify-center">
          <BeforeAfterSvg />
        </div>

        <Link
          href="/tools/background-remover"
          className="mt-8 inline-flex h-14 items-center gap-2 rounded-xl bg-amber-400 px-8 text-base font-bold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
        >
          Try it now — it's free
          <ArrowRight className="h-5 w-5" />
        </Link>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] font-mono text-slate-500">
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

        <Link
          href="/"
          className="mt-10 text-sm text-slate-500 underline underline-offset-4 transition hover:text-slate-300"
        >
          See all 41 free tools →
        </Link>
      </main>

      <footer className="py-6 text-center text-[11px] text-slate-600">
        <Link href="/privacy" className="hover:text-slate-400">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}

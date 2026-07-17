import StaticPageShell from "../components/StaticPageShell";
import { ShieldCheck, Zap, Lock, Layers } from "lucide-react";

export const metadata = {
  title: "About — OmniTools Free",
  description:
    "Why OmniTools Free exists, how it's built, and the philosophy behind running everything in your browser instead of on a server.",
};

function H2({ children }) {
  return <h2 className="mt-2 text-lg font-semibold text-slate-100">{children}</h2>;
}

export default function AboutPage() {
  return (
    <StaticPageShell eyebrow="Our story" title="About OmniTools Free">
      <p>
        Most "free" tool sites online aren't really free. They cap you at two or three files a day, show
        a full-screen ad before every download, or quietly upload your document to a server you've never
        heard of. OmniTools Free started from a simple frustration with that pattern, and a simple
        alternative: what if the tool just ran on your own computer, the way a calculator does?
      </p>

      <H2>How it actually works</H2>
      <p>
        Every tool on this site — the PDF merger, the image compressor, the invoice generator, the video
        trimmer — runs its processing directly inside your browser, using the same JavaScript engine that
        renders this page. Nothing you upload, type, or edit is sent to a server. When you click
        "Download," the file is built on your device and handed straight to you.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <Lock className="mb-2 h-5 w-5 text-amber-400" />
          <p className="text-sm font-semibold text-slate-100">Nothing uploaded</p>
          <p className="mt-1 text-xs text-slate-500">Your files never leave your device.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <ShieldCheck className="mb-2 h-5 w-5 text-amber-400" />
          <p className="text-sm font-semibold text-slate-100">No account required</p>
          <p className="mt-1 text-xs text-slate-500">Open a tool and start — no signup, ever.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <Zap className="mb-2 h-5 w-5 text-amber-400" />
          <p className="text-sm font-semibold text-slate-100">No daily limits</p>
          <p className="mt-1 text-xs text-slate-500">Use any tool as many times as you need.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <Layers className="mb-2 h-5 w-5 text-amber-400" />
          <p className="text-sm font-semibold text-slate-100">No watermarks</p>
          <p className="mt-1 text-xs text-slate-500">Outputs are yours, unmarked, full quality.</p>
        </div>
      </div>

      <H2>How we keep the lights on</H2>
      <p>
        Running everything in your browser instead of on our servers keeps our costs extremely low —
        there's no expensive file-processing infrastructure to pay for. What does cost something is
        simply serving the site itself, which is where a small amount of advertising comes in. We'd
        rather run modest, clearly-labeled ads than put any tool behind a paywall or a daily limit.
      </p>

      <H2>What we won't build</H2>
      <p>
        OmniTools Free intentionally stays out of a few categories: interest-based loan or financial
        calculators, gambling features, and day-trading tools. We'd rather stay focused on the
        productivity, document, and creative tools people actually reach for day to day.
      </p>

      <H2>Get in touch</H2>
      <p>
        Found a bug, or have an idea for a tool we should build? Visit the{" "}
        <a href="/contact" className="text-amber-400 underline underline-offset-2">
          contact page
        </a>
        .
      </p>
    </StaticPageShell>
  );
}

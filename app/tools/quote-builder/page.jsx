import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "../../components/Logo";
import QuoteBuilderClient from "./QuoteBuilderClient";

export const metadata = {
  title: "Free Quote Builder — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Build a professional price quote free, with no sign up. Fill in your details, preview it live, and export an instant PDF — right in your browser.",
  keywords: [
    "free quote builder no sign up",
    "price quote generator online",
    "create quote pdf free",
    "quote template for freelancers",
    "print quote to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/quote-builder" },
  openGraph: {
    title: "Free Quote Builder — No Sign Up, Instant PDF",
    description: "Build a professional price quote and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/quote-builder",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this quote builder really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no limit on how many quotes you can create.",
  },
  {
    q: "How is a quote different from an invoice?",
    a: "A quote is an estimate sent before work begins, to give a prospective client a sense of pricing and scope — it isn't a request for payment. An invoice is sent after work is delivered (or as a deposit request), asking to actually be paid. This tool uses a \"valid until\" date instead of a due date, since a quote isn't a bill.",
  },
  {
    q: "How do I turn my accepted quote into an invoice?",
    a: "Once a client accepts your quote, use the site's Invoice Generator to create the actual bill — you can carry over the same line items and simply switch from an estimate framing to a payment request.",
  },
  {
    q: "Do you store or see the quotes I create?",
    a: "No. Every field is held in your browser's memory only, and the PDF is generated locally when you click Print. Nothing is uploaded to a server.",
  },
  {
    q: "How do I get an actual PDF file?",
    a: "Click \"Print / Save as PDF,\" then in your browser's print dialog, choose \"Save as PDF\" as the destination instead of a physical printer.",
  },
];

export default function QuoteBuilderPage() {
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
          <h1 className="text-2xl font-black tracking-tight text-slate-50 sm:text-3xl">Free Quote Builder</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Fill in your details below, preview the result instantly, and export a clean, professional
            price quote — no sign up, no software, nothing ever leaves your browser.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono text-slate-500">
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
              Instant PDF export
            </span>
          </div>
        </div>

        <QuoteBuilderClient />

        <article className="no-print mt-16 max-w-3xl space-y-8 border-t border-slate-900 pt-10 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A free quote builder with no sign up required
            </h2>
            <p className="mt-2">
              Sending a prospective client a clear, professional-looking price quote shouldn't require
              expensive software or a subscription. This tool lets you fill in your business details, the
              client's information, and line-item pricing, then export a polished PDF the moment you're
              ready — no account, no watermark, and no limit on how many quotes you build.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Fill in your details.</strong> Add your business
                information, the prospective client's details, and a quote number.
              </li>
              <li>
                <strong className="text-slate-200">Add line items.</strong> List what you're proposing,
                the quantity, and the rate — the subtotal, tax, and total update automatically.
              </li>
              <li>
                <strong className="text-slate-200">Export as PDF.</strong> Click "Print / Save as PDF"
                and choose "Save as PDF" in your browser's print dialog.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Quote versus invoice — what's the difference</h2>
            <p className="mt-2">
              A quote and an invoice look similar but serve different purposes. A quote is sent before
              work begins, giving a prospective client an estimate of cost and scope so they can decide
              whether to move forward — it isn't asking for payment yet. An invoice is sent once work is
              underway or complete, and is a genuine request to be paid. That's why this tool uses a
              "valid until" date rather than a payment due date — a quote's clock is about how long the
              pricing holds, not when money is owed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">From quote to invoice</h2>
            <p className="mt-2">
              Once a client accepts a quote, the natural next step is turning it into a real invoice.
              Rather than starting from scratch, open the site's{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              and carry over the same client details and line items — just reframed as a bill rather than
              an estimate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays on your device</h2>
            <p className="mt-2">
              Because this tool runs entirely inside your browser, none of the information you type is
              ever sent to a server — the PDF is assembled locally using your browser's own print engine.
              See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Frequently asked questions</h2>
            <div className="mt-3 divide-y divide-slate-900">
              {FAQS.map((item) => (
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
        </article>

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

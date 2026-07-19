import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "../../components/Logo";
import InvoiceGeneratorClient from "./InvoiceGeneratorClient";

export const metadata = {
  title: "Free Invoice Generator — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Create a professional invoice free, with no sign up and no software to install. Fill in your details, preview it live, and export an instant PDF invoice creator — right in your browser.",
  keywords: [
    "free invoice generator no sign up",
    "instant pdf invoice creator",
    "create invoice online free",
    "invoice generator for freelancers",
    "print invoice to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/invoice-generator" },
  openGraph: {
    title: "Free Invoice Generator — No Sign Up, Instant PDF",
    description:
      "Build a professional invoice and export it as a PDF, entirely in your browser. No account, no upload, no cost.",
    url: "https://quickzeta.com/tools/invoice-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this invoice generator really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no trial period — you can fill in an invoice and export it as a PDF the moment you land on this page, as many times as you'd like.",
  },
  {
    q: "Do you store or see the invoices I create?",
    a: "No. Every field on this page is held in your browser's memory only, and the PDF is generated locally when you click Print. Nothing is uploaded to a server, and nothing is saved once you close the tab unless you print or save it yourself.",
  },
  {
    q: "How do I actually get a PDF file?",
    a: "Click \"Print / Save as PDF,\" then in your browser's print dialog, choose \"Save as PDF\" as the destination instead of a physical printer. This works the same way on Windows, Mac, and most mobile browsers.",
  },
  {
    q: "Can I use a currency other than US dollars?",
    a: "Yes — the currency dropdown next to the invoice number supports several common symbols, and the amount formatting updates automatically throughout the invoice.",
  },
  {
    q: "Is this suitable for a small business or just freelancers?",
    a: "Both. The layout covers the essentials any business needs on an invoice — your details, the client's details, itemized charges, tax, and a total — so it works equally well for a solo freelancer or a small team billing clients.",
  },
];

export default function InvoiceGeneratorPage() {
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
          <h1 className="text-2xl font-black tracking-tight text-slate-50 sm:text-3xl">
            Free Invoice Generator
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Fill in your details below, preview the result instantly, and export a clean, professional
            PDF invoice — no sign up, no software, nothing ever leaves your browser.
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

        <InvoiceGeneratorClient />

        {/* SEO / editorial content block */}
        <article className="no-print mt-16 max-w-3xl space-y-8 border-t border-slate-900 pt-10 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A free invoice generator with no sign up required
            </h2>
            <p className="mt-2">
              Most "free" invoice tools online aren't quite what they claim — you fill in your details,
              only to hit a paywall, a watermark, or a login screen right before you can actually
              download anything. QuickZeta's invoice generator skips all of that. There's no account to
              create, no email address to hand over, and no limit on how many invoices you build. Open
              the page, fill in the fields, and export an instant PDF invoice whenever you're ready — the
              whole thing runs as a genuinely free invoice generator with no sign up, not a lead-capture
              form disguised as one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Fill in your details.</strong> Add your business
                information, your client's details, an invoice number, and the date it's due.
              </li>
              <li>
                <strong className="text-slate-200">Add line items.</strong> List what you're charging
                for, the quantity, and the rate — the subtotal, tax, and total update automatically as
                you type.
              </li>
              <li>
                <strong className="text-slate-200">Export as PDF.</strong> Click "Print / Save as PDF"
                and choose "Save as PDF" in your browser's print dialog. That's it — you now have a
                polished, ready-to-send invoice.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Built for freelancers and small teams</h2>
            <p className="mt-2">
              Whether you're a freelance designer sending your first invoice to a new client, a
              contractor billing for a completed project, or a small business owner who doesn't want to
              pay for accounting software just to send a bill, this tool covers the essentials: itemized
              charges, tax calculation, due dates, and a clean layout that looks legitimate the moment a
              client opens it. It's an instant PDF invoice creator built to be used in the moment,
              whether you're at a desk or finishing up on your phone between jobs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays on your device</h2>
            <p className="mt-2">
              Because this tool runs entirely inside your browser, none of the information you type —
              your business details, your client's name, the amounts you're charging — is ever sent to a
              server. The PDF is assembled locally on your device using your browser's own print engine.
              That means there's nothing to leak, nothing stored on our end, and nothing to clean up
              afterward. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for the full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What to include on every invoice</h2>
            <p className="mt-2">
              A professional invoice needs a handful of specific details to be considered valid and to
              get paid without back-and-forth. This tool includes all of them by default:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">Your business details</strong> — name, address, and a
                way to contact you if the client has a question.
              </li>
              <li>
                <strong className="text-slate-200">A unique invoice number</strong> — makes it easy for
                both sides to reference the exact bill in emails or bookkeeping later.
              </li>
              <li>
                <strong className="text-slate-200">Clear line items</strong> — what was delivered, the
                quantity, and the rate, so the client can see exactly what they're being charged for.
              </li>
              <li>
                <strong className="text-slate-200">Tax, if applicable</strong> — calculated automatically
                here once you set a rate, rather than done by hand.
              </li>
              <li>
                <strong className="text-slate-200">A due date</strong> — vague payment terms are one of
                the most common reasons invoices get paid late.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A few tips for getting paid faster</h2>
            <p className="mt-2">
              Beyond the invoice itself, a few small habits tend to make a real difference in how quickly
              clients actually pay. Send the invoice the same day the work is finished, while it's still
              top of mind — waiting a week or two tends to push payment back just as far. Keep line items
              specific rather than bundling everything into one vague charge; clients pay faster when they
              can see exactly what they're paying for. Set a firm, explicit due date rather than leaving
              it open-ended, and if a payment is a few days late, a short, friendly follow-up email
              usually resolves it faster than waiting it out.
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

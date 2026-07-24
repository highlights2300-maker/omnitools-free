import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "../../components/Logo";
import ReceiptGeneratorClient from "./ReceiptGeneratorClient";

export const metadata = {
  title: "Free Receipt Generator — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Create a simple, professional payment receipt free, with no sign up. Fill in the details and export an instant PDF — right in your browser.",
  keywords: [
    "free receipt generator no sign up",
    "payment receipt maker online",
    "create receipt pdf free",
    "receipt template for small business",
    "print receipt to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/receipt-generator" },
  openGraph: {
    title: "Free Receipt Generator — No Sign Up, Instant PDF",
    description: "Create a simple payment receipt and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/receipt-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this receipt generator really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no limit on how many receipts you can create.",
  },
  {
    q: "What's the difference between a receipt and an invoice?",
    a: "An invoice requests payment for work or goods — it's sent before or at the time of payment, asking to be paid. A receipt is proof that a payment has already been received — it's sent after the fact, confirming the transaction. If you need to bill a client, use the site's Invoice Generator instead.",
  },
  {
    q: "Do you store or see the receipts I create?",
    a: "No. Every field is held in your browser's memory only, and the PDF is generated locally when you click Print. Nothing is uploaded to a server.",
  },
  {
    q: "How do I get an actual PDF file?",
    a: "Click \"Print / Save as PDF,\" then in your browser's print dialog, choose \"Save as PDF\" as the destination instead of a physical printer.",
  },
  {
    q: "Can I record different payment methods?",
    a: "Yes — the payment method dropdown includes Cash, Card, Bank Transfer, Check, and Other, so the receipt accurately reflects how the payment was actually made.",
  },
];

export default function ReceiptGeneratorPage() {
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
          <h1 className="text-2xl font-black tracking-tight text-slate-50 sm:text-3xl">Free Receipt Generator</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Fill in your details below, preview the result instantly, and export a clean, professional
            payment receipt — no sign up, no software, nothing ever leaves your browser.
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

        <ReceiptGeneratorClient />

        <article className="no-print mt-16 max-w-3xl space-y-8 border-t border-slate-900 pt-10 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A free receipt generator with no sign up required
            </h2>
            <p className="mt-2">
              Confirming a payment with a proper receipt is something small businesses and freelancers
              need regularly, and it shouldn't require accounting software just to produce a simple PDF.
              This tool lets you fill in who paid, how much, and how, then export a clean, professional
              receipt the moment you're ready — no account, no watermark, and no limit on how many
              receipts you create.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Fill in your business details.</strong> Add your name,
                email, and phone.
              </li>
              <li>
                <strong className="text-slate-200">Add who paid.</strong> Enter the payer's name and
                email, plus the payment method used.
              </li>
              <li>
                <strong className="text-slate-200">List what was paid for.</strong> Add one or more line
                items — the total updates automatically.
              </li>
              <li>
                <strong className="text-slate-200">Export as PDF.</strong> Click "Print / Save as PDF"
                and choose "Save as PDF" in your browser's print dialog.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Receipt versus invoice — what's the difference</h2>
            <p className="mt-2">
              These two documents are often confused, but they serve opposite moments in a transaction. An
              invoice is a request for payment, sent before or as work is being billed. A receipt is
              confirmation that payment has already happened — proof for the payer's records, and often
              useful for the business's own bookkeeping too. If you're asking to be paid, use the site's{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              instead; use this tool once the payment has actually been received.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Confirming a client's payment for completed freelance work.</li>
              <li>Providing proof of payment for a cash or bank transfer transaction.</li>
              <li>Giving a customer a receipt for a service or product purchase.</li>
              <li>Keeping a simple paper trail for personal bookkeeping.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays on your device</h2>
            <p className="mt-2">
              Because this tool runs entirely inside your browser, none of the information you type is
              ever sent to a server. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why a proper receipt matters</h2>
            <p className="mt-2">
              A quick text message confirming "payment received" works informally, but a proper receipt
              with an itemized list, a receipt number, and the payment method gives both sides a clean
              paper trail — useful for expense tracking, tax records, or simply having something concrete
              to point to if a question comes up later about what was paid and when.
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

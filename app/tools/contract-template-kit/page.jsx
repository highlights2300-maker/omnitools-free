import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "../../components/Logo";
import ContractTemplateClient from "./ContractTemplateClient";

export const metadata = {
  title: "Free Service Agreement Template — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Fill in a simple service agreement template free, with no sign up. Add the parties, services, payment, and terms, then export an instant PDF in your browser.",
  keywords: [
    "free service agreement template no sign up",
    "contract template generator online",
    "simple freelance contract pdf",
    "service agreement maker free",
    "print contract to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/contract-template-kit" },
  openGraph: {
    title: "Free Service Agreement Template — No Sign Up, Instant PDF",
    description: "Fill in a simple service agreement and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/contract-template-kit",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this contract template really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no limit on how many agreements you can create.",
  },
  {
    q: "Is this a legally binding contract?",
    a: "This is a simple, general-purpose starting template covering the basics — parties, services, payment, term, and governing law. It isn't a substitute for advice from a qualified lawyer, especially for anything high-stakes, unusual, or involving significant money or risk. For routine, low-stakes freelance or service work, a clear written agreement like this is still far better than nothing in writing at all.",
  },
  {
    q: "Can I customize the clauses?",
    a: "Yes — every section (services, payment, term, termination, governing law) is a free-text field you can edit to match your specific situation, not a fixed, unchangeable template.",
  },
  {
    q: "Do you store or see the agreements I create?",
    a: "No. Every field is held in your browser's memory only, and the PDF is generated locally when you click Print. Nothing is uploaded to a server.",
  },
  {
    q: "How do I get an actual PDF file, and how do we sign it?",
    a: "Click \"Print / Save as PDF\" to export the document, which includes signature lines at the bottom. You can print it physically for wet signatures, or use the site's E-Signature Pad to create a digital signature image to insert before printing.",
  },
];

export default function ContractTemplateKitPage() {
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
            Free Contract Template Kit
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Fill in a simple service agreement below, preview it instantly, and export a clean PDF — no
            sign up, no software, nothing ever leaves your browser.
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

        <ContractTemplateClient />

        <article className="no-print mt-16 max-w-3xl space-y-8 border-t border-slate-900 pt-10 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A free service agreement template with no sign up
            </h2>
            <p className="mt-2">
              Putting a simple written agreement in place before starting freelance or service work
              protects both sides, but a lot of people skip it because finding or drafting one feels like
              overkill for smaller jobs. This tool covers the essentials — who's involved, what's being
              delivered, how much it costs, and how the agreement can end — and exports a clean PDF the
              moment you're ready, with no account and no cost.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Name the parties.</strong> Add the service provider
                and client names and addresses, plus an effective date.
              </li>
              <li>
                <strong className="text-slate-200">Describe the services.</strong> Write out what's being
                delivered in plain language.
              </li>
              <li>
                <strong className="text-slate-200">Set payment terms.</strong> Enter the total fee and
                how it's scheduled to be paid.
              </li>
              <li>
                <strong className="text-slate-200">Fill in term, termination, and governing law.</strong>{" "}
                Each field is fully editable to match your situation.
              </li>
              <li>
                <strong className="text-slate-200">Export as PDF.</strong> Click "Print / Save as PDF" —
                signature lines are included at the bottom.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What this template is — and isn't</h2>
            <p className="mt-2">
              This is a genuinely useful starting point for straightforward, lower-stakes service work —
              the kind of agreement that's better to have in writing than not, even if it's simple. It
              isn't a substitute for a lawyer's advice on anything with real complexity or risk: unusual
              payment structures, intellectual property questions, larger contracts, or anything where
              getting a clause wrong could genuinely hurt you. Use good judgment about when "good enough"
              is actually good enough.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Signing the finished agreement</h2>
            <p className="mt-2">
              The exported PDF includes signature lines for both parties. You can print it and sign by
              hand, or use the site's{" "}
              <Link href="/tools/e-signature-pad" className="text-amber-400 underline underline-offset-2">
                E-Signature Pad
              </Link>{" "}
              to draw a signature, download it as a transparent PNG, and insert it into the document
              before printing or sharing it.
            </p>
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

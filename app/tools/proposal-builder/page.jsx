import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Zap } from "lucide-react";
import LogoMark from "../../components/Logo";
import ProposalBuilderClient from "./ProposalBuilderClient";

export const metadata = {
  title: "Free Proposal Builder — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Draft a clean project proposal free, with no sign up. Add an overview, scope of work, and pricing, then export an instant PDF — right in your browser.",
  keywords: [
    "free proposal builder no sign up",
    "project proposal template online",
    "create proposal pdf free",
    "proposal generator for freelancers",
    "business proposal maker online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/proposal-builder" },
  openGraph: {
    title: "Free Proposal Builder — No Sign Up, Instant PDF",
    description: "Draft a clean project proposal and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/proposal-builder",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this proposal builder really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no limit on how many proposals you can create.",
  },
  {
    q: "What sections does the proposal include?",
    a: "An overview, a scope-of-work list, an investment (pricing) breakdown, and a timeline — the core sections most client-facing project proposals need.",
  },
  {
    q: "How is this different from the Quote Builder?",
    a: "The Quote Builder focuses narrowly on itemized pricing for a straightforward estimate. This tool is meant for a fuller pitch — with room to explain the project overview, lay out the scope of work as a list, and describe a timeline — useful when you're proposing a larger or more involved piece of work, not just quoting a price.",
  },
  {
    q: "Do you store or see the proposals I create?",
    a: "No. Every field is held in your browser's memory only, and the PDF is generated locally when you click Print. Nothing is uploaded to a server.",
  },
  {
    q: "How do I get an actual PDF file?",
    a: "Click \"Print / Save as PDF,\" then in your browser's print dialog, choose \"Save as PDF\" as the destination instead of a physical printer.",
  },
];

export default function ProposalBuilderPage() {
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
          <h1 className="text-2xl font-black tracking-tight text-slate-50 sm:text-3xl">Free Proposal Builder</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Fill in your details below, preview the result instantly, and export a clean, professional
            project proposal — no sign up, no software, nothing ever leaves your browser.
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

        <ProposalBuilderClient />

        <article className="no-print mt-16 max-w-3xl space-y-8 border-t border-slate-900 pt-10 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A free proposal builder with no sign up required
            </h2>
            <p className="mt-2">
              Pitching a project to a prospective client usually calls for more than just a price — it
              needs an overview that explains the plan, a clear scope of what's included, and a sense of
              timeline, all presented cleanly. This tool covers all of that, exporting a polished PDF the
              moment you're ready, with no account and no limit on how many proposals you build.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Set the title and details.</strong> Name the proposal
                and fill in who it's from and who it's for.
              </li>
              <li>
                <strong className="text-slate-200">Write the overview.</strong> A short paragraph
                explaining what you're proposing and why.
              </li>
              <li>
                <strong className="text-slate-200">List the scope of work.</strong> Break the project
                down into clear bullet points.
              </li>
              <li>
                <strong className="text-slate-200">Add pricing and a timeline.</strong> Itemize the
                investment and describe the expected schedule.
              </li>
              <li>
                <strong className="text-slate-200">Export as PDF.</strong> Click "Print / Save as PDF"
                and choose "Save as PDF" in your browser's print dialog.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Proposal versus quote — which one to use</h2>
            <p className="mt-2">
              For a simple, itemized price estimate, the site's{" "}
              <Link href="/tools/quote-builder" className="text-amber-400 underline underline-offset-2">
                Quote Builder
              </Link>{" "}
              is the faster fit. This proposal tool is built for a fuller pitch — when you need room to
              explain the thinking behind a project, lay out exactly what's included as a scope of work,
              and set expectations on timeline, not just state a price. Larger or more involved projects
              tend to benefit from the extra context a full proposal provides.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What makes a proposal convincing</h2>
            <p className="mt-2">
              A strong proposal is specific rather than vague — a scope-of-work list that names concrete
              deliverables reads as far more credible than a general description of "design and
              development." Similarly, a realistic, clearly stated timeline builds more trust than an
              open-ended promise. Taking the time to fill in genuine specifics here, rather than generic
              placeholders, is what actually makes a proposal persuasive.
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

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import TipCalculatorClient from "./TipCalculatorClient";

export const metadata = {
  title: "Free Tip Calculator Online — Split the Bill, No Sign Up | QuickZeta",
  description:
    "Calculate a tip and split a bill between any number of people, free, with no sign up. Computed instantly in your browser.",
  keywords: [
    "free tip calculator online",
    "split bill calculator no sign up",
    "tip percentage calculator free",
    "restaurant tip calculator online",
    "bill splitter tool",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/tip-calculator" },
  openGraph: {
    title: "Free Tip Calculator Online — Split the Bill, No Sign Up",
    description: "Calculate a tip and split a bill instantly, in your browser.",
    url: "https://quickzeta.com/tools/tip-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this tip calculator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many times you can use it.",
  },
  {
    q: "How does splitting the bill actually work?",
    a: "The total bill plus tip is divided evenly across the number of people you specify — a straightforward even split, not itemized per person's individual order.",
  },
  {
    q: "What's a typical tip percentage?",
    a: "This varies a lot by country and context — commonly somewhere between 15–20% at US restaurants for standard service, though local norms differ significantly elsewhere and this tool doesn't assume any particular default is \"correct\" for your situation.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. Everything is computed directly in your browser.",
  },
];

export default function TipCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Tip Calculator"
      subtitle="Calculate a tip and split a bill between any number of people — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Quick math at the table
            </h2>
            <p className="mt-2">
              Splitting a bill fairly between several people while also working out a tip is exactly the
              kind of small math that's easy to get wrong doing it in your head. This tool computes both
              instantly, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Enter the bill total.</li>
              <li>Set the tip percentage and number of people splitting it.</li>
              <li>Read the per-person total instantly.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Instant, exact results — no mental rounding needed</li>
                  <li>Splits evenly across any number of people</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Even split only — doesn't itemize per person's individual order</li>
                  <li>Doesn't account for tax being calculated before or after tip, which varies locally</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Splitting a restaurant bill evenly among a group.</li>
              <li>Working out a tip amount before paying.</li>
              <li>Checking each person's fair share on a shared order.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on tipping norms</h2>
            <p className="mt-2">
              Appropriate tip percentages vary significantly by country, and even by context within the
              same country — restaurant service, delivery, and other situations often carry different
              expectations. This tool doesn't assume a "correct" default, since there genuinely isn't a
              universal one; it simply computes whatever percentage you enter accurately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              For working out a discount or a percentage change instead, the site's{" "}
              <Link href="/tools/percentage-calculator" className="text-amber-400 underline underline-offset-2">
                Percentage Calculator
              </Link>{" "}
              covers that directly.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="tip-calculator" />
        </>
      }
    >
      <TipCalculatorClient />
    </ToolPageShell>
  );
}

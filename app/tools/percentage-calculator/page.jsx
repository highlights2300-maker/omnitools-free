import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata = {
  title: "Free Percentage & Markup Calculator Online — No Sign Up | QuickZeta",
  description:
    "Calculate percentages, percentage changes, and markups instantly, free, with no sign up. Computed entirely in your browser.",
  keywords: [
    "free percentage calculator online",
    "markup calculator no sign up",
    "percentage change calculator free",
    "discount calculator online",
    "percent of number calculator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/percentage-calculator" },
  openGraph: {
    title: "Free Percentage & Markup Calculator Online — No Sign Up",
    description: "Calculate percentages and markups instantly, in your browser.",
    url: "https://quickzeta.com/tools/percentage-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this calculator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many calculations you can run.",
  },
  {
    q: "What's the difference between a percentage and a percentage point?",
    a: "This trips a lot of people up. If an interest rate moves from 5% to 7%, that's a 2 percentage point increase, but a 40% relative increase (2 is 40% of 5). Both statements are true but describe different things — mixing them up is a common source of confusion, especially in financial and statistical reporting.",
  },
  {
    q: "How is markup different from margin?",
    a: "Markup is added on top of cost (a $10 item marked up 50% sells for $15). Margin is the percentage of the selling price that's profit (that same $15 sale with a $10 cost has a 33% margin, not 50%). They're calculated from different bases, which is why the two numbers are never the same for a given price.",
  },
];

export default function PercentageCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Percentage & Markup Calculator"
      subtitle="Work out percentages, changes, and markups instantly — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Percentage math, computed instantly
            </h2>
            <p className="mt-2">
              Working out a discount, a price increase, or a markup by hand is easy to get subtly wrong.
              This tool computes it instantly and accurately, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Enter your numbers into whichever calculation mode fits what you need — percentage of a
              number, percentage change between two values, or markup on a cost — and read the result
              instantly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Working out a discount at checkout.</li>
              <li>Calculating a price increase or decrease year over year.</li>
              <li>Setting a markup on a product's cost.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Percentage point versus percentage — a common mix-up</h2>
            <p className="mt-2">
              This distinction trips up a lot of people, including in professional reporting. If a rate
              moves from 5% to 7%, that's genuinely a 2 percentage point increase — but it's also a 40%
              relative increase, since 2 is 40% of the original 5. Both descriptions are accurate; they
              just measure different things, and mixing them up in a sentence can make a change sound far
              bigger or smaller than it actually is.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Markup versus margin</h2>
            <p className="mt-2">
              Markup is calculated on top of cost — a $10 item with a 50% markup sells for $15. Margin is
              calculated as a percentage of the selling price — that same $15 sale, with a $10 cost, has
              roughly a 33% margin, not 50%. The two numbers describe the same sale but from different
              starting points, which is exactly why they're never equal for the same transaction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              For splitting a bill instead, the site's{" "}
              <Link href="/tools/tip-calculator" className="text-amber-400 underline underline-offset-2">
                Tip Calculator
              </Link>{" "}
              handles that directly.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="percentage-calculator" />
        </>
      }
    >
      <PercentageCalculatorClient />
    </ToolPageShell>
  );
}

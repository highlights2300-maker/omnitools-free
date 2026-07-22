import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata = {
  title: "Free Percentage & Markup Calculator Online | QuickZeta",
  description:
    "Work out percentages, discounts, and price markups instantly — free, with no sign up. Find what X% of Y is, what percent X is of Y, or a marked-up sale price.",
  keywords: [
    "free percentage calculator online",
    "markup calculator no sign up",
    "discount percentage calculator",
    "what percent is x of y",
    "cost plus markup calculator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/percentage-calculator" },
  openGraph: {
    title: "Free Percentage & Markup Calculator Online",
    description: "Work out percentages, discounts, and price markups instantly, computed in your browser.",
    url: "https://quickzeta.com/tools/percentage-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this percentage calculator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many calculations you can do.",
  },
  {
    q: "What's the difference between the three calculators on this page?",
    a: "\"What is X% of Y?\" finds a portion of a number — useful for discounts or tips. \"X is what % of Y?\" finds the percentage relationship between two numbers — useful for tracking progress or comparing values. \"Markup\" adds a percentage on top of a cost to find a sale price — useful for pricing something you're reselling.",
  },
  {
    q: "How do I calculate a discount using this tool?",
    a: "Use the \"What is X% of Y?\" calculator with the discount percentage as X and the original price as Y — that gives you the discount amount. Subtract that from the original price to get the final sale price.",
  },
  {
    q: "What's the difference between markup and margin?",
    a: "Markup is calculated as a percentage of the cost (what this tool calculates), while margin is calculated as a percentage of the final selling price. A 30% markup on a $100 cost gives a $130 price, but that $30 profit is only about 23% of the $130 selling price — margin and markup are related but not the same number.",
  },
  {
    q: "Is my data sent anywhere when I use this?",
    a: "No. Every calculation happens directly in your browser — nothing you enter is uploaded or stored.",
  },
];

export default function PercentageCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Percentage & Markup Calculator"
      subtitle="Work out percentages, discounts, and price markups instantly — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Three common percentage calculations in one place
            </h2>
            <p className="mt-2">
              Percentage math shows up constantly in everyday and business situations — figuring out a
              discount at checkout, working out what portion of a budget has been spent, or pricing a
              product with a healthy markup over cost. This tool covers the three most commonly needed
              calculations side by side, so there's no need to remember which formula to rearrange for
              each one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">The three calculators explained</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">What is X% of Y?</strong> — finds a portion of a
                number. Useful for calculating a tip, a discount amount, or a percentage-based fee.
              </li>
              <li>
                <strong className="text-slate-200">X is what % of Y?</strong> — finds the percentage
                relationship between two numbers. Useful for tracking what portion of a goal has been
                reached, or comparing two values.
              </li>
              <li>
                <strong className="text-slate-200">Markup calculator</strong> — adds a percentage on top
                of a cost to find a sale price. Useful for anyone pricing a product or service based on
                what it costs to provide.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Markup versus margin — a common mix-up</h2>
            <p className="mt-2">
              These two terms get confused often, but they're calculated differently. Markup is a
              percentage added on top of cost — a $100 item with a 30% markup sells for $130. Margin is
              the profit expressed as a percentage of the selling price instead — on that same $130 sale,
              the $30 profit is only about 23% of the final price, not 30%. This calculator specifically
              works out markup (cost-based), which is what most small businesses use when pricing from a
              known cost.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your numbers stay private</h2>
            <p className="mt-2">
              Nothing you enter into this calculator is sent anywhere — every calculation runs directly
              in your browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick worked example</h2>
            <p className="mt-2">
              Say an item is priced at $150 and is 20% off. Using the "What is X% of Y?" calculator with
              X as 20 and Y as 150 gives a discount amount of $30 — so the final price is $150 minus $30,
              or $120. Flip it around with the second calculator to check your work: $30 is exactly 20% of
              $150, confirming the discount was applied correctly. The same pattern works for tips, sales
              tax, or any other situation where you need to find a portion of a total.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <PercentageCalculatorClient />
    </ToolPageShell>
  );
}

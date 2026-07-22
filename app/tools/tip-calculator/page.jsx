import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import TipCalculatorClient from "./TipCalculatorClient";

export const metadata = {
  title: "Free Tip Calculator Online — Split the Bill Instantly | QuickZeta",
  description:
    "Work out the tip and split a bill between any number of people, instantly — free, with no sign up. Adjust the tip percentage and see the total update live.",
  keywords: [
    "free tip calculator online",
    "bill splitter no sign up",
    "how much to tip calculator",
    "split bill between friends calculator",
    "restaurant tip calculator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/tip-calculator" },
  openGraph: {
    title: "Free Tip Calculator Online — Split the Bill Instantly",
    description: "Work out the tip and split a bill between any number of people, instantly.",
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
    q: "How do I split a bill evenly between a group?",
    a: "Enter the total bill amount, set the tip percentage, and change \"Number of people\" to however many are splitting it — the per-person amount updates instantly.",
  },
  {
    q: "What's a typical tip percentage?",
    a: "It varies by country and situation, but in the US, 15–20% is common for restaurant table service, with 20% often considered standard for good service. Many other countries have little to no tipping culture at all, so it's worth going with local custom rather than a fixed rule.",
  },
  {
    q: "Does the calculator round the per-person amount?",
    a: "It shows the exact mathematical split to the cent. If you're paying in cash and want a cleaner round number per person, you can adjust the tip percentage slightly until the total divides evenly.",
  },
  {
    q: "Is my bill information sent anywhere?",
    a: "No. Every calculation happens directly in your browser — nothing you enter is uploaded or stored.",
  },
];

export default function TipCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Tip Calculator"
      subtitle="Work out the tip and split a bill between any number of people, instantly — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A quick tip calculator for splitting the bill
            </h2>
            <p className="mt-2">
              Working out a tip and dividing a bill fairly between a group is a small but common piece of
              mental math that's easy to get wrong, especially with an odd number of people or an
              unfamiliar currency. This calculator handles it instantly — enter the bill, set a tip
              percentage, and see the total and per-person amount update live as you adjust either one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Enter the bill amount.</strong> Type in the total
                before tip.
              </li>
              <li>
                <strong className="text-slate-200">Adjust the tip percentage.</strong> Drag the slider to
                whatever percentage you'd like to leave.
              </li>
              <li>
                <strong className="text-slate-200">Set the number of people.</strong> The total splits
                evenly across however many people you enter.
              </li>
              <li>
                <strong className="text-slate-200">Read the results.</strong> Tip amount, grand total, and
                per-person share all update instantly.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Tipping guidelines, roughly</h2>
            <p className="mt-2">
              Tipping customs vary widely by country and even by type of service, so there's no single
              universal answer. In the US, 15% is often considered a baseline for adequate table service,
              with 18–20% common for good service and higher for exceptional service. Many countries in
              Europe and Asia have little to no tipping expectation at all, or fold a service charge
              directly into the bill already. When in doubt, it's worth going with local custom rather
              than a fixed percentage.
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
            <h2 className="text-lg font-semibold text-slate-100">Splitting a bill fairly when orders differ</h2>
            <p className="mt-2">
              An even split works well when everyone ordered roughly the same amount, but it can feel
              unfair if one person had a starter, dessert, and a couple of drinks while another just had
              a coffee. In cases like that, some groups prefer to first divide up who owes what for their
              own items, then use a calculator like this one on just the shared portion — appetizers,
              a bottle of wine, or a service charge — before adding each person's individual share back
              on top. There's no universally "correct" approach; it comes down to what feels fair to the
              group.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <TipCalculatorClient />
    </ToolPageShell>
  );
}

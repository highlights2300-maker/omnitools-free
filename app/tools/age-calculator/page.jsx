import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata = {
  title: "Free Age Calculator Online — Exact Age & Duration | QuickZeta",
  description:
    "Find the exact age or duration between two dates, free, with no sign up. Accounts for leap years and varying month lengths — computed entirely in your browser.",
  keywords: [
    "free age calculator online",
    "date duration calculator no sign up",
    "exact age calculator free",
    "days between dates calculator",
    "how old am i calculator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/age-calculator" },
  openGraph: {
    title: "Free Age Calculator Online — Exact Age & Duration",
    description: "Find the exact age or duration between two dates, in your browser.",
    url: "https://quickzeta.com/tools/age-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this calculator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many times you can use it.",
  },
  {
    q: "Does it account for leap years?",
    a: "Yes — the calculation is based on actual calendar dates, so leap years and varying month lengths (28, 29, 30, or 31 days) are all handled correctly rather than assuming every month or year is the same length.",
  },
  {
    q: "Why is \"how many years old\" not just a simple subtraction?",
    a: "Because months have different lengths and years occasionally have an extra day, naively subtracting birth year from the current year (or even just counting days and dividing by 365) can be off by a day in certain date combinations. This tool works from actual calendar dates directly, avoiding that class of rounding error entirely.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. Everything is computed directly in your browser.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Age Calculator"
      subtitle="Find the exact age or duration between two dates — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Exact duration, not an approximation
            </h2>
            <p className="mt-2">
              Working out someone's exact age, or the precise number of days until a deadline, sounds
              simple until leap years and uneven month lengths get involved. This tool computes it
              exactly, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Enter a start date and an end date (or leave the end date as today) — the exact duration in
              years, months, and days appears instantly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Genuinely exact, accounting for leap years and real month lengths</li>
                  <li>Works for any two dates, not just birth dates</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Doesn't account for time zone differences on the exact date boundary</li>
                  <li>Assumes the standard Gregorian calendar</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Finding someone's exact current age.</li>
              <li>Counting down the exact days until a deadline or event.</li>
              <li>Working out the duration between two historical dates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why calendar math isn't simple subtraction</h2>
            <p className="mt-2">
              A rough shortcut like "divide the number of days by 365" quietly breaks down around leap
              years and the genuinely uneven lengths of different months — February's 28 or 29 days versus
              a 31-day month can shift a naive calculation by a day in certain date combinations. This
              tool works from actual calendar dates directly, correctly accounting for real month lengths
              and leap years rather than relying on an averaged approximation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              For adding up hours worked instead of calendar duration, the site's{" "}
              <Link href="/tools/timesheet-calculator" className="text-amber-400 underline underline-offset-2">
                Timesheet Calculator
              </Link>{" "}
              handles that directly.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="age-calculator" />
        </>
      }
    >
      <AgeCalculatorClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata = {
  title: "Free Age Calculator Online — Exact Age or Date Difference | QuickZeta",
  description:
    "Calculate exact age in years, months, and days, or the duration between any two dates — free, with no sign up. Computed instantly in your browser.",
  keywords: [
    "free age calculator online",
    "date difference calculator no sign up",
    "how old am i calculator",
    "days between two dates calculator",
    "exact age in years months days",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/age-calculator" },
  openGraph: {
    title: "Free Age Calculator Online — Exact Age or Date Difference",
    description: "Calculate exact age or the duration between any two dates, instantly.",
    url: "https://quickzeta.com/tools/age-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this age calculator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many times you can use it.",
  },
  {
    q: "Can I use this to find the number of days between two dates that aren't a birthday?",
    a: "Yes — this works for any two dates, not just birthdays. Set the \"From\" date and \"To\" date to whatever range you want to measure, and it'll show the exact years, months, days, and total day count between them.",
  },
  {
    q: "Why does it show years, months, and days separately, plus a total day count?",
    a: "Different situations call for different formats — \"32 years, 4 months, 11 days\" reads naturally for describing someone's age, while a single total day count is more useful for things like calculating an exact duration for a contract, a countdown, or a scientific measurement.",
  },
  {
    q: "How is a leap year handled?",
    a: "The calculation is based on actual calendar dates, so leap years are accounted for automatically and correctly — no separate adjustment needed.",
  },
  {
    q: "Is my date of birth sent anywhere when I use this?",
    a: "No. The calculation happens entirely in your browser — nothing you enter is uploaded, logged, or stored.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Age Calculator"
      subtitle="Find an exact age or the duration between two dates, instantly — no sign up, nothing stored."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Calculate exact age or the gap between two dates
            </h2>
            <p className="mt-2">
              Whether you're working out someone's exact age down to the day, checking how many days
              remain until a deadline, or figuring out the length of time between two events, this tool
              gives an instant, precise answer with no account needed. Every calculation is done directly
              in your browser using real calendar dates, so leap years and varying month lengths are
              handled correctly without any manual adjustment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Set the "From" date.</strong> This could be a date of
                birth, a start date, or any earlier reference point.
              </li>
              <li>
                <strong className="text-slate-200">Set the "To" date.</strong> Defaults to today, but can
                be changed to any date to measure a specific range.
              </li>
              <li>
                <strong className="text-slate-200">Read the result instantly.</strong> Years, months, and
                days are shown separately, along with the total number of days between the two dates.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Finding someone's exact age for a form, application, or record.</li>
              <li>Counting down the exact number of days until an upcoming date.</li>
              <li>Measuring the length of employment, a lease, or a project between two dates.</li>
              <li>Working out how many days old a baby or a pet is.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why the total day count matters too</h2>
            <p className="mt-2">
              "Years, months, and days" is the most natural way to describe an age in conversation, but
              it isn't always the most useful number for calculations. A total day count is often what's
              actually needed for things like a countdown, a legal notice period, or comparing exact
              durations that don't line up neatly with calendar months — this tool provides both so you
              don't need a second calculation to convert between them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your dates stay private</h2>
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
            <h2 className="text-lg font-semibold text-slate-100">Age milestones people often check</h2>
            <p className="mt-2">
              Age calculations come up for more than just curiosity — many official processes are tied to
              an exact date, not just a birth year. Eligibility for certain benefits, minimum ages for
              specific licenses, retirement age thresholds, and school enrollment cutoffs often depend on
              the precise date someone turns a particular age, not the calendar year. Getting the exact
              day right, rather than approximating from a birth year alone, can matter more than it seems
              for these kinds of decisions.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <AgeCalculatorClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import TimesheetCalculatorClient from "./TimesheetCalculatorClient";

export const metadata = {
  title: "Free Timesheet Calculator Online — Hours & Pay, No Sign Up | QuickZeta",
  description:
    "Add up hours worked and pay for the week instantly, free, with no sign up. Computed entirely in your browser.",
  keywords: [
    "free timesheet calculator online",
    "hours worked calculator no sign up",
    "weekly pay calculator free",
    "time card calculator online",
    "hourly pay calculator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/timesheet-calculator" },
  openGraph: {
    title: "Free Timesheet Calculator Online — Hours & Pay, No Sign Up",
    description: "Add up hours worked and pay for the week instantly, in your browser.",
    url: "https://quickzeta.com/tools/timesheet-calculator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this timesheet calculator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many times you can use it.",
  },
  {
    q: "Does it handle overtime automatically?",
    a: "This tool totals hours and applies your hourly rate to what you enter — it doesn't automatically apply a specific overtime multiplier, since overtime rules vary significantly by jurisdiction, employer policy, and employment type. If overtime applies, calculate the regular and overtime hours as separate entries at their respective rates.",
  },
  {
    q: "How should I handle rounding — like clocking in at 9:07?",
    a: "Rounding conventions (to the nearest 15 minutes, 6 minutes, or not at all) vary by workplace policy. Enter the actual times or hours your specific situation calls for; this tool computes exactly what you enter without applying its own rounding rules on top.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. Everything is computed directly in your browser.",
  },
];

export default function TimesheetCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Timesheet Calculator"
      subtitle="Add up hours worked and pay for the week instantly — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Adding up a week's hours, without a spreadsheet
            </h2>
            <p className="mt-2">
              Totaling hours across several days and multiplying by an hourly rate is simple in theory
              but easy to fumble by hand, especially across multiple days with different start and end
              times. This tool computes it instantly, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Enter start and end times for each day.</li>
              <li>Set the hourly rate.</li>
              <li>Read the total hours and pay instantly.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Instant totals across multiple days</li>
                  <li>No account needed to track a week's hours</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No automatic overtime multiplier applied</li>
                  <li>Doesn't save data between sessions — it's a calculator, not a time-tracking system</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Adding up hours across a work week before payday.</li>
              <li>Checking pay for freelance or contract hours worked.</li>
              <li>Cross-checking a paycheck against hours actually logged.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on overtime and rounding</h2>
            <p className="mt-2">
              This tool totals the hours and pay you enter directly — it doesn't apply an automatic
              overtime multiplier or a specific clock-rounding convention on top, since both vary
              significantly by jurisdiction, employer policy, and employment type. If overtime applies to
              your situation, entering regular and overtime hours as separate line items at their
              respective rates gives an accurate total without the tool needing to guess at rules that
              differ from one workplace to the next.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once totaled, bill a client for the hours with the site's{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>
              .
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="timesheet-calculator" />
        </>
      }
    >
      <TimesheetCalculatorClient />
    </ToolPageShell>
  );
}

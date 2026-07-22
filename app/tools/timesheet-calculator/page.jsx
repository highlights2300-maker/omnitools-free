import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import TimesheetCalculatorClient from "./TimesheetCalculatorClient";

export const metadata = {
  title: "Free Timesheet Calculator Online — Hours & Pay | QuickZeta",
  description:
    "Add up hours worked and calculate pay for the week, free, with no sign up. Add as many days as you need and see the total update instantly.",
  keywords: [
    "free timesheet calculator online",
    "hours worked calculator no sign up",
    "weekly pay calculator from hours",
    "hourly wage calculator free",
    "add up work hours calculator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/timesheet-calculator" },
  openGraph: {
    title: "Free Timesheet Calculator Online — Hours & Pay",
    description: "Add up hours worked and calculate pay for the week, computed instantly in your browser.",
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
    q: "Can I add more than a standard 5- or 7-day week?",
    a: "Yes — click \"Add day\" to add as many rows as you need, whether that's tracking a shorter week, a two-week pay period, or hours across multiple projects in a single day.",
  },
  {
    q: "Does this handle overtime pay?",
    a: "This calculator applies a single hourly rate across all hours entered. If your overtime rate differs from your regular rate, you can calculate the regular and overtime hours separately using two passes, or simply add the overtime hours as their own row at an adjusted effective rate.",
  },
  {
    q: "Can I use decimal hours, like 7.5?",
    a: "Yes — the hours field accepts decimal values, so partial hours (like 30 minutes as 0.5) can be entered directly.",
  },
  {
    q: "Is my timesheet data sent anywhere?",
    a: "No. Everything is calculated directly in your browser — nothing you enter is uploaded, logged, or stored.",
  },
];

export default function TimesheetCalculatorPage() {
  return (
    <ToolPageShell
      title="Free Timesheet Calculator"
      subtitle="Add up hours worked and calculate pay for the week, instantly — no sign up, nothing stored."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A simple timesheet calculator for hourly pay
            </h2>
            <p className="mt-2">
              Whether you're a freelancer tallying billable hours, an hourly employee double-checking a
              paycheck, or a small business owner working out what to pay part-time staff, adding up hours
              across several days and multiplying by a rate is a small task that's still easy to fumble by
              hand. This calculator does it instantly — add a row per day, enter the hours, set an hourly
              rate, and see the total hours and total pay update live.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Set your hourly rate.</strong> Enter the pay rate that
                applies to the hours you're tracking.
              </li>
              <li>
                <strong className="text-slate-200">Add each day.</strong> Label the day and enter the
                hours worked — add as many rows as needed.
              </li>
              <li>
                <strong className="text-slate-200">Read the totals.</strong> Total hours and total pay
                update automatically as you add or edit rows.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Freelancers totaling billable hours for a client invoice.</li>
              <li>Hourly employees double-checking a paycheck against hours actually worked.</li>
              <li>Small business owners estimating payroll for part-time or shift staff.</li>
              <li>
                Feeding the total straight into the site's{" "}
                <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                  Invoice Generator
                </Link>{" "}
                as a line item for hours billed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on overtime</h2>
            <p className="mt-2">
              This calculator applies one flat hourly rate across every row, which covers most simple
              tracking needs. If part of your hours are paid at a different overtime rate, a common
              approach is to run the calculation twice — once for regular hours at the standard rate, and
              once for overtime hours at the higher rate — then add the two totals together for the final
              pay figure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your hours stay private</h2>
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
            <h2 className="text-lg font-semibold text-slate-100">Converting minutes to decimal hours</h2>
            <p className="mt-2">
              A common source of small errors in manual timesheet math is mixing up minutes and decimal
              hours — 7 hours and 30 minutes isn't 7.3 hours, it's 7.5. To convert minutes to a decimal,
              divide the minutes by 60: 15 minutes is 0.25, 30 minutes is 0.5, and 45 minutes is 0.75.
              Entering the correct decimal value in the hours field here avoids that rounding mistake
              carrying through into the total pay calculation.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <TimesheetCalculatorClient />
    </ToolPageShell>
  );
}

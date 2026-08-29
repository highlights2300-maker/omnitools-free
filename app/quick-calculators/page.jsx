import { Calculator } from "lucide-react";
import CategoryHubShell from "../components/CategoryHubShell";

export const metadata = {
  title: "Free Online Calculators — Tip, Age, Unit & More | QuickZeta",
  description:
    "Calculate tips, unit conversions, percentages, age, and timesheets instantly — all free, with no sign up. Every calculation happens right in your browser.",
  keywords: [
    "free online calculators no sign up",
    "tip percentage age calculator free",
    "unit converter timesheet calculator online",
    "quick calculators no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/quick-calculators" },
  openGraph: {
    title: "Free Online Calculators — Tip, Age, Unit & More",
    description: "Instant everyday calculations, computed entirely in your browser.",
    url: "https://quickzeta.com/quick-calculators",
    type: "website",
  },
};

const TOOLS = [
  { name: "Unit Converter", desc: "Convert length, weight & temperature — exact.", href: "/tools/unit-converter" },
  { name: "Tip Calculator", desc: "Split a bill and work out the tip in taps.", href: "/tools/tip-calculator" },
  { name: "Percentage & Markup Calculator", desc: "Work out percentages and markups fast.", href: "/tools/percentage-calculator" },
  { name: "Age Calculator", desc: "Find the exact age or duration between dates.", href: "/tools/age-calculator" },
  { name: "Timesheet Calculator", desc: "Add up hours worked and pay for the week.", href: "/tools/timesheet-calculator" },
];

export default function QuickCalculatorsPage() {
  return (
    <CategoryHubShell
      title="Quick Calculators"
      subtitle="Everyday math — instant, exact answers, computed right on your device."
      icon={Calculator}
      accentClass="bg-rose-400/10 text-rose-400"
      tools={TOOLS}
    >
      <h2 className="text-lg font-semibold text-slate-100">
        Small calculations that add up to real time saved
      </h2>
      <p>
        Some math is too small to open a spreadsheet for, but easy enough to get slightly wrong doing it
        in your head — splitting a bill fairly, converting a recipe from metric to imperial, working out
        exactly how many days until a deadline, or totaling up a week's worth of hourly pay. Quick
        Calculators covers five of the most commonly needed everyday calculations, each computed
        instantly as you type.
      </p>
      <p>
        Every calculator here runs entirely inside your browser using standard, precise math — not
        rounded rules of thumb. A kilogram-to-pound conversion uses the exact defined conversion factor
        rather than "just multiply by two," a tip calculator splits a bill down to the cent, and an age
        calculation accounts for leap years and varying month lengths automatically, the same way any
        properly written date calculation should. Nothing you type into any of these tools — a bill
        amount, a birth date, an hourly rate — is ever sent anywhere; the result appears the instant you
        finish typing, computed locally on your own device.
      </p>
      <p>
        Because there's no server step involved, there's also no limit on how many times you can use any
        of these, no account needed, and no ads interrupting a calculation you need quickly. Whether
        you're checking a discount at checkout, converting a unit for a recipe, or double-checking a
        paycheck against hours actually worked, these five tools are built for the kind of quick, in-the-
        moment math that doesn't warrant opening anything heavier — the kind of thing you'd otherwise
        reach for a calculator app or a scrap of paper to figure out.
      </p>
      <p>
        Each calculator below has its own dedicated page with more detail on how it works — click through
        to get started, and expect an answer the moment you finish typing, with no button to press and
        no page to reload.
      </p>
    </CategoryHubShell>
  );
}

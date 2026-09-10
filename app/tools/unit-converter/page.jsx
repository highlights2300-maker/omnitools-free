import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import UnitConverterClient from "./UnitConverterClient";

export const metadata = {
  title: "Free Unit Converter Online — Exact, No Sign Up | QuickZeta",
  description:
    "Convert length, weight, and temperature with exact conversion factors, free, with no sign up. Computed instantly in your browser.",
  keywords: [
    "free unit converter online",
    "exact unit conversion no sign up",
    "length weight temperature converter",
    "metric to imperial converter free",
    "precise unit conversion tool",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/unit-converter" },
  openGraph: {
    title: "Free Unit Converter Online — Exact, No Sign Up",
    description: "Convert length, weight, and temperature with exact conversion factors.",
    url: "https://quickzeta.com/tools/unit-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this unit converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many conversions you can run.",
  },
  {
    q: "How precise are the conversions, actually?",
    a: "They use the internationally defined exact conversion factors, not rounded approximations — for example, one inch is defined as exactly 25.4 millimeters, and this tool uses that exact figure rather than a rounded \"about 25\" shortcut some quick-reference charts use.",
  },
  {
    q: "Why do some online conversions give slightly different answers?",
    a: "Small discrepancies usually come from a site rounding an intermediate step, or using an older, superseded definition for a unit. Most common units (meter, kilogram, and units derived from them) have internationally agreed, exact definitions, so a correct converter should match another correct converter precisely.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. Every conversion is computed directly in your browser — there's no server involved, so there's nothing to send.",
  },
];

export default function UnitConverterPage() {
  return (
    <ToolPageShell
      title="Free Unit Converter"
      subtitle="Convert length, weight, and temperature with exact conversion factors — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Exact conversion factors, not rounded rules of thumb
            </h2>
            <p className="mt-2">
              A lot of quick mental-math conversions — "just multiply by two" for kilograms to pounds,
              for instance — are close enough for a rough estimate but genuinely wrong for anything that
              needs to be accurate. This tool uses the internationally defined exact conversion factors
              for each unit, computed instantly in your browser as you type.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Pick the category — length, weight, or temperature.</li>
              <li>Choose your starting unit and enter a value.</li>
              <li>Read the converted result instantly in the target unit.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why "close enough" conversions drift</h2>
            <p className="mt-2">
              Most everyday units have a precisely defined relationship to each other — an inch is
              exactly 25.4 millimeters, a pound is exactly 0.45359237 kilograms — figures fixed by
              international standards bodies, not approximations. Rough mental shortcuts like "a kilogram
              is about two pounds" are genuinely useful for a quick gut check, but they compound into real
              error over larger numbers or when a result gets used in a further calculation. This tool
              always uses the exact defined figures, so the result is precise regardless of how large or
              small the input is.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on temperature</h2>
            <p className="mt-2">
              Temperature is a slightly different kind of conversion than length or weight — it's not a
              simple multiplication, since Celsius and Fahrenheit have different zero points as well as
              different scale sizes. Celsius to Fahrenheit involves both a multiplication and an offset
              (multiply by 9/5, then add 32), which is exactly what this tool handles automatically rather
              than leaving you to remember the formula.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A couple of conversions people get wrong</h2>
            <p className="mt-2">
              Cups, tablespoons, and other cooking measurements sound like straightforward volume
              conversions, but they actually vary slightly between US customary and imperial
              definitions — worth double-checking which system a recipe actually intends if precision
              matters. Similarly, "tons" is genuinely ambiguous without more context: a US short ton, a
              UK long ton, and a metric tonne are three different weights, close enough to cause real
              confusion but not identical. Picking the right starting unit, not just the right number,
              is often where conversion mistakes actually happen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              For splitting a bill or working out a percentage change rather than a unit conversion, the
              site's{" "}
              <Link href="/tools/tip-calculator" className="text-amber-400 underline underline-offset-2">
                Tip Calculator
              </Link>{" "}
              and{" "}
              <Link href="/tools/percentage-calculator" className="text-amber-400 underline underline-offset-2">
                Percentage Calculator
              </Link>{" "}
              cover that kind of everyday math.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="unit-converter" />
        </>
      }
    >
      <UnitConverterClient />
    </ToolPageShell>
  );
}

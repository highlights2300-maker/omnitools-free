import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import UnitConverterClient from "./UnitConverterClient";

export const metadata = {
  title: "Free Unit Converter Online — Length, Weight & Temperature | QuickZeta",
  description:
    "Convert length, weight, and temperature units instantly and exactly — free, with no sign up. Millimeters to inches, kilograms to pounds, Celsius to Fahrenheit, and more.",
  keywords: [
    "free unit converter online",
    "length converter no sign up",
    "weight converter kg to lb",
    "celsius to fahrenheit converter",
    "metric to imperial converter",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/unit-converter" },
  openGraph: {
    title: "Free Unit Converter Online — Length, Weight & Temperature",
    description: "Convert between metric and imperial units instantly, computed in your browser.",
    url: "https://quickzeta.com/tools/unit-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this unit converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many conversions you can do.",
  },
  {
    q: "Which units does this converter support?",
    a: "Length (millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles), weight (milligrams, grams, kilograms, ounces, and pounds), and temperature (Celsius, Fahrenheit, and Kelvin).",
  },
  {
    q: "How accurate are the conversions?",
    a: "Exact, using standard conversion factors — for example, 1 inch is defined as precisely 2.54 centimeters, and that's the value used here rather than a rounded approximation.",
  },
  {
    q: "Why do I need three separate categories instead of one converter?",
    a: "Length, weight, and temperature don't share a common unit to convert through — length is based on distance, weight on mass, and temperature uses different scales entirely (including one, Fahrenheit, that isn't just a multiplied version of Celsius). Keeping them separate avoids any confusing or invalid conversions between incompatible types.",
  },
  {
    q: "Is my data sent anywhere when I use this?",
    a: "No. Every conversion is calculated directly in your browser — nothing you type is ever uploaded or logged.",
  },
];

export default function UnitConverterPage() {
  return (
    <ToolPageShell
      title="Free Unit Converter"
      subtitle="Convert length, weight, and temperature instantly and exactly — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              An exact unit converter with no sign up
            </h2>
            <p className="mt-2">
              Whether you're converting a recipe from metric to imperial, checking a shipping weight in
              pounds against a kilogram limit, or figuring out what a forecast in Fahrenheit means in
              Celsius, this tool gives you an instant, exact answer with no account needed. Every
              calculation happens directly in your browser using standard, precise conversion factors —
              not rounded approximations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Pick a category.</strong> Choose Length, Weight, or
                Temperature.
              </li>
              <li>
                <strong className="text-slate-200">Enter a value and pick units.</strong> Select what
                you're converting from and to.
              </li>
              <li>
                <strong className="text-slate-200">Read the result instantly.</strong> The converted
                value updates as you type, with no need to click a button.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common conversions people look up</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Centimeters to inches, for furniture dimensions or clothing sizes.</li>
              <li>Kilograms to pounds, for body weight, luggage, or shipping limits.</li>
              <li>Celsius to Fahrenheit, for weather forecasts or oven temperatures.</li>
              <li>Miles to kilometers, for travel distances or running routes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why the categories are kept separate</h2>
            <p className="mt-2">
              Length, weight, and temperature each measure a fundamentally different kind of quantity, so
              this tool keeps them in separate tabs rather than one long combined list. This also avoids
              a subtle mistake that's easy to make with temperature specifically: unlike length or weight,
              converting between Celsius and Fahrenheit isn't just multiplying by a fixed factor — it
              involves a scale shift too, which is handled correctly here rather than approximated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays private</h2>
            <p className="mt-2">
              Nothing you enter into this converter is sent anywhere — every calculation happens locally
              in your browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Quick reference: common conversions</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="py-2 pr-4 font-medium">From</th>
                    <th className="py-2 pr-4 font-medium">To</th>
                    <th className="py-2 font-medium">Equals</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4">1 inch</td>
                    <td className="py-2 pr-4">centimeters</td>
                    <td className="py-2 font-mono">2.54 cm</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4">1 mile</td>
                    <td className="py-2 pr-4">kilometers</td>
                    <td className="py-2 font-mono">1.609 km</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4">1 kilogram</td>
                    <td className="py-2 pr-4">pounds</td>
                    <td className="py-2 font-mono">2.205 lb</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">0°C</td>
                    <td className="py-2 pr-4">Fahrenheit</td>
                    <td className="py-2 font-mono">32°F</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">When precision actually matters</h2>
            <p className="mt-2">
              For everyday use — checking a weather forecast or converting a recipe — a rough
              approximation is usually fine. But for anything more exacting, like engineering
              measurements, medication dosages, or shipping weight limits with a strict cutoff, using
              exact conversion factors rather than rounded rules of thumb (like "just multiply by two"
              for kilograms to pounds) can matter. This tool always uses the precise, standard conversion
              factor rather than a simplified approximation.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <UnitConverterClient />
    </ToolPageShell>
  );
}

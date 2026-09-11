import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import CsvJsonConverterClient from "./CsvJsonConverterClient";

export const metadata = {
  title: "Free CSV to JSON Converter Online — No Upload | QuickZeta",
  description:
    "Convert CSV spreadsheet data to JSON, or JSON back to CSV, free, with no upload and no sign up. Processed entirely in your browser.",
  keywords: [
    "free csv to json converter online",
    "json to csv no upload",
    "convert spreadsheet to json free",
    "csv converter no sign up",
    "data format converter online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/csv-json-converter" },
  openGraph: {
    title: "Free CSV to JSON Converter Online — No Upload",
    description: "Convert between CSV and JSON entirely in your browser.",
    url: "https://quickzeta.com/tools/csv-json-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much data you can convert.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. Conversion happens directly in your browser — nothing you paste or upload is ever transmitted.",
  },
  {
    q: "Why does converting JSON with nested objects to CSV look strange?",
    a: "CSV is fundamentally a flat, two-dimensional format — rows and columns, nothing more. JSON can represent nested structures (an object inside another object, or an array of values within a single record) that simply don't map cleanly onto a flat spreadsheet. Deeply nested JSON often needs to be flattened or restructured before it converts to CSV in a genuinely usable way — this is a structural limitation of CSV itself, not something a converter can fully work around.",
  },
  {
    q: "Does the first row need to be a header?",
    a: "Yes, for CSV-to-JSON conversion — the first row's values become the key names for every JSON object generated from the rows beneath it.",
  },
];

export default function CsvJsonConverterPage() {
  return (
    <ToolPageShell
      title="Free CSV ⇄ JSON Converter"
      subtitle="Convert spreadsheet data to JSON, or JSON back to CSV — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Two very different shapes for the same data
            </h2>
            <p className="mt-2">
              CSV and JSON solve similar problems in genuinely different ways — one's a flat spreadsheet,
              the other's a nested, flexible structure. Moving data between them is a routine need for
              anyone working with exported data or an API. This tool converts both directions directly in
              your browser, with nothing ever uploaded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Paste or upload your CSV or JSON data.</li>
              <li>Convert to the other format.</li>
              <li>Copy or download the result.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Converting an exported spreadsheet into JSON for use in code.</li>
              <li>Turning an API's JSON response into a CSV for a spreadsheet.</li>
              <li>Reformatting data between two systems that expect different formats.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Instant, no size limit tied to an upload</li>
                  <li>Handles flat, tabular data cleanly in both directions</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Deeply nested JSON doesn't convert cleanly to CSV</li>
                  <li>Doesn't infer data types — everything converts as text by default</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where the two formats genuinely don't match</h2>
            <p className="mt-2">
              CSV is fundamentally flat — rows and columns, nothing more. JSON can represent real
              structure: an object nested inside another object, or an array of multiple values sitting
              within a single record. That kind of nested data simply doesn't have a clean equivalent in
              a flat spreadsheet. Converting deeply nested JSON to CSV usually means the structure has to
              be flattened or simplified somehow — this is an inherent limitation of what CSV can
              represent, not something any converter can fully solve. Simple, flat JSON (a list of
              records with plain key-value pairs) converts cleanly in both directions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Need to check the JSON output is well-formed? The site's{" "}
              <Link href="/tools/json-formatter" className="text-amber-400 underline underline-offset-2">
                JSON Formatter & Validator
              </Link>{" "}
              catches syntax issues instantly.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="csv-json-converter" />
        </>
      }
    >
      <CsvJsonConverterClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import CsvJsonConverterClient from "./CsvJsonConverterClient";

export const metadata = {
  title: "Free CSV to JSON & JSON to CSV Converter Online | QuickZeta",
  description:
    "Convert CSV to JSON or JSON to CSV instantly, free, with no upload and no sign up. Paste text or load a file — converted entirely in your browser.",
  keywords: [
    "free csv to json converter online",
    "json to csv converter no upload",
    "convert csv file to json free",
    "csv json converter no sign up",
    "csv to json online tool",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/csv-json-converter" },
  openGraph: {
    title: "Free CSV to JSON & JSON to CSV Converter Online",
    description: "Convert between CSV and JSON instantly, entirely in your browser.",
    url: "https://quickzeta.com/tools/csv-json-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this CSV/JSON converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much data you can convert.",
  },
  {
    q: "Do you upload my data to a server?",
    a: "No. The conversion happens directly inside your browser — nothing you paste or load is ever sent anywhere.",
  },
  {
    q: "Can I load a file instead of pasting text?",
    a: "Yes — click \"Load a file\" to select a .csv or .json file from your device, and its contents will fill the input box automatically.",
  },
  {
    q: "How does the converter handle commas inside a CSV field?",
    a: "Correctly — this tool follows standard CSV formatting rules, so a field containing a comma (wrapped in quotes, as proper CSV requires) won't be mistakenly split into extra columns.",
  },
  {
    q: "What happens if my JSON isn't a list of objects?",
    a: "If you paste in a single JSON object rather than an array, it's automatically treated as a one-row table when converting to CSV.",
  },
];

export default function CsvJsonConverterPage() {
  return (
    <ToolPageShell
      title="Free CSV ⇄ JSON Converter"
      subtitle="Convert CSV to JSON or JSON to CSV instantly — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Convert between CSV and JSON without uploading anything
            </h2>
            <p className="mt-2">
              Spreadsheet data and structured data formats don't always play nicely together — a
              spreadsheet export needs to become JSON for an API or a script, or a JSON response needs to
              become a CSV that opens cleanly in a spreadsheet program. This tool converts either
              direction instantly, directly inside your browser, with nothing ever uploaded to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Pick a direction.</strong> Choose CSV → JSON or JSON →
                CSV.
              </li>
              <li>
                <strong className="text-slate-200">Paste your data or load a file.</strong> The output
                updates instantly as you type or edit.
              </li>
              <li>
                <strong className="text-slate-200">Copy or download the result.</strong> Grab the
                converted data directly, or save it as a file.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Converting a spreadsheet export into JSON for use in a script or an API request.</li>
              <li>Turning a JSON API response into a CSV that opens cleanly in Excel or Google Sheets.</li>
              <li>Reformatting exported data before importing it into a different tool or database.</li>
              <li>Quickly inspecting the structure of a CSV file by seeing it laid out as JSON.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Handling CSV formatting correctly</h2>
            <p className="mt-2">
              A common source of broken conversions is a CSV field that itself contains a comma — for
              example, an address like "123 Main St, Suite 4." Properly formatted CSV wraps such fields
              in quotes to avoid ambiguity, and this tool respects that formatting correctly, so those
              fields don't get mistakenly split into extra columns.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays private</h2>
            <p className="mt-2">
              Nothing you paste or load into this converter is sent anywhere — everything happens
              directly in your browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick note on JSON structure</h2>
            <p className="mt-2">
              CSV is inherently flat — every value sits in a single row and column, with no nesting.
              JSON, on the other hand, can represent nested objects and arrays within a single record.
              When converting CSV to JSON, each row simply becomes an object with one property per
              column. When converting JSON back to CSV, any deeply nested structure would need to be
              flattened first — this tool works best with straightforward, flat JSON objects, which
              covers the large majority of everyday spreadsheet-style data, from contact lists to
              inventory records to survey results.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <CsvJsonConverterClient />
    </ToolPageShell>
  );
}

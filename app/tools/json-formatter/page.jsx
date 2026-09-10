import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import JsonFormatterClient from "./JsonFormatterClient";

export const metadata = {
  title: "Free JSON Formatter & Validator Online — No Sign Up | QuickZeta",
  description:
    "Format, validate, and minify JSON instantly, free, with no sign up. See exactly what's wrong with invalid JSON — computed entirely in your browser.",
  keywords: [
    "free json formatter online",
    "json validator no sign up",
    "json beautifier free",
    "minify json online",
    "json pretty print tool",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/json-formatter" },
  openGraph: {
    title: "Free JSON Formatter & Validator Online — No Sign Up",
    description: "Format, validate, and minify JSON instantly, computed entirely in your browser.",
    url: "https://quickzeta.com/tools/json-formatter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this JSON formatter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much JSON you can format or validate.",
  },
  {
    q: "Is my JSON data sent anywhere?",
    a: "No. Every operation uses the browser's own built-in JSON parser, running directly in your browser — nothing you paste is ever uploaded or logged.",
  },
  {
    q: "What's the difference between Beautify and Minify?",
    a: "Beautify adds indentation and line breaks for readability. Minify strips all unnecessary whitespace to produce the smallest possible file size — what you'd want before actually sending JSON over a network or shipping it in production.",
  },
  {
    q: "Why does my JSON say invalid when it looks fine to me?",
    a: "JSON's rules are stricter than they look. A trailing comma after the last item, single quotes instead of double quotes, an unquoted object key, or a missing closing brace are the most common causes — all things that are easy to miss scanning by eye but that a parser catches instantly.",
  },
];

export default function JsonFormatterPage() {
  return (
    <ToolPageShell
      title="Free JSON Formatter & Validator"
      subtitle="Format, validate, and minify JSON instantly — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A JSON formatter that never sees your data
            </h2>
            <p className="mt-2">
              JSON that arrives minified — one long unbroken line from an API response, a log file, or a
              config export — is genuinely hard to read or debug by eye. This tool reformats it instantly
              with proper indentation, or does the reverse and strips it down to the smallest possible
              size, using the browser's own built-in JSON parser. Since JSON frequently contains real
              data, never uploading it anywhere isn't a nice-to-have here, it's the point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Paste your JSON — valid or invalid, either way you'll see immediate feedback.</li>
              <li>Beautify or minify, picking indentation width if beautifying.</li>
              <li>Copy the result with one click.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common JSON errors, translated</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Trailing comma:</strong> a comma left after the last
                item in an object or array — valid in JavaScript, invalid in strict JSON. The single most
                common cause of "unexpected token" errors.
              </li>
              <li>
                <strong className="text-slate-200">Single quotes instead of double:</strong> JSON strings
                and keys must use double quotes; single quotes will fail to parse even though they look
                nearly identical.
              </li>
              <li>
                <strong className="text-slate-200">Unquoted keys:</strong> object keys need quotes around
                them — <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px]">{`{name: "value"}`}</code> is invalid;{" "}
                <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px]">{`{"name": "value"}`}</code> is correct.
              </li>
              <li>
                <strong className="text-slate-200">A missing closing brace or bracket:</strong> the error
                position reported is often further into the document than where the actual missing
                character is — worth checking backward from the reported line, not just at it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Uses the browser's own standards-compliant parser</li>
                  <li>Instant — no size limit that requires an upload</li>
                  <li>Safe for sensitive data, since nothing leaves your device</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Doesn't validate against a specific JSON Schema, only JSON syntax itself</li>
                  <li>Error messages reflect the browser's parser wording, not custom explanations</li>
                  <li>Extremely large JSON documents may feel sluggish in an in-browser textarea</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Converting between formats? The site's{" "}
              <Link href="/tools/csv-json-converter" className="text-amber-400 underline underline-offset-2">
                CSV ⇄ JSON Converter
              </Link>{" "}
              handles that directly, and{" "}
              <Link href="/tools/hash-generator" className="text-amber-400 underline underline-offset-2">
                Hash Generator
              </Link>{" "}
              is useful if you need a quick fingerprint of a specific JSON payload.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays private</h2>
            <p className="mt-2">
              See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="json-formatter" />
        </>
      }
    >
      <JsonFormatterClient />
    </ToolPageShell>
  );
}

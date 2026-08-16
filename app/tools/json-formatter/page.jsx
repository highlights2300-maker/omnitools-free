import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    q: "What does 'Beautify' actually do?",
    a: "It parses your JSON and re-outputs it with consistent indentation and line breaks, making nested objects and arrays easy to read at a glance — useful for JSON that arrived as one long unbroken line from an API response or log file.",
  },
  {
    q: "What's the difference between Beautify and Minify?",
    a: "Beautify adds indentation and line breaks for readability. Minify does the opposite — it strips all unnecessary whitespace to produce the smallest possible file size, which is what you'd typically want before actually sending JSON over a network or shipping it in production.",
  },
  {
    q: "How does the validator find errors?",
    a: "It uses the browser's own built-in JSON parser, the same one that powers JSON.parse() in JavaScript. If your JSON is invalid, the error message tells you specifically what the parser choked on — often a missing comma, an extra trailing comma, or an unquoted key.",
  },
  {
    q: "Is my JSON data sent anywhere?",
    a: "No. Every operation happens directly in your browser — nothing you paste is ever uploaded or logged, which matters if your JSON contains real data from an API response, config file, or database export.",
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
              size, all directly inside your browser. Since JSON frequently contains real data — API
              keys, user records, configuration — never uploading it anywhere isn't a nice-to-have here,
              it's the point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Paste your JSON.</strong> Valid or invalid — either
                way, you'll see immediate feedback.
              </li>
              <li>
                <strong className="text-slate-200">Beautify or minify.</strong> Pick indentation width, or
                strip it down to a single compact line.
              </li>
              <li>
                <strong className="text-slate-200">Copy the result.</strong> One click grabs the formatted
                or minified output.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Reading a validation error</h2>
            <p className="mt-2">
              When JSON is invalid, the error message points at specifically what the parser couldn't
              make sense of. The most common culprits: a trailing comma after the last item in an object
              or array (valid in JavaScript, invalid in strict JSON), an object key that isn't wrapped in
              double quotes, a stray single quote where JSON requires double quotes, or a missing closing
              brace or bracket somewhere earlier in the document than the error position might suggest.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">When to beautify, when to minify</h2>
            <p className="mt-2">
              Beautified JSON is for humans — debugging an API response, reviewing a config file, or
              understanding a data structure someone else wrote. Minified JSON is for machines — smaller
              payloads transfer faster over a network, and production code has no need for the extra
              whitespace that only exists to help a person read it. Most workflows use both at different
              points: beautified while developing and debugging, minified once it's actually being sent
              or stored.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays private</h2>
            <p className="mt-2">
              Nothing you paste into this tool is sent anywhere — every operation happens directly in
              your browser using the same JSON parser built into JavaScript itself. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <JsonFormatterClient />
    </ToolPageShell>
  );
}

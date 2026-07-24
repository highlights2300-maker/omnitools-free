import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import TextCaseConverterClient from "./TextCaseConverterClient";

export const metadata = {
  title: "Free Text Case Converter Online — UPPERCASE, camelCase & More | QuickZeta",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more, free, with no sign up. Instant conversion in your browser.",
  keywords: [
    "free text case converter online",
    "uppercase to lowercase converter",
    "camelcase converter online",
    "title case converter free",
    "snake case converter no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/text-case-converter" },
  openGraph: {
    title: "Free Text Case Converter Online — UPPERCASE, camelCase & More",
    description: "Convert text between common case formats instantly, in your browser.",
    url: "https://quickzeta.com/tools/text-case-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this text case converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much text you can convert.",
  },
  {
    q: "What's the difference between camelCase, PascalCase, snake_case, and kebab-case?",
    a: "These are all common ways to format multi-word names in code, differing only in capitalization and separator. camelCase starts lowercase (myVariableName), PascalCase starts uppercase (MyVariableName), snake_case uses underscores (my_variable_name), and kebab-case uses hyphens (my-variable-name). Different programming languages and style guides tend to favor different ones.",
  },
  {
    q: "Why does Title Case sometimes capitalize words it shouldn't?",
    a: "This tool capitalizes the first letter of every word, which is a simple, consistent rule. Strict style-guide title case (which keeps certain short words like \"a,\" \"the,\" or \"of\" lowercase unless they start the title) follows more nuanced rules that vary between style guides — this tool uses the simpler, more universally understood version.",
  },
  {
    q: "Is my text sent anywhere when I use this?",
    a: "No. Every conversion happens directly in your browser — nothing you type or paste is uploaded or stored.",
  },
  {
    q: "Can I convert a full paragraph, or just single words?",
    a: "Both work. UPPERCASE, lowercase, Title Case, and Sentence case are designed for full sentences and paragraphs. camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE are meant for shorter names or identifiers, and will strip punctuation and spacing to build a single joined name, which is standard behavior for this kind of conversion.",
  },
];

export default function TextCaseConverterPage() {
  return (
    <ToolPageShell
      title="Free Text Case Converter"
      subtitle="Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more — instantly, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Convert text case instantly, with no sign up
            </h2>
            <p className="mt-2">
              Whether you're fixing text that accidentally got typed in all caps, converting a heading
              into Title Case, or reformatting a variable name into a different coding convention, this
              tool handles the most common text case conversions instantly, directly in your browser —
              nothing you type is ever uploaded anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Paste or type your text.</strong> Any length works,
                from a single word to a full paragraph.
              </li>
              <li>
                <strong className="text-slate-200">Click a conversion.</strong> The text updates
                instantly in place.
              </li>
              <li>
                <strong className="text-slate-200">Copy the result.</strong> One click copies the
                converted text to your clipboard.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Every conversion available</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li><strong className="text-slate-200">UPPERCASE / lowercase</strong> — the two most basic conversions.</li>
              <li><strong className="text-slate-200">Title Case</strong> — capitalizes the first letter of every word.</li>
              <li><strong className="text-slate-200">Sentence case</strong> — capitalizes only the start of each sentence.</li>
              <li><strong className="text-slate-200">camelCase / PascalCase</strong> — common naming conventions in programming.</li>
              <li><strong className="text-slate-200">snake_case / kebab-case</strong> — underscore- and hyphen-separated naming, common in file names and code.</li>
              <li><strong className="text-slate-200">CONSTANT_CASE</strong> — all-uppercase with underscores, typically used for constants in code.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Fixing text that was accidentally typed with Caps Lock on, converting a heading or title
              into consistent Title Case, renaming a variable to match a different coding style guide, or
              cleaning up a list of names or file names into a consistent format are some of the most
              common reasons people reach for a case converter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your text stays private</h2>
            <p className="mt-2">
              Nothing you type or paste into this tool is sent anywhere — every conversion happens
              directly in your browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Which coding case convention to use</h2>
            <p className="mt-2">
              There's no single universal standard — it depends on the language and project you're
              working in. JavaScript and Java commonly use camelCase for variables and PascalCase for
              class names. Python typically favors snake_case. CSS class names and URL slugs commonly use
              kebab-case. When in doubt, matching whatever convention the rest of a codebase or project
              already uses is generally more important than picking a personal favorite.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <TextCaseConverterClient />
    </ToolPageShell>
  );
}

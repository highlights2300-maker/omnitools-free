import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
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
    q: "Is this converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much text you can convert.",
  },
  {
    q: "What's the difference between camelCase, PascalCase, snake_case, and kebab-case?",
    a: "All common ways to format multi-word names in code, differing in capitalization and separator: camelCase starts lowercase (myVariable), PascalCase starts uppercase (MyVariable), snake_case uses underscores (my_variable), kebab-case uses hyphens (my-variable).",
  },
  {
    q: "Is my text sent anywhere?",
    a: "No. Every conversion happens directly in your browser.",
  },
];

export default function TextCaseConverterPage() {
  return (
    <ToolPageShell
      title="Free Text Case Converter"
      subtitle="Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Nine case formats, one click each
            </h2>
            <p className="mt-2">
              Whether you're fixing text that got typed in all caps, converting a heading to Title Case,
              or reformatting a variable name for a different coding convention, this tool handles the
              common conversions instantly, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Paste or type your text, click a conversion, and the text updates instantly in place. Copy
              the result with one click.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Nine formats covered in one place</li>
                  <li>Instant, in-place conversion with one click</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Title Case uses a simple rule, not full style-guide-specific exceptions</li>
                  <li>Code-case conversions strip punctuation by design</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Fixing text that was accidentally typed with Caps Lock on, converting a heading into
              consistent Title Case, renaming a variable to match a different coding style guide, or
              cleaning up a list of names or file names into a consistent format are some of the most
              common reasons people reach for a case converter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Every conversion available</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li><strong className="text-slate-200">UPPERCASE / lowercase</strong> — the two most basic conversions.</li>
              <li><strong className="text-slate-200">Title Case</strong> — capitalizes the first letter of every word.</li>
              <li><strong className="text-slate-200">Sentence case</strong> — capitalizes only the start of each sentence.</li>
              <li><strong className="text-slate-200">camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE</strong> — common naming conventions in code.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Which coding case convention to actually use</h2>
            <p className="mt-2">
              There's no single universal standard — it depends on the language and project. JavaScript
              and Java commonly use camelCase for variables and PascalCase for class names. Python
              typically favors snake_case. CSS class names and URL slugs commonly use kebab-case. When in
              doubt, matching whatever convention a project already uses is more important than picking a
              personal favorite.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Comparing two versions of converted text? The site's{" "}
              <Link href="/tools/text-diff-checker" className="text-amber-400 underline underline-offset-2">
                Text Diff Checker
              </Link>{" "}
              shows exactly what changed.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="text-case-converter" />
        </>
      }
    >
      <TextCaseConverterClient />
    </ToolPageShell>
  );
}

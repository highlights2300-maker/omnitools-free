import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import TextDiffCheckerClient from "./TextDiffCheckerClient";

export const metadata = {
  title: "Free Text Diff Checker Online — Compare Two Texts | QuickZeta",
  description:
    "Paste two versions of a text and see added and removed lines, with changed words highlighted. Free, no sign up, runs in your browser.",
  keywords: [
    "free text diff checker online",
    "compare two texts no sign up",
    "text comparison tool free",
    "find differences between documents",
    "diff checker online no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/text-diff-checker" },
  openGraph: {
    title: "Free Text Diff Checker Online — Compare Two Texts",
    description: "Compare two blocks of text and see exactly what changed, instantly in your browser.",
    url: "https://quickzeta.com/tools/text-diff-checker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this text diff checker really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many comparisons you can run.",
  },
  {
    q: "Does it compare word-by-word or line-by-line?",
    a: "It compares line by line first. A line that changed shows as one removed line and one added line, and the words that differ inside those two lines are highlighted, so you can see the exact edit. Very long lines skip the word highlighting to keep the page fast.",
  },
  {
    q: "Can I compare code, not just prose?",
    a: "Yes — this works on any plain text, including code, configuration files, or structured data.",
  },
  {
    q: "Is my text sent anywhere?",
    a: "No. The comparison runs entirely in your browser — nothing you paste into either box is ever uploaded or logged.",
  },
];

export default function TextDiffCheckerPage() {
  return (
    <ToolPageShell
      title="Free Text Diff Checker"
      subtitle="Compare two blocks of text and see exactly what changed — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Spot exactly what changed, without reading line by line
            </h2>
            <p className="mt-2">
              Manually comparing two versions of a document by eye is slow and genuinely error-prone —
              it's easy to miss a small but important change buried in an otherwise identical paragraph.
              This tool does the comparison instantly, highlighting exactly which lines were added and
              which were removed, entirely inside your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Paste the original text into the left box.</li>
              <li>Paste the changed version into the right box.</li>
              <li>Read the result instantly. It updates as you type. Optionally ignore upper/lower case or extra spaces, show only the changed lines, or swap the two sides.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              How the comparison actually decides what changed
            </h2>
            <p className="mt-2">
              This tool finds the longest sequence of lines that appears, in the same order, in both
              versions of your text — this is a well-established computer science approach called the
              longest common subsequence. Everything outside that shared sequence gets marked as either
              added or removed. Concretely: if the original has lines A, B, C, D and the new version has
              A, B, X, D, the algorithm recognizes A, B, and D as the unchanged shared backbone, and
              correctly identifies just C as removed and X as added — rather than naively concluding
              everything after B changed. This same fundamental approach is what powers version control
              systems like Git when showing you what changed in a file.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Comparing two drafts of a contract to spot exactly what a revision changed.</li>
              <li>Checking two versions of an essay or article before submitting the final one.</li>
              <li>Reviewing a small code change without a full version control setup.</li>
              <li>Confirming a copy-paste or find-and-replace didn't alter more than intended.</li>
              <li>Checking whether two texts differ only by capital letters or extra spaces, using the ignore options.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Lines first, then words</h2>
            <p className="mt-2">
              Changes are found at the line level first, because that is how most people think about
              edits to a document: "this paragraph was rewritten". Inside a line that was changed, the
              words that differ are then highlighted, so a one-word edit is easy to spot without
              proofreading the whole line. If the pasted texts are very large and very different, the
              tool asks you to compare a smaller section instead of freezing your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Comparing formatted text? Run each version through the{" "}
              <Link href="/tools/text-case-converter" className="text-amber-400 underline underline-offset-2">
                Text Case Converter
              </Link>{" "}
              first if inconsistent casing is cluttering up the diff with false differences.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="text-diff-checker" />
        </>
      }
    >
      <TextDiffCheckerClient />
    </ToolPageShell>
  );
}

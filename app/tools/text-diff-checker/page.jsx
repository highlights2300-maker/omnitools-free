import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import TextDiffCheckerClient from "./TextDiffCheckerClient";

export const metadata = {
  title: "Free Text Diff Checker Online — Compare Two Texts | QuickZeta",
  description:
    "Compare two blocks of text and see exactly what changed, free, with no sign up. Added and removed lines highlighted instantly — computed entirely in your browser.",
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
    q: "How does the comparison work?",
    a: "It compares the two texts line by line, finding the longest sequence of lines that appear in both in the same order, and marking everything else as either added or removed. This is the same general approach version control tools like Git use to show what changed between two versions of a file.",
  },
  {
    q: "Does it compare word-by-word or line-by-line?",
    a: "Line-by-line. If a single word changes in an otherwise identical line, that whole line shows as one removed line and one added line, rather than highlighting just the changed word. This makes it easy to spot which lines changed at a glance, especially in longer documents.",
  },
  {
    q: "Can I compare code, not just prose?",
    a: "Yes — this works on any plain text, including code, configuration files, or structured data. Just paste the two versions in and the line-level differences show up the same way.",
  },
  {
    q: "Is my text sent anywhere?",
    a: "No. The comparison runs entirely in your browser — nothing you paste into either box is ever uploaded or logged, which matters if you're comparing something sensitive like a contract or private document.",
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
              Manually comparing two versions of a document, a contract, or a piece of code by eye is
              slow and genuinely error-prone — it's easy to miss a small but important change buried in
              an otherwise identical paragraph. This tool does the comparison instantly, highlighting
              exactly which lines were added and which were removed, entirely inside your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Paste the original text</strong> into the left box.
              </li>
              <li>
                <strong className="text-slate-200">Paste the changed version</strong> into the right box.
              </li>
              <li>
                <strong className="text-slate-200">Read the result instantly.</strong> Added lines are
                highlighted in green, removed lines in red with a strikethrough — no button to click,
                the comparison updates as you type.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How the comparison actually works</h2>
            <p className="mt-2">
              This tool finds the longest sequence of lines that appears, in the same order, in both
              versions of your text — everything outside that shared sequence gets marked as either
              added or removed. It's the same fundamental approach used by version control systems like
              Git to show a file's changes, applied here to any plain text rather than just source code.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Comparing two drafts of a contract to spot exactly what a revision changed.</li>
              <li>Checking two versions of an essay or article before submitting the final one.</li>
              <li>Reviewing a small code change without a full version control setup.</li>
              <li>Confirming that a copy-paste or find-and-replace didn't alter more than intended.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your text stays private</h2>
            <p className="mt-2">
              Nothing you paste into either box is sent anywhere — the comparison runs entirely in your
              browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why line-level, not word-level</h2>
            <p className="mt-2">
              Comparing at the line level rather than highlighting individual changed words is a
              deliberate choice, not a limitation — it mirrors how most people actually think about
              document changes. Seeing "this whole line was replaced" is usually more useful at a glance
              than a scattering of highlighted words mid-sentence, especially across a long document where
              you're scanning for which paragraphs changed rather than proofreading every word.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <TextDiffCheckerClient />
    </ToolPageShell>
  );
}

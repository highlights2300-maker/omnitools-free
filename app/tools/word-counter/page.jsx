import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import WordCounterClient from "./WordCounterClient";

export const metadata = {
  title: "Free Word Counter Online — Words, Characters & Reading Time | QuickZeta",
  description:
    "Count words, characters, sentences, and estimated reading time instantly, free, with no sign up. Computed entirely in your browser as you type.",
  keywords: [
    "free word counter online",
    "character count no sign up",
    "reading time calculator free",
    "word count tool online",
    "sentence counter free",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/word-counter" },
  openGraph: {
    title: "Free Word Counter Online — Words, Characters & Reading Time",
    description: "Count words, characters, and reading time instantly, in your browser.",
    url: "https://quickzeta.com/tools/word-counter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this word counter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much text you can count.",
  },
  {
    q: "How is reading time actually estimated?",
    a: "It's based on an average adult silent-reading speed, commonly cited as roughly 200–250 words per minute. It's a genuine estimate, not a precise measurement — dense technical text reads slower than casual prose, so treat it as a rough guide rather than an exact figure.",
  },
  {
    q: "Is my text sent anywhere?",
    a: "No. Everything is counted directly in your browser as you type — nothing is uploaded or logged.",
  },
  {
    q: "Does it count a hyphenated word as one word or two?",
    a: "As one — word counting splits on whitespace, so a hyphenated term like \"well-known\" counts as a single word, matching how most word processors count it too.",
  },
];

export default function WordCounterPage() {
  return (
    <ToolPageShell
      title="Free Word Counter"
      subtitle="Count words, characters, sentences, and reading time instantly — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A word count that updates as you actually type
            </h2>
            <p className="mt-2">
              Whether you're hitting a strict word limit for an assignment, checking a social post fits a
              character cap, or estimating how long a piece will take someone to read, this tool counts
              everything instantly as you type, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Paste or type your text into the box — word count, character count, sentence count, and
              estimated reading time all update live as you go.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Checking an essay or assignment meets a required word count.</li>
              <li>Fitting a social media post within a platform's character limit.</li>
              <li>Estimating how long a blog post or article will take to read.</li>
              <li>Tracking progress while drafting toward a target length.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Updates live as you type, no button to press</li>
                  <li>Tracks words, characters, sentences, and reading time together</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Reading time is an estimate, not a precise measurement</li>
                  <li>Doesn't distinguish languages that don't use spaces between words</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where the reading time estimate comes from</h2>
            <p className="mt-2">
              Reading time is calculated from an average adult silent-reading speed, typically cited
              somewhere around 200–250 words per minute. It's a genuine, widely used estimate rather than
              a precise measurement of any individual reader — dense, technical, or unfamiliar text tends
              to read noticeably slower than casual conversational writing, so treat the figure as a
              helpful ballpark rather than an exact number.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Need to compare two drafts? The site's{" "}
              <Link href="/tools/text-diff-checker" className="text-amber-400 underline underline-offset-2">
                Text Diff Checker
              </Link>{" "}
              shows exactly what changed between versions.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="word-counter" />
        </>
      }
    >
      <WordCounterClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import LoremIpsumGeneratorClient from "./LoremIpsumGeneratorClient";

export const metadata = {
  title: "Free Lorem Ipsum Generator Online — No Sign Up | QuickZeta",
  description:
    "Generate placeholder Lorem Ipsum text by paragraphs, sentences, or words, free, with no sign up. Copy instantly — generated entirely in your browser.",
  keywords: [
    "free lorem ipsum generator online",
    "placeholder text generator no sign up",
    "dummy text generator free",
    "lorem ipsum paragraphs online",
    "filler text generator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/lorem-ipsum-generator" },
  openGraph: {
    title: "Free Lorem Ipsum Generator Online — No Sign Up",
    description: "Generate placeholder Lorem Ipsum text instantly, in your browser.",
    url: "https://quickzeta.com/tools/lorem-ipsum-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this generator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much placeholder text you can generate.",
  },
  {
    q: "What is Lorem Ipsum, actually?",
    a: "Placeholder text derived from a scrambled passage of Latin, used in design and publishing since the 1500s to fill a layout with realistic-looking text before real content exists. It's deliberately not meaningful — the point is that it looks like typeset text without distracting a reader trying to actually read it.",
  },
  {
    q: "Can I generate a specific word count instead of paragraphs?",
    a: "Yes — switch the dropdown to Words and set the exact count, or choose Sentences for something in between.",
  },
];

export default function LoremIpsumGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Lorem Ipsum Generator"
      subtitle="Generate placeholder text by paragraphs, sentences, or words — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Placeholder text, generated instantly
            </h2>
            <p className="mt-2">
              Filling a design mockup or a CMS template with real content before it's ready usually means
              reaching for Lorem Ipsum. This tool generates it instantly by paragraph, sentence, or word
              count, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Choose a unit — paragraphs, sentences, or words — set the count, and copy the result.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Precise control over paragraphs, sentences, or word count</li>
                  <li>Randomized each time, so no two generations are identical</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Not genuinely readable Latin — it's deliberately scrambled</li>
                  <li>Doesn't simulate real content structure like headings or lists</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where it actually comes from</h2>
            <p className="mt-2">
              The text traces back to a passage from a work of Latin philosophy written in the 1st
              century BC, scrambled and altered over centuries of use in printing and typesetting to the
              point that it no longer forms coherent Latin sentences. It's stuck around precisely because
              it looks like real typeset language at a glance — evenly distributed letter frequencies and
              word lengths — without any actual meaning to distract a viewer evaluating a layout.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Filling a website or app mockup with realistic-looking body text before copy is finalized.</li>
              <li>Testing how a layout handles varying amounts of text, from one line to several paragraphs.</li>
              <li>Populating a CMS template during development, before real content exists.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why not just use real words instead?</h2>
            <p className="mt-2">
              It might seem simpler to fill a layout with plain English filler, but that tends to
              backfire — a reader's eye naturally gets pulled into trying to read and understand actual
              words, which distracts from evaluating the design itself. Lorem Ipsum's non-sensical
              structure looks convincingly like real typeset text at a glance while staying genuinely
              unreadable as content, keeping the focus on layout and typography rather than the words.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Need to count the words you've generated? The site's{" "}
              <Link href="/tools/word-counter" className="text-amber-400 underline underline-offset-2">
                Word Counter
              </Link>{" "}
              handles that instantly.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="lorem-ipsum-generator" />
        </>
      }
    >
      <LoremIpsumGeneratorClient />
    </ToolPageShell>
  );
}

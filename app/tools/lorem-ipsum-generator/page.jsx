import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    q: "Is this Lorem Ipsum generator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much placeholder text you can generate.",
  },
  {
    q: "What is Lorem Ipsum, actually?",
    a: "It's placeholder text derived from a scrambled passage of Latin text, used in design and publishing since the 1500s to fill a layout with realistic-looking text before real content is ready. It's deliberately not meaningful Latin — the point is that it looks like typeset text without a reader getting distracted trying to actually read it.",
  },
  {
    q: "Can I generate a specific number of words instead of paragraphs?",
    a: "Yes — switch the dropdown to \"Words\" and set the exact count you need, or choose \"Sentences\" for something in between a single word count and a full paragraph.",
  },
  {
    q: "Why does my output look different each time I click Regenerate?",
    a: "Beyond the classic opening line (if enabled), the rest of the text is randomly assembled from genuine Lorem Ipsum vocabulary each time, so no two generations are identical — useful if you need multiple distinct blocks of placeholder text for a layout.",
  },
  {
    q: "Is this sent anywhere or tracked?",
    a: "No. The text is generated entirely in your browser — there's nothing to send, since it's not based on any input of yours to begin with.",
  },
];

export default function LoremIpsumGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Lorem Ipsum Generator"
      subtitle="Generate placeholder text by paragraphs, sentences, or words — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Placeholder text, generated instantly
            </h2>
            <p className="mt-2">
              Filling a design mockup, a CMS template, or a print layout with real content before it's
              ready usually means reaching for Lorem Ipsum — familiar-looking placeholder text that fills
              space realistically without distracting anyone into actually reading it. This tool generates
              it instantly by paragraph, sentence, or word count, directly in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose a unit.</strong> Paragraphs, sentences, or
                words, depending on how much placeholder text you need.
              </li>
              <li>
                <strong className="text-slate-200">Set the count.</strong> The output updates instantly.
              </li>
              <li>
                <strong className="text-slate-200">Copy it.</strong> One click grabs the result for
                pasting into your design tool, CMS, or document.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where Lorem Ipsum actually comes from</h2>
            <p className="mt-2">
              The text traces back to a passage from a work of Latin philosophy written in the 1st century
              BC, scrambled and altered over centuries of use in printing and typesetting to the point
              that it no longer forms coherent Latin sentences. It's stuck around precisely because it
              looks like real typeset language at a glance — evenly distributed letter frequencies and
              word lengths — without any actual meaning to distract a viewer evaluating a layout.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Filling a website or app mockup with realistic-looking body text before copy is finalized.</li>
              <li>Testing how a layout handles varying amounts of text, from a single line to several paragraphs.</li>
              <li>Populating a CMS template during development, before real content exists.</li>
              <li>Print or publishing layout tests where the actual words don't matter yet.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing here is tracked</h2>
            <p className="mt-2">
              Since this tool generates text rather than processing anything you provide, there's nothing
              of yours to send anywhere in the first place. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data generally.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why not just use real words instead?</h2>
            <p className="mt-2">
              It might seem simpler to fill a layout with plain English filler text, but that tends to
              backfire — a reader's eye naturally gets pulled into trying to read and understand actual
              words, which distracts from evaluating the design itself. Lorem Ipsum's Latin-derived,
              non-sensical structure looks convincingly like real typeset text at a glance while staying
              genuinely unreadable as content, which keeps the focus on layout, spacing, and typography
              rather than the placeholder words themselves.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <LoremIpsumGeneratorClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import WordCounterClient from "./WordCounterClient";

export const metadata = {
  title: "Free Word Counter Online — Instant Count, No Sign Up | QuickZeta",
  description:
    "Count words, characters, sentences, and reading time instantly as you type or paste text — free, with no sign up and nothing saved anywhere.",
  keywords: [
    "free word counter online",
    "character counter no sign up",
    "reading time calculator",
    "word count tool for essays",
    "sentence counter online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/word-counter" },
  openGraph: {
    title: "Free Word Counter Online — Instant Count, No Sign Up",
    description: "Count words, characters, sentences, and reading time instantly as you type.",
    url: "https://quickzeta.com/tools/word-counter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this word counter really free, with no sign up?",
    a: "Yes. There's no account, no ad-gated results, and no limit on how much text you can check.",
  },
  {
    q: "Is my text saved or sent anywhere?",
    a: "No. Everything you type or paste is counted directly in your browser and never leaves your device — nothing is uploaded, logged, or stored, even temporarily.",
  },
  {
    q: "How is reading time calculated?",
    a: "It's estimated at 200 words per minute, a commonly used average adult silent-reading speed. Your actual reading time will vary depending on the complexity of the text and your own reading speed.",
  },
  {
    q: "Why does the sentence count sometimes look off?",
    a: "Sentences are detected by looking for periods, question marks, and exclamation points followed by a space or the end of the text. Abbreviations (like \"e.g.\" or \"Dr.\") can occasionally throw the count off by one or two — a limitation of any automated sentence counter, not just this one.",
  },
  {
    q: "What's a typical word count target for common writing tasks?",
    a: "It varies a lot by purpose, but as rough starting points: a tweet-length social post is under 50 words, a short blog post is often 300–600 words, a college essay is commonly 500–1,000 words, and a standard cover letter is usually 250–400 words.",
  },
];

export default function WordCounterPage() {
  return (
    <ToolPageShell
      title="Free Word Counter"
      subtitle="Count words, characters, sentences, and reading time instantly — no sign up, nothing saved."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              An instant word counter with no sign up
            </h2>
            <p className="mt-2">
              Whether you're checking an essay against a word limit, trimming a cover letter down to
              size, or just curious how long a piece of writing will take to read, this tool gives you an
              instant count with no account, no ads blocking the result, and no text ever leaving your
              browser. Paste in anything — an email draft, an article, a school assignment — and every
              number updates as you type.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What gets counted</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">Words</strong> — the total word count, split on
                whitespace.
              </li>
              <li>
                <strong className="text-slate-200">Characters</strong> — every character, including
                spaces and punctuation.
              </li>
              <li>
                <strong className="text-slate-200">Characters, no spaces</strong> — useful for platforms
                with a strict character limit that don't count spaces.
              </li>
              <li>
                <strong className="text-slate-200">Sentences</strong> — detected by punctuation marking
                the end of a sentence.
              </li>
              <li>
                <strong className="text-slate-200">Paragraphs</strong> — counted by blank lines
                separating blocks of text.
              </li>
              <li>
                <strong className="text-slate-200">Estimated reading time</strong> — based on an average
                adult reading speed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Students checking an essay against a required word count, writers trimming a piece down to
              a publication's limit, job seekers keeping a cover letter concise, and social media users
              making sure a post fits a platform's character limit are some of the most common reasons
              people reach for a word counter. Because everything runs instantly and locally, it's just
              as fast to check a single sentence as it is a full document.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your text stays private</h2>
            <p className="mt-2">
              Nothing you type or paste into this tool is uploaded, saved, or sent anywhere — the count
              happens entirely inside your browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why word counts can differ slightly between tools</h2>
            <p className="mt-2">
              If you've ever pasted the same text into two different word counters and gotten two
              slightly different numbers, that's normal — there's no single universal rule for what
              counts as a "word." Some tools treat a hyphenated phrase like "well-known" as one word,
              others count it as two. Numbers, standalone punctuation, and email addresses can also be
              handled differently depending on how a tool splits text apart. This counter uses a
              straightforward whitespace-based split, which matches how most word processors and writing
              platforms count words in practice.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <WordCounterClient />
    </ToolPageShell>
  );
}

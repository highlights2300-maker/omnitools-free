import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import TypingSpeedTestClient from "./TypingSpeedTestClient";

export const metadata = {
  title: "Free Typing Speed Test Online — WPM & Accuracy, No Sign Up | QuickZeta",
  description:
    "Test your typing speed in words per minute, free, with no sign up. Live accuracy tracking and instant results — computed entirely in your browser.",
  keywords: [
    "free typing speed test online",
    "wpm test no sign up",
    "typing test online free",
    "words per minute test",
    "typing accuracy test",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/typing-speed-test" },
  openGraph: {
    title: "Free Typing Speed Test Online — WPM & Accuracy, No Sign Up",
    description: "Test your typing speed and accuracy instantly, computed entirely in your browser.",
    url: "https://quickzeta.com/tools/typing-speed-test",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this typing test really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many times you can test yourself.",
  },
  {
    q: "How is WPM actually calculated?",
    a: "Correctly-typed characters divided by 5 (the standard stand-in for average word length), divided again by time elapsed in minutes. This is the same method most typing tests use, which is why results are generally comparable across different sites.",
  },
  {
    q: "What's a good typing speed?",
    a: "Average for most adults is roughly 35–45 WPM. Professional typists and fast touch-typists often reach 65–85 WPM, and competitive typists can exceed 100 WPM.",
  },
  {
    q: "Why does accuracy matter as much as speed?",
    a: "A high WPM with a lot of mistakes usually means more time spent correcting errors, which can end up slower overall than typing a bit more carefully. Most typing guides recommend building accuracy first, then speed on top of it.",
  },
];

export default function TypingSpeedTestPage() {
  return (
    <ToolPageShell
      title="Free Typing Speed Test"
      subtitle="Test your typing speed in words per minute, with live accuracy tracking — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              An instant typing test with no leaderboard sign-up
            </h2>
            <p className="mt-2">
              Whether you're curious how your typing speed compares, practicing for a job that requires
              fast typing, or just warming up before a long writing session, this test gives an instant
              words-per-minute and accuracy score with no account required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Start typing — the timer begins automatically on your first character, with live green/red
              feedback as you go, and your final WPM and accuracy appear the instant you finish.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How WPM is calculated</h2>
            <p className="mt-2">
              Words per minute is calculated the standard way most typing tests do it: correctly-typed
              characters divided by 5, divided again by time elapsed in minutes. This gives a consistent,
              comparable score regardless of how long or short the actual words in a passage happen to be.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Accuracy first, speed second</h2>
            <p className="mt-2">
              It's tempting to chase a higher WPM number, but typing quickly with a lot of mistakes often
              costs more time overall once you factor in going back to correct errors. Most touch-typing
              guides recommend building accuracy at a comfortable pace first, then gradually increasing
              speed while keeping that same accuracy, rather than typing as fast as possible from the
              start and accepting a high error rate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Typing speed benchmarks</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li><strong className="text-slate-200">Under 30 WPM</strong> — still building basic touch-typing fluency.</li>
              <li><strong className="text-slate-200">35–45 WPM</strong> — roughly average for everyday adult typing.</li>
              <li><strong className="text-slate-200">50–70 WPM</strong> — comfortably fast, common among people who type professionally.</li>
              <li><strong className="text-slate-200">80+ WPM</strong> — genuinely fast, approaching competitive speeds.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Timing yourself for something other than typing? The site's{" "}
              <Link href="/tools/countdown-timer-stopwatch" className="text-amber-400 underline underline-offset-2">
                Timer & Stopwatch
              </Link>{" "}
              works for general-purpose timing.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="typing-speed-test" />
        </>
      }
    >
      <TypingSpeedTestClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    a: "Yes. There's no account, no leaderboard requiring a login, and no limit on how many times you can test yourself.",
  },
  {
    q: "How is WPM calculated?",
    a: "The standard formula: correctly-typed characters divided by 5 (the average word length used in typing tests), divided by the time elapsed in minutes. This is the same method most typing tests use, which is why results are generally comparable across different sites.",
  },
  {
    q: "What's a good typing speed?",
    a: "Average typing speed for most adults is roughly 35–45 WPM. Professional typists and fast touch-typists often reach 65–85 WPM, and competitive typists can exceed 100 WPM. Accuracy matters just as much as raw speed — a fast but error-prone typist often isn't actually more productive.",
  },
  {
    q: "Why does accuracy matter as much as speed?",
    a: "A high WPM number with a lot of mistakes usually means more time spent going back to fix errors, which can end up slower overall than typing a bit more carefully in the first place. Most typing improvement advice recommends prioritizing accuracy first, then building speed on top of it.",
  },
  {
    q: "Is my typed text sent anywhere?",
    a: "No. Everything — the passage, your keystrokes, and your results — stays entirely in your browser and is never uploaded or logged.",
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
              An instant typing speed test with no sign up
            </h2>
            <p className="mt-2">
              Whether you're curious how your typing speed stacks up, practicing for a job that requires
              fast, accurate typing, or just want a quick way to warm up before a long writing session,
              this test gives an instant words-per-minute and accuracy score with no account and no
              leaderboard to sign up for. Everything is calculated locally as you type.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Start typing.</strong> The timer begins automatically
                the moment you type your first character.
              </li>
              <li>
                <strong className="text-slate-200">Watch the live feedback.</strong> Correct characters
                turn green, mistakes turn red and underlined, right as you type.
              </li>
              <li>
                <strong className="text-slate-200">Finish the passage.</strong> Your words-per-minute and
                accuracy score appear the instant you complete it.
              </li>
              <li>
                <strong className="text-slate-200">Try again.</strong> Click for a new random passage and
                go again.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How WPM is calculated</h2>
            <p className="mt-2">
              Words per minute is calculated using the standard method most typing tests use: the number
              of correctly typed characters is divided by 5 (a widely used stand-in for "average word
              length"), then divided again by the time elapsed in minutes. This gives a consistent,
              comparable score regardless of how long or short the actual words in a given passage happen
              to be.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Typing speed benchmarks</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">Under 30 WPM</strong> — still building basic
                touch-typing fluency.
              </li>
              <li>
                <strong className="text-slate-200">35–45 WPM</strong> — roughly average for adults doing
                everyday typing.
              </li>
              <li>
                <strong className="text-slate-200">50–70 WPM</strong> — comfortably fast, common among
                people who type for a living.
              </li>
              <li>
                <strong className="text-slate-200">80+ WPM</strong> — genuinely fast, approaching
                competitive typing speeds.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Accuracy first, speed second</h2>
            <p className="mt-2">
              It's tempting to chase a higher WPM number, but typing quickly with a lot of mistakes often
              costs more time overall once you factor in going back to correct errors. Most touch-typing
              guides recommend building accuracy at a comfortable pace first, then gradually increasing
              speed while keeping that same accuracy — rather than typing as fast as possible from the
              start and accepting a high error rate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing you type is stored</h2>
            <p className="mt-2">
              This test runs entirely in your browser — the passage, your keystrokes, and your results
              are never sent anywhere. See our{" "}
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
      <TypingSpeedTestClient />
    </ToolPageShell>
  );
}

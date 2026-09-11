import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import CountdownTimerStopwatchClient from "./CountdownTimerStopwatchClient";

export const metadata = {
  title: "Free Online Timer & Stopwatch — No Sign Up, No App | QuickZeta",
  description:
    "A free countdown timer and stopwatch with lap tracking and a sound alert, free, with no sign up and no app to install. Runs entirely in your browser.",
  keywords: [
    "free online timer no sign up",
    "countdown timer online free",
    "online stopwatch with laps",
    "5 minute timer online",
    "pomodoro timer no app",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/countdown-timer-stopwatch" },
  openGraph: {
    title: "Free Online Timer & Stopwatch — No Sign Up, No App",
    description: "A countdown timer and stopwatch with lap tracking and a sound alert, in your browser.",
    url: "https://quickzeta.com/tools/countdown-timer-stopwatch",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this timer really free, with no sign up?",
    a: "Yes. There's no account, no app to install, and no limit on how many times you can use it.",
  },
  {
    q: "Will the alert sound work if I switch tabs?",
    a: "Yes, as long as the tab stays open in the background — most browsers continue running the timer and audio even when a tab isn't actively focused.",
  },
  {
    q: "Does the stopwatch support lap times?",
    a: "Yes — tap \"Lap\" while it's running to record a split time without stopping the clock.",
  },
];

export default function CountdownTimerStopwatchPage() {
  return (
    <ToolPageShell
      title="Free Online Timer & Stopwatch"
      subtitle="A countdown timer with a sound alert, and a stopwatch with lap tracking — no sign up, no app."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A timer and stopwatch with no app to install
            </h2>
            <p className="mt-2">
              Whether you need a countdown for cooking, a workout interval, or a focused work session, or
              just want to time how long something takes, this tool covers both a countdown timer and a
              stopwatch in one place, with no account and no ads.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Switch between the Timer and Stopwatch tabs. For the timer, set a duration or tap a preset
              and start it — a sound plays and the display changes color when it hits zero. For the
              stopwatch, start, pause, resume, and tap "Lap" to record split times along the way.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Timer versus stopwatch — which to use</h2>
            <p className="mt-2">
              Use the timer when you know the exact duration in advance and want to be alerted when it's
              up — cooking, a work sprint, a rest period. Use the stopwatch when you're timing something
              of unknown length and want to track how long it actually took, optionally recording laps
              along the way.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Works entirely in the browser tab, no app needed</li>
                  <li>Lap tracking on the stopwatch without stopping the clock</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Alert sound requires the tab to stay open</li>
                  <li>No multiple simultaneous timers</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Timing a Pomodoro-style focused work session.</li>
              <li>Setting a quick countdown for cooking or baking.</li>
              <li>Timing workout intervals or rest periods between sets.</li>
              <li>Tracking lap times during practice runs with the stopwatch.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on the Pomodoro Technique</h2>
            <p className="mt-2">
              The 25-minute preset exists specifically for the Pomodoro Technique, a popular time
              management method built around short, focused work intervals followed by a brief break —
              typically 25 minutes of focused work, a 5-minute break, and a longer break after four
              cycles. It works well because it turns a large, vague task into a series of short,
              manageable sprints rather than one long, unbroken stretch of effort.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Timing your typing specifically? The site's{" "}
              <Link href="/tools/typing-speed-test" className="text-amber-400 underline underline-offset-2">
                Typing Speed Test
              </Link>{" "}
              has its own built-in timer for that.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="countdown-timer-stopwatch" />
        </>
      }
    >
      <CountdownTimerStopwatchClient />
    </ToolPageShell>
  );
}

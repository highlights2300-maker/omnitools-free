import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    q: "Will the alert sound work even if I switch to another browser tab?",
    a: "The sound plays as long as the browser tab stays open in the background — most browsers continue running the timer and audio even when a tab isn't actively focused. Closing the tab entirely will stop it, the same as any browser-based timer.",
  },
  {
    q: "Can I use quick presets instead of typing a time?",
    a: "Yes — the timer includes one-tap presets for 1, 5, 10, 15, and 25 minutes (the last one being a common length for Pomodoro-style focus sessions), or you can type any custom duration.",
  },
  {
    q: "Does the stopwatch support lap times?",
    a: "Yes — while the stopwatch is running, tap \"Lap\" to record a split time without stopping the clock. Laps are listed with the most recent one at the top.",
  },
  {
    q: "Is my timer or stopwatch data saved anywhere?",
    a: "No. Nothing about how you use this tool is saved, logged, or sent anywhere — closing or refreshing the page simply resets it.",
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
              Whether you need a quick countdown for cooking, a workout interval, a focused work session,
              or just want to time how long something takes, this tool covers both a countdown timer and
              a stopwatch in one place — no app store download, no account, and no ads interrupting a
              simple timer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How the timer works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Set a duration.</strong> Type minutes and seconds, or
                tap a quick preset.
              </li>
              <li>
                <strong className="text-slate-200">Start it.</strong> The countdown runs down to zero.
              </li>
              <li>
                <strong className="text-slate-200">Get alerted.</strong> A sound plays and the display
                changes color once time is up.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How the stopwatch works</h2>
            <p className="mt-2">
              Switch to the Stopwatch tab to count up instead of down. Start, pause, and resume as needed,
              and tap "Lap" at any point while it's running to record a split time without interrupting
              the count — useful for timing multiple stages of an activity, like intervals in a workout or
              legs of a task.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Timing a Pomodoro-style focused work session (25 minutes is a common default).</li>
              <li>Setting a quick countdown for cooking or baking.</li>
              <li>Timing workout intervals or rest periods between sets.</li>
              <li>Tracking lap times during practice runs or timed drills with the stopwatch.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing about your session is saved</h2>
            <p className="mt-2">
              This tool doesn't track or store anything about how you use it — everything resets the
              moment you refresh or close the page, and no usage history is kept anywhere. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick note on the Pomodoro Technique</h2>
            <p className="mt-2">
              The 25-minute preset exists specifically for the Pomodoro Technique, a popular time
              management method built around short, focused work intervals followed by a brief break.
              The typical pattern is 25 minutes of focused work, a 5-minute break, and after four such
              cycles, a longer break of 15–30 minutes. The method works well because it turns a large,
              vague task into a series of short, manageable sprints rather than one long, unbroken stretch
              of effort.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <CountdownTimerStopwatchClient />
    </ToolPageShell>
  );
}

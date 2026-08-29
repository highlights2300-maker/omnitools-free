import { Sparkles } from "lucide-react";
import CategoryHubShell from "../components/CategoryHubShell";

export const metadata = {
  title: "Free Everyday Utilities — Password Generator, Screen Recorder & More | QuickZeta",
  description:
    "Generate passwords, hashes, and placeholder text, test typing speed, record your screen, and more — all free, with no sign up. Every tool runs entirely in your browser.",
  keywords: [
    "free everyday tools online",
    "password generator screen recorder free",
    "typing test json formatter no sign up",
    "utility tools no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/everyday-tools" },
  openGraph: {
    title: "Free Everyday Utilities — Password Generator, Screen Recorder & More",
    description: "Handy everyday utilities, computed and run entirely in your browser.",
    url: "https://quickzeta.com/everyday-tools",
    type: "website",
  },
};

const TOOLS = [
  { name: "Password Generator", desc: "Create a strong, random password instantly.", href: "/tools/password-generator" },
  { name: "Typing Speed Test", desc: "Measure your typing speed in WPM.", href: "/tools/typing-speed-test" },
  { name: "Timer & Stopwatch", desc: "A countdown timer plus a lap-tracking stopwatch.", href: "/tools/countdown-timer-stopwatch" },
  { name: "Text Case Converter", desc: "Convert text to UPPERCASE, camelCase & more.", href: "/tools/text-case-converter" },
  { name: "Color Picker & Converter", desc: "Pick a color, convert HEX, RGB, HSL.", href: "/tools/color-picker-converter" },
  { name: "JSON Formatter & Validator", desc: "Beautify, minify, and validate JSON.", href: "/tools/json-formatter" },
  { name: "Text Diff Checker", desc: "Compare two texts and see what changed.", href: "/tools/text-diff-checker" },
  { name: "Text to Speech", desc: "Convert text to spoken audio.", href: "/tools/text-to-speech" },
  { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256 & SHA-512 hashes.", href: "/tools/hash-generator" },
  { name: "Lorem Ipsum Generator", desc: "Generate placeholder text instantly.", href: "/tools/lorem-ipsum-generator" },
  { name: "Screen Recorder", desc: "Record your screen, a window, or a tab.", href: "/tools/screen-recorder" },
];

export default function EverydayToolsPage() {
  return (
    <CategoryHubShell
      title="Everyday Tools"
      subtitle="Handy utilities you'll come back to, again and again — no sign up, nothing uploaded."
      icon={Sparkles}
      accentClass="bg-amber-400/10 text-amber-400"
      tools={TOOLS}
    >
      <h2 className="text-lg font-semibold text-slate-100">
        The small utilities that quietly get used the most
      </h2>
      <p>
        Not every tool needs to be complicated to be genuinely useful. Everyday Tools is a collection of
        eleven small, focused utilities — a password generator, a typing test, a screen recorder, a hash
        calculator, and more — the kind of thing you might search for once, bookmark, and end up using
        weekly without really thinking about it. Each one does a single job well, instantly, with
        nothing to configure first and no learning curve to get in the way.
      </p>
      <p>
        Several of these lean on capabilities already built directly into your browser rather than
        anything QuickZeta invented itself: text-to-speech uses your browser's own speech synthesis
        engine, password generation uses the Web Crypto API's cryptographically secure randomness (not
        the weaker randomness many simpler generators rely on), and screen recording uses the same
        native screen-capture and recording features modern browsers already ship with. The result is
        that these tools tend to be both genuinely fast and genuinely private — there's no server
        involved in generating a password, hashing a string, or recording your screen, so there's
        nothing of yours to intercept along the way.
      </p>
      <p>
        A few, like the JSON Formatter and Hash Generator, lean toward developers; others, like the
        Timer & Stopwatch and Lorem Ipsum Generator, are useful to almost anyone regardless of technical
        background. What ties all eleven together is the same principle running through every tool on
        this site: no account needed, no daily limit, and no data of yours ever leaving your own device
        to get the job done, whether that job takes ten seconds or ten minutes.
      </p>
      <p>
        Each tool below has its own dedicated page with full details on how it works — click through to
        get started, and don't expect a learning curve; every one of these is built to be understood and
        used within seconds of the page loading.
      </p>
    </CategoryHubShell>
  );
}

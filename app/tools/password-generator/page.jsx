import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata = {
  title: "Free Password Generator Online — Strong & Secure, No Sign Up | QuickZeta",
  description:
    "Generate a strong, random password instantly, free, with no sign up. Adjust length and character types, with a real strength indicator — computed entirely in your browser.",
  keywords: [
    "free password generator online",
    "strong password generator no sign up",
    "random password generator secure",
    "generate secure password free",
    "password generator with symbols",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/password-generator" },
  openGraph: {
    title: "Free Password Generator Online — Strong & Secure, No Sign Up",
    description: "Generate a strong, random password instantly, computed entirely in your browser.",
    url: "https://quickzeta.com/tools/password-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this password generator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many passwords you can generate.",
  },
  {
    q: "Is it actually safe to generate a password on a website?",
    a: "It depends entirely on how the site does it. This tool generates every password using the Web Crypto API — the browser's own cryptographically secure random number source, the same one used for security-sensitive operations elsewhere in the browser. Nothing is transmitted, logged, or stored, including by us.",
  },
  {
    q: "What's the actual difference between this and Math.random()?",
    a: "Math.random(), which many simpler password generators use, is designed for speed and general-purpose randomness — not security. It's mathematically predictable given enough output, which makes it a poor fit for something like a password. The Web Crypto API this tool uses is specifically designed to be unpredictable, the same standard used for encryption keys.",
  },
  {
    q: "How long should my password actually be?",
    a: "Longer matters more than most people expect — more than adding a few extra symbol characters to a short password. A random 16-character password is dramatically harder to guess or crack than an 8-character one, even if the shorter one looks more \"complicated\" with symbols mixed in.",
  },
  {
    q: "What does the strength indicator actually measure?",
    a: "It estimates entropy — roughly, how many possible combinations an attacker would need to try — based on your password's length and which character types are included. It's a reasonable guide, not a guarantee against every possible attack method.",
  },
  {
    q: "Should I reuse a strong password across different accounts?",
    a: "No — even a genuinely strong password should be unique per account. If one service is ever breached, a reused password lets an attacker try it elsewhere too. A password manager is the standard way to track many unique passwords without memorizing them all.",
  },
];

export default function PasswordGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Password Generator"
      subtitle="Generate a strong, random password instantly, with adjustable length and character types — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A password generator that actually uses cryptographic randomness
            </h2>
            <p className="mt-2">
              A lot of simple password generators quietly use JavaScript's basic <code className="rounded bg-slate-800 px-1 py-0.5 text-xs">Math.random()</code> function
              — fine for a casual dice roll, genuinely unsuitable for something meant to be unpredictable
              enough to resist a determined guess. This tool uses the Web Crypto API instead, the same
              cryptographically secure randomness source browsers rely on for encryption itself, and
              generates every password directly in your browser with nothing ever transmitted anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Set the length — longer is generally stronger.</li>
              <li>Choose which character types to include: lowercase, uppercase, numbers, symbols.</li>
              <li>Copy it, or generate a fresh one instantly with the same settings.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why length beats complexity</h2>
            <p className="mt-2">
              It's a common misconception that a short password stuffed with symbols is safer than a
              longer, simpler one. In practice, each additional character multiplies the number of
              possible combinations an attacker would need to try — length increases that search space far
              more dramatically than a few extra symbols do. A random 16-character password is, in almost
              every practical sense, much harder to crack than an 8-character one, even when the shorter
              one looks more "complicated" at a glance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Uses genuine cryptographic randomness, not a basic RNG</li>
                  <li>Nothing generated is ever transmitted or logged</li>
                  <li>Full control over length and character types</li>
                  <li>No account, no limit on how many you generate</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Doesn't store or manage passwords for you — that's a password manager's job</li>
                  <li>Can't guarantee a specific site's exact password rules are met</li>
                  <li>A strong password alone doesn't protect against phishing or reuse</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">One strong password isn't enough on its own</h2>
            <p className="mt-2">
              Generating a great password here solves one part of the problem — the harder part is having
              a genuinely different one for every account, since a breach at one service shouldn't put
              your other accounts at risk too. Most people solve this with a password manager, which
              securely stores generated passwords behind one master password you actually remember. This
              tool is meant for creating the individual passwords a manager would then store — not for
              remembering them yourself.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing generated is ever stored</h2>
            <p className="mt-2">
              Because everything happens locally, this tool has no record of any password it's ever
              generated. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="password-generator" />
        </>
      }
    >
      <PasswordGeneratorClient />
    </ToolPageShell>
  );
}

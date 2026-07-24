import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    q: "Is it safe to generate a password this way, or does it get sent anywhere?",
    a: "Every password is generated entirely inside your browser using the Web Crypto API — the same cryptographically secure random number source browsers use for security-sensitive operations. Nothing is transmitted, logged, or stored anywhere, including by us.",
  },
  {
    q: "How long should my password be?",
    a: "Longer is generally better than more complex. A random 16-character password with a mix of character types is far harder to guess or crack than a short, complex-looking one — length matters more than most people expect.",
  },
  {
    q: "What does the strength indicator actually measure?",
    a: "It estimates entropy — roughly, how many possible combinations an attacker would need to try — based on your password's length and which character types you've included. It's a reasonable guide, not a guarantee against every possible attack.",
  },
  {
    q: "Why would I want to exclude look-alike characters?",
    a: "Characters like lowercase L, uppercase I, the number 1, and the letter O versus the number 0 can be easy to misread, especially when typing a password from a printed copy or reading it aloud. Excluding them trades a small amount of randomness for fewer transcription mistakes.",
  },
  {
    q: "Should I reuse a strong password across multiple accounts?",
    a: "No — even a very strong password should be unique per account. If one service is ever breached, a reused password lets an attacker try it elsewhere too. A password manager is the standard way to keep track of many unique passwords without needing to memorize them all.",
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
              A password generator that never sees your password
            </h2>
            <p className="mt-2">
              Generating a password on a website inherently involves a bit of trust — you're hoping
              whatever you're shown isn't quietly logged somewhere. This tool removes that question
              entirely: every password is generated using your browser's own cryptographically secure
              random number generator, directly on your device. Nothing is ever sent to a server, because
              there's no server involved in the generation at all.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Set the length.</strong> Drag the slider — longer is
                generally stronger.
              </li>
              <li>
                <strong className="text-slate-200">Choose character types.</strong> Include lowercase,
                uppercase, numbers, and symbols as needed.
              </li>
              <li>
                <strong className="text-slate-200">Copy or regenerate.</strong> A new password is
                generated instantly as you adjust any option, or click "Generate" for a fresh one with
                the same settings.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why length matters more than complexity</h2>
            <p className="mt-2">
              It's a common misconception that a short password packed with symbols is safer than a
              longer, simpler one. In practice, length increases the number of possible combinations an
              attacker would need to try far more dramatically than adding a few extra symbol characters
              does. A random 16-character password is, in almost every practical sense, much harder to
              crack than an 8-character one, even if the shorter one looks more "complicated" at a glance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Keeping track of unique passwords</h2>
            <p className="mt-2">
              Generating one strong password is easy — the harder part is having a different one for
              every account, which is genuinely important, since a breach at one service shouldn't put
              your other accounts at risk too. Most people solve this with a password manager, which
              securely stores generated passwords so you only need to remember one master password
              yourself. This tool is a good fit for creating the individual passwords a manager would then
              store for you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your generated passwords are never stored</h2>
            <p className="mt-2">
              Because everything happens locally, this tool has no record of any password it's ever
              generated — including yours. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <PasswordGeneratorClient />
    </ToolPageShell>
  );
}

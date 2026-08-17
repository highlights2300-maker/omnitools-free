import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import HashGeneratorClient from "./HashGeneratorClient";

export const metadata = {
  title: "Free Hash Generator Online — MD5, SHA-1, SHA-256, SHA-512 | QuickZeta",
  description:
    "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly, free, with no sign up. Computed entirely in your browser using the same engine that powers browser security.",
  keywords: [
    "free hash generator online",
    "md5 generator no sign up",
    "sha256 online free",
    "hash calculator no upload",
    "checksum generator online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/hash-generator" },
  openGraph: {
    title: "Free Hash Generator Online — MD5, SHA-1, SHA-256, SHA-512",
    description: "Generate common hash types instantly, computed entirely in your browser.",
    url: "https://quickzeta.com/tools/hash-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this hash generator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many hashes you can generate.",
  },
  {
    q: "Which hash types are supported?",
    a: "MD5, SHA-1, SHA-256, and SHA-512. The SHA family is computed using the browser's own built-in Web Crypto API — the same trusted implementation browsers use for security-sensitive operations — while MD5 is computed with a standard implementation, since browsers don't provide MD5 natively.",
  },
  {
    q: "Is my text sent anywhere to generate the hash?",
    a: "No. Every hash is computed directly in your browser — nothing you type is ever uploaded or logged.",
  },
  {
    q: "Which hash type should I use?",
    a: "For anything security-related — passwords, digital signatures, verifying data integrity where trust matters — use SHA-256 or SHA-512. MD5 and SHA-1 are both considered cryptographically broken for security purposes (they're vulnerable to deliberate collisions) and are included here mainly for compatibility with older systems, checksums, or non-security use cases like quickly checking whether two files are identical.",
  },
  {
    q: "Why does the same input always produce the same hash?",
    a: "That's the defining property of a hash function — it's deterministic, so identical input always produces identical output. This is exactly what makes hashes useful for verifying that a file or piece of text hasn't been altered: if you hash it again later and get a different result, something changed.",
  },
];

export default function HashGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Hash Generator"
      subtitle="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Generate hashes without sending your data anywhere
            </h2>
            <p className="mt-2">
              A hash function takes any input — a password, a file's contents, a piece of text — and
              produces a fixed-length string that acts as a kind of fingerprint for that exact data. This
              tool computes four of the most common hash types directly inside your browser, using the
              same cryptographic engine browsers rely on for their own security features, so nothing you
              type is ever transmitted anywhere to generate the result.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <p className="mt-2">
              Type or paste any text into the box, and all four hash types — MD5, SHA-1, SHA-256, and
              SHA-512 — update instantly below it. Click the copy icon next to any result to grab that
              specific hash.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing the right hash type</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">SHA-256 / SHA-512</strong> — the right choice for
                anything security-sensitive. Both remain cryptographically strong and are widely used in
                modern systems, digital signatures, and blockchain applications.
              </li>
              <li>
                <strong className="text-slate-200">MD5</strong> — fast and still common for basic file
                checksums and non-security identity checks, but not appropriate where actual security
                matters, since it's known to be vulnerable to deliberately engineered collisions.
              </li>
              <li>
                <strong className="text-slate-200">SHA-1</strong> — similarly deprecated for security use,
                included mainly for compatibility with older systems and tools that still expect it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Verifying that a downloaded file matches its publisher's published checksum, generating a
              quick unique identifier for a piece of text or data, checking whether two files are
              byte-for-byte identical without comparing them directly, and testing or debugging code that
              itself works with hashes are some of the most common reasons people reach for a hash
              generator like this one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays private</h2>
            <p className="mt-2">
              Nothing you type into this tool is sent anywhere — every hash is computed directly in your
              browser. See our{" "}
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
      <HashGeneratorClient />
    </ToolPageShell>
  );
}

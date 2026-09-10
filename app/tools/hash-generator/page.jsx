import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
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
    a: "MD5, SHA-1, SHA-256, and SHA-512. The SHA family uses the browser's own built-in Web Crypto API, while MD5 uses a standard implementation, since browsers don't provide MD5 natively.",
  },
  {
    q: "Is my text sent anywhere to generate the hash?",
    a: "No. Every hash is computed directly in your browser — nothing you type is ever uploaded or logged.",
  },
  {
    q: "Which hash type should I actually use?",
    a: "SHA-256 or SHA-512 for anything security-related. MD5 and SHA-1 are both considered cryptographically broken for security purposes and are included mainly for compatibility with older systems or non-security uses like checksums.",
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
              A tiny change, a completely different result
            </h2>
            <p className="mt-2">
              A hash function takes any input and produces a fixed-length string that acts as a
              fingerprint for that exact data. This tool computes four of the most common hash types
              directly inside your browser, using the same cryptographic engine browsers rely on for
              their own security features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Try it yourself: the avalanche effect</h2>
            <p className="mt-2">
              Type "hello" into the box above and note the SHA-256 result, then change it to "Hello" —
              just one capitalized letter. The two hashes share nothing in common, even though the input
              barely changed. This is a deliberate, essential property called the avalanche effect: a
              well-designed hash function is built so that even a one-character difference produces a
              completely unrelated output, with no visible pattern connecting the two. It's exactly what
              makes hashes useful for detecting even the smallest alteration to a file or message.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Type or paste any text into the box, and all four hash types update instantly below it.
              Click the copy icon next to any result to grab that specific hash.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing the right hash type</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">SHA-256 / SHA-512</strong> — the right choice for
                anything security-sensitive, still cryptographically strong and widely used.
              </li>
              <li>
                <strong className="text-slate-200">MD5</strong> — fast and still common for basic file
                checksums, but not appropriate where security matters, since it's known to be vulnerable
                to deliberately engineered collisions.
              </li>
              <li>
                <strong className="text-slate-200">SHA-1</strong> — similarly deprecated for security use,
                included mainly for compatibility with older tools.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Verifying that a downloaded file matches its publisher's published checksum, generating a
              quick unique identifier for a piece of text, checking whether two files are byte-for-byte
              identical without comparing them directly, and testing code that itself works with hashes
              are common reasons people reach for a hash generator. In each case, the same input always
              produces the same hash — that determinism is what makes a hash useful as a fingerprint in
              the first place: hash the file again later, and if the result differs even slightly, you
              know something about it changed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Working with structured data? The site's{" "}
              <Link href="/tools/json-formatter" className="text-amber-400 underline underline-offset-2">
                JSON Formatter
              </Link>{" "}
              and{" "}
              <Link href="/tools/csv-json-converter" className="text-amber-400 underline underline-offset-2">
                CSV ⇄ JSON Converter
              </Link>{" "}
              are common companions when a hash is needed for a specific payload.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="hash-generator" />
        </>
      }
    >
      <HashGeneratorClient />
    </ToolPageShell>
  );
}

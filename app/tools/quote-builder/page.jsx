import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import QuoteBuilderClient from "./QuoteBuilderClient";

export const metadata = {
  title: "Free Quote Builder — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Build a professional price quote free, with no sign up. Fill in your details and export an instant PDF, right in your browser.",
  keywords: [
    "free quote builder no sign up",
    "price quote generator online",
    "create quote pdf free",
    "quote template for freelancers",
    "print quote to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/quote-builder" },
  openGraph: {
    title: "Free Quote Builder — No Sign Up, Instant PDF",
    description: "Build a professional price quote and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/quote-builder",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this quote builder really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many quotes you can create.",
  },
  {
    q: "What's the actual difference between a quote, an estimate, and an invoice?",
    a: "A quote is a firm, specific price offered before work begins — generally treated as a commitment once accepted. An estimate is a rougher approximation, explicitly not a fixed promise, used when the final cost genuinely can't be pinned down in advance. An invoice comes after the work, requesting payment for what was actually delivered. This tool builds a quote — a firm number offered upfront.",
  },
  {
    q: "Do you store or see the quotes I create?",
    a: "No. Everything is held in your browser's memory only, and the PDF is generated locally when you click Print.",
  },
  {
    q: "How do I get an actual PDF file?",
    a: "Click \"Print / Save as PDF,\" then choose \"Save as PDF\" in your browser's print dialog.",
  },
];

export default function QuoteBuilderPage() {
  return (
    <ToolPageShell
      title="Free Quote Builder"
      subtitle="Put together a polished price quote and export an instant PDF — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A firm number, presented professionally
            </h2>
            <p className="mt-2">
              Sending a price to a prospective client over text or a casual email can undersell the offer
              — a proper quote looks considered and makes the price feel like a genuine commitment rather
              than a guess. This tool builds one that exports straight to PDF, entirely in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Fill in your details and the client's.</li>
              <li>Add line items for what you're quoting.</li>
              <li>Export as PDF once it looks right.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What a strong quote includes</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Clear, itemized pricing rather than one vague lump sum.</li>
              <li>A quote number for easy reference later.</li>
              <li>An expiry date, so the price isn't open-ended indefinitely.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Quote, estimate, or invoice — which one this is</h2>
            <p className="mt-2">
              These three get used loosely in conversation, but they mean genuinely different things. A
              quote is a firm price offered before work starts — once accepted, it's generally treated as
              a commitment to that number. An estimate is a rougher approximation, explicitly not a fixed
              promise, appropriate when the final cost genuinely can't be known until the work is
              underway. An invoice comes after the fact, requesting payment for work already delivered.
              This tool builds a quote — use it when you're ready to commit to a specific, firm price.
              For billing after work is done, the site's{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              is the right fit instead.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once a quote is accepted, follow up with an{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice
              </Link>{" "}
              once the work is done, or a{" "}
              <Link href="/tools/contract-template-kit" className="text-amber-400 underline underline-offset-2">
                Contract
              </Link>{" "}
              if a formal agreement is needed before starting.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="quote-builder" />
        </>
      }
    >
      <QuoteBuilderClient />
    </ToolPageShell>
  );
}

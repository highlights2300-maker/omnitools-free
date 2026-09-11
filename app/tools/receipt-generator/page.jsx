import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ReceiptGeneratorClient from "./ReceiptGeneratorClient";

export const metadata = {
  title: "Free Receipt Generator — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Create a simple, professional payment receipt free, with no sign up. Fill in the details and export an instant PDF — right in your browser.",
  keywords: [
    "free receipt generator no sign up",
    "payment receipt maker online",
    "create receipt pdf free",
    "receipt template for small business",
    "print receipt to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/receipt-generator" },
  openGraph: {
    title: "Free Receipt Generator — No Sign Up, Instant PDF",
    description: "Create a simple payment receipt and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/receipt-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this receipt generator really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many receipts you can create.",
  },
  {
    q: "What's the difference between a receipt and an invoice?",
    a: "An invoice requests payment before or as it's owed — it's sent asking to be paid. A receipt confirms a payment that's already happened — it's sent afterward, as proof. If you need to bill a client, use the Invoice Generator instead; use this once payment has already been received.",
  },
  {
    q: "Do you store or see the receipts I create?",
    a: "No. Every field is held in your browser's memory only, and the PDF is generated locally.",
  },
  {
    q: "How do I get an actual PDF file?",
    a: "Click \"Print / Save as PDF,\" then choose \"Save as PDF\" in your browser's print dialog.",
  },
];

export default function ReceiptGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Receipt Generator"
      subtitle="Fill in your details, preview instantly, export a clean PDF receipt — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Confirming a payment, properly
            </h2>
            <p className="mt-2">
              Confirming a payment with a proper receipt is something small businesses and freelancers
              need regularly. This tool lets you fill in who paid, how much, and how, then export a clean
              PDF the moment you're ready — no account, no watermark.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Fill in your business and the payer's details.</li>
              <li>Add what was paid for and the payment method used.</li>
              <li>Export as PDF.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Clean, professional layout in a couple of minutes</li>
                  <li>Multiple currency and payment method options</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Doesn't save receipt history between sessions</li>
                  <li>No automatic tax calculation</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What a good receipt includes</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>A unique receipt number for referencing later.</li>
              <li>The payer's name and the payment method used.</li>
              <li>An itemized list of what was paid for.</li>
              <li>A clear total and the date the payment was received.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why a proper receipt matters</h2>
            <p className="mt-2">
              A quick text message confirming "payment received" works informally, but a proper receipt
              with an itemized list and a receipt number gives both sides a clean paper trail — useful
              for expense tracking, tax records, or simply having something concrete if a question comes
              up later about what was paid and when.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Receipt versus invoice — opposite moments</h2>
            <p className="mt-2">
              An invoice is a request for payment, sent before or as work is being billed. A receipt is
              confirmation that payment has already happened — proof for the payer's records and often
              useful for the business's own bookkeeping too. If you're asking to be paid, use the{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              instead; use this tool once the payment has actually been received.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              If you still need to bill for the work, start with{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              — once that's paid, this tool confirms it.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="receipt-generator" />
        </>
      }
    >
      <ReceiptGeneratorClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ContractTemplateClient from "./ContractTemplateClient";

export const metadata = {
  title: "Free Service Agreement Template — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Fill in a simple service agreement template free, with no sign up. Add the parties, services, payment, and terms, then export an instant PDF in your browser.",
  keywords: [
    "free service agreement template no sign up",
    "contract template generator online",
    "simple freelance contract pdf",
    "service agreement maker free",
    "print contract to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/contract-template-kit" },
  openGraph: {
    title: "Free Service Agreement Template — No Sign Up, Instant PDF",
    description: "Fill in a simple service agreement and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/contract-template-kit",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this contract template really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many agreements you can create.",
  },
  {
    q: "Is this a legally binding contract?",
    a: "This is a general-purpose starting template covering the basics — parties, services, payment, term, and governing law. It isn't a substitute for advice from a qualified lawyer, especially for anything high-stakes, unusual, or involving significant money or risk.",
  },
  {
    q: "What actually makes an agreement like this enforceable?",
    a: "Most jurisdictions look for a few basic elements: an offer, acceptance of that offer, an exchange of value (called consideration — the payment for the services, in this case), and a genuine intention by both sides to be bound by the terms. This template is structured around covering those basics clearly, but whether a specific agreement actually holds up depends on the jurisdiction and circumstances, which is exactly the kind of thing worth a lawyer's input on for anything significant.",
  },
  {
    q: "Do you store or see the agreements I create?",
    a: "No. Every field is held in your browser's memory only, and the PDF is generated locally when you click Print. Nothing is uploaded to a server.",
  },
  {
    q: "How do I get an actual PDF file, and how do we sign it?",
    a: "Click \"Print / Save as PDF\" to export the document, which includes signature lines at the bottom. You can print it physically for wet signatures, or use the site's E-Signature Pad to create a digital signature image to insert before printing.",
  },
];

export default function ContractTemplateKitPage() {
  return (
    <ToolPageShell
      title="Free Contract Template Kit"
      subtitle="Fill in a simple service agreement, export an instant PDF — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A written agreement is better than a text message
            </h2>
            <p className="mt-2">
              Putting a simple written agreement in place before starting freelance or service work
              protects both sides, but a lot of people skip it because finding or drafting one feels like
              overkill for smaller jobs. This tool covers the essentials — who's involved, what's being
              delivered, how much it costs, and how the agreement can end — and exports a clean PDF the
              moment you're ready.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Name the parties, addresses, and an effective date.</li>
              <li>Describe the services being delivered.</li>
              <li>Set payment terms, term, termination, and governing law — each field is editable.</li>
              <li>Export as PDF — signature lines are included at the bottom.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What actually makes an agreement enforceable</h2>
            <p className="mt-2">
              Setting aside jurisdiction-specific detail, most legal systems look for a handful of basic
              elements before treating an agreement as binding: a clear offer, acceptance of that offer,
              an exchange of value between both sides (the payment for the services being the
              "consideration" here), and a genuine mutual intention to actually be bound by the terms.
              This template is deliberately structured around covering those basics in plain language —
              it isn't a substitute for a lawyer's review on anything with real complexity or stakes, but
              it's a genuinely better foundation than an informal text-message agreement for routine work.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Covers the standard basic elements of a service agreement</li>
                  <li>Fully editable — not a rigid, fill-in-the-blank form</li>
                  <li>Free, instant, no account required</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Not tailored to any specific jurisdiction's requirements</li>
                  <li>Not a substitute for legal review on complex or high-value work</li>
                  <li>No built-in e-signature — signing is a separate manual step</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Signing the finished agreement</h2>
            <p className="mt-2">
              The exported PDF includes signature lines for both parties. Print and sign by hand, or use
              the site's{" "}
              <Link href="/tools/e-signature-pad" className="text-amber-400 underline underline-offset-2">
                E-Signature Pad
              </Link>{" "}
              to draw a signature, download it as a transparent PNG, and insert it before printing.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="contract-template-kit" />
        </>
      }
    >
      <ContractTemplateClient />
    </ToolPageShell>
  );
}

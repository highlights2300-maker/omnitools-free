import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ESignatureClient from "./ESignatureClient";

export const metadata = {
  title: "Free E-Signature Pad Online — Draw & Export PNG | QuickZeta",
  description:
    "Draw a signature and export it as a transparent PNG, free, with no upload and no sign up. Processed entirely in your browser.",
  keywords: [
    "free e-signature pad online",
    "draw signature no upload",
    "signature generator free no sign up",
    "transparent signature png maker",
    "digital signature online free",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/e-signature-pad" },
  openGraph: {
    title: "Free E-Signature Pad Online — Draw & Export PNG",
    description: "Draw a signature and export it as a transparent PNG, entirely in your browser.",
    url: "https://quickzeta.com/tools/e-signature-pad",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this signature pad really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many signatures you can create.",
  },
  {
    q: "Do you upload or store my signature?",
    a: "No. The signature is drawn directly onto a canvas element in your browser and exported locally — it's never sent anywhere or stored.",
  },
  {
    q: "Is a signature made this way legally valid?",
    a: "Electronic signatures are broadly recognized as legally valid in many jurisdictions for a wide range of everyday documents, under laws like the US's ESIGN Act. That said, validity requirements vary by document type and jurisdiction, and some specific documents (certain wills, court filings, or highly regulated agreements) may have stricter requirements — worth checking for anything unusual or high-stakes.",
  },
  {
    q: "What file do I get?",
    a: "A PNG with a transparent background, ready to drop into a document, PDF, or image editor.",
  },
  {
    q: "Can I use a mouse, or does this need a touchscreen?",
    a: "Either works — the pad captures mouse movement on a desktop and touch input on a phone or tablet, though a touchscreen or stylus typically produces a more natural-looking signature than a mouse.",
  },
];

export default function ESignaturePadPage() {
  return (
    <ToolPageShell
      title="Free E-Signature Pad"
      subtitle="Draw a signature and export it as a transparent PNG — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A signature, without printing anything
            </h2>
            <p className="mt-2">
              Signing something without a printer nearby usually means an awkward workaround — a photo of
              a paper signature, or third-party signing software you didn't want to sign up for. This
              tool draws a clean signature directly onto a canvas in your browser and exports it as a
              transparent PNG, ready to drop into whatever document actually needs it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Draw your signature using a mouse, finger, or stylus.</li>
              <li>Adjust and redo it until it looks right.</li>
              <li>Download as a transparent PNG.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Transparent PNG output, ready to drop into any document</li>
                  <li>Works with mouse, finger, or stylus input</li>
                  <li>No account, instant download</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Mouse-drawn signatures often look less natural than touch or stylus input</li>
                  <li>Doesn't embed the signature into a PDF automatically — that's a separate step</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">On legal validity, briefly</h2>
            <p className="mt-2">
              Electronic signatures are broadly recognized as legally valid for a wide range of everyday
              documents in many jurisdictions — laws like the US ESIGN Act and similar frameworks
              elsewhere were specifically written to give e-signatures the same standing as a handwritten
              one for most ordinary agreements. That said, this varies by document type and jurisdiction,
              and some categories (certain wills, court documents, specific regulated contracts) can carry
              stricter requirements. This isn't legal advice — for anything unusual or high-stakes, it's
              worth confirming what's actually required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Signing a printed document that's been scanned back in digitally.</li>
              <li>Adding a signature block to an email footer.</li>
              <li>
                Completing the site's own{" "}
                <Link href="/tools/contract-template-kit" className="text-amber-400 underline underline-offset-2">
                  Contract Template Kit
                </Link>{" "}
                agreement.
              </li>
              <li>Creating a simple signature graphic for a document template.</li>
            </ul>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="e-signature-pad" />
        </>
      }
    >
      <ESignatureClient />
    </ToolPageShell>
  );
}

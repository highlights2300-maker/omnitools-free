import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PdfWatermarkerClient from "./PdfWatermarkerClient";

export const metadata = {
  title: "Free PDF Watermarker Online — Add Text Watermark, No Upload | QuickZeta",
  description:
    "Stamp a text watermark across every page of a PDF, free, with no upload and no sign up. Processed entirely in your browser.",
  keywords: [
    "free pdf watermarker online",
    "add watermark to pdf no upload",
    "stamp text on pdf free",
    "pdf watermark tool no sign up",
    "mark pdf as draft online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-watermarker" },
  openGraph: {
    title: "Free PDF Watermarker Online — Add Text Watermark, No Upload",
    description: "Stamp a text watermark across every page of a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/pdf-watermarker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this watermarker really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many PDFs you can watermark.",
  },
  {
    q: "Do you upload my PDF to a server?",
    a: "No. The watermark is stamped onto each page directly inside your browser using pdf-lib — nothing is uploaded.",
  },
  {
    q: "Does a watermark actually stop someone from copying my document?",
    a: "Not really — a text watermark is a visual deterrent and a way to clearly mark a document's status (draft, confidential, sample), not a technical protection. It doesn't prevent copying, editing, or redistribution; it just makes unauthorized use more obviously improper and easier to trace back to a source. For genuine access control, this isn't the right tool.",
  },
  {
    q: "Can I control the watermark's opacity and angle?",
    a: "Yes — adjust the transparency and rotation so it's visible without overwhelming the underlying content.",
  },
  {
    q: "Does the watermark appear on every page?",
    a: "Yes, applied consistently across the entire document.",
  },
];

export default function PdfWatermarkerPage() {
  return (
    <ToolPageShell
      title="Free PDF Watermarker"
      subtitle="Stamp a text watermark across every page — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Marking a document's status, clearly
            </h2>
            <p className="mt-2">
              Labeling a document as a draft, a sample, or confidential before sharing it is a small step
              that avoids real confusion later. This tool stamps a text watermark diagonally across every
              page of a PDF, directly in your browser, with the original file never uploaded anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the PDF you want to mark.</li>
              <li>Type the watermark text and adjust its opacity and angle.</li>
              <li>Download the watermarked file.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Applied consistently across every page automatically</li>
                  <li>Adjustable opacity and angle</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Text watermarks only — no logo or image watermark</li>
                  <li>Not a security measure, as covered below</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What a watermark actually does — and doesn't</h2>
            <p className="mt-2">
              Worth being clear about this: a text watermark is a visual signal, not a technical
              protection. It makes a document's status obvious at a glance and makes unauthorized copies
              easier to trace back to a source, but it doesn't lock the file, prevent copying, or stop
              someone from editing the underlying content. If genuine access control or encryption is
              what you actually need, a watermark isn't the tool for that — it's for clear labeling, not
              security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Marking a document clearly as "DRAFT" before it's finalized.</li>
              <li>Labeling a preview or sample before sending it out.</li>
              <li>Stamping "CONFIDENTIAL" across internal documents.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once watermarked, use{" "}
              <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                PDF Merger
              </Link>{" "}
              to combine it with other files, or{" "}
              <Link href="/tools/pdf-compressor" className="text-amber-400 underline underline-offset-2">
                PDF Compressor
              </Link>{" "}
              to shrink it before sending.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="pdf-watermarker" />
        </>
      }
    >
      <PdfWatermarkerClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import PdfWatermarkerClient from "./PdfWatermarkerClient";

export const metadata = {
  title: "Free PDF Watermark Tool Online — No Upload | QuickZeta",
  description:
    "Stamp a diagonal text watermark across every page of a PDF, free, with no upload and no sign up. Adjust text, size, and opacity — entirely in your browser.",
  keywords: [
    "free pdf watermark tool online",
    "add watermark to pdf no upload",
    "stamp confidential on pdf free",
    "pdf watermark no sign up",
    "watermark pdf pages online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-watermarker" },
  openGraph: {
    title: "Free PDF Watermark Tool Online — No Upload",
    description: "Stamp a diagonal text watermark across every page of a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/pdf-watermarker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this PDF watermark tool really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many PDFs you can watermark.",
  },
  {
    q: "Do you upload my PDF to a server?",
    a: "No. The watermark is stamped directly inside your browser — your file is never sent anywhere.",
  },
  {
    q: "Can I customize the watermark text?",
    a: "Yes — type whatever text you'd like, whether that's \"CONFIDENTIAL,\" \"DRAFT,\" a company name, or anything else.",
  },
  {
    q: "Can I control how visible the watermark is?",
    a: "Yes — the opacity slider controls how faint or bold the watermark appears, and the font size slider controls how large it renders across the page.",
  },
  {
    q: "Does the watermark cover important content?",
    a: "The watermark is stamped diagonally across the center of each page at an adjustable opacity, so it's visible as a watermark without necessarily blocking the underlying text — lowering the opacity further makes it subtler if needed.",
  },
  {
    q: "Will this work with a password-protected PDF?",
    a: "Not currently — the PDF needs to be unlocked first. If a file fails to load, that's usually why.",
  },
];

export default function PdfWatermarkerPage() {
  return (
    <ToolPageShell
      title="Free PDF Watermarker"
      subtitle="Stamp a diagonal text watermark across every page — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Add a watermark to a PDF without uploading it
            </h2>
            <p className="mt-2">
              Marking a document as a draft, confidential, or belonging to a particular business is a
              common reason to stamp a watermark across a PDF before sharing it. This tool does that
              directly inside your browser — your document is never sent to a server, and you can adjust
              the text, size, and visibility before applying it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose your PDF.</strong> Drag it in or tap to select
                it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Set the watermark text.</strong> Type whatever text
                you want stamped across every page.
              </li>
              <li>
                <strong className="text-slate-200">Adjust size and opacity.</strong> Fine-tune how bold
                or subtle the watermark appears.
              </li>
              <li>
                <strong className="text-slate-200">Apply and download.</strong> Save the watermarked
                version of your PDF.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Marking a document as "DRAFT" before it's finalized.</li>
              <li>Stamping "CONFIDENTIAL" across sensitive internal paperwork.</li>
              <li>Adding a company name or logo text across shared materials.</li>
              <li>Labeling a sample or preview document before a final version is delivered.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing the right opacity</h2>
            <p className="mt-2">
              A lower opacity (around 10–20%) keeps the underlying document fully readable while still
              making the watermark clearly visible — a common choice for professional documents. A higher
              opacity makes the watermark bolder and harder to miss, which can be useful for drafts or
              internal-only materials where making the status obvious matters more than a clean look.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your document never leaves your device</h2>
            <p className="mt-2">
              Because the watermark is applied locally, this tool never sees or stores the document you
              use here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">No quality loss to the original document</h2>
            <p className="mt-2">
              The watermark is added as an additional layer on top of each page — the original text,
              images, and formatting underneath are left completely untouched. This means the rest of
              the document keeps its original quality and remains fully readable, with only the
              watermark text layered visibly on top at whatever opacity you choose — the file remains a
              genuine, working PDF afterward, not a flattened image.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <PdfWatermarkerClient />
    </ToolPageShell>
  );
}

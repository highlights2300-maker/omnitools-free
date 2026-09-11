import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata = {
  title: "Free Image to PDF Converter Online — No Upload | QuickZeta",
  description:
    "Turn photos or scans into a single PDF, free, with no upload and no sign up. Reorder pages before exporting — processed entirely in your browser.",
  keywords: [
    "free image to pdf converter online",
    "photos to pdf no upload",
    "jpg to pdf free no sign up",
    "convert scan to pdf online",
    "combine images into one pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-to-pdf" },
  openGraph: {
    title: "Free Image to PDF Converter Online — No Upload",
    description: "Turn photos into a single PDF entirely in your browser.",
    url: "https://quickzeta.com/tools/image-to-pdf",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image to PDF converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many images or pages you can combine.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. Each image is embedded directly into a new PDF using pdf-lib, running entirely in your browser — nothing is ever uploaded.",
  },
  {
    q: "Can I reorder the pages before exporting?",
    a: "Yes — arrange your images in whatever order you want the final PDF's pages to follow before generating the file.",
  },
  {
    q: "Will image quality be preserved in the PDF?",
    a: "Yes — each image is embedded at its original resolution, with no additional recompression applied during the conversion.",
  },
  {
    q: "What image formats can I use?",
    a: "Common formats like JPG, PNG, and WebP all work as source images for the PDF.",
  },
];

export default function ImageToPdfPage() {
  return (
    <ToolPageShell
      title="Free Image to PDF Converter"
      subtitle="Turn a batch of photos or scans into one clean PDF — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A phone full of photos, one document at the end
            </h2>
            <p className="mt-2">
              Scanned receipts, photographed pages of a document, screenshots that need to become one
              file — turning a set of images into a proper PDF is one of the most common small document
              tasks. This tool embeds your images directly into a new PDF, in whatever order you choose,
              entirely inside your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Turning photographed pages of a document into one shareable PDF.</li>
              <li>Combining scanned receipts into a single file for an expense report.</li>
              <li>Bundling screenshots into one document for review.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Add the images you want to include.</li>
              <li>Drag to reorder them into the sequence you want.</li>
              <li>Generate and download the finished PDF.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Full-resolution images, no automatic recompression</li>
                  <li>Reorder pages before generating the file</li>
                  <li>No file count or size limit enforced</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No automatic perspective correction for angled phone photos</li>
                  <li>No built-in OCR — the result is a document made of images, not searchable text</li>
                  <li>Large, uncompressed photos can produce a sizable PDF</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Order matters more than it seems</h2>
            <p className="mt-2">
              Getting the page order right before generating the PDF saves a re-export later — it's worth
              taking a moment to arrange images in the exact sequence you want the final document to read
              in, since the tool builds pages in that order directly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              If the resulting PDF is too large to email, run it through{" "}
              <Link href="/tools/pdf-compressor" className="text-amber-400 underline underline-offset-2">
                PDF Compressor
              </Link>{" "}
              afterward, or combine it with other documents using{" "}
              <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                PDF Merger
              </Link>
              .
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="image-to-pdf" />
        </>
      }
    >
      <ImageToPdfClient />
    </ToolPageShell>
  );
}

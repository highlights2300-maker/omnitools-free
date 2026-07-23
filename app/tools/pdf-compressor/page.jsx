import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import PdfCompressorClient from "./PdfCompressorClient";

export const metadata = {
  title: "Free PDF Compressor Online — Shrink File Size, No Upload | QuickZeta",
  description:
    "Shrink a PDF's file size, free, with no upload and no sign up. Adjust resolution and quality with a real before-and-after size comparison, in your browser.",
  keywords: [
    "free pdf compressor online",
    "reduce pdf file size no upload",
    "compress scanned pdf free",
    "shrink pdf no sign up",
    "pdf size reducer online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-compressor" },
  openGraph: {
    title: "Free PDF Compressor Online — Shrink File Size, No Upload",
    description: "Shrink a PDF's file size by re-rendering pages as optimized images, entirely in your browser.",
    url: "https://quickzeta.com/tools/pdf-compressor",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this PDF compressor really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many PDFs you can compress.",
  },
  {
    q: "Do you upload my PDF to a server?",
    a: "No. The entire process — rendering, recompressing, and rebuilding the PDF — happens directly inside your browser.",
  },
  {
    q: "Will the text in my PDF still be selectable after compressing?",
    a: "No, and this is important to know upfront. This tool works by re-rendering every page as an image, then rebuilding the PDF from those images. That means any selectable, searchable text in the original becomes part of a flat image instead. If you need to keep selectable text, this tool isn't the right fit for that specific document.",
  },
  {
    q: "What kind of PDF is this best suited for?",
    a: "Scanned documents and image-heavy PDFs, where the file is already effectively a collection of images rather than live text — that's where this technique achieves a real, meaningful size reduction.",
  },
  {
    q: "How much smaller will my file get?",
    a: "It depends heavily on the original file and the resolution and quality settings you choose. Image-heavy or high-resolution scanned PDFs often see substantial reductions, while a PDF that's mostly live text may see little change or even grow slightly, since it's being converted into images.",
  },
  {
    q: "What do the resolution and quality sliders control?",
    a: "Resolution (DPI) controls how sharp each rendered page image is — lower values produce a smaller file but softer detail. Quality controls the JPEG compression level applied to each page image — lower values shrink the file further at the cost of some visible compression artifacts.",
  },
];

export default function PdfCompressorPage() {
  return (
    <ToolPageShell
      title="Free PDF Compressor"
      subtitle="Shrink a PDF's file size with adjustable resolution and quality — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              An honest look at how this PDF compressor works
            </h2>
            <p className="mt-2">
              Most PDF compressors don't explain what they're actually doing to your file, which can lead
              to an unpleasant surprise. Here's the honest version: this tool re-renders every page of
              your PDF as an optimized image, then rebuilds a new PDF from those images. That's a
              genuinely effective way to shrink a scanned or image-heavy document — but it does mean any
              selectable text in the original becomes part of a flat image afterward, no longer
              searchable or copyable. If your PDF is mostly live text rather than scanned pages, this
              specific technique isn't the right tool for the job.
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
                <strong className="text-slate-200">Adjust resolution and quality.</strong> Lower values
                produce a smaller file at the cost of sharpness.
              </li>
              <li>
                <strong className="text-slate-200">Compress and compare.</strong> See the real before-and-
                after file size, then download the result.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">When this tool is the right fit</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>A scanned document photographed or scanned at high resolution.</li>
              <li>A PDF full of large embedded photos that's grown too big to email.</li>
              <li>An image-heavy report or brochure where searchable text isn't needed.</li>
              <li>
                A document you've already run through the site's{" "}
                <Link href="/tools/image-to-pdf" className="text-amber-400 underline underline-offset-2">
                  Image to PDF
                </Link>{" "}
                tool, where the pages are already images to begin with.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Finding the right balance</h2>
            <p className="mt-2">
              There's no single "correct" setting — it depends on what the PDF is for. For something
              that just needs to be readable on screen, a lower resolution and quality setting produces a
              much smaller file with barely noticeable visual difference. For something that might get
              printed, keeping resolution higher preserves more detail at the cost of a larger file size.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your document never leaves your device</h2>
            <p className="mt-2">
              Because everything runs locally, this tool never sees or stores the document you compress
              here. See our{" "}
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
      <PdfCompressorClient />
    </ToolPageShell>
  );
}

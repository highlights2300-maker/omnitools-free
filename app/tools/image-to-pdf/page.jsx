import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata = {
  title: "Free Image to PDF Converter Online — No Upload | QuickZeta",
  description:
    "Turn JPG or PNG images into a single PDF, free, with no upload and no sign up. Reorder pages and export a clean, print-ready PDF — entirely in your browser.",
  keywords: [
    "free image to pdf converter online",
    "jpg to pdf no upload",
    "combine photos into one pdf free",
    "png to pdf no sign up",
    "convert scanned images to pdf",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-to-pdf" },
  openGraph: {
    title: "Free Image to PDF Converter Online — No Upload",
    description: "Turn JPG or PNG images into a single PDF, composed entirely in your browser.",
    url: "https://quickzeta.com/tools/image-to-pdf",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image-to-PDF converter really free, with no sign up?",
    a: "Yes. There's no account, no watermark, and no limit on how many images or PDFs you can create.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. Every image is composed into the PDF directly inside your browser — nothing is ever sent anywhere.",
  },
  {
    q: "Can I combine multiple images into one PDF?",
    a: "Yes — add as many images as you need, and each one becomes its own page in the final PDF, in the order you arrange them.",
  },
  {
    q: "Can I change the order the images appear in?",
    a: "Yes, use the up and down arrows next to each image to reorder them before building the PDF.",
  },
  {
    q: "What page size does the PDF use?",
    a: "Every page is standard A4 size, with each image automatically scaled to fit within the page margins while keeping its original proportions — no stretching or distortion.",
  },
  {
    q: "Will this work for scanned documents taken with a phone camera?",
    a: "Yes — this is one of the most common uses. Photograph each page of a document, add the photos in order, and this tool combines them into a single, shareable PDF.",
  },
];

export default function ImageToPdfPage() {
  return (
    <ToolPageShell
      title="Free Image to PDF Converter"
      subtitle="Combine JPG or PNG images into a single, print-ready PDF — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Turn images into a PDF without uploading them
            </h2>
            <p className="mt-2">
              Photographing a document page by page and needing it as one shareable file, or combining a
              handful of photos into a single PDF for printing or emailing, is a common small task that
              usually means uploading files to some other website first. This tool builds the PDF
              directly inside your browser instead — your images are never sent to a server at any point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Add your images.</strong> Drag in one or more JPG or
                PNG files, or tap to select them.
              </li>
              <li>
                <strong className="text-slate-200">Arrange the order.</strong> Use the up and down arrows
                to set which image becomes which page.
              </li>
              <li>
                <strong className="text-slate-200">Build and download.</strong> Click "Build PDF" and
                save the finished, combined document.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Turning phone photos of a multi-page document into one shareable PDF.</li>
              <li>Combining several receipts or invoices photographed separately.</li>
              <li>Putting together a simple photo-based PDF for printing or archiving.</li>
              <li>
                Preparing scanned pages to later combine further using the site's{" "}
                <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                  PDF Merger
                </Link>{" "}
                if you need to join them with an existing PDF.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because the PDF is built locally, this tool never sees, stores, or has access to the images
              you use here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Tips for photographing documents cleanly</h2>
            <p className="mt-2">
              If you're photographing paper pages to convert into a PDF, a few small habits make a real
              difference in how clean the result looks. Shoot in good, even lighting and avoid casting a
              shadow over the page with your own body or phone. Hold the camera directly above the
              document rather than at an angle, to keep text from looking skewed or distorted. And where
              possible, place the page against a plain, contrasting background, which makes the edges of
              the document easier to see clearly in the final image.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <ImageToPdfClient />
    </ToolPageShell>
  );
}

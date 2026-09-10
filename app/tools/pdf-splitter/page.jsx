import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PdfSplitterClient from "./PdfSplitterClient";

export const metadata = {
  title: "Free PDF Splitter Online — Extract Pages, No Upload | QuickZeta",
  description:
    "Split a PDF into separate page files, free, with no upload and no sign up. Choose exactly which pages to extract — processed entirely in your browser.",
  keywords: [
    "free pdf splitter online",
    "split pdf into pages no upload",
    "extract pdf pages free",
    "pdf page extractor no sign up",
    "separate pdf pages online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-splitter" },
  openGraph: {
    title: "Free PDF Splitter Online — Extract Pages, No Upload",
    description: "Split a PDF into separate page files entirely in your browser.",
    url: "https://quickzeta.com/tools/pdf-splitter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this PDF splitter really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no limit on how many times you can split files.",
  },
  {
    q: "Do you upload my PDF to a server?",
    a: "No. The split happens directly inside your browser using pdf-lib, an open-source library that reads and rebuilds PDF documents locally. Your file is never transmitted anywhere.",
  },
  {
    q: "Do I get one file per page, or can I choose custom ranges?",
    a: "You can select exactly which pages go into which output file — everything from splitting every page individually to grouping specific ranges together, depending on what you need.",
  },
  {
    q: "What happens to bookmarks, form fields, or links inside the PDF?",
    a: "Text, images, and page layout carry over exactly as they were. Interactive elements like fillable form fields or internal bookmarks are not preserved in the split output — if your PDF relies on those, keep the original file as your working copy.",
  },
  {
    q: "Is there a page count or file size limit?",
    a: "No fixed limit is enforced by the tool itself. Very large PDFs (many hundreds of pages, or large embedded images) will simply take longer to process, since your own device's processor is doing the work.",
  },
  {
    q: "Will splitting reduce the quality of my PDF?",
    a: "No. Pages are copied into the new files exactly as they exist in the original — no re-rendering, no recompression, no quality loss of any kind.",
  },
];

export default function PdfSplitterPage() {
  return (
    <ToolPageShell
      title="Free PDF Splitter"
      subtitle="Extract exactly the pages you need into separate files — no upload, no sign up, no quality loss."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              One PDF came in — several need to go out
            </h2>
            <p className="mt-2">
              A single scanned packet, a combined report, or a long contract often needs to become
              several smaller files before it's actually useful to someone — one chapter to a colleague,
              one signed page for a records system, one section to print separately. This tool splits a
              PDF into exactly the pieces you choose, directly in your browser, without ever uploading
              the original document anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Split, extract, or merge — which one you actually want</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="py-2 pr-4 font-medium">You want to…</th>
                    <th className="py-2 font-medium text-amber-400">Use this</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4">Break one PDF into several separate files</td>
                    <td className="py-2 font-medium text-slate-100">PDF Splitter (this tool)</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4">Combine several PDFs into one</td>
                    <td className="py-2">
                      <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                        PDF Merger
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4">Shrink a PDF's file size</td>
                    <td className="py-2">
                      <Link href="/tools/pdf-compressor" className="text-amber-400 underline underline-offset-2">
                        PDF Compressor
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Drop in the PDF you want to split.</li>
              <li>Choose which pages go into which output file.</li>
              <li>Download the results — each as its own file, or bundled as a ZIP.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No file size cap tied to a subscription tier</li>
                  <li>No watermark added to any output</li>
                  <li>Original page quality preserved exactly</li>
                  <li>Nothing uploaded, so no wait on a network round-trip</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Fillable form fields aren't preserved in split output</li>
                  <li>Internal bookmarks/links don't carry over</li>
                  <li>Very large files process only as fast as your own device allows</li>
                  <li>No OCR — it splits pages, it doesn't read scanned text</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where this fits into a real workflow</h2>
            <p className="mt-2">
              Splitting is rarely the only step — it's usually one part of getting a document from "one
              big file" to "exactly what someone needs." A common pattern: split a long scanned packet
              into individual sections, then use{" "}
              <Link href="/tools/pdf-compressor" className="text-amber-400 underline underline-offset-2">
                PDF Compressor
              </Link>{" "}
              on the pieces that are still too large to email, or run a specific page back through{" "}
              <Link href="/tools/pdf-watermarker" className="text-amber-400 underline underline-offset-2">
                PDF Watermarker
              </Link>{" "}
              before sending it externally.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing leaves your device</h2>
            <p className="mt-2">
              The split happens locally using pdf-lib running in your browser — see the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="pdf-splitter" />
        </>
      }
    >
      <PdfSplitterClient />
    </ToolPageShell>
  );
}

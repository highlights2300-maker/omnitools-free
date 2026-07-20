import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import PdfMergerClient from "./PdfMergerClient";

export const metadata = {
  title: "Free PDF Merger Online — Combine PDFs, No Upload | QuickZeta",
  description:
    "Merge multiple PDF files into one, free, with no sign up and no upload. Reorder pages, combine instantly, and download — entirely in your browser.",
  keywords: [
    "free pdf merger online",
    "combine pdf files no upload",
    "merge pdf free no sign up",
    "join multiple pdfs into one",
    "pdf combiner no watermark",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-merger" },
  openGraph: {
    title: "Free PDF Merger Online — Combine PDFs, No Upload",
    description: "Merge multiple PDFs into one file entirely in your browser. Nothing is ever uploaded.",
    url: "https://quickzeta.com/tools/pdf-merger",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this PDF merger really free, with no sign up?",
    a: "Yes. There's no account, no email capture, and no limit on how many times you can merge files.",
  },
  {
    q: "Do you upload my PDFs to a server?",
    a: "No. Every file you add is combined directly inside your browser. Nothing is sent anywhere, which also means there's no upload wait, even for larger files.",
  },
  {
    q: "Is there a limit on how many PDFs I can combine?",
    a: "No fixed limit — add as many as you need. Since your own device does the work, very large batches will simply take a little longer to process.",
  },
  {
    q: "Can I change the order the PDFs get combined in?",
    a: "Yes. Once you've added your files, use the up and down arrows next to each one to reorder them before merging — the final file follows that exact order.",
  },
  {
    q: "Will this work with password-protected PDFs?",
    a: "Not currently — encrypted PDFs need to be unlocked first before they can be merged. If a file fails to merge, that's usually why.",
  },
  {
    q: "Does merging reduce the quality of my PDFs?",
    a: "No. This tool combines the original pages exactly as they are — nothing is re-rendered, compressed, or altered, so there's no quality loss at all.",
  },
];

export default function PdfMergerPage() {
  return (
    <ToolPageShell
      title="Free PDF Merger"
      subtitle="Combine multiple PDF files into one, in the order you choose — no upload, no sign up, no watermark."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Merge PDF files online without uploading them
            </h2>
            <p className="mt-2">
              Combining a handful of PDFs — a scanned contract, a few reports, or a stack of receipts —
              is one of the most common small tasks people search for online, and one of the most common
              places a "free" tool quietly asks for an account or an upload first. This merger works
              differently: it reads and combines your files directly inside your browser, so nothing
              leaves your device at any point. There's no server queue to wait behind and no copy of your
              documents sitting anywhere afterward.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Add your PDFs.</strong> Drag in two or more files, or
                tap to select them from your device.
              </li>
              <li>
                <strong className="text-slate-200">Put them in order.</strong> Use the up and down arrows
                next to each file to arrange them exactly how you want the final document to read.
              </li>
              <li>
                <strong className="text-slate-200">Merge and download.</strong> Click "Merge," then
                download the single combined PDF — ready to send or print.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common reasons to combine PDFs</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Putting together a set of scanned pages into a single document to send or file.</li>
              <li>Combining several invoices or receipts into one PDF for an expense report.</li>
              <li>Merging chapters, sections, or reports from different people into one final file.</li>
              <li>Joining a cover letter and resume into a single attachment for a job application.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">No quality loss, no watermark</h2>
            <p className="mt-2">
              Unlike tools that re-render or compress your document as part of merging, this tool simply
              copies each original page into the new file exactly as it was — so text stays sharp, images
              stay full quality, and nothing is added to the output. What you download is your own
              content, combined, with nothing else attached.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your files never leave your device</h2>
            <p className="mt-2">
              Because merging happens locally, this tool never sees, stores, or has access to the
              documents you combine here. See our{" "}
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
      <PdfMergerClient />
    </ToolPageShell>
  );
}

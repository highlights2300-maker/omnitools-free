import { FileStack } from "lucide-react";
import CategoryHubShell from "../components/CategoryHubShell";

export const metadata = {
  title: "Free Document Tools Online — PDF, Word Count & More | QuickZeta",
  description:
    "Merge, split, compress, and watermark PDFs, plus word counting and file archiving — all free, with no upload and no sign up. Every tool runs entirely in your browser.",
  keywords: [
    "free document tools online",
    "pdf tools no upload",
    "merge split compress pdf free",
    "document tools no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/document-desk" },
  openGraph: {
    title: "Free Document Tools Online — PDF, Word Count & More",
    description: "Merge, split, compress, and edit documents entirely in your browser.",
    url: "https://quickzeta.com/document-desk",
    type: "website",
  },
};

const TOOLS = [
  { name: "PDF Merger", desc: "Combine multiple PDFs into one, in order.", href: "/tools/pdf-merger" },
  { name: "PDF Splitter", desc: "Break a large PDF into single-page files.", href: "/tools/pdf-splitter" },
  { name: "Image → PDF", desc: "Turn scans into one clean, print-ready PDF.", href: "/tools/image-to-pdf" },
  { name: "Word Counter", desc: "Instant word, character & reading-time count.", href: "/tools/word-counter" },
  { name: "E-Signature Pad", desc: "Draw a signature, export as transparent PNG.", href: "/tools/e-signature-pad" },
  { name: "File Archiver", desc: "Zip up several files into one archive.", href: "/tools/file-archiver" },
  { name: "PDF Compressor", desc: "Shrink a PDF by re-rendering pages as images.", href: "/tools/pdf-compressor" },
  { name: "PDF Watermarker", desc: "Stamp a diagonal text watermark on every page.", href: "/tools/pdf-watermarker" },
  { name: "CSV ⇄ JSON Converter", desc: "Convert spreadsheet data to JSON, or back.", href: "/tools/csv-json-converter" },
];

export default function DocumentDeskPage() {
  return (
    <CategoryHubShell
      title="Document Desk"
      subtitle="Merge, split, compress, sign, and tidy up paperwork — nothing ever leaves your browser."
      icon={FileStack}
      accentClass="bg-sky-400/10 text-sky-400"
      tools={TOOLS}
    >
      <h2 className="text-lg font-semibold text-slate-100">
        Document tools that never touch a server
      </h2>
      <p>
        Nearly everyone deals with the same handful of paperwork tasks sooner or later: combining a
        few scanned pages into one file, shrinking a PDF that's too large to email, splitting one
        document into individual pages, or signing something without a printer nearby. Document Desk
        brings together nine tools for exactly this kind of everyday paperwork — and every one of them
        runs entirely inside your own browser, rather than uploading your file to a server the way most
        free document tools do.
      </p>
      <p>
        That distinction matters more than it might seem at first. A typical online PDF merger or
        compressor sends your file to a remote server, processes it there, and sends back a result —
        meaning your document, even if briefly, exists on a computer you have no control over. Document
        Desk's tools skip that step entirely. PDF merging and splitting happen through an open-source
        library called pdf-lib running directly in your browser; compression works by re-rendering pages
        locally using pdf.js; even the e-signature pad draws directly onto a canvas element built into
        your browser, with the resulting image never uploaded anywhere. The net effect: no waiting on an
        upload, no file size limit imposed by a server, and nothing of yours ever sitting somewhere else
        after you're done.
      </p>
      <p>
        This also means there's no daily cap on how many times you can use any of these tools, no
        watermark added to your output, and no account required to get started — open a tool and it's
        ready the moment the page loads. Whether you're a freelancer combining a signed contract's
        scattered pages, a student merging group project sections, or anyone just trying to shrink a
        PDF enough to email it, these tools are built to handle it in one sitting, without friction.
      </p>
      <p>
        Each tool below has its own dedicated page with full instructions, format details, and answers
        to common questions — click through to any of them to get started.
      </p>
    </CategoryHubShell>
  );
}

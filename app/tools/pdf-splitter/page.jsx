import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import PdfSplitterClient from "./PdfSplitterClient";

export const metadata = {
  title: "Free PDF Splitter Online — Split Pages Into Separate Files | QuickZeta",
  description:
    "Split a PDF into individual pages for free, with no upload and no sign up. Every page becomes its own file, packed into a ZIP — entirely in your browser.",
  keywords: [
    "free pdf splitter online",
    "split pdf into pages no upload",
    "extract pages from pdf free",
    "separate pdf pages online",
    "pdf splitter no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-splitter" },
  openGraph: {
    title: "Free PDF Splitter Online — Split Pages Into Separate Files",
    description: "Split a PDF into individual pages entirely in your browser. Nothing is ever uploaded.",
    url: "https://quickzeta.com/tools/pdf-splitter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this PDF splitter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many PDFs you can split.",
  },
  {
    q: "Do you upload my PDF to a server?",
    a: "No. Splitting happens directly inside your browser. Your file is never sent anywhere, and nothing is stored once you close the tab.",
  },
  {
    q: "What do I actually get as a result?",
    a: "A ZIP file containing one PDF per page from your original document, each named clearly (page-1.pdf, page-2.pdf, and so on) so they're easy to find afterward.",
  },
  {
    q: "Can I extract just a few specific pages instead of all of them?",
    a: "Right now this tool splits every page into its own file — you can then delete the ones you don't need from the downloaded ZIP. Extracting a custom page range is a feature we may add in the future.",
  },
  {
    q: "Will this work with a password-protected PDF?",
    a: "Not currently — the PDF needs to be unlocked first. If a file fails to load, that's the most common reason.",
  },
];

export default function PdfSplitterPage() {
  return (
    <ToolPageShell
      title="Free PDF Splitter"
      subtitle="Break a PDF into individual pages, packaged into a ZIP — no upload, no sign up, no limit."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Split a PDF into separate pages without uploading it
            </h2>
            <p className="mt-2">
              Sometimes you only need one page out of a much longer PDF — a single invoice from a
              year-end statement, one contract page to sign, or a specific report out of a bundled
              document. This tool splits every page of a PDF into its own file, all done directly inside
              your browser. There's no upload, no processing queue, and no copy of your document left
              behind on a server afterward.
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
                <strong className="text-slate-200">Click "Split."</strong> Every page is turned into its
                own individual PDF file.
              </li>
              <li>
                <strong className="text-slate-200">Download the ZIP.</strong> All the split pages are
                packaged together, ready to unzip and use whichever ones you need.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common reasons to split a PDF</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Pulling one page out of a scanned multi-page document to send separately.</li>
              <li>Breaking a long report into individual sections to share with different people.</li>
              <li>Separating a bundled statement into single-page files for record keeping.</li>
              <li>Extracting a signature page from a longer contract.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">No quality loss</h2>
            <p className="mt-2">
              Each page is copied out of the original PDF exactly as it was — nothing is re-rendered,
              compressed, or altered in the process, so text stays sharp and images stay full quality in
              every split file.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your file never leaves your device</h2>
            <p className="mt-2">
              Because splitting happens locally, this tool never sees or stores the document you upload
              here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Tips for working with the split files</h2>
            <p className="mt-2">
              Once you've unzipped the result, each file is named with its original position (
              <code className="rounded bg-slate-900 px-1 py-0.5 text-[11px] text-slate-300">page-1.pdf</code>,{" "}
              <code className="rounded bg-slate-900 px-1 py-0.5 text-[11px] text-slate-300">page-2.pdf</code>, and
              so on), so it's easy to find the exact page you need without opening each one. If you only
              needed one or two pages out of a long document, you can simply delete the rest from the
              extracted folder — there's no need to re-run the tool with a smaller selection. And if you
              later need those same pages back together as a single file, this site's{" "}
              <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                PDF Merger
              </Link>{" "}
              can recombine any subset of them in whatever order you choose.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <PdfSplitterClient />
    </ToolPageShell>
  );
}

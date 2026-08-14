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

const COMPARISON_ROWS = [
  { label: "Requires an account", them: "Often", us: "Never" },
  { label: "Files uploaded to a server", them: "Yes", us: "No — stays on your device" },
  { label: "Daily merge limit", them: "Common (2–3 free/day)", us: "None" },
  { label: "Watermark on result", them: "Sometimes", us: "Never" },
  { label: "Reorder pages before merging", them: "Varies", us: "Yes, always" },
];

export default function PdfMergerPage() {
  return (
    <ToolPageShell
      title="Free PDF Merger"
      subtitle="Combine multiple PDF files into one, in the order you choose — no upload, no sign up, no watermark."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick example</h2>
            <p className="mt-2">
              Say you've scanned a signed contract as three separate pages, and you need to send it as
              one file. Drop all three into the box above, drag the signature page to wherever it
              belongs in the sequence, and click Merge. A few seconds later you have a single PDF —
              nothing uploaded, no account created, no wait for a server to process it, since your own
              browser did the work.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How this compares to a typical online PDF merger</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="py-2 pr-4 font-medium"> </th>
                    <th className="py-2 pr-4 font-medium">Typical free PDF site</th>
                    <th className="py-2 font-medium text-amber-400">QuickZeta</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-slate-900">
                      <td className="py-2 pr-4 text-slate-400">{row.label}</td>
                      <td className="py-2 pr-4">{row.them}</td>
                      <td className="py-2 font-medium text-slate-100">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What actually happens when you click "Merge"</h2>
            <p className="mt-2">
              Your browser reads each PDF's raw page data using an open-source library called pdf-lib,
              copies every page (unchanged, at full quality) into a brand-new PDF document in the order
              you set, and hands you the result as a downloadable file — all inside a single browser tab.
              There's no intermediate upload step because there's nothing to upload to: the entire
              operation is JavaScript running locally, the same way a spreadsheet formula recalculates
              instantly on your screen without contacting a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Steps</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Drag in two or more PDF files, or tap to select them from your device.</li>
              <li>Use the up/down arrows to set the exact order pages should appear in the final file.</li>
              <li>Click "Merge," then download — the result is ready to send or print immediately.</li>
            </ol>
            <p className="mt-2 text-xs text-slate-500">
              Tip: if you're combining a large batch, it's often easier to add them roughly in order
              first, then use the arrows to nudge just the one or two that are out of place.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Who ends up using this</h2>
            <p className="mt-2">
              Freelancers combining a signed contract's scattered pages into one file, students merging
              chapters or group project sections submitted separately, job seekers joining a cover letter
              and resume into a single attachment, and anyone bundling several receipts into one PDF for
              an expense report all land on this tool for roughly the same reason: a stack of separate
              PDFs needs to become exactly one, without losing quality or adding a stray watermark.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Privacy, in one paragraph</h2>
            <p className="mt-2">
              This tool never sees your files — merging happens entirely on your device, so there's
              nothing for us to store, log, or lose. Full details are in the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>
              .
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

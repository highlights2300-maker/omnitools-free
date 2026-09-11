import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import FileArchiverClient from "./FileArchiverClient";

export const metadata = {
  title: "Free File Archiver Online — Zip Files, No Upload | QuickZeta",
  description:
    "Combine several files into one ZIP archive, free, with no upload and no sign up. Processed entirely in your browser.",
  keywords: [
    "free file archiver online",
    "zip files no upload",
    "create zip archive free no sign up",
    "combine files into zip online",
    "compress files browser",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/file-archiver" },
  openGraph: {
    title: "Free File Archiver Online — Zip Files, No Upload",
    description: "Combine several files into one ZIP archive, entirely in your browser.",
    url: "https://quickzeta.com/tools/file-archiver",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this file archiver really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many files or how large an archive you can create.",
  },
  {
    q: "Do you upload my files to a server?",
    a: "No. The ZIP archive is built directly in your browser — none of your files are ever transmitted anywhere.",
  },
  {
    q: "Will zipping my files actually make them smaller?",
    a: "It depends on the file types. Text, spreadsheets, and uncompressed documents often shrink noticeably. Files that are already compressed — JPGs, MP3s, most videos, and existing ZIPs — will barely shrink at all, since there's little redundant data left to compress. Zipping those is still useful for bundling multiple files into one, just don't expect a big size reduction.",
  },
  {
    q: "Can I add any file type?",
    a: "Yes — the archiver bundles whatever files you add, regardless of type, into one ZIP.",
  },
];

export default function FileArchiverPage() {
  return (
    <ToolPageShell
      title="Free File Archiver"
      subtitle="Bundle several files into one ZIP archive — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              One archive instead of a dozen attachments
            </h2>
            <p className="mt-2">
              Sending several files at once, or just tidying a folder into one package, usually calls for
              a ZIP archive. This tool builds one directly in your browser — add your files, download the
              archive, with nothing ever uploaded in the process.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Add the files you want to bundle together.</li>
              <li>Click to build the archive.</li>
              <li>Download the finished ZIP file.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Bundling several documents or images into one download for a client.</li>
              <li>Packaging a folder of files before emailing them as a single attachment.</li>
              <li>Archiving a project's files together for storage or backup.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No file count or size limit enforced</li>
                  <li>Works with any file type</li>
                  <li>Instant — no upload wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No password protection or encryption on the archive</li>
                  <li>Already-compressed files won't shrink meaningfully</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">When zipping actually shrinks a file, and when it doesn't</h2>
            <p className="mt-2">
              It's a common assumption that zipping always makes files smaller, but that depends heavily
              on what's inside. Text files, spreadsheets, and uncompressed documents contain a lot of
              repetitive, predictable data — exactly what ZIP compression is good at squeezing down. Files
              that are already compressed, like JPGs, MP3s, most video, or another ZIP, have already had
              their redundancy squeezed out, so archiving them again barely changes the size. Zipping
              those files is still genuinely useful for bundling several into one package, just not for
              shrinking them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Building a batch of documents to send together? Combine PDFs first with{" "}
              <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                PDF Merger
              </Link>
              , or compress images with{" "}
              <Link href="/tools/image-compressor" className="text-amber-400 underline underline-offset-2">
                Image Compressor
              </Link>{" "}
              before archiving everything together.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="file-archiver" />
        </>
      }
    >
      <FileArchiverClient />
    </ToolPageShell>
  );
}

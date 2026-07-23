import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import FileArchiverClient from "./FileArchiverClient";

export const metadata = {
  title: "Free File Archiver Online — Zip Files, No Upload | QuickZeta",
  description:
    "Zip up multiple files into one archive, free, with no upload and no sign up. Any file type, packaged entirely in your browser.",
  keywords: [
    "free file archiver online",
    "zip files no upload",
    "create zip file no sign up",
    "combine files into zip free",
    "online zip maker no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/file-archiver" },
  openGraph: {
    title: "Free File Archiver Online — Zip Files, No Upload",
    description: "Zip up multiple files into one archive, packaged entirely in your browser.",
    url: "https://quickzeta.com/tools/file-archiver",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this file archiver really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many ZIP files you can create.",
  },
  {
    q: "Do you upload my files to a server?",
    a: "No. The ZIP file is built directly inside your browser — your files are never sent anywhere.",
  },
  {
    q: "What types of files can I zip?",
    a: "Any file type — documents, images, PDFs, spreadsheets, or a mix of different types together in the same archive.",
  },
  {
    q: "Is there a limit on how many files or how large they can be?",
    a: "No fixed limit is enforced, though very large batches will naturally take longer to zip since your own device is doing the work rather than a server.",
  },
  {
    q: "Can I rename the archive before downloading it?",
    a: "Yes — type whatever name you'd like into the archive name field before clicking to zip your files.",
  },
];

export default function FileArchiverPage() {
  return (
    <ToolPageShell
      title="Free File Archiver"
      subtitle="Zip up any files into one archive — no upload, no sign up, no limit."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Zip files together without uploading them
            </h2>
            <p className="mt-2">
              Combining several files into a single ZIP archive is a common small task, usually needed
              before emailing a batch of documents or uploading multiple files somewhere that only
              accepts one attachment at a time. This tool builds the ZIP file directly inside your
              browser, so your files never leave your device at any point in the process.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Add your files.</strong> Drag in any mix of files, or
                tap to select them from your device.
              </li>
              <li>
                <strong className="text-slate-200">Name the archive.</strong> Type whatever name you'd
                like for the resulting ZIP file.
              </li>
              <li>
                <strong className="text-slate-200">Zip and download.</strong> Click "Zip files" and save
                the finished archive.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Bundling several documents into one attachment for an email.</li>
              <li>Packaging a set of photos to upload somewhere that only accepts one file.</li>
              <li>Archiving a mix of files together for backup or storage.</li>
              <li>
                Combining outputs from other tools on this site — like a{" "}
                <Link href="/tools/pdf-splitter" className="text-amber-400 underline underline-offset-2">
                  split PDF
                </Link>{" "}
                — into one downloadable package.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your files never leave your device</h2>
            <p className="mt-2">
              Because the ZIP is created locally, this tool never sees or stores the files you archive
              here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why zip files in the first place</h2>
            <p className="mt-2">
              A ZIP archive bundles multiple files into one, which makes them easier to send, upload, or
              store as a single unit rather than juggling several separate attachments. Many ZIP formats
              also apply light compression, so the combined archive can end up somewhat smaller than the
              sum of the original files — useful when you're working against an email attachment size
              limit or a slow connection. It also keeps a folder structure intact if you're archiving
              several related files together, so the recipient gets everything organized the way you
              packaged it, rather than a scattered pile of separate attachments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Opening a ZIP file afterward</h2>
            <p className="mt-2">
              Once downloaded, a ZIP file can be opened natively on both Windows and Mac without any
              extra software — right-click (or double-click on Mac) and choose "Extract" or "Extract
              All" to unpack the individual files back out. Most phones also support opening ZIP files
              directly through their default file manager app.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <FileArchiverClient />
    </ToolPageShell>
  );
}

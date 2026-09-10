import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PdfCompressorClient from "./PdfCompressorClient";

export const metadata = {
  title: "Free PDF Compressor Online — Shrink File Size, No Upload | QuickZeta",
  description:
    "Compress a PDF to a smaller file size, free, with no upload and no sign up. Adjust the quality tradeoff yourself — processed entirely in your browser.",
  keywords: [
    "free pdf compressor online",
    "reduce pdf file size no upload",
    "shrink pdf free no sign up",
    "compress pdf for email",
    "pdf size reducer online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/pdf-compressor" },
  openGraph: {
    title: "Free PDF Compressor Online — Shrink File Size, No Upload",
    description: "Compress a PDF to a smaller file size entirely in your browser.",
    url: "https://quickzeta.com/tools/pdf-compressor",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this PDF compressor really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many files you can compress.",
  },
  {
    q: "Do you upload my PDF to a server?",
    a: "No. Compression happens entirely inside your browser — nothing is sent anywhere, and there's no upload wait even for larger files.",
  },
  {
    q: "Why does compressing a PDF actually shrink the file?",
    a: "Most of a PDF's file size usually comes from embedded images, not the text. This tool re-renders each page and re-encodes those images at a lower quality setting, which is where the real size reduction comes from — the text itself was already efficiently stored to begin with.",
  },
  {
    q: "Will my text stay sharp, or does compression blur everything?",
    a: "Text stays sharp in most cases, since it's rendered rather than stored as a raster image. What changes is primarily photo and image quality within the document — the more aggressive the compression, the more visible that becomes.",
  },
  {
    q: "Why did my file barely shrink at all?",
    a: "If your PDF is mostly text with few or no images, there often isn't much size to recover — text-heavy PDFs are already compact. This tool makes the biggest difference on PDFs containing scanned pages or embedded photos.",
  },
  {
    q: "Is there a file size limit?",
    a: "No hard limit, though very large PDFs with many pages will take longer to process since your own device is doing the rendering work.",
  },
];

export default function PdfCompressorPage() {
  return (
    <ToolPageShell
      title="Free PDF Compressor"
      subtitle="Shrink a PDF's file size with a quality tradeoff you control — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              When "too large to email" is the actual problem
            </h2>
            <p className="mt-2">
              A PDF that's too big to attach to an email, too slow to upload to a form, or simply taking
              up more storage than it should is one of the most common everyday document annoyances.
              This tool shrinks a PDF's file size directly in your browser, letting you choose how
              aggressively to compress it, without ever sending the original file to a server first.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where a PDF's file size actually comes from</h2>
            <p className="mt-2">
              It's a common misconception that a PDF is "just text," but in practice most of a document's
              file size usually comes from embedded images — scanned pages, photos, screenshots — not the
              text itself, which is already stored efficiently. This tool works by re-rendering each page
              and re-encoding its images at a chosen quality level, which is exactly where the real size
              reduction comes from. A ten-page text memo won't shrink much; a ten-page scanned document
              often will, substantially.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the PDF you want to shrink.</li>
              <li>Choose a compression level — higher compression means a smaller file but more visible image quality loss.</li>
              <li>Download the result and compare the before-and-after file size.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>You choose the exact quality-versus-size tradeoff</li>
                  <li>No file ever uploaded, so no size cap tied to a plan</li>
                  <li>Works well on scanned or photo-heavy PDFs specifically</li>
                  <li>Instant — no server queue to wait behind</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Text-only PDFs won't shrink much — there's little to compress</li>
                  <li>Aggressive compression visibly softens embedded images</li>
                  <li>Fillable form fields aren't preserved after re-rendering</li>
                  <li>Large, many-page files take longer on older devices</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Picking a compression level</h2>
            <p className="mt-2">
              For a document that's mostly text with a few images, a lighter setting usually keeps things
              looking clean while still trimming some size. For a scanned packet or a PDF full of photos
              where file size matters more than pixel-perfect image quality — attaching to an email,
              uploading to a form with a size cap — a more aggressive setting is usually the right call.
              If you're not sure, start moderate and check the result before committing to the most
              aggressive option.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              If you're compressing a document made up of several parts, it's often easier to{" "}
              <Link href="/tools/pdf-merger" className="text-amber-400 underline underline-offset-2">
                merge them first
              </Link>{" "}
              and compress the combined file once, rather than compressing each piece separately. Going
              the other direction, if you need to shrink just part of a larger document, use{" "}
              <Link href="/tools/pdf-splitter" className="text-amber-400 underline underline-offset-2">
                PDF Splitter
              </Link>{" "}
              first to isolate the pages that actually need it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing leaves your device</h2>
            <p className="mt-2">
              Compression happens locally — see the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="pdf-compressor" />
        </>
      }
    >
      <PdfCompressorClient />
    </ToolPageShell>
  );
}

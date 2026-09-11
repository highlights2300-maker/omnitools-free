import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ImageFormatConverterClient from "./ImageFormatConverterClient";

export const metadata = {
  title: "Free Image Format Converter Online — JPG, PNG, WebP | QuickZeta",
  description:
    "Convert between JPG, PNG, and WebP, free, with no upload and no sign up. Processed entirely in your browser.",
  keywords: [
    "free image format converter online",
    "jpg to png no upload",
    "convert to webp free no sign up",
    "png to jpg converter online",
    "image converter no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-format-converter" },
  openGraph: {
    title: "Free Image Format Converter Online — JPG, PNG, WebP",
    description: "Convert between JPG, PNG, and WebP entirely in your browser.",
    url: "https://quickzeta.com/tools/image-format-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many images you can convert.",
  },
  {
    q: "Do you upload my images to a server?",
    a: "No. Conversion uses the Canvas feature built into your browser — nothing is ever uploaded.",
  },
  {
    q: "Will converting PNG to JPG lose the transparent background?",
    a: "Yes — JPG doesn't support transparency at all, so any transparent area gets filled with a solid color (usually white) during conversion. If you need to keep transparency, WebP and PNG both support it; JPG never does, regardless of which tool performs the conversion.",
  },
  {
    q: "Why would I choose WebP over JPG or PNG?",
    a: "WebP generally achieves a smaller file size than JPG at similar visual quality, and unlike JPG, it also supports transparency. The tradeoff is that a small number of older software tools and some print workflows still expect JPG or PNG specifically, so WebP isn't universally the right default despite its technical advantages.",
  },
];

export default function ImageFormatConverterPage() {
  return (
    <ToolPageShell
      title="Free Image Format Converter"
      subtitle="Convert between JPG, PNG, and WebP — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              The right format for where an image is going
            </h2>
            <p className="mt-2">
              A platform that only accepts JPG, a design tool that needs PNG transparency, a website
              that's faster with WebP — the right image format depends entirely on where it's headed
              next. This tool converts between the three directly in your browser, with nothing uploaded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the image you want to convert.</li>
              <li>Choose the target format.</li>
              <li>Download the result.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Transparency preserved correctly between PNG and WebP</li>
                  <li>No file count limit, instant conversion</li>
                  <li>No upload wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Converting to JPG always removes transparency</li>
                  <li>Doesn't adjust image quality/compression settings beyond format</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick word on browser support</h2>
            <p className="mt-2">
              WebP is now broadly supported across all major modern browsers, but it's worth double
              checking compatibility if the image is headed somewhere with an older or more restrictive
              rendering environment — email clients in particular can be inconsistent about WebP support,
              which is one reason JPG and PNG remain common safe defaults for that specific use case.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What changes, and what stays the same</h2>
            <p className="mt-2">
              The one change worth knowing about upfront: JPG never supports transparency, in any tool,
              because it isn't part of the format's specification. Converting a transparent PNG to JPG
              will fill the transparent area with a solid background color. PNG and WebP both genuinely
              support transparency, so converting between those two preserves it correctly. Beyond that,
              image dimensions and content stay the same — only the underlying file format and its
              specific tradeoffs change.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once converted, shrink the file further with{" "}
              <Link href="/tools/image-compressor" className="text-amber-400 underline underline-offset-2">
                Image Compressor
              </Link>
              , or crop it to a specific size with{" "}
              <Link href="/tools/image-cropper" className="text-amber-400 underline underline-offset-2">
                Image Cropper
              </Link>
              .
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="image-format-converter" />
        </>
      }
    >
      <ImageFormatConverterClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import ImageFormatConverterClient from "./ImageFormatConverterClient";

export const metadata = {
  title: "Free Image Format Converter Online — JPG, PNG, WebP, BMP | QuickZeta",
  description:
    "Convert an image between JPG, PNG, WebP, and BMP, free, with no upload and no sign up. See the before-and-after file size instantly, in your browser.",
  keywords: [
    "free image format converter online",
    "jpg to png converter no upload",
    "png to webp converter free",
    "convert image format no sign up",
    "bmp to jpg converter online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-format-converter" },
  openGraph: {
    title: "Free Image Format Converter Online — JPG, PNG, WebP, BMP",
    description: "Convert an image between common formats entirely in your browser.",
    url: "https://quickzeta.com/tools/image-format-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image format converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many images you can convert.",
  },
  {
    q: "Do you upload my image to a server?",
    a: "No. The conversion happens directly inside your browser using the Canvas feature built into every modern browser — your image is never sent anywhere.",
  },
  {
    q: "Which format should I choose?",
    a: "Use JPG for photos where a small amount of quality loss won't be noticeable and you want a smaller file. Use PNG when you need transparency or perfectly sharp edges, like a logo or screenshot. Use WebP for the best balance of quality and file size if the platform you're using supports it. BMP is mostly useful for compatibility with older or specialized software.",
  },
  {
    q: "What happens to transparency when converting to JPG?",
    a: "JPG doesn't support transparency at all, so any transparent areas are automatically filled with white during conversion. If you need to keep transparency, convert to PNG or WebP instead.",
  },
  {
    q: "Will converting reduce the quality of my image?",
    a: "Converting to PNG or BMP is lossless, so no quality is lost. Converting to JPG or WebP uses a small amount of compression, similar to the site's own Image Compressor, though usually not enough to be visibly noticeable at the default setting used here.",
  },
];

export default function ImageFormatConverterPage() {
  return (
    <ToolPageShell
      title="Free Image Format Converter"
      subtitle="Convert between JPG, PNG, WebP, and BMP with a live before-and-after preview — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Convert image formats without uploading anywhere
            </h2>
            <p className="mt-2">
              Different platforms and tools sometimes only accept specific image formats, or you might
              simply want a smaller file than what your camera or screenshot tool produced by default.
              This tool converts between the most common formats directly inside your browser — nothing
              is uploaded to a server at any point, and you can compare the original and converted file
              size side by side before downloading.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose an image.</strong> Drag one in or tap to select
                a JPG, PNG, WebP, or BMP file.
              </li>
              <li>
                <strong className="text-slate-200">Pick a target format.</strong> The preview and file
                size update instantly as you switch between options.
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> Save the converted
                image in its new format.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing the right format</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">JPG</strong> — smallest file size for photos, but no
                transparency support.
              </li>
              <li>
                <strong className="text-slate-200">PNG</strong> — lossless quality and full transparency
                support, at a larger file size.
              </li>
              <li>
                <strong className="text-slate-200">WebP</strong> — usually the best size-to-quality
                ratio, with transparency support, if your platform accepts it.
              </li>
              <li>
                <strong className="text-slate-200">BMP</strong> — an older, uncompressed format mainly
                useful for compatibility with specific legacy software.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with other image tools</h2>
            <p className="mt-2">
              After converting, the site's{" "}
              <Link href="/tools/image-compressor" className="text-amber-400 underline underline-offset-2">
                Image Compressor
              </Link>{" "}
              can shrink the file size further, or the{" "}
              <Link href="/tools/image-cropper" className="text-amber-400 underline underline-offset-2">
                Image Cropper
              </Link>{" "}
              can resize it to an exact dimension.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because everything runs locally, this tool never sees, stores, or has access to the images
              you convert here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why the output looks the same but the format is different</h2>
            <p className="mt-2">
              After converting, the image should look visually identical (aside from a JPG conversion
              losing transparency, as noted above) — the file format is really a question of how the
              image data is stored and compressed, not how it appears. This matters most when a specific
              website, app, or printing service requires a particular format before it will accept an
              upload, or when a smaller file size is needed without changing what the image actually
              looks like.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <ImageFormatConverterClient />
    </ToolPageShell>
  );
}

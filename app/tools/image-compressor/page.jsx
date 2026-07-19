import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata = {
  title: "Free Image Compressor Online — No Upload, Instant Results | QuickZeta",
  description:
    "Compress JPG, PNG, or WebP images online for free, with no upload and no sign up. Reduce file size while previewing the quality live, right in your browser.",
  keywords: [
    "free image compressor online",
    "reduce image file size no upload",
    "compress jpg online free",
    "compress png without losing quality",
    "image compressor no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-compressor" },
  openGraph: {
    title: "Free Image Compressor Online — No Upload, Instant Results",
    description: "Compress images entirely in your browser. Nothing is ever uploaded to a server.",
    url: "https://quickzeta.com/tools/image-compressor",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image compressor really free, with no sign up?",
    a: "Yes. There's no account, no email required, and no limit on how many images you can compress — use it as often as you'd like.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. The compression happens entirely inside your browser using your device's own processing power. Your image is never sent anywhere, which also means it's typically faster than uploading to a remote server and waiting for a response.",
  },
  {
    q: "Will compressing lower the quality of my image?",
    a: "It depends on the quality setting you choose. Sliding it lower reduces file size more aggressively; keeping it high (around 80-90%) usually shrinks file size noticeably with almost no visible difference. The live preview lets you compare before downloading.",
  },
  {
    q: "What's the difference between JPG, WebP, and PNG here?",
    a: "JPG and WebP both use lossy compression and produce the smallest files, with WebP generally getting a smaller file at the same visual quality. PNG is lossless, so it preserves every detail perfectly but produces a noticeably larger file — best reserved for images that need transparency or sharp edges like screenshots or logos.",
  },
  {
    q: "Is there a file size limit?",
    a: "No hard limit is enforced by this tool, though very large images will naturally take a little longer to process since your own device is doing the work rather than a server.",
  },
];

export default function ImageCompressorPage() {
  return (
    <ToolPageShell
      title="Free Image Compressor"
      subtitle="Shrink JPG, PNG, or WebP files instantly, with a live before-and-after preview — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Compress images online without uploading them anywhere
            </h2>
            <p className="mt-2">
              Most free image compressors ask you to upload your photo to their server first, wait for it
              to process, then download the result — which means your image briefly sits on a computer
              you have no control over. This tool works differently: the actual compression happens
              locally, inside your own browser, using the same image-processing capability built into
              every modern browser. Nothing is uploaded, so there's nothing to wait on and nothing left
              behind on a server afterward.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose an image.</strong> Drag one in or tap to select
                a JPG, PNG, or WebP file from your device.
              </li>
              <li>
                <strong className="text-slate-200">Adjust quality and format.</strong> Use the quality
                slider to balance file size against visual detail, and pick the output format that suits
                your use case.
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> Compare the before-and-
                after file size live, then download the compressed version whenever it looks right.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">When compressing images actually matters</h2>
            <p className="mt-2">
              Large, uncompressed images are one of the most common reasons a website loads slowly, an
              email attachment bounces, or a form upload times out. Compressing before you send or
              publish an image typically cuts file size substantially with little to no visible quality
              loss — useful for blog posts, product photos, portfolio sites, or simply keeping your phone's
              storage from filling up with full-resolution camera photos you don't need at full size.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing the right format</h2>
            <p className="mt-2">
              If you're not sure which output format to pick: use <strong className="text-slate-200">JPG</strong>{" "}
              for photos where a tiny amount of quality loss is invisible to the eye, use{" "}
              <strong className="text-slate-200">WebP</strong> if the platform you're uploading to supports
              it (most modern websites do) for the best size-to-quality ratio, and use{" "}
              <strong className="text-slate-200">PNG</strong> only when you specifically need transparency
              or perfectly sharp edges, like a logo or a screenshot with text.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because everything runs locally, this tool never sees, stores, or has access to the images
              you compress here. See our{" "}
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
      <ImageCompressorClient />
    </ToolPageShell>
  );
}

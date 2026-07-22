import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import ImageCropperClient from "./ImageCropperClient";

export const metadata = {
  title: "Free Image Cropper & Resizer Online — No Upload | QuickZeta",
  description:
    "Crop and resize an image to an exact size, free, with no upload and no sign up. Adjust the crop live and export at any dimension — entirely in your browser.",
  keywords: [
    "free image cropper online",
    "resize image to exact size no upload",
    "crop photo online free",
    "image resizer no sign up",
    "resize image for instagram free",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-cropper" },
  openGraph: {
    title: "Free Image Cropper & Resizer Online — No Upload",
    description: "Crop and resize an image to any exact dimension, entirely in your browser.",
    url: "https://quickzeta.com/tools/image-cropper",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image cropper really free, with no sign up?",
    a: "Yes. There's no account, no watermark, and no limit on how many images you can crop or resize.",
  },
  {
    q: "Do you upload my photo to a server?",
    a: "No. Cropping and resizing both happen directly inside your browser using the Canvas feature built into every modern browser. Your image is never sent anywhere.",
  },
  {
    q: "Can I resize to an exact pixel size, like for a profile photo or a listing?",
    a: "Yes — set the exact width you need in the export field, and the height either follows automatically if \"lock aspect ratio\" is on, or can be set independently if you turn that off.",
  },
  {
    q: "What's the difference between the crop sliders and the export size?",
    a: "The four sliders (top, bottom, left, right) trim down which part of the original image is kept. The export width and height then control what final pixel dimensions that cropped region is resized to — you can crop a large photo down to a square, then export it at exactly 500×500, for example.",
  },
  {
    q: "Which format should I export as?",
    a: "JPG works well for most photos and produces a smaller file. PNG is better if you need transparency or perfectly sharp edges (like a screenshot or logo). WebP usually gives the best balance of quality and file size if the platform you're using supports it.",
  },
];

export default function ImageCropperPage() {
  return (
    <ToolPageShell
      title="Free Image Cropper & Resizer"
      subtitle="Crop and resize an image to an exact size, with a live preview — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Crop and resize an image without uploading it anywhere
            </h2>
            <p className="mt-2">
              Whether you need to trim a photo down to a square for a profile picture, cut out unwanted
              edges before sharing an image, or resize something to an exact pixel size for a listing or
              form upload, this tool does it all directly inside your browser. Nothing is uploaded to a
              server — the crop and resize happen locally, using your device's own processing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose an image.</strong> Drag one in or tap to select
                it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Adjust the crop.</strong> Use the four sliders to trim
                the top, bottom, left, and right edges — the preview updates live.
              </li>
              <li>
                <strong className="text-slate-200">Set an exact export size.</strong> Type a specific
                width, and the height follows automatically to preserve the crop's aspect ratio (or turn
                that off to set both independently).
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> Pick JPG, WebP, or PNG
                and save the finished image.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Cropping a photo to a square for a profile picture or avatar.</li>
              <li>Resizing a product photo to an exact pixel size required by a marketplace listing.</li>
              <li>Trimming unwanted background or edges out of a screenshot before sharing it.</li>
              <li>
                Preparing an image for the site's own{" "}
                <Link href="/tools/image-compressor" className="text-amber-400 underline underline-offset-2">
                  Image Compressor
                </Link>{" "}
                afterward, to also reduce file size.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because everything runs locally, this tool never sees, stores, or has access to the images
              you crop or resize here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common target sizes</h2>
            <p className="mt-2">
              If you're not sure what dimensions to export at, a few common targets: a square profile
              picture works well anywhere from 400×400 to 800×800 pixels, a typical social media post
              image is often 1080×1080 for a square post or 1080×1350 for a portrait-oriented one, and a
              standard passport or ID-style photo is usually around 600×600. Marketplace and e-commerce
              listings frequently ask for a minimum of 1000×1000, since that gives buyers room to zoom in
              without the image looking blurry.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <ImageCropperClient />
    </ToolPageShell>
  );
}

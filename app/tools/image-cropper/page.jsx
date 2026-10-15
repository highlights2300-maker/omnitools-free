import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ImageCropperClient from "./ImageCropperClient";

export const metadata = {
  title: "Free Photo & Image Cropper Online – No Upload | QuickZeta",
  description:
    "Crop a photo to 1:1, 4:5, 16:9 or any ratio, set exact pixel size, rotate and download as JPG, PNG or WebP. Free, no upload, no sign up.",
  keywords: [
    "free image cropper online",
    "photo cropper online free",
    "crop photo online",
    "resize image no upload",
    "crop image to exact size free",
    "online photo cropper",
    "crop for instagram profile picture",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-cropper" },
  openGraph: {
    title: "Free Photo & Image Cropper Online – No Upload",
    description: "Crop and resize a photo or image to exact dimensions entirely in your browser.",
    url: "https://quickzeta.com/tools/image-cropper",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image cropper really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many images you can crop or resize.",
  },
  {
    q: "Do you upload my photo to a server?",
    a: "No. Cropping and resizing happen directly in your browser using the Canvas feature built into every modern browser — your image is never sent anywhere.",
  },
  {
    q: "What's the difference between cropping and resizing?",
    a: "Cropping cuts away part of the image, changing what's visible but not the resolution of what remains. Resizing scales the entire image up or down without removing anything. This tool does both — crop to the area and ratio you want, then set the final output dimensions.",
  },
  {
    q: "Will resizing up make a small image look blurry?",
    a: "Yes, unavoidably — enlarging an image beyond its original resolution means the tool has to invent new pixel detail that wasn't there to begin with, which softens the result. Resizing down (shrinking a large image) doesn't have this problem, since there's genuine detail to work with.",
  },
  {
    q: "Do the presets match Instagram, YouTube or other platform sizes?",
    a: "The presets are aspect ratios (for example 1:1 for a square avatar, 4:5 for a portrait post, 16:9 for video thumbnails), not exact platform pixel sizes. Pick the ratio, then type the width you need. Platforms change their specs from time to time, so check the current size for your upload.",
  },
  {
    q: "What format does the cropped image download as?",
    a: "By default it matches your original (JPG stays JPG, PNG stays PNG, WebP stays WebP), and you can switch to JPG, PNG or WebP before downloading. JPG has no transparency, so transparent areas are filled white; PNG and WebP keep it.",
  },
];

export default function ImageCropperPage() {
  return (
    <ToolPageShell
      slug="image-cropper"
      description={metadata.description}
      title="Free Photo & Image Cropper"
      subtitle="Crop to any ratio and resize to exact dimensions — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              The wrong dimensions is a surprisingly common problem
            </h2>
            <p className="mt-2">
              A photo that's the wrong aspect ratio for a profile picture, a screenshot that needs
              trimming before it makes sense in a document, an image too large to attach anywhere — these
              are small, constant annoyances. This tool crops to a free-form area or a fixed ratio and sets the
              exact output size directly in your browser, so nothing needs to be uploaded just to fix a
              size problem.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Choose the image you want to crop. It opens in your browser; QuickZeta does not receive it.</li>
              <li>Pick a ratio (Free, 1:1, 4:5, 3:2, 4:3, 16:9, 9:16 or a custom one), then drag the photo to position it and use zoom to frame it. Rotate it if it's sideways.</li>
              <li>Optionally set the exact output width and height, choose JPG, PNG or WebP, and download.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What size you get: three worked examples</h2>
            <p className="mt-2">
              With a ratio selected, the crop box is the largest area of that shape that fits inside your
              photo. Take a 4000 × 3000 px landscape photo:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">1:1 (square):</strong> a 3000 × 3000 px square. Drag
                the photo to choose which part of the width is kept.
              </li>
              <li>
                <strong className="text-slate-200">16:9 (wide):</strong> the full 4000 px width with a
                height of 2250 px.
              </li>
              <li>
                <strong className="text-slate-200">4:5 (portrait):</strong> a 2400 × 3000 px crop.
              </li>
            </ul>
            <p className="mt-2">
              These are the largest sizes. Type a smaller width (for example 1080) and the height follows
              the ratio, so the photo is scaled down rather than stretched. Zoom in to frame a tighter area;
              the crop gets smaller and the output keeps the same ratio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Supported formats</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">Open:</strong> any image your browser can display.
                JPG, PNG and WebP work everywhere. Other types, such as HEIC from some phones, depend on
                your browser; if one won't open, convert it first with the{" "}
                <Link href="/tools/image-format-converter" className="text-amber-400 underline underline-offset-2">
                  Image Format Converter
                </Link>
                .
              </li>
              <li>
                <strong className="text-slate-200">Save as:</strong> JPG, PNG or WebP. PNG and WebP keep
                transparent areas. JPG cannot, so transparent areas turn white.
              </li>
              <li>
                <strong className="text-slate-200">Limits:</strong> the output can be up to 16,384 px on
                a side (and 100 megapixels in total). Larger requests show a message instead of failing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Cropping versus resizing — not the same thing</h2>
            <p className="mt-2">
              These get used interchangeably in casual conversation, but they do different jobs. Cropping
              removes part of the image — cutting a wide photo down to just the subject, for instance —
              without changing the resolution of what's left. Resizing scales the whole image up or down
              without removing anything. Most real tasks need both: crop to the right composition and
              ratio first, then resize to the exact pixel dimensions a specific use case requires.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Exact pixel-dimension control, not just rough dragging</li>
                  <li>Common aspect-ratio presets plus a custom ratio</li>
                  <li>Keeps transparency when you export PNG or WebP</li>
                  <li>Instant preview, no upload wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Enlarging a small image beyond its resolution will look soft</li>
                  <li>Presets set the shape, not a platform's pixel size — enter the size you need</li>
                  <li>No content-aware fill — cropping simply removes, it doesn't extend</li>
                  <li>Output is limited to about 16,000 px per side by browser canvas limits</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick rule of thumb on resizing</h2>
            <p className="mt-2">
              Shrinking a large image down almost always looks clean, since there's real detail to work
              with. Enlarging a small image up is the direction to be cautious with — past a certain
              point, the tool has nothing but guesswork to fill in the missing detail, and the result
              gets visibly soft. If you're starting from a small source image, it's usually better to
              find a higher-resolution original than to force an upscale.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once an image is cropped to size, the site's{" "}
              <Link href="/tools/image-compressor" className="text-amber-400 underline underline-offset-2">
                Image Compressor
              </Link>{" "}
              can shrink the file size further before uploading it anywhere, and{" "}
              <Link href="/tools/background-remover" className="text-amber-400 underline underline-offset-2">
                Background Remover
              </Link>{" "}
              pairs well for profile pictures where isolating the subject matters.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing leaves your device</h2>
            <p className="mt-2">
              Cropping and resizing happen locally — see the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="image-cropper" />
        </>
      }
    >
      <ImageCropperClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ImageCropperClient from "./ImageCropperClient";

export const metadata = {
  title: "Free Image Cropper & Resizer Online — No Upload | QuickZeta",
  description:
    "Crop and resize an image to exact dimensions, free, with no upload and no sign up. Preset ratios for social media, avatars, and more — processed entirely in your browser.",
  keywords: [
    "free image cropper online",
    "resize image no upload",
    "crop image to exact size free",
    "image resizer no sign up",
    "crop for instagram profile picture",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-cropper" },
  openGraph: {
    title: "Free Image Cropper & Resizer Online — No Upload",
    description: "Crop and resize an image to exact dimensions entirely in your browser.",
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
    q: "Do the preset ratios match real platform requirements?",
    a: "Yes — the presets are based on commonly used, current dimensions for profile pictures, cover photos, and post formats on major platforms. Platforms occasionally adjust their exact specs, so it's worth a quick check if pixel-perfect precision matters for a specific upload.",
  },
  {
    q: "What format does the cropped image download as?",
    a: "The output keeps your original format by default (JPG stays JPG, PNG stays PNG), preserving transparency for PNG images. If you need a different format afterward, the site's Image Format Converter handles that conversion.",
  },
];

export default function ImageCropperPage() {
  return (
    <ToolPageShell
      title="Free Image Cropper & Resizer"
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
              are small, constant annoyances. This tool crops to any ratio and resizes to exact pixel
              dimensions directly in your browser, with common social media and avatar presets built in,
              so nothing needs to be uploaded just to fix a size problem.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the image you want to crop or resize.</li>
              <li>Drag the crop area, or pick a preset ratio for a specific platform.</li>
              <li>Set the exact output dimensions, then download the result.</li>
            </ol>
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
                  <li>Built-in presets for common platform requirements</li>
                  <li>Preserves PNG transparency through the crop</li>
                  <li>Instant preview, no upload wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Enlarging a small image beyond its resolution will look soft</li>
                  <li>Platform preset dimensions can change over time</li>
                  <li>No content-aware fill — cropping simply removes, it doesn't extend</li>
                  <li>Very high-resolution source images take a moment longer to process</li>
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

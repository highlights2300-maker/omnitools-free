import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PhotoCollageClient from "./PhotoCollageClient";

export const metadata = {
  title: "Free Photo Collage Maker — No Watermark | QuickZeta",
  description:
    "Combine up to 9 photos into a grid, row or column. Adjust spacing, rounded corners and background. Free, no watermark, no upload.",
  keywords: [
    "free photo collage maker online",
    "collage maker no watermark",
    "combine photos into grid free",
    "photo grid creator no sign up",
    "collage tool no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/photo-collage-maker" },
  openGraph: {
    title: "Free Photo Collage Maker Online — No Upload, No Watermark",
    description: "Combine up to 9 photos into one image, entirely in your browser.",
    url: "https://quickzeta.com/tools/photo-collage-maker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this collage maker really free, with no watermark?",
    a: "Yes. There's no account, no watermark, and no limit on how many collages you can make.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. The collage is assembled directly on a canvas in your browser — your photos are never sent anywhere.",
  },
  {
    q: "What happens if my photos are different sizes or aspect ratios?",
    a: "Each photo is centre-cropped to a square cell without stretching or squeezing it, so anything outside the centre square is cut off. Crop a photo first with the Image Cropper if you want to choose which part is kept.",
  },
  {
    q: "How many photos can I combine?",
    a: "Up to 9 photos per collage, from two side by side up to a 3×3 grid.",
  },
];

export default function PhotoCollageMakerPage() {
  return (
    <ToolPageShell
      slug="photo-collage-maker"
      description={metadata.description}
      title="Free Photo Collage Maker"
      subtitle="Combine up to 9 photos into a grid, row or column — no upload, no watermark, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Several photos, one clean composite
            </h2>
            <p className="mt-2">
              Turning a handful of separate photos into one shareable image — a before-and-after, a set
              of event photos, a product from multiple angles — usually means dedicated design software.
              This tool arranges photos into a grid, a single row or a single column directly in your
              browser, with no watermark stamped across the result.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Add 2 to 9 photos (JPG, PNG or WebP).</li>
              <li>Choose Grid, One row or One column, and use the arrows to reorder photos.</li>
              <li>Adjust spacing, rounded corners, background, size and format, then download.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing a layout</h2>
            <p className="mt-2">
              One row or one column works well for a before-and-after or a short sequence, where each
              photo should stay clearly readable. Grid suits larger sets where the overall impression
              matters more than any single image; if the last row isn't full, it is centred.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>A before-and-after comparison in a single shareable image.</li>
              <li>Combining event or travel photos into one summary image.</li>
              <li>Showing a product from multiple angles in one composite.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No watermark, ever</li>
                  <li>Spacing, rounded corners, background colour and output size controls</li>
                  <li>Instant — no account, no upload wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Three fixed layouts, not freeform positioning; up to 9 photos</li>
                  <li>Each photo is centre-cropped to a square, so edges may be cut off</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How mismatched photo sizes get handled</h2>
            <p className="mt-2">
              Real photos rarely share the exact same dimensions or aspect ratio, which would normally
              cause a naive grid layout to either stretch images awkwardly or leave uneven gaps. This tool
              handles that by cropping each photo to fill its cell — similar to how a phone's photo grid
              or a social media thumbnail crops rather than squeezes — so every cell fills cleanly without
              any photo looking distorted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Want a clean subject with no background clutter first? Run photos through{" "}
              <Link href="/tools/background-remover" className="text-amber-400 underline underline-offset-2">
                Background Remover
              </Link>{" "}
              before adding them to the collage, or add captions afterward with the{" "}
              <Link href="/tools/meme-generator" className="text-amber-400 underline underline-offset-2">
                Meme Generator
              </Link>
              .
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="photo-collage-maker" />
        </>
      }
    >
      <PhotoCollageClient />
    </ToolPageShell>
  );
}

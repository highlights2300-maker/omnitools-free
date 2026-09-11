import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import PhotoCollageClient from "./PhotoCollageClient";

export const metadata = {
  title: "Free Photo Collage Maker Online — No Upload, No Watermark | QuickZeta",
  description:
    "Arrange several photos into one grid layout, free, with no upload, no sign up, and no watermark. Processed entirely in your browser.",
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
    description: "Arrange several photos into one grid layout, entirely in your browser.",
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
    a: "Each photo is automatically cropped to fit its grid cell without distorting or stretching it — the tool crops the excess rather than squeezing the image to match, which is what would happen if it simply scaled each photo to fit.",
  },
  {
    q: "How many photos can I combine?",
    a: "Enough for the available grid layouts — from a simple two-photo side-by-side up to larger multi-photo grids.",
  },
];

export default function PhotoCollageMakerPage() {
  return (
    <ToolPageShell
      title="Free Photo Collage Maker"
      subtitle="Arrange several photos into one grid layout — no upload, no watermark, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Several photos, one clean composite
            </h2>
            <p className="mt-2">
              Turning a handful of separate photos into one shareable image — a before-and-after, a set
              of event photos, a product from multiple angles — usually means dedicated design software.
              This tool arranges photos into a grid layout directly in your browser, with no watermark
              stamped across the result.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Choose a grid layout.</li>
              <li>Add your photos into each cell.</li>
              <li>Download the finished collage.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing a layout</h2>
            <p className="mt-2">
              Simpler two- or three-photo layouts tend to work best when each individual photo needs to
              stay clearly readable — a before-and-after, for instance. Larger grid layouts suit a broader
              set of photos where the overall impression matters more than any single image standing out.
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
                  <li>Automatic smart cropping handles mismatched photo sizes</li>
                  <li>Instant — no account, no upload wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Fixed grid layouts, not fully freeform positioning</li>
                  <li>Cropping means some parts of a photo may not appear in the final collage</li>
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

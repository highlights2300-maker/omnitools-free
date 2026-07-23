import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import PhotoCollageClient from "./PhotoCollageClient";

export const metadata = {
  title: "Free Photo Collage Maker Online — No Upload, No Watermark | QuickZeta",
  description:
    "Arrange 2 to 9 photos into a clean grid collage, free, with no upload and no watermark. Adjust spacing and background color — entirely in your browser.",
  keywords: [
    "free photo collage maker online",
    "photo grid maker no watermark",
    "combine photos into one image free",
    "collage maker no sign up",
    "photo grid collage no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/photo-collage-maker" },
  openGraph: {
    title: "Free Photo Collage Maker Online — No Upload, No Watermark",
    description: "Arrange 2 to 9 photos into a clean grid collage, entirely in your browser.",
    url: "https://quickzeta.com/tools/photo-collage-maker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this photo collage maker really free, with no watermark?",
    a: "Yes. There's no account, no watermark on the result, and no limit on how many collages you can create.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. The collage is composited directly inside your browser — your photos are never sent anywhere.",
  },
  {
    q: "How many photos can I use?",
    a: "Between 2 and 9 photos. The grid layout automatically adjusts based on how many you add — for example, 4 photos arrange into a 2×2 grid, and 9 photos arrange into a 3×3 grid.",
  },
  {
    q: "Will my photos get squished or distorted to fit the grid?",
    a: "No. Each photo is cropped to fill its grid cell while keeping its original proportions intact, the same way a photo app crops a preview thumbnail — nothing gets stretched.",
  },
  {
    q: "Can I change the spacing and background color?",
    a: "Yes — the gap slider controls the spacing between photos, and the background color picker sets the color that shows through that gap and around the edges.",
  },
];

export default function PhotoCollageMakerPage() {
  return (
    <ToolPageShell
      title="Free Photo Collage Maker"
      subtitle="Arrange 2 to 9 photos into a clean grid — no upload, no watermark, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A grid collage maker with no watermark
            </h2>
            <p className="mt-2">
              Turning a handful of photos into a single shareable grid image is a common small task that
              a lot of free collage tools quietly complicate — either with a logo stamped across the
              result, or an upload step before you can download anything. This tool builds the collage
              entirely inside your browser instead, with a clean result and nothing added to it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Add 2 to 9 photos.</strong> Drag them in or tap to
                select from your device.
              </li>
              <li>
                <strong className="text-slate-200">Adjust the layout.</strong> Set the gap between photos
                and pick a background color.
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> Save the finished grid
                collage as a PNG.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How the grid layout works</h2>
            <p className="mt-2">
              The number of columns and rows adjusts automatically based on how many photos you add —
              2 or 3 photos arrange in a single row, 4 photos form a 2×2 square, and up to 9 photos fill
              out a 3×3 grid. Each photo is cropped (not stretched) to fill its cell evenly, so mismatched
              photo shapes and orientations still line up cleanly in the final grid.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Combining vacation or event photos into one shareable image.</li>
              <li>Building a simple before-and-after or side-by-side comparison grid.</li>
              <li>Creating a quick product photo grid for a listing or social post.</li>
              <li>
                Pairing with the site's own{" "}
                <Link href="/tools/image-cropper" className="text-amber-400 underline underline-offset-2">
                  Image Cropper
                </Link>{" "}
                first, to fine-tune individual photos before combining them.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because the collage is built locally, this tool never sees, stores, or has access to the
              photos you use here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting the best-looking collage</h2>
            <p className="mt-2">
              A collage tends to look most cohesive when the photos share a similar mood, lighting, or
              subject matter, rather than mixing very different styles side by side. Since each cell
              crops to a square, photos with the main subject centered will crop more predictably than
              ones with important detail right at the edges — worth keeping in mind if a particular photo
              gets cropped in a way you didn't expect, since you can always swap it out or try a
              different one before downloading.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <PhotoCollageClient />
    </ToolPageShell>
  );
}

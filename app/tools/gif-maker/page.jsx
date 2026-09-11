import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import GifMakerClient from "./GifMakerClient";

export const metadata = {
  title: "Free GIF Maker Online — Photos to Looping GIF, No Upload | QuickZeta",
  description:
    "Turn a sequence of photos into a looping GIF, free, with no upload and no sign up. Processed entirely in your browser.",
  keywords: [
    "free gif maker online",
    "photos to gif no upload",
    "create looping gif free no sign up",
    "gif creator online browser",
    "make gif from images",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/gif-maker" },
  openGraph: {
    title: "Free GIF Maker Online — Photos to Looping GIF, No Upload",
    description: "Turn a sequence of photos into a looping GIF, entirely in your browser.",
    url: "https://quickzeta.com/tools/gif-maker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this GIF maker really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many GIFs you can create.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. Frames are assembled into a GIF directly in your browser — nothing is ever uploaded.",
  },
  {
    q: "Why do some GIFs look a bit grainy or banded compared to the source photos?",
    a: "GIF is a genuinely old format with a real technical limit: each frame can use at most 256 colors, chosen from a much larger palette. Photos, which often contain millions of subtly different colors, have to be reduced down to fit that limit — this reduction is where slight graininess or color banding in smooth gradients (like a sky) comes from. It's an inherent property of the GIF format itself, not a flaw in how it was made.",
  },
  {
    q: "How many photos can I turn into a GIF?",
    a: "There's no fixed limit, though more frames means a larger file and longer processing time.",
  },
];

export default function GifMakerPage() {
  return (
    <ToolPageShell
      title="Free GIF Maker"
      subtitle="Turn a sequence of photos into a looping GIF — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A handful of photos, one looping animation
            </h2>
            <p className="mt-2">
              Turning a burst of photos into a simple looping animation is a lightweight, genuinely fun
              use case that doesn't need dedicated video editing software. This tool assembles your images
              into a GIF directly in your browser, with nothing ever uploaded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Add your photos in the order you want them to play.</li>
              <li>Set the frame delay and looping.</li>
              <li>Generate and download the GIF.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Turning a burst of action photos into a simple looping animation.</li>
              <li>Creating a short reaction or expression GIF from a few frames.</li>
              <li>Making a lightweight, easily shareable animated image without video hosting.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Widely compatible — GIFs play everywhere without a video player</li>
                  <li>Small, easily shareable file for short animations</li>
                  <li>No upload, instant generation</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>256-color limit per frame, unlike full-color video or images</li>
                  <li>No audio track — GIFs are silent by definition</li>
                  <li>Larger frame counts produce noticeably bigger files</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why GIFs look slightly different from the source photo</h2>
            <p className="mt-2">
              GIF is a genuinely old image format, and it comes with a real, fixed technical limitation:
              each individual frame can use at most 256 distinct colors, selected from a broader palette.
              A typical photo often contains many thousands or millions of subtly different colors, so
              fitting it into GIF's format means those colors get reduced down — this is exactly where
              slight graininess or visible banding in smooth areas like a sky or a gradient comes from.
              It's a property of the format itself, not something specific to how any particular tool
              builds the GIF.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              For a higher-quality result without GIF's color limitations, the{" "}
              <Link href="/tools/video-slideshow-maker" className="text-amber-400 underline underline-offset-2">
                Video Slideshow Maker
              </Link>{" "}
              produces an actual video file instead, and{" "}
              <Link href="/tools/video-trimmer" className="text-amber-400 underline underline-offset-2">
                Video Trimmer
              </Link>{" "}
              can cut a clip down before turning it into frames.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="gif-maker" />
        </>
      }
    >
      <GifMakerClient />
    </ToolPageShell>
  );
}

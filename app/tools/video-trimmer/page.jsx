import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import VideoTrimmerClient from "./VideoTrimmerClient";

export const metadata = {
  title: "Free Video Trimmer Online — Cut Clips, No Upload | QuickZeta",
  description:
    "Trim a video down to the part you need, free, with no upload and no sign up. Powered by FFmpeg compiled to WebAssembly — processed entirely in your browser.",
  keywords: [
    "free video trimmer online",
    "cut video clip no upload",
    "trim video free no sign up",
    "video cutter online browser",
    "shorten video clip online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/video-trimmer" },
  openGraph: {
    title: "Free Video Trimmer Online — Cut Clips, No Upload",
    description: "Trim a video down to the part you need entirely in your browser.",
    url: "https://quickzeta.com/tools/video-trimmer",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this video trimmer really free, with no sign up?",
    a: "Yes. There's no account, no watermark on the output, and no limit on how many clips you can trim.",
  },
  {
    q: "Do you upload my video to a server?",
    a: "No. Trimming runs through FFmpeg compiled to WebAssembly, executing directly in your browser. Your video file is never transmitted anywhere.",
  },
  {
    q: "Why does trimming sometimes take a noticeable moment, unlike a simple cut?",
    a: "Video is stored using compression that leans heavily on periodic full frames called keyframes, with everything in between described as changes from that keyframe. Cutting precisely to an exact point that isn't a keyframe means the video needs to be partially re-encoded around the cut, which takes real processing time — this is genuine work, not an artificial delay.",
  },
  {
    q: "Will trimming reduce the video's quality?",
    a: "The untouched portion of your clip keeps its original quality. Right at the cut points, a small amount of re-encoding happens to make the cut land exactly where you want it, which is standard for any trimming tool, including professional ones.",
  },
  {
    q: "What video formats are supported?",
    a: "Common formats like MP4, WebM, and MOV work well. Very unusual or old codecs may not be supported by the browser's playback engine that this tool relies on for preview.",
  },
  {
    q: "Is there a video length or file size limit?",
    a: "No hard limit is enforced, but longer or larger videos take proportionally longer to process, and very large files can use a meaningful amount of your device's memory during processing.",
  },
];

export default function VideoTrimmerPage() {
  return (
    <ToolPageShell
      title="Free Video Trimmer"
      subtitle="Cut a video down to the moment that matters — no upload, no sign up, powered by real FFmpeg."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Real video processing, not a browser trick
            </h2>
            <p className="mt-2">
              Trimming video usually means installing dedicated editing software just to cut out a
              10-second clip. This tool runs FFmpeg — the same industry-standard media engine behind
              countless professional video tools — compiled to WebAssembly, so it executes directly
              inside your browser. Your video is never uploaded; the trimming genuinely happens on your
              own device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the video you want to trim.</li>
              <li>Drag the start and end handles to select the segment you want to keep.</li>
              <li>Click trim, then download the result once processing finishes.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why trimming isn't instant, technically</h2>
            <p className="mt-2">
              Video files don't store every frame independently — they store periodic full frames called
              keyframes, with the frames in between described as differences from the nearest keyframe.
              This keeps file sizes manageable, but it means cutting to an exact, arbitrary point requires
              the video to be partially re-encoded around that cut, so the result plays back cleanly from
              frame one instead of starting on a broken, incomplete frame. That re-encoding is genuine
              computational work — the same reason professional editing software isn't instant either.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Real FFmpeg processing, not a simplified imitation</li>
                  <li>No file ever uploaded, no size cap tied to a plan</li>
                  <li>No watermark on the trimmed output</li>
                  <li>Works with common formats without installing anything</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Processing speed depends entirely on your own device's hardware</li>
                  <li>Very large video files use significant memory during processing</li>
                  <li>Unusual or obscure codecs may not preview or process correctly</li>
                  <li>No multi-clip editing — this trims one segment, it isn't a full editor</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once trimmed, the{" "}
              <Link href="/tools/video-slideshow-maker" className="text-amber-400 underline underline-offset-2">
                Video Slideshow Maker
              </Link>{" "}
              can combine your clip with photos, or the{" "}
              <Link href="/tools/gif-maker" className="text-amber-400 underline underline-offset-2">
                GIF Maker
              </Link>{" "}
              can turn a short trimmed segment into a looping GIF.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing leaves your device</h2>
            <p className="mt-2">
              Because trimming happens locally, this tool never sees or stores your video. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="video-trimmer" />
        </>
      }
    >
      <VideoTrimmerClient />
    </ToolPageShell>
  );
}

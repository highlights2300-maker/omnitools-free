import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import VideoTrimmerClient from "./VideoTrimmerClient";

export const metadata = {
  title: "Free Video Trimmer Online — Cut Clips, No Upload | QuickZeta",
  description:
    "Trim a video down to the part that matters, free, with no upload and no sign up. Set exact start and end points and export — entirely in your browser.",
  keywords: [
    "free video trimmer online",
    "cut video clip no upload",
    "trim video no sign up",
    "video cutter online free",
    "shorten video clip online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/video-trimmer" },
  openGraph: {
    title: "Free Video Trimmer Online — Cut Clips, No Upload",
    description: "Trim a video to an exact start and end point, entirely in your browser.",
    url: "https://quickzeta.com/tools/video-trimmer",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this video trimmer really free, with no sign up?",
    a: "Yes. There's no account and no watermark added to the trimmed clip.",
  },
  {
    q: "Do you upload my video to a server?",
    a: "No. The video is trimmed directly inside your browser using a real video-processing engine that runs on your own device — your file is never sent anywhere.",
  },
  {
    q: "Why does it take a moment to load the first time?",
    a: "The first time you use this tool, your browser downloads the video-processing engine it needs. This is a one-time download per browser session — once loaded, trimming itself starts right away.",
  },
  {
    q: "Is there a length limit on the video I can trim?",
    a: "No hard limit is enforced, but this tool is genuinely best suited to short clips — under a minute or two. Since your own device does all the processing rather than a powerful remote server, longer videos will take noticeably longer to process.",
  },
  {
    q: "What format does the trimmed video come out as?",
    a: "The output is an MP4 file with standard video and audio encoding, which plays back reliably across virtually all devices, browsers, and platforms.",
  },
  {
    q: "Can I set an exact start and end time?",
    a: "Yes — after loading your video, use the start and end sliders to set precisely where the trimmed clip should begin and end, shown down to a tenth of a second.",
  },
];

export default function VideoTrimmerPage() {
  return (
    <ToolPageShell
      title="Free Video Trimmer"
      subtitle="Cut a video down to the part that matters — no upload, no sign up, best for short clips."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Trim a video without uploading it anywhere
            </h2>
            <p className="mt-2">
              Cutting a video down to just the moment you need it usually means either learning video
              editing software or uploading your clip to some other website first. This tool runs an
              actual video-processing engine directly inside your browser instead — your video is trimmed
              entirely on your own device, and it's never sent to a server at any point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose your video.</strong> Drag one in or tap to
                select it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Set the start and end points.</strong> Drag the two
                sliders to mark exactly where the clip should begin and end.
              </li>
              <li>
                <strong className="text-slate-200">Trim and download.</strong> The first run downloads a
                small video engine, then processes and exports your trimmed clip as an MP4.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Best suited to short clips</h2>
            <p className="mt-2">
              Because this tool uses your own device's processing power rather than a remote server, it's
              genuinely best suited to short clips — think under a minute or two. Longer videos will still
              work, but will take noticeably more time and memory to process than they would on a
              purpose-built video editing service with dedicated hardware.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Cutting the best moment out of a longer screen recording.</li>
              <li>Trimming a phone video down before sharing it.</li>
              <li>Removing dead time from the start or end of a clip.</li>
              <li>Preparing a short clip to convert into a looping GIF with the site's own tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your video never leaves your device</h2>
            <p className="mt-2">
              Because everything runs locally, this tool never sees or stores the video you trim here.
              See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data across every tool on the site.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <VideoTrimmerClient />
    </ToolPageShell>
  );
}

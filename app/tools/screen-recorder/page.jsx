import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ScreenRecorderClient from "./ScreenRecorderClient";

export const metadata = {
  title: "Free Screen Recorder Online — No Download, No Sign Up | QuickZeta",
  description:
    "Record your screen, a window, or a browser tab for free, with no software to install and no sign up. Download the recording instantly — nothing is ever uploaded.",
  keywords: [
    "free screen recorder online",
    "screen recorder no download",
    "record screen no sign up",
    "browser screen recorder free",
    "record tab or window online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/screen-recorder" },
  openGraph: {
    title: "Free Screen Recorder Online — No Download, No Sign Up",
    description: "Record your screen, a window, or a tab entirely in your browser. Nothing is uploaded.",
    url: "https://quickzeta.com/tools/screen-recorder",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this screen recorder really free, with no sign up?",
    a: "Yes. There's no account, no watermark, and no time limit imposed by this tool itself.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. This uses screen-recording features already built into modern browsers — nothing to download, and nothing uploaded to a server either.",
  },
  {
    q: "What's that red border or icon my browser shows while recording?",
    a: "That's your browser's own native indicator, not something this tool adds — it's a deliberate security feature. Browsers are required to show an unmistakable, un-hideable signal whenever a page is capturing your screen, specifically so a malicious website can't secretly record you without your knowledge. Seeing it means the permission is working correctly, not that anything's wrong.",
  },
  {
    q: "What file format do I get?",
    a: "A .webm video file — a modern, widely supported format that plays natively in every major browser and most video players.",
  },
  {
    q: "Can I record audio too?",
    a: "It depends on your browser and what you choose to share. Most browsers let you separately choose whether to include audio from the tab, window, or your entire system when you start recording.",
  },
  {
    q: "Does this work on mobile phones?",
    a: "No — screen recording through a browser like this is a desktop feature. Phones generally have their own separate built-in screen recording feature instead.",
  },
];

export default function ScreenRecorderPage() {
  return (
    <ToolPageShell
      title="Free Screen Recorder"
      subtitle="Record your screen, a window, or a tab and download it instantly — no download, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Screen recording with nothing to install
            </h2>
            <p className="mt-2">
              Recording your screen usually means downloading dedicated software first. This tool skips
              that step by using screen-capture and recording features already built into modern
              browsers — the recording is captured, encoded, and saved to a downloadable file without
              installing anything or sending any video data to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Click "Start recording." Your browser will ask what to share — screen, window, or tab.</li>
              <li>Do whatever you're recording — a timer tracks the duration.</li>
              <li>Stop and download the finished file.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              What your browser's own permission prompt is actually protecting you from
            </h2>
            <p className="mt-2">
              Screen recording is deliberately treated as a sensitive browser permission, similar to
              camera or microphone access. When you click "Start recording," your browser itself — not
              this tool — shows a native prompt asking exactly what to share, and while sharing is active,
              it displays an unmistakable, persistent indicator (often a colored border or a small icon)
              that can't be hidden by the website doing the recording. This exists specifically so a
              malicious page can't secretly capture your screen without you knowing — the visible
              indicator is a security feature working as intended, not a bug or a sign that something's
              wrong.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">About the file format</h2>
            <p className="mt-2">
              Recordings download as .webm — a real, modern, widely supported video format. It plays
              natively in every major browser and most desktop video players. If you specifically need an
              MP4 for compatibility with older software, most video editing tools can convert a .webm to
              MP4 in one step.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Need to trim the recording down afterward? The site's{" "}
              <Link href="/tools/video-trimmer" className="text-amber-400 underline underline-offset-2">
                Video Trimmer
              </Link>{" "}
              cuts a .webm file down to the exact segment you need, and{" "}
              <Link href="/tools/audio-noise-remover" className="text-amber-400 underline underline-offset-2">
                Audio Noise Remover
              </Link>{" "}
              can clean up a recording's narration track.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing is ever uploaded</h2>
            <p className="mt-2">
              The entire recording — capture, encoding, and file creation — happens locally in your
              browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="screen-recorder" />
        </>
      }
    >
      <ScreenRecorderClient />
    </ToolPageShell>
  );
}

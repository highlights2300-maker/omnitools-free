import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    a: "Yes. There's no account, no watermark on the recording, and no time limit imposed by this tool itself (though very long recordings will use more of your device's memory).",
  },
  {
    q: "Do I need to install anything?",
    a: "No. This uses screen-recording features already built into modern browsers — there's nothing to download or install, and nothing is uploaded to a server either. The recording is captured and saved directly through your browser.",
  },
  {
    q: "What file format do I get?",
    a: "A .webm video file. This is a modern, widely supported format that plays natively in every major browser and most video players, though a small number of older or specialized editing tools may need it converted to MP4 first.",
  },
  {
    q: "Can I record audio too?",
    a: "It depends on your browser and what you choose to share. When you start recording, most browsers let you separately choose whether to include audio from the tab, window, or your entire system — this tool passes that choice along, but audio capture support and options vary by browser and operating system.",
  },
  {
    q: "Does this work on mobile phones?",
    a: "No — screen recording through a browser like this is a desktop browser feature. Chrome, Edge, and Firefox on a desktop or laptop all support it; phones generally have their own separate built-in screen recording feature instead.",
  },
  {
    q: "How do I stop recording?",
    a: "Either click the \"Stop recording\" button on this page, or use your browser's own native \"Stop sharing\" control (usually a small bar or icon that appears while sharing is active) — both end the recording the same way.",
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
              that step entirely by using screen-capture and recording features already built into modern
              browsers — the recording is captured, encoded, and saved to a downloadable file without
              installing anything or sending any video data to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Click "Start recording."</strong> Your browser will
                ask what to share — your entire screen, a specific window, or a single tab.
              </li>
              <li>
                <strong className="text-slate-200">Do whatever you're recording.</strong> A timer tracks
                how long you've been going.
              </li>
              <li>
                <strong className="text-slate-200">Stop and download.</strong> Click "Stop recording" (or
                your browser's own "Stop sharing" control), then download the finished file.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">About the file format</h2>
            <p className="mt-2">
              Recordings download as .webm — a real, modern, widely supported video format, not a
              proprietary one. It plays natively in every major browser and most desktop video players.
              If you specifically need an MP4 for compatibility with older software, most video editing
              tools can convert a .webm to MP4 in one step, or you can use a dedicated video converter for
              that specific conversion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Recording a quick software walkthrough or bug report to share with a colleague.</li>
              <li>Capturing a video call, presentation, or webinar for later reference.</li>
              <li>Making a short how-to clip without needing dedicated screen-capture software.</li>
              <li>Documenting a specific issue happening on screen for a support ticket.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing is ever uploaded</h2>
            <p className="mt-2">
              The entire recording — capture, encoding, and file creation — happens locally in your
              browser. This tool never sees or stores what you record. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <ScreenRecorderClient />
    </ToolPageShell>
  );
}

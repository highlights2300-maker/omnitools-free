import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import VideoSlideshowMakerClient from "./VideoSlideshowMakerClient";

export const metadata = {
  title: "Free Video Slideshow Maker Online — Photos to Video | QuickZeta",
  description:
    "Turn photos into a video slideshow with crossfade transitions, a title, and optional music — free, with no upload and no sign up. Built entirely in your browser.",
  keywords: [
    "free video slideshow maker online",
    "photos to video no upload",
    "slideshow maker with music free",
    "photo video maker no sign up",
    "crossfade slideshow generator",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/video-slideshow-maker" },
  openGraph: {
    title: "Free Video Slideshow Maker Online — Photos to Video",
    description: "Turn a sequence of photos into a video slideshow, entirely in your browser.",
    url: "https://quickzeta.com/tools/video-slideshow-maker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this slideshow maker really free, with no sign up?",
    a: "Yes. There's no account, no watermark on the result, and no limit on how many slideshows you can create.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. The entire video is built and recorded directly inside your browser using the Canvas and MediaRecorder features built into modern browsers — your photos and any music you add are never uploaded anywhere.",
  },
  {
    q: "Can I add my own music?",
    a: "Yes — upload any audio file you have rights to use, and it plays alongside the slideshow in the final video. Because this tool doesn't provide any music itself, you're responsible for only using audio you're actually licensed to use, the same as with any video you might publish or share.",
  },
  {
    q: "What file format do I get?",
    a: "A .webm video file — a modern, widely supported format that plays natively in every major browser and most video players and editors.",
  },
  {
    q: "How many photos can I use?",
    a: "There's no fixed limit, though more photos means a longer video and more processing time, since your own device is doing the recording in real time as the slideshow plays.",
  },
  {
    q: "Can I control how long each photo shows for?",
    a: "Yes — the seconds-per-photo slider applies the same timing to every photo in the sequence, from 1 to 6 seconds each.",
  },
];

export default function VideoSlideshowMakerPage() {
  return (
    <ToolPageShell
      title="Free Video Slideshow Maker"
      subtitle="Turn photos into a video with crossfade transitions, a title, and optional music — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A photo slideshow video, built without uploading anything
            </h2>
            <p className="mt-2">
              Turning a handful of photos into a proper video — with smooth transitions between them,
              rather than an abrupt cut — usually means dedicated video editing software. This tool does
              it directly inside your browser instead: it draws each photo onto a canvas in real time,
              records that canvas as actual video, and even mixes in background music if you add one, all
              without a single file ever being uploaded to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Add your photos.</strong> Drag in as many as you like,
                in the order you want them to play.
              </li>
              <li>
                <strong className="text-slate-200">Set the timing and title.</strong> Choose how long each
                photo shows, and optionally add a title that appears for the first few seconds.
              </li>
              <li>
                <strong className="text-slate-200">Add music, if you'd like.</strong> Upload any audio
                file you have the rights to use.
              </li>
              <li>
                <strong className="text-slate-200">Build and download.</strong> The video renders in real
                time and downloads as a .webm file when it's done.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How the video is actually made</h2>
            <p className="mt-2">
              Rather than stitching together pre-made image files, this tool draws each photo onto an
              HTML canvas element frame by frame, crossfading smoothly into the next one as the timer for
              each photo runs out. That canvas is then captured live as a video stream using your
              browser's built-in recording capability — the same underlying technology behind the site's
              Screen Recorder — and combined with an audio track if you've added music, before being
              saved as a finished video file.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on using music</h2>
            <p className="mt-2">
              This tool doesn't provide any music of its own — if you add a track, it needs to be
              something you actually have the rights to use, the same as with any video you'd publish or
              share elsewhere. Royalty-free music libraries, tracks you've licensed, or your own
              recordings are all safe choices; using a copyrighted commercial song without permission
              isn't something this tool can prevent, but it's worth being deliberate about regardless of
              what tool you use to combine it into a video.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Turning vacation or event photos into a shareable video recap.</li>
              <li>Creating a simple slideshow for a birthday, anniversary, or celebration.</li>
              <li>Putting together a quick before-and-after video for a project or transformation.</li>
              <li>Making a lightweight product showcase video from a handful of photos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing you upload here is stored</h2>
            <p className="mt-2">
              Because the video is built and recorded entirely on your device, this tool never sees or
              stores the photos or audio you use here. See our{" "}
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
      <VideoSlideshowMakerClient />
    </ToolPageShell>
  );
}

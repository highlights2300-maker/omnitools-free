import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import GifMakerClient from "./GifMakerClient";

export const metadata = {
  title: "Free GIF Maker Online — Photos to Looping GIF, No Upload | QuickZeta",
  description:
    "Turn a sequence of photos into a smooth looping GIF, free, with no upload and no sign up. Reorder frames, set the speed, and export — entirely in your browser.",
  keywords: [
    "free gif maker online",
    "photos to gif no upload",
    "create looping gif free",
    "gif maker no sign up",
    "make a gif from pictures",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/gif-maker" },
  openGraph: {
    title: "Free GIF Maker Online — Photos to Looping GIF, No Upload",
    description: "Turn a sequence of photos into a looping GIF, encoded entirely in your browser.",
    url: "https://quickzeta.com/tools/gif-maker",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this GIF maker really free, with no sign up?",
    a: "Yes. There's no account, no watermark on the result, and no limit on how many GIFs you can create.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. The GIF is encoded entirely inside your browser — your photos are never sent anywhere.",
  },
  {
    q: "Can I use a video clip instead of photos?",
    a: "This tool is built specifically for turning a sequence of separate photos into a GIF. If you want to convert an existing video clip into a GIF, that requires extracting frames from video first, which is a different, heavier process — worth keeping in mind if that's what you're after.",
  },
  {
    q: "How many photos can I use?",
    a: "There's no fixed limit, though more photos and a longer frame delay will produce a larger file. For a smooth, reasonably sized GIF, somewhere between 3 and 15 photos tends to work well.",
  },
  {
    q: "Can I change the order the photos play in?",
    a: "Yes — use the up and down arrows next to each photo to reorder them before building the GIF.",
  },
  {
    q: "Does the GIF loop automatically?",
    a: "Yes, the GIF format naturally supports looping, and this tool always builds it to loop continuously once played.",
  },
];

export default function GifMakerPage() {
  return (
    <ToolPageShell
      title="Free GIF Maker"
      subtitle="Turn a sequence of photos into a smooth looping GIF — no upload, no sign up, no watermark."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Turn photos into a GIF without uploading them
            </h2>
            <p className="mt-2">
              Whether it's a burst of photos from a trip, a simple stop-motion effect, or a quick
              before-and-after comparison, turning a handful of images into an animated GIF is normally
              something you'd need dedicated software for. This tool does it entirely in your browser —
              add your photos, set the order and timing, and export a real, working GIF with nothing
              ever uploaded to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Add your photos.</strong> Drag in two or more images,
                or tap to select them from your device.
              </li>
              <li>
                <strong className="text-slate-200">Set the order.</strong> Use the up and down arrows to
                arrange them in the sequence you want them to play.
              </li>
              <li>
                <strong className="text-slate-200">Adjust the speed.</strong> The frame delay slider
                controls how long each photo stays on screen before the next one appears.
              </li>
              <li>
                <strong className="text-slate-200">Build and download.</strong> Click "Build GIF" and
                save the finished, looping animation.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses for a GIF</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Turning a short photo burst into a simple animated moment to share.</li>
              <li>Showing a before-and-after comparison that flips back and forth.</li>
              <li>Building a basic stop-motion effect from a sequence of staged photos.</li>
              <li>
                Combining with the site's own{" "}
                <Link href="/tools/image-cropper" className="text-amber-400 underline underline-offset-2">
                  Image Cropper
                </Link>{" "}
                first, to make sure every frame lines up the same way before building the GIF.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting a smooth result</h2>
            <p className="mt-2">
              For the cleanest-looking GIF, it helps if your source photos are reasonably similar in
              framing and lighting, especially for a stop-motion or comparison effect — a big jump in
              zoom or angle between frames can look jarring once it's looping. A shorter frame delay (a
              few hundred milliseconds) gives a quick, snappy animation, while a longer delay works better
              for a slideshow-style GIF where each image needs a moment to actually register.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because the GIF is built locally, this tool never sees, stores, or has access to the photos
              you use here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <GifMakerClient />
    </ToolPageShell>
  );
}

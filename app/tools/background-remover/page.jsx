import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import BackgroundRemoverClient from "./BackgroundRemoverClient";

export const metadata = {
  title: "Free Background Remover Online — No Upload, AI-Powered | QuickZeta",
  description:
    "Remove the background from any photo for free, with no upload and no sign up. An AI model runs directly in your browser to cut out the subject — nothing is ever sent to a server.",
  keywords: [
    "free background remover online",
    "remove image background no upload",
    "cut out photo background free",
    "transparent background png maker",
    "background eraser no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/background-remover" },
  openGraph: {
    title: "Free Background Remover Online — No Upload, AI-Powered",
    description: "Remove a photo's background using an AI model that runs entirely in your browser.",
    url: "https://quickzeta.com/tools/background-remover",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this background remover really free, with no sign up?",
    a: "Yes. There's no account, no watermark on the result, and no limit on how many photos you can process.",
  },
  {
    q: "Do you upload my photo to a server to remove the background?",
    a: "No — and this is what makes this tool different from most. An AI segmentation model is downloaded once to your browser and runs there, meaning your photo is analyzed entirely on your own device. It's never sent anywhere.",
  },
  {
    q: "Why does it take a moment to load the first time?",
    a: "The very first time you use this tool in a browser, it downloads a small AI model needed to detect the subject in your photo. After that first download, your browser caches it, so future uses on the same device start almost instantly.",
  },
  {
    q: "What file do I get afterward?",
    a: "A PNG with a transparent background, ready to drop onto a different background, into a design tool, or straight into a document.",
  },
  {
    q: "Does it work well on every kind of photo?",
    a: "It works best on photos with a clear subject — a person, product, or animal — set against a reasonably distinct background. Very cluttered or low-contrast images may need a second pass or some manual touch-up in an image editor afterward.",
  },
  {
    q: "Is there a file size limit?",
    a: "No hard limit is enforced, though very large or very high-resolution photos will take longer to process since your own device's processor is doing the work rather than a remote server.",
  },
];

export default function BackgroundRemoverPage() {
  return (
    <ToolPageShell
      title="Free Background Remover"
      subtitle="Cut the background out of any photo using an AI model that runs on your own device — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              An AI model, running entirely in a browser tab
            </h2>
            <p className="mt-2">
              It sounds like it shouldn't be possible — cutting a subject out of a photo with real
              precision has traditionally meant either genuine machine learning infrastructure running on
              a server, or a person manually tracing an outline in Photoshop. This tool does neither. The
              AI model that detects your photo's subject is downloaded once and runs directly inside your
              browser, using the same kind of on-device machine learning that modern phones use for
              portrait mode — your photo never has to leave your device to be analyzed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Where it shines, and where it struggles</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Works well</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>A person against a plain wall or sky</li>
                  <li>A product photographed on a solid-color surface</li>
                  <li>An animal or object with a clear, distinct outline</li>
                  <li>Good, even lighting with minimal shadow clutter</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Can be tricky</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Busy, cluttered, or patterned backgrounds</li>
                  <li>Subjects that closely match the background color</li>
                  <li>Fine detail like loose hair or fur strands</li>
                  <li>Very low light or heavily shadowed photos</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What the AI is actually doing</h2>
            <p className="mt-2">
              The technique is called image segmentation — the model looks at every pixel in your photo
              and estimates the probability that it belongs to the main subject versus the background,
              based on patterns it learned from studying a huge number of photos during training. It
              isn't detecting "edges" the way a simple filter would; it's making a judgment about what's
              foreground and what's background much closer to how a person would look at the photo and
              instinctively know where the subject ends.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Choose a photo — drag one in or tap to select it from your device.</li>
              <li>
                Click "Remove background." The first time, your browser downloads the AI model; after
                that it's cached and starts almost instantly.
              </li>
              <li>Download the result — a PNG with a transparent background, ready to use anywhere.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What people use a transparent cutout for</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Product photos for an online store, isolated onto a clean white or branded background.</li>
              <li>Profile pictures or headshots, dropped onto a new background for a resume or website.</li>
              <li>Design assets — logos, icons, or cutouts — for a slide deck or marketing graphic.</li>
              <li>
                Combining with the site's own{" "}
                <Link href="/tools/photo-collage-maker" className="text-amber-400 underline underline-offset-2">
                  Photo Collage Maker
                </Link>{" "}
                or{" "}
                <Link href="/tools/meme-generator" className="text-amber-400 underline underline-offset-2">
                  Meme Generator
                </Link>{" "}
                for a cleaner composite.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos never leave your device</h2>
            <p className="mt-2">
              Because the model runs locally, this tool never sees or stores the photos you process here.
              Full details are in the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <BackgroundRemoverClient />
    </ToolPageShell>
  );
}

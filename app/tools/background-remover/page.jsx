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
              Remove a photo's background without uploading it anywhere
            </h2>
            <p className="mt-2">
              Nearly every free background remover online works the same way: you upload your photo,
              their server runs it through an AI model, and you download the result — meaning your image
              briefly exists on a computer you don't control. This tool takes a different approach. The
              same kind of AI model runs directly inside your browser, using your own device's processing
              power, so your photo is never transmitted anywhere at all.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose a photo.</strong> Drag one in or tap to select
                it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Click "Remove background."</strong> The first time,
                your browser downloads a small AI model — after that, it's cached and starts instantly on
                future uses.
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> You'll get a PNG with a
                transparent background, ready to use anywhere.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses for a transparent background</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Product photos for an online store, isolated onto a clean white or branded background.</li>
              <li>Profile pictures or headshots, dropped onto a new background for a resume or website.</li>
              <li>Design assets — logos, icons, or cutouts — for use in a slide deck or marketing graphic.</li>
              <li>Combining a photo with the site's own <Link href="/" className="text-amber-400 underline underline-offset-2">Photo Collage Maker or Meme Generator</Link> for a cleaner composite.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting the best result</h2>
            <p className="mt-2">
              This tool tends to perform best on photos with good contrast between the subject and the
              background — a person against a plain wall, a product on a solid-color surface, or an
              animal against open sky or grass all work well. Busy, cluttered backgrounds or subjects that
              blend closely in color with what's behind them can sometimes produce a rougher edge, which
              is worth knowing going in rather than being surprised by.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your photos stay on your device</h2>
            <p className="mt-2">
              Because the AI model runs locally, this tool never sees, stores, or has access to the
              photos you process here. See our{" "}
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
      <BackgroundRemoverClient />
    </ToolPageShell>
  );
}

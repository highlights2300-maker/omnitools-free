import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import MemeGeneratorClient from "./MemeGeneratorClient";

export const metadata = {
  title: "Free Meme Generator Online — No Upload, No Watermark | QuickZeta",
  description:
    "Add top and bottom captions to any image, free, with no upload, no sign up, and no watermark. Processed entirely in your browser.",
  keywords: [
    "free meme generator online",
    "meme maker no watermark",
    "caption generator no sign up",
    "make a meme online free",
    "meme creator no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/meme-generator" },
  openGraph: {
    title: "Free Meme Generator Online — No Upload, No Watermark",
    description: "Add captions to any image, entirely in your browser, no watermark.",
    url: "https://quickzeta.com/tools/meme-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this meme generator really free, with no watermark?",
    a: "Yes. There's no account, no watermark stamped on your image, and no limit on how many you make.",
  },
  {
    q: "Do you upload my image to a server?",
    a: "No. Captions are drawn directly onto your image using the Canvas feature built into every browser — the image itself is never sent anywhere.",
  },
  {
    q: "Why does the classic meme font look the way it does?",
    a: "That bold white text with a thick black outline (Impact font, all caps) became the default meme style in the mid-2000s largely because early meme-making tools shipped it as their only option, and it stuck as the recognizable convention — readable over almost any background image, which was the practical reason it won out.",
  },
  {
    q: "Can I use my own image, or only templates?",
    a: "Your own image — upload any photo or picture and add text to it directly, rather than being limited to a fixed set of templates.",
  },
  {
    q: "What file format do I get?",
    a: "A PNG, which keeps text sharp and supports transparency if your source image had any.",
  },
];

export default function MemeGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Meme Generator"
      subtitle="Add top and bottom captions to any image — no upload, no watermark, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Captions on any image, instantly, no watermark
            </h2>
            <p className="mt-2">
              A meme lives or dies on timing — by the time you find a generator, sign up, and discover a
              watermark stamped across your punchline, the moment's usually gone. This tool skips all of
              that: upload an image, type your text, download it, with the caption drawn directly onto
              the image right in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the image you want to caption.</li>
              <li>Type your top and bottom text.</li>
              <li>Download the finished image.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No watermark, ever</li>
                  <li>Works with any image you upload, not just fixed templates</li>
                  <li>Instant — no account, no wait</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No built-in library of trending templates to browse</li>
                  <li>Text positioning is top/bottom, not fully freeform</li>
                  <li>Very small source images may look pixelated once captioned</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting the caption to actually read well</h2>
            <p className="mt-2">
              A caption that's technically there but hard to read defeats the point. Keep text reasonably
              short — a caption that wraps across four lines loses punch compared to one tight line.
              Pick an image with enough plain space at the top or bottom for the text to sit against,
              rather than directly over a busy, high-contrast part of the photo, where even bold outlined
              text can get lost. If the image itself is cluttered everywhere, a quick pass through{" "}
              <Link href="/tools/image-cropper" className="text-amber-400 underline underline-offset-2">
                Image Cropper
              </Link>{" "}
              to trim it down first often helps more than fighting with text placement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              If the background is distracting, run the image through{" "}
              <Link href="/tools/background-remover" className="text-amber-400 underline underline-offset-2">
                Background Remover
              </Link>{" "}
              first, or combine several captioned images with{" "}
              <Link href="/tools/photo-collage-maker" className="text-amber-400 underline underline-offset-2">
                Photo Collage Maker
              </Link>{" "}
              for a multi-panel format.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing leaves your device</h2>
            <p className="mt-2">
              See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="meme-generator" />
        </>
      }
    >
      <MemeGeneratorClient />
    </ToolPageShell>
  );
}

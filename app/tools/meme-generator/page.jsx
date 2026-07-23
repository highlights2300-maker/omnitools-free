import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import MemeGeneratorClient from "./MemeGeneratorClient";

export const metadata = {
  title: "Free Meme Generator Online — No Upload, No Watermark | QuickZeta",
  description:
    "Add classic top and bottom captions to any image and export it as a meme, free, with no upload and no watermark — entirely in your browser.",
  keywords: [
    "free meme generator online",
    "meme maker no watermark",
    "add text to image free no sign up",
    "top bottom text meme maker",
    "meme generator no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/meme-generator" },
  openGraph: {
    title: "Free Meme Generator Online — No Upload, No Watermark",
    description: "Add classic top and bottom captions to any image, entirely in your browser.",
    url: "https://quickzeta.com/tools/meme-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this meme generator really free, with no watermark?",
    a: "Yes. There's no account, no watermark added to the result, and no limit on how many memes you can create.",
  },
  {
    q: "Do you upload my image to a server?",
    a: "No. The captions are rendered directly onto your image inside your browser using the Canvas feature built into every modern browser. Your image is never sent anywhere.",
  },
  {
    q: "Can I use my own photo, not just a template?",
    a: "Yes — this tool works with any image you upload, whether that's a personal photo, a screenshot, or a downloaded template. There's no built-in template library; you bring the image.",
  },
  {
    q: "Why does the text always show in capital letters?",
    a: "This follows the classic meme format popularized by image macros, where captions are traditionally shown in bold, white, black-outlined capital letters. It's a deliberate style choice built into this tool rather than a limitation.",
  },
  {
    q: "Can I leave the top or bottom text blank?",
    a: "Yes — if you only want a single caption, just leave the other field empty and it won't be drawn onto the image.",
  },
];

export default function MemeGeneratorPage() {
  return (
    <ToolPageShell
      title="Free Meme Generator"
      subtitle="Add classic top and bottom captions to any image — no upload, no watermark, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A meme generator with no watermark, and nothing uploaded
            </h2>
            <p className="mt-2">
              Plenty of free meme makers online quietly stamp their own logo across the bottom of your
              image, or require an upload to their server before you can download anything. This tool
              skips both — captions are drawn directly onto your image inside your browser, in the
              classic bold white, black-outlined style, and the result is entirely yours with nothing
              added and nothing sent anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose an image.</strong> Drag one in or tap to select
                it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Add your captions.</strong> Type a top line, a bottom
                line, or both — the preview updates as you type.
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> Save the finished meme
                as a PNG, ready to share.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">The classic meme text style</h2>
            <p className="mt-2">
              The bold, all-caps, white-with-black-outline caption style used here traces back to early
              internet image macros, and it's stayed the recognizable default for a reason: it stays
              readable over almost any background, light or dark, busy or plain. This tool automatically
              scales the text size to the image's dimensions, so captions stay proportional whether you're
              working with a small screenshot or a large photo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your image stays on your device</h2>
            <p className="mt-2">
              Because the captions are rendered locally, this tool never sees, stores, or has access to
              the images you use here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">More ways to work with an image</h2>
            <p className="mt-2">
              Once you've made a meme, the site's{" "}
              <Link href="/tools/image-compressor" className="text-amber-400 underline underline-offset-2">
                Image Compressor
              </Link>{" "}
              can shrink the file size before sharing it, or the{" "}
              <Link href="/tools/image-cropper" className="text-amber-400 underline underline-offset-2">
                Image Cropper
              </Link>{" "}
              can trim it to a specific size first.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Tips for a caption that reads well</h2>
            <p className="mt-2">
              Keep captions relatively short — a line or two of punchy text tends to work better than a
              long sentence, since the font size shrinks to fit longer text and can become harder to read
              on smaller screens. Choosing a photo with a reasonably plain area near the top and bottom
              edges also helps the outlined text stay legible, since very busy or high-contrast
              backgrounds right behind the caption can occasionally make it blend in.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <MemeGeneratorClient />
    </ToolPageShell>
  );
}

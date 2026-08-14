import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata = {
  title: "Free Image Compressor Online — No Upload, Instant Results | QuickZeta",
  description:
    "Compress JPG, PNG, or WebP images online for free, with no upload and no sign up. Reduce file size while previewing the quality live, right in your browser.",
  keywords: [
    "free image compressor online",
    "reduce image file size no upload",
    "compress jpg online free",
    "compress png without losing quality",
    "image compressor no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/image-compressor" },
  openGraph: {
    title: "Free Image Compressor Online — No Upload, Instant Results",
    description: "Compress images entirely in your browser. Nothing is ever uploaded to a server.",
    url: "https://quickzeta.com/tools/image-compressor",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this image compressor really free, with no sign up?",
    a: "Yes. There's no account, no email required, and no limit on how many images you can compress — use it as often as you'd like.",
  },
  {
    q: "Do you upload my photos to a server?",
    a: "No. The compression happens entirely inside your browser using your device's own processing power. Your image is never sent anywhere, which also means it's typically faster than uploading to a remote server and waiting for a response.",
  },
  {
    q: "Will compressing lower the quality of my image?",
    a: "It depends on the quality setting you choose. Sliding it lower reduces file size more aggressively; keeping it high (around 80-90%) usually shrinks file size noticeably with almost no visible difference. The live preview lets you compare before downloading.",
  },
  {
    q: "What's the difference between JPG, WebP, and PNG here?",
    a: "JPG and WebP both use lossy compression and produce the smallest files, with WebP generally getting a smaller file at the same visual quality. PNG is lossless, so it preserves every detail perfectly but produces a noticeably larger file — best reserved for images that need transparency or sharp edges like screenshots or logos.",
  },
  {
    q: "Is there a file size limit?",
    a: "No hard limit is enforced by this tool, though very large images will naturally take a little longer to process since your own device is doing the work rather than a server.",
  },
];

const QUALITY_GUIDE = [
  { pct: "90–100%", cut: "Little (10–20%)", use: "Print, portfolio work, anything zoomed in closely" },
  { pct: "75–90%", cut: "Moderate (40–60%)", use: "Blog posts, product photos, general web use" },
  { pct: "50–75%", cut: "Large (60–80%)", use: "Thumbnails, previews, background images" },
  { pct: "Under 50%", cut: "Severe (80%+)", use: "Rarely worth it — artifacts usually become visible" },
];

const FORMAT_TABLE = [
  { format: "JPG", compression: "Lossy", transparency: "No", bestFor: "Photos, general use" },
  { format: "WebP", compression: "Lossy or lossless", transparency: "Yes", bestFor: "Best size-to-quality ratio, if supported" },
  { format: "PNG", compression: "Lossless", transparency: "Yes", bestFor: "Logos, screenshots, sharp text" },
];

export default function ImageCompressorPage() {
  return (
    <ToolPageShell
      title="Free Image Compressor"
      subtitle="Shrink JPG, PNG, or WebP files instantly, with a live before-and-after preview — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">A photo you'd never notice was compressed</h2>
            <p className="mt-2">
              A typical photo straight off a modern phone camera often lands somewhere between 3–8 MB.
              Run it through this tool at a sensible quality setting, and that same photo can frequently
              drop to a few hundred KB — often a 70–90% size reduction — with a difference in sharpness
              that's genuinely hard to spot at normal viewing size. The gap between "looks identical" and
              "much smaller file" is bigger than most people expect.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">The quality slider, translated into real terms</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="py-2 pr-4 font-medium">Quality setting</th>
                    <th className="py-2 pr-4 font-medium">Typical size reduction</th>
                    <th className="py-2 font-medium">Good for</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {QUALITY_GUIDE.map((row) => (
                    <tr key={row.pct} className="border-b border-slate-900">
                      <td className="py-2 pr-4 font-mono text-amber-400">{row.pct}</td>
                      <td className="py-2 pr-4">{row.cut}</td>
                      <td className="py-2 text-slate-400">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">JPG, WebP, or PNG?</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="py-2 pr-4 font-medium">Format</th>
                    <th className="py-2 pr-4 font-medium">Compression</th>
                    <th className="py-2 pr-4 font-medium">Transparency</th>
                    <th className="py-2 font-medium">Best for</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {FORMAT_TABLE.map((row) => (
                    <tr key={row.format} className="border-b border-slate-900">
                      <td className="py-2 pr-4 font-medium text-slate-100">{row.format}</td>
                      <td className="py-2 pr-4">{row.compression}</td>
                      <td className="py-2 pr-4">{row.transparency}</td>
                      <td className="py-2 text-slate-400">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why heavy compression often goes unnoticed</h2>
            <p className="mt-2">
              Lossy formats like JPG and WebP work by discarding the color and detail information human
              eyes are least sensitive to — subtle gradients, fine texture in busy areas, differences a
              viewer would need to zoom in to actually catch. That's why a photo can shrink dramatically
              in file size while still looking essentially identical at normal size: the compression is
              deliberately targeting the parts of the image least likely to be missed, not degrading it
              evenly across the whole photo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Drop in a JPG, PNG, or WebP file, drag the quality slider while watching the live
              before-and-after size comparison, switch output format if needed, and download once it
              looks right. Everything updates instantly since there's no upload step to wait through —
              try a few different quality settings before committing, since the sweet spot between file
              size and visible quality varies depending on the specific photo and what you're using it
              for.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing you compress here is stored</h2>
            <p className="mt-2">
              Compression happens entirely on your device — see the{" "}
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
      <ImageCompressorClient />
    </ToolPageShell>
  );
}

import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import ESignatureClient from "./ESignatureClient";

export const metadata = {
  title: "Free E-Signature Pad Online — Draw & Download PNG | QuickZeta",
  description:
    "Draw a signature with your mouse, trackpad, or finger and download it as a transparent PNG, free, with no sign up. Ready to drop into any document.",
  keywords: [
    "free e-signature pad online",
    "draw signature online no sign up",
    "signature maker transparent png",
    "create digital signature free",
    "sign document online no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/e-signature-pad" },
  openGraph: {
    title: "Free E-Signature Pad Online — Draw & Download PNG",
    description: "Draw a signature and download it as a transparent PNG, entirely in your browser.",
    url: "https://quickzeta.com/tools/e-signature-pad",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this e-signature pad really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many times you can use it.",
  },
  {
    q: "Do you store my signature anywhere?",
    a: "No. The drawing happens entirely inside your browser and is never uploaded, saved, or seen by anyone — it only exists on your screen until you download it or close the tab.",
  },
  {
    q: "What file do I get, and how do I use it?",
    a: "A tightly-cropped, transparent-background PNG of your signature. You can drop it directly onto a PDF, insert it into a Word document, or paste it into a slide — the transparent background means it'll sit cleanly on top of whatever's underneath.",
  },
  {
    q: "Can I sign with my finger on a phone or tablet?",
    a: "Yes — the signature pad supports touch input, so it works the same way on a phone or tablet as it does with a mouse or trackpad on a computer.",
  },
  {
    q: "Is a drawn signature like this legally binding?",
    a: "Whether a signature created this way is considered legally binding depends on the context and jurisdiction — for many informal or internal uses it's perfectly fine, but for contracts or legal documents with specific requirements, it's worth checking what that particular situation actually requires.",
  },
];

export default function ESignaturePadPage() {
  return (
    <ToolPageShell
      title="Free E-Signature Pad"
      subtitle="Draw a signature and download it as a transparent PNG — no sign up, nothing stored."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Draw a signature without uploading anything
            </h2>
            <p className="mt-2">
              Needing a quick digital signature to drop onto a document doesn't have to mean signing up
              for a full e-signature service. This tool gives you a simple drawing pad — sign with your
              mouse, trackpad, or finger, and download a clean, transparent PNG the moment you're happy
              with it. Nothing is ever uploaded or saved anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Sign in the box.</strong> Draw your signature using a
                mouse, trackpad, or your finger on a touchscreen.
              </li>
              <li>
                <strong className="text-slate-200">Adjust the ink if needed.</strong> Change the color or
                line thickness before or after signing.
              </li>
              <li>
                <strong className="text-slate-200">Download the PNG.</strong> The result is automatically
                cropped tightly around your signature with a transparent background.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Adding a personal signature to a PDF before sending it.</li>
              <li>Inserting a signature image into a Word document or slide deck.</li>
              <li>
                Signing off on the site's own{" "}
                <Link href="/" className="text-amber-400 underline underline-offset-2">
                  Contract Template Kit
                </Link>{" "}
                or a printed agreement.
              </li>
              <li>Creating a simple signature graphic for an email footer.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting a clean-looking signature</h2>
            <p className="mt-2">
              Signing with a mouse can feel less natural than pen and paper, so it sometimes takes a
              couple of tries to get a signature that looks the way you want — the "Clear" button makes
              it easy to start over. On a touchscreen device, signing with a finger or stylus usually
              produces a smoother, more natural-looking result than a mouse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing about your signature is stored</h2>
            <p className="mt-2">
              Because the drawing happens entirely on your device, this tool never sees or keeps a copy
              of your signature. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A drawn signature versus a typed one</h2>
            <p className="mt-2">
              Many documents accept a typed name in a cursive-style font as a substitute for a
              handwritten signature, and that's often perfectly acceptable. A drawn signature like the
              one this tool creates can feel more personal and closer to how you'd actually sign on
              paper, which is why it's a common choice for things like personal letters, informal
              agreements, or adding a recognizable mark to a document rather than relying on a generic
              script font.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <ESignatureClient />
    </ToolPageShell>
  );
}

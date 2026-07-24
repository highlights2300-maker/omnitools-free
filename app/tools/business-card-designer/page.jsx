import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import BusinessCardDesignerClient from "./BusinessCardDesignerClient";

export const metadata = {
  title: "Free Business Card Designer Online — No Upload | QuickZeta",
  description:
    "Design a print-ready, double-sided business card free, with no sign up. Live preview at real print resolution — entirely in your browser.",
  keywords: [
    "free business card designer online",
    "business card maker no sign up",
    "print ready business card free",
    "design business card no upload",
    "double sided business card maker",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/business-card-designer" },
  openGraph: {
    title: "Free Business Card Designer Online — No Upload",
    description: "Design a print-ready, double-sided business card entirely in your browser.",
    url: "https://quickzeta.com/tools/business-card-designer",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this business card designer really free, with no sign up?",
    a: "Yes. There's no account, no watermark, and no limit on how many designs you can create.",
  },
  {
    q: "Is the output actually print-ready?",
    a: "Yes — both sides render at 1050×600 pixels, a standard print resolution for a 3.5×2 inch business card, so the downloaded PNG files are suitable for sending to a print shop.",
  },
  {
    q: "Can I design both the front and back of the card?",
    a: "Yes — the front includes your name, title, company, and contact details, while the back displays your company name and a tagline on a solid accent-colored background. Both download as separate PNG files.",
  },
  {
    q: "Do you upload my information to a server?",
    a: "No. Both sides of the card are rendered directly inside your browser using the Canvas feature built into every modern browser — nothing you type is ever sent anywhere.",
  },
  {
    q: "Can I customize the colors?",
    a: "Yes — the accent, background, and text colors are all adjustable, so you can match your card to your own branding.",
  },
];

export default function BusinessCardDesignerPage() {
  return (
    <ToolPageShell
      title="Free Business Card Designer"
      subtitle="Design a print-ready, double-sided business card with a live preview — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Design a business card without uploading anything
            </h2>
            <p className="mt-2">
              Getting a simple, professional-looking business card together shouldn't require design
              software or a subscription. This tool renders both the front and back of a card directly
              inside your browser at real print resolution, with a live preview that updates as you type
              — nothing you enter is ever sent to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Fill in your details.</strong> Name, title, company,
                and contact information for the front of the card.
              </li>
              <li>
                <strong className="text-slate-200">Add a tagline.</strong> A short line for the back of
                the card, displayed alongside your company name.
              </li>
              <li>
                <strong className="text-slate-200">Adjust the colors.</strong> Set the accent, background,
                and text colors to match your branding.
              </li>
              <li>
                <strong className="text-slate-200">Download both sides.</strong> Save the front and back
                as separate print-ready PNG files.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What "print-ready" means here</h2>
            <p className="mt-2">
              Each side of the card renders at 1050×600 pixels, which corresponds to a standard 3.5×2
              inch business card at 300 DPI — the resolution most print shops expect for sharp, non-blurry
              text and clean edges. You can hand the downloaded PNG files directly to a local or online
              print service without needing to resize or re-export anything.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with other business tools</h2>
            <p className="mt-2">
              Once your card design is set, the same contact details are often useful elsewhere — the
              site's{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              and{" "}
              <Link href="/tools/quote-builder" className="text-amber-400 underline underline-offset-2">
                Quote Builder
              </Link>{" "}
              both use the same kind of business information, so keeping them consistent across documents
              is easy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your details stay on your device</h2>
            <p className="mt-2">
              Because the card is rendered locally, this tool never sees or stores the information you
              enter here. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A few design tips</h2>
            <p className="mt-2">
              Keep a strong contrast between your text color and background color so the card stays
              readable from a normal viewing distance, not just up close. A single accent color used
              consistently — for your title, a border, or the back of the card — tends to look more
              polished than several competing colors. If your company name is long, watch the back-of-
              card preview to make sure it doesn't feel cramped against the tagline underneath it.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <BusinessCardDesignerClient />
    </ToolPageShell>
  );
}

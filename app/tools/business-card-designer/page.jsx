import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
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
    a: "Both sides render at 1050×600 pixels — a standard print resolution for a 3.5×2 inch card at 300 DPI. Note this design doesn't include a bleed margin (extra edge content that gets trimmed off during printing); for most standard print shops this works fine, but if a specific printer explicitly requires bleed, mention that to them, since this tool doesn't add it automatically.",
  },
  {
    q: "Can I design both the front and back?",
    a: "Yes — front includes your name, title, company, and contact details; the back shows your company name and a tagline. Both download as separate PNG files.",
  },
  {
    q: "Do you upload my information to a server?",
    a: "No. Both sides are rendered directly inside your browser using Canvas.",
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
              software. This tool renders both the front and back of a card directly inside your browser
              at real print resolution, updating live as you type.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Fill in your details for the front of the card.</li>
              <li>Add a tagline for the back.</li>
              <li>Adjust colors and download both sides.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Designing a card for a small business or freelance practice.</li>
              <li>Creating a simple, professional card before a networking event.</li>
              <li>Refreshing a card's design after a rebrand or contact info change.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What "print-ready" means — and one thing it doesn't include</h2>
            <p className="mt-2">
              Each side renders at 1050×600 pixels, matching a standard 3.5×2 inch business card at 300
              DPI, which most print shops expect for sharp text and clean edges. One honest technical
              note: this design doesn't include a bleed margin — extra background content extending
              slightly past the card's final edge, which some printers require so any tiny trimming
              misalignment doesn't leave a visible white sliver at the border. For most standard,
              non-edge-to-edge card designs and most print shops, this isn't an issue; if a specific
              printer explicitly asks for bleed, it's worth checking with them directly, since this tool
              exports at exact final size without one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              The same contact details are often useful elsewhere — the site's{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice Generator
              </Link>{" "}
              and{" "}
              <Link href="/tools/qr-code-generator" className="text-amber-400 underline underline-offset-2">
                QR Code Generator
              </Link>{" "}
              (for a scannable link on the card itself) both pair naturally.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="business-card-designer" />
        </>
      }
    >
      <BusinessCardDesignerClient />
    </ToolPageShell>
  );
}

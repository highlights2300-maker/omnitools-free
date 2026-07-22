import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";

export const metadata = {
  title: "Free QR Code Generator Online — No Sign Up, No Expiry | QuickZeta",
  description:
    "Generate a QR code for a link, plain text, or Wi-Fi login — free, with no sign up and no expiration date. Created and downloaded entirely in your browser.",
  keywords: [
    "free qr code generator online",
    "qr code generator no sign up",
    "wifi qr code generator",
    "qr code maker no expiry",
    "generate qr code for link free",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/qr-code-generator" },
  openGraph: {
    title: "Free QR Code Generator Online — No Sign Up, No Expiry",
    description: "Create a QR code entirely in your browser — for a link, text, or Wi-Fi network.",
    url: "https://quickzeta.com/tools/qr-code-generator",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this QR code generator really free, with no sign up?",
    a: "Yes. There's no account, no watermark, and no limit on how many QR codes you can create.",
  },
  {
    q: "Do these QR codes expire?",
    a: "No. Unlike some free QR code services that quietly generate a \"dynamic\" code pointing through their own server (which can stop working if you don't keep paying), this tool encodes your link, text, or Wi-Fi details directly into the QR code image itself. It will keep working indefinitely, with nothing dependent on this site staying online.",
  },
  {
    q: "Can I make a QR code for my Wi-Fi network?",
    a: "Yes — switch to the Wi-Fi tab, enter your network name and password, and the generated code will let a phone camera join the network automatically when scanned, no typing required.",
  },
  {
    q: "Is my information sent anywhere when I generate a code?",
    a: "No. The QR code is generated entirely inside your browser using your device's own processing — nothing you type is ever uploaded or transmitted.",
  },
  {
    q: "What can I use a QR code for besides links?",
    a: "Plain text (like a short message or a code), or Wi-Fi credentials, both work directly. For anything else — like contact details or a payment link — you can paste the properly formatted text into the \"Text\" tab.",
  },
];

export default function QrCodeGeneratorPage() {
  return (
    <ToolPageShell
      title="Free QR Code Generator"
      subtitle="Create a QR code for a link, text, or Wi-Fi network — no sign up, no expiry date, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A QR code generator that doesn't expire
            </h2>
            <p className="mt-2">
              A surprising number of "free" QR code generators create what's called a dynamic code — one
              that points to a link on their own server, which then redirects to your actual destination.
              That means if the service shuts down, changes its pricing, or you simply stop paying for a
              plan, every QR code you've ever printed or shared silently breaks. This generator does the
              opposite: your link, text, or Wi-Fi details are encoded directly into the QR code image
              itself, with nothing routed through a third party. Once it's generated, it works forever,
              independent of this site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Pick a type.</strong> Choose Link, Text, or Wi-Fi
                depending on what you want the code to do when scanned.
              </li>
              <li>
                <strong className="text-slate-200">Fill in the details.</strong> The QR code updates
                live in the preview as you type.
              </li>
              <li>
                <strong className="text-slate-200">Download the PNG.</strong> Save it and print it,
                paste it into a document, or share it digitally.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses for a QR code</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Linking a printed flyer or business card to a website or social profile.</li>
              <li>Letting guests join your Wi-Fi network without typing a long password.</li>
              <li>Sharing a menu, portfolio, or contact link at an event or storefront.</li>
              <li>
                Pairing with the site's own{" "}
                <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                  Invoice Generator
                </Link>{" "}
                or Business Card Designer to add a scannable link to printed materials.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your data stays on your device</h2>
            <p className="mt-2">
              Because the QR code is generated locally, nothing you type here is ever sent to a server.
              See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Tips for a QR code that scans reliably</h2>
            <p className="mt-2">
              A few small choices make a real difference in whether a printed QR code actually scans on
              the first try. Keep the code at a reasonable size — smaller than about an inch square can
              be hard for a phone camera to focus on from a normal distance. Make sure there's a clear
              quiet zone (plain background) around the edges rather than crowding it with other design
              elements, and avoid placing it over a busy photo or pattern that reduces contrast. If
              you're printing it, it's worth doing a quick test scan on the actual printed page before
              running off a large batch — a QR code that looks fine on screen can sometimes lose contrast
              on certain paper stocks or print settings.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <QrCodeGeneratorClient />
    </ToolPageShell>
  );
}

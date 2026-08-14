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
            <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                The trap a lot of "free" QR generators set
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Many free QR code sites quietly generate what's called a "dynamic" code — instead of your
                actual link, it points to a redirect on their own server. Print a thousand flyers with one
                of those, and if that company shuts down, changes pricing, or your free trial lapses,
                every single code silently stops working. This tool never does that: your link, text, or
                Wi-Fi details are baked directly into the QR image itself, so it keeps working forever,
                completely independent of this site.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Pick a type — Link, Text, or Wi-Fi, depending on what the code should do when scanned.</li>
              <li>Fill in the details — the preview updates live as you type.</li>
              <li>Download the PNG — print it, paste it into a document, or share it digitally.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What's actually stored inside the code</h2>
            <p className="mt-2">
              A QR code isn't a lookup key pointing somewhere else — for the "static" codes this tool
              creates, the black-and-white pattern itself directly encodes your actual text or link,
              broken down into binary data with a layer of built-in error correction. That error
              correction is why a QR code can still scan correctly even if it's partly scratched, faded,
              or has a small logo placed over the middle — the code carries enough redundancy to
              reconstruct the missing pieces, up to a point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting a code that scans reliably</h2>
            <p className="mt-2">
              A few small choices affect whether a printed code scans on the first try. Keep it larger
              than roughly an inch square — smaller than that can be hard for a phone camera to focus on
              from a normal distance. Leave a clear plain margin around the edges rather than crowding it
              with other design elements, and avoid placing it over a busy photo that reduces contrast. If
              you're printing a large batch, do one test scan on the actual printed page first — a code
              that looks fine on screen can sometimes lose contrast on certain paper stocks.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Linking a printed flyer or business card to a website or social profile.</li>
              <li>Letting guests join your Wi-Fi network without typing a long password.</li>
              <li>Sharing a menu, portfolio, or contact link at an event or storefront.</li>
              <li>
                Pairing with the site's own{" "}
                <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                  Invoice Generator
                </Link>{" "}
                or{" "}
                <Link href="/tools/business-card-designer" className="text-amber-400 underline underline-offset-2">
                  Business Card Designer
                </Link>{" "}
                to add a scannable link to printed materials.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing you enter is sent anywhere</h2>
            <p className="mt-2">
              The QR code is generated entirely on your device — see the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
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

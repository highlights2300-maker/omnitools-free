import StaticPageShell from "../components/StaticPageShell";

export const metadata = {
  title: "Frequently Asked Questions — QuickZeta",
  description:
    "Answers to common questions about how QuickZeta's browser-based tools work, whether they're really free, and how your files stay private.",
};

const FAQS = [
  {
    q: "Is QuickZeta actually free, with no hidden limits?",
    a: "Yes. Every tool works with no sign-up, no daily usage cap, and no watermark on your output. The site is supported by ads rather than subscriptions or per-file fees.",
  },
  {
    q: "Do you upload or store my files?",
    a: "No. Every tool processes your file directly inside your own browser. Nothing is uploaded to a server, which means we never see, store, or have access to what you're working on.",
  },
  {
    q: "Why does a tool need to download something the first time I use it?",
    a: "A few of the more advanced tools (like the background remover, PDF compressor, or video trimmer) use a specialized processing library. Rather than bundle that into every page load, we load it only when you actually open that specific tool — it's a one-time download per browser session, and it's still just code, not a place your files are sent.",
  },
  {
    q: "Will these tools work on my phone?",
    a: "Yes, the site is responsive and works in any modern mobile browser. Heavier tools like video trimming will run slower on an older phone than on a desktop, since your device is doing all the processing.",
  },
  {
    q: "Can I use the output commercially?",
    a: "Yes — files you create with these tools (invoices, business cards, compressed images, and so on) are yours to use however you'd like.",
  },
  {
    q: "Do the favorites/pins get saved anywhere online?",
    a: "No. Favorited tools are saved using your browser's local storage, on your device only. Clearing your browser data will reset them.",
  },
  {
    q: "Why is there no account or login?",
    a: "Because none of the tools need one. Everything runs locally, so there's nothing on a server tied to an account to keep track of.",
  },
  {
    q: "I found a bug — how do I report it?",
    a: "Please reach out through the contact page with what you were doing and what went wrong; screenshots help a lot.",
  },
];

export default function FaqPage() {
  return (
    <StaticPageShell eyebrow="Help" title="Frequently Asked Questions">
      <div className="space-y-6">
        {FAQS.map((item) => (
          <div key={item.q} className="border-b border-slate-800 pb-6 last:border-0">
            <h2 className="text-base font-semibold text-slate-100">{item.q}</h2>
            <p className="mt-2 text-slate-400">{item.a}</p>
          </div>
        ))}
      </div>
    </StaticPageShell>
  );
}

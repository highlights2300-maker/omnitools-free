import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import TextToSpeechClient from "./TextToSpeechClient";

export const metadata = {
  title: "Free Text to Speech Online — No Sign Up, No Download | QuickZeta",
  description:
    "Convert text to natural speech instantly, free, with no sign up. Choose a voice, adjust speed and pitch — powered by your browser's own speech engine.",
  keywords: [
    "free text to speech online",
    "text to speech no sign up",
    "read text aloud online free",
    "tts online no download",
    "text to voice converter free",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/text-to-speech" },
  openGraph: {
    title: "Free Text to Speech Online — No Sign Up, No Download",
    description: "Convert text to natural speech instantly, using your browser's own speech engine.",
    url: "https://quickzeta.com/tools/text-to-speech",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this text-to-speech tool really free, with no sign up?",
    a: "Yes. There's no account and no limit on how much text you can convert.",
  },
  {
    q: "Do you upload my text to a server?",
    a: "No. This uses your browser's own built-in speech synthesis feature, the same technology behind screen readers on your device.",
  },
  {
    q: "Why do the available voices differ between my devices?",
    a: "The voice list comes from your operating system and browser, not from this tool. A Mac, Windows PC, and Android phone all ship with different built-in voices, so options genuinely vary by device.",
  },
  {
    q: "Can I download the speech as an audio file?",
    a: "Not with this tool — it reads text aloud live rather than exporting a file.",
  },
];

export default function TextToSpeechPage() {
  return (
    <ToolPageShell
      title="Free Text to Speech"
      subtitle="Convert text to spoken audio instantly, with adjustable voice, speed, and pitch — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Speech powered by your own device
            </h2>
            <p className="mt-2">
              Rather than sending text to a server to generate audio, this tool uses a feature already
              built into your browser — the same technology behind screen readers. Speech starts
              instantly, with no upload or processing delay.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Type or paste text, pick a voice, adjust speed and pitch if you like, then press Play.
              Pause, resume, or stop at any point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Proofreading writing by ear — hearing awkward phrasing is often easier than spotting it visually.</li>
              <li>Listening to an article or document while doing something else.</li>
              <li>Checking how a script or line of dialogue sounds spoken aloud.</li>
              <li>A quick accessibility aid for anyone who finds listening easier than reading on screen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Instant — no server round-trip needed to start speaking</li>
                  <li>Adjustable speed and pitch</li>
                  <li>Works offline once the page has loaded</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Voice quality varies significantly by device</li>
                  <li>No downloadable audio file — playback only</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why the voice list looks different everywhere</h2>
            <p className="mt-2">
              This tool hands your text off to whichever speech engine your operating system and browser
              already provide, rather than shipping its own voices. That means the exact list of
              available voices, and how natural they sound, depends entirely on your device — a recent
              Mac or iPhone often includes quite polished-sounding voices by default; older systems or
              certain browsers may offer fewer, more clearly synthetic-sounding options.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Going the other direction — audio to text? The site's{" "}
              <Link href="/tools/audio-transcriber" className="text-amber-400 underline underline-offset-2">
                Audio Transcriber
              </Link>{" "}
              handles that.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="text-to-speech" />
        </>
      }
    >
      <TextToSpeechClient />
    </ToolPageShell>
  );
}

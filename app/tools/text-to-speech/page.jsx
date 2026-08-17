import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    a: "Yes. There's no account and no limit on how much text you can convert to speech.",
  },
  {
    q: "Do you upload my text to a server to generate the voice?",
    a: "No. This tool uses your browser's own built-in speech synthesis feature, the same technology behind screen readers and voice assistants on your device. Your text never leaves your browser to be processed.",
  },
  {
    q: "Why do the available voices look different on different devices?",
    a: "The voice list comes directly from your operating system and browser, not from this tool. A Mac, Windows PC, iPhone, and Android phone all ship with different built-in voices, so the options you see will vary depending on what you're using.",
  },
  {
    q: "Can I download the speech as an audio file?",
    a: "Not with this tool — it reads text aloud live rather than generating a downloadable file. If you need an audio file specifically, that requires a different kind of service that renders and exports the audio, rather than speaking it through your device's speakers in real time.",
  },
  {
    q: "Why does a voice sound robotic or unnatural?",
    a: "Voice quality depends entirely on what's built into your device — some systems ship with quite natural-sounding voices, while others are more clearly synthetic. If multiple voices are available in the dropdown, it's worth trying a few, since quality can vary a lot between them even on the same device.",
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
              Text to speech powered by your own device
            </h2>
            <p className="mt-2">
              Rather than sending your text to a server to generate audio, this tool uses a feature
              already built into your browser — the same underlying technology that powers screen
              readers and voice assistants. That means speech starts instantly, with no upload or
              processing delay, and your text never leaves your device to be converted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Type or paste text.</strong> Any length works, from a
                sentence to a full paragraph.
              </li>
              <li>
                <strong className="text-slate-200">Pick a voice.</strong> Choose from whichever voices
                your device and browser have available, and adjust speed and pitch if you like.
              </li>
              <li>
                <strong className="text-slate-200">Press Play.</strong> Pause, resume, or stop playback
                at any point.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Why the voice list looks different everywhere</h2>
            <p className="mt-2">
              This tool doesn't ship its own voices — it hands your text off to whichever speech engine
              your operating system and browser already provide. That means the exact list of available
              voices, and how natural they sound, depends entirely on your device. A recent Mac or iPhone
              often includes quite polished-sounding voices by default; older systems or certain browsers
              may offer fewer, more clearly synthetic-sounding options.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Proofreading writing by ear — hearing awkward phrasing is often easier than spotting it visually.</li>
              <li>Listening to an article or document while doing something else.</li>
              <li>Checking how a script or line of dialogue actually sounds spoken aloud.</li>
              <li>A quick accessibility aid for anyone who finds listening easier than reading on screen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing you type is stored</h2>
            <p className="mt-2">
              Because the speech is generated locally by your own device, this tool never sees or stores
              the text you convert here. See our{" "}
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
      <TextToSpeechClient />
    </ToolPageShell>
  );
}

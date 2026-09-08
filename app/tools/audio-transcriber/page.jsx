import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import AudioTranscriberClient from "./AudioTranscriberClient";

export const metadata = {
  title: "Free Audio Transcriber & Subtitle Generator Online | QuickZeta",
  description:
    "Transcribe speech to text and generate SRT subtitles, free, with no upload and no sign up. A real AI model runs directly in your browser — nothing is ever sent to a server.",
  keywords: [
    "free audio transcriber online",
    "speech to text no upload",
    "subtitle generator free no sign up",
    "generate srt file online",
    "transcribe audio browser",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/audio-transcriber" },
  openGraph: {
    title: "Free Audio Transcriber & Subtitle Generator Online",
    description: "Transcribe speech to text using an AI model that runs entirely in your browser.",
    url: "https://quickzeta.com/tools/audio-transcriber",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this transcriber really free, with no sign up?",
    a: "Yes. There's no account, no per-minute pricing, and no limit on how many files you can transcribe.",
  },
  {
    q: "Do you upload my audio to a server to transcribe it?",
    a: "No — and this is what makes it different from most transcription services. An AI speech-recognition model (OpenAI's Whisper) is downloaded once to your browser and runs there, meaning your audio is processed entirely on your own device. It's never sent anywhere.",
  },
  {
    q: "Why does it take a moment to load the first time?",
    a: "The first time you use this tool, it downloads the Whisper model — around 150MB. Your browser caches it afterward, so future transcriptions on the same device start almost instantly, without downloading it again.",
  },
  {
    q: "Does it support languages other than English?",
    a: "Not currently — this tool uses an English-specialized version of the Whisper model for the best accuracy and speed on English speech. Multilingual support may come in the future, but for now it's built and tuned specifically for English.",
  },
  {
    q: "How accurate is it?",
    a: "Genuinely good for clear speech with minimal background noise, though not perfect — accuracy drops with heavy accents, overlapping speakers, or a lot of background noise. It's worth reviewing the transcript rather than assuming it's flawless, the same as with any automated transcription tool.",
  },
  {
    q: "How long does transcription take?",
    a: "It depends on your device and the length of the audio — processing happens on your own computer's processor rather than dedicated server hardware, so a longer file or an older device will naturally take longer. A short clip on a modern laptop is typically fast; a long recording on an older device will take a while.",
  },
  {
    q: "What do I get — just text, or subtitles too?",
    a: "Both. A plain .txt transcript, and if timestamps were detected, a properly formatted .srt subtitle file ready to use with most video players and editors.",
  },
];

export default function AudioTranscriberPage() {
  return (
    <ToolPageShell
      title="Free Audio Transcriber & Subtitle Generator"
      subtitle="Transcribe speech to text and generate SRT subtitles using a real AI model — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A real AI transcription model, running in your browser
            </h2>
            <p className="mt-2">
              Most free transcription tools upload your audio to a server, process it there, and send
              back the result — meaning your recording, even briefly, passes through a computer you
              don't control. This tool works differently: it downloads OpenAI's Whisper speech
              recognition model once to your browser and runs it directly on your own device, so your
              audio is never transmitted anywhere to be transcribed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose an audio file.</strong> Drag one in or tap to
                select it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Click "Transcribe."</strong> The first time, your
                browser downloads the speech model — after that, it's cached and starts almost instantly
                on future uses.
              </li>
              <li>
                <strong className="text-slate-200">Download the result.</strong> Get a plain text
                transcript, or an SRT subtitle file with timestamps.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What to expect, honestly</h2>
            <p className="mt-2">
              This is genuine machine learning running on your own hardware, not a server farm built for
              this exact task — so it's worth setting expectations accordingly. The first use downloads
              roughly 150MB once. Processing speed depends on your device: a short clip on a reasonably
              modern computer finishes quickly, while a long recording on an older laptop will take real
              time. Currently, this tool is built and tuned specifically for English speech; accuracy is
              good for clear audio but will drop with heavy accents, overlapping speakers, or significant
              background noise, the same as any automated transcription.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Generating subtitles for a video before uploading it somewhere.</li>
              <li>Turning a voice memo or interview recording into searchable, editable text.</li>
              <li>Getting a rough transcript of a meeting or lecture recording.</li>
              <li>Drafting captions for accessibility, then refining them by hand.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">If background noise is a problem</h2>
            <p className="mt-2">
              A noisy recording can meaningfully hurt transcription accuracy. If your audio has
              significant background hiss or hum, running it through the site's{" "}
              <Link href="/tools/audio-noise-remover" className="text-amber-400 underline underline-offset-2">
                Audio Noise Remover
              </Link>{" "}
              first can sometimes improve the transcript quality here.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your audio never leaves your device</h2>
            <p className="mt-2">
              Because the model runs locally, this tool never sees or stores the audio you transcribe
              here. See our{" "}
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
      <AudioTranscriberClient />
    </ToolPageShell>
  );
}

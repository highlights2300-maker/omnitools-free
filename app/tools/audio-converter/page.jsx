import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import AudioConverterClient from "./AudioConverterClient";

export const metadata = {
  title: "Free Audio Converter Online — MP3, WAV, OGG, M4A | QuickZeta",
  description:
    "Convert audio between MP3, WAV, OGG, and M4A, free, with no upload and no sign up. Converted entirely in your browser using a real audio engine.",
  keywords: [
    "free audio converter online",
    "convert mp3 to wav no upload",
    "audio format converter no sign up",
    "wav to mp3 converter free",
    "ogg to mp3 converter online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/audio-converter" },
  openGraph: {
    title: "Free Audio Converter Online — MP3, WAV, OGG, M4A",
    description: "Convert audio between common formats, entirely in your browser.",
    url: "https://quickzeta.com/tools/audio-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this audio converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many audio files you can convert.",
  },
  {
    q: "Do you upload my audio file to a server?",
    a: "No. The conversion runs using a real audio-processing engine that loads and runs directly inside your browser — your file is never sent anywhere.",
  },
  {
    q: "Why does it take a moment to load the first time?",
    a: "The first time you use this tool, your browser downloads the audio engine it needs. This is a one-time download per browser session — the actual conversion starts right away afterward.",
  },
  {
    q: "Which formats are supported?",
    a: "You can convert between MP3, WAV, OGG, and M4A in any direction.",
  },
  {
    q: "Which format should I choose?",
    a: "MP3 is the most universally compatible compressed format. WAV is uncompressed and lossless, but produces a much larger file — useful for editing or archival. OGG is an open compressed format supported by most modern browsers and apps. M4A is common on Apple devices and services.",
  },
  {
    q: "Will converting reduce the audio quality?",
    a: "Converting to a compressed format like MP3 or OGG involves some lossy compression, similar to the original recording format. Converting to WAV is lossless. Converting between two already-compressed formats (like MP3 to OGG) can introduce a small additional quality loss, since the audio is decoded and re-encoded.",
  },
];

export default function AudioConverterPage() {
  return (
    <ToolPageShell
      title="Free Audio Converter"
      subtitle="Convert between MP3, WAV, OGG, and M4A — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Convert audio formats without uploading anywhere
            </h2>
            <p className="mt-2">
              Different devices, platforms, and software sometimes only accept specific audio formats,
              which usually means uploading a file to some other website first just to convert it. This
              tool runs a real audio-processing engine directly inside your browser instead — your audio
              file is converted entirely on your own device and never sent to a server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Choose your audio file.</strong> Drag one in or tap
                to select it from your device.
              </li>
              <li>
                <strong className="text-slate-200">Pick a target format.</strong> Choose MP3, WAV, OGG,
                or M4A.
              </li>
              <li>
                <strong className="text-slate-200">Convert and download.</strong> The first run downloads
                a small audio engine, then processes and exports your converted file.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing the right format</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">MP3</strong> — the most widely compatible format,
                good for general listening and sharing.
              </li>
              <li>
                <strong className="text-slate-200">WAV</strong> — uncompressed and lossless, best for
                editing or archiving, at a much larger file size.
              </li>
              <li>
                <strong className="text-slate-200">OGG</strong> — an open, compressed format supported by
                most modern browsers and media players.
              </li>
              <li>
                <strong className="text-slate-200">M4A</strong> — common on Apple devices and services
                like Apple Music and Voice Memos.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Converting a voice recording to a more universally compatible format before sharing it,
              turning a WAV export from audio editing software into a smaller MP3 for everyday listening,
              or preparing a file in the specific format a particular app, podcast platform, or device
              requires are some of the most common reasons people need an audio converter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your audio never leaves your device</h2>
            <p className="mt-2">
              Because everything runs locally, this tool never sees or stores the audio you convert here.
              See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details on how QuickZeta handles data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on file size</h2>
            <p className="mt-2">
              WAV files are typically five to ten times larger than an equivalent MP3, since WAV stores
              audio completely uncompressed. If you're converting to free up storage space or make a file
              easier to send, MP3 or OGG will produce a noticeably smaller result — WAV is really only
              worth choosing when you specifically need lossless quality for further editing.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <AudioConverterClient />
    </ToolPageShell>
  );
}

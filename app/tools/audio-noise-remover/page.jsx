import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import AudioNoiseRemoverClient from "./AudioNoiseRemoverClient";

export const metadata = {
  title: "Free Audio Noise Remover & Enhancer Online — No Upload | QuickZeta",
  description:
    "Reduce background hiss and even out volume in an audio recording, free, with no upload and no sign up. Processed entirely in your browser using real audio engineering techniques.",
  keywords: [
    "free audio noise remover online",
    "remove background noise audio no upload",
    "audio enhancer no sign up",
    "reduce hiss recording free",
    "normalize audio volume online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/audio-noise-remover" },
  openGraph: {
    title: "Free Audio Noise Remover & Enhancer Online — No Upload",
    description: "Reduce background hiss and even out volume, entirely in your browser.",
    url: "https://quickzeta.com/tools/audio-noise-remover",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this audio enhancer really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many files you can process.",
  },
  {
    q: "Do you upload my audio to a server?",
    a: "No. Every step — filtering, noise reduction, and volume normalization — runs directly in your browser using the Web Audio API. Your recording is never sent anywhere.",
  },
  {
    q: "What does this actually do to my audio?",
    a: "Three things: a high-pass filter removes low-frequency rumble and hum below about 90Hz, a noise gate reduces the volume of quiet background hiss between sounds (without cutting off the sounds themselves), and an optional normalization step brings the overall volume up to a consistent, louder level.",
  },
  {
    q: "Will this remove noise that's happening at the same time as speech?",
    a: "Not fully — this tool is a noise gate, not a source-separation AI. It's very effective at cleaning up quiet moments between words or sounds (room tone, background hum, hiss), but noise happening at the exact same time as speech (like a fan running constantly underneath someone talking) will still be present, just at a somewhat reduced overall level thanks to the compressor stage.",
  },
  {
    q: "What file format do I get back?",
    a: "A WAV file — uncompressed and lossless, so no additional quality is lost during processing. If you need a smaller compressed file afterward, the site's Audio Converter can convert it to MP3 or another format.",
  },
  {
    q: "Why does higher noise reduction strength sometimes sound choppy?",
    a: "Pushing the strength very high can make quiet transitions more noticeable, since more of the signal is being gated down. If a result sounds unnatural, try a lower strength setting — often somewhere in the 40–60% range gives the best balance between noise reduction and natural-sounding audio.",
  },
];

export default function AudioNoiseRemoverPage() {
  return (
    <ToolPageShell
      title="Free Audio Noise Remover & Enhancer"
      subtitle="Reduce background hiss and even out volume in a recording — no upload, no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Real audio processing, not a black box
            </h2>
            <p className="mt-2">
              A recording made with a phone or a basic microphone often carries a constant low hum,
              background hiss, and inconsistent volume between quiet and loud moments. This tool applies
              three genuine, well-established audio engineering techniques — directly inside your
              browser — to clean that up: a filter to remove low-frequency rumble, a noise gate to quiet
              background hiss between sounds, and normalization to even out the overall volume.
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
                <strong className="text-slate-200">Set the noise reduction strength.</strong> Higher
                values gate down quiet background noise more aggressively.
              </li>
              <li>
                <strong className="text-slate-200">Enhance and compare.</strong> Listen to the original
                and processed versions side by side before downloading.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">What's actually happening, technically</h2>
            <p className="mt-2">
              The audio first passes through a high-pass filter, which removes frequencies below about
              90Hz — this is where most rumble, handling noise, and electrical hum tend to live, well
              below the range of most speech and music. It then passes through a compressor, which
              reduces the gap between the loudest and quietest parts of the recording. Finally, a noise
              gate — a technique that reduces volume when the signal drops below a set threshold, with a
              fast attack and a slow release to avoid audible clicks — quiets down the background noise
              that's audible during pauses, without cutting off the actual sounds you want to keep.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Getting the best result</h2>
            <p className="mt-2">
              This tool works best on recordings where the unwanted noise is a fairly constant, quiet
              hum or hiss — a room's air conditioning, a phone's built-in microphone noise floor, a
              slight electrical hum. It's less effective against noise happening at the same volume and
              time as the sound you want to keep, since a gate can only reduce volume during quiet
              moments, not separate two overlapping sounds. Starting with a moderate strength setting and
              adjusting from there usually gives the most natural-sounding result.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing you upload here is stored</h2>
            <p className="mt-2">
              Because all processing happens locally, this tool never sees or stores the audio you use
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
      <AudioNoiseRemoverClient />
    </ToolPageShell>
  );
}

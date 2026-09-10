import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import AudioConverterClient from "./AudioConverterClient";

export const metadata = {
  title: "Free Audio Converter Online — MP3, WAV, OGG, No Upload | QuickZeta",
  description:
    "Convert audio between MP3, WAV, and OGG, free, with no upload and no sign up. Powered by FFmpeg running entirely in your browser.",
  keywords: [
    "free audio converter online",
    "convert mp3 to wav no upload",
    "audio format converter free",
    "wav to mp3 online no sign up",
    "convert ogg audio online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/audio-converter" },
  openGraph: {
    title: "Free Audio Converter Online — MP3, WAV, OGG, No Upload",
    description: "Convert between MP3, WAV, and OGG entirely in your browser.",
    url: "https://quickzeta.com/tools/audio-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this audio converter really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many files you can convert.",
  },
  {
    q: "Do you upload my audio to a server?",
    a: "No. Conversion runs through FFmpeg compiled to WebAssembly, executing directly in your browser — your audio file is never transmitted anywhere.",
  },
  {
    q: "Which format should I actually use?",
    a: "MP3 for broad compatibility and small file size when some quality loss is acceptable, WAV when you need lossless quality (like for further editing) and file size doesn't matter, and OGG when you specifically need an open, patent-free format, common in some software and games.",
  },
  {
    q: "Will converting to MP3 lower the quality?",
    a: "Yes, if you're converting from a lossless format like WAV — MP3 is a lossy format, meaning it discards some audio data to shrink file size. Converting between two lossy formats (like OGG to MP3) can compound quality loss slightly further, since each lossy encoding step loses a bit more.",
  },
  {
    q: "Why is my WAV file so much larger than the original?",
    a: "WAV stores audio uncompressed, so it's inherently large regardless of the source. If you're converting from a compressed format like MP3 to WAV, the file size increases substantially even though no new audio detail is actually being added — it's just stored less efficiently.",
  },
  {
    q: "Is there a file size or length limit?",
    a: "No hard limit, though longer audio files naturally take more time to process since your own device's processor handles the conversion.",
  },
];

export default function AudioConverterPage() {
  return (
    <ToolPageShell
      title="Free Audio Converter"
      subtitle="Convert between MP3, WAV, and OGG — no upload, no sign up, powered by real FFmpeg."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Real format conversion, running in your browser
            </h2>
            <p className="mt-2">
              A voice memo in the wrong format, an audio file a piece of software won't accept, a
              recording that needs to be smaller before sharing — audio format mismatches come up
              constantly. This tool converts between MP3, WAV, and OGG using FFmpeg compiled to
              WebAssembly, running entirely inside your browser rather than uploading your file to a
              server first.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Choosing a format</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="py-2 pr-4 font-medium">Format</th>
                    <th className="py-2 pr-4 font-medium">Compression</th>
                    <th className="py-2 pr-4 font-medium">File size</th>
                    <th className="py-2 font-medium">Best for</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4 font-medium text-slate-100">MP3</td>
                    <td className="py-2 pr-4">Lossy</td>
                    <td className="py-2 pr-4">Small</td>
                    <td className="py-2 text-slate-400">Broad compatibility, sharing, general listening</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4 font-medium text-slate-100">WAV</td>
                    <td className="py-2 pr-4">Lossless</td>
                    <td className="py-2 pr-4">Large</td>
                    <td className="py-2 text-slate-400">Editing, archiving, when quality matters most</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="py-2 pr-4 font-medium text-slate-100">OGG</td>
                    <td className="py-2 pr-4">Lossy</td>
                    <td className="py-2 pr-4">Small</td>
                    <td className="py-2 text-slate-400">Open format needs, games, some software</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Upload the audio file you want to convert.</li>
              <li>Choose the target format.</li>
              <li>Download the converted file once processing finishes.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Real FFmpeg conversion, not a simplified reimplementation</li>
                  <li>No upload wait, no server queue</li>
                  <li>No conversion count limit</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>Converting lossy-to-lossy compounds quality loss slightly</li>
                  <li>Converting to WAV doesn't restore detail lost in a prior lossy encode</li>
                  <li>Longer files take proportionally longer to process</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A note on bitrate</h2>
            <p className="mt-2">
              When audio is encoded into a lossy format like MP3, its bitrate controls how much detail
              gets kept — higher bitrates mean better quality and larger files, lower bitrates mean
              smaller files with more audible compression artifacts, especially in complex music with
              many instruments. For spoken-word audio like a podcast or a recorded meeting, a fairly
              modest bitrate is usually perfectly acceptable, since speech doesn't demand the same
              fidelity music does.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              If your audio has background noise, the site's{" "}
              <Link href="/tools/audio-noise-remover" className="text-amber-400 underline underline-offset-2">
                Audio Noise Remover & Enhancer
              </Link>{" "}
              is worth running before converting, and{" "}
              <Link href="/tools/audio-transcriber" className="text-amber-400 underline underline-offset-2">
                Audio Transcriber
              </Link>{" "}
              can turn spoken audio into text once it's in a format you're happy with.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Nothing leaves your device</h2>
            <p className="mt-2">
              Conversion happens locally — see the{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="audio-converter" />
        </>
      }
    >
      <AudioConverterClient />
    </ToolPageShell>
  );
}

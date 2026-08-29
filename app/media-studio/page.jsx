import { Camera } from "lucide-react";
import CategoryHubShell from "../components/CategoryHubShell";

export const metadata = {
  title: "Free Image, Video & Audio Tools Online | QuickZeta",
  description:
    "Compress, crop, and convert images, trim video, convert audio, remove backgrounds, and more — all free, with no upload and no sign up. Every tool runs entirely in your browser.",
  keywords: [
    "free image tools online",
    "free video audio tools no upload",
    "background remover compress convert free",
    "media tools no sign up",
  ],
  alternates: { canonical: "https://quickzeta.com/media-studio" },
  openGraph: {
    title: "Free Image, Video & Audio Tools Online",
    description: "Compress, crop, convert, and edit media entirely in your browser.",
    url: "https://quickzeta.com/media-studio",
    type: "website",
  },
};

const TOOLS = [
  { name: "Image Compressor", desc: "Shrink photos up to 80% with barely any quality loss.", href: "/tools/image-compressor" },
  { name: "Image Cropper & Resizer", desc: "Crop, resize and export to exact dimensions.", href: "/tools/image-cropper" },
  { name: "Video Trimmer", desc: "Cut clips down to the moment that matters.", href: "/tools/video-trimmer" },
  { name: "Audio Converter", desc: "Convert between MP3, WAV and OGG.", href: "/tools/audio-converter" },
  { name: "QR Code Generator", desc: "Generate a scannable code for a link or text.", href: "/tools/qr-code-generator" },
  { name: "Background Remover", desc: "Lift subjects off their background with one click.", href: "/tools/background-remover" },
  { name: "Meme Generator", desc: "Drop top & bottom captions on any image.", href: "/tools/meme-generator" },
  { name: "Photo Collage Maker", desc: "Arrange several photos into one grid layout.", href: "/tools/photo-collage-maker" },
  { name: "Image Format Converter", desc: "Convert between JPG, PNG, WebP and more.", href: "/tools/image-format-converter" },
  { name: "GIF Maker", desc: "Turn a sequence of photos into a looping GIF.", href: "/tools/gif-maker" },
];

export default function MediaStudioPage() {
  return (
    <CategoryHubShell
      title="Media Studio"
      subtitle="Compress, crop, convert, and edit images, audio, and video — all on your own device."
      icon={Camera}
      accentClass="bg-violet-400/10 text-violet-400"
      tools={TOOLS}
    >
      <h2 className="text-lg font-semibold text-slate-100">
        Real media processing, without a server in the middle
      </h2>
      <p>
        Media Studio brings together ten tools for the most common things people need to do with a
        photo, an audio clip, or a short video — shrink it, crop it, convert its format, lift a subject
        off its background, or turn a handful of frames into a looping GIF. What sets these apart from
        typical free media tools is where the actual processing happens: entirely inside your browser,
        using your own device's processing power, rather than uploading your file to a remote server
        first.
      </p>
      <p>
        This isn't a simplified or watered-down version of what a server-based tool would do — it's
        genuinely the same category of technology, just relocated. Background removal runs a real AI
        segmentation model downloaded once to your browser and cached for future use. Video trimming
        uses FFmpeg, the same industry-standard media engine used by countless professional tools,
        compiled to WebAssembly so it runs directly in a browser tab. Image compression and format
        conversion use the Canvas feature built into every modern browser. None of it depends on a
        server to function, which means none of it is capped by one either.
      </p>
      <p>
        The practical upshot: no daily limit on how many images you can compress, no watermark stamped
        across a background-removed photo, and no upload wait even for a larger video file, since
        there's no upload step at all. Whether you're prepping product photos for an online store,
        shrinking a phone photo before emailing it, or cutting a screen recording down to the important
        few seconds, these tools are built to handle it in the same tab you're already working in.
      </p>
      <p>
        Each tool below has its own dedicated page with full instructions and format details — click
        through to get started. If you're not sure which one fits your situation, the tool descriptions
        below are written to make that obvious at a glance rather than requiring guesswork.
      </p>
    </CategoryHubShell>
  );
}

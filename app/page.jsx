"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  QrCode,
  FileSpreadsheet,
  Archive,
  Scissors,
  Wand2,
  Receipt,
  PenTool,
  Briefcase,
  Pin,
  Search,
  Plus,
  Trash2,
  Printer,
  X,
  Loader2,
  CheckCircle2,
  UploadCloud,
  ArrowLeft,
  Star,
  ShieldCheck,
  Zap,
  Lock,
  FileSignature,
  Layers,
  Crop,
  FileOutput,
  BadgeCheck,
  Shrink,
  Droplet,
  KeyRound,
  FileJson,
  ImagePlus,
  LayoutGrid,
  Repeat,
  Clapperboard,
  ClipboardList,
  FileCheck2,
  Ruler,
  HandCoins,
  Percent,
  Cake,
  Clock3,
  Calculator,
  ChevronUp,
  ChevronDown,
  FileStack,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Static data                                                                */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  {
    id: "document-desk",
    name: "Document Desk",
    tagline: "Merge, convert & tidy up paperwork — nothing leaves your browser.",
    accent: "sky",
  },
  {
    id: "media-studio",
    name: "Media Studio",
    tagline: "Compress, crop & convert images, audio and video on the fly.",
    accent: "fuchsia",
  },
  {
    id: "business-kits",
    name: "Business Kits",
    tagline: "Invoices, quotes and templates for running your own show.",
    accent: "emerald",
  },
  {
    id: "quick-calculators",
    name: "Quick Calculators",
    tagline: "Everyday math — instant answers, computed right on your device.",
    accent: "rose",
  },
];

const ACCENT_MAP = {
  sky: {
    ring: "ring-sky-400/30",
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
    dot: "bg-sky-400",
  },
  fuchsia: {
    ring: "ring-fuchsia-400/30",
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-400/10",
    border: "border-fuchsia-400/20",
    dot: "bg-fuchsia-400",
  },
  emerald: {
    ring: "ring-emerald-400/30",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
  },
  rose: {
    ring: "ring-rose-400/30",
    text: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    dot: "bg-rose-400",
  },
};

const TOOLS = [
  // Document Desk
  {
    id: "pdf-merge",
    name: "PDF Merger",
    desc: "Combine multiple PDFs into a single file, in order.",
    icon: Layers,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "pdf-split",
    name: "PDF Splitter",
    desc: "Break a large PDF into separate single-page files.",
    icon: Scissors,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "img-to-pdf",
    name: "Image → PDF",
    desc: "Turn JPG/PNG scans into one clean, print-ready PDF.",
    icon: FileOutput,
    category: "document-desk",
    kind: "simulated",
    steps: ["Loading images…", "Normalizing orientation…", "Composing pages…"],
  },
  {
    id: "word-counter",
    name: "Word Counter",
    desc: "Instant word, character & reading-time count as you type.",
    icon: FileText,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "e-signature",
    name: "E-Signature Pad",
    desc: "Draw a signature and drop it onto any document.",
    icon: FileSignature,
    category: "document-desk",
    kind: "simulated",
    steps: ["Loading canvas…", "Vectorizing stroke…", "Embedding signature…"],
  },
  {
    id: "file-archiver",
    name: "File Archiver",
    desc: "Zip up several files into one lightweight archive.",
    icon: Archive,
    category: "document-desk",
    kind: "simulated",
    steps: ["Collecting files…", "Deflating contents…", "Sealing archive…"],
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    desc: "Shrink PDF file size for email, with no daily task cap.",
    icon: Shrink,
    category: "document-desk",
    kind: "simulated",
    steps: ["Analyzing document…", "Re-compressing images…", "Rebuilding PDF…"],
  },
  {
    id: "pdf-watermark",
    name: "PDF Watermarker",
    desc: "Stamp a text or logo watermark across every page.",
    icon: Droplet,
    category: "document-desk",
    kind: "simulated",
    steps: ["Loading pages…", "Placing watermark…", "Flattening layers…"],
  },
  {
    id: "pdf-unlock",
    name: "PDF Password Remover",
    desc: "Remove a password from a PDF you own the rights to.",
    icon: KeyRound,
    category: "document-desk",
    kind: "simulated",
    steps: ["Verifying access…", "Decrypting pages…", "Saving unlocked copy…"],
  },
  {
    id: "csv-json-converter",
    name: "CSV ⇄ JSON Converter",
    desc: "Convert spreadsheet data to JSON, or JSON back to CSV.",
    icon: FileJson,
    category: "document-desk",
    kind: "simulated",
    steps: ["Parsing input…", "Mapping fields…", "Writing output file…"],
  },

  // Media Studio
  {
    id: "img-compressor",
    name: "Image Compressor",
    desc: "Shrink photos up to 80% with barely any quality loss.",
    icon: ImageIcon,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "img-cropper",
    name: "Image Cropper & Resizer",
    desc: "Crop, resize and export images to exact dimensions.",
    icon: Crop,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "video-trimmer",
    name: "Video Trimmer",
    desc: "Cut clips down to the moment that matters, no upload wait.",
    icon: Video,
    category: "media-studio",
    kind: "simulated",
    steps: ["Reading frames…", "Seeking cut points…", "Encoding trimmed clip…"],
  },
  {
    id: "audio-converter",
    name: "Audio Converter",
    desc: "Convert between MP3, WAV and OGG in your browser.",
    icon: Music,
    category: "media-studio",
    kind: "simulated",
    steps: ["Decoding audio…", "Resampling…", "Encoding output format…"],
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    desc: "Generate a scannable QR code for a link, text or contact.",
    icon: QrCode,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "bg-remover",
    name: "Background Remover",
    desc: "Lift subjects off their background with one click.",
    icon: Wand2,
    category: "media-studio",
    kind: "simulated",
    steps: ["Segmenting subject…", "Refining edges…", "Compositing transparent PNG…"],
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    desc: "Drop top & bottom captions on any image in seconds.",
    icon: ImagePlus,
    category: "media-studio",
    kind: "simulated",
    steps: ["Loading image…", "Placing caption text…", "Flattening output…"],
  },
  {
    id: "photo-collage",
    name: "Photo Collage Maker",
    desc: "Arrange several photos into one shareable grid layout.",
    icon: LayoutGrid,
    category: "media-studio",
    kind: "simulated",
    steps: ["Loading photos…", "Arranging grid…", "Rendering collage…"],
  },
  {
    id: "img-format-converter",
    name: "Image Format Converter",
    desc: "Convert between JPG, PNG, WebP and more, instantly.",
    icon: Repeat,
    category: "media-studio",
    kind: "simulated",
    steps: ["Decoding source…", "Re-encoding format…", "Optimizing output…"],
  },
  {
    id: "gif-maker",
    name: "GIF Maker",
    desc: "Turn a short clip or image sequence into a looping GIF.",
    icon: Clapperboard,
    category: "media-studio",
    kind: "simulated",
    steps: ["Reading frames…", "Building palette…", "Encoding GIF…"],
  },

  // Business Kits
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    desc: "Build a professional invoice and print it straight to PDF.",
    icon: Receipt,
    category: "business-kits",
    kind: "invoice",
  },
  {
    id: "quote-builder",
    name: "Quote Builder",
    desc: "Put together a polished price quote for a prospective client.",
    icon: FileSpreadsheet,
    category: "business-kits",
    kind: "simulated",
    steps: ["Loading template…", "Calculating line items…", "Formatting document…"],
  },
  {
    id: "business-card",
    name: "Business Card Designer",
    desc: "Design a print-ready double-sided business card.",
    icon: Briefcase,
    category: "business-kits",
    kind: "simulated",
    steps: ["Laying out grid…", "Placing typography…", "Rendering bleed & margins…"],
  },
  {
    id: "contract-template",
    name: "Contract Template Kit",
    desc: "Fill in a simple service-agreement template in minutes.",
    icon: PenTool,
    category: "business-kits",
    kind: "simulated",
    steps: ["Loading clauses…", "Merging your details…", "Finalizing document…"],
  },
  {
    id: "receipt-generator",
    name: "Receipt Generator",
    desc: "Create a simple, printable payment receipt for a client.",
    icon: FileCheck2,
    category: "business-kits",
    kind: "simulated",
    steps: ["Loading template…", "Filling receipt details…", "Formatting for print…"],
  },
  {
    id: "proposal-builder",
    name: "Proposal Builder",
    desc: "Draft a clean project proposal to send to a prospect.",
    icon: ClipboardList,
    category: "business-kits",
    kind: "simulated",
    steps: ["Loading template…", "Structuring sections…", "Formatting document…"],
  },

  // Quick Calculators — fully real, instant, computed client-side
  {
    id: "unit-converter",
    name: "Unit Converter",
    desc: "Convert length, weight & temperature — instant, exact.",
    icon: Ruler,
    category: "quick-calculators",
    kind: "instant",
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    desc: "Split a bill and work out the tip in a couple of taps.",
    icon: HandCoins,
    category: "quick-calculators",
    kind: "instant",
  },
  {
    id: "percentage-calculator",
    name: "Percentage & Markup Calculator",
    desc: "Work out percentages, discounts and price markups fast.",
    icon: Percent,
    category: "quick-calculators",
    kind: "instant",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    desc: "Find the exact age or duration between two dates.",
    icon: Cake,
    category: "quick-calculators",
    kind: "instant",
  },
  {
    id: "timesheet-calculator",
    name: "Timesheet Calculator",
    desc: "Add up hours worked and pay for the week, instantly.",
    icon: Clock3,
    category: "quick-calculators",
    kind: "instant",
  },
];

const FAVORITES_KEY = "omnitools:favorites";

/* -------------------------------------------------------------------------- */
/*  Small shared pieces                                                        */
/* -------------------------------------------------------------------------- */

function AdSlot({ variant = "rail", className = "" }) {
  const sizeClasses =
    variant === "rail"
      ? "w-full h-[600px]"
      : variant === "banner"
      ? "w-full h-24 md:h-28"
      : "w-full h-40";

  return (
    <div
      className={`no-print ${sizeClasses} ${className} rounded-xl border border-dashed border-slate-700 bg-slate-900/40 flex flex-col items-center justify-center gap-2 text-slate-600`}
      aria-hidden="true"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
        Advertisement
      </span>
      <div className="h-8 w-8 rounded-md border border-slate-700 flex items-center justify-center text-slate-700">
        <Zap className="h-4 w-4" />
      </div>
      <span className="text-[10px] font-mono text-slate-700">
        {variant === "rail" ? "300 × 600" : variant === "banner" ? "728 × 90" : "336 × 280"}
      </span>
    </div>
  );
}

function CategoryBadge({ accent, children }) {
  const a = ACCENT_MAP[accent];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${a.border} ${a.bg} px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider ${a.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
      {children}
    </span>
  );
}

function ToolCard({ tool, category, isFavorite, onToggleFavorite, onOpen }) {
  const a = ACCENT_MAP[category.accent];
  const Icon = tool.icon;
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-slate-700 hover:bg-slate-900 hover:shadow-lg hover:shadow-black/30`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(tool.id);
        }}
        aria-label={isFavorite ? "Unpin from favorites" : "Pin to favorites"}
        className={`absolute right-3 top-3 rounded-full p-1.5 transition ${
          isFavorite
            ? "text-amber-400"
            : "text-slate-600 opacity-0 group-hover:opacity-100 hover:text-amber-300"
        }`}
      >
        <Pin className={`h-4 w-4 ${isFavorite ? "fill-amber-400" : ""}`} />
      </button>

      <button onClick={() => onOpen(tool)} className="flex flex-1 flex-col items-start text-left">
        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${a.bg} ${a.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="pr-6 text-sm font-semibold text-slate-100">{tool.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{tool.desc}</p>
        <span
          className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${a.text} opacity-0 transition group-hover:opacity-100`}
        >
          Open tool →
        </span>
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Simulated tool runner (Processing… mockup)                                 */
/* -------------------------------------------------------------------------- */

function SimulatedToolRunner({ tool, onClose }) {
  const [phase, setPhase] = useState("idle"); // idle | processing | done
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef(null);

  const steps = tool.steps && tool.steps.length ? tool.steps : ["Processing your file…"];

  const start = () => {
    setPhase("processing");
    setProgress(0);
    setStepIndex(0);
  };

  useEffect(() => {
    if (phase !== "processing") return;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 14 + 6);
        const stepAt = Math.floor((next / 100) * steps.length);
        setStepIndex(Math.min(steps.length - 1, stepAt));
        if (next >= 100) {
          clearInterval(timerRef.current);
          setTimeout(() => setPhase("done"), 350);
        }
        return next;
      });
    }, 380);
    return () => clearInterval(timerRef.current);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setPhase("idle");
    setProgress(0);
    setStepIndex(0);
  };

  const Icon = tool.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/90 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">{tool.name}</h2>
              <p className="text-xs text-slate-500">Runs 100% locally in your browser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_260px]">
          {/* Main interaction column */}
          <div>
            {phase === "idle" && (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-16 text-center">
                <UploadCloud className="mb-4 h-10 w-10 text-slate-600" />
                <p className="text-sm font-medium text-slate-300">Drag & drop a file here</p>
                <p className="mt-1 text-xs text-slate-500">or click below to choose a sample file</p>
                <button
                  onClick={start}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  <Zap className="h-4 w-4" />
                  Use sample file & start
                </button>
              </div>
            )}

            {phase === "processing" && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 px-6 py-16 text-center">
                <Loader2 className="mb-5 h-9 w-9 animate-spin text-amber-400" />
                <p className="text-sm font-medium text-slate-200">{steps[stepIndex]}</p>
                <div className="mt-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-slate-500">{Math.floor(progress)}%</p>
                <p className="mt-6 max-w-xs text-[11px] leading-relaxed text-slate-600">
                  Everything happens on your device — no file is ever uploaded to a server.
                </p>
              </div>
            )}

            {phase === "done" && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-400/5 px-6 py-16 text-center">
                <CheckCircle2 className="mb-4 h-10 w-10 text-emerald-400" />
                <p className="text-sm font-semibold text-slate-100">All done!</p>
                <p className="mt-1 text-xs text-slate-500">Your file was processed locally and is ready.</p>
                <div className="mt-6 flex gap-3">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
                    <FileOutput className="h-4 w-4" />
                    Download result
                  </button>
                  <button
                    onClick={reset}
                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                  >
                    Process another
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ad rail beside the action — max viewability while user waits */}
          <div className="hidden md:block">
            <AdSlot variant="square" />
          </div>
        </div>

        <div className="border-t border-slate-800 px-6 py-3">
          <p className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <Lock className="h-3 w-3" />
            Zero-logs: nothing about this file or session is stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Instant word counter tool                                                 */
/* -------------------------------------------------------------------------- */

function WordCounterTool({ onClose }) {
  const [text, setText] = useState("");
  const words = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/90 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Word Counter</h2>
              <p className="text-xs text-slate-500">Counts update instantly as you type</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here…"
            className="h-56 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100 outline-none focus:border-amber-400/50"
          />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Words", words],
              ["Characters", chars],
              ["No spaces", charsNoSpaces],
              ["Read time", `${readingTime} min`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
                <div className="font-mono text-xl font-semibold text-amber-400">{value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quick Calculators — fully real, computed instantly on the client          */
/* -------------------------------------------------------------------------- */

function InstantToolShell({ title, subtitle, icon: Icon, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/90 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-rose-400">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center">
      <div className="font-mono text-xl font-semibold text-rose-400">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

const LENGTH_UNITS = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 };
const WEIGHT_UNITS = { mg: 0.000001, g: 0.001, kg: 1, oz: 0.0283495, lb: 0.453592 };

function UnitConverterTool({ onClose }) {
  const [type, setType] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [value, setValue] = useState("1");

  const units = type === "length" ? LENGTH_UNITS : type === "weight" ? WEIGHT_UNITS : null;

  const convert = () => {
    const v = Number(value) || 0;
    if (type === "temperature") {
      if (from === to) return v;
      let celsius = from === "C" ? v : from === "F" ? ((v - 32) * 5) / 9 : v - 273.15;
      if (to === "C") return celsius;
      if (to === "F") return (celsius * 9) / 5 + 32;
      return celsius + 273.15;
    }
    const base = v * units[from];
    return base / units[to];
  };

  const result = convert();
  const unitList = type === "temperature" ? ["C", "F", "K"] : Object.keys(units);

  const changeType = (t) => {
    setType(t);
    if (t === "temperature") {
      setFrom("C");
      setTo("F");
    } else {
      const u = t === "length" ? LENGTH_UNITS : WEIGHT_UNITS;
      const keys = Object.keys(u);
      setFrom(keys[0]);
      setTo(keys[1]);
    }
  };

  return (
    <InstantToolShell title="Unit Converter" subtitle="Instant, exact — computed on your device" icon={Ruler} onClose={onClose}>
      <div className="mb-4 flex gap-2">
        {["length", "weight", "temperature"].map((t) => (
          <button
            key={t}
            onClick={() => changeType(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
              type === t ? "bg-rose-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">From</label>
          <div className="flex gap-2">
            <input type="number" className="input" value={value} onChange={(e) => setValue(e.target.value)} />
            <select className="input w-24" value={from} onChange={(e) => setFrom(e.target.value)}>
              {unitList.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="hidden items-end justify-center pb-2.5 text-slate-600 sm:flex">→</div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">To</label>
          <div className="flex gap-2">
            <div className="input flex items-center font-mono text-rose-400">{result.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
            <select className="input w-24" value={to} onChange={(e) => setTo(e.target.value)}>
              {unitList.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </InstantToolShell>
  );
}

function TipCalculatorTool({ onClose }) {
  const [bill, setBill] = useState("50");
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);

  const billNum = Number(bill) || 0;
  const tipAmount = billNum * (tipPct / 100);
  const total = billNum + tipAmount;
  const perPerson = total / Math.max(1, Number(people) || 1);

  return (
    <InstantToolShell title="Tip Calculator" subtitle="Split a bill and work out the tip" icon={HandCoins} onClose={onClose}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Bill amount</label>
          <input type="number" className="input" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Number of people</label>
          <input type="number" min="1" className="input" value={people} onChange={(e) => setPeople(e.target.value)} />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
          Tip percentage — {tipPct}%
        </label>
        <input
          type="range"
          min="0"
          max="30"
          value={tipPct}
          onChange={(e) => setTipPct(Number(e.target.value))}
          className="w-full accent-rose-400"
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatBox label="Tip" value={`$${tipAmount.toFixed(2)}`} />
        <StatBox label="Total" value={`$${total.toFixed(2)}`} />
        <StatBox label="Per person" value={`$${perPerson.toFixed(2)}`} />
      </div>
    </InstantToolShell>
  );
}

function PercentageCalculatorTool({ onClose }) {
  const [x, setX] = useState("20");
  const [y, setY] = useState("150");
  const [cost, setCost] = useState("100");
  const [markupPct, setMarkupPct] = useState("30");

  const percentOfValue = (Number(x) / 100) * Number(y || 0);
  const whatPercent = Number(y) ? (Number(x) / Number(y)) * 100 : 0;
  const markupPrice = Number(cost || 0) * (1 + Number(markupPct || 0) / 100);

  return (
    <InstantToolShell title="Percentage & Markup Calculator" subtitle="Discounts, splits and pricing — instant" icon={Percent} onClose={onClose}>
      <div className="space-y-5">
        <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="mb-2 text-xs font-medium text-slate-300">What is X% of Y?</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <input type="number" className="input w-24" value={x} onChange={(e) => setX(e.target.value)} />
            <span className="text-slate-500">% of</span>
            <input type="number" className="input w-28" value={y} onChange={(e) => setY(e.target.value)} />
            <span className="text-slate-500">=</span>
            <span className="font-mono text-rose-400">{percentOfValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </section>
        <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="mb-1 text-xs font-medium text-slate-300">X is what % of Y?</p>
          <p className="font-mono text-rose-400">{whatPercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
        </section>
        <section className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="mb-2 text-xs font-medium text-slate-300">Markup: cost + margin → sale price</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">Cost</span>
            <input type="number" className="input w-24" value={cost} onChange={(e) => setCost(e.target.value)} />
            <span className="text-slate-500">+ markup</span>
            <input type="number" className="input w-20" value={markupPct} onChange={(e) => setMarkupPct(e.target.value)} />
            <span className="text-slate-500">% =</span>
            <span className="font-mono text-rose-400">${markupPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </section>
      </div>
    </InstantToolShell>
  );
}

function AgeCalculatorTool({ onClose }) {
  const [birth, setBirth] = useState("2000-01-01");
  const [until, setUntil] = useState(new Date().toISOString().slice(0, 10));

  const start = new Date(birth);
  const end = new Date(until);
  let years = 0,
    months = 0,
    days = 0;

  if (!isNaN(start) && !isNaN(end) && end >= start) {
    years = end.getFullYear() - start.getFullYear();
    months = end.getMonth() - start.getMonth();
    days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  }

  const totalDays = !isNaN(start) && !isNaN(end) ? Math.max(0, Math.round((end - start) / 86400000)) : 0;

  return (
    <InstantToolShell title="Age Calculator" subtitle="Exact age or duration between two dates" icon={Cake} onClose={onClose}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">From date</label>
          <input type="date" className="input" value={birth} onChange={(e) => setBirth(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">To date</label>
          <input type="date" className="input" value={until} onChange={(e) => setUntil(e.target.value)} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBox label="Years" value={years} />
        <StatBox label="Months" value={months} />
        <StatBox label="Days" value={days} />
        <StatBox label="Total days" value={totalDays.toLocaleString()} />
      </div>
    </InstantToolShell>
  );
}

let timesheetRowId = 2;

function TimesheetCalculatorTool({ onClose }) {
  const [rate, setRate] = useState("20");
  const [rows, setRows] = useState([
    { id: "1", day: "Monday", hours: "8" },
    { id: "2", day: "Tuesday", hours: "8" },
  ]);

  const updateRow = (id, field, val) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  };
  const addRow = () => {
    timesheetRowId += 1;
    setRows((prev) => [...prev, { id: String(timesheetRowId), day: "", hours: "0" }]);
  };
  const removeRow = (id) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const totalHours = rows.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);
  const totalPay = totalHours * (Number(rate) || 0);

  return (
    <InstantToolShell title="Timesheet Calculator" subtitle="Add up hours and pay for the week" icon={Clock3} onClose={onClose}>
      <div className="mb-4 flex items-center gap-2">
        <label className="text-xs text-slate-500">Hourly rate</label>
        <input type="number" className="input w-24" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-[1fr_90px_28px] items-center gap-2">
            <input className="input" placeholder="Day" value={r.day} onChange={(e) => updateRow(r.id, "day", e.target.value)} />
            <input
              type="number"
              className="input text-right font-mono"
              value={r.hours}
              onChange={(e) => updateRow(r.id, "hours", e.target.value)}
            />
            <button
              onClick={() => removeRow(r.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addRow}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
      >
        <Plus className="h-3.5 w-3.5" />
        Add day
      </button>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatBox label="Total hours" value={totalHours} />
        <StatBox label="Total pay" value={`$${totalPay.toFixed(2)}`} />
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  QR Code Generator — fully real, rendered client-side via the qrcode lib   */
/* -------------------------------------------------------------------------- */

function QrCodeGeneratorTool({ onClose }) {
  const [mode, setMode] = useState("link"); // link | text | wifi
  const [link, setLink] = useState("https://");
  const [text, setText] = useState("Hello from OmniTools!");
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);

  const payload = useMemo(() => {
    if (mode === "link") return link.trim();
    if (mode === "text") return text;
    const { ssid, password, encryption } = wifi;
    return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  }, [mode, link, text, wifi]);

  useEffect(() => {
    if (!payload) {
      setDataUrl(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(payload, { width: 320, margin: 1, color: { dark: "#0f172a", light: "#ffffff" } })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not generate this QR code.");
      });
    return () => {
      cancelled = true;
    };
  }, [payload]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <InstantToolShell
      title="QR Code Generator"
      subtitle="Generated locally — nothing you enter is sent anywhere"
      icon={QrCode}
      onClose={onClose}
    >
      <div className="mb-4 flex gap-2">
        {[
          ["link", "Link"],
          ["text", "Text"],
          ["wifi", "Wi-Fi"],
        ].map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              mode === m ? "bg-rose-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_180px]">
        <div>
          {mode === "link" && (
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">URL</label>
              <input className="input" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" />
            </div>
          )}
          {mode === "text" && (
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Text</label>
              <textarea className="input" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
          )}
          {mode === "wifi" && (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Network name (SSID)</label>
                <input className="input" value={wifi.ssid} onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Password</label>
                <input className="input" value={wifi.password} onChange={(e) => setWifi({ ...wifi, password: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Security</label>
                <select className="input" value={wifi.encryption} onChange={(e) => setWifi({ ...wifi, encryption: e.target.value })}>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </div>
          )}

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <button
            onClick={download}
            disabled={!dataUrl}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileOutput className="h-4 w-4" />
            Download PNG
          </button>
        </div>

        <div className="flex items-center justify-center rounded-xl border border-slate-800 bg-white p-3">
          {dataUrl ? (
            <img src={dataUrl} alt="Generated QR code" className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center text-xs text-slate-400">Enter details to preview</div>
          )}
        </div>
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Image Compressor — fully real, re-encoded via the native Canvas API       */
/* -------------------------------------------------------------------------- */

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function ImageCompressorTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState("image/jpeg");
  const [maxWidth, setMaxWidth] = useState(1920);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);
    setCompressedUrl(null);
    const img = new Image();
    img.onload = () => setDims({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  };

  useEffect(() => {
    if (!file || !originalUrl) return;
    setBusy(true);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setBusy(false);
            return;
          }
          setCompressedUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
          setCompressedSize(blob.size);
          setBusy(false);
        },
        format,
        format === "image/png" ? undefined : quality
      );
    };
    img.src = originalUrl;
  }, [file, originalUrl, quality, format, maxWidth]);

  const download = () => {
    if (!compressedUrl) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = `compressed.${ext}`;
    a.click();
  };

  const savings = file && compressedSize ? Math.max(0, 100 - (compressedSize / file.size) * 100) : 0;

  return (
    <InstantToolShell
      title="Image Compressor"
      subtitle="Re-encoded entirely on your device — nothing is uploaded"
      icon={ImageIcon}
      onClose={onClose}
    >
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPickFile(e.dataTransfer.files?.[0]);
          }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-14 text-center transition hover:border-rose-400/40"
        >
          <UploadCloud className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">JPG, PNG or WebP — processed locally</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Original</p>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-white">
                <img src={originalUrl} alt="Original" className="max-h-48 w-full object-contain" />
              </div>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {formatBytes(file.size)} · {dims.w}×{dims.h}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Compressed</p>
              <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                {compressedUrl ? (
                  <img src={compressedUrl} alt="Compressed" className="max-h-48 w-full object-contain" />
                ) : (
                  <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-rose-400">
                {compressedSize ? `${formatBytes(compressedSize)} · ${savings.toFixed(0)}% smaller` : "…"}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Quality — {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={quality}
                disabled={format === "image/png"}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-rose-400 disabled:opacity-30"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Format</label>
              <select className="input" value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG (lossless)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={download}
              disabled={!compressedUrl || busy}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={() => {
                setFile(null);
                setOriginalUrl(null);
                setCompressedUrl(null);
              }}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another image
            </button>
          </div>
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  PDF Merger — fully real, combined client-side via pdf-lib                 */
/* -------------------------------------------------------------------------- */

function PdfMergerTool({ onClose }) {
  const [files, setFiles] = useState([]); // { id, file }
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type === "application/pdf");
    if (!picked.length) return;
    setResultUrl(null);
    setError(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const move = (index, dir) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const { file } of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const mergedBytes = await merged.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      setError("Couldn't merge those files — make sure each one is a valid, unencrypted PDF.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "merged.pdf";
    a.click();
  };

  return (
    <InstantToolShell
      title="PDF Merger"
      subtitle="Combined entirely on your device — files are never uploaded"
      icon={Layers}
      onClose={onClose}
    >
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-8 text-center transition hover:border-rose-400/40"
      >
        <FileStack className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop PDFs here, or click to add files</p>
        <p className="mt-1 text-xs text-slate-500">Add two or more — reorder them below before merging</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 font-mono text-[11px] text-slate-400">
                {i + 1}
              </span>
              <span className="flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
              <span className="font-mono text-[11px] text-slate-500">{formatBytes(f.file.size)}</span>
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === files.length - 1}
                className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeFile(f.id)}
                className="rounded p-1 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={merge}
          disabled={files.length < 2 || busy}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layers className="h-4 w-4" />}
          {busy ? "Merging…" : `Merge ${files.length || ""} PDFs`}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download merged.pdf
          </button>
        )}
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  PDF Splitter — fully real, split via pdf-lib and zipped via jszip         */
/* -------------------------------------------------------------------------- */

function PdfSplitterTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = async (f) => {
    if (!f || f.type !== "application/pdf") return;
    setError(null);
    setResultUrl(null);
    setFile(f);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch (e) {
      setError("Couldn't read that PDF — make sure it isn't password-protected.");
      setPageCount(0);
    }
  };

  const split = async () => {
    if (!file || pageCount < 2) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const zip = new JSZip();
      const baseName = file.name.replace(/\.pdf$/i, "");
      for (let i = 0; i < src.getPageCount(); i++) {
        const single = await PDFDocument.create();
        const [page] = await single.copyPages(src, [i]);
        single.addPage(page);
        const pdfBytes = await single.save();
        zip.file(`${baseName}-page-${i + 1}.pdf`, pdfBytes);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(zipBlob);
      });
    } catch (e) {
      setError("Something went wrong splitting that PDF. Try a different file.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "split-pages.zip";
    a.click();
  };

  return (
    <InstantToolShell
      title="PDF Splitter"
      subtitle="Split entirely on your device — nothing is uploaded"
      icon={Scissors}
      onClose={onClose}
    >
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPickFile(e.dataTransfer.files?.[0]);
          }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-14 text-center transition hover:border-rose-400/40"
        >
          <Scissors className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a PDF, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Every page becomes its own PDF, packed into a ZIP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
            <FileText className="h-8 w-8 text-rose-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-200">{file.name}</p>
              <p className="font-mono text-xs text-slate-500">
                {formatBytes(file.size)} {pageCount ? `· ${pageCount} pages` : ""}
              </p>
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={split}
              disabled={pageCount < 2 || busy}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
              {busy ? "Splitting…" : `Split into ${pageCount || "…"} PDFs`}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download split-pages.zip
              </button>
            )}
            <button
              onClick={() => {
                setFile(null);
                setResultUrl(null);
                setPageCount(0);
              }}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another PDF
            </button>
          </div>
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Image Cropper & Resizer — fully real, Canvas-based                        */
/* -------------------------------------------------------------------------- */

function ImageCropperTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [targetWidth, setTargetWidth] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [outUrl, setOutUrl] = useState(null);
  const [outSize, setOutSize] = useState(0);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    setOutUrl(null);
    setInsets({ top: 0, right: 0, bottom: 0, left: 0 });
    const img = new Image();
    img.onload = () => {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setTargetWidth(img.naturalWidth);
    };
    img.src = url;
  };

  const cropDims = useMemo(() => {
    const cw = Math.max(1, Math.round(natural.w * (1 - (insets.left + insets.right) / 100)));
    const ch = Math.max(1, Math.round(natural.h * (1 - (insets.top + insets.bottom) / 100)));
    return { cw, ch, ratio: cw / ch };
  }, [natural, insets]);

  const targetHeight = lockAspect
    ? Math.round((targetWidth || 1) / (cropDims.ratio || 1))
    : Math.round(cropDims.ch);

  useEffect(() => {
    if (!file || !imageUrl || !natural.w) return;
    const img = new Image();
    img.onload = () => {
      const sx = Math.round(natural.w * (insets.left / 100));
      const sy = Math.round(natural.h * (insets.top / 100));
      const sw = cropDims.cw;
      const sh = cropDims.ch;
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth || sw;
      canvas.height = targetHeight || sh;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setOutUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
          setOutSize(blob.size);
        },
        format,
        0.92
      );
    };
    img.src = imageUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, imageUrl, insets, targetWidth, targetHeight, format]);

  const download = () => {
    if (!outUrl) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `cropped.${ext}`;
    a.click();
  };

  const updateInset = (side, value) => setInsets((prev) => ({ ...prev, [side]: Number(value) }));

  return (
    <InstantToolShell
      title="Image Cropper & Resizer"
      subtitle="Cropped and resized entirely on your device"
      icon={Crop}
      onClose={onClose}
    >
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPickFile(e.dataTransfer.files?.[0]);
          }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-14 text-center transition hover:border-rose-400/40"
        >
          <Crop className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Crop with the sliders, then set an exact export size</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Crop region</p>
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-white">
              <img src={imageUrl} alt="Source" className="block w-full" />
              <div
                className="pointer-events-none absolute inset-0 bg-slate-950/60"
                style={{
                  clipPath: `polygon(0% 0%, 0% 100%, ${insets.left}% 100%, ${insets.left}% ${insets.top}%, ${
                    100 - insets.right
                  }% ${insets.top}%, ${100 - insets.right}% ${100 - insets.bottom}%, ${insets.left}% ${
                    100 - insets.bottom
                  }%, ${insets.left}% 100%, 100% 100%, 100% 0%)`,
                }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["top", "Top"],
                ["bottom", "Bottom"],
                ["left", "Left"],
                ["right", "Right"],
              ].map(([side, label]) => (
                <div key={side}>
                  <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                    {label} — {insets[side]}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    value={insets[side]}
                    onChange={(e) => updateInset(side, e.target.value)}
                    className="w-full accent-rose-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Preview & export</p>
            <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
              {outUrl ? (
                <img src={outUrl} alt="Cropped preview" className="max-h-40 w-full object-contain" />
              ) : (
                <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {cropDims.cw}×{cropDims.ch} cropped {outSize ? `· ${formatBytes(outSize)} exported` : ""}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Export width</label>
                <input
                  type="number"
                  className="input"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Export height</label>
                <input type="number" className="input" value={targetHeight} disabled={lockAspect} onChange={() => {}} />
              </div>
            </div>
            <label className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
              Lock aspect ratio to crop region
            </label>

            <div className="mt-3">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Format</label>
              <select className="input" value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={download}
                disabled={!outUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FileOutput className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setImageUrl(null);
                  setOutUrl(null);
                }}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Choose another
              </button>
            </div>
          </div>
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Invoice Generator — fully operational, client-side                        */
/* -------------------------------------------------------------------------- */

let itemIdCounter = 3;

function InvoiceGenerator({ onClose }) {
  const [business, setBusiness] = useState({
    name: "Your Business Name",
    email: "you@business.com",
    phone: "+1 555 000 1234",
    address: "123 Market Street, Suite 4\nSpringfield",
  });
  const [client, setClient] = useState({
    name: "Client Name",
    email: "client@email.com",
    address: "45 Client Avenue\nRivertown",
  });
  const [meta, setMeta] = useState({
    number: "INV-1001",
    date: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    currency: "$",
  });
  const [items, setItems] = useState([
    { id: "1", desc: "Website design & development", qty: 1, rate: 850 },
    { id: "2", desc: "Hosting setup (one-time)", qty: 1, rate: 60 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("Thank you for your business. Payment due within 14 days.");

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const addItem = () => {
    itemIdCounter += 1;
    setItems((prev) => [...prev, { id: String(itemIdCounter), desc: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));
  };

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0),
    [items]
  );
  const taxAmount = useMemo(() => subtotal * ((Number(taxRate) || 0) / 100), [subtotal, taxRate]);
  const total = subtotal + taxAmount;

  const fmt = (n) =>
    `${meta.currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950">
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:px-8">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-mono text-emerald-400 sm:inline-flex">
            <ShieldCheck className="h-3 w-3" />
            Generated entirely in your browser
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[1fr_320px] md:px-8">
        {/* Editable form (hidden on print) */}
        <div className="no-print space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your business
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="input"
                placeholder="Business name"
                value={business.name}
                onChange={(e) => setBusiness({ ...business, name: e.target.value })}
              />
              <input
                className="input"
                placeholder="Email"
                value={business.email}
                onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              />
              <input
                className="input"
                placeholder="Phone"
                value={business.phone}
                onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
              />
              <textarea
                className="input sm:col-span-2"
                rows={2}
                placeholder="Address"
                value={business.address}
                onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Bill to
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="input"
                placeholder="Client name"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
              />
              <input
                className="input"
                placeholder="Client email"
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
              />
              <textarea
                className="input sm:col-span-2"
                rows={2}
                placeholder="Client address"
                value={client.address}
                onChange={(e) => setClient({ ...client, address: e.target.value })}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Invoice details
            </h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <input
                className="input"
                placeholder="Invoice #"
                value={meta.number}
                onChange={(e) => setMeta({ ...meta, number: e.target.value })}
              />
              <input
                type="date"
                className="input"
                value={meta.date}
                onChange={(e) => setMeta({ ...meta, date: e.target.value })}
              />
              <input
                type="date"
                className="input"
                value={meta.dueDate}
                onChange={(e) => setMeta({ ...meta, dueDate: e.target.value })}
              />
              <select
                className="input"
                value={meta.currency}
                onChange={(e) => setMeta({ ...meta, currency: e.target.value })}
              >
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Line items
              </h3>
              <button
                onClick={addItem}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" />
                Add item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((it) => (
                <div key={it.id} className="grid grid-cols-[1fr_60px_90px_28px] items-center gap-2">
                  <input
                    className="input"
                    placeholder="Description"
                    value={it.desc}
                    onChange={(e) => updateItem(it.id, "desc", e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    className="input text-center"
                    value={it.qty}
                    onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="input text-right font-mono"
                    value={it.rate}
                    onChange={(e) => updateItem(it.id, "rate", e.target.value)}
                  />
                  <button
                    onClick={() => removeItem(it.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs text-slate-500">Tax rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="input w-24 font-mono"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Notes
            </h3>
            <textarea
              className="input"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>

          <AdSlot variant="banner" />
        </div>

        {/* Live invoice preview + printable area */}
        <div className="md:sticky md:top-20 md:self-start">
          <div
            id="invoice-print-area"
            className="invoice-print-area rounded-2xl border border-slate-800 bg-white p-8 text-slate-900 shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <h1 className="text-lg font-bold">{business.name}</h1>
                <p className="whitespace-pre-line text-xs text-slate-500">{business.address}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {business.email} · {business.phone}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-slate-400">Invoice</p>
                <p className="font-mono text-sm font-semibold">{meta.number}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="uppercase tracking-widest text-slate-400">Bill to</p>
                <p className="mt-1 font-semibold">{client.name}</p>
                <p className="whitespace-pre-line text-slate-500">{client.address}</p>
                <p className="text-slate-500">{client.email}</p>
              </div>
              <div className="text-right">
                <p>
                  <span className="uppercase tracking-widest text-slate-400">Date </span>
                  <span className="font-mono">{meta.date}</span>
                </p>
                <p className="mt-1">
                  <span className="uppercase tracking-widest text-slate-400">Due </span>
                  <span className="font-mono">{meta.dueDate}</span>
                </p>
              </div>
            </div>

            <table className="mt-6 w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left uppercase tracking-widest text-slate-400">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 text-right font-medium">Qty</th>
                  <th className="py-2 text-right font-medium">Rate</th>
                  <th className="py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-slate-100">
                    <td className="py-2 pr-2">{it.desc || "—"}</td>
                    <td className="py-2 text-right font-mono">{Number(it.qty) || 0}</td>
                    <td className="py-2 text-right font-mono">{fmt(Number(it.rate) || 0)}</td>
                    <td className="py-2 text-right font-mono">
                      {fmt((Number(it.qty) || 0) * (Number(it.rate) || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-48 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-mono">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tax ({Number(taxRate) || 0}%)</span>
                  <span className="font-mono">{fmt(taxAmount)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-slate-200 py-2 text-sm font-bold">
                  <span>Total</span>
                  <span className="font-mono">{fmt(total)}</span>
                </div>
              </div>
            </div>

            {notes && (
              <div className="mt-6 border-t border-slate-200 pt-4 text-[11px] text-slate-500">
                {notes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const [favorites, setFavorites] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const openTool = (tool) => setActiveTool(tool);
  const closeTool = () => setActiveTool(null);

  const filteredTools = useMemo(() => {
    if (!query.trim()) return TOOLS;
    const q = query.toLowerCase();
    return TOOLS.filter((t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
  }, [query]);

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        .input {
          background: rgb(2 6 23 / 0.6);
          border: 1px solid rgb(30 41 59);
          border-radius: 0.65rem;
          padding: 0.55rem 0.75rem;
          font-size: 0.8rem;
          color: rgb(241 245 249);
          outline: none;
          width: 100%;
        }
        .input:focus {
          border-color: rgb(251 191 36 / 0.5);
        }
        @media print {
          body * { visibility: hidden; }
          .invoice-print-area, .invoice-print-area * { visibility: visible; }
          .invoice-print-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------------- */}
      <header className="no-print border-b border-slate-900 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
                <Zap className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-50">
                  Omni<span className="text-amber-400">Tools</span> Free
                </h1>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">
                  No logins · No uploads · No logs
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Privacy-first
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5">
                <Lock className="h-3.5 w-3.5 text-sky-400" />
                Client-side processing
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-3 py-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-amber-400" />
                100% free
              </span>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools — e.g. invoice, compress, pdf…"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none transition focus:border-amber-400/50"
            />
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Body layout: left rail / content / right rail */}
      {/* ---------------------------------------------------------------- */}
      <div className="no-print mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:px-8 lg:grid-cols-[220px_1fr_220px]">
        {/* Left rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <AdSlot variant="rail" />
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 space-y-10">
          {/* Favorites */}
          {favoriteTools.length > 0 && !query.trim() && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Your favorites
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {favoriteTools.map((tool) => {
                  const category = CATEGORIES.find((c) => c.id === tool.category);
                  return (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      category={category}
                      isFavorite
                      onToggleFavorite={toggleFavorite}
                      onOpen={openTool}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {query.trim() ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
                Search results ({filteredTools.length})
              </h2>
              {filteredTools.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
                  No tools match “{query}”. Try a different keyword.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredTools.map((tool) => {
                    const category = CATEGORIES.find((c) => c.id === tool.category);
                    return (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        category={category}
                        isFavorite={favorites.includes(tool.id)}
                        onToggleFavorite={toggleFavorite}
                        onOpen={openTool}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          ) : (
            CATEGORIES.map((category, idx) => (
              <div key={category.id}>
                <section>
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="mb-1.5">
                        <CategoryBadge accent={category.accent}>{category.name}</CategoryBadge>
                      </div>
                      <p className="text-xs text-slate-500">{category.tagline}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {TOOLS.filter((t) => t.category === category.id).map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        category={category}
                        isFavorite={favorites.includes(tool.id)}
                        onToggleFavorite={toggleFavorite}
                        onOpen={openTool}
                      />
                    ))}
                  </div>
                </section>

                {/* Mid-content ads, spaced between categories */}
                {(idx === 0 || idx === 2) && (
                  <div className="my-8">
                    <AdSlot variant="banner" />
                  </div>
                )}
              </div>
            ))
          )}

          <footer className="border-t border-slate-900 pt-6 text-center text-[11px] text-slate-600">
            OmniTools Free — no accounts, no file uploads, no tracking. Everything above runs on your
            own device.
          </footer>
        </main>

        {/* Right rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <AdSlot variant="rail" />
          </div>
        </aside>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Tool overlays */}
      {/* ---------------------------------------------------------------- */}
      {activeTool?.kind === "invoice" && <InvoiceGenerator onClose={closeTool} />}
      {activeTool?.kind === "instant" && activeTool.id === "word-counter" && (
        <WordCounterTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "unit-converter" && (
        <UnitConverterTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "tip-calculator" && (
        <TipCalculatorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "percentage-calculator" && (
        <PercentageCalculatorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "age-calculator" && (
        <AgeCalculatorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "timesheet-calculator" && (
        <TimesheetCalculatorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "qr-generator" && (
        <QrCodeGeneratorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "img-compressor" && (
        <ImageCompressorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "pdf-merge" && (
        <PdfMergerTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "pdf-split" && (
        <PdfSplitterTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "img-cropper" && (
        <ImageCropperTool onClose={closeTool} />
      )}
      {activeTool?.kind === "simulated" && <SimulatedToolRunner tool={activeTool} onClose={closeTool} />}
    </div>
  );
}

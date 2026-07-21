"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import LogoMark from "./components/Logo";
import Link from "next/link";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
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
    href: "/tools/pdf-merger",
  },
  {
    id: "pdf-split",
    name: "PDF Splitter",
    desc: "Break a large PDF into separate single-page files.",
    icon: Scissors,
    category: "document-desk",
    kind: "instant",
    href: "/tools/pdf-splitter",
  },
  {
    id: "img-to-pdf",
    name: "Image → PDF",
    desc: "Turn JPG/PNG scans into one clean, print-ready PDF.",
    icon: FileOutput,
    category: "document-desk",
    kind: "instant",
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
    desc: "Draw a signature and download it as a transparent PNG.",
    icon: FileSignature,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "file-archiver",
    name: "File Archiver",
    desc: "Zip up several files into one lightweight archive.",
    icon: Archive,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    desc: "Shrink a PDF by re-rendering pages as optimized images.",
    icon: Shrink,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "pdf-watermark",
    name: "PDF Watermarker",
    desc: "Stamp a diagonal text watermark across every page.",
    icon: Droplet,
    category: "document-desk",
    kind: "instant",
  },
  {
    id: "csv-json-converter",
    name: "CSV ⇄ JSON Converter",
    desc: "Convert spreadsheet data to JSON, or JSON back to CSV.",
    icon: FileJson,
    category: "document-desk",
    kind: "instant",
  },

  // Media Studio
  {
    id: "img-compressor",
    name: "Image Compressor",
    desc: "Shrink photos up to 80% with barely any quality loss.",
    icon: ImageIcon,
    category: "media-studio",
    kind: "instant",
    href: "/tools/image-compressor",
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
    desc: "Cut clips down to the moment that matters — best for short clips.",
    icon: Video,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "audio-converter",
    name: "Audio Converter",
    desc: "Convert between MP3, WAV and OGG in your browser.",
    icon: Music,
    category: "media-studio",
    kind: "instant",
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
    kind: "instant",
    href: "/tools/background-remover",
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    desc: "Drop top & bottom captions on any image in seconds.",
    icon: ImagePlus,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "photo-collage",
    name: "Photo Collage Maker",
    desc: "Arrange several photos into one shareable grid layout.",
    icon: LayoutGrid,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "img-format-converter",
    name: "Image Format Converter",
    desc: "Convert between JPG, PNG, WebP and more, instantly.",
    icon: Repeat,
    category: "media-studio",
    kind: "instant",
  },
  {
    id: "gif-maker",
    name: "GIF Maker",
    desc: "Turn a sequence of photos into a smooth looping GIF.",
    icon: Clapperboard,
    category: "media-studio",
    kind: "instant",
  },

  // Business Kits
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    desc: "Build a professional invoice and print it straight to PDF.",
    icon: Receipt,
    category: "business-kits",
    kind: "invoice",
    href: "/tools/invoice-generator",
  },
  {
    id: "quote-builder",
    name: "Quote Builder",
    desc: "Put together a polished price quote for a prospective client.",
    icon: FileSpreadsheet,
    category: "business-kits",
    kind: "quote",
  },
  {
    id: "business-card",
    name: "Business Card Designer",
    desc: "Design a print-ready double-sided business card.",
    icon: Briefcase,
    category: "business-kits",
    kind: "instant",
  },
  {
    id: "contract-template",
    name: "Contract Template Kit",
    desc: "Fill in a simple service-agreement template in minutes.",
    icon: PenTool,
    category: "business-kits",
    kind: "contract",
  },
  {
    id: "receipt-generator",
    name: "Receipt Generator",
    desc: "Create a simple, printable payment receipt for a client.",
    icon: FileCheck2,
    category: "business-kits",
    kind: "receipt",
  },
  {
    id: "proposal-builder",
    name: "Proposal Builder",
    desc: "Draft a clean project proposal to send to a prospect.",
    icon: ClipboardList,
    category: "business-kits",
    kind: "proposal",
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

      {tool.href ? (
        <Link href={tool.href} className="flex flex-1 flex-col items-start text-left">
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
        </Link>
      ) : (
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
      )}
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
            <input type="number" inputMode="decimal" className="input" value={value} onChange={(e) => setValue(e.target.value)} />
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
          <input type="number" inputMode="decimal" className="input" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Number of people</label>
          <input type="number" inputMode="decimal" min="1" className="input" value={people} onChange={(e) => setPeople(e.target.value)} />
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
            <input type="number" inputMode="decimal" className="input w-24" value={x} onChange={(e) => setX(e.target.value)} />
            <span className="text-slate-500">% of</span>
            <input type="number" inputMode="decimal" className="input w-28" value={y} onChange={(e) => setY(e.target.value)} />
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
            <input type="number" inputMode="decimal" className="input w-24" value={cost} onChange={(e) => setCost(e.target.value)} />
            <span className="text-slate-500">+ markup</span>
            <input type="number" inputMode="decimal" className="input w-20" value={markupPct} onChange={(e) => setMarkupPct(e.target.value)} />
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
        <input type="number" inputMode="decimal" className="input w-24" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-[1fr_90px_28px] items-center gap-2">
            <input className="input" placeholder="Day" value={r.day} onChange={(e) => updateRow(r.id, "day", e.target.value)} />
            <input
              type="number" inputMode="decimal"
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
  const [text, setText] = useState("Hello from QuickZeta!");
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
                  type="number" inputMode="decimal"
                  className="input"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Export height</label>
                <input type="number" inputMode="decimal" className="input" value={targetHeight} disabled={lockAspect} onChange={() => {}} />
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
/*  Background Remover — fully real, runs an on-device ML model               */
/* -------------------------------------------------------------------------- */

function BackgroundRemoverTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setError(null);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setStatusText("Loading on-device model…");
    try {
      const removeBackground = await loadRemoveBackground();
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          if (key.startsWith("fetch")) {
            setStatusText(`Downloading model — ${Math.round((current / total) * 100)}%`);
          } else {
            setStatusText(`Processing image — ${Math.round((current / total) * 100)}%`);
          }
        },
      });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("Background removal failed:", e);
      const isNetworkError = String(e?.message || e).toLowerCase().includes("fetch");
      setError(
        isNetworkError
          ? "Couldn't download the AI model — an ad blocker or privacy extension may be blocking it. Try an incognito/private window, or disable extensions for this site."
          : "Couldn't process that image. Try a smaller file or a different photo."
      );
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "background-removed.png";
    a.click();
  };

  const checkerBg = {
    backgroundImage:
      "repeating-conic-gradient(#e2e8f0 0% 25%, #f8fafc 0% 50%) 50% / 20px 20px",
  };

  return (
    <InstantToolShell
      title="Background Remover"
      subtitle="Segmentation model runs locally in your browser"
      icon={Wand2}
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
          <Wand2 className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a photo, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">
            First use downloads a small AI model, cached in your browser after that
          </p>
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
              <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                <img src={imageUrl} alt="Original" className="max-h-48 w-full object-contain" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Background removed</p>
              <div
                className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-slate-800"
                style={checkerBg}
              >
                {busy ? (
                  <div className="flex flex-col items-center gap-2 px-4 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-rose-500" />
                    <p className="text-[11px] text-slate-600">{statusText}</p>
                  </div>
                ) : resultUrl ? (
                  <img src={resultUrl} alt="Background removed" className="max-h-48 w-full object-contain" />
                ) : (
                  <p className="px-4 text-center text-xs text-slate-500">Click "Remove background" to start</p>
                )}
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {busy ? "Processing…" : resultUrl ? "Run again" : "Remove background"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download PNG
              </button>
            )}
            <button
              onClick={() => {
                setFile(null);
                setImageUrl(null);
                setResultUrl(null);
              }}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Choose another
            </button>
          </div>
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Meme Generator — fully real, classic impact-font captions via Canvas      */
/* -------------------------------------------------------------------------- */

function MemeGeneratorTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [outUrl, setOutUrl] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  };

  useEffect(() => {
    if (!file || !imageUrl || !natural.w) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = natural.w;
      canvas.height = natural.h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, natural.w, natural.h);

      const fontSize = Math.round(natural.w * 0.09);
      ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.lineWidth = fontSize * 0.08;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";

      const drawCaption = (text, y) => {
        if (!text) return;
        const upper = text.toUpperCase();
        ctx.strokeText(upper, natural.w / 2, y);
        ctx.fillText(upper, natural.w / 2, y);
      };

      drawCaption(topText, fontSize * 1.1);
      drawCaption(bottomText, natural.h - fontSize * 0.4);

      canvas.toBlob((blob) => {
        if (!blob) return;
        setOutUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      }, "image/png");
    };
    img.src = imageUrl;
  }, [file, imageUrl, natural, topText, bottomText]);

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = "meme.png";
    a.click();
  };

  return (
    <InstantToolShell title="Meme Generator" subtitle="Rendered entirely on your device" icon={ImagePlus} onClose={onClose}>
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
          <ImagePlus className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Add top & bottom captions, classic meme style</p>
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
          <div className="flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black">
            {outUrl ? (
              <img src={outUrl} alt="Meme preview" className="max-h-64 w-full object-contain" />
            ) : (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Top text</label>
              <input className="input" value={topText} onChange={(e) => setTopText(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Bottom text</label>
              <input className="input" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={download}
              disabled={!outUrl}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-4 w-4" />
              Download PNG
            </button>
            <button
              onClick={() => {
                setFile(null);
                setImageUrl(null);
                setOutUrl(null);
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
/*  Image Format Converter — fully real, Canvas re-encode                     */
/* -------------------------------------------------------------------------- */

function ImageFormatConverterTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [format, setFormat] = useState("image/png");
  const [outUrl, setOutUrl] = useState(null);
  const [outSize, setOutSize] = useState(0);
  const [supportsAlpha, setSupportsAlpha] = useState(true);
  const fileInputRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setOutUrl(null);
    // Default the target format to whichever isn't the source format
    setFormat(f.type === "image/png" ? "image/jpeg" : "image/png");
  };

  useEffect(() => {
    if (!file || !imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      setSupportsAlpha(format !== "image/jpeg");
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
  }, [file, imageUrl, format]);

  const extFor = (f) => (f === "image/png" ? "png" : f === "image/webp" ? "webp" : f === "image/jpeg" ? "jpg" : "bmp");

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `converted.${extFor(format)}`;
    a.click();
  };

  return (
    <InstantToolShell
      title="Image Format Converter"
      subtitle="Re-encoded entirely on your device"
      icon={Repeat}
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
          <Repeat className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an image, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP or BMP — pick your target format</p>
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
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">
                Original · {file.type.split("/")[1]?.toUpperCase()}
              </p>
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                <img src={imageUrl} alt="Original" className="max-h-44 w-full object-contain" />
              </div>
              <p className="mt-1 font-mono text-xs text-slate-400">{formatBytes(file.size)}</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">
                Converted · {extFor(format).toUpperCase()}
              </p>
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white">
                {outUrl ? (
                  <img src={outUrl} alt="Converted" className="max-h-44 w-full object-contain" />
                ) : (
                  <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-rose-400">{outSize ? formatBytes(outSize) : "…"}</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Convert to</label>
            <div className="flex flex-wrap gap-2">
              {[
                ["image/png", "PNG"],
                ["image/jpeg", "JPG"],
                ["image/webp", "WebP"],
                ["image/bmp", "BMP"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFormat(val)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    format === val ? "bg-rose-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {!supportsAlpha && (
              <p className="mt-2 text-[11px] text-slate-500">JPG doesn't support transparency — it's filled with white.</p>
            )}
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
              Choose another image
            </button>
          </div>
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  File Archiver — fully real, zipped via jszip                              */
/* -------------------------------------------------------------------------- */

function FileArchiverTool({ onClose }) {
  const [files, setFiles] = useState([]); // { id, file }
  const [zipName, setZipName] = useState("archive");
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []);
    if (!picked.length) return;
    setResultUrl(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);

  const zipIt = async () => {
    if (!files.length) return;
    setBusy(true);
    try {
      const zip = new JSZip();
      files.forEach(({ file }) => zip.file(file.name, file));
      const blob = await zip.generateAsync({ type: "blob" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setResultSize(blob.size);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${zipName || "archive"}.zip`;
    a.click();
  };

  return (
    <InstantToolShell
      title="File Archiver"
      subtitle="Zipped entirely on your device — nothing is uploaded"
      icon={Archive}
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
        <Archive className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop any files here, or click to add</p>
        <p className="mt-1 text-xs text-slate-500">Any file type — they'll be packed into one ZIP</p>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
              <span className="flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
              <span className="font-mono text-[11px] text-slate-500">{formatBytes(f.file.size)}</span>
              <button
                onClick={() => removeFile(f.id)}
                className="rounded p-1 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <p className="pt-1 text-[11px] text-slate-500">
            {files.length} file{files.length > 1 ? "s" : ""} · {formatBytes(totalSize)} total
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <label className="text-xs text-slate-500">Archive name</label>
        <input className="input w-40" value={zipName} onChange={(e) => setZipName(e.target.value)} />
        <span className="text-xs text-slate-500">.zip</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={zipIt}
          disabled={!files.length || busy}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Archive className="h-4 w-4" />}
          {busy ? "Zipping…" : `Zip ${files.length || ""} files`}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download {zipName || "archive"}.zip · {formatBytes(resultSize)}
          </button>
        )}
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Image → PDF — fully real, composed via pdf-lib                            */
/* -------------------------------------------------------------------------- */

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const PAGE_MARGIN = 36;

function ImageToPdfTool({ onClose }) {
  const [files, setFiles] = useState([]); // { id, file, url }
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) return;
    setResultUrl(null);
    setError(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file, url: URL.createObjectURL(file) };
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

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const build = async () => {
    if (!files.length) return;
    setBusy(true);
    setError(null);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const { url } of files) {
        const img = await loadImage(url);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngBytes = await new Promise((resolve) => canvas.toBlob((b) => b.arrayBuffer().then(resolve), "image/png"));
        const embedded = await pdfDoc.embedPng(pngBytes);

        const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
        const availW = A4_WIDTH - PAGE_MARGIN * 2;
        const availH = A4_HEIGHT - PAGE_MARGIN * 2;
        const scale = Math.min(availW / embedded.width, availH / embedded.height, 1);
        const w = embedded.width * scale;
        const h = embedded.height * scale;
        page.drawImage(embedded, {
          x: (A4_WIDTH - w) / 2,
          y: (A4_HEIGHT - h) / 2,
          width: w,
          height: h,
        });
      }
      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      setError("Couldn't build the PDF from those images. Try different files.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "images.pdf";
    a.click();
  };

  return (
    <InstantToolShell
      title="Image → PDF"
      subtitle="Composed entirely on your device — nothing is uploaded"
      icon={FileOutput}
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
        <ImageIcon className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop images here, or click to add</p>
        <p className="mt-1 text-xs text-slate-500">Each image becomes its own page, in the order below</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
              <img src={f.url} alt="" className="h-8 w-8 rounded object-cover" />
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 font-mono text-[11px] text-slate-400">
                {i + 1}
              </span>
              <span className="flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
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
          onClick={build}
          disabled={!files.length || busy}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileOutput className="h-4 w-4" />}
          {busy ? "Building PDF…" : `Build PDF from ${files.length || ""} images`}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download images.pdf
          </button>
        )}
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  PDF Watermarker — fully real, stamped via pdf-lib                         */
/* -------------------------------------------------------------------------- */

function PdfWatermarkTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.25);
  const [fontSize, setFontSize] = useState(48);
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

  const apply = async () => {
    if (!file || !text.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      const textWidth = font.widthOfTextAtSize(text, fontSize);

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.1, 0.1, 0.1),
          opacity: Number(opacity),
          rotate: degrees(45),
        });
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes], { type: "application/pdf" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      setError("Couldn't watermark that PDF. Try a different file.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "watermarked.pdf";
    a.click();
  };

  return (
    <InstantToolShell
      title="PDF Watermarker"
      subtitle="Stamped entirely on your device — nothing is uploaded"
      icon={Droplet}
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
          <Droplet className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a PDF, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">A diagonal text watermark is stamped on every page</p>
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

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Watermark text</label>
              <input className="input" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Font size — {fontSize}pt
              </label>
              <input
                type="range"
                min="20"
                max="90"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
              Opacity — {Math.round(opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.7"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-rose-400"
            />
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={apply}
              disabled={busy || !text.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Droplet className="h-4 w-4" />}
              {busy ? "Stamping…" : "Apply watermark"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download watermarked.pdf
              </button>
            )}
            <button
              onClick={() => {
                setFile(null);
                setResultUrl(null);
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
/*  PDF Compressor — fully real: re-rendered as optimized images via pdf.js   */
/*  and rebuilt with pdf-lib. Honest tradeoff: output text isn't selectable.  */
/* -------------------------------------------------------------------------- */

function PdfCompressorTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [dpi, setDpi] = useState(110);
  const [quality, setQuality] = useState(0.6);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const onPickFile = async (f) => {
    if (!f || f.type !== "application/pdf") return;
    setError(null);
    setResultUrl(null);
    setFile(f);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes.slice(0));
      setPageCount(doc.getPageCount());
    } catch (e) {
      setPageCount(0);
    }
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const bytes = await file.arrayBuffer();
      const srcDoc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= srcDoc.numPages; i++) {
        setStatusText(`Rendering page ${i} of ${srcDoc.numPages}…`);
        const page = await srcDoc.getPage(i);
        const pointsViewport = page.getViewport({ scale: 1 });
        const renderViewport = page.getViewport({ scale: dpi / 72 });

        const canvas = document.createElement("canvas");
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;

        const jpegBytes = await new Promise((resolve) =>
          canvas.toBlob((b) => b.arrayBuffer().then(resolve), "image/jpeg", quality)
        );
        const embedded = await outDoc.embedJpg(jpegBytes);
        const outPage = outDoc.addPage([pointsViewport.width, pointsViewport.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: pointsViewport.width, height: pointsViewport.height });
      }

      setStatusText("Finalizing…");
      const outBytes = await outDoc.save();
      const blob = new Blob([outBytes], { type: "application/pdf" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setResultSize(blob.size);
    } catch (e) {
      setError("Couldn't compress that PDF. Try a different file.");
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "compressed.pdf";
    a.click();
  };

  const savings = file && resultSize ? Math.max(0, 100 - (resultSize / file.size) * 100) : 0;

  return (
    <InstantToolShell
      title="PDF Compressor"
      subtitle="Re-rendered and rebuilt entirely on your device"
      icon={Shrink}
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
          <Shrink className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a PDF, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Best for scanned documents or image-heavy PDFs</p>
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

          <div className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[11px] text-amber-200/80">
            Pages are re-rendered as images to shrink file size — text in the output PDF will no longer be
            selectable or searchable. Best suited to scans and image-heavy documents.
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Resolution — {dpi} DPI
              </label>
              <input
                type="range"
                min="72"
                max="200"
                step="6"
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                Image quality — {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.2"
                max="0.9"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={compress}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shrink className="h-4 w-4" />}
              {busy ? statusText || "Compressing…" : "Compress PDF"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download · {formatBytes(resultSize)} ({savings.toFixed(0)}% smaller)
              </button>
            )}
          </div>
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  CSV ⇄ JSON Converter — fully real, parsed & written entirely client-side  */
/* -------------------------------------------------------------------------- */

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const cleaned = rows.filter((r) => !(r.length === 1 && r[0] === ""));
  if (!cleaned.length) return [];
  const headers = cleaned[0];
  return cleaned.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => (obj[h] = r[idx] ?? ""));
    return obj;
  });
}

function toCsv(arr) {
  if (!Array.isArray(arr) || !arr.length) return "";
  const headers = Array.from(arr.reduce((set, row) => {
    Object.keys(row || {}).forEach((k) => set.add(k));
    return set;
  }, new Set()));
  const escape = (val) => {
    const s = val === null || val === undefined ? "" : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.map(escape).join(",")];
  arr.forEach((row) => lines.push(headers.map((h) => escape(row[h])).join(",")));
  return lines.join("\n");
}

function CsvJsonConverterTool({ onClose }) {
  const [mode, setMode] = useState("csv-to-json");
  const [input, setInput] = useState(
    "name,role,department\nAva Chen,Designer,Product\nLiam Ortiz,Engineer,Platform"
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      if (mode === "csv-to-json") {
        setOutput(JSON.stringify(parseCsv(input), null, 2));
      } else {
        const parsed = JSON.parse(input);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        setOutput(toCsv(arr));
      }
    } catch (e) {
      setError(mode === "csv-to-json" ? "Couldn't parse that as CSV." : "That doesn't look like valid JSON.");
      setOutput("");
    }
  }, [input, mode]);

  const onPickFile = (f) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result || ""));
    reader.readAsText(f);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!output) return;
    const ext = mode === "csv-to-json" ? "json" : "csv";
    const type = mode === "csv-to-json" ? "application/json" : "text/csv";
    const blob = new Blob([output], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <InstantToolShell
      title="CSV ⇄ JSON Converter"
      subtitle="Parsed and converted entirely in your browser"
      icon={FileJson}
      onClose={onClose}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          {[
            ["csv-to-json", "CSV → JSON"],
            ["json-to-csv", "JSON → CSV"],
          ].map(([m, label]) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setInput(
                  m === "csv-to-json"
                    ? "name,role,department\nAva Chen,Designer,Product\nLiam Ortiz,Engineer,Platform"
                    : '[\n  { "name": "Ava Chen", "role": "Designer" },\n  { "name": "Liam Ortiz", "role": "Engineer" }\n]'
                );
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                mode === m ? "bg-rose-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
        >
          <UploadCloud className="h-3.5 w-3.5" />
          Load a file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,text/csv,application/json"
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0])}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            {mode === "csv-to-json" ? "CSV input" : "JSON input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="input font-mono text-xs"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            {mode === "csv-to-json" ? "JSON output" : "CSV output"}
          </label>
          <textarea readOnly value={output} rows={10} className="input font-mono text-xs" />
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={download}
          disabled={!output}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileOutput className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={copy}
          disabled={!output}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Photo Collage Maker — fully real, composited via Canvas                   */
/* -------------------------------------------------------------------------- */

function drawImageCover(ctx, img, dx, dy, dw, dh) {
  const srcRatio = img.naturalWidth / img.naturalHeight;
  const dstRatio = dw / dh;
  let sx, sy, sw, sh;
  if (srcRatio > dstRatio) {
    sh = img.naturalHeight;
    sw = sh * dstRatio;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / dstRatio;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function PhotoCollageTool({ onClose }) {
  const [files, setFiles] = useState([]); // { id, file, url }
  const [gap, setGap] = useState(12);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [outUrl, setOutUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) return;
    setFiles((prev) => [
      ...prev,
      ...picked.slice(0, 9 - prev.length).map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file, url: URL.createObjectURL(file) };
      }),
    ]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  useEffect(() => {
    if (files.length < 2) {
      setOutUrl(null);
      return;
    }
    setBusy(true);
    const cols = Math.ceil(Math.sqrt(files.length));
    const rows = Math.ceil(files.length / cols);
    const cell = 360;
    const canvas = document.createElement("canvas");
    canvas.width = cols * cell + gap * (cols + 1);
    canvas.height = rows * cell + gap * (rows + 1);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    Promise.all(
      files.map(
        ({ url }) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
          })
      )
    ).then((imgs) => {
      imgs.forEach((img, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const dx = gap + col * (cell + gap);
        const dy = gap + row * (cell + gap);
        drawImageCover(ctx, img, dx, dy, cell, cell);
      });
      canvas.toBlob((blob) => {
        if (!blob) return;
        setOutUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setBusy(false);
      }, "image/png");
    });
  }, [files, gap, bgColor]);

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = "collage.png";
    a.click();
  };

  return (
    <InstantToolShell
      title="Photo Collage Maker"
      subtitle="Composited entirely on your device — add 2 to 9 photos"
      icon={LayoutGrid}
      onClose={onClose}
    >
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-6 text-center transition hover:border-rose-400/40"
      >
        <LayoutGrid className="mb-2 h-7 w-7 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop photos here, or click to add (up to 9)</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f) => (
            <div key={f.id} className="group relative h-16 w-16 overflow-hidden rounded-lg border border-slate-800">
              <img src={f.url} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => removeFile(f.id)}
                className="absolute right-0.5 top-0.5 rounded-full bg-slate-950/80 p-0.5 text-slate-300 opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length >= 2 && (
        <>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Gap — {gap}px</label>
              <input
                type="range"
                min="0"
                max="40"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white p-2">
            {busy || !outUrl ? (
              <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
            ) : (
              <img src={outUrl} alt="Collage preview" className="max-h-64 w-full object-contain" />
            )}
          </div>

          <button
            onClick={download}
            disabled={!outUrl}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileOutput className="h-4 w-4" />
            Download collage.png
          </button>
        </>
      )}
      {files.length === 1 && <p className="mt-3 text-xs text-slate-500">Add at least one more photo to build a collage.</p>}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  E-Signature Pad — fully real, drawn on Canvas, exported as trimmed PNG    */
/* -------------------------------------------------------------------------- */

function ESignatureTool({ onClose }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [color, setColor] = useState("#0f172a");
  const [thickness, setThickness] = useState(3);
  const [hasStroke, setHasStroke] = useState(false);

  const getPos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const start = (e) => {
    e.preventDefault();
    drawingRef.current = true;
    lastPointRef.current = getPos(canvasRef.current, e);
  };

  const move = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(canvas, e);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPointRef.current = pos;
    setHasStroke(true);
  };

  const end = () => {
    drawingRef.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStroke(false);
  };

  const download = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let minX = width,
      minY = height,
      maxX = 0,
      maxY = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < minX || maxY < minY) return;
    const pad = 16;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width, maxX + pad);
    maxY = Math.min(height, maxY + pad);

    const trimmed = document.createElement("canvas");
    trimmed.width = maxX - minX;
    trimmed.height = maxY - minY;
    trimmed.getContext("2d").drawImage(canvas, minX, minY, trimmed.width, trimmed.height, 0, 0, trimmed.width, trimmed.height);

    trimmed.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "signature.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <InstantToolShell
      title="E-Signature Pad"
      subtitle="Drawn and exported entirely on your device"
      icon={FileSignature}
      onClose={onClose}
    >
      <div className="overflow-hidden rounded-xl border-2 border-dashed border-slate-700 bg-white">
        <canvas
          ref={canvasRef}
          width={800}
          height={280}
          className="h-56 w-full cursor-crosshair touch-none"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
      </div>
      {!hasStroke && <p className="mt-2 text-center text-xs text-slate-500">Sign above with your mouse, trackpad, or finger</p>}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500">Ink color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded border border-slate-800 bg-transparent"
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <label className="whitespace-nowrap text-xs text-slate-500">Thickness — {thickness}px</label>
          <input
            type="range"
            min="1"
            max="8"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-full accent-rose-400"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={download}
          disabled={!hasStroke}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileOutput className="h-4 w-4" />
          Download signature.png
        </button>
        <button
          onClick={clear}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Clear
        </button>
      </div>
      <p className="mt-3 text-[11px] text-slate-600">
        Downloads as a tightly-cropped transparent PNG, ready to drop into a document, slide, or PDF.
      </p>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Business Card Designer — fully real, front & back rendered via Canvas     */
/* -------------------------------------------------------------------------- */

function BusinessCardTool({ onClose }) {
  const [name, setName] = useState("Jordan Blake");
  const [title, setTitle] = useState("Founder & Designer");
  const [company, setCompany] = useState("Studio North");
  const [phone, setPhone] = useState("+1 555 012 3456");
  const [email, setEmail] = useState("jordan@studionorth.co");
  const [website, setWebsite] = useState("studionorth.co");
  const [tagline, setTagline] = useState("Design that works as hard as you do.");
  const [accent, setAccent] = useState("#fb7185");
  const [bg, setBg] = useState("#0f172a");
  const [text, setText] = useState("#f8fafc");
  const [frontUrl, setFrontUrl] = useState(null);
  const [backUrl, setBackUrl] = useState(null);

  const CARD_W = 1050;
  const CARD_H = 600;

  useEffect(() => {
    const frontCanvas = document.createElement("canvas");
    frontCanvas.width = CARD_W;
    frontCanvas.height = CARD_H;
    const fctx = frontCanvas.getContext("2d");
    fctx.fillStyle = bg;
    fctx.fillRect(0, 0, CARD_W, CARD_H);
    fctx.fillStyle = accent;
    fctx.fillRect(0, 0, 18, CARD_H);

    fctx.fillStyle = text;
    fctx.font = "700 52px Arial, sans-serif";
    fctx.fillText(name, 70, 200);
    fctx.font = "400 28px Arial, sans-serif";
    fctx.fillStyle = accent;
    fctx.fillText(title, 70, 245);
    fctx.fillStyle = text;
    fctx.font = "600 24px Arial, sans-serif";
    fctx.fillText(company, 70, 300);

    fctx.font = "400 22px Arial, sans-serif";
    fctx.fillStyle = text;
    fctx.globalAlpha = 0.85;
    fctx.fillText(phone, 70, 470);
    fctx.fillText(email, 70, 505);
    fctx.fillText(website, 70, 540);
    fctx.globalAlpha = 1;

    frontCanvas.toBlob((blob) => {
      if (!blob) return;
      setFrontUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    }, "image/png");

    const backCanvas = document.createElement("canvas");
    backCanvas.width = CARD_W;
    backCanvas.height = CARD_H;
    const bctx = backCanvas.getContext("2d");
    bctx.fillStyle = accent;
    bctx.fillRect(0, 0, CARD_W, CARD_H);
    bctx.fillStyle = bg;
    bctx.textAlign = "center";
    bctx.font = "700 56px Arial, sans-serif";
    bctx.fillText(company, CARD_W / 2, CARD_H / 2 - 10);
    bctx.font = "400 24px Arial, sans-serif";
    bctx.globalAlpha = 0.85;
    bctx.fillText(tagline, CARD_W / 2, CARD_H / 2 + 40);
    bctx.globalAlpha = 1;
    bctx.textAlign = "left";

    backCanvas.toBlob((blob) => {
      if (!blob) return;
      setBackUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    }, "image/png");
  }, [name, title, company, phone, email, website, tagline, accent, bg, text]);

  const downloadUrl = (url, filename) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <InstantToolShell
      title="Business Card Designer"
      subtitle="Rendered at print resolution, entirely on your device"
      icon={Briefcase}
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Name</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Title</label>
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Company</label>
              <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Phone</label>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Email</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Website</label>
              <input className="input" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Back-of-card tagline</label>
              <input className="input" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Accent</label>
              <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Background</label>
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Text</label>
              <input type="color" value={text} onChange={(e) => setText(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Front</p>
            <div className="overflow-hidden rounded-xl border border-slate-800">
              {frontUrl && <img src={frontUrl} alt="Card front" className="w-full" />}
            </div>
            <button
              onClick={() => downloadUrl(frontUrl, "business-card-front.png")}
              disabled={!frontUrl}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-rose-400 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-3.5 w-3.5" />
              Download front
            </button>
          </div>
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Back</p>
            <div className="overflow-hidden rounded-xl border border-slate-800">
              {backUrl && <img src={backUrl} alt="Card back" className="w-full" />}
            </div>
            <button
              onClick={() => downloadUrl(backUrl, "business-card-back.png")}
              disabled={!backUrl}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-rose-400 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-3.5 w-3.5" />
              Download back
            </button>
          </div>
        </div>
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contract Template Kit — fully real, print-to-PDF                          */
/* -------------------------------------------------------------------------- */

function ContractTemplate({ onClose }) {
  const [provider, setProvider] = useState({ name: "Your Business Name", address: "123 Market Street, Springfield" });
  const [client, setClient] = useState({ name: "Client Name", address: "45 Client Avenue, Rivertown" });
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [services, setServices] = useState(
    "The Service Provider will design and develop a marketing website for the Client, including up to 5 pages, responsive layout, and one round of revisions."
  );
  const [payment, setPayment] = useState({ amount: "2500", currency: "$", schedule: "50% upfront, 50% on completion" });
  const [term, setTerm] = useState("This agreement begins on the effective date and continues until the services described above are completed.");
  const [termination, setTermination] = useState("Either party may terminate this agreement with 14 days' written notice.");
  const [governingLaw, setGoverningLaw] = useState("State of Delaware");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950">
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:px-8">
        <button onClick={onClose} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[1fr_380px] md:px-8">
        <div className="no-print space-y-5">
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[11px] text-amber-200/80">
            This is a simple, general-purpose starting template — not a substitute for advice from a
            qualified lawyer for anything high-stakes or unusual.
          </div>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Parties</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Service provider name" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
              <input className="input" placeholder="Provider address" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
              <input className="input" placeholder="Client name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
              <input className="input" placeholder="Client address" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Effective date</label>
              <input type="date" className="input w-48" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Services</h3>
            <textarea className="input" rows={3} value={services} onChange={(e) => setServices(e.target.value)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Payment</h3>
            <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
              <select className="input" value={payment.currency} onChange={(e) => setPayment({ ...payment, currency: e.target.value })}>
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input type="number" inputMode="decimal" className="input" placeholder="Total amount" value={payment.amount} onChange={(e) => setPayment({ ...payment, amount: e.target.value })} />
            </div>
            <textarea className="input mt-3" rows={2} placeholder="Payment schedule" value={payment.schedule} onChange={(e) => setPayment({ ...payment, schedule: e.target.value })} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Term & termination</h3>
            <textarea className="input" rows={2} value={term} onChange={(e) => setTerm(e.target.value)} />
            <textarea className="input mt-3" rows={2} value={termination} onChange={(e) => setTermination(e.target.value)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Governing law</h3>
            <input className="input" value={governingLaw} onChange={(e) => setGoverningLaw(e.target.value)} />
          </section>

          <AdSlot variant="banner" />
        </div>

        <div className="md:sticky md:top-20 md:self-start">
          <div id="invoice-print-area" className="invoice-print-area rounded-2xl border border-slate-800 bg-white p-8 text-slate-900 shadow-2xl">
            <h1 className="text-center text-base font-bold uppercase tracking-wide">Service Agreement</h1>
            <p className="mt-1 text-center font-mono text-[11px] text-slate-500">Effective {effectiveDate}</p>

            <p className="mt-5 text-xs leading-relaxed text-slate-700">
              This Service Agreement is entered into between <strong>{provider.name}</strong> ("Service
              Provider"), located at {provider.address}, and <strong>{client.name}</strong> ("Client"),
              located at {client.address}.
            </p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">1. Services</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{services}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">2. Payment</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">
                The total fee for these services is {payment.currency}
                {Number(payment.amount || 0).toLocaleString()}. {payment.schedule}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">3. Term</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{term}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">4. Termination</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{termination}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">5. Governing Law</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">
                This agreement is governed by the laws of the {governingLaw}.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 text-xs">
              <div>
                <div className="h-10 border-b border-slate-400" />
                <p className="mt-1 text-slate-500">{provider.name} · Date</p>
              </div>
              <div>
                <div className="h-10 border-b border-slate-400" />
                <p className="mt-1 text-slate-500">{client.name} · Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  GIF Maker — fully real, encoded client-side (encoder loaded from a CDN    */
/*  at runtime, same pattern as the PDF Compressor's worker)                  */
/* -------------------------------------------------------------------------- */

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.dataset.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load GIF encoder"));
    document.head.appendChild(s);
  });
}

// Loads FFmpeg via its UMD build from a CDN at runtime, rather than importing
// the @ffmpeg/ffmpeg npm package directly. The npm package's ESM build calls
// `new Worker(new URL(classWorkerURL, import.meta.url))`, which Next.js's
// bundler (both Webpack and Turbopack) cannot statically resolve and fails
// the production build with "Module not found" — a widely-reported, still
// unresolved issue as of ffmpeg.wasm 0.12.15 on Next.js 14 and 15. Loading
// the prebuilt UMD scripts as plain <script> tags sidesteps bundling
// entirely, the same pattern already used for the GIF encoder above.
async function loadFFmpegGlobals() {
  await loadScriptOnce("https://unpkg.com/@ffmpeg/ffmpeg@0.12.6/dist/umd/ffmpeg.js");
  await loadScriptOnce("https://unpkg.com/@ffmpeg/util@0.12.2/dist/umd/index.js");
  const { FFmpeg } = window.FFmpegWASM;
  const { fetchFile, toBlobURL } = window.FFmpegUtil;
  return { FFmpeg, fetchFile, toBlobURL };
}

// Loads background-removal via a runtime-injected native <script type="module">
// element rather than a JS import() expression. This library has repeatedly
// broken when Next.js's bundler (both Webpack and Turbopack) tries to
// statically process it — a plain <script> tag's text content is parsed and
// executed only by the browser itself, so no bundler ever touches it.
let cachedRemoveBackground = null;

function loadRemoveBackground() {
  if (cachedRemoveBackground) return Promise.resolve(cachedRemoveBackground);
  if (window.__imglyRemoveBackground) {
    cachedRemoveBackground = window.__imglyRemoveBackground;
    return Promise.resolve(cachedRemoveBackground);
  }
  return new Promise((resolve, reject) => {
    const onReady = () => {
      window.removeEventListener("imgly-bg-removal-ready", onReady);
      cachedRemoveBackground = window.__imglyRemoveBackground;
      if (cachedRemoveBackground) resolve(cachedRemoveBackground);
      else reject(new Error("Background removal module loaded but export was missing"));
    };
    window.addEventListener("imgly-bg-removal-ready", onReady);
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import removeBackground from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm";
      window.__imglyRemoveBackground = removeBackground;
      window.dispatchEvent(new Event("imgly-bg-removal-ready"));
    `;
    script.onerror = () => {
      window.removeEventListener("imgly-bg-removal-ready", onReady);
      reject(new Error("Failed to load the background removal module script"));
    };
    document.head.appendChild(script);
  });
}

function GifMakerTool({ onClose }) {
  const [files, setFiles] = useState([]); // { id, file, url }
  const [delay, setDelay] = useState(400);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const idCounter = useRef(0);

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!picked.length) return;
    setResultUrl(null);
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => {
        idCounter.current += 1;
        return { id: `f${idCounter.current}`, file, url: URL.createObjectURL(file) };
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

  const build = async () => {
    if (files.length < 2) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      await loadScriptOnce("https://unpkg.com/gif.js@0.2.0/dist/gif.js");
      const GIF = window.GIF;

      // gif.js runs its encoder in a Web Worker. Pointing a worker directly at
      // a cross-origin CDN URL is blocked by most browsers' same-origin
      // policy for workers. Fetching the script and wrapping it in a local
      // Blob makes the browser treat it as same-origin instead.
      const workerResponse = await fetch("https://unpkg.com/gif.js@0.2.0/dist/gif.worker.js");
      const workerScriptText = await workerResponse.text();
      const workerBlobUrl = URL.createObjectURL(
        new Blob([workerScriptText], { type: "application/javascript" })
      );

      const FRAME_SIZE = 480;
      const loaded = await Promise.all(
        files.map(
          ({ url }) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.src = url;
            })
        )
      );

      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: workerBlobUrl,
        width: FRAME_SIZE,
        height: FRAME_SIZE,
      });

      loaded.forEach((img) => {
        const canvas = document.createElement("canvas");
        canvas.width = FRAME_SIZE;
        canvas.height = FRAME_SIZE;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, FRAME_SIZE, FRAME_SIZE);
        drawImageCover(ctx, img, 0, 0, FRAME_SIZE, FRAME_SIZE);
        gif.addFrame(canvas, { copy: true, delay });
      });

      gif.on("progress", (p) => setProgress(Math.round(p * 100)));
      gif.on("finished", (blob) => {
        setResultUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setBusy(false);
      });
      gif.render();
    } catch (e) {
      console.error("GIF build failed:", e);
      setError("Couldn't build the GIF. Try fewer or smaller images.");
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "animation.gif";
    a.click();
  };

  return (
    <InstantToolShell
      title="GIF Maker"
      subtitle="Encoded entirely on your device — nothing is uploaded"
      icon={Clapperboard}
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
        <Clapperboard className="mb-2 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-300">Drag & drop photos here, or click to add (2 or more)</p>
        <p className="mt-1 text-xs text-slate-500">They'll play in this order, looping forever</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
              <img src={f.url} alt="" className="h-8 w-8 rounded object-cover" />
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 font-mono text-[11px] text-slate-400">
                {i + 1}
              </span>
              <span className="flex-1 truncate text-sm text-slate-200">{f.file.name}</span>
              <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20">
                <ChevronUp className="h-4 w-4" />
              </button>
              <button onClick={() => move(i, 1)} disabled={i === files.length - 1} className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-20">
                <ChevronDown className="h-4 w-4" />
              </button>
              <button onClick={() => removeFile(f.id)} className="rounded p-1 text-slate-500 hover:bg-red-500/10 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
          Frame delay — {delay}ms per photo
        </label>
        <input
          type="range"
          min="100"
          max="1200"
          step="50"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full accent-rose-400"
        />
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      {resultUrl && (
        <div className="mt-4 flex justify-center overflow-hidden rounded-xl border border-slate-800 bg-white p-2">
          <img src={resultUrl} alt="GIF preview" className="max-h-64" />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={build}
          disabled={files.length < 2 || busy}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clapperboard className="h-4 w-4" />}
          {busy ? `Encoding… ${progress}%` : "Build GIF"}
        </button>
        {resultUrl && (
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
          >
            <FileOutput className="h-4 w-4" />
            Download animation.gif
          </button>
        )}
      </div>
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Video Trimmer — fully real, powered by ffmpeg.wasm running in-browser     */
/* -------------------------------------------------------------------------- */

function VideoTrimmerTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const ffmpegRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("video/")) return;
    setFile(f);
    setResultUrl(null);
    setError(null);
    setVideoUrl(URL.createObjectURL(f));
  };

  const onLoadedMetadata = (e) => {
    const d = e.target.duration;
    setDuration(d);
    setStart(0);
    setEnd(Math.min(d, 15));
  };

  const secondsToClock = (s) => {
    const m = Math.floor(s / 60);
    const sec = (s % 60).toFixed(1);
    return `${m}:${sec.padStart(4, "0")}`;
  };

  const trim = async () => {
    if (!file || end <= start) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      setStatusText("Loading video engine…");
      const { FFmpeg, fetchFile, toBlobURL } = await loadFFmpegGlobals();

      if (!ffmpegRef.current) {
        const ffmpeg = new FFmpeg();
        const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        ffmpeg.on("progress", ({ progress: p }) => setProgress(Math.min(100, Math.round(p * 100))));
        ffmpeg.on("log", ({ message }) => setStatusText(message.slice(0, 60)));
        await ffmpeg.load({
          coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
        });
        ffmpegRef.current = ffmpeg;
      }
      const ffmpeg = ffmpegRef.current;

      setStatusText("Reading video file…");
      const inputName = "input" + (file.name.match(/\.\w+$/)?.[0] || ".mp4");
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatusText("Trimming…");
      await ffmpeg.exec([
        "-i",
        inputName,
        "-ss",
        String(start),
        "-to",
        String(end),
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "output.mp4",
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("Video trim failed:", e);
      setError("Couldn't trim that video. Try a shorter clip or a different file.");
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "trimmed.mp4";
    a.click();
  };

  return (
    <InstantToolShell
      title="Video Trimmer"
      subtitle="Trimmed entirely on your device — nothing is uploaded"
      icon={Video}
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
          <Video className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop a video, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">Best for short clips — under a minute or two</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <video
            src={videoUrl}
            controls
            onLoadedMetadata={onLoadedMetadata}
            className="w-full rounded-xl border border-slate-800 bg-black"
          />

          {duration > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                  Start — {secondsToClock(start)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={start}
                  onChange={(e) => setStart(Math.min(Number(e.target.value), end - 0.1))}
                  className="w-full accent-rose-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                  End — {secondsToClock(end)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={end}
                  onChange={(e) => setEnd(Math.max(Number(e.target.value), start + 0.1))}
                  className="w-full accent-rose-400"
                />
              </div>
            </div>
          )}

          <p className="mt-2 text-xs text-slate-500">
            Clip length: {secondsToClock(Math.max(0, end - start))}
          </p>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          {busy && (
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-rose-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 truncate font-mono text-[11px] text-slate-500">{statusText}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={trim}
              disabled={busy || duration === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
              {busy ? "Trimming…" : "Trim video"}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download trimmed.mp4
              </button>
            )}
          </div>

          {resultUrl && (
            <video src={resultUrl} controls className="mt-4 w-full rounded-xl border border-slate-800 bg-black" />
          )}
        </div>
      )}
    </InstantToolShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Audio Converter — fully real, powered by ffmpeg.wasm running in-browser   */
/* -------------------------------------------------------------------------- */

const AUDIO_FORMATS = {
  mp3: { codec: "libmp3lame", type: "audio/mpeg" },
  wav: { codec: "pcm_s16le", type: "audio/wav" },
  ogg: { codec: "libvorbis", type: "audio/ogg" },
  m4a: { codec: "aac", type: "audio/mp4" },
};

function AudioConverterTool({ onClose }) {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState("mp3");
  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const ffmpegRef = useRef(null);

  const onPickFile = (f) => {
    if (!f || !f.type.startsWith("audio/")) return;
    setFile(f);
    setResultUrl(null);
    setError(null);
    const ext = f.name.split(".").pop()?.toLowerCase();
    setTargetFormat(ext === "mp3" ? "wav" : "mp3");
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      setStatusText("Loading audio engine…");
      const { FFmpeg, fetchFile, toBlobURL } = await loadFFmpegGlobals();

      if (!ffmpegRef.current) {
        const ffmpeg = new FFmpeg();
        const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        ffmpeg.on("progress", ({ progress: p }) => setProgress(Math.min(100, Math.round(p * 100))));
        ffmpeg.on("log", ({ message }) => setStatusText(message.slice(0, 60)));
        await ffmpeg.load({
          coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
        });
        ffmpegRef.current = ffmpeg;
      }
      const ffmpeg = ffmpegRef.current;

      setStatusText("Reading audio file…");
      const inputName = "input" + (file.name.match(/\.\w+$/)?.[0] || ".mp3");
      const outputName = `output.${targetFormat}`;
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatusText("Converting…");
      await ffmpeg.exec(["-i", inputName, "-acodec", AUDIO_FORMATS[targetFormat].codec, outputName]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], { type: AUDIO_FORMATS[targetFormat].type });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (e) {
      console.error("Audio conversion failed:", e);
      setError("Couldn't convert that file. Try a different audio file or format.");
    } finally {
      setBusy(false);
      setStatusText("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `converted.${targetFormat}`;
    a.click();
  };

  return (
    <InstantToolShell
      title="Audio Converter"
      subtitle="Converted entirely on your device — nothing is uploaded"
      icon={Music}
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
          <Music className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Drag & drop an audio file, or click to choose one</p>
          <p className="mt-1 text-xs text-slate-500">MP3, WAV, OGG, or M4A</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
            <Music className="h-8 w-8 text-rose-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-200">{file.name}</p>
              <p className="font-mono text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
          </div>

          <audio src={URL.createObjectURL(file)} controls className="mt-3 w-full" />

          <div className="mt-4">
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Convert to</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(AUDIO_FORMATS).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setTargetFormat(fmt)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase transition ${
                    targetFormat === fmt
                      ? "bg-rose-400 text-slate-950"
                      : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          {busy && (
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-rose-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 truncate font-mono text-[11px] text-slate-500">{statusText}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={convert}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Repeat className="h-4 w-4" />}
              {busy ? "Converting…" : `Convert to ${targetFormat.toUpperCase()}`}
            </button>
            {resultUrl && (
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <FileOutput className="h-4 w-4" />
                Download converted.{targetFormat}
              </button>
            )}
          </div>

          {resultUrl && <audio src={resultUrl} controls className="mt-4 w-full" />}
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
                type="email"
                value={business.email}
                onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              />
              <input
                className="input"
                placeholder="Phone"
                type="tel"
                inputMode="tel"
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
                type="email"
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
                    type="number" inputMode="decimal"
                    min="0"
                    className="input text-center"
                    value={it.qty}
                    onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                  />
                  <input
                    type="number" inputMode="decimal"
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
                type="number" inputMode="decimal"
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
/*  Quote Builder — fully real, print-to-PDF, same pattern as the invoice     */
/* -------------------------------------------------------------------------- */

let quoteItemIdCounter = 3;

function QuoteBuilder({ onClose }) {
  const [business, setBusiness] = useState({
    name: "Your Business Name",
    email: "you@business.com",
    phone: "+1 555 000 1234",
    address: "123 Market Street, Suite 4\nSpringfield",
  });
  const [client, setClient] = useState({
    name: "Prospective Client",
    email: "client@email.com",
    address: "45 Client Avenue\nRivertown",
  });
  const [meta, setMeta] = useState({
    number: "QUO-1001",
    date: new Date().toISOString().slice(0, 10),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    currency: "$",
  });
  const [items, setItems] = useState([
    { id: "1", desc: "Brand identity package", qty: 1, rate: 1200 },
    { id: "2", desc: "Landing page design", qty: 1, rate: 650 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState(
    "This quote is valid for 30 days. A 50% deposit is required to begin work."
  );

  const updateItem = (id, field, value) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));

  const addItem = () => {
    quoteItemIdCounter += 1;
    setItems((prev) => [...prev, { id: String(quoteItemIdCounter), desc: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

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
        <div className="no-print space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Your business</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Business name" value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} />
              <input className="input" type="email" placeholder="Email" value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} />
              <input className="input" type="tel" inputMode="tel" placeholder="Phone" value={business.phone} onChange={(e) => setBusiness({ ...business, phone: e.target.value })} />
              <textarea className="input sm:col-span-2" rows={2} placeholder="Address" value={business.address} onChange={(e) => setBusiness({ ...business, address: e.target.value })} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Prepared for</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Client name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
              <input className="input" type="email" placeholder="Client email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
              <textarea className="input sm:col-span-2" rows={2} placeholder="Client address" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Quote details</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <input className="input" placeholder="Quote #" value={meta.number} onChange={(e) => setMeta({ ...meta, number: e.target.value })} />
              <input type="date" className="input" value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} />
              <input type="date" className="input" value={meta.validUntil} onChange={(e) => setMeta({ ...meta, validUntil: e.target.value })} />
              <select className="input" value={meta.currency} onChange={(e) => setMeta({ ...meta, currency: e.target.value })}>
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Line items</h3>
              <button onClick={addItem} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Add item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((it) => (
                <div key={it.id} className="grid grid-cols-[1fr_60px_90px_28px] items-center gap-2">
                  <input className="input" placeholder="Description" value={it.desc} onChange={(e) => updateItem(it.id, "desc", e.target.value)} />
                  <input type="number" inputMode="decimal" min="0" className="input text-center" value={it.qty} onChange={(e) => updateItem(it.id, "qty", e.target.value)} />
                  <input type="number" inputMode="decimal" min="0" step="0.01" className="input text-right font-mono" value={it.rate} onChange={(e) => updateItem(it.id, "rate", e.target.value)} />
                  <button onClick={() => removeItem(it.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs text-slate-500">Tax rate (%)</label>
              <input type="number" inputMode="decimal" min="0" step="0.1" className="input w-24 font-mono" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Terms & notes</h3>
            <textarea className="input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </section>

          <AdSlot variant="banner" />
        </div>

        <div className="md:sticky md:top-20 md:self-start">
          <div id="invoice-print-area" className="invoice-print-area rounded-2xl border border-slate-800 bg-white p-8 text-slate-900 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <h1 className="text-lg font-bold">{business.name}</h1>
                <p className="whitespace-pre-line text-xs text-slate-500">{business.address}</p>
                <p className="mt-1 text-xs text-slate-500">{business.email} · {business.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-slate-400">Quote</p>
                <p className="font-mono text-sm font-semibold">{meta.number}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="uppercase tracking-widest text-slate-400">Prepared for</p>
                <p className="mt-1 font-semibold">{client.name}</p>
                <p className="whitespace-pre-line text-slate-500">{client.address}</p>
                <p className="text-slate-500">{client.email}</p>
              </div>
              <div className="text-right">
                <p><span className="uppercase tracking-widest text-slate-400">Date </span><span className="font-mono">{meta.date}</span></p>
                <p className="mt-1"><span className="uppercase tracking-widest text-slate-400">Valid until </span><span className="font-mono">{meta.validUntil}</span></p>
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
                    <td className="py-2 text-right font-mono">{fmt((Number(it.qty) || 0) * (Number(it.rate) || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-48 text-xs">
                <div className="flex justify-between py-1"><span className="text-slate-500">Subtotal</span><span className="font-mono">{fmt(subtotal)}</span></div>
                <div className="flex justify-between py-1"><span className="text-slate-500">Tax ({Number(taxRate) || 0}%)</span><span className="font-mono">{fmt(taxAmount)}</span></div>
                <div className="mt-1 flex justify-between border-t border-slate-200 py-2 text-sm font-bold"><span>Total estimate</span><span className="font-mono">{fmt(total)}</span></div>
              </div>
            </div>

            {notes && <div className="mt-6 border-t border-slate-200 pt-4 text-[11px] text-slate-500">{notes}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Receipt Generator — fully real, print-to-PDF                              */
/* -------------------------------------------------------------------------- */

let receiptItemIdCounter = 2;

function ReceiptGenerator({ onClose }) {
  const [business, setBusiness] = useState({
    name: "Your Business Name",
    email: "you@business.com",
    phone: "+1 555 000 1234",
  });
  const [payer, setPayer] = useState({ name: "Client Name", email: "client@email.com" });
  const [meta, setMeta] = useState({
    number: "RCT-1001",
    date: new Date().toISOString().slice(0, 10),
    method: "Card",
    currency: "$",
  });
  const [items, setItems] = useState([{ id: "1", desc: "Payment for services", amount: 250 }]);
  const [notes, setNotes] = useState("Paid in full. Thank you for your business!");

  const updateItem = (id, field, value) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));

  const addItem = () => {
    receiptItemIdCounter += 1;
    setItems((prev) => [...prev, { id: String(receiptItemIdCounter), desc: "", amount: 0 }]);
  };

  const removeItem = (id) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

  const total = useMemo(() => items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0), [items]);
  const fmt = (n) => `${meta.currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950">
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:px-8">
        <button onClick={onClose} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-[1fr_320px] md:px-8">
        <div className="no-print space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Your business</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Business name" value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} />
              <input className="input" type="email" placeholder="Email" value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} />
              <input className="input sm:col-span-2" type="tel" inputMode="tel" placeholder="Phone" value={business.phone} onChange={(e) => setBusiness({ ...business, phone: e.target.value })} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Received from</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Payer name" value={payer.name} onChange={(e) => setPayer({ ...payer, name: e.target.value })} />
              <input className="input" type="email" placeholder="Payer email" value={payer.email} onChange={(e) => setPayer({ ...payer, email: e.target.value })} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Receipt details</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <input className="input" placeholder="Receipt #" value={meta.number} onChange={(e) => setMeta({ ...meta, number: e.target.value })} />
              <input type="date" className="input" value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} />
              <select className="input" value={meta.method} onChange={(e) => setMeta({ ...meta, method: e.target.value })}>
                {["Cash", "Card", "Bank Transfer", "Check", "Other"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select className="input" value={meta.currency} onChange={(e) => setMeta({ ...meta, currency: e.target.value })}>
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">What was paid for</h3>
              <button onClick={addItem} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Add line
              </button>
            </div>
            <div className="space-y-2">
              {items.map((it) => (
                <div key={it.id} className="grid grid-cols-[1fr_100px_28px] items-center gap-2">
                  <input className="input" placeholder="Description" value={it.desc} onChange={(e) => updateItem(it.id, "desc", e.target.value)} />
                  <input type="number" inputMode="decimal" min="0" step="0.01" className="input text-right font-mono" value={it.amount} onChange={(e) => updateItem(it.id, "amount", e.target.value)} />
                  <button onClick={() => removeItem(it.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Notes</h3>
            <textarea className="input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </section>

          <AdSlot variant="banner" />
        </div>

        <div className="md:sticky md:top-20 md:self-start">
          <div id="invoice-print-area" className="invoice-print-area rounded-2xl border border-slate-800 bg-white p-8 text-slate-900 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <h1 className="text-lg font-bold">{business.name}</h1>
                <p className="mt-1 text-xs text-slate-500">{business.email} · {business.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-slate-400">Receipt</p>
                <p className="font-mono text-sm font-semibold">{meta.number}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="uppercase tracking-widest text-slate-400">Received from</p>
                <p className="mt-1 font-semibold">{payer.name}</p>
                <p className="text-slate-500">{payer.email}</p>
              </div>
              <div className="text-right">
                <p><span className="uppercase tracking-widest text-slate-400">Date </span><span className="font-mono">{meta.date}</span></p>
                <p className="mt-1"><span className="uppercase tracking-widest text-slate-400">Method </span><span className="font-mono">{meta.method}</span></p>
              </div>
            </div>

            <table className="mt-6 w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left uppercase tracking-widest text-slate-400">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-slate-100">
                    <td className="py-2 pr-2">{it.desc || "—"}</td>
                    <td className="py-2 text-right font-mono">{fmt(Number(it.amount) || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-48 text-xs">
                <div className="mt-1 flex justify-between border-t border-slate-200 py-2 text-sm font-bold">
                  <span>Total received</span>
                  <span className="font-mono">{fmt(total)}</span>
                </div>
              </div>
            </div>

            {notes && <div className="mt-6 border-t border-slate-200 pt-4 text-[11px] text-slate-500">{notes}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Proposal Builder — fully real, print-to-PDF                               */
/* -------------------------------------------------------------------------- */

let proposalItemIdCounter = 3;

function ProposalBuilder({ onClose }) {
  const [business, setBusiness] = useState({ name: "Your Business Name", email: "you@business.com" });
  const [client, setClient] = useState({ name: "Prospective Client", company: "Client Co." });
  const [meta, setMeta] = useState({
    title: "Website Redesign Proposal",
    date: new Date().toISOString().slice(0, 10),
    currency: "$",
  });
  const [overview, setOverview] = useState(
    "This proposal outlines a plan to redesign your website with a modern, conversion-focused layout, improved mobile experience, and faster load times."
  );
  const [scopeItems, setScopeItems] = useState([
    { id: "1", text: "Discovery workshop and content audit" },
    { id: "2", text: "New responsive design across all key pages" },
    { id: "3", text: "Implementation, QA, and launch support" },
  ]);
  const [pricing, setPricing] = useState([
    { id: "1", desc: "Design & development", amount: 3200 },
    { id: "2", desc: "Post-launch support (1 month)", amount: 400 },
  ]);
  const [timeline, setTimeline] = useState("4–6 weeks from kickoff to launch.");

  const updateScope = (id, value) => setScopeItems((prev) => prev.map((it) => (it.id === id ? { ...it, text: value } : it)));
  const addScope = () => {
    proposalItemIdCounter += 1;
    setScopeItems((prev) => [...prev, { id: String(proposalItemIdCounter), text: "" }]);
  };
  const removeScope = (id) => setScopeItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

  const updatePricing = (id, field, value) => setPricing((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  const addPricing = () => {
    proposalItemIdCounter += 1;
    setPricing((prev) => [...prev, { id: String(proposalItemIdCounter), desc: "", amount: 0 }]);
  };
  const removePricing = (id) => setPricing((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

  const total = useMemo(() => pricing.reduce((sum, it) => sum + (Number(it.amount) || 0), 0), [pricing]);
  const fmt = (n) => `${meta.currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950">
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:px-8">
        <button onClick={onClose} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[1fr_360px] md:px-8">
        <div className="no-print space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Proposal details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input sm:col-span-2" placeholder="Proposal title" value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
              <input type="date" className="input" value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} />
              <select className="input" value={meta.currency} onChange={(e) => setMeta({ ...meta, currency: e.target.value })}>
                {["$", "€", "£", "₹", "¥"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">From / To</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Your business name" value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} />
              <input className="input" placeholder="Your email" value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} />
              <input className="input" placeholder="Client name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
              <input className="input" placeholder="Client company" value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Overview</h3>
            <textarea className="input" rows={3} value={overview} onChange={(e) => setOverview(e.target.value)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scope of work</h3>
              <button onClick={addScope} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {scopeItems.map((it) => (
                <div key={it.id} className="flex items-center gap-2">
                  <input className="input" value={it.text} onChange={(e) => updateScope(it.id, e.target.value)} />
                  <button onClick={() => removeScope(it.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Investment</h3>
              <button onClick={addPricing} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {pricing.map((it) => (
                <div key={it.id} className="grid grid-cols-[1fr_100px_28px] items-center gap-2">
                  <input className="input" placeholder="Description" value={it.desc} onChange={(e) => updatePricing(it.id, "desc", e.target.value)} />
                  <input type="number" inputMode="decimal" min="0" step="0.01" className="input text-right font-mono" value={it.amount} onChange={(e) => updatePricing(it.id, "amount", e.target.value)} />
                  <button onClick={() => removePricing(it.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Timeline</h3>
            <textarea className="input" rows={2} value={timeline} onChange={(e) => setTimeline(e.target.value)} />
          </section>

          <AdSlot variant="banner" />
        </div>

        <div className="md:sticky md:top-20 md:self-start">
          <div id="invoice-print-area" className="invoice-print-area rounded-2xl border border-slate-800 bg-white p-8 text-slate-900 shadow-2xl">
            <p className="text-xs uppercase tracking-widest text-slate-400">Proposal</p>
            <h1 className="mt-1 text-xl font-bold">{meta.title}</h1>
            <p className="mt-1 font-mono text-xs text-slate-500">{meta.date}</p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-200 py-4 text-xs">
              <div>
                <p className="uppercase tracking-widest text-slate-400">Prepared by</p>
                <p className="mt-1 font-semibold">{business.name}</p>
                <p className="text-slate-500">{business.email}</p>
              </div>
              <div className="text-right">
                <p className="uppercase tracking-widest text-slate-400">Prepared for</p>
                <p className="mt-1 font-semibold">{client.name}</p>
                <p className="text-slate-500">{client.company}</p>
              </div>
            </div>

            {overview && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Overview</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">{overview}</p>
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Scope of work</p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate-700">
                {scopeItems.filter((it) => it.text.trim()).map((it) => (
                  <li key={it.id}>{it.text}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Investment</p>
              <table className="mt-2 w-full text-xs">
                <tbody>
                  {pricing.map((it) => (
                    <tr key={it.id} className="border-b border-slate-100">
                      <td className="py-1.5 pr-2">{it.desc || "—"}</td>
                      <td className="py-1.5 text-right font-mono">{fmt(Number(it.amount) || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 flex justify-end">
                <div className="flex w-48 justify-between border-t border-slate-200 py-2 text-sm font-bold">
                  <span>Total</span>
                  <span className="font-mono">{fmt(total)}</span>
                </div>
              </div>
            </div>

            {timeline && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Timeline</p>
                <p className="mt-1 text-xs text-slate-700">{timeline}</p>
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
          min-height: 48px;
          box-sizing: border-box;
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
                <LogoMark className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-50">
                  Quick<span className="text-amber-400">Zeta</span>
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
            <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-500">
              <a href="/about" className="hover:text-slate-300">About</a>
              <a href="/faq" className="hover:text-slate-300">FAQ</a>
              <a href="/privacy" className="hover:text-slate-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-slate-300">Terms</a>
              <a href="/contact" className="hover:text-slate-300">Contact</a>
            </nav>
            QuickZeta — no accounts, no file uploads, no tracking. Everything above runs on your
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
      {activeTool?.kind === "quote" && <QuoteBuilder onClose={closeTool} />}
      {activeTool?.kind === "receipt" && <ReceiptGenerator onClose={closeTool} />}
      {activeTool?.kind === "proposal" && <ProposalBuilder onClose={closeTool} />}
      {activeTool?.kind === "contract" && <ContractTemplate onClose={closeTool} />}
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
      {activeTool?.kind === "instant" && activeTool.id === "bg-remover" && (
        <BackgroundRemoverTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "meme-generator" && (
        <MemeGeneratorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "img-format-converter" && (
        <ImageFormatConverterTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "file-archiver" && (
        <FileArchiverTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "img-to-pdf" && (
        <ImageToPdfTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "pdf-watermark" && (
        <PdfWatermarkTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "pdf-compressor" && (
        <PdfCompressorTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "csv-json-converter" && (
        <CsvJsonConverterTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "photo-collage" && (
        <PhotoCollageTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "e-signature" && (
        <ESignatureTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "business-card" && (
        <BusinessCardTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "gif-maker" && (
        <GifMakerTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "video-trimmer" && (
        <VideoTrimmerTool onClose={closeTool} />
      )}
      {activeTool?.kind === "instant" && activeTool.id === "audio-converter" && (
        <AudioConverterTool onClose={closeTool} />
      )}
      {activeTool?.kind === "simulated" && <SimulatedToolRunner tool={activeTool} onClose={closeTool} />}
    </div>
  );
}

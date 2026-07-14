"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
};

const TOOLS = [
  // Document Desk
  {
    id: "pdf-merge",
    name: "PDF Merger",
    desc: "Combine multiple PDFs into a single file, in order.",
    icon: Layers,
    category: "document-desk",
    kind: "simulated",
    steps: ["Reading pages…", "Stitching documents…", "Rebuilding index…", "Packing final PDF…"],
  },
  {
    id: "pdf-split",
    name: "PDF Splitter",
    desc: "Break a large PDF into separate single-page files.",
    icon: Scissors,
    category: "document-desk",
    kind: "simulated",
    steps: ["Indexing pages…", "Slicing document…", "Compressing output…"],
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

  // Media Studio
  {
    id: "img-compressor",
    name: "Image Compressor",
    desc: "Shrink photos up to 80% with barely any quality loss.",
    icon: ImageIcon,
    category: "media-studio",
    kind: "simulated",
    steps: ["Decoding pixels…", "Re-encoding at target quality…", "Stripping metadata…"],
  },
  {
    id: "img-cropper",
    name: "Image Cropper & Resizer",
    desc: "Crop, resize and export images to exact dimensions.",
    icon: Crop,
    category: "media-studio",
    kind: "simulated",
    steps: ["Loading image…", "Applying crop region…", "Rendering export…"],
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
    kind: "simulated",
    steps: ["Encoding payload…", "Rendering matrix…", "Adding quiet zone…"],
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

                {/* Mid-content ad between the 1st and 2nd category */}
                {idx === 0 && (
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
      {activeTool?.kind === "simulated" && <SimulatedToolRunner tool={activeTool} onClose={closeTool} />}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FileOutput } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

export default function BusinessCardDesignerClient() {
  const [name, setName] = useState("Jordan Blake");
  const [title, setTitle] = useState("Founder & Designer");
  const [company, setCompany] = useState("Studio North");
  const [phone, setPhone] = useState("+1 555 012 3456");
  const [email, setEmail] = useState("jordan@studionorth.co");
  const [website, setWebsite] = useState("studionorth.co");
  const [tagline, setTagline] = useState("Design that works as hard as you do.");
  const [accent, setAccent] = useState("#fbbf24");
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Name</label>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Title</label>
              <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Company</label>
              <input className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Phone</label>
              <input type="tel" inputMode="tel" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Email</label>
              <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Website</label>
              <input className={inputClass} value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Back-of-card tagline</label>
              <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Accent</label>
              <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-12 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Background</label>
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-12 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Text</label>
              <input type="color" value={text} onChange={(e) => setText(e.target.value)} className="h-12 w-full cursor-pointer rounded-lg border border-slate-800 bg-transparent" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Front</p>
            <div className="overflow-hidden rounded-xl border border-slate-800">
              {frontUrl && <img src={frontUrl} alt="Business card front" className="w-full" />}
            </div>
            <button
              onClick={() => downloadUrl(frontUrl, "business-card-front.png")}
              disabled={!frontUrl}
              className="mt-2 inline-flex h-10 items-center gap-2 rounded-lg bg-amber-400 px-4 text-xs font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-3.5 w-3.5" />
              Download front
            </button>
          </div>
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-500">Back</p>
            <div className="overflow-hidden rounded-xl border border-slate-800">
              {backUrl && <img src={backUrl} alt="Business card back" className="w-full" />}
            </div>
            <button
              onClick={() => downloadUrl(backUrl, "business-card-back.png")}
              disabled={!backUrl}
              className="mt-2 inline-flex h-10 items-center gap-2 rounded-lg bg-amber-400 px-4 text-xs font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FileOutput className="h-3.5 w-3.5" />
              Download back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { QrCode, FileOutput } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";
const textareaClass =
  "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-400/50";

export default function QrCodeGeneratorClient() {
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex gap-2">
        {[
          ["link", "Link"],
          ["text", "Text"],
          ["wifi", "Wi-Fi"],
        ].map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`h-10 rounded-lg px-4 text-xs font-medium transition ${
              mode === m ? "bg-amber-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-[1fr_200px]">
        <div>
          {mode === "link" && (
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">URL</label>
              <input
                type="url"
                inputMode="url"
                className={inputClass}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          )}
          {mode === "text" && (
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Text</label>
              <textarea className={textareaClass} rows={4} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
          )}
          {mode === "wifi" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
                  Network name (SSID)
                </label>
                <input
                  className={inputClass}
                  value={wifi.ssid}
                  onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Password</label>
                <input
                  className={inputClass}
                  value={wifi.password}
                  onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Security</label>
                <select
                  className={inputClass}
                  value={wifi.encryption}
                  onChange={(e) => setWifi({ ...wifi, encryption: e.target.value })}
                >
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
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileOutput className="h-4 w-4" />
            Download PNG
          </button>
        </div>

        <div className="flex items-center justify-center rounded-xl border border-slate-800 bg-white p-3">
          {dataUrl ? (
            <img src={dataUrl} alt="Generated QR code" className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center text-center text-xs text-slate-400">
              Enter details to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

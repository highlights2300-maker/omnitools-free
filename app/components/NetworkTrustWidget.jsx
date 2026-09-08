"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ChevronUp, ChevronDown } from "lucide-react";
import { startNetworkMonitor, getNetworkCounts } from "../lib/network-monitor";

export default function NetworkTrustWidget() {
  const [counts, setCounts] = useState({ fileRequestCount: 0, totalRequestCount: 0 });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    startNetworkMonitor();
    setCounts(getNetworkCounts());

    const onUpdate = (e) => setCounts(e.detail);
    window.addEventListener("quickzeta:network-update", onUpdate);
    return () => window.removeEventListener("quickzeta:network-update", onUpdate);
  }, []);

  const clean = counts.fileRequestCount === 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <div
        className={`overflow-hidden rounded-xl border shadow-lg backdrop-blur transition-all ${
          clean ? "border-emerald-400/30 bg-slate-950/90" : "border-red-400/40 bg-slate-950/90"
        }`}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center gap-2 px-3 py-2 text-left"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                clean ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${clean ? "bg-emerald-400" : "bg-red-400"}`}
            />
          </span>
          <span className="font-mono text-[11px] text-slate-300">
            {clean ? "0 files sent to a server" : `${counts.fileRequestCount} file upload detected`}
          </span>
          {expanded ? (
            <ChevronDown className="ml-1 h-3 w-3 text-slate-500" />
          ) : (
            <ChevronUp className="ml-1 h-3 w-3 text-slate-500" />
          )}
        </button>

        {expanded && (
          <div className="border-t border-slate-800 px-3 py-2.5 text-[11px] leading-relaxed text-slate-400">
            <p className="mb-1.5 flex items-center gap-1.5 font-medium text-slate-300">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Live, not a claim
            </p>
            <p>
              This monitors every network request made from this page in real time. It's watching for
              anything that carries file-shaped data — not just any request, since loading this page
              itself naturally involves some. If a file ever actually got sent out, this counter would
              change immediately, right here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

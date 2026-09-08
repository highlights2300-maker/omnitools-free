import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOL_CATALOG, RELATED_TOOLS } from "../lib/related-tools";

export default function RelatedTools({ currentTool }) {
  const relatedIds = RELATED_TOOLS[currentTool] || [];
  const tools = relatedIds.map((id) => TOOL_CATALOG[id]).filter(Boolean);

  if (!tools.length) return null;

  return (
    <section className="mt-12 border-t border-slate-900 pt-8">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Related tools</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3.5 transition hover:border-amber-400/30 hover:bg-slate-900"
          >
            <div>
              <p className="text-sm font-semibold text-slate-100">{tool.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{tool.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-amber-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}

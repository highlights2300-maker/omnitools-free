export default function AdSlot({ variant = "banner", className = "" }) {
  const sizeClasses =
    variant === "rail"
      ? "w-full h-[600px]"
      : variant === "banner"
      ? "w-full h-24 md:h-28"
      : "w-full h-40";

  return (
    <div
      className={`${sizeClasses} ${className} flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 text-slate-600`}
      aria-hidden="true"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">Advertisement</span>
      <span className="text-[10px] font-mono text-slate-700">
        {variant === "rail" ? "300 × 600" : variant === "banner" ? "728 × 90" : "336 × 280"}
      </span>
    </div>
  );
}

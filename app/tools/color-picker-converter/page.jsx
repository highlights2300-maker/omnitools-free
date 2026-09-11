import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ColorPickerConverterClient from "./ColorPickerConverterClient";

export const metadata = {
  title: "Free Color Picker & Hex/RGB/HSL Converter Online | QuickZeta",
  description:
    "Pick a color and convert instantly between HEX, RGB, and HSL, free, with no sign up. Edit any format directly — computed entirely in your browser.",
  keywords: [
    "free color picker online",
    "hex to rgb converter no sign up",
    "rgb to hsl converter free",
    "color code converter online",
    "hex color picker tool",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/color-picker-converter" },
  openGraph: {
    title: "Free Color Picker & Hex/RGB/HSL Converter Online",
    description: "Pick a color and convert instantly between HEX, RGB, and HSL, entirely in your browser.",
    url: "https://quickzeta.com/tools/color-picker-converter",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this color picker really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many colors you can convert.",
  },
  {
    q: "What's the actual difference between HEX, RGB, and HSL?",
    a: "HEX is a six-digit code common in CSS and design tools. RGB expresses red, green, and blue intensities from 0–255. HSL describes hue, saturation, and lightness — often more intuitive for adjusting a color's shade without changing its underlying tone.",
  },
  {
    q: "Is my color data sent anywhere?",
    a: "No. Every conversion happens directly in your browser.",
  },
];

export default function ColorPickerConverterPage() {
  return (
    <ToolPageShell
      title="Free Color Picker & Converter"
      subtitle="Pick a color and convert instantly between HEX, RGB, and HSL — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              Three formats, always in sync
            </h2>
            <p className="mt-2">
              Matching a brand color across a design tool and a codebase, or translating a color picked
              from an image into CSS-ready code, is a small but constant need. This tool handles HEX,
              RGB, and HSL conversions instantly — edit any one and the others update automatically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <p className="mt-2">
              Pick a color visually, or type a value directly into the HEX, RGB, or HSL fields — all
              three stay in sync as you edit any one of them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Advantages and limitations</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Advantages</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>All three formats stay in sync automatically</li>
                  <li>Live color swatch preview as you edit</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Limitations</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  <li>No named-color lookup (like "cornflowerblue")</li>
                  <li>No palette generation from a single color</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Developers converting a designer-provided HEX code into the RGB or HSL format their code
              needs, designers checking exactly what color a hex code represents, and anyone matching a
              brand color consistently across different tools and platforms are common reasons to reach
              for a color converter like this one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">HEX, RGB, and HSL explained</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li><strong className="text-slate-200">HEX</strong> — a compact six-digit code, the most common format in CSS and design tools.</li>
              <li><strong className="text-slate-200">RGB</strong> — separate red, green, and blue intensity values, matching how screens mix light to produce color.</li>
              <li><strong className="text-slate-200">HSL</strong> — hue, saturation, and lightness, often more intuitive for adjusting a color's shade.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A genuinely useful HSL trick</h2>
            <p className="mt-2">
              If you need a lighter or darker version of the same brand color — for a hover state or a
              subtle background tint — adjusting only the lightness value in HSL while leaving hue and
              saturation untouched keeps the color family consistent. Doing the same thing in RGB usually
              means recalculating all three channels by hand, which is far more error-prone.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Building a QR code in a specific brand color? The site's{" "}
              <Link href="/tools/qr-code-generator" className="text-amber-400 underline underline-offset-2">
                QR Code Generator
              </Link>{" "}
              is a natural companion.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="color-picker-converter" />
        </>
      }
    >
      <ColorPickerConverterClient />
    </ToolPageShell>
  );
}

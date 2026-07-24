import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
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
    q: "What's the difference between HEX, RGB, and HSL?",
    a: "HEX represents a color as a six-digit code (like #fbbf24) commonly used in web design and CSS. RGB expresses the same color as separate red, green, and blue values from 0–255. HSL describes a color by hue (its position on a color wheel), saturation (how vivid it is), and lightness — often more intuitive for adjusting a color's shade or intensity without changing its underlying hue.",
  },
  {
    q: "Can I type values directly instead of using the color picker?",
    a: "Yes — the HEX field, and the individual RGB and HSL number fields, are all directly editable. Changing any one of them updates all the others to match.",
  },
  {
    q: "Why would I use HSL instead of RGB?",
    a: "HSL makes certain adjustments more intuitive — for example, keeping the hue and saturation the same while only changing lightness to get a lighter or darker version of the same color is straightforward in HSL, but requires recalculating all three RGB values by hand.",
  },
  {
    q: "Is my color data sent anywhere?",
    a: "No. Every conversion happens directly in your browser — nothing is uploaded or logged.",
  },
];

export default function ColorPickerConverterPage() {
  return (
    <ToolPageShell
      title="Free Color Picker & Converter"
      subtitle="Pick a color and convert instantly between HEX, RGB, and HSL — no sign up, nothing uploaded."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A color converter with no sign up required
            </h2>
            <p className="mt-2">
              Whether you're matching a brand color across a design tool and a codebase, converting a
              color picked from an image into CSS-ready code, or just need to translate a color code from
              one format to another, this tool handles HEX, RGB, and HSL conversions instantly — pick a
              color visually, or type a value directly into any of the three formats.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-slate-200">Pick a color.</strong> Use the color picker, or type a
                value directly into the HEX, RGB, or HSL fields.
              </li>
              <li>
                <strong className="text-slate-200">See all formats update live.</strong> Editing any one
                format automatically recalculates the other two.
              </li>
              <li>
                <strong className="text-slate-200">Copy what you need.</strong> Each format has its own
                one-click copy button.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">HEX, RGB, and HSL explained</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-slate-200">HEX</strong> — a compact six-digit code, the most
                common format in CSS and design tools.
              </li>
              <li>
                <strong className="text-slate-200">RGB</strong> — separate red, green, and blue
                intensity values from 0 to 255, matching how screens actually mix light to produce color.
              </li>
              <li>
                <strong className="text-slate-200">HSL</strong> — hue, saturation, and lightness, often
                more intuitive for adjusting a color's shade while keeping its underlying tone consistent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Common uses</h2>
            <p className="mt-2">
              Developers converting a designer-provided HEX code into the RGB or HSL format their code
              needs, designers checking exactly what color a hex code actually represents, and anyone
              matching a brand color consistently across different tools and platforms are some of the
              most common reasons to reach for a color converter like this one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Your colors stay private</h2>
            <p className="mt-2">
              Nothing you enter into this tool is sent anywhere — every conversion happens directly in
              your browser. See our{" "}
              <Link href="/privacy" className="text-amber-400 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">A quick trick with HSL</h2>
            <p className="mt-2">
              One genuinely useful reason to work in HSL rather than RGB: if you need a lighter or darker
              version of the same brand color — say, for a hover state or a subtle background tint —
              simply adjusting the lightness value while leaving hue and saturation untouched keeps the
              color family consistent. Doing the same thing in RGB usually means recalculating all three
              channels by hand, which is far more error-prone.
            </p>
          </section>

          <FaqBlock items={FAQS} />
        </>
      }
    >
      <ColorPickerConverterClient />
    </ToolPageShell>
  );
}

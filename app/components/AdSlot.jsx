"use client";

// Set this to true once your AdSense application is approved and you've
// replaced the <ins> block below with your real ad unit code. Until then,
// this component renders nothing at all — no visible placeholder box, no
// "Advertisement" label — since a page showing empty ad slots during an
// active AdSense review reads as unfinished rather than production-ready.
const ADS_ENABLED = false;

const SIZE_MAP = {
  banner: { width: 728, height: 90 },
  sidebar: { width: 300, height: 600 },
  rail: { width: 300, height: 600 },
  square: { width: 300, height: 250 },
};

export default function AdSlot({ variant = "banner" }) {
  if (!ADS_ENABLED) return null;

  const { width, height } = SIZE_MAP[variant] || SIZE_MAP.banner;

  return (
    <div className="mx-auto flex justify-center" style={{ minHeight: height }}>
      {/*
        Once approved, replace this block with your real AdSense unit, e.g.:

        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width, height }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
        />

        ...and make sure the AdSense script tag is loaded once in your
        root layout (app/layout.js), plus call
        (window.adsbygoogle = window.adsbygoogle || []).push({}); after
        this component mounts.
      */}
    </div>
  );
}

export default function manifest() {
  return {
    name: "QuickZeta — Free Browser-Based Tools",
    short_name: "QuickZeta",
    description:
      "35+ free tools for PDFs, images, and everyday business documents. No uploads, no login, no logs — everything runs on your own device.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#fbbf24",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

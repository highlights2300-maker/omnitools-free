export default function sitemap() {
  const baseUrl = "https://quickzeta.com";
  const now = new Date();

  const pages = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/tools/invoice-generator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/image-compressor", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/pdf-merger", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/pdf-splitter", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/background-remover", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/qr-code-generator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/word-counter", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/image-cropper", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/unit-converter", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/tip-calculator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/gif-maker", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/image-to-pdf", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/percentage-calculator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/age-calculator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/timesheet-calculator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/meme-generator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/photo-collage-maker", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/image-format-converter", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/file-archiver", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/e-signature-pad", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/csv-json-converter", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/pdf-watermarker", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/pdf-compressor", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/video-trimmer", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/audio-converter", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/quote-builder", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/receipt-generator", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/proposal-builder", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/business-card-designer", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

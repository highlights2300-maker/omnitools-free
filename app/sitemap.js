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

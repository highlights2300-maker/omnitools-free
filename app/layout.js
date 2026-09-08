import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import NetworkTrustWidget from "./components/NetworkTrustWidget";

export const metadata = {
  metadataBase: new URL("https://quickzeta.com"),
  title: "QuickZeta — Free Online Tools, No Uploads, No Logins",
  description:
    "41+ free document, image, and business tools that run entirely in your browser. No accounts, no file uploads, no daily limits, no watermarks — everything processes on your own device.",
  keywords: [
    "free online tools",
    "pdf merger",
    "image compressor",
    "invoice generator",
    "background remover",
    "no login tools",
    "client-side tools",
  ],
  openGraph: {
    title: "QuickZeta — Free Online Tools, No Uploads, No Logins",
    description:
      "41+ free document, image, and business tools that run entirely in your browser. Nothing is ever uploaded to a server.",
    url: "https://quickzeta.com",
    siteName: "QuickZeta",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "QuickZeta",
    description: "41+ free tools that run entirely in your browser. No uploads, no logins, no logs.",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbbf24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <ServiceWorkerRegister />
        <NetworkTrustWidget />
      </body>
    </html>
  );
}

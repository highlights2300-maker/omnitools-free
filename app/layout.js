import "./globals.css";

export const metadata = {
  title: "OmniTools Free — Free Online Tools, No Uploads, No Logins",
  description:
    "30+ free document, image, and business tools that run entirely in your browser. No accounts, no file uploads, no daily limits, no watermarks — everything processes on your own device.",
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
    title: "OmniTools Free — Free Online Tools, No Uploads, No Logins",
    description:
      "30+ free document, image, and business tools that run entirely in your browser. Nothing is ever uploaded to a server.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "OmniTools Free",
    description: "30+ free tools that run entirely in your browser. No uploads, no logins, no logs.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

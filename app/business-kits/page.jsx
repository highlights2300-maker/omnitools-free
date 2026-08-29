import { Briefcase } from "lucide-react";
import CategoryHubShell from "../components/CategoryHubShell";

export const metadata = {
  title: "Free Business Templates Online — Invoice, Quote & More | QuickZeta",
  description:
    "Create invoices, quotes, receipts, proposals, contracts, and business cards — all free, with no sign up. Fill in your details and export an instant PDF, right in your browser.",
  keywords: [
    "free business templates online",
    "invoice quote generator no sign up",
    "business card contract template free",
    "freelancer templates no upload",
  ],
  alternates: { canonical: "https://quickzeta.com/business-kits" },
  openGraph: {
    title: "Free Business Templates Online — Invoice, Quote & More",
    description: "Create professional business documents entirely in your browser.",
    url: "https://quickzeta.com/business-kits",
    type: "website",
  },
};

const TOOLS = [
  { name: "Invoice Generator", desc: "Build a professional invoice, print to PDF.", href: "/tools/invoice-generator" },
  { name: "Quote Builder", desc: "Put together a polished price quote.", href: "/tools/quote-builder" },
  { name: "Business Card Designer", desc: "Design a print-ready double-sided card.", href: "/tools/business-card-designer" },
  { name: "Contract Template Kit", desc: "Fill in a simple service agreement.", href: "/tools/contract-template-kit" },
  { name: "Receipt Generator", desc: "Create a simple, printable payment receipt.", href: "/tools/receipt-generator" },
  { name: "Proposal Builder", desc: "Draft a clean project proposal.", href: "/tools/proposal-builder" },
];

export default function BusinessKitsPage() {
  return (
    <CategoryHubShell
      title="Business Kits"
      subtitle="Invoices, quotes, contracts, and business cards — polished documents, built in one sitting."
      icon={Briefcase}
      accentClass="bg-emerald-400/10 text-emerald-400"
      tools={TOOLS}
    >
      <h2 className="text-lg font-semibold text-slate-100">
        Professional documents, without accounting software
      </h2>
      <p>
        Running freelance or small-business work usually means producing the same handful of documents
        again and again: an invoice to get paid, a quote to win the job in the first place, a receipt to
        confirm payment was received, or a simple contract before work even starts. Business Kits covers
        all six of these with tools that fill in like a form and export straight to a polished PDF — no
        accounting software, no subscription, and no account required.
      </p>
      <p>
        Every tool here works the same way: fill in your details and your client's, add whatever
        line items or terms apply, and watch a live preview build itself as you type. When it looks
        right, a single "Print / Save as PDF" button hands the job to your own browser's built-in print
        engine, which assembles the actual PDF locally on your device. Nothing you type — your business
        name, a client's contact details, the amounts you're charging — is ever sent to a server in the
        process, since there's no server step involved at any point.
      </p>
      <p>
        That matters more for this category than most, since these documents often contain information
        you'd genuinely rather not have sitting on someone else's server: client names, pricing,
        signed agreements. Because everything runs locally, there's nothing to leak and nothing left
        behind once you close the tab, beyond whatever PDF you chose to save yourself — the same level
        of privacy you'd expect from filling out a paper form at your own desk, not a cloud-based system.
      </p>
      <p>
        Whether you're sending your first invoice to a new client, quoting a prospective job, or putting
        a simple written agreement in place before starting work, each tool below is built to get you
        from blank form to finished PDF in one sitting — click through to any of them to get started,
        and expect to have a finished document within a few minutes, not an afternoon.
      </p>
    </CategoryHubShell>
  );
}

import StaticPageShell from "../components/StaticPageShell";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact — QuickZeta",
  description: "Get in touch with the team behind QuickZeta.",
};

export default function ContactPage() {
  return (
    <StaticPageShell eyebrow="Get in touch" title="Contact">
      <p>
        Found a bug, have a tool idea, or a question about how something works? We'd like to hear it.
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">Email us</p>
          {/* TODO: replace with your real support address once your domain email is set up */}
          <a href="mailto:highlights2300@gmail.com" className="text-sm text-amber-400 underline underline-offset-2">
            highlights2300@gmail.com
          </a>
        </div>
      </div>

      <p className="text-slate-400">
        We read every message, though as a small, ad-free-of-clutter operation, replies may take a few
        days.
      </p>
    </StaticPageShell>
  );
}

import StaticPageShell from "../components/StaticPageShell";

export const metadata = {
  title: "Terms of Service — OmniTools Free",
  description: "The terms for using OmniTools Free's browser-based tools.",
};

function H2({ children }) {
  return <h2 className="mt-2 text-lg font-semibold text-slate-100">{children}</h2>;
}

export default function TermsPage() {
  return (
    <StaticPageShell eyebrow="Legal" title="Terms of Service">
      <p className="text-slate-400">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <p>
        By using OmniTools Free, you agree to the terms below. If you don't agree, please don't use the
        site.
      </p>

      <H2>The service</H2>
      <p>
        OmniTools Free provides a collection of browser-based tools for working with documents, images,
        and simple business paperwork. Tools run entirely on your own device; we don't provide any
        server-side processing, storage, or account system.
      </p>

      <H2>No warranty</H2>
      <p>
        These tools are provided "as is," free of charge, without warranty of any kind. We make a good
        effort to keep everything working correctly, but we can't guarantee a tool will always produce a
        perfect result for every file, especially unusual or corrupted ones. Always keep your own backup
        of anything important before editing it.
      </p>

      <H2>Your responsibility</H2>
      <p>
        You're responsible for the files and content you process with these tools, and for making sure
        you have the right to use, edit, and distribute them. Templates like the Contract Template Kit
        and Invoice Generator are general starting points, not legal or financial advice — for anything
        with real stakes, have a qualified professional review it.
      </p>

      <H2>Acceptable use</H2>
      <p>
        Please don't use OmniTools Free to create or distribute anything illegal, to infringe on
        someone's rights, or to attempt to disrupt or reverse-engineer the site in a way that harms other
        users.
      </p>

      <H2>Advertising</H2>
      <p>
        This site displays ads served by Google AdSense to keep every tool free. See our{" "}
        <a href="/privacy" className="text-amber-400 underline underline-offset-2">
          Privacy Policy
        </a>{" "}
        for details on how that works.
      </p>

      <H2>Changes</H2>
      <p>
        We may update these terms occasionally. Continuing to use the site after a change means you
        accept the update.
      </p>

      <H2>Contact</H2>
      <p>
        Questions? Visit the{" "}
        <a href="/contact" className="text-amber-400 underline underline-offset-2">
          contact page
        </a>
        .
      </p>
    </StaticPageShell>
  );
}

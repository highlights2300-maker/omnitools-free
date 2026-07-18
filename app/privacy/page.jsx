import StaticPageShell from "../components/StaticPageShell";

export const metadata = {
  title: "Privacy Policy — QuickZeta",
  description:
    "How QuickZeta handles your data: what we don't collect, what our advertising partners do, and your choices.",
};

function H2({ children }) {
  return <h2 className="mt-2 text-lg font-semibold text-slate-100">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <StaticPageShell eyebrow="Legal" title="Privacy Policy">
      <p className="text-slate-400">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <p>
        QuickZeta is built around a simple idea: your files should never leave your device. Every
        tool on this site — the PDF merger, image compressor, invoice generator, and everything else —
        processes your data locally, inside your own browser. We do not operate a server that receives,
        stores, or scans the files, text, or images you work with here.
      </p>

      <H2>What we don't collect</H2>
      <ul className="list-disc space-y-1 pl-5 text-slate-400">
        <li>We don't require an account, so we have no name, email, or password of yours on file.</li>
        <li>We don't upload, store, or view any file you process with a tool on this site.</li>
        <li>We don't run our own analytics that track you individually across visits.</li>
      </ul>

      <H2>Local storage in your browser</H2>
      <p>
        A few features — like pinning favorite tools — save small pieces of information (such as which
        tools you've favorited) directly in your browser's local storage. This data stays on your device
        and is never transmitted to us.
      </p>

      <H2>Advertising</H2>
      <p>
        This site is supported by Google AdSense. To show relevant ads and measure their performance,
        Google and its advertising partners may place cookies in your browser and use device
        identifiers. This is separate from anything QuickZeta itself does — we don't control or
        see the data Google's advertising systems collect. You can learn more about how Google uses
        this information, and adjust your ad personalization settings, at{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className="text-amber-400 underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google's Partner Sites policy
        </a>
        , and manage your preferences at{" "}
        <a
          href="https://adssettings.google.com"
          className="text-amber-400 underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Settings
        </a>
        .
      </p>

      <H2>Cookies</H2>
      <p>
        QuickZeta does not set its own tracking cookies. Cookies you may see in your browser while
        using this site come from our advertising partner (Google) as described above. You can block or
        delete cookies at any time through your browser's settings; doing so will not affect any tool's
        functionality, since none of them depend on cookies to work.
      </p>

      <H2>Third-party libraries loaded from a CDN</H2>
      <p>
        A small number of tools (such as the PDF compressor, background remover, and video/audio tools)
        load an open-source processing library from a public content delivery network the first time
        you use them, so your browser can run that tool. These requests fetch code only — they do not
        send your files anywhere.
      </p>

      <H2>Children's privacy</H2>
      <p>
        QuickZeta is not directed at children under 13, and we do not knowingly collect personal
        information from anyone in that age group.
      </p>

      <H2>Changes to this policy</H2>
      <p>
        If this policy changes, we'll update the date at the top of this page. Continued use of the site
        after a change means you accept the updated policy.
      </p>

      <H2>Contact</H2>
      <p>
        Questions about this policy? Reach out via the{" "}
        <a href="/contact" className="text-amber-400 underline underline-offset-2">
          contact page
        </a>
        .
      </p>
    </StaticPageShell>
  );
}

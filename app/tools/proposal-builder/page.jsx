import Link from "next/link";
import ToolPageShell, { FaqBlock } from "../../components/ToolPageShell";
import RelatedTools from "../../components/RelatedTools";
import ProposalBuilderClient from "./ProposalBuilderClient";

export const metadata = {
  title: "Free Proposal Builder — No Sign Up, Instant PDF | QuickZeta",
  description:
    "Draft a clean project proposal free, with no sign up. Add an overview, scope of work, and pricing, then export an instant PDF — right in your browser.",
  keywords: [
    "free proposal builder no sign up",
    "project proposal template online",
    "create proposal pdf free",
    "proposal generator for freelancers",
    "business proposal maker online",
  ],
  alternates: { canonical: "https://quickzeta.com/tools/proposal-builder" },
  openGraph: {
    title: "Free Proposal Builder — No Sign Up, Instant PDF",
    description: "Draft a clean project proposal and export it as a PDF, entirely in your browser.",
    url: "https://quickzeta.com/tools/proposal-builder",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this proposal builder really free, with no sign up?",
    a: "Yes. There's no account and no limit on how many proposals you can create.",
  },
  {
    q: "How is this different from the Quote Builder?",
    a: "The Quote Builder focuses narrowly on itemized pricing for a straightforward estimate. This tool is meant for a fuller pitch — room to explain the project overview, lay out the scope of work as a list, and describe a timeline — useful when proposing a larger or more involved piece of work.",
  },
  {
    q: "Do you store or see the proposals I create?",
    a: "No. Everything is held in your browser's memory only, and the PDF is generated locally.",
  },
];

export default function ProposalBuilderPage() {
  return (
    <ToolPageShell
      title="Free Proposal Builder"
      subtitle="Draft a clean project proposal and export an instant PDF — no sign up."
      article={
        <>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              A pitch that explains the plan, not just the price
            </h2>
            <p className="mt-2">
              Pitching a project usually needs more than a price — an overview that explains the plan, a
              clear scope of what's included, and a timeline. This tool covers all of that, exporting a
              polished PDF the moment you're ready.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Using it</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Set the title and write the overview.</li>
              <li>List the scope of work as clear bullet points.</li>
              <li>Add pricing and a timeline, then export.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Everything a proposal needs, built in</h2>
            <p className="mt-2">
              A professional invoice needs a handful of specific details to be considered valid and get
              paid without back-and-forth — this tool includes all of them by default: an overview
              section for the pitch, a scope-of-work list for deliverables, itemized pricing, and a
              timeline field, so filling in the form covers the essentials automatically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Who this is built for</h2>
            <p className="mt-2">
              A freelance designer sending a first proposal to a new client, a contractor pitching a
              larger job, or a small team that wants something more substantial than a quick quote — this
              tool is sized for exactly that kind of use: quick to fill in, but with enough structure to
              read as a genuine, considered pitch rather than a rushed price alone.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Specificity is what actually persuades</h2>
            <p className="mt-2">
              A scope-of-work list that names concrete deliverables reads as far more credible than a
              general description like "design and development." Similarly, a realistic, clearly stated
              timeline builds more trust than an open-ended promise. Filling in genuine specifics here,
              rather than generic placeholders, is what actually makes a proposal persuasive — the
              structure alone doesn't do the convincing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-100">Pairs well with</h2>
            <p className="mt-2">
              Once accepted, follow up with a{" "}
              <Link href="/tools/contract-template-kit" className="text-amber-400 underline underline-offset-2">
                Contract
              </Link>{" "}
              before starting, or an{" "}
              <Link href="/tools/invoice-generator" className="text-amber-400 underline underline-offset-2">
                Invoice
              </Link>{" "}
              once the work is complete.
            </p>
          </section>

          <FaqBlock items={FAQS} />
          <RelatedTools currentTool="proposal-builder" />
        </>
      }
    >
      <ProposalBuilderClient />
    </ToolPageShell>
  );
}

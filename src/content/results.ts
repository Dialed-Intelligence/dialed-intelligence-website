import type {
  CaseLabels,
  CaseStudyFull,
  OgCopy,
  PageMeta,
  SectionIntro,
} from "./types";

// DRAFT write-ups. Every detail needs Tyler's confirmation before launch, and
// no metric ships until the client approves it. Add `metric` to surface one.

export const meta: PageMeta = {
  title: "Results",
  description:
    "Systems we have delivered for a skilled-nursing operator, a public-sector organization, and a research consultancy, in problem, build, and result format.",
  canonical: "/results",
};

export const og: OgCopy = {
  eyebrow: "Results",
  title: "Work we have delivered.",
  alt: "Dialed Intelligence results. Work we have delivered.",
};

export const header = {
  eyebrow: "Results",
  title: "Work we have delivered.",
  subhead:
    "Three engagements, written up in the order they happened. What the client was dealing with, what we built, what changed, and what they own now. Client names stay private. Numbers appear once a client approves them.",
};

export const labels: CaseLabels & {
  role: string;
  context: string;
  build: string;
  result: string;
  owns: string;
} = {
  problem: "The problem.",
  system: "What we built.",
  outcome: "The result.",
  more: "Read the write-up",
  role: "Our role",
  context: "The problem",
  build: "What we built",
  result: "The result",
  owns: "What they own",
};

export const cases: CaseStudyFull[] = [
  {
    slug: "skilled-nursing-documentation",
    client: "PE-backed skilled-nursing operator",
    role: "Strategy and engineering",
    problem:
      "Compliance gaps in MDS and PDPM documentation kept surfacing after submission, when they were expensive to fix.",
    system:
      "A documentation system that reads each record and flags the gaps before anything is filed.",
    outcome: "Reviewers catch problems while they are still cheap to correct.",
    context: [
      "Skilled-nursing reimbursement depends on the MDS assessment and the PDPM coding behind it. When documentation is thin or inconsistent, the facility finds out after submission. By then a fix means rework, resubmission, and money at risk.",
      "Reviewers could only check a sample of records by hand, so most gaps surfaced late.",
    ],
    build: [
      "We built a system that reads each record before it is filed and flags missing or inconsistent documentation against MDS and PDPM requirements.",
      "Each flag shows the passage that raised it. A reviewer on the operator's team makes every call.",
    ],
    result: [
      "Reviewers catch problems while they are still cheap to correct. Coverage no longer depends on how many records a person can read in a day.",
    ],
    owns: "The review system, its rules, and the documentation, running in the operator's own environment.",
  },
  {
    slug: "public-sector-data",
    client: "Public-sector data engagement",
    role: "Strategy and engineering",
    problem:
      "Divisions held data that could never be reconciled across the organization.",
    system:
      "A unified data layer that makes every division answerable from one place.",
    outcome: "Leadership works from one set of numbers that every division agrees on.",
    context: [
      "Each division kept its own data in its own systems, with its own definitions. A question that crossed two divisions meant a manual reconciliation, and the answers rarely matched.",
    ],
    build: [
      "We built a unified data layer that pulls every division's sources into one place and reconciles them to shared definitions.",
      "Questions that used to need a cross-division project now run against one model of the organization.",
    ],
    result: [
      "Leadership works from one set of numbers that every division agrees on. New questions start from data that already reconciles.",
    ],
    owns: "The pipelines, the data model, and the documentation, under the organization's accounts.",
  },
  {
    slug: "research-lead-intelligence",
    client: "Research consultancy",
    role: "Strategy and engineering",
    problem:
      "Lead intelligence sat scattered across many sources and got sorted by hand.",
    system:
      "A multi-agent system that pulls those sources together and classifies leads automatically.",
    outcome: "Analysts spend their hours on judgment calls.",
    context: [
      "The firm's pipeline depended on signals spread across many sources. Analysts gathered them by hand, then sorted and scored each lead themselves.",
    ],
    build: [
      "We built a multi-agent system. Agents collect signals from each source, combine them into one record per lead, and classify each lead against the firm's criteria.",
      "Analysts review the classified leads and decide which to pursue.",
    ],
    result: [
      "Analysts spend their time on judgment. Every lead arrives with the evidence behind its score.",
    ],
    owns: "The agents, the application, and the documentation, deployed under the firm's accounts.",
  },
];

/** Home section intro for the case cards. */
export const homeIntro: SectionIntro = {
  eyebrow: "Results",
  title: "Work we have delivered.",
  link: { label: "All write-ups", href: "/results" },
};

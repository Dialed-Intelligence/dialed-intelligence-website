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
    "AI strategy and systems we have delivered for a solar company, a $1.3 billion food company, a consulting firm, and a school, from problem to result.",
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
    "Four engagements. Each one started with finding the right problem, then building the system that solves it. Here is what the client was dealing with, what we built, and what changed. Client names stay private. Numbers appear once a client approves them.",
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
    slug: "solar-ai-strategy-cashflow",
    client: "Solar energy company",
    role: "AI strategy and engineering, end to end",
    problem:
      "Leadership wanted to use AI but had no plan, and cash flow reporting took days of manual work across disconnected systems.",
    system:
      "A company-wide AI strategy and roadmap, then a cash flow automation connecting NetSuite, Smartsheet, and Microsoft Office.",
    outcome:
      "A ranked plan leadership could act on, and cash flow numbers that stay current without anyone rebuilding them.",
    context: [
      "The company was growing, with finance, project management, and field operations each running in their own systems. Leadership knew AI could help but had no clear view of where it would pay back first.",
      "Cash flow was the sharpest pain. Finance pulled numbers by hand from NetSuite, project trackers in Smartsheet, and spreadsheets and email in Microsoft Office. Every forecast meant days of assembly.",
    ],
    build: [
      "We started with strategy. We interviewed leadership and the teams doing the work, mapped where time and money went, and ranked every AI opportunity by cost and payback. Leadership approved a written AI strategy and roadmap.",
      "Cash flow automation ranked first. We connected NetSuite, Smartsheet, Microsoft Office, and the company's other systems so the data moves on its own. Finance now gets a current cash position and forecast without the manual rebuild.",
      "We ran almost the entire engagement, from the first interviews to the system in production.",
    ],
    result: [
      "Leadership has a plan that says what to build, in what order, and why. Finance spends its time deciding what to do about cash, with numbers it no longer has to assemble.",
      "For an owner-led business with tight working capital, that means seeing a cash problem earlier and acting on it sooner.",
    ],
    owns: "The AI roadmap, the cash flow automation, and the documentation for both, under the company's own accounts.",
  },
  {
    slug: "food-company-ai-data-access",
    client: "$1.3 billion food company",
    role: "Engineering",
    problem:
      "Executives and store managers waited on analysts for numbers, and their AI assistants could not see company data.",
    system:
      "Custom MCP connections that let Claude and Microsoft Copilot answer questions from the company's own data.",
    outcome:
      "Leaders from the executive team down to individual stores get live answers and run their own analyses.",
    context: [
      "The company runs many regions and stores. Executives, regional managers, and store managers all needed numbers, and most requests went through a small analytics team.",
      "The team already used Claude and Microsoft Copilot. Those tools could write and summarize, but they could not reach sales, operations, or store data.",
    ],
    build: [
      "We built custom MCP servers for Claude and Copilot. MCP is an open standard that lets AI assistants connect securely to other systems. Ours give each assistant access to company data through a set of approved tools.",
      "Access follows each person's role. An executive sees the whole business, and a store manager sees their own store. Every query is logged.",
    ],
    result: [
      "Executives and managers ask questions in plain language and get answers from live data in minutes. They run their own analyses, from store comparisons to trend checks, without filing a request.",
      "The AI tools the company already paid for now work on its own data. The same setup fits a $10M business with one ERP and a handful of managers.",
    ],
    owns: "The MCP servers, the permission rules, and the documentation, running in the company's environment.",
  },
  {
    slug: "consulting-lead-pipeline",
    client: "Consulting firm",
    role: "Strategy and engineering",
    problem:
      "Finding and answering the right RFPs took hours of searching and writing every week, and good opportunities slipped past.",
    system:
      "One pipeline that finds RFPs, qualifies them, tracks each deal, and drafts the proposal.",
    outcome:
      "The team spends its time on the deals worth winning, starting from a strong first draft.",
    context: [
      "The firm won much of its work through RFPs. Someone had to search many sites, read each posting, decide whether it fit, and then write a proposal from scratch.",
      "Leads lived in inboxes and spreadsheets, so follow-up depended on who remembered.",
    ],
    build: [
      "We worked with the partners to write down what a good-fit deal looks like. Then we built the pipeline around that definition.",
      "The system searches the web for new RFPs, scores each one against the firm's criteria, and moves qualified deals into one tracked pipeline. It drafts a proposal for each deal from the firm's past work and keeps follow-up on schedule. A partner reviews every proposal before it goes out.",
    ],
    result: [
      "Qualified opportunities arrive every day without anyone searching. Proposals start from a draft built on the firm's best past work. The team bids on more of the right deals and less time goes to the wrong ones.",
    ],
    owns: "The pipeline, the qualification rules, the proposal library, and the documentation, under the firm's accounts.",
  },
  {
    slug: "school-data-analysis",
    client: "School",
    role: "System design and engineering",
    problem:
      "The school collected information across forms, spreadsheets, and systems, and no one had time to turn it into answers.",
    system:
      "One system that collects the data in one place and uses AI to analyze it and report what it shows.",
    outcome:
      "Staff get clear findings from data they already collect, without building reports by hand.",
    context: [
      "The school gathered information in many places. Surveys, assessments, and records lived in separate tools, and pulling them together was a manual project every time.",
    ],
    build: [
      "We designed how the data should be collected, so it arrives clean and consistent. Then we built the system that stores it in one place and uses AI to analyze it, summarize written responses, and flag what needs attention.",
      "Staff review the findings and decide what to do with them.",
    ],
    result: [
      "Leadership gets regular findings from data it was already collecting. Decisions rest on evidence instead of on whoever had time to read the spreadsheets.",
    ],
    owns: "The collection process, the analysis system, and the documentation, under the school's accounts.",
  },
];

/** Home section intro for the case cards. */
export const homeIntro: SectionIntro = {
  eyebrow: "Results",
  title: "Work we have delivered.",
  link: { label: "All write-ups", href: "/results" },
};

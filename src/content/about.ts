import type { OgCopy, PageMeta, SectionIntro, TitledText } from "./types";

export const meta: PageMeta = {
  title: "About",
  description:
    "The firm behind Dialed Intelligence. We quantify the problem like an economist, scope it like a banker, and ship it like an engineer.",
  canonical: "/about",
};

export const og: OgCopy = {
  eyebrow: "About",
  title: "Built by people who measure before they build.",
  alt: "About Dialed Intelligence. Built by people who measure before they build.",
};

export const header = {
  eyebrow: "About the firm",
  title: "Built by people who measure before they build.",
};

export const story = {
  label: "Where we come from",
  // Outline section 3.6, the firm's story, verbatim.
  paragraphs: [
    "Dialed Intelligence was founded on a specific frustration. The people best at diagnosing business problems rarely build anything, and the people building software rarely sit with the business problem long enough to understand it. The interesting work, and the real value, lives in the gap.",
    "Our background spans econometrics and causal inference, investment banking, management consulting for research organizations and private equity portfolio companies, and production AI engineering. That combination is the firm's method in miniature. Quantify the problem like an economist, scope it like a banker, and ship it like an engineer.",
    "We build with modern AI where it genuinely helps and with boring, proven methods where those are honestly better. Clients hire us for the judgment to know which is which.",
  ],
};

export const principlesIntro: SectionIntro = {
  eyebrow: "Principles",
  title: "Four principles, applied to every build",
};

// Outline section 3.6, principles, verbatim.
export const principles: TitledText[] = [
  {
    title: "Measurement before machinery.",
    body: "If we cannot quantify the problem, we are not ready to build the system.",
  },
  {
    title: "Deterministic where it counts.",
    body: "AI reads, drafts, and forecasts. Humans and explicit rules decide and spend.",
  },
  {
    title: "Honest scoping.",
    body: "If off-the-shelf software solves your problem, the diagnostic will tell you to buy it.",
  },
  {
    title: "Ownership without asterisks.",
    body: "What we ship is yours, and the contract says so in plain language.",
  },
];

export const firm = {
  eyebrow: "The firm",
  title: "Small by design, deep by necessity.",
  body: "Dialed Intelligence stays deliberately small so the people who diagnose your problem are the people who build the solution. Nothing gets lost in a handoff between a strategy team and a delivery team, because there is no handoff. You work with the firm from the first question to the running system.",
};

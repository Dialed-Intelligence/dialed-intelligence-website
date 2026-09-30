import type { LeadCopy } from "@/components/sections/lead-profile";
import type { OgCopy, PageMeta, SectionIntro, TitledText } from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// About". The lead bio needs Tyler's confirmation.

export const meta: PageMeta = {
  title: "About",
  description:
    "Dialed Intelligence is a fractional AI leadership and engineering firm led by Tyler Dial. Who leads the work, how we work, and how we choose clients.",
  canonical: "/about",
};

export const og: OgCopy = {
  eyebrow: "About",
  title: "A small firm with a senior lead in every seat.",
  alt: "About Dialed Intelligence. A small firm with a senior lead in every seat.",
};

export const header = {
  eyebrow: "About",
  title: "A small firm with a senior lead in every seat.",
};

export const firm = {
  label: "The firm",
  paragraphs: [
    "Dialed Intelligence is a fractional AI leadership and engineering firm based in Chicago. We work with owner-led and PE-backed businesses between $2M and $25M in revenue. They know AI matters, and nobody in house owns it.",
    "We join your team for a defined term, set the AI strategy, build the systems, and hand them to your people. The firm stays small on purpose. The person who writes your plan builds it.",
  ],
};

export const lead: LeadCopy = {
  eyebrow: "The lead",
  title: "The person in the seat.",
  name: "Tyler Dial",
  roleTitle: "Founder and AI lead",
  body: "Tyler founded Dialed Intelligence and leads every engagement, from the first call to handover.",
  backgroundLabel: "Background",
  background: [
    "Econometrics and NBER research",
    "Investment banking",
    "Management consulting",
    "Production AI engineering",
  ],
  photoAlt: "Tyler Dial, founder of Dialed Intelligence",
};

export const leadExtra = [
  "Tyler's work spans econometrics and NBER research, investment banking, management consulting for research organizations and private equity portfolio companies, and production AI engineering. That mix is the method. Measure the problem like an economist, scope it like a banker, and build it like an engineer.",
  "Recent work includes multi-agent systems, unified data platforms, and automation for organizations from research consultancies to PE-backed operators.",
];

export const principlesIntro: SectionIntro = {
  eyebrow: "How we work",
  title: "Four principles behind every Quarter Plan",
};

export const principles: TitledText[] = [
  {
    title: "Measurement before machinery.",
    body: "If we cannot measure the problem, we are not ready to build the system.",
  },
  {
    title: "Deterministic where it counts.",
    body: "AI reads, drafts, and forecasts. People and explicit rules decide and spend.",
  },
  {
    title: "Honest scoping.",
    body: "If off-the-shelf software solves your problem, the discovery project will tell you to buy it.",
  },
  {
    title: "Ownership without asterisks.",
    body: "What we build is yours, and the contract says so in plain language.",
  },
];

// The capacity line stays only while it holds true (Rebrand Spec, open
// decisions).
export const clientsIntro: SectionIntro = {
  eyebrow: "How we choose clients",
  title: "We work with a limited number of clients at a time.",
};

export const clientCriteria: TitledText[] = [
  {
    title: "$2M to $25M in revenue.",
    body: "Large enough for AI to pay off. Small enough that one senior lead changes the trajectory.",
  },
  {
    title: "An executive sponsor.",
    body: "An owner or executive who will sponsor the work and sign the Quarter Plan.",
  },
  {
    title: "A short client list.",
    body: "We keep it short so every client works with the lead directly.",
  },
];

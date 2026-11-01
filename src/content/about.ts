import type { TeamMember } from "@/components/sections/team";
import type { OgCopy, PageMeta, SectionIntro, TitledText } from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// About".

export const meta: PageMeta = {
  title: "About",
  description:
    "Dialed Intelligence is a fractional AI leadership and engineering firm led by Tyler Dial. Who leads the work, how we work, and how we choose clients.",
  canonical: "/about",
};

export const og: OgCopy = {
  eyebrow: "About",
  title: "A small firm with a senior lead in the seat.",
  alt: "About Dialed Intelligence. A small firm with a senior lead in the seat.",
};

export const header = {
  eyebrow: "About",
  title: "A small firm with a senior lead in the seat.",
};

export const firm = {
  label: "The firm",
  paragraphs: [
    "Dialed Intelligence is a fractional AI leadership and engineering firm based in Chicago. We work with owner-led and PE-backed businesses between $2M and $25M in revenue. They know AI matters, and nobody in house owns it.",
    "We join your team for a defined term, set the AI strategy, build the systems, and hand them to your people. The firm stays small on purpose. The person who writes your plan builds it. Clients often call this role a fractional Chief AI Officer.",
  ],
};

// DRAFT. Tyler's title per his request. Michael's title and bio are drafted
// from his role. Add his background list once he confirms it.
export const teamIntro: SectionIntro = {
  eyebrow: "The team",
  title: "The two people you will work with.",
};

export const team: TeamMember[] = [
  {
    name: "Tyler Dial",
    role: "Founder and Senior AI Engineer",
    bio: [
      "Tyler founded Dialed Intelligence and leads the technical work on every engagement. He writes the Quarter Plan and builds the systems in it.",
      "He started in econometrics and NBER research. He then worked in investment banking and in consulting for research organizations and PE-backed companies before moving into production AI engineering.",
    ],
    backgroundLabel: "Background",
    background: [
      "Econometrics and NBER research",
      "Investment banking",
      "Management consulting",
      "Production AI engineering",
    ],
    photoAlt: "Tyler Dial, founder of Dialed Intelligence",
    photo: { src: "/team/tyler-dial.jpg", width: 1314, height: 1400 },
  },
  {
    name: "Michael Jarvis",
    role: "Head of Client Engagement",
    bio: [
      "Michael is your first point of contact and stays on the account through handover. He runs the discovery interviews with each department and keeps the Quarter Plan on schedule.",
      "He also runs the monthly scorecard review with your leadership team. You see what shipped and what it is worth.",
    ],
    photoAlt: "Michael Jarvis, Head of Client Engagement at Dialed Intelligence",
    photo: { src: "/team/michael-jarvis.jpg", width: 1400, height: 1400 },
  },
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

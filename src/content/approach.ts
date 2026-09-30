import type { Stage, StageLabels } from "@/components/sections/stage-block";
import type { OgCopy, PageMeta } from "./types";

export const meta: PageMeta = {
  title: "How We Work",
  description:
    "Four bounded stages. A free working session, a fixed-fee diagnostic, a fixed-price build in three to eight weeks, and a handover where you own everything.",
  canonical: "/approach",
};

export const og: OgCopy = {
  eyebrow: "How we work",
  title: "A process designed so you can stop at any point and still be glad you started.",
  alt: "How Dialed Intelligence works. A process designed so you can stop at any point and still be glad you started.",
};

export const header = {
  eyebrow: "How we work",
  aside: "Four stages, in depth",
  title:
    "A process designed so you can stop at any point and still be glad you started.",
  subhead:
    "Every stage is bounded, ends with something you keep, and never commits you to the next one. Here is exactly what happens between the first hour and the day we hand over the keys.",
};

export const stageLabels: StageLabels = {
  stage: "Stage",
  of: "of",
  whatHappens: "What happens",
  walkAway: "You walk away with",
  duration: "How long it takes",
  darkTag: "Build it. You own it.",
};

// Stage bodies are outline copy, section 3.5, verbatim.
export const stages: Stage[] = [
  {
    n: "01",
    name: "The Working Session",
    body: "One hour, free, and not a sales call. We sit with you and find the single question worth the most to answer in your business. We ask the questions your last vendor did not. You leave with at least one observation worth having, whether or not we ever speak again. If we do not think we can help, we will say so in the room.",
    walkAway: "At least one observation worth having",
    duration: "One hour, free",
  },
  {
    n: "02",
    name: "The Diagnostic",
    body: "A short fixed-fee engagement, typically one to two weeks. We get into your systems and your numbers and produce a decision-ready plan. The problem mapped and quantified in dollars and hours. The proposed system described in plain terms. A fixed build price, a timeline, and the expected return. The fee is fully credited against the build if you proceed within sixty days, so the diagnostic costs nothing for clients who move forward. If the honest answer is that you should buy something off the shelf instead, the plan will say so.",
    walkAway: "A costed, decision-ready plan",
    duration: "One to two weeks, fee fully credited against the build within sixty days",
  },
  {
    n: "03",
    name: "The Build",
    body: "Fixed price, fixed scope, typically three to eight weeks depending on the system. You see working software early, not a reveal at the end. Larger builds are phased so each phase delivers something usable and each phase is priced before it starts.",
    walkAway: "Working software early, something usable at the end of every phase",
    duration: "Three to eight weeks, fixed price and fixed scope",
  },
  {
    n: "04",
    name: "Handover and Support",
    body: "You receive the system, the source code, the documentation, and a complete walkthrough. Every build includes a support window so the first weeks of real use are covered. After that, support is optional. A light tier keeps the system healthy with guaranteed response times. A heavier tier evolves it as your business changes. Both are services tied to your asset. Neither is a license, and you can leave either whenever you want.",
    walkAway: "The system, the source code, the documentation, and a complete walkthrough",
    duration: "A support window with every build, optional tiers after that",
  },
];

export const notIntro = { eyebrow: "For the record", title: "What we are not" };

// "What we are not" statements are outline copy, section 3.5, verbatim.
export const notStatements = [
  {
    opener: "We are not a staffing agency.",
    rest: "You are not renting hours, you are buying a result at a fixed price.",
  },
  {
    opener: "We are not a software vendor.",
    rest: "Nothing we deliver carries a recurring license, ever.",
  },
  {
    opener: "We are not a typical consultancy.",
    rest: "The engagement does not end with a recommendation. It ends with the recommendation running in production.",
  },
];

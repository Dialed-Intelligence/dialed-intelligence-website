import type { HeroCopy } from "@/components/sections/hero";
import type { LeadCopy } from "@/components/sections/lead-profile";
import type { QuarterPlanCopy } from "@/components/sections/quarter-plan";
import type { OgCopy, SectionIntro, TitledText } from "./types";
import { ctaEvent, ctaHref, ctaLabel } from "./site";

// Home copy follows the Rebrand Spec, "Homepage spec" section.

export const og: OgCopy = {
  eyebrow: "Fractional AI leadership and engineering",
  title: "Senior AI leadership, without the full-time hire.",
  alt: "Dialed Intelligence. Senior AI leadership, without the full-time hire.",
};

export const hero: HeroCopy = {
  eyebrow: "Fractional AI leadership and engineering",
  title: "Senior AI leadership,",
  titleEmphasis: "without the full-time hire.",
  subhead:
    "Dialed Intelligence places a fractional AI lead inside businesses doing $2M to $25M a year. We set the strategy, build the systems, and train your team to run them. Every quarter starts with a written plan of what we will deliver.",
  primaryCta: { label: ctaLabel, href: ctaHref, event: ctaEvent },
  secondaryLink: { label: "See how it works", href: "/how-it-works" },
  proofPoints: [
    "A written plan for every quarter",
    "Working systems in the first 90 days",
    "You own everything we build",
  ],
};

export const marquee = [
  "AI STRATEGY",
  "OPERATIONS AUTOMATION",
  "UNIFIED DATA",
  "AI AGENTS",
  "DEMAND FORECASTING",
  "PRICING",
  "TEAM TRAINING",
  "AI POLICY",
];

export const problem: { intro: SectionIntro; items: TitledText[] } = {
  intro: {
    eyebrow: "The problem",
    title:
      "You need someone to own AI. You probably do not need them full time.",
  },
  items: [
    {
      title: "Hire full time.",
      body: "A senior AI leader costs well into six figures and takes months to find. Most can set strategy or write production code. Few do both.",
    },
    {
      title: "Hire a consultancy.",
      body: "You get a thorough assessment and a roadmap. Then your team has to build it on top of their day jobs.",
    },
    {
      title: "Buy more software.",
      body: "Each tool solves one slice. Nobody connects them to how your business runs.",
    },
    {
      title: "Bring on a fractional AI lead.",
      body: "We join your team for a defined term, own the roadmap, build the systems, and hand them to your people. You get senior judgment and hands-on engineering at a cost that fits a business your size.",
    },
  ],
};

export const role: { intro: SectionIntro; items: TitledText[] } = {
  intro: {
    eyebrow: "What the role covers",
    title: "One role covers strategy, engineering, and your team.",
    link: { label: "What we deliver", href: "/services" },
  },
  items: [
    {
      title: "Strategy.",
      body: "We pick the few AI projects worth doing and rank them by return. We advise on tools, vendors, data, and risk, and we report to leadership.",
    },
    {
      title: "Engineering.",
      body: "We build and ship the systems. Operations automation, unified data, AI agents, forecasting, and pricing. Production code, tested and documented.",
    },
    {
      title: "Your team.",
      body: "We train the people who will run the systems, write the playbooks, and set the rules for how your company uses AI.",
    },
  ],
};

export const quarterPlan: {
  eyebrow: string;
  title: string;
  body: string;
  link: { label: string; href: string };
  exhibit: QuarterPlanCopy;
} = {
  eyebrow: "The Quarter Plan",
  title: "Every quarter starts with a written plan.",
  body: "Before the engagement begins, we agree on a Quarter Plan. It names what we will deliver, how we will measure it, and what we need from your team. We review progress against it with you every month.",
  link: { label: "Anatomy of a Quarter Plan", href: "/how-it-works#quarter-plan" },
  exhibit: {
    stamp: "Example",
    docTitle: "Quarter Plan",
    client: "Regional distributor",
    period: "Quarter one",
    monthLabel: "Month",
    deliverablesLabel: "Deliverables",
    months: [
      "Operations and data review. First automation live in order entry. Company AI policy approved.",
      "Sales and inventory data unified in one place. Weekly leadership report running.",
      "Reorder forecasting in production. Team trained on both systems. Next quarter planned.",
    ],
    measuresLabel: "Scorecard",
    measures: [
      "Order entry time per order",
      "Forecast accuracy on top products",
      "Team adoption of both systems",
    ],
    needsLabel: "What we need from you",
    needs: [
      "An executive sponsor",
      "One point person in operations",
      "Access to the ERP and sales data",
    ],
    reviewLabel: "Review",
    review: "Scorecard reviewed with leadership every month",
    caption:
      "An example for illustration. Every Quarter Plan is written for the business in front of us.",
  },
};

export const path: SectionIntro = {
  eyebrow: "How it works",
  title: "From first call to handover",
  link: { label: "How it works in full", href: "/how-it-works" },
};

export const lead: LeadCopy = {
  eyebrow: "Who you get",
  title: "A senior lead, in the seat.",
  name: "Tyler Dial",
  roleTitle: "Founder and AI lead",
  body: "Tyler leads every engagement. The person on your first call writes your Quarter Plan and builds the systems in it.",
  backgroundLabel: "Background",
  background: [
    "Econometrics and NBER research",
    "Investment banking",
    "Management consulting",
    "Production AI engineering",
  ],
  link: { label: "More about the firm", href: "/about" },
  photoAlt: "Tyler Dial, founder of Dialed Intelligence",
};

export const faqIntro: SectionIntro = {
  eyebrow: "Questions",
  title: "What owners ask first",
  link: { label: "All questions", href: "/how-it-works#faq" },
};

/** Three questions from the full list on How it works. */
export const faqQuestions = [
  "Do you bill by the hour?",
  "How long do engagements last?",
  "What happens when it ends?",
];

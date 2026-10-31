import type { HeroCopy } from "@/components/sections/hero";
import type { SaleValueCopy } from "@/components/sections/sale-value";
import type { TwoJobsCopy } from "@/components/sections/two-jobs";
import type { OgCopy, SectionIntro, Step, TitledText } from "./types";
import { ctaEvent, ctaHref, ctaLabel } from "./site";

// Home copy follows the Rebrand Spec, "Homepage spec" section.
// The home page earns the call. Detail lives on How it works and What we
// deliver, so each section here answers one question a skimming owner asks.

export const og: OgCopy = {
  eyebrow: "Fractional AI leadership and engineering",
  title: "Senior AI leadership, without the full-time hire.",
  alt: "Dialed Intelligence. Senior AI leadership, without the full-time hire.",
};

/** Is this for a business like mine? */
export const hero: HeroCopy = {
  eyebrow: "Fractional AI leadership and engineering",
  title: "Senior AI leadership,",
  titleEmphasis: "without the full-time hire.",
  subhead:
    "We work inside businesses doing $2M to $25M a year. We find the AI projects that will pay for themselves and put a number on each one. Then we build them, and your team runs them after we leave.",
  primaryCta: { label: ctaLabel, href: ctaHref, event: ctaEvent },
  secondaryLink: { label: "See how it works", href: "/how-it-works" },
  proofPoints: [
    "A cost and payback date for every project",
    "Working systems in the first 90 days",
    "You own everything we build",
  ],
};

/** Why can't I do this on my own? */
export const problem: { intro: SectionIntro; items: TitledText[] } = {
  intro: {
    eyebrow: "The problem",
    title: "You know AI matters. You do not know where it pays.",
    link: { label: "Compare your options", href: "/how-it-works#compare" },
  },
  items: [
    {
      title: "Every vendor sells an AI feature.",
      body: "Few can tell you what it returns. Most owners end up paying for tools nobody uses.",
    },
    {
      title: "A full-time AI hire is a big bet.",
      body: "You commit a senior salary and months of recruiting before you know which projects are worth doing.",
    },
    {
      title: "Consultants hand you a deck.",
      body: "Then your team has to build it alone. Most plans stall at that handoff.",
    },
  ],
};

/** What do I get? */
export const twoJobs: TwoJobsCopy = {
  eyebrow: "What we do",
  title: "We decide what is worth building. Then we build it.",
  jobs: [
    {
      label: "Decide",
      title: "A plan your leadership team can fund.",
      items: [
        "Interviews with the leads who run each part of the business",
        "A 6 to 12 month roadmap with a cost and return for every project",
        "A short list of projects to skip, with the reasons",
      ],
    },
    {
      label: "Build",
      title: "Systems in production, run by your people.",
      items: [
        "Automation for the repetitive work between your systems",
        "Forecasting and pricing models your leadership uses every week",
        "Documentation and training so your team runs it after we leave",
      ],
    },
  ],
  footnote:
    "When one firm plans and another builds, the plan gets lost in the handoff. The person who sizes your project is the person who ships it.",
  link: { label: "What we deliver", href: "/services" },
};

/** What happens next? */
export const howItStarts: { intro: SectionIntro; steps: Step[] } = {
  intro: {
    eyebrow: "How it starts",
    title: "From first call to working systems",
    link: { label: "How it works in full", href: "/how-it-works" },
  },
  steps: [
    {
      title: "Discovery call",
      duration: "45 minutes, free",
      body: "We learn how the business runs. You leave knowing where AI could pay off, whether or not we work together.",
    },
    {
      title: "A written plan",
      duration: "One to two weeks",
      body: "We size each opportunity by cost and payback. Then we write your first Quarter Plan.",
    },
    {
      title: "Build and hand over",
      duration: "One quarter at a time",
      body: "We build to the plan and review the scorecard with you every month. Code, data, and accounts stay in your name.",
    },
  ],
};

/** For owners planning a sale. */
export const sale: SaleValueCopy = {
  eyebrow: "Planning a sale",
  title: "Savings that show up in your sale price.",
  body: [
    "Buyers price a business on a multiple of its earnings. A system that takes $100K a year of cost out can add several times that to the sale price. We record the baseline and the result, so the gain holds up in diligence.",
  ],
  finePrint:
    "Multiples vary by industry, size, and buyer. We model a range and show our assumptions. We do not promise a sale price.",
  link: {
    label: "Read the PE-backed operator write-up",
    href: "/results#skilled-nursing-documentation",
  },
  figure: {
    label: "An illustration",
    lines: [
      { label: "Cost taken out each year", value: "$100K" },
      { label: "Earnings multiple", value: "6 to 8 times" },
    ],
    totalLabel: "Added to the sale price",
    total: "$600K to $800K",
  },
};

export const faqIntro: SectionIntro = {
  eyebrow: "Questions",
  title: "What owners ask first",
  link: { label: "All questions", href: "/how-it-works#faq" },
};

/** Three questions from the full list on How it works. */
export const faqQuestions = [
  "Should we hire a full-time AI lead instead?",
  "Can we hire you for the strategy only?",
  "How long do engagements last?",
];

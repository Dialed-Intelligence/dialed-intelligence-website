import type { HeroCopy } from "@/components/sections/hero";
import type { QuarterPlanCopy } from "@/components/sections/quarter-plan";
import type { ComparisonCopy } from "@/components/sections/comparison";
import type { OpportunityModelCopy } from "@/components/sections/opportunity-model";
import type { SaleValueCopy } from "@/components/sections/sale-value";
import type { TwoJobsCopy } from "@/components/sections/two-jobs";
import type { OgCopy, SectionIntro } from "./types";
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
    "We work inside businesses doing $2M to $25M a year. We find the AI projects that will pay for themselves and put a number on each one. Then we build them, and your team runs them after we leave.",
  primaryCta: { label: ctaLabel, href: ctaHref, event: ctaEvent },
  secondaryLink: { label: "See how it works", href: "/how-it-works" },
  proofPoints: [
    "A cost and payback date for every project",
    "Working systems in the first 90 days",
    "You own everything we build",
  ],
};

export const marquee = [
  "AI STRATEGY",
  "AI ROADMAPS",
  "ROI MODELS",
  "OPERATIONS AUTOMATION",
  "UNIFIED DATA",
  "AI AGENTS",
  "DEMAND FORECASTING",
  "TEAM TRAINING",
  "AI POLICY",
];

export const comparison: ComparisonCopy = {
  intro: {
    eyebrow: "The problem",
    title:
      "You need someone to own AI. You probably do not need them full time.",
  },
  rowLabel: "Compare",
  options: [
    "Full-time hire",
    "Consultancy",
    "More software",
    "Dialed Intelligence",
  ],
  rows: [
    {
      label: "Sets the AI strategy",
      cells: ["If you find the right person", "Yes", "No", "Yes"],
    },
    {
      label: "Builds the systems",
      cells: ["Sometimes", "Your team does", "One slice each", "Yes"],
    },
    {
      label: "Puts a return on each project",
      cells: ["Rarely", "Sometimes", "No", "Every project"],
    },
    {
      label: "Time to start",
      cells: ["Months to hire", "A few weeks", "Days", "Two weeks of discovery"],
    },
    {
      label: "What you commit to",
      cells: [
        "Salary, benefits, and a recruiting fee",
        "A project fee",
        "A seat license, every year",
        "One quarter at a time",
      ],
    },
    {
      label: "Who runs it afterward",
      cells: ["The hire", "Your team, untrained", "The vendor", "Your team, trained"],
    },
  ],
};

export const twoJobs: TwoJobsCopy = {
  eyebrow: "What we do",
  title: "We decide what is worth building. Then we build it.",
  jobs: [
    {
      label: "Decide",
      title: "A plan your leadership team can fund.",
      items: [
        "Interviews with operations, sales, finance, and the rest of your leads",
        "A map of where time and margin go today",
        "A 6 to 12 month AI roadmap, in order",
        "A cost and return model for every project",
        "A short list of projects to skip, with the reasons",
        "Rules for how your company uses AI, and who owns each system",
      ],
    },
    {
      label: "Build",
      title: "Systems in production, run by your people.",
      items: [
        "Automation for the repetitive work between your systems",
        "One source of truth for sales, operations, and finance data",
        "AI agents for defined tasks, with a person approving exceptions",
        "Forecasting and pricing models",
        "Tests, monitoring, and documentation",
        "Training for the people who take over",
      ],
    },
  ],
  footnote:
    "When one firm plans and another builds, the plan gets lost in the handoff. The person who sizes your project is the person who ships it.",
  link: { label: "What we deliver", href: "/services" },
};

export const opportunity: {
  eyebrow: string;
  title: string;
  body: string[];
  exhibit: OpportunityModelCopy;
} = {
  eyebrow: "How we choose projects",
  title: "Every project has to pay for itself on paper first.",
  body: [
    "Before we build anything, we model what it costs to build and run, what it saves or earns, and how long it takes to pay back. Leadership funds the projects that clear the bar. The rest go on a list of things not to buy, with the reasons.",
    "Most of the return is capacity. Your team handles more orders, more leads, and more customers without a new hire for every step up in revenue.",
  ],
  exhibit: {
    stamp: "Example",
    docTitle: "Opportunity Model",
    client: "Regional distributor",
    period: "Discovery project",
    columns: {
      project: "Project",
      annualReturn: "Annual return",
      payback: "Payback",
      call: "Call",
    },
    rows: [
      {
        project: "Order entry automation",
        annualReturn: "1,100 staff hours",
        payback: "4 months",
        call: "build",
      },
      {
        project: "Reorder forecasting, top 200 products",
        annualReturn: "Fewer stockouts and less dead stock",
        payback: "7 months",
        call: "build",
      },
      {
        project: "Call summaries for the sales team",
        annualReturn: "300 staff hours",
        payback: "2 months",
        call: "buy",
      },
      {
        project: "Website chatbot",
        annualReturn: "No measurable return",
        payback: "Not modeled",
        call: "skip",
      },
    ],
    callLabels: { build: "Build", buy: "Buy off the shelf", skip: "Skip" },
    caption:
      "An example for illustration. Every model is built from your numbers.",
  },
};

export const sale: SaleValueCopy = {
  eyebrow: "Planning a sale",
  title: "Savings that show up in your sale price.",
  body: [
    "Buyers usually price a business on a multiple of its earnings. A system that takes $100K a year of cost out of the business can add several times that to what a buyer will pay. We record the baseline and the result for every system, so the gain holds up in diligence.",
    "It works best when the sale is at least six to nine months out. That leaves time to build the system, run it, and prove the result.",
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

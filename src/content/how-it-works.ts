import type { Stage, StageLabels } from "@/components/sections/stage-block";
import type { ComparisonCopy } from "@/components/sections/comparison";
import type { OpportunityModelCopy } from "@/components/sections/opportunity-model";
import type { QuarterPlanCopy } from "@/components/sections/quarter-plan";
import type { OgCopy, PageMeta, SectionIntro, TitledText } from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// How it works". Step names and durations match the home path.

export const meta: PageMeta = {
  title: "How it works",
  description:
    "The path from a free 45-minute call to systems in production. What each step delivers, what we need from you, and how we keep it running.",
  canonical: "/how-it-works",
};

export const og: OgCopy = {
  eyebrow: "How it works",
  title: "A defined path from the first call to working systems.",
  alt: "How a Dialed Intelligence engagement works, from the first call to working systems.",
};

export const header = {
  eyebrow: "How it works",
  aside: "Five steps, one plan per quarter",
  title:
    "A defined path from the first call to systems that pay for themselves.",
  subhead:
    "Every step ends with something you keep, and you can stop after any of them. Here is what each one delivers and what we need from you.",
};

export const stageLabels: StageLabels = {
  stage: "Step",
  of: "of",
  whatHappens: "What happens",
  walkAway: "What you get",
  duration: "How long it takes",
  needs: "What we need from you",
  darkTag: "We keep it running.",
};

export const stages: Stage[] = [
  {
    n: "01",
    name: "Discovery call",
    body: "A conversation with the lead who would do the work. We learn how the business runs, where the time and margin go, and where AI could pay off. If we are not the right fit, we say so on the call.",
    walkAway: "At least one useful observation, whether or not we work together",
    duration: "45 minutes, free",
    needs: "Someone who knows how the business runs",
  },
  {
    n: "02",
    name: "Discovery project",
    body: "We review your operations, data, and systems with the people who run them. We size each opportunity by what it would return and what it would take to build. Then we draft your first Quarter Plan and set the monthly fee in writing.",
    walkAway: "A sized list of opportunities and a draft Quarter Plan, yours to keep",
    duration: "One to two weeks, fixed fee",
    needs: "Time with your leads and read access to the key systems",
  },
  {
    n: "03",
    name: "First quarter",
    body: "We join your team and work to the plan. Systems go into production as the plan calls for them, starting in the first month. We review the scorecard with leadership every month and change the plan in writing when the business changes.",
    walkAway: "Working systems, a monthly scorecard, and a plan for the next quarter",
    duration: "Three months, billed monthly",
    needs: "A sponsor, a point person, and the access you would give a senior hire",
  },
  {
    n: "04",
    name: "Second term",
    body: "Optional. We scale what worked in the first quarter and build the systems that needed its data. We train the people who use each system every day.",
    walkAway: "More systems in production, and a team trained to use them",
    duration: "Up to three months, optional",
    needs: "The people who use each system day to day",
  },
  {
    n: "05",
    name: "Ongoing support",
    body: "We monitor every system, fix what breaks, and update it when your data, tools, or AI models change. Each month we review what the systems return and tune the ones that can do better. You never need an engineering team to keep them running.",
    walkAway: "Systems that keep working, and a monthly report on what they return",
    duration: "Optional, ongoing",
    needs: "A point person who tells us when the business changes",
  },
];

export const anatomy: { intro: SectionIntro; body: string; items: TitledText[] } = {
  intro: {
    eyebrow: "Anatomy of a Quarter Plan",
    title: "One short document sets the quarter.",
  },
  body: "Leadership signs the Quarter Plan before the quarter starts. It fits on a few pages, and every change to it happens in writing.",
  items: [
    {
      title: "Deliverables.",
      body: "The systems, documents, and training we will ship, month by month.",
    },
    {
      title: "Success measures.",
      body: "The numbers we aim to move and how we will measure them, agreed before work starts.",
    },
    {
      title: "The monthly review.",
      body: "A scorecard meeting with leadership. What shipped, what moved, and what changes next month.",
    },
    {
      title: "Access we need.",
      body: "The systems, data, and people the plan depends on, listed up front so nothing stalls mid-quarter.",
    },
    {
      title: "Who does what.",
      body: "Your sponsor, your point person, and the person on your team who uses each system day to day.",
    },
  ],
};

export const standards: { intro: SectionIntro; items: TitledText[] } = {
  intro: {
    eyebrow: "What you can expect from us",
    title: "Service standards, in writing.",
  },
  items: [
    {
      title: "A standing weekly working session.",
      body: "The same slot every week, with the people doing the work.",
    },
    {
      title: "A monthly scorecard review.",
      body: "Progress against the Quarter Plan, reviewed with leadership.",
    },
    {
      title: "Replies within one business day.",
      body: "Every question gets an answer by the next business day.",
    },
    {
      title: "A seat where AI decisions get made.",
      body: "We join the leadership meeting you choose.",
    },
  ],
};

export const needs = {
  eyebrow: "What we need from you",
  title:
    "An executive sponsor, one point person, and the access you would give a senior hire.",
  body: "The sponsor sets priorities and signs the Quarter Plan. The point person keeps the work moving day to day. Access means the systems, data, and meetings the plan depends on, from the first week.",
};

export const exit = {
  label: "Renewal and support",
  paragraphs: [
    "Near the end of the first quarter, we review the scorecard together and decide on a second term. A second term runs up to three months. Its job is to scale what worked and build what the first quarter's data made possible.",
    "Most builds finish in three to six months. After that, most clients keep us on for ongoing support. We monitor each system, fix what breaks, and tune it against the scorecard.",
    "If you would rather run the systems yourselves, we train your team and hand over the documentation instead. Either way, the code, data, and accounts stay in your name.",
  ],
};

export const faqIntro: SectionIntro = {
  eyebrow: "Questions",
  title: "What owners and CFOs ask before signing",
};

export const comparison: ComparisonCopy = {
  intro: {
    eyebrow: "Compare your options",
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
      label: "Who keeps it running",
      cells: ["The hire", "Your team, on its own", "The vendor", "We do, with your team"],
    },
  ],
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
    "Before we build anything, we model the cost to build and run it. Then we model what it saves or earns and when it pays back. Leadership funds the projects that clear the bar. The rest go on a list of things not to buy, with the reasons.",
    "Most of the return is capacity. Your team handles more orders without adding a hire each time revenue steps up.",
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

/** Sample Quarter Plan shown beside the anatomy. */
export const quarterPlanExhibit: QuarterPlanCopy = {
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
};

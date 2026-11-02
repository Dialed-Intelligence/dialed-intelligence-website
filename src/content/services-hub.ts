import type {
  DeliverableGroup,
  OgCopy,
  PageMeta,
  SectionIntro,
  Step,
} from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// What we deliver". This page carries the detailed deliverables and the
// engagement steps that the home page summarizes.

export const meta: PageMeta = {
  title: "What we deliver",
  description:
    "What a fractional AI lead delivers across strategy, engineering, and your team, how an engagement runs, and the seven systems we build most often.",
  canonical: "/services",
};

export const og: OgCopy = {
  eyebrow: "What we deliver",
  title: "Strategy, engineering, and systems we keep running.",
  alt: "What Dialed Intelligence delivers. Strategy, engineering, and systems we keep running.",
};

export const header = {
  eyebrow: "What we deliver",
  title: "One role. Strategy, engineering, and systems we keep running.",
  intro:
    "Clients often call this role a fractional Chief AI Officer. We cover that seat and the engineering behind it. Here is what the role delivers, how an engagement runs, and the systems we build most often.",
};

export const groups: DeliverableGroup[] = [
  {
    id: "strategy",
    title: "Strategy",
    summary:
      "We find the places in your business where AI pays back its cost, and we put it in writing.",
    items: [
      "Interviews with operations, sales, finance, and the rest of your leads",
      "A map of where time and margin go today",
      "An Opportunity Model with a cost and payback for every project",
      "A 6 to 12 month AI roadmap, in order",
      "A short list of projects to skip, with the reasons",
      "Build or buy calls on tools and vendors",
      "A data readiness review of your core systems",
      "A written Quarter Plan with deliverables and success measures",
      "Rules for how your company uses AI, and who is responsible for each system",
      "A monthly scorecard review with leadership",
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    summary:
      "We build the systems the plan calls for and put them into production.",
    items: [
      "Automation for the repetitive work between your systems",
      "One source of truth for sales, operations, and finance data",
      "Dashboards and AI assistants connected to your own data",
      "AI agents for defined tasks, with a person approving exceptions",
      "Forecasting, reorder, quoting, and pricing models",
      "Tests, monitoring, and documentation for every system",
    ],
  },
  {
    id: "your-team",
    title: "Support",
    summary:
      "We keep every system working and make sure your people use it well.",
    items: [
      "Monitoring and alerts on every system we build",
      "Fixes and updates when your data, tools, or AI models change",
      "Monthly tuning against the scorecard",
      "Training for the people who use each system",
      "A company AI use policy, written and approved",
      "AI training for leadership and staff",
    ],
  },
];

export const engagementSteps: { intro: SectionIntro; steps: Step[] } = {
  intro: {
    eyebrow: "How an engagement runs",
    title: "Five steps, with something useful at every one",
    link: { label: "How it works in full", href: "/how-it-works" },
  },
  steps: [
    {
      title: "Discovery call",
      duration: "45 minutes, free",
      body: "We learn how the business runs and where the time and margin go. You leave with at least one useful observation, whether or not we work together.",
    },
    {
      title: "Discovery project",
      duration: "One to two weeks, fixed fee",
      body: "We interview your leads and review your systems and data. You keep the Opportunity Model, the data readiness review, and a draft Quarter Plan.",
    },
    {
      title: "First quarter",
      duration: "Three months, billed monthly",
      body: "We build to the plan. The first system goes into production in the first or second month, and leadership reviews the scorecard with us every month.",
    },
    {
      title: "Second term",
      duration: "Up to three months, optional",
      body: "We extend what worked, build the systems that needed the first quarter's data, and train the people who use each one.",
    },
    {
      title: "Ongoing support",
      duration: "Optional, ongoing",
      body: "We monitor every system, fix what breaks, and report what each one returns every month. No engineering team needed on your side.",
    },
  ],
};

export const systems: SectionIntro = {
  eyebrow: "Systems we build most often",
  title: "Usually built in the first two quarters",
};

/** Prefix for the build time shown under each system. */
export const systemBuildPrefix = "Typical build";

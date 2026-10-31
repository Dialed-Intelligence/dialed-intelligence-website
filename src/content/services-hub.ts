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
  title: "Strategy, engineering, and a team that can run what we build.",
  alt: "What Dialed Intelligence delivers. Strategy, engineering, and a team that can run what we build.",
};

export const header = {
  eyebrow: "What we deliver",
  title: "One role. Strategy, engineering, and a team that can run what we build.",
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
      "Rules for how your company uses AI, and who owns each system",
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
    title: "Your team",
    summary:
      "We make sure the people who stay can run what we build.",
    items: [
      "Training for the people who will run each system",
      "Playbooks for daily operation and common failures",
      "A company AI use policy, written and approved",
      "AI training for leadership and staff",
      "A handover plan with a named owner for each system",
    ],
  },
];

export const engagementSteps: { intro: SectionIntro; steps: Step[] } = {
  intro: {
    eyebrow: "How an engagement runs",
    title: "Five steps, and you keep something at every one",
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
      body: "We extend what worked, build the systems that needed the first quarter's data, and move each one to the person who will own it.",
    },
    {
      title: "Handover",
      duration: "Yours to run",
      body: "Your team runs every system with documentation, playbooks, and training. Light support stays available if you want it.",
    },
  ],
};

export const systems: SectionIntro = {
  eyebrow: "Systems we build most often",
  title: "Usually built in the first two quarters",
};

/** Prefix for the build time shown under each system. */
export const systemBuildPrefix = "Typical build";

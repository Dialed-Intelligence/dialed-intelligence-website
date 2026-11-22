import type { OgCopy, PageMeta } from "./types";

/**
 * AI payoff check. Five questions, all copy, points and payoff figures live
 * here. The scoring module (src/lib/readiness.ts) reads the points, the
 * client renders the copy, and /api/ai-readiness validates submissions
 * against the same option ids, so the three can never drift apart.
 *
 * The questions are written for the visitor. Four of them make the payoff
 * concrete (what they would hand off, how much time, what they would do
 * with it, when). The last one, revenue, is the only pure qualifier.
 *
 * DRAFT copy for Tyler's review.
 */

export const meta: PageMeta = {
  title: "AI payoff check",
  description:
    "Five questions. See how many hours a year AI could give back to your team, what we would build first, and how long it takes.",
  canonical: "/ai-readiness",
};

export const og: OgCopy = {
  eyebrow: "AI payoff check",
  title: "See what AI could give back to your team.",
  alt: "The Dialed Intelligence AI payoff check.",
};

export const header = {
  eyebrow: "AI payoff check",
  title: "See what AI could give back to your team.",
  subhead:
    "Five questions. About a minute. You see the hours a year you could get back, the system we would build first, and how long it takes to go live.",
  promise: "Every figure comes from your answers. We show the math.",
};

export interface AnswerOption {
  /** Stable id. Stored in Attio and validated by the API. Never reuse one. */
  id: string;
  label: string;
  /** Points toward the opportunity score. Max per question sums to 100. */
  points?: number;
  /** Workflow options. What we would build, and the page that explains it. */
  build?: string;
  href?: string;
  /** Hours options. Midpoint of the range, used for the hours-back figure. */
  weeklyHours?: number;
  /** Goal options. Finishes the sentence "That is time to ...". */
  phrase?: string;
}

export type QuestionId = "workflow" | "hours" | "goal" | "timeline" | "revenue";

export interface Question {
  id: QuestionId;
  prompt: string;
  help?: string;
  options: readonly AnswerOption[];
}

export const questions: readonly Question[] = [
  {
    id: "workflow",
    prompt: "What would you hand off to AI first?",
    help: "Pick the work your team would be happiest to stop doing by hand.",
    options: [
      {
        id: "quoting",
        label: "Quotes and estimates",
        points: 20,
        build: "We build quote automation in eight to twelve weeks.",
        href: "/services/quoting",
      },
      {
        id: "orders",
        label: "Order entry and invoicing",
        points: 20,
        build: "We have a first workflow agent running in six to ten weeks.",
        href: "/services/operations-automation",
      },
      {
        id: "service",
        label: "Customer emails and the shared inbox",
        points: 20,
        build: "We build customer service agents in eight to twelve weeks.",
        href: "/services/customer-service",
      },
      {
        id: "reporting",
        label: "Reports and dashboards",
        points: 18,
        build: "We build live reporting in six to ten weeks when the data sits in one place.",
        href: "/services/business-intelligence",
      },
      {
        id: "scheduling",
        label: "Scheduling and dispatch",
        points: 16,
        build: "We have a first workflow agent running in six to ten weeks.",
        href: "/services/operations-automation",
      },
      {
        id: "inventory",
        label: "Inventory and purchasing",
        points: 14,
        build: "We have reorder proposals live in ten to sixteen weeks.",
        href: "/services/inventory",
      },
      {
        id: "pricing",
        label: "Pricing",
        points: 12,
        build: "We build pricing models in fourteen to twenty weeks, pilot included.",
        href: "/services/pricing",
      },
      {
        id: "other",
        label: "Something else",
        points: 8,
        build: "We map it on the call and tell you what a first build would take.",
        href: "/services",
      },
    ],
  },
  {
    id: "hours",
    prompt: "How many hours a week does your team spend on it?",
    help: "Add up everyone who touches it. A rough guess is fine.",
    options: [
      { id: "under-5", label: "Under 5 hours", points: 10, weeklyHours: 3 },
      { id: "5-20", label: "5 to 20 hours", points: 25, weeklyHours: 12 },
      { id: "20-40", label: "20 to 40 hours", points: 40, weeklyHours: 30 },
      { id: "40+", label: "More than 40 hours", points: 50, weeklyHours: 50 },
    ],
  },
  {
    id: "goal",
    prompt: "What would your team do with that time back?",
    options: [
      { id: "win", label: "Win more work", phrase: "win more work" },
      { id: "faster", label: "Answer customers faster", phrase: "answer customers faster" },
      { id: "grow", label: "Grow without adding headcount", phrase: "grow without adding headcount" },
      { id: "errors", label: "Cut errors and rework", phrase: "cut errors and rework" },
      { id: "evenings", label: "Get evenings back", phrase: "get evenings back" },
    ],
  },
  {
    id: "timeline",
    prompt: "When would you like it running?",
    options: [
      { id: "quarter", label: "This quarter", points: 30 },
      { id: "six-months", label: "In the next six months", points: 22 },
      { id: "year", label: "Sometime this year", points: 12 },
      { id: "exploring", label: "Just exploring", points: 5 },
    ],
  },
  {
    id: "revenue",
    prompt: "Last one. What is annual revenue?",
    help: "So we size the first project to the business.",
    options: [
      { id: "under-2", label: "Under $2M" },
      { id: "2-5", label: "$2M to $5M" },
      { id: "5-10", label: "$5M to $10M" },
      { id: "10-25", label: "$10M to $25M" },
      { id: "25+", label: "Over $25M" },
    ],
  },
] as const;

/** Share of current hours we plan on automating. Shown to the visitor. */
export const AUTOMATABLE_SHARE = 0.6;
export const WEEKS_PER_YEAR = 52;

/** Score bands, highest first. A score lands in the first band it clears. */
export interface Band {
  id: "strong" | "plan" | "small";
  min: number;
  label: string;
  summary: string;
  nextStep: string;
}

export const bands: readonly Band[] = [
  {
    id: "strong",
    min: 75,
    label: "Strong first project",
    summary: "Big enough to pay back fast, and you want it soon. This is the kind of project we start with.",
    nextStep: "Book a 45-minute call. We sketch the build and its payback date on the call.",
  },
  {
    id: "plan",
    min: 50,
    label: "Worth a plan",
    summary: "There is real time to win back. A short plan shows which piece to build first.",
    nextStep: "Book a 45-minute call. We rank your options and name the first build.",
  },
  {
    id: "small",
    min: 0,
    label: "Start small",
    summary: "The payoff is real but modest today. A small first win often finds a bigger one.",
    nextStep: "Book a 45-minute call. We tell you the cheapest first step and what it pays back.",
  },
] as const;

/** Result lines. `{n}` and the phrase are filled in by the scoring module. */
export const payoffCopy = {
  hoursMath: (weekly: number, share: number) =>
    `Based on about ${weekly} hours a week, 52 weeks a year, with ${Math.round(share * 100)} percent of the work automated.`,
  goal: (phrase: string) => `That is time to ${phrase}.`,
  buildLink: "See how we build it",
};

/** Labels for the step that asks for contact details. */
export const contactStep = {
  title: "Where should we send your plan?",
  body: "Your result shows on the next screen. We keep a copy so the call starts from your answers.",
  nameLabel: "Name",
  emailLabel: "Work email",
  companyLabel: "Company",
  detailLabel: "Anything we should know (optional)",
  submitIdle: "Show my result",
  submitPending: "Working it out",
  privacy: "We use your answers to prepare for a call. We never sell or share them.",
};

export const flow = {
  progress: (current: number, total: number) => `Question ${current} of ${total}`,
  back: "Back",
  next: "Next",
  contactProgress: "Almost there",
};

export const result = {
  label: "Hours a year your team could get back",
  unit: "hours a year",
  scoreLabel: "AI opportunity score",
  outOf: "out of 100",
  payoffLabel: "What that looks like",
  nextLabel: "Suggested next step",
  cta: "Book a 45-minute call",
  restart: "Start over",
  saved: "We have your answers. Expect a note from us within one business day.",
  saveFailedLead: "Your result is ready, but we could not save your answers. Email us at",
  saveFailedTail: "and we will pick it up there.",
};

export const errors = {
  answer: "Pick the closest option.",
  name: "Tell us your name.",
  emailMissing: "Add an email so we can reply.",
  emailInvalid: "That email does not look right.",
  company: "Tell us which company.",
};

/** Link from /contact for visitors who are not ready for a call. */
export const contactPageLink = {
  lead: "Not ready for a call yet?",
  label: "See what AI could give back to your team in five questions",
  href: "/ai-readiness",
};

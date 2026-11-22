import type { OgCopy, PageMeta } from "./types";

/**
 * AI readiness check. Every question, option, score weight and result line
 * lives here. The scoring module (src/lib/readiness.ts) reads the weights,
 * the client renders the copy, and /api/ai-readiness validates submissions
 * against the same option ids, so the three can never drift apart.
 *
 * DRAFT copy for Tyler's review.
 */

export const meta: PageMeta = {
  title: "AI readiness check",
  description:
    "Answer nine questions about how your business runs. Get an AI readiness score out of 100, the three things behind it, and a suggested next step.",
  canonical: "/ai-readiness",
};

export const og: OgCopy = {
  eyebrow: "AI readiness check",
  title: "Score your AI readiness in three minutes.",
  alt: "The Dialed Intelligence AI readiness check.",
};

export const header = {
  eyebrow: "AI readiness check",
  title: "Find out where AI would pay off first.",
  subhead:
    "Nine questions about how the business runs. It takes about three minutes. You get a score out of 100, the three things behind it, and the next step we would suggest.",
  promise: "The score comes from fixed rules. We show every reason behind it.",
};

/** Scored dimensions. Weights are the max points each can add. */
export type DimensionId =
  | "opportunity"
  | "systems"
  | "trust"
  | "sponsor"
  | "experience"
  | "urgency";

export interface Dimension {
  id: DimensionId;
  label: string;
  /** Shown when this dimension is one of the strongest. */
  strength: string;
  /** Shown when this dimension is the weakest. */
  gap: string;
}

export const dimensions: readonly Dimension[] = [
  {
    id: "opportunity",
    label: "Size of the prize",
    strength:
      "The workflow you picked eats enough hours to pay back a build within a few months.",
    gap: "The workflow you picked takes modest hours today. A bigger one may pay back faster.",
  },
  {
    id: "systems",
    label: "Where the data lives",
    strength:
      "Your core data sits in systems we can connect to, so a build starts from real records.",
    gap: "Most of the data lives in spreadsheets and inboxes. Pulling it into one place comes first.",
  },
  {
    id: "trust",
    label: "Trust in the numbers",
    strength: "Your team trusts its reports, so automated output will get used.",
    gap: "The team does not fully trust its reports. A short data cleanup makes every later project faster.",
  },
  {
    id: "sponsor",
    label: "An owner on your side",
    strength:
      "A leader on your side owns the result. That is the strongest predictor of a project that ships.",
    gap: "Nobody owns this yet. Naming one person on your side is the cheapest step you can take.",
  },
  {
    id: "experience",
    label: "AI already in use",
    strength: "Your team already uses AI tools, so adoption will be quick.",
    gap: "The team has not used AI tools yet. A small first win builds the habit.",
  },
  {
    id: "urgency",
    label: "Timeline",
    strength: "You want this working soon, and the plan can be built around that date.",
    gap: "There is no date on this yet. A payback target gives the project a reason to move.",
  },
] as const;

export interface AnswerOption {
  /** Stable id. Stored in Attio and validated by the API. Never reuse one. */
  id: string;
  label: string;
  /** Points toward the question's dimension. Omit for unscored questions. */
  points?: number;
}

export interface Question {
  id: QuestionId;
  prompt: string;
  /** Short helper line under the prompt. */
  help?: string;
  /** Dimension this question scores. Unscored questions profile the lead. */
  dimension?: DimensionId;
  options: readonly AnswerOption[];
}

export type QuestionId =
  | "industry"
  | "revenue"
  | "workflow"
  | "hours"
  | "systems"
  | "trust"
  | "sponsor"
  | "experience"
  | "timeline";

export const questions: readonly Question[] = [
  {
    id: "industry",
    prompt: "What does the business do?",
    options: [
      { id: "manufacturing", label: "Manufacturing" },
      { id: "distribution", label: "Distribution or wholesale" },
      { id: "construction", label: "Construction or trades" },
      { id: "professional", label: "Professional services" },
      { id: "healthcare", label: "Healthcare" },
      { id: "financial", label: "Financial services or insurance" },
      { id: "retail", label: "Retail or ecommerce" },
      { id: "other", label: "Something else" },
    ],
  },
  {
    id: "revenue",
    prompt: "What is annual revenue?",
    help: "A range is fine. It shapes the size of project that makes sense.",
    options: [
      { id: "under-2", label: "Under $2M" },
      { id: "2-5", label: "$2M to $5M" },
      { id: "5-10", label: "$5M to $10M" },
      { id: "10-25", label: "$10M to $25M" },
      { id: "25+", label: "Over $25M" },
    ],
  },
  {
    id: "workflow",
    prompt: "Which workflow would you fix first?",
    options: [
      { id: "quoting", label: "Quoting and estimating" },
      { id: "orders", label: "Order entry and invoicing" },
      { id: "reporting", label: "Reporting and dashboards" },
      { id: "service", label: "Customer service and the shared inbox" },
      { id: "scheduling", label: "Scheduling and dispatch" },
      { id: "inventory", label: "Inventory and purchasing" },
      { id: "pricing", label: "Pricing" },
      { id: "other", label: "Something else" },
    ],
  },
  {
    id: "hours",
    prompt: "How many hours a week does your team spend on it?",
    help: "Add up everyone who touches it.",
    dimension: "opportunity",
    options: [
      { id: "under-5", label: "Under 5 hours", points: 5 },
      { id: "5-20", label: "5 to 20 hours", points: 10 },
      { id: "20-40", label: "20 to 40 hours", points: 15 },
      { id: "40+", label: "More than 40 hours", points: 20 },
    ],
  },
  {
    id: "systems",
    prompt: "Where does the data for that work live today?",
    dimension: "systems",
    options: [
      { id: "spreadsheets", label: "Mostly spreadsheets and email", points: 5 },
      {
        id: "one-system",
        label: "One main system, plus spreadsheets",
        points: 12,
      },
      { id: "connected", label: "Several systems that share data", points: 15 },
      { id: "unsure", label: "Not sure", points: 3 },
    ],
  },
  {
    id: "trust",
    prompt: "How much does the team trust the numbers in its reports?",
    dimension: "trust",
    options: [
      { id: "rarely", label: "Rarely. We double check everything", points: 3 },
      { id: "sometimes", label: "Sometimes", points: 8 },
      { id: "usually", label: "Usually", points: 12 },
      { id: "fully", label: "Fully. We run the business on them", points: 15 },
    ],
  },
  {
    id: "sponsor",
    prompt: "Who would own this project on your side?",
    dimension: "sponsor",
    options: [
      { id: "owner", label: "The owner or CEO", points: 15 },
      { id: "ops-finance", label: "An operations or finance leader", points: 15 },
      { id: "it", label: "IT", points: 10 },
      { id: "nobody", label: "Nobody yet", points: 3 },
    ],
  },
  {
    id: "experience",
    prompt: "How does the team use AI today?",
    dimension: "experience",
    options: [
      { id: "none", label: "We do not use it yet", points: 5 },
      { id: "chat", label: "A few people use chat tools", points: 10 },
      { id: "pilot", label: "We have tried a pilot or a vendor tool", points: 15 },
      { id: "production", label: "AI already runs part of a workflow", points: 15 },
    ],
  },
  {
    id: "timeline",
    prompt: "When do you want the first project working?",
    dimension: "urgency",
    options: [
      { id: "quarter", label: "This quarter", points: 20 },
      { id: "six-months", label: "In the next six months", points: 14 },
      { id: "year", label: "Sometime this year", points: 8 },
      { id: "exploring", label: "We are only exploring", points: 3 },
    ],
  },
] as const;

/** Score bands, highest first. A score lands in the first band it clears. */
export interface Band {
  id: "build" | "plan" | "foundation";
  min: number;
  label: string;
  summary: string;
  nextStep: string;
}

export const bands: readonly Band[] = [
  {
    id: "build",
    min: 75,
    label: "Ready to build",
    summary:
      "You have the hours, the data and an owner. A first system could be live within a quarter.",
    nextStep:
      "Book a 45-minute call. We will sketch the first build and its payback date on the call.",
  },
  {
    id: "plan",
    min: 50,
    label: "Ready for a plan",
    summary:
      "The opportunity is real. One or two gaps decide which project should go first.",
    nextStep:
      "Book a 45-minute call. We will rank your options and name the gap to close first.",
  },
  {
    id: "foundation",
    min: 0,
    label: "Foundation first",
    summary:
      "AI will pay off here later. Today the data and ownership work comes first.",
    nextStep:
      "Book a 45-minute call. We will tell you the two cheapest steps that raise this score.",
  },
] as const;

/** Labels for the step that asks for contact details. */
export const contactStep = {
  title: "Where should we send your result?",
  body: "Your score shows on the next screen. We also keep a copy so the call starts from your answers.",
  nameLabel: "Name",
  emailLabel: "Work email",
  companyLabel: "Company",
  roleLabel: "Your role",
  detailLabel: "Describe the workflow in a sentence (optional)",
  submitIdle: "See my score",
  submitPending: "Scoring",
  privacy: "We use your answers to prepare for a call. We never sell or share them.",
};

export const flow = {
  progress: (current: number, total: number) => `Question ${current} of ${total}`,
  back: "Back",
  next: "Next",
  contactProgress: "Last step",
};

export const result = {
  label: "Your AI readiness score",
  outOf: "out of 100",
  reasonsLabel: "What is behind it",
  nextLabel: "Suggested next step",
  cta: "Book a 45-minute call",
  restart: "Start over",
  saved: "We have your answers. Expect a note from us within one business day.",
  saveFailedLead: "Your score is ready, but we could not save your answers. Email us at",
  saveFailedTail: "and we will pick it up there.",
};

export const errors = {
  answer: "Pick the closest option.",
  name: "Tell us your name.",
  emailMissing: "Add an email so we can reply.",
  emailInvalid: "That email does not look right.",
  company: "Tell us which company.",
  role: "Tell us your role.",
};

/** Link from /contact for visitors who are not ready for a call. */
export const contactPageLink = {
  lead: "Not ready for a call yet?",
  label: "Take the three-minute AI readiness check",
  href: "/ai-readiness",
};

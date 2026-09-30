import type { OgCopy, PageMeta } from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// Contact". Form labels and messages live in contact-form.ts.

export const meta: PageMeta = {
  title: "Book a 45-minute call",
  description:
    "Book a free 45-minute call with Dialed Intelligence. We learn how the business runs and tell you where AI could pay off and whether we are the right fit.",
  canonical: "/contact",
};

export const og: OgCopy = {
  eyebrow: "Contact",
  title: "Book a 45-minute call.",
  alt: "Book a 45-minute call with Dialed Intelligence.",
};

export const header = {
  eyebrow: "Contact",
  title: "Book a 45-minute call.",
  subhead:
    "Tell us about the business and what prompted you to reach out. We reply within one business day with times for the call. The call is free, and you leave with at least one useful observation.",
};

export const fit = {
  label: "Who we work with",
  body: "Owner-led and PE-backed businesses between $2M and $25M in revenue. If you are outside that range, reach out anyway. We will tell you quickly whether we are the right fit, and point you somewhere better if we are not.",
};

export const nextSteps = {
  label: "What happens next",
  steps: [
    "We reply within one business day with times for the call",
    "A free 45-minute call with the lead who would do the work",
    "If we both see a fit, a proposal for the discovery project",
  ],
};

export const emailBand = { label: "Prefer email" };

/** Scheduler panel label and the iframe's accessible title. */
export const scheduler = {
  label: "Or pick a time directly",
  title: "Schedule a 45-minute call",
};

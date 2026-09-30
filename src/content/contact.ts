import type { OgCopy, PageMeta } from "./types";

// No canonical here, matching the live site. Consider adding "/contact".
export const meta: PageMeta = {
  title: "Start a Conversation",
  description:
    "The first conversation is a free working session. One hour, no deck, no pitch. We map your most expensive operational time-sinks.",
};

export const og: OgCopy = {
  eyebrow: "Start a conversation",
  title: "Bring us the problem.",
  alt: "Start a conversation with Dialed Intelligence. Bring us the problem.",
};

export const header = {
  eyebrow: "Start a conversation",
  title: "Bring us the problem.",
  subhead:
    "The first conversation is a free working session. One hour, no deck, no pitch. We map your most expensive operational time-sinks and you leave with something useful whether or not we ever talk again.",
};

export const fit = {
  label: "Who we work with",
  body: "We work with companies doing roughly $2.5M to $25M in revenue, typically owner-led or PE-backed. If that is not you, reach out anyway. We will tell you quickly and honestly whether we are the right fit, and point you somewhere better if we are not.",
};

export const nextSteps = {
  label: "What happens next",
  steps: [
    "A one hour working session, free",
    "A costed plan if we both see something worth building",
  ],
};

export const emailBand = { label: "Prefer email" };

/** Scheduler panel label and the iframe's accessible title. */
export const scheduler = {
  label: "Book the working session directly",
  title: "Schedule a working session",
};

/** Contact form labels, states, and validation messages. */
export const form = {
  panelLabel: "Tell us in writing",
  nameLabel: "Name",
  companyLabel: "Company",
  emailLabel: "Email",
  messageLabel: "What is eating your team's time?",
  submitIdle: "Send the problem over",
  submitPending: "Sending",
  successLabel: "Received",
  success:
    "Got it. We read every one of these and reply within two business days.",
  failLead: "Something failed on our side. Email us at",
  failTail: "and we will pick it up there.",
  errors: {
    name: "Tell us your name.",
    emailMissing: "Add an email so we can reply.",
    emailInvalid: "That email does not look right.",
    message: "Give us a sentence about the problem.",
  },
};

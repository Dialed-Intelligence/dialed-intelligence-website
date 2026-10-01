/**
 * Contact form copy and the annual revenue option list.
 *
 * `revenueOptions` is the single source of truth for the revenue select. The
 * form renders it and /api/contact validates submissions against it.
 */

export type RevenueOption = { readonly value: string; readonly label: string };

export const revenueOptions = [
  { value: "2-5", label: "$2M to $5M" },
  { value: "5-10", label: "$5M to $10M" },
  { value: "10-25", label: "$10M to $25M" },
  { value: "25+", label: "Over $25M" },
] as const satisfies readonly RevenueOption[];


/** Contact form labels, states, and validation messages. */
export const form = {
  panelLabel: "Tell us about the business",
  nameLabel: "Name",
  emailLabel: "Email",
  companyLabel: "Company",
  roleLabel: "Your role",
  revenueLabel: "Annual revenue",
  revenuePrompt: "Select a range",
  messageLabel: "What prompted you to reach out?",
  submitIdle: "Send it over",
  submitPending: "Sending",
  successLabel: "Received",
  success:
    "Thanks. We read every message and reply within one business day, usually with times for the call.",
  failLead: "Something failed on our side. Email us at",
  failTail: "and we will pick it up there.",
  errors: {
    name: "Tell us your name.",
    emailMissing: "Add an email so we can reply.",
    emailInvalid: "That email does not look right.",
    company: "Tell us which company.",
    role: "Tell us your role.",
    revenue: "Pick the closest range.",
    message: "Give us a sentence on what prompted this.",
  },
};

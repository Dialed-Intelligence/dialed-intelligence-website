import { questions } from "@/content/ai-readiness";
import type { InboundLead } from "@/lib/attio";
import { answerLabel, type Answers, type PayoffResult } from "@/lib/readiness";

/**
 * Turns one AI readiness submission into the CRM record and the alert email.
 * Pure, so the exact text Tyler and Mikey see is covered by tests.
 */

export interface ReadinessContact {
  name: string;
  email: string;
  company: string;
  /** Optional free text from the visitor. */
  detail: string;
}

export interface ReadinessSubmission {
  contact: ReadinessContact;
  answers: Answers;
  result: PayoffResult;
  /** Submission time. */
  at: Date;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Next weekday after `d`, as an ISO date. Saturday and Sunday roll to Monday. */
export function nextBusinessDay(d: Date): string {
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1));
  while (next.getUTCDay() === 0 || next.getUTCDay() === 6) {
    next.setUTCDate(next.getUTCDate() + 1);
  }
  return isoDate(next);
}

function answerLines(answers: Answers): string[] {
  return questions.map((q) => `${q.prompt} ${answerLabel(q.id, answers[q.id])}`);
}

function resultLines(result: PayoffResult): string[] {
  return [
    `Hours back a year (estimate) ${result.hoursBack}`,
    `What we would build ${result.workflow.build ?? ""}`,
  ];
}

export function buildInboundLead(s: ReadinessSubmission): InboundLead {
  const { contact, answers, result } = s;
  const date = isoDate(s.at);
  const workflow = answerLabel("workflow", answers.workflow);
  const timeline = answerLabel("timeline", answers.timeline);
  const revenue = answerLabel("revenue", answers.revenue);

  const goal = answerLabel("goal", answers.goal);
  const hours = answerLabel("hours", answers.hours);

  const demandSignal = [
    `Took the AI payoff check on dialedintelligence.com on ${date}.`,
    `Wants to hand off ${workflow.toLowerCase()} (${hours.toLowerCase()} a week).`,
    `Goal ${goal.toLowerCase()}. Timeline ${timeline.toLowerCase()}.`,
    `Score ${result.score} (${result.band.label}).`,
    contact.detail ? `In their words "${contact.detail}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const qualificationNotes = [
    `Problem ${workflow}${contact.detail ? `. ${contact.detail}` : ""}`,
    `Value ${hours} a week, about ${result.hoursBack} hours a year back. Goal ${goal}`,
    `Budget not asked. Revenue ${revenue}`,
    "Decision maker not asked",
    `Timeline ${timeline}`,
  ].join("\n");

  const noteBody = [
    `${contact.name} at ${contact.company} (${contact.email})`,
    `Score ${result.score} of 100, ${result.band.label}`,
    "",
    "Answers",
    ...answerLines(answers),
    ...(contact.detail ? [`In their words ${contact.detail}`] : []),
    "",
    "Shown to the visitor",
    ...resultLines(result),
  ].join("\n");

  return {
    name: contact.name,
    email: contact.email,
    company: contact.company,
    demandSignal,
    date,
    dealName: `${contact.company} AI payoff check`,
    qualificationNotes,
    nextStep: "Reply with times for a 45-minute call",
    nextStepDate: nextBusinessDay(s.at),
    noteTitle: `AI payoff check ${date}, score ${result.score}`,
    noteBody,
  };
}

/** Keeps visitor text in the subject line short. */
function clip(text: string, max = 60): string {
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

export interface AlertEmail {
  subject: string;
  text: string;
}

/** Email to Tyler and Mikey. `dealUrl` is set when the Attio write worked. */
export function buildAlertEmail(
  s: ReadinessSubmission,
  crm: { dealUrl: string } | { error: string },
): AlertEmail {
  const lead = buildInboundLead(s);
  const crmLine =
    "dealUrl" in crm
      ? `Attio deal (Ready for review) ${crm.dealUrl}`
      : `Attio write FAILED (${crm.error}). Add this lead by hand or let the next scan pick it up.`;

  return {
    subject: `AI payoff check from ${clip(s.contact.name)}, ${clip(s.contact.company)} (score ${s.result.score})`,
    text: [crmLine, "", lead.noteBody].join("\n"),
  };
}

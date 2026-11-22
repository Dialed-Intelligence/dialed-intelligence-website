import { questions } from "@/content/ai-readiness";
import type { InboundLead } from "@/lib/attio";
import { answerLabel, type Answers, type ReadinessResult } from "@/lib/readiness";

/**
 * Turns one AI readiness submission into the CRM record and the alert email.
 * Pure, so the exact text Tyler and Mikey see is covered by tests.
 */

export interface ReadinessContact {
  name: string;
  email: string;
  company: string;
  role: string;
  /** Optional free text describing the workflow. */
  detail: string;
}

export interface ReadinessSubmission {
  contact: ReadinessContact;
  answers: Answers;
  result: ReadinessResult;
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

function breakdownLines(result: ReadinessResult): string[] {
  return result.breakdown.map(
    (d) => `${d.dimension.label} ${d.points} of ${d.max}`,
  );
}

export function buildInboundLead(s: ReadinessSubmission): InboundLead {
  const { contact, answers, result } = s;
  const date = isoDate(s.at);
  const workflow = answerLabel("workflow", answers.workflow);
  const timeline = answerLabel("timeline", answers.timeline);
  const revenue = answerLabel("revenue", answers.revenue);

  const demandSignal = [
    `Took the AI readiness check on dialedintelligence.com on ${date}.`,
    `Wants to fix ${workflow.toLowerCase()}.`,
    `Timeline ${timeline.toLowerCase()}.`,
    `Score ${result.score} (${result.band.label}).`,
    contact.detail ? `In their words "${contact.detail}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const qualificationNotes = [
    `Problem ${workflow}${contact.detail ? `. ${contact.detail}` : ""}`,
    `Value ${answerLabel("hours", answers.hours)} a week on it`,
    `Budget not asked. Revenue ${revenue}`,
    `Decision maker ${contact.role}. Project owner ${answerLabel("sponsor", answers.sponsor)}`,
    `Timeline ${timeline}`,
  ].join("\n");

  const noteBody = [
    `${contact.name}, ${contact.role} at ${contact.company} (${contact.email})`,
    `Score ${result.score} of 100, ${result.band.label}`,
    "",
    "Answers",
    ...answerLines(answers),
    ...(contact.detail ? [`Workflow in their words ${contact.detail}`] : []),
    "",
    "Score breakdown",
    ...breakdownLines(result),
    "",
    "Reasons shown to the visitor",
    ...result.reasons.map((r) => `${r.kind === "gap" ? "Gap" : "Strength"} ${r.text}`),
  ].join("\n");

  return {
    name: contact.name,
    email: contact.email,
    company: contact.company,
    role: contact.role,
    demandSignal,
    date,
    dealName: `${contact.company} AI readiness check`,
    qualificationNotes,
    nextStep: "Reply with times for a 45-minute call",
    nextStepDate: nextBusinessDay(s.at),
    noteTitle: `AI readiness check ${date}, score ${result.score}`,
    noteBody,
  };
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
    subject: `AI readiness check from ${s.contact.name}, ${s.contact.company} (score ${s.result.score})`,
    text: [crmLine, "", lead.noteBody].join("\n"),
  };
}

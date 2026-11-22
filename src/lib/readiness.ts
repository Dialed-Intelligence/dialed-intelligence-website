import {
  AUTOMATABLE_SHARE,
  WEEKS_PER_YEAR,
  bands,
  questions,
  type AnswerOption,
  type Band,
  type Question,
  type QuestionId,
} from "@/content/ai-readiness";

/**
 * AI payoff check scoring. Pure functions, no I/O, so the browser can show
 * the result instantly and the API can recompute it without trusting the
 * client.
 *
 * Rules, in plain terms:
 * - Opportunity score. Workflow, hours and timeline options carry points.
 *   The best option of each sums to 100. Goal and revenue carry none.
 * - Hours back a year. Midpoint of the chosen hours range, times 52 weeks,
 *   times AUTOMATABLE_SHARE, rounded to the nearest 10.
 * - Build line and link come from the chosen workflow. Goal line comes from
 *   the chosen goal.
 */

export type Answers = Record<QuestionId, string>;

export interface PayoffResult {
  score: number;
  band: Band;
  weeklyHours: number;
  hoursBack: number;
  workflow: AnswerOption;
  goal: AnswerOption;
}

const questionById = new Map<QuestionId, Question>(
  questions.map((q) => [q.id, q]),
);

function option(id: QuestionId, optionId: string): AnswerOption {
  const found = questionById.get(id)?.options.find((o) => o.id === optionId);
  if (!found) throw new Error(`Unknown answer ${optionId} for ${id}`);
  return found;
}

/** Highest score the questions allow. The content is built so this is 100. */
export function maxScore(): number {
  return questions.reduce(
    (sum, q) => sum + Math.max(0, ...q.options.map((o) => o.points ?? 0)),
    0,
  );
}

/**
 * Returns the answers as a typed record when every question has a known
 * option id, otherwise null. Extra keys are ignored.
 */
export function parseAnswers(input: unknown): Answers | null {
  if (typeof input !== "object" || input === null) return null;
  const raw = input as Record<string, unknown>;
  const out: Partial<Answers> = {};
  for (const q of questions) {
    const value = raw[q.id];
    if (typeof value !== "string") return null;
    if (!q.options.some((o) => o.id === value)) return null;
    out[q.id] = value;
  }
  return out as Answers;
}

/** Human label for an answer, for CRM notes and email. */
export function answerLabel(questionId: QuestionId, optionId: string): string {
  const q = questionById.get(questionId);
  return q?.options.find((o) => o.id === optionId)?.label ?? optionId;
}

export function hoursBackPerYear(weeklyHours: number): number {
  return Math.round((weeklyHours * WEEKS_PER_YEAR * AUTOMATABLE_SHARE) / 10) * 10;
}

export function scoreAnswers(answers: Answers): PayoffResult {
  const total = questions.reduce(
    (sum, q) => sum + (option(q.id, answers[q.id]).points ?? 0),
    0,
  );
  const max = maxScore();
  const score = max === 0 ? 0 : Math.round((total / max) * 100);
  const band = bands.find((b) => score >= b.min) ?? bands[bands.length - 1];
  const weeklyHours = option("hours", answers.hours).weeklyHours ?? 0;

  return {
    score,
    band,
    weeklyHours,
    hoursBack: hoursBackPerYear(weeklyHours),
    workflow: option("workflow", answers.workflow),
    goal: option("goal", answers.goal),
  };
}

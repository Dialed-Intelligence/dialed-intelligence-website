import {
  bands,
  dimensions,
  questions,
  type Band,
  type Dimension,
  type DimensionId,
  type Question,
  type QuestionId,
} from "@/content/ai-readiness";

/**
 * AI readiness scoring. Pure functions, no I/O, so the browser can show the
 * score instantly and the API can recompute it without trusting the client.
 *
 * Rules, in plain terms:
 * - Each scored question adds the points of the chosen option.
 * - Each dimension's max is the best option's points. Maxes sum to 100.
 * - Reasons are the two strongest dimensions (by share of their max) and the
 *   weakest one. Ties break by the order dimensions are listed in content.
 */

export type Answers = Record<QuestionId, string>;

export interface DimensionScore {
  dimension: Dimension;
  points: number;
  max: number;
}

export interface Reason {
  kind: "strength" | "gap";
  dimensionId: DimensionId;
  text: string;
}

export interface ReadinessResult {
  score: number;
  band: Band;
  breakdown: DimensionScore[];
  reasons: Reason[];
}

const questionById = new Map<QuestionId, Question>(
  questions.map((q) => [q.id, q]),
);

function maxPoints(q: Question): number {
  return Math.max(0, ...q.options.map((o) => o.points ?? 0));
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

export function scoreAnswers(answers: Answers): ReadinessResult {
  const breakdown: DimensionScore[] = dimensions.map((dimension) => {
    const scored = questions.filter((q) => q.dimension === dimension.id);
    let points = 0;
    let max = 0;
    for (const q of scored) {
      const option = q.options.find((o) => o.id === answers[q.id]);
      points += option?.points ?? 0;
      max += maxPoints(q);
    }
    return { dimension, points, max };
  });

  const total = breakdown.reduce((sum, d) => sum + d.points, 0);
  const possible = breakdown.reduce((sum, d) => sum + d.max, 0);
  const score = possible === 0 ? 0 : Math.round((total / possible) * 100);

  const band = bands.find((b) => score >= b.min) ?? bands[bands.length - 1];

  return { score, band, breakdown, reasons: pickReasons(breakdown) };
}

function share(d: DimensionScore): number {
  return d.max === 0 ? 0 : d.points / d.max;
}

function pickReasons(breakdown: DimensionScore[]): Reason[] {
  // Stable sorts keep content order on ties.
  const strongest = [...breakdown].sort((a, b) => share(b) - share(a));
  const weakest = [...breakdown].sort((a, b) => share(a) - share(b))[0];

  const strengths = strongest
    .filter((d) => d !== weakest)
    .slice(0, 2)
    .map<Reason>((d) => ({
      kind: "strength",
      dimensionId: d.dimension.id,
      text: d.dimension.strength,
    }));

  // A perfect score has no real gap. Show a third strength instead.
  if (share(weakest) === 1) {
    return strongest.slice(0, 3).map((d) => ({
      kind: "strength",
      dimensionId: d.dimension.id,
      text: d.dimension.strength,
    }));
  }

  return [
    ...strengths,
    { kind: "gap", dimensionId: weakest.dimension.id, text: weakest.dimension.gap },
  ];
}

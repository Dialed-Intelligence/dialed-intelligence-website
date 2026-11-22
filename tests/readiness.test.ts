import { describe, expect, it } from "vitest";
import { dimensions, questions } from "@/content/ai-readiness";
import { parseAnswers, scoreAnswers, type Answers } from "@/lib/readiness";

/** Picks, for every question, the option with the most or fewest points. */
function extreme(kind: "best" | "worst"): Answers {
  const out: Record<string, string> = {};
  for (const q of questions) {
    const sorted = [...q.options].sort((a, b) => (a.points ?? 0) - (b.points ?? 0));
    out[q.id] = (kind === "best" ? sorted[sorted.length - 1] : sorted[0]).id;
  }
  return out as Answers;
}

describe("question data", () => {
  it("has max points summing to 100 so the score needs no rescaling", () => {
    const max = questions
      .filter((q) => q.dimension)
      .reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points ?? 0)), 0);
    expect(max).toBe(100);
  });

  it("scores every dimension with at least one question", () => {
    for (const d of dimensions) {
      expect(questions.some((q) => q.dimension === d.id)).toBe(true);
    }
  });

  it("uses unique option ids within each question", () => {
    for (const q of questions) {
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("parseAnswers", () => {
  it("accepts a complete set of known option ids", () => {
    expect(parseAnswers(extreme("best"))).toEqual(extreme("best"));
  });

  it("rejects a missing answer", () => {
    const { timeline: _omit, ...partial } = extreme("best");
    void _omit;
    expect(parseAnswers(partial)).toBeNull();
  });

  it("rejects an unknown option id", () => {
    expect(parseAnswers({ ...extreme("best"), hours: "999" })).toBeNull();
  });

  it("rejects non-objects", () => {
    expect(parseAnswers(null)).toBeNull();
    expect(parseAnswers("x")).toBeNull();
  });
});

describe("scoreAnswers", () => {
  it("gives 100 and Ready to build for the best answers, with three strengths", () => {
    const r = scoreAnswers(extreme("best"));
    expect(r.score).toBe(100);
    expect(r.band.id).toBe("build");
    expect(r.reasons).toHaveLength(3);
    expect(r.reasons.every((x) => x.kind === "strength")).toBe(true);
  });

  it("gives Foundation first for the worst answers, with three gaps and no false strengths", () => {
    const r = scoreAnswers(extreme("worst"));
    expect(r.score).toBe(22);
    expect(r.band.id).toBe("foundation");
    expect(r.reasons.map((x) => x.kind)).toEqual(["gap", "gap", "gap"]);
  });

  it("only calls a dimension a strength at 60 percent of its max or more", () => {
    const r = scoreAnswers({ ...extreme("worst"), timeline: "quarter" });
    expect(r.reasons[0]).toMatchObject({ kind: "strength", dimensionId: "urgency" });
    expect(r.reasons.slice(1).every((x) => x.kind === "gap")).toBe(true);
  });

  it("names the weakest dimension as the gap", () => {
    const answers = { ...extreme("best"), sponsor: "nobody" };
    const r = scoreAnswers(answers);
    expect(r.score).toBe(88);
    expect(r.reasons[2]).toMatchObject({ kind: "gap", dimensionId: "sponsor" });
  });

  it("puts a 50 to 74 score in Ready for a plan", () => {
    const answers: Answers = {
      ...extreme("best"),
      hours: "5-20", // 10
      systems: "one-system", // 12
      trust: "sometimes", // 8
      sponsor: "it", // 10
      experience: "chat", // 10
      timeline: "six-months", // 14
    };
    const r = scoreAnswers(answers);
    expect(r.score).toBe(64);
    expect(r.band.id).toBe("plan");
  });

  it("ignores unscored profile questions", () => {
    const a = scoreAnswers(extreme("best"));
    const b = scoreAnswers({ ...extreme("best"), industry: "other", revenue: "under-2" });
    expect(b.score).toBe(a.score);
  });
});

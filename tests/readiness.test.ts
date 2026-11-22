import { describe, expect, it } from "vitest";
import { questions } from "@/content/ai-readiness";
import {
  hoursBackPerYear,
  maxScore,
  parseAnswers,
  scoreAnswers,
  type Answers,
} from "@/lib/readiness";

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
  it("asks no more than five questions", () => {
    expect(questions.length).toBeLessThanOrEqual(5);
  });

  it("has max points summing to 100 so the score needs no rescaling", () => {
    expect(maxScore()).toBe(100);
  });

  it("uses unique option ids within each question", () => {
    for (const q of questions) {
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("gives every workflow a build line and link, every hours range a midpoint, every goal a phrase", () => {
    const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
    expect(byId.workflow.options.every((o) => o.build && o.href)).toBe(true);
    expect(byId.hours.options.every((o) => (o.weeklyHours ?? 0) > 0)).toBe(true);
    expect(byId.goal.options.every((o) => o.phrase)).toBe(true);
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

describe("hoursBackPerYear", () => {
  it("is weekly hours times 52 times 60 percent, rounded to 10", () => {
    expect(hoursBackPerYear(30)).toBe(940); // 936
    expect(hoursBackPerYear(3)).toBe(90); // 93.6
  });
});

describe("scoreAnswers", () => {
  it("gives 100 and Strong first project for the best answers", () => {
    const r = scoreAnswers(extreme("best"));
    expect(r.score).toBe(100);
    expect(r.band.id).toBe("strong");
    expect(r.hoursBack).toBe(1560);
  });

  it("gives Start small for the worst answers", () => {
    const r = scoreAnswers(extreme("worst"));
    expect(r.score).toBe(23);
    expect(r.band.id).toBe("small");
  });

  it("puts a 50 to 74 score in Worth a plan and carries workflow and goal through", () => {
    const r = scoreAnswers({
      workflow: "reporting", // 18
      hours: "5-20", // 25
      goal: "grow",
      timeline: "year", // 12
      revenue: "5-10",
    });
    expect(r.score).toBe(55);
    expect(r.band.id).toBe("plan");
    expect(r.workflow.href).toBe("/services/business-intelligence");
    expect(r.goal.phrase).toBe("grow without adding headcount");
  });

  it("ignores goal and revenue for the score", () => {
    const a = scoreAnswers(extreme("best"));
    const b = scoreAnswers({ ...extreme("best"), goal: "evenings", revenue: "under-2" });
    expect(b.score).toBe(a.score);
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { questions } from "@/content/ai-readiness";
import { POST } from "@/app/api/ai-readiness/route";

const answers = Object.fromEntries(questions.map((q) => [q.id, q.options[0].id]));

function request(body: unknown) {
  return new Request("http://localhost/api/ai-readiness", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: "Dana Smith",
  email: "dana@acme.com",
  company: "Acme",
  role: "COO",
  detail: "Quotes take two days",
  website: "",
  renderedAt: 1,
  answers,
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn(async (url: string) => {
    if (url.endsWith("/records/query")) return Response.json({ data: [] });
    if (url.includes("api.attio.com")) return Response.json({ data: { id: { record_id: "r1" } } });
    return Response.json({ id: "email" });
  });
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubEnv("ATTIO_API_KEY", "attio");
  vi.stubEnv("ATTIO_DEAL_OWNER_EMAIL", "tyler@dialedintelligence.com");
  vi.stubEnv("RESEND_API_KEY", "resend");
  vi.stubEnv("READINESS_TO_EMAILS", "a@x.com, b@x.com");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function emailCall() {
  const call = fetchMock.mock.calls.find(([url]) => String(url).includes("resend"));
  return call ? JSON.parse(String(call[1].body)) : null;
}

describe("POST /api/ai-readiness", () => {
  it("writes to Attio and emails both recipients with the deal link", async () => {
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const email = emailCall();
    expect(email.to).toEqual(["a@x.com", "b@x.com"]);
    expect(email.reply_to).toBe("dana@acme.com");
    expect(email.text).toContain("https://app.attio.com/dialedintelligence/deals/record/r1");
  });

  it("recomputes the score and ignores one sent by the client", async () => {
    await POST(request({ ...valid, score: 100 }));
    expect(emailCall().subject).toMatch(/score 53\)$/) // first option of each question;
  });

  it("still emails, flagged, when Attio fails", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      String(url).includes("attio") ? new Response("{}", { status: 500 }) : Response.json({}),
    );
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(emailCall().text).toContain("Attio write FAILED");
  });

  it("returns 502 and logs when both channels fail", async () => {
    fetchMock.mockImplementation(async () => new Response("{}", { status: 500 }));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("all_channels_failed"));
  });

  it("rejects incomplete answers with 400 and writes nothing", async () => {
    const res = await POST(request({ ...valid, answers: { industry: "other" } }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a bad email with 400", async () => {
    const res = await POST(request({ ...valid, email: "nope" }));
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot hits", async () => {
    const res = await POST(request({ ...valid, website: "spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently drops submissions faster than a person", async () => {
    const res = await POST(request({ ...valid, renderedAt: Date.now() }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

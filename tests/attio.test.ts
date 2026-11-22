import { describe, expect, it, vi } from "vitest";
import { companyDomain, createAttioClient, splitName, type InboundLead } from "@/lib/attio";

const lead: InboundLead = {
  name: "Dana Smith",
  email: "dana@acme.com",
  company: "Acme",
  role: "COO",
  demandSignal: "signal",
  date: "2026-11-22",
  dealName: "Acme AI readiness check",
  qualificationNotes: "notes",
  nextStep: "Reply",
  nextStepDate: "2026-11-23",
  noteTitle: "title",
  noteBody: "body",
};

// Request bodies are arbitrary JSON, and tests read nested fields directly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Call = { method: string; url: string; body: Record<string, any> };

function fakeFetch(opts: { existingCompany?: string; existingPerson?: string; failOn?: string } = {}) {
  const calls: Call[] = [];
  const impl = vi.fn(async (url: string, init: RequestInit) => {
    const call = { method: init.method!, url, body: JSON.parse(String(init.body)) };
    calls.push(call);
    if (opts.failOn && url.includes(opts.failOn)) {
      return new Response("{}", { status: 400 });
    }
    if (url.endsWith("/companies/records/query")) {
      const data = opts.existingCompany ? [{ id: { record_id: opts.existingCompany } }] : [];
      return Response.json({ data });
    }
    if (url.endsWith("/people/records/query")) {
      const data = opts.existingPerson ? [{ id: { record_id: opts.existingPerson } }] : [];
      return Response.json({ data });
    }
    const id = url.includes("/people/") ? "p1" : url.includes("/deals/") ? "d1" : "c1";
    return Response.json({ data: { id: { record_id: id } } });
  });
  return { calls, impl: impl as unknown as typeof fetch };
}

function route(c: Call) {
  return `${c.method} ${c.url.replace("https://api.attio.com/v2", "")}`;
}

describe("helpers", () => {
  it("takes the company domain from a work email only", () => {
    expect(companyDomain("a@Acme.com")).toBe("acme.com");
    expect(companyDomain("a@gmail.com")).toBeNull();
  });

  it("splits names on the first space", () => {
    expect(splitName("Dana Lee Smith")).toEqual({ first: "Dana", last: "Lee Smith" });
    expect(splitName("Cher")).toEqual({ first: "Cher", last: "" });
  });
});

describe("writeInboundLead", () => {
  const client = (impl: typeof fetch) =>
    createAttioClient({ apiKey: "k", ownerEmail: "o@x.com", fetchImpl: impl });

  it("creates a new Inbound company, person, deal and note in order", async () => {
    const { calls, impl } = fakeFetch();
    const out = await client(impl).writeInboundLead(lead);

    expect(out).toEqual({ companyId: "c1", personId: "p1", dealId: "d1", companyExisted: false });
    expect(calls.map(route)).toEqual([
      "POST /objects/companies/records/query",
      "POST /objects/companies/records",
      "POST /objects/people/records/query",
      "POST /objects/people/records",
      "POST /objects/deals/records",
      "POST /notes",
    ]);
    expect(calls[0].body.filter).toEqual({ domains: "acme.com" });
    expect(calls[1].body.data.values).toMatchObject({
      name: "Acme",
      lead_source: "Inbound",
      demand_tier: "1 Explicit AI ask",
      domains: ["acme.com"],
    });
    expect(calls[3].body.data.values).toMatchObject({
      email_addresses: ["dana@acme.com"],
      company: [{ target_object: "companies", target_record_id: "c1" }],
    });
    const deal = calls[4].body.data.values;
    expect(deal).toMatchObject({
      sales_stage: "Ready for review",
      stage: "Lead",
      associated_company: [{ target_object: "companies", target_record_id: "c1" }],
      associated_people: [{ target_object: "people", target_record_id: "p1" }],
    });
    expect(deal.owner[0].workspace_member_email_address).toBe("o@x.com");
    expect(calls[5].body.data).toMatchObject({ parent_object: "deals", parent_record_id: "d1" });
  });

  it("never modifies an existing company or person, it only links the deal", async () => {
    const { calls, impl } = fakeFetch({ existingCompany: "c9", existingPerson: "p9" });
    const out = await client(impl).writeInboundLead(lead);

    expect(out).toMatchObject({ companyId: "c9", personId: "p9", companyExisted: true });
    expect(calls.map(route)).toEqual([
      "POST /objects/companies/records/query",
      "POST /objects/people/records/query",
      "POST /objects/deals/records",
      "POST /notes",
    ]);
    expect(calls.some((c) => c.method === "PATCH" || c.method === "PUT")).toBe(false);
  });

  it("matches a free email lead's company by name", async () => {
    const { calls, impl } = fakeFetch();
    await client(impl).writeInboundLead({ ...lead, email: "dana@gmail.com" });
    expect(calls[0].body.filter).toEqual({ name: "Acme" });
    expect(calls[1].body.data.values).not.toHaveProperty("domains");
  });

  it("names the failed step and keeps the status", async () => {
    const { impl } = fakeFetch({ failOn: "/deals/" });
    await expect(client(impl).writeInboundLead(lead)).rejects.toMatchObject({
      name: "AttioError",
      message: "Attio deal step failed",
      status: 400,
    });
  });
});

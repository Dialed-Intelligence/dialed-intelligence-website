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

function fakeFetch(opts: { existingCompany?: string; failOn?: string } = {}) {
  const calls: Call[] = [];
  const impl = vi.fn(async (url: string, init: RequestInit) => {
    const call = { method: init.method!, url, body: JSON.parse(String(init.body)) };
    calls.push(call);
    if (opts.failOn && url.includes(opts.failOn)) {
      return new Response("{}", { status: 400 });
    }
    if (url.endsWith("/records/query")) {
      const data = opts.existingCompany ? [{ id: { record_id: opts.existingCompany } }] : [];
      return Response.json({ data });
    }
    const id = url.includes("/people/") ? "p1" : url.includes("/deals/") ? "d1" : "c1";
    return Response.json({ data: { id: { record_id: id } } });
  });
  return { calls, impl: impl as unknown as typeof fetch };
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
  it("creates a new Inbound company, person, deal and note in order", async () => {
    const { calls, impl } = fakeFetch();
    const client = createAttioClient({ apiKey: "k", ownerEmail: "o@x.com", fetchImpl: impl });
    const out = await client.writeInboundLead(lead);

    expect(out).toEqual({ companyId: "c1", personId: "p1", dealId: "d1", companyExisted: false });
    expect(calls.map((c) => `${c.method} ${c.url.replace("https://api.attio.com/v2", "")}`)).toEqual([
      "POST /objects/companies/records/query",
      "POST /objects/companies/records",
      "PUT /objects/people/records?matching_attribute=email_addresses",
      "POST /objects/deals/records",
      "POST /notes",
    ]);
    const company = calls[1].body.data.values;
    expect(company).toMatchObject({
      name: "Acme",
      lead_source: "Inbound",
      demand_tier: "1 Explicit AI ask",
      domains: ["acme.com"],
    });
    const deal = calls[3].body.data.values;
    expect(deal).toMatchObject({
      sales_stage: "Ready for review",
      stage: "Lead",
      associated_company: [{ target_object: "companies", target_record_id: "c1" }],
      associated_people: [{ target_object: "people", target_record_id: "p1" }],
    });
    expect(deal.owner[0].workspace_member_email_address).toBe("o@x.com");
    expect(calls[4].body.data).toMatchObject({ parent_object: "deals", parent_record_id: "d1" });
  });

  it("keeps an existing company's lead source and only updates demand fields", async () => {
    const { calls, impl } = fakeFetch({ existingCompany: "c9" });
    const client = createAttioClient({ apiKey: "k", ownerEmail: "o@x.com", fetchImpl: impl });
    const out = await client.writeInboundLead(lead);

    expect(out.companyExisted).toBe(true);
    expect(calls[1].method).toBe("PATCH");
    expect(calls[1].url).toContain("/objects/companies/records/c9");
    expect(calls[1].body.data.values).not.toHaveProperty("lead_source");
  });

  it("skips the domain lookup for a free email address", async () => {
    const { calls, impl } = fakeFetch();
    const client = createAttioClient({ apiKey: "k", ownerEmail: "o@x.com", fetchImpl: impl });
    await client.writeInboundLead({ ...lead, email: "dana@gmail.com" });
    expect(calls[0].url).toMatch(/\/objects\/companies\/records$/);
    expect(calls[0].body.data.values).not.toHaveProperty("domains");
  });

  it("throws AttioError with the status and no response body", async () => {
    const { impl } = fakeFetch({ failOn: "/deals/" });
    const client = createAttioClient({ apiKey: "k", ownerEmail: "o@x.com", fetchImpl: impl });
    await expect(client.writeInboundLead(lead)).rejects.toMatchObject({
      name: "AttioError",
      status: 400,
    });
  });
});

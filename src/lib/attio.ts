/**
 * Minimal Attio REST client for inbound leads. Server only, it reads
 * ATTIO_API_KEY. Covers exactly what the AI readiness check needs.
 *
 * Writes, in order
 * 1. Company. Matched by domain for a work email, by exact name otherwise.
 *    An existing company is never modified, because anyone can type any
 *    email. A new one gets lead source "Inbound" and the demand fields.
 * 2. Person. Matched by email. An existing person is never modified. A new
 *    one is created and linked to the company.
 * 3. Deal at sales stage "Ready for review", linked to both.
 * 4. Note on the deal with every answer and the score breakdown.
 *
 * Attribute slugs and option titles match the Dialed Intelligence workspace
 * set up in the di-sales-engine project. Change them here if the data model
 * changes.
 */

const API = "https://api.attio.com/v2";
/** Per call. Four calls plus email must fit inside the route's maxDuration. */
const TIMEOUT_MS = 5000;

export const ATTIO = {
  leadSource: "Inbound",
  demandTier: "1 Explicit AI ask",
  revenueBasis: "Reported",
  dealStage: "Lead",
  salesStage: "Ready for review",
} as const;

/** Consumer mailbox domains. A lead from one has no usable company domain. */
const FREE_MAIL = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "ymail.com",
  "comcast.net",
  "att.net",
  "verizon.net",
]);

export function companyDomain(email: string): string | null {
  const domain = email.split("@")[1]?.trim().toLowerCase();
  if (!domain || FREE_MAIL.has(domain)) return null;
  return domain;
}

export function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export interface InboundLead {
  name: string;
  email: string;
  company: string;
  /** Job title, when the form asked for it. */
  role?: string;
  /** One-line summary of the demand signal, stored on the company. */
  demandSignal: string;
  /** ISO date (YYYY-MM-DD) of the submission. */
  date: string;
  dealName: string;
  qualificationNotes: string;
  nextStep: string;
  /** ISO date for the deal's next step. */
  nextStepDate: string;
  noteTitle: string;
  noteBody: string;
}

export interface AttioConfig {
  apiKey: string;
  /** Workspace member who owns new deals. Attio requires an owner. */
  ownerEmail: string;
  fetchImpl?: typeof fetch;
}

export interface AttioWriteResult {
  companyId: string;
  personId: string;
  dealId: string;
  companyExisted: boolean;
}

export class AttioError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "AttioError";
  }
}

type Values = Record<string, unknown>;

interface RecordResponse {
  data: { id: { record_id: string } };
}

interface QueryResponse {
  data: { id: { record_id: string } }[];
}

function ref(object: "companies" | "people" | "deals", id: string) {
  return { target_object: object, target_record_id: id };
}

export function createAttioClient(config: AttioConfig) {
  const doFetch = config.fetchImpl ?? fetch;

  async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await doFetch(`${API}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) {
        // The body can echo submitted values, so only the status is kept.
        throw new AttioError(`Attio ${method} ${path} failed`, res.status);
      }
      return (await res.json()) as T;
    } catch (err) {
      if (err instanceof AttioError) throw err;
      throw new AttioError(`Attio ${method} ${path} did not respond`);
    } finally {
      clearTimeout(timer);
    }
  }

  async function findOne(
    object: "companies" | "people",
    filter: Record<string, string>,
  ): Promise<string | null> {
    const res = await call<QueryResponse>(
      "POST",
      `/objects/${object}/records/query`,
      { filter, limit: 1 },
    );
    return res.data[0]?.id.record_id ?? null;
  }

  async function findOrCreateCompany(
    lead: InboundLead,
  ): Promise<{ id: string; existed: boolean }> {
    const domain = companyDomain(lead.email);
    const existingId = await findOne(
      "companies",
      domain ? { domains: domain } : { name: lead.company },
    );
    if (existingId) return { id: existingId, existed: true };

    const values: Values = {
      name: lead.company,
      lead_source: ATTIO.leadSource,
      revenue_basis: ATTIO.revenueBasis,
      demand_tier: ATTIO.demandTier,
      demand_signal: lead.demandSignal,
      demand_signal_date: lead.date,
      ...(domain ? { domains: [domain] } : {}),
    };
    const res = await call<RecordResponse>("POST", "/objects/companies/records", {
      data: { values },
    });
    return { id: res.data.id.record_id, existed: false };
  }

  async function findOrCreatePerson(lead: InboundLead, companyId: string): Promise<string> {
    const existingId = await findOne("people", { email_addresses: lead.email });
    if (existingId) return existingId;

    const { first, last } = splitName(lead.name);
    const res = await call<RecordResponse>(
      "POST",
      "/objects/people/records",
      {
        data: {
          values: {
            email_addresses: [lead.email],
            name: [{ first_name: first, last_name: last, full_name: lead.name }],
            ...(lead.role ? { job_title: lead.role } : {}),
            company: [ref("companies", companyId)],
          },
        },
      },
    );
    return res.data.id.record_id;
  }

  async function createDeal(
    lead: InboundLead,
    companyId: string,
    personId: string,
  ): Promise<string> {
    const res = await call<RecordResponse>("POST", "/objects/deals/records", {
      data: {
        values: {
          name: lead.dealName,
          stage: ATTIO.dealStage,
          sales_stage: ATTIO.salesStage,
          owner: [
            {
              referenced_actor_type: "workspace-member",
              workspace_member_email_address: config.ownerEmail,
            },
          ],
          associated_company: [ref("companies", companyId)],
          associated_people: [ref("people", personId)],
          qualification_notes: lead.qualificationNotes,
          next_step: lead.nextStep,
          next_step_date: lead.nextStepDate,
        },
      },
    });
    return res.data.id.record_id;
  }

  async function addNote(lead: InboundLead, dealId: string): Promise<void> {
    await call("POST", "/notes", {
      data: {
        parent_object: "deals",
        parent_record_id: dealId,
        title: lead.noteTitle,
        format: "plaintext",
        content: lead.noteBody,
      },
    });
  }

  async function step<T>(name: string, fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      const status = err instanceof AttioError ? err.status : undefined;
      throw new AttioError(`Attio ${name} step failed`, status);
    }
  }

  /**
   * Runs the four steps in order. Throws AttioError naming the first step
   * that failed, so the alert email says exactly what to repair.
   */
  async function writeInboundLead(lead: InboundLead): Promise<AttioWriteResult> {
    const company = await step("company", () => findOrCreateCompany(lead));
    const personId = await step("person", () => findOrCreatePerson(lead, company.id));
    const dealId = await step("deal", () => createDeal(lead, company.id, personId));
    await step("note", () => addNote(lead, dealId));
    return {
      companyId: company.id,
      personId,
      dealId,
      companyExisted: company.existed,
    };
  }

  return { writeInboundLead };
}

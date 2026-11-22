import { AttioError, createAttioClient } from "@/lib/attio";
import { DEFAULT_FROM, sendEmail } from "@/lib/email";
import { clean, looksLikeBot, singleLine, validEmail, validLine } from "@/lib/input";
import { parseAnswers, scoreAnswers } from "@/lib/readiness";
import {
  buildAlertEmail,
  buildInboundLead,
  type ReadinessSubmission,
} from "@/lib/readiness-lead";

export const runtime = "nodejs";
/** Four Attio calls and one email at 5s each, with headroom. */
export const maxDuration = 30;

const INVALID = { ok: false, error: "invalid" } as const;
const MAX_DETAIL = 1000;

/**
 * Receives one AI readiness submission, rescores it server side, and hands
 * it to two independent channels.
 * - Attio. Company, person, and a deal at "Ready for review".
 * - Email to the inbound list, which carries the deal link or the failure.
 *
 * The visitor gets ok when at least one channel took the lead. When both
 * fail, the full submission is logged so it is recoverable from Vercel logs.
 *
 * Env
 * - ATTIO_API_KEY, ATTIO_DEAL_OWNER_EMAIL, ATTIO_WORKSPACE_SLUG (optional)
 * - RESEND_API_KEY, READINESS_TO_EMAILS (comma separated, falls back to
 *   CONTACT_TO_EMAIL), CONTACT_FROM_EMAIL (optional)
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (typeof parsed !== "object" || parsed === null) {
      return Response.json(INVALID, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json(INVALID, { status: 400 });
  }

  if (looksLikeBot(clean(body.website), body.renderedAt)) {
    return Response.json({ ok: true });
  }

  const contact = {
    name: singleLine(clean(body.name)),
    email: singleLine(clean(body.email)),
    company: singleLine(clean(body.company)),
    role: singleLine(clean(body.role)),
    detail: singleLine(clean(body.detail)),
  };
  const answers = parseAnswers(body.answers);

  const valid =
    answers !== null &&
    validLine(contact.name) &&
    validEmail(contact.email) &&
    validLine(contact.company) &&
    validLine(contact.role) &&
    contact.detail.length <= MAX_DETAIL;
  if (!valid || !answers) {
    return Response.json(INVALID, { status: 400 });
  }

  // Never trust a client score. Recompute from the validated answers.
  const submission: ReadinessSubmission = {
    contact,
    answers,
    result: scoreAnswers(answers),
    at: new Date(),
  };

  const crm = await writeToAttio(submission);
  const emailed = await emailAlert(submission, crm);

  if (!("dealUrl" in crm) && !emailed) {
    console.error(
      JSON.stringify({
        event: "ai_readiness_submission",
        delivery: "all_channels_failed",
        crmError: crm.error,
        submission: { ...submission, result: { score: submission.result.score } },
      }),
    );
    return Response.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

async function writeToAttio(
  s: ReadinessSubmission,
): Promise<{ dealUrl: string } | { error: string }> {
  const apiKey = process.env.ATTIO_API_KEY;
  const ownerEmail = process.env.ATTIO_DEAL_OWNER_EMAIL;
  if (!apiKey || !ownerEmail) return { error: "Attio env vars not set" };

  try {
    const attio = createAttioClient({ apiKey, ownerEmail });
    const { dealId } = await attio.writeInboundLead(buildInboundLead(s));
    const workspace = process.env.ATTIO_WORKSPACE_SLUG || "dialedintelligence";
    return { dealUrl: `https://app.attio.com/${workspace}/deals/record/${dealId}` };
  } catch (err) {
    const error =
      err instanceof AttioError
        ? `${err.message}${err.status ? ` (${err.status})` : ""}`
        : "unexpected error";
    console.error(JSON.stringify({ event: "ai_readiness_attio_failed", error }));
    return { error };
  }
}

async function emailAlert(
  s: ReadinessSubmission,
  crm: { dealUrl: string } | { error: string },
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.READINESS_TO_EMAILS || process.env.CONTACT_TO_EMAIL || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  if (!apiKey || to.length === 0) return false;

  const { subject, text } = buildAlertEmail(s, crm);
  try {
    await sendEmail(apiKey, process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM, {
      to,
      subject,
      text,
      replyTo: s.contact.email,
    });
    return true;
  } catch {
    console.error(JSON.stringify({ event: "ai_readiness_email_failed" }));
    return false;
  }
}

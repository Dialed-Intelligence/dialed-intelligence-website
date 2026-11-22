/** Sends a plain-text email through Resend. Server only. */

export interface EmailMessage {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}

const TIMEOUT_MS = 8000;

export async function sendEmail(
  apiKey: string,
  from: string,
  msg: EmailMessage,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: msg.to,
        subject: msg.subject.replace(/[\r\n]+/g, " "),
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Email provider responded with status ${res.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

export const DEFAULT_FROM = "Dialed Intelligence Website <onboarding@resend.dev>";

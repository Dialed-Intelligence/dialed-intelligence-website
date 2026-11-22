/** Shared request hardening for the form routes. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Max length for single-line fields (name, company, role, email). */
export const MAX_LINE = 200;

/** Minimum believable time between form render and submit, in ms. */
export const MIN_FILL_TIME_MS = 3000;

/**
 * Strips control characters so user input can never smuggle header-like
 * sequences into an email subject or metadata. Newlines stay legal.
 */
export function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim();
}

export function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function validLine(value: string): boolean {
  return value.length > 0 && value.length < MAX_LINE;
}

export function validEmail(value: string): boolean {
  return validLine(value) && EMAIL_RE.test(value);
}

/**
 * True when the honeypot is filled or the form came back faster than a
 * person could fill it. Callers drop these silently with a 200.
 */
export function looksLikeBot(honeypot: string, renderedAt: unknown, now = Date.now()): boolean {
  const at = Number(renderedAt);
  const tooFast = Number.isFinite(at) && at > 0 && now - at < MIN_FILL_TIME_MS;
  return honeypot.length > 0 || tooFast;
}

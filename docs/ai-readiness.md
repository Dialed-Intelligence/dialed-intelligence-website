# AI readiness check

`/ai-readiness` asks nine questions, shows a score out of 100 with three
reasons and a book-a-call button, and sends the lead to Attio and email.

## How it fits together

| Piece | File |
|---|---|
| Questions, options, points, bands, all copy | `src/content/ai-readiness.ts` |
| Scoring (pure, shared by browser and server) | `src/lib/readiness.ts` |
| Attio record and alert email text | `src/lib/readiness-lead.ts` |
| Attio REST client | `src/lib/attio.ts` |
| API route | `src/app/api/ai-readiness/route.ts` |
| UI | `src/components/readiness-check.tsx`, `src/app/ai-readiness/page.tsx` |
| Tests | `tests/*.test.ts` (`npm test`) |

## Scoring

Six scored questions add points. Each dimension's best answer is its max,
and the maxes sum to 100. Industry, revenue and workflow are profile
questions with no points. Bands are 75+ Ready to build, 50 to 74 Ready for a
plan, under 50 Foundation first. The reasons are the two strongest
dimensions and the weakest one. To change a weight, edit `points` in the
content file. The tests fail if the maxes stop summing to 100.

## What lands in Attio

1. Company. Matched by email domain for a work email, by exact name for a
   personal email. An existing company is never modified, because anyone can
   type any email address. A new company gets lead source Inbound, revenue
   basis Reported, demand tier "1 Explicit AI ask", demand signal and date.
   For an existing company the signal lives on the deal and its note.
2. Person, matched by email. An existing person is never modified. A new one
   is created and linked to the company.
3. Deal named "<Company> AI readiness check", stage Lead, sales stage
   Ready for review, owner from `ATTIO_DEAL_OWNER_EMAIL`, qualification notes,
   next step due the next business day.
4. Note on the deal with every answer and the score breakdown.

If Attio fails, the email still goes and names the step that failed
(company, person, deal or note). If both fail, the route
returns 502, the visitor still sees their score with an email fallback, and
the full submission is in the Vercel function logs
(`ai_readiness_submission`).

## Environment variables (Vercel, Production and Preview)

| Name | Value |
|---|---|
| `ATTIO_API_KEY` | Attio access token (Settings, Developers). Scopes: records read-write, object configuration read, notes read-write, user management read |
| `ATTIO_DEAL_OWNER_EMAIL` | Workspace member who owns new deals |
| `ATTIO_WORKSPACE_SLUG` | Optional. Workspace slug used in the deal link (default `dialedintelligence`) |
| `READINESS_TO_EMAILS` | Comma separated alert recipients. Falls back to `CONTACT_TO_EMAIL` |
| `RESEND_API_KEY` | Already used by the contact form |
| `CONTACT_FROM_EMAIL` | Optional sender, shared with the contact form |
| `NEXT_PUBLIC_SCHEDULER_URL` | Booking link. The result button opens it. Without it the button goes to /contact |

## Known limits

- Spam protection is the same honeypot and time trap as the contact form, and
  there is no per-IP rate limit. A determined bot could create junk deals.
  They land in Ready for review, so a person screens them before anything
  goes out. If spam shows up, add a Vercel Firewall rate-limit rule on
  `/api/ai-readiness` (for example 5 requests per IP per 10 minutes) or
  Cloudflare Turnstile.
- When Attio and email both fail, the full submission is written to the
  Vercel function logs so it can be recovered. Treat those logs as holding
  personal data.
- Submitting twice creates two deals.

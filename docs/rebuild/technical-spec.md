# Rebuild technical spec: fractional AI strategy and engineering

Status: draft, 2026-09-29. Owner: Tyler. Implementation: Claude Code.
Branch: `rebuild/fractional-ai`.

This covers the technical side of the rebuild: what stays, what changes, how
the new strategy gets from the strategy thread into the code, and how it ships.
Positioning, audience, offers, sitemap, and copy come from the **Dialed
Intelligence Rebrand Spec** doc
(https://claude.ai/code/artifact/27a44f53-8900-4356-b35e-81255356ba4b). That
doc replaces the planned `copy-deck.md`, and `copy-deck-template.md` is
retired.

---

## 1. Current state

| Area | Today |
|---|---|
| Repo | `Dialed-Intelligence/dialed-intelligence-website`, default branch `main`, no branch protection |
| Stack | Next.js 16 App Router, React 19, Tailwind 4, TypeScript, static generation |
| Hosting | Vercel project `dialed-intelligence-website` (team "Tyler's projects"), Git-connected |
| Deploys | Push to `main` deploys production. Every other branch gets an SSO-protected preview URL |
| Domains | `dialedintelligence.com` and `www.dialedintelligence.com`, both verified |
| CI | `.github/workflows/agent-pr-check.yml` on PRs to main. Lint, typecheck, TruffleHog, build |
| Health | `npm ci`, lint, typecheck, and build all pass locally (33 static routes) as of 2026-09-29 |
| Analytics | `@vercel/analytics`, CTA click events via `track()` |
| Contact | `/api/contact` route with honeypot, time trap, and header-injection hardening. Delivers via Resend when env vars are set |

### Routes today

`/`, `/services`, `/services/[slug]` (five: data-systems, operations-automation,
automation-platform, inventory, pricing), `/ownership`, `/approach`, `/about`,
`/insights`, `/insights/[slug]` (three posts), `/contact`, plus OG images per
route, `sitemap.xml`, `robots.txt`, `icon.svg`, branded 404.

### Design system (keep all of it)

- Tokens in `src/app/globals.css` `@theme`: ink `#2d2a2b`, paper `#e9e9ea`,
  paper-2 `#f3f3f3`, blue `#346aea`, lime `#cddd3c`.
- Type: self-hosted licensed Helvetica Neue LT Std (regular width) and
  Helvetica Monospaced Pro. Utility classes `display-hero/1/2/3`, `label-mono`,
  `body-lg/md`.
- Brand mark and wordmark as vector paths in `src/lib/brand.ts`.
- Primitives: `Container`, `Eyebrow`, `Index`, `SectionHeader`
  (`src/components/primitives.tsx`).
- Bands: `ClosingCTA`, `OwnershipBand`, `ProcessStrip`, `Marquee`
  (`src/components/bands.tsx`).
- `CTA`, `TextLink`, `Reveal`, `Header`, `Footer`, `Scheduler`, `ContactForm`.
- `ServicePage` template fed by typed content in `src/lib/services/*.ts`.
- OG image generator `src/lib/og.tsx` (Satori, Helvetica OTFs).

### Problems found at setup

| Problem | Status |
|---|---|
| Copy hard-coded in page TSX | Fixed in Phase 1 |
| `CLAUDE.md` pointed at a missing outline doc as the copy source | Fixed. The Rebrand Spec doc is now the source |
| Mobile menu collapsed to about 3px (backdrop-filter containing block) | Fixed in Phase 1 |
| `init.sh` and progress log carried template placeholders | Fixed at setup |
| Unused create-next-app SVGs in `public/` | Removed in Phase 1 |
| `feature_list.json` acceptance criteria name fonts no longer used | Rewrite in Phase 3 with the new route list |
| Unused agents in `.claude/agents` (data-engineer, prompt-engineer, infra-agent) | Leave. Harmless |

---

## 2. Architecture decisions

### 2.1 Keep the stack and design, change the content layer

No framework or styling change. The rebuild is a content and information
architecture change on top of the existing design system.

### 2.2 Move all rendered copy into typed content modules

New directory `src/content/`, one file per page plus `site.ts` for global copy
(nav, CTA label, footer, meta defaults). Pages import content and render it.
Each file exports a typed object so a missing field fails the typecheck.

```
src/content/
  site.ts          nav, primary CTA, footer, default meta, brand line
  home.ts
  offers/          one file per offer (replaces src/lib/services)
  work/            one file per case study
  about.ts
  approach.ts
  contact.ts
  how-it-works.ts, results.ts   added in Phase 3
```

With a content layer, dropping in new copy is a data edit, copy review targets
one directory, and the copy-rules hook scans `src/content/` and `content/`.

### 2.3 Section components (built in Phase 1)

Pages compose these from `src/components/sections/` and `bands.tsx`. All take
content props.

| Component | Use |
|---|---|
| `Hero` | Home hero with proof line |
| `Marquee` | Capability ticker |
| `PathCards` | Four numbered options, last one on ink (the "problem" section) |
| `LinkRows` | Numbered link rows that invert on hover |
| `CaseCards` | Problem, build, result cards with optional metric |
| `StatementBand` | Ink band with a two-line display headline |
| `ProcessStrip` | Numbered steps, three to five per row |
| `TextSection` | Eyebrow, headline, one paragraph |
| `FaqSection` | Native details/summary FAQ |
| `EditorialRow` | Sticky label left, long-form content right |
| `StageBlock` | One engagement stage in depth, oversized numeral |
| `ClosingCTA` | Lime closing band |

### 2.4 Information architecture (from the Rebrand Spec)

Nav: How it works, What we deliver, Results, About, Insights, and the
"Book a 45-minute call" button.

| Route | Status | Built from |
|---|---|---|
| `/` | Rewrite, ten sections | Existing components plus Quarter Plan exhibit and lead profile |
| `/how-it-works` | New, replaces `/approach` | `StageBlock` or `ProcessStrip`, Quarter Plan anatomy, service standards, `#ownership` anchor, full FAQ |
| `/services` (What we deliver) | Rewrite | Three `EditorialRow` sections (Strategy, Engineering, Your team) with deliverable lists, then `LinkRows` to the five systems |
| `/services/[slug]` | Light edit | Same template. New intro line and a "Where it fits in a Quarter Plan" row |
| `/results` | New | One page, one anchored `EditorialRow` block per case study. Home case cards link to `/results#<slug>` |
| `/about` | Rewrite | Firm, lead profile with photo, how we choose clients |
| `/contact` | Rewrite | New form fields, scheduler after the form, three next steps |
| `/insights` | Keep | No change (see open decision 8) |
| `/approach` | Retire | 308 to `/how-it-works` |
| `/ownership` | Retire | 308 to `/how-it-works#ownership` |

Redirects live in `next.config.ts` `redirects()`. `sitemap.ts`, nav, footer,
and OG images follow the new route list.

### 2.5 Home, section by section

| # | Spec section | Component | Work |
|---|---|---|---|
| 1 | Hero | `Hero` | Make the blue emphasis clause optional |
| 2 | Capability ticker | `Marquee` | Content only |
| 3 | The problem | `PathCards` | Content only, same four-card shape |
| 4 | What the role covers | **`NumberedGrid`** (new, generalizes the About principles grid to two or three columns) | New component |
| 5 | The Quarter Plan | **`QuarterPlanExhibit`** (new) | The signature visual. A paper document on the page: header block (example client, quarter, "Example" stamp), month by month deliverables, scorecard measures, what we need from you. HTML and tokens only, no image |
| 6 | From first call to handover | `ProcessStrip` | Five steps |
| 7 | Results | `CaseCards` | Add an optional link per card |
| 8 | Ownership | `StatementBand` | Make the points list optional |
| 9 | Who you get | **`LeadProfile`** (new) | Photo via `next/image`, name, background list, link to About. Typographic fallback until the photo exists |
| 10 | Closing | `FaqSection` plus `ClosingCTA` | Three-question FAQ, new CTA copy, footer tagline |

### 2.6 Contact form and API

- Fields: name, email, company, role, annual revenue (select with $2M to $5M,
  $5M to $10M, $10M to $25M, over $25M), and "what prompted you to reach out".
  The spec omits email, but the form keeps it so we can reply.
- `/api/contact` validates revenue against the fixed option list and adds role
  and revenue to the notification email.
- Scheduler embed moves below the form. It needs `NEXT_PUBLIC_SCHEDULER_URL`
  pointed at a 45-minute event.
- Rename the analytics event `cta_book_session` to `cta_book_call`.

### 2.7 SEO and structured data

- Default title "Dialed Intelligence | Fractional AI Leadership and
  Engineering", plus the spec's meta description and OG text.
- New `JsonLd` component. `Organization` and `ProfessionalService` on the root
  layout, `FAQPage` on `/how-it-works` built from the same FAQ content module.
- "fractional Chief AI Officer" appears only in the What we deliver intro, one
  FAQ answer, and About, never in the hero.
- Canonical on every route, including `/contact`, which has none today.

---

## 3. Workflow and infrastructure

- **Branching.** All rebuild work lands on `rebuild/fractional-ai`, with
  short-lived feature branches merged into it. `main` stays on the current site
  until launch. Each push produces a Vercel preview for review.
- **Launch.** One PR from `rebuild/fractional-ai` to `main`. CI must be green.
  Merge triggers the production deploy. Rollback is instant through Vercel
  (promote the previous production deployment).
- **Branch protection.** Recommend protecting `main`: require the Quality Gates
  check and a PR. Tyler turns this on (repo settings).
- **Verification per change.** `npm run lint`, `npm run typecheck`,
  `npm run build`, then screenshots of every changed route at 1440 and 390
  (`scripts/screenshot.mjs`) and a check in the preview browser.
- **Copy guardrail.** `.claude/hooks/copy-rules-check.sh` scans `src/content/`.
  Its rules switch to the Rebrand Spec in Phase 4.

---

## 4. Phases

| Phase | Work | Blocked? |
|---|---|---|
| 0. Setup | Clone, verify build, confirm Vercel wiring, branch, this spec | Done |
| 1. Content layer | Every page's copy in `src/content/`, section components extracted, mobile menu fixed, unused assets removed. Verified with an HTML and pixel diff | Done 2026-09-29 |
| 2. New components | `QuarterPlanExhibit`, `NumberedGrid`, `LeadProfile`, `PageHeader`, `JsonLd`, the new form fields and API validation, plus small prop changes (optional hero emphasis, optional band points, linked case cards) | No. Built against the spec's draft copy |
| 3. Routes and redirects | Add `/how-it-works` and `/results`, retire `/approach` and `/ownership` with 308s, new nav and footer, sitemap, OG images | No |
| 4. Copy drop-in | Load the spec's copy into content modules. Remove fixed-price, no-subscription, and "Build it. You own it." language. Update the copy-rules hook and `CLAUDE.md` to the new rules | Partly. Needs the copy listed in section 5 |
| 5. QA and launch | Copy review against the new rules, accessibility and contrast pass, Lighthouse, redirect checks, JSON-LD validation, form test on the preview with Resend, then one PR to `main` | Needs the photo and scheduler URL |

Phases 2 and 3 can run in parallel. Phase 4 starts page by page as copy lands.

### Copy rules hook, Phase 4 change

Swap the banned list to the spec's "Words we avoid" (transform, unlock,
leverage, harness, empower, seamless, robust, cutting-edge, state-of-the-art,
revolutionize, game-changer, supercharge, next-level, journey, landscape,
navigate, ecosystem, AI-powered, intelligent solutions, tailored solutions,
elevate, delve, synergy, holistic). Add warnings for "employee", "hours",
"days per week", and "not X, but Y" constructions. Drop the "Build it. You own
it." on every page rule.

---

## 5. Copy still needed

The Rebrand Spec has final or draft copy for the home page, nav, CTA, FAQ, and
SEO. The build also needs the copy below. I can draft any of it in the spec's
voice for review.

| Page | Missing |
|---|---|
| How it works | Body copy per path step (what you get, what we need), Quarter Plan anatomy text, renewal and exit text, page header |
| What we deliver | Five to six deliverables each for Strategy, Engineering, and Your team |
| Service detail (five) | "Where it fits in a Quarter Plan" block for each. Retire the "Fixed price, fixed scope" label |
| Results | Full write-ups of the three case studies, role held on each |
| About | Two firm paragraphs, lead bio, how-we-choose-clients text |
| Contact | Header subhead, "What happens next" three steps, form labels and messages |
| All inner pages | Meta title, description, and OG text (the spec covers only the home page) |

## 6. Open decisions

| # | Decision | Affects | My default |
|---|---|---|---|
| 1 | Renewal term, a second term of up to 3 months or a 6-month renewal. Your doc has an unanswered comment on this | Path step 4, FAQ | Up to 3 months, per the spec's recommendation |
| 2 | Hero headline, recommended or alternative A or B | Home, OG | Recommended |
| 3 | Discovery project fee, the exact number if shown | Path step 2 | Show it once you pick the number |
| 4 | Lead photo | Home, About | Typographic fallback until it exists |
| 5 | Results as one page with anchors, or a page per case | `/results` | One page |
| 6 | Capacity statement | About | Include while true |
| 7 | Email field on the form (the spec leaves it out) | Contact | Keep it |
| 8 | Insights. The spec says no change, but "The ownership question" argues against subscriptions four times, which conflicts with a monthly fee | `/insights` | Light edit of that post |

## 7. Open technical questions for Tyler

1. Is a 45-minute scheduler event (Calendly or similar) ready to embed?
2. Are the Resend env vars set in Vercel production today?
3. OK to delete the merged `design/r5-brand-assets` branch on GitHub?
4. Turn on branch protection for `main` (require the Quality Gates check)?

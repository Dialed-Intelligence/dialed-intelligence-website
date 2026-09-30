# Rebuild technical spec: fractional AI strategy and engineering

Status: draft, 2026-09-29. Owner: Tyler. Implementation: Claude Code.
Branch: `rebuild/fractional-ai`.

This covers the technical side of the rebuild: what stays, what changes, how
the new strategy gets from the strategy thread into the code, and how it ships.
Positioning, audience, offers, sitemap, and copy come from the **Dialed
Intelligence Rebrand Spec** doc
(https://claude.ai/code/artifact/27a44f53-8900-4356-b35e-81255356ba4b). That
doc replaces the planned `copy-deck.md`.

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

### Problems to fix during the rebuild

1. **Copy is hard-coded in page TSX.** The homepage alone is ~400 lines mixing
   layout and strings. A messaging overhaul means touching every JSX file.
2. **Copy source of truth is missing.** `CLAUDE.md` points at
   `../dialed-intelligence-website-outline.md`, which is not on this machine.
   The rebuild replaces it with a tracked `docs/rebuild/copy-deck.md`.
3. **Mobile menu bug (still open).** The menu panel is `position: fixed` inside
   a header with `backdrop-blur`, which makes the header its containing block,
   so the panel collapses on mobile. Fix by rendering the panel outside the
   blurred element (portal or sibling).
4. **Stale scaffolding.** `init.sh` and the `claude-progress.txt` header still
   carry template placeholders. `feature_list.json` acceptance criteria name
   fonts that are no longer used. The `.claude/agents` set includes agents this
   project does not need (data-engineer, prompt-engineer, infra-agent).
5. **Binding copy rules encode the old positioning.** "Build it. You own it."
   on every page, the ownership manifesto, and "no pricing" all need a decision
   from the strategy thread (section 5).
6. `public/` still holds the create-next-app SVGs (file, globe, next, vercel,
   window). Unused, delete.

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
  ...              final list follows the sitemap in the copy deck
```

Why: the strategy thread delivers copy as structured sections. With a content
layer, dropping in new copy is a data edit, copy review can target one
directory, and the copy-rules hook only needs to scan `src/content/` and
`content/`.

This refactor can happen **before** the strategy lands. Phase 1 moves the
current copy into content modules with zero visual change, verified by
screenshot diff.

### 2.3 Section components as the shared vocabulary

Pages are composed from a fixed set of section types. The copy deck is written
in the same vocabulary, so each deck section maps to one component.

| Section type | Component | Exists today |
|---|---|---|
| Hero | `Hero` (extract from home) | Inline in home |
| Marquee | `Marquee` | Yes |
| Section header + body | `SectionHeader` | Yes |
| Card grid (2 to 5 cards) | `CardGrid` | Inline in home |
| Numbered list rows | `IndexedRows` | Inline in home and services |
| Process steps | `ProcessStrip` (make props-driven) | Yes, copy hard-coded |
| Statement band (dark) | `StatementBand` (generalize `OwnershipBand`) | Partial |
| Case study cards | `CaseCard` | Inline in home as draft vignettes |
| Engagement tiers | `TierCards` | **New** |
| Comparison table | `ComparisonTable` (e.g. fractional vs hire vs agency) | **New** |
| FAQ | `FAQ` (native details/summary) | Inline in ownership |
| Closing CTA | `ClosingCTA` | Yes |

New components follow the existing tokens, type utilities, and `Reveal`
behavior. No new colors or fonts.

### 2.4 Information architecture and redirects

The final sitemap comes from the copy deck. Default proposal for a fractional
model, to react to:

| New route | Purpose | Replaces |
|---|---|---|
| `/` | Positioning, who it is for, offers, proof, CTA | `/` |
| `/services` or `/engagements` | Fractional AI Strategy, Fractional AI Engineering, combined. Cadence, scope, what a month looks like | `/services` |
| `/services/[slug]` | One page per offer, reusing the template | the five product pages |
| `/work` | Case studies (promote the draft engagement vignettes) | new |
| `/approach` | How a fractional engagement runs month to month | `/approach` |
| `/about` | Founder and firm | `/about` |
| `/insights` | Keep as is | `/insights` |
| `/contact` | Keep, CTA and form | `/contact` |

Every retired URL gets a permanent redirect in `next.config.ts` `redirects()`
so existing links and search rankings carry over. Example: the five product
pages redirect to the closest new offer page, `/ownership` to `/approach` or
`/about` unless it survives.

`sitemap.ts` and per-route OG images regenerate from the content modules.

### 2.5 Insights

Keep the markdown pipeline. Review the three existing posts against the new
positioning. Retire, rewrite, or keep each. Retired posts redirect to
`/insights`.

### 2.6 Contact and conversion

Keep the form and API route. Candidates for the strategy thread to decide:
new CTA label (replacing "Book a Working Session"), a qualifying field such as
engagement type or company size, and whether the scheduler embed goes live
(`NEXT_PUBLIC_SCHEDULER_URL`). Confirm that `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are set in Vercel production.

### 2.7 SEO and metadata

Per-page title and description live in the content modules. Add JSON-LD
`Organization` and `ProfessionalService` on the root layout. Keep canonical
URLs on the apex domain and confirm `www` redirects to it.

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
- **Copy guardrail.** Update `.claude/hooks/copy-rules-check.sh` to the new
  rules once the deck defines them, and point it at `src/content/`.

---

## 4. Phases

| Phase | Work | Blocked on strategy? |
|---|---|---|
| 0. Setup | Clone, verify build, confirm Vercel wiring, branch, this spec | Done |
| 1. Content layer | Extract every page's copy into `src/content/`, extract section components, fix mobile menu, delete unused assets, fix `init.sh`. No visual change | Done 2026-09-29 |
| 2. New components | `TierCards`, `ComparisonTable`, `CaseCard`, props-driven `ProcessStrip` and `StatementBand`, built against placeholder content | Partly (confirm which are needed) |
| 3. IA and redirects | New routes, retire old ones, redirects, sitemap, nav | Yes, needs sitemap |
| 4. Copy drop-in | Load the copy deck into content modules, update meta and OG, update copy rules and hook, update `CLAUDE.md` | Yes, needs copy deck |
| 5. QA and launch | Copy review, a11y and contrast pass, Lighthouse, redirect check, form test on preview, PR to main | No |

---

## 5. Decisions needed from the strategy thread

1. Final sitemap and nav labels.
2. Offer structure: how many offers, names, what is in each, cadence
   (retainer, sprint, hybrid).
3. Pricing on the site or not. The current rules ban it. Fractional sites often
   show a starting monthly rate.
4. Does "Build it. You own it." and the ownership angle survive? If not, the
   `/ownership` page, `OwnershipBand`, and copy rule 8 go.
5. Primary CTA label and destination.
6. Case studies: which, how named, which metrics are cleared to publish.
7. Updated binding copy rules (keep the current list, edit, or replace).
8. Voice: "we" as a firm, or first person as a fractional lead.

## 6. Open technical questions for Tyler

1. Where is `dialed-intelligence-website-outline.md`? Useful as reference for
   the old copy, not required.
2. Is the scheduler (Calendly or similar) ready to embed?
3. Are the Resend env vars set in Vercel production today?
4. OK to delete the merged `design/r5-brand-assets` branch on GitHub?

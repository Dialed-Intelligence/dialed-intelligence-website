# Dialed Intelligence Website

> **Rebuild in progress (branch `rebuild/fractional-ai`).** Build plan and
> status in `docs/rebuild/technical-spec.md`. `main` still serves the old site.

## Project Overview
Marketing website for Dialed Intelligence, a fractional AI leadership and
engineering firm for owner-led and PE-backed businesses doing $2M to $25M.
A senior AI lead joins the client's team on a written quarterly plan, sets the
strategy, builds the systems, and hands them over. Static-first Next.js site,
copy-driven.

**Source of truth for positioning, sitemap, and copy:** the Dialed
Intelligence Rebrand Spec doc
(https://claude.ai/code/artifact/27a44f53-8900-4356-b35e-81255356ba4b, read it
with the Claude Docs connector). Never invent copy that contradicts it.

## Tech Stack
- Language: TypeScript 5 / Node 20+
- Framework: Next.js 16 (App Router, static generation) + React 19
- Styling: Tailwind CSS 4
- Content: Markdown files in `content/insights/` for the Insights section
- Testing: `npm run build` is the primary gate (static site). Add vitest only when logic warrants it.
- Linting: ESLint 9 (eslint-config-next) + `npm run typecheck`
- Hosting: Vercel (dialedintelligence.com)

## Directory Structure
- src/app/          routes (App Router) — one folder per page. Pages compose sections, they hold no copy
- src/content/      ALL rendered copy, one typed module per page (+ site.ts for nav, CTA, footer, bands, services/ for the service pages). Edit copy here
- src/components/   shared chrome and bands (ClosingCTA, StatementBand, ProcessStrip, Marquee), service page template
- src/components/sections/  reusable page sections (Hero, PathCards, LinkRows, CaseCards, TextSection, FaqSection, EditorialRow, StageBlock)
- src/lib/          utilities (pageMetadata, OG image, markdown loading for insights)
- content/insights/ markdown posts for /insights
- public/           static assets, OG images
- .claude/          agent configuration (DO NOT modify during development sessions)

## Sitemap
`/`, `/how-it-works`, `/services` (What we deliver), `/services/[slug]` (five
systems: operations-automation, data-systems, automation-platform, inventory,
pricing), `/results`, `/about`, `/insights`, `/insights/[slug]`, `/contact`.
Plus `sitemap.xml` and `robots.txt`. `/approach` and `/ownership` are retired
and 308 to `/how-it-works` (see `next.config.ts`).

## Commands
- Install deps:     npm install
- Dev server:       npm run dev        (http://localhost:3000)
- Lint:             npm run lint
- Typecheck:        npm run typecheck
- Production build: npm run build      (the smoke test — must pass before any commit)
- Environment check: bash init.sh

## Copy rules (from the Rebrand Spec, partly enforced by hook)
`.claude/hooks/copy-rules-check.sh` flags the deterministic subset. The
copy-editor agent owns the judgment calls.

1. Firm voice ("we"), active voice, present tense. The lead is named in third
   person (Tyler Dial) where the page is about the lead.
2. No em dashes, semicolons, or colons in rendered copy. Headlines never end in
   a colon setup.
3. One idea per sentence. Most sentences under 20 words.
4. Specifics over adjectives. Numbers wherever a number exists.
5. No "not X, but Y" contrast constructions, no stacked groups of three
   adjectives, no rhetorical questions in headlines.
6. Words to avoid: transform (metadata and one FAQ answer only), unlock,
   leverage, harness, empower, seamless, robust, cutting-edge,
   state-of-the-art, revolutionize, game-changer, supercharge, next-level,
   journey, landscape, navigate, ecosystem, AI-powered, intelligent solutions,
   tailored solutions, elevate, delve, synergy, holistic.
7. Never publish hours, days per week, or response-time percentages about our
   availability. Describe availability as service standards and value as
   Quarter Plan deliverables.
8. Never use "employee". Say "on your team", "embedded", "part of your
   leadership team".
9. No fixed-price or no-subscription claims. Ownership stays central. The
   client owns code, data, documentation, and accounts.
10. Primary CTA is "Book a 45-minute call". Buttons say what happens.
11. "fractional Chief AI Officer" appears only in the What we deliver intro,
    one FAQ answer, and About. Never in the hero. Page copy says "AI lead".
12. No pricing except the discovery project fee, once Tyler sets it.
13. Never name Activepieces or any white-labeled component, anywhere.
14. Sentence case headlines.

## Design Constraints
- Static-first, minimal client JS, fast LCP. Server components by default;
  `"use client"` only where interactivity demands it.
- Accessibility floor: visible focus states, sufficient contrast,
  prefers-reduced-motion respected, semantic landmarks.
- Unique title + meta description per page (no colons in them either).
- Service detail pages are ONE shared template fed by content props.
- Pages compose sections from `src/components/sections/`. New visuals follow
  the existing tokens and type. Never use AI imagery (brains, circuits, robots,
  sparkles, gradients, glowing orbs), stock photos, or template icon sets.

## Workflow Sequence
Each feature follows this pipeline. Do not skip steps.

1. **frontend-dev** (or **backend-dev** for the contact form API) implements on a feature branch and commits
2. **copy-editor** reviews all rendered copy against the copy rules and the Rebrand Spec (read-only)
3. **qa-agent** verifies acceptance criteria from feature_list.json and updates it
4. **code-reviewer** reviews the diff (read-only)
   - Must Fix items → loop back to the implementing agent
5. **security-reviewer** audits before PR (read-only) — mainly the contact form route and any headers/config
6. Open a PR. GitHub Actions runs lint, secret scan, and the production build
7. After CI passes and reviews are clean, merge with `gh pr merge --squash --delete-branch`

## Agent Domain Routing
- frontend-dev: pages, components, styling, markdown rendering — most of the work here
- backend-dev: the contact form route handler (validation, spam protection, email delivery), sitemap/robots generation
- copy-editor: reviews rendered copy against the Rebrand Spec and the copy rules (read-only)
- qa-agent: verifies features against feature_list.json acceptance steps
- code-reviewer: post-implementation quality review (read-only)
- security-reviewer: security audit before PRs (read-only)

When implementing features that span multiple domains, spawn parallel agents
for independent work. Run sequentially when tasks depend on each other.

## Parallelism Rules
Run agents in parallel when tasks are in independent domains.
Run agents sequentially when:
- Task B depends on output from Task A
- Tasks touch the same files
- One task is a review of another's output
Build shared components BEFORE the pages that consume them.

## Definition of Done
A feature is complete ONLY when ALL of the following are true:
1. `npm run lint` passes with zero warnings
2. `npm run typecheck` passes
3. `npm run build` succeeds (static generation completes for every route)
4. Copy matches the Rebrand Spec and violates none of the copy rules
5. No secrets or credentials appear in any diff
6. feature_list.json shows "passes": true for the feature
7. code-reviewer reports no Must Fix items
8. security-reviewer reports no CRITICAL findings
9. A descriptive commit has been written
10. claude-progress.txt has been updated

## Forbidden Operations (all agents)
- rm -rf on any path
- Direct commits to main branch
- Writing to .env files or any secrets directory
- Deploying to production (`vercel --prod`) — human-triggered only
- Naming Activepieces or any white-labeled vendor in any file that ships
- Pushing directly to `main`. Merging to `main` deploys production

## Context Management
- Run /compact when context reaches approximately 50 percent
- Each agent session must end with a claude-progress.txt update
- Run /clear before switching to an unrelated task mid-session

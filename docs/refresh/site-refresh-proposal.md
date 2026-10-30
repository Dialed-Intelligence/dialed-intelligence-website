# Site refresh proposal

October 2026. Branch `feature/team-and-site-refresh`.

Goal: keep the colors, type, logo, and most of the copy. Make the site sell
both halves of the business (AI strategy and AI engineering), feel more
expansive, fix the spacing, and add stronger visuals. Ampleo.com is the main
reference.

Proposed copy below follows the CLAUDE.md copy rules. Nothing ships until you
approve it. Once approved, it should also go into the Rebrand Spec doc, since
that is the source of truth.

---

## 1. Keep as is

- Hero headline. "Senior AI leadership, without the full-time hire." It already
  covers both halves of the business.
- The Quarter Plan exhibit. It is the most distinctive thing on the site.
- The ownership band, the lime closing CTA, the bracketed `[01]` indexes, the
  square eyebrow tick, the iD mark.
- Colors and fonts.

## 2. The messaging gap

The site sells the seat well: a senior AI lead in place of a full-time hire.
It undersells the strategy half from the strategy call:

| From the strategy call | On the site today |
| --- | --- |
| Interviews across every department before recommending anything | One line on How it works |
| A 6 to 12 month AI roadmap | Not mentioned |
| A cost and return model for every project | "Rank them by return," one card |
| "What is not worth spending money on" | One About principle |
| Growth without adding headcount at the same rate | Not mentioned |
| Value at sale (EBITDA times a multiple) | Not mentioned |
| Price us against a full-time AI hire | One FAQ answer |
| Governance and who owns each system | "AI policy" in the marquee |
| A team, not one person | Lead profile only |

Ampleo repeats one idea in nearly every section: leadership backed by
execution. We have the execution story. The fix is to make the leadership
story just as concrete, using the same framing everywhere. **One engagement,
two jobs. Decide what is worth funding. Then build it and hand it over.**

On "organizational transformation." The word "transformation" is on the banned
list, and it reads generic anyway. Say what actually changes. Who decides which
AI to fund, who owns each system, and the rules for how the company uses AI.

## 3. Home page, section by section

Proposed order. New sections marked NEW.

1. Hero (edited subhead and proof points)
2. Marquee (two new items)
3. The problem, as a comparison table (rebuilt)
4. NEW "Two jobs" panel (replaces "What the role covers")
5. NEW "Pay for itself on paper first" with an Opportunity Model exhibit
6. The Quarter Plan (keep)
7. From first call to handover (keep, tighter)
8. Results (keep, add metrics as clients approve them)
9. NEW "Planning a sale" band
10. Ownership band (keep)
11. FAQ (two new questions)
12. Closing CTA (keep)

The "Who you get" lead profile is gone from home. It now lives on About as the
Team section (done in this branch).

### 3.1 Hero

Title and eyebrow stay.

**Subhead, before.**
> Dialed Intelligence places a fractional AI lead inside businesses doing $2M
> to $25M a year. We set the strategy, build the systems, and train your team
> to run them. Every quarter starts with a written plan of what we will
> deliver.

**Subhead, after.**
> We work inside businesses doing $2M to $25M a year. We find the AI projects
> that will pay for themselves and put a number on each one. Then we build
> them, and your team runs them after we leave.

**Proof points, after.**
- A cost and payback date for every project
- Working systems in the first 90 days
- You own everything we build

### 3.2 Marquee

Add `AI ROADMAPS` and `ROI MODELS`. Drop `PRICING` (still covered on the
services page).

### 3.3 The problem, as a comparison table

Keep the title. "You need someone to own AI. You probably do not need them
full time."

Replace the four equal cards with a table. Ampleo leans on this comparison,
and a table is a stronger visual than four boxes.

| | Full-time hire | Consultancy | More software | Dialed Intelligence |
| --- | --- | --- | --- | --- |
| Sets the AI strategy | If you find the right person | Yes | No | Yes |
| Builds the systems | Sometimes | Your team does | One slice each | Yes |
| Puts a return on each project | Rarely | Sometimes | No | Every project |
| Time to start | Months to hire | A few weeks | Days | Two weeks of discovery |
| What you commit to | Salary, benefits, recruiting fee | A project fee | A seat license, every year | One quarter at a time |
| Who runs it afterward | The hire | Your team, untrained | The vendor | Your team, trained |

The Dialed Intelligence column sits on ink, like the current fourth card.

### 3.4 NEW. Two jobs

Replaces "What the role covers." One large ink panel (Ampleo style) holding
two cards side by side.

- Eyebrow. **What we do**
- Title. **We decide what is worth building. Then we build it.**

**Left card. Decide.** "A plan your leadership team can fund."
- Interviews with operations, sales, finance, and the rest of your leads
- A map of where time and margin go today
- A 6 to 12 month AI roadmap, in order
- A cost and return model for every project
- A short list of projects to skip, with the reasons
- Rules for how your company uses AI, and who owns each system

**Right card. Build.** "Systems in production, run by your people."
- Automation for the repetitive work between your systems
- One source of truth for sales, operations, and finance data
- AI agents for defined tasks, with a person approving exceptions
- Forecasting and pricing models
- Tests, monitoring, and documentation
- Training for the people who take over

**Line under the panel.**
> When one firm plans and another builds, the plan gets lost in the handoff.
> The person who sizes your project is the person who ships it.

Link. "What we deliver"

### 3.5 NEW. Pay for itself on paper first

Split layout like the Quarter Plan section. Text left, exhibit right.

- Eyebrow. **How we choose projects**
- Title. **Every project has to pay for itself on paper first.**
- Body.
  > Before we build anything, we model what it costs to build and run, what it
  > saves or earns, and how long it takes to pay back. Leadership funds the
  > projects that clear the bar. The rest go on a list of things not to buy,
  > with the reasons.

Second paragraph, for the headcount point from the call.
  > Most of the return is capacity. Your team handles more orders, more
  > leads, and more customers without a new hire for every step up in
  > revenue.

**Exhibit. "Opportunity Model"** (styled like the Quarter Plan document, with
the same "Example" stamp)

| Project | Annual return | Payback | Call |
| --- | --- | --- | --- |
| Order entry automation | 1,100 staff hours | 4 months | Build |
| Reorder forecasting, top 200 products | Fewer stockouts and less dead stock | 7 months | Build |
| Call summaries for the sales team | 300 staff hours | 2 months | Buy off the shelf |
| Website chatbot | No measurable return | Not modeled | Skip |

Caption. "An example for illustration. Every model is built from your
numbers."

The "Skip" row matters. It shows we will tell a client not to spend money,
which is the line from the call that sells the strategy half best.

### 3.6 NEW. Planning a sale

Speaks to owners planning an exit and to PE operating partners. Paper-2
background, big number on the right.

- Eyebrow. **Planning a sale**
- Title. **Savings that show up in your sale price.**
- Body.
  > Buyers usually price a business on a multiple of its earnings. A system
  > that takes $100K a year of cost out of the business can add several times
  > that to what a buyer will pay. We record the baseline and the result for
  > every system, so the gain holds up in diligence.
  >
  > It works best when the sale is at least six to nine months out. That
  > leaves time to build the system, run it, and prove the result.
- Fine print.
  > Multiples vary by industry, size, and buyer. We model a range and show our
  > assumptions. We do not promise a sale price.
- Figure (mono, large). `$100K a year × 6 to 8 times earnings = $600K to $800K`
  with the label "An illustration."
- Link. "Read the PE-backed operator write-up" to the skilled-nursing case.

Open question for you. Are you comfortable with the illustration numbers on
the site? They come straight from the call. The fine print keeps them honest.

### 3.7 FAQ, two new questions

**Should we hire a full-time AI lead instead?**
> Sometimes, yes. If AI work will keep a senior person busy full time for
> years, hire one. We will tell you during discovery, and we can help you
> write the role and interview candidates.

**Can we hire you for the strategy only?**
> Yes. Some clients take the discovery project and the roadmap to their own
> team or another vendor. Most keep us on to build, because the person who
> sized each project already knows how to ship it.

Show these two on home in place of "Do you bill by the hour?" and "What
happens when it ends?". Keep "How long do engagements last?".

### 3.8 Other pages

- **How it works, step 02.** Change "What you get" to "A cost and return
  model for each opportunity and a draft Quarter Plan, yours to keep." Add
  "Interviews with each department lead" to the step body.
- **What we deliver.** Add "A 6 to 12 month AI roadmap" and "A list of
  projects to skip, with the reasons" to the Strategy group.
- **Results.** This is the largest credibility gap next to Ampleo, which shows
  logos, counts, and named quotes. Ask each of the three clients for one
  approved number and one short quote, even unnamed ("COO, PE-backed
  skilled-nursing operator").
- **About.** Team section is in (see section 6).

### 3.9 AI-tell check

Every line above was written against these, on top of the CLAUDE.md rules.

- No "not just X, it is Y" turns and no "Whether you are..." openers
- No triplets used for rhythm. Lists exist only where the items are real
- No "In today's...", "it is no secret", "at the end of the day"
- No abstract nouns where a number fits (hours, months, $100K)
- No intensifiers (truly, really, incredibly) and no "simply"
- Plain verbs. Find, build, run, skip, pay back
- Specific objects. Order entry, reorder forecasting, call summaries

## 4. Visual and spacing audit

Measured on the live site at 1440px wide.

### What looks sloppy and why

1. **Every section is the same.** All sections use 96px / 128px padding with
   a hairline on top, and 9 of 11 home sections sit on the same light grey.
   The page reads as one long column. Ampleo alternates light and dark
   sections and puts content in large rounded panels, so each section feels
   like its own room.
2. **Hollow cards.** The problem cards put 80px between `[01]` and the
   heading. The numbered grid uses 64px. The process strip forces each step
   to 300px tall. Text sinks to the bottom of mostly empty boxes.
3. **Hero.** The iD mark sits alone on the right with a lot of dead space
   around it. The three proof points are small mono text pinned to the bottom
   edge, easy to miss.
4. **Floating links.** Section headers put the headline on the left and the
   link at the far right edge. On wide screens the link drifts away from what
   it belongs to.
5. **Line lengths vary** between sections (`max-w-md`, `max-w-xl`,
   `max-w-2xl` all used for body text).
6. **No imagery.** The only picture-like element was the "TD" placeholder.

### Fixes

- **8pt spacing scale, three section sizes.** Compact 64 / 80px, standard
  96 / 128px, feature 128 / 160px. Inside cards use 16, 24, 32, 48 only.
  Index to heading becomes 32px everywhere.
- **Background rhythm on home.** Paper, ink (Two jobs panel), paper-2
  (Opportunity Model), paper (Quarter Plan), paper-2 (Planning a sale), ink
  (Ownership), lime (Closing). Drop the hairline wherever the background
  changes.
- **Hero.** Replace the lone mark with a cropped Opportunity Model or Quarter
  Plan exhibit on the right, or a real photo once you have one. Move the proof
  points up under the CTA as a row with blue ticks.
- **Links under headlines.** Put section links directly under the headline,
  or under the content, never pinned to the far edge.
- **One prose width.** 40rem for body text site wide.

### Stronger visuals, within the brand rules

CLAUDE.md rules out AI imagery, stock photos, and template icon sets. That
still leaves a lot.

1. **Document exhibits as the signature.** The Quarter Plan works. Add the
   Opportunity Model and a monthly Scorecard in the same style. They show the
   work instead of describing it.
2. **Real photography.** This is the biggest upgrade, per the video and per
   Ampleo's hero. Book a half-day shoot. Both of you at a client site, at a
   whiteboard, on a warehouse floor, at a laptop with a sanitized dashboard.
   Natural light. These go in the hero, the Team section, and Results.
3. **A numbers band.** Once clients approve metrics, a row of three or four
   large figures (Ampleo's stat cards). Until then, do not fake it.
4. **The iD mark as a graphic device.** Large crops of the mark in ink panels
   and on lime, as the closing CTA already does.
5. **Sanitized screenshots of real systems** on Results, in a simple browser
   frame.

### Give every color one job

| Color | Job |
| --- | --- |
| Ink `#2d2a2b` | Text, dark bands, dark panels |
| Paper `#e9e9ea` / Paper-2 `#f3f3f3` | Base backgrounds, alternating |
| Blue `#346aea` | Primary buttons, links, index numbers, ticks |
| Lime `#cddd3c` | One moment per page. The closing CTA and emphasis on ink. Never text on a light background |

## 5. How to use Claude Design for this

Claude Design is good at layout and visual exploration. It is bad at holding
copy rules, so give it final copy and keep copy decisions here.

1. **Load the brand first.** Give it this repo, or at least
   `src/app/globals.css`, the logo SVG from `src/lib/brand.ts`, and the font
   files in `public/fonts`. Ask it to build a design system from them and
   tell it nothing in the palette or type changes.
2. **Build the inspiration board.** Ampleo plus two or three others, each
   with one named trait. Suggestions:
   - Ampleo. Alternating light and dark sections, big rounded panels, the
     comparison framing, stat cards.
   - Mercury. Restraint, generous whitespace, calm type hierarchy.
   - Ramp. Leading with numbers and savings, product shown as evidence.
3. **Design three sections, not the whole site.** Start with the hero, the
   Two jobs panel, and the Opportunity Model exhibit. Ask for two or three
   variations of each. Pick, then move to the next three.
4. **Paste the copy from section 3.** If it writes its own copy, the AI tells
   come back.
5. **Check at 1440 and 390 wide** before handing off.
6. **Hand off to Claude Code.** Bring the design link back to a session in
   this repo. Each section becomes a component in
   `src/components/sections/` with its copy in `src/content/`, which keeps
   the build gates and the copy hook in play.

### Prompt to paste into Claude Design

```
Redesign three sections of dialedintelligence.com, a fractional AI strategy
and engineering firm for owner-led and PE-backed businesses doing $2M to $25M.
Audience: owners, CEOs, and PE operating partners. Tone: senior, plain, calm.

Brand (do not change):
- Colors. Ink #2d2a2b for text and dark panels. Paper #e9e9ea and
  #f3f3f3 for backgrounds. Blue #346aea for buttons, links, and index
  numbers. Lime #cddd3c for one moment per page only.
- Type. Helvetica Neue LT Std (500 for headlines, 400 for body, body
  17 to 19px). Helvetica Monospaced Pro, uppercase, for labels and data.
- Details. Bracketed indexes like [01]. A 7px blue square before eyebrows.
  5px corner radius. The iD logo mark as a large cropped graphic.

Reference sites (inspiration only, do not copy):
- ampleo.com. Alternating light and dark sections, content inside large
  rounded dark panels, a comparison of hiring options, stat cards.
- mercury.com. Restraint, whitespace, calm type hierarchy.
- ramp.com. Numbers first, the product shown as proof.

Layout:
- 8pt spacing only. Section padding 64/80, 96/128, or 128/160px.
  Inside cards 16, 24, 32, 48px.
- Break the single centered column. Use split layouts and asymmetric grids.
- Body text never wider than 40rem.

Never use: gradients, glowing orbs, brains, circuits, robots, sparkles,
stock photos, or icon sets. Use document-style exhibits (tables, plans,
scorecards) as the main visuals. Leave marked slots for real photography.

Sections, with final copy below. Use the copy exactly.
1. Hero. [paste 3.1]
2. Two jobs panel. [paste 3.4]
3. Opportunity Model section with exhibit. [paste 3.5]

Give me two variations of each section at 1440px and 390px.
```

## 6. Team section (done in this branch)

- Moved off home. Now on About as "The two people you will work with."
- **Tyler Dial**, Founder and Senior AI Engineer. Bio and background carried
  over from the old lead profile.
- **Michael Jarvis**, Head of Client Engagement. I chose this over "Senior
  Client Engagement Officer" because "Head of" reads as a senior seat at a
  small firm, and "Officer" titles read as large-company. Bio describes his
  role (first point of contact, discovery interviews, monthly scorecard
  review). It needs his background list before launch.
- Headshots. Drop them in `public/team/` and set `photo` on each entry in
  `src/content/about.ts`. 4:5 portrait, at least 1200px tall. The layout does
  not shift when they land.

One thing to weigh. "Senior AI Engineer" sells the build half. If you want
your title to carry the strategy half too, "Founder and AI Lead" (the current
site wording) does that. Your call.

## 7. Decisions needed

1. Approve the home copy direction in section 3, or mark changes.
2. Michael's title, and his background (three or four lines).
3. Keep the sale-price illustration numbers on the site, or show the logic
   without numbers.
4. Book the photo shoot.
5. Your LinkedIn profile URL or an exported résumé, if you want more detail in your background
   list.

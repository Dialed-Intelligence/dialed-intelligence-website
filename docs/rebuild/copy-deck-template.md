# Copy deck template

Paste this into the strategy thread and ask it to return a filled copy deck in
this exact structure. Save the result as `docs/rebuild/copy-deck.md`. Every
section uses one of the section types below, so each maps directly to a
component on the site. The visual design stays the same. Only the words and the
page structure change.

---

## Section types available

| Type | Fields |
|---|---|
| `hero` | eyebrow, headline (one clause can be highlighted in blue), subhead, primary CTA label, secondary link label + target, 2 to 4 proof points (short, mono caps style) |
| `marquee` | 5 to 8 short uppercase phrases that scroll |
| `section` | eyebrow, headline, 1 to 3 body paragraphs |
| `cards` | eyebrow, headline, 2 to 5 cards. Each card has title, 1 to 2 sentence body, optional link |
| `rows` | eyebrow, headline, numbered rows. Each row has title, one-line summary, body, optional duration, optional link |
| `process` | eyebrow, headline, 3 to 5 steps. Each step has name, one-line description, duration |
| `statement` | one large statement on a dark band, optional supporting line |
| `tiers` | eyebrow, headline, 2 to 3 engagement tiers. Each tier has name, who it is for, what is included (list), cadence, optional price |
| `comparison` | headline, 2 to 4 columns (for example fractional vs full-time hire vs agency), rows of attributes |
| `case` | client descriptor (anonymized), problem, what was built, outcome, optional metric |
| `faq` | question and answer pairs |
| `cta` | headline, supporting line, button label |

---

## Deck structure

```markdown
# Copy deck

## Global
- Positioning line (one sentence):
- Brand line (short, reused across pages):
- Voice: "we" or "I"
- Primary CTA label:
- Primary CTA destination: /contact or scheduler
- Nav items (label and route, in order):
- Footer line:

## Copy rules
- (Keep, edit, or replace the current binding rules. List the final set.)

## Sitemap
| Route | Page title | Purpose |
|---|---|---|

## Redirects
| Old route | New route |
|---|---|
| /services/data-systems | |
| /services/operations-automation | |
| /services/automation-platform | |
| /services/inventory | |
| /services/pricing | |
| /ownership | |

## Page: /
- Meta title:
- Meta description (under 160 characters):
- OG headline:

### 1. hero
...

### 2. cards
...

(Repeat "## Page" for every route in the sitemap.)
```

---

## Current routes, for reference

`/`, `/services`, five service pages, `/ownership`, `/approach`, `/about`,
`/insights`, `/contact`. See `technical-spec.md` section 2.4 for a proposed
fractional sitemap to react to, and section 5 for the decisions the deck
needs to settle.

/**
 * Shared shapes for page content. Every string a visitor can read lives in
 * src/content/ (or content/insights for posts) and is typed here, so a
 * missing field fails the typecheck instead of shipping a blank.
 */

/** Title and description for <head>. No colons or semicolons. */
export interface PageMeta {
  title: string;
  /** Under 160 characters. */
  description: string;
  canonical?: string;
}

/** Copy for a route's generated Open Graph image. */
export interface OgCopy {
  eyebrow: string;
  title: string;
  alt: string;
}

export interface LinkCopy {
  label: string;
  href: string;
}

/** Eyebrow and headline for a section, with an optional right-side link. */
export interface SectionIntro {
  eyebrow: string;
  title: string;
  link?: LinkCopy;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface Step {
  title: string;
  duration: string;
  body: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface LinkCard {
  href: string;
  title: string;
  desc: string;
}

export interface CaseStudy {
  /** Anchor on /results. */
  slug: string;
  client: string;
  /** The role we held, e.g. "Strategy and engineering". */
  role: string;
  problem: string;
  system: string;
  outcome: string;
  /** Quantified result. Renders only when present. */
  metric?: string;
}

/** Labels for the problem, build, result lines on a case card. */
export interface CaseLabels {
  problem: string;
  system: string;
  outcome: string;
  /** Link text to the full write-up. Omit to render cards without links. */
  more?: string;
}

/** A case study with its full write-up for /results. */
export interface CaseStudyFull extends CaseStudy {
  context: string[];
  build: string[];
  result: string[];
  owns: string;
}

export interface ClosingCtaCopy {
  eyebrow: string;
  title: string;
  body: string;
}

export interface StatementBandCopy {
  eyebrow: string;
  /** Rendered as two lines, the second in the accent color. */
  titleLines: [string, string];
  body: string;
  points?: string[];
  link?: LinkCopy;
}

/** A group of concrete deliverables, e.g. the Strategy part of the role. */
export interface DeliverableGroup {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

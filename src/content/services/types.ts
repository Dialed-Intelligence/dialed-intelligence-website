export interface ServiceBeat {
  label: string;
  text: string;
}

/** One phase of a build, with its week range. */
export interface ServicePhase {
  /** e.g. "Weeks 1 to 2" */
  weeks: string;
  name: string;
  body: string;
}

export interface Service {
  slug: string;
  title: string;
  eyebrow: string;
  /** Problem-first display headline. Sentence case. No colons or semicolons. */
  headline: string;
  /** One-sentence problem statement, used on the services hub. */
  problemStatement: string;
  /** Short description for home page cards. */
  card: string;
  metaTitle: string;
  /** Meta description. No colons, no semicolons, under 160 characters. */
  metaDescription: string;
  /** "The problem" paragraphs */
  problem: string[];
  /** "What we build" paragraphs */
  build: string[];
  /** "What you get" paragraphs, ending with how we keep it running */
  get: string[];
  /** "How we build it", the phased plan with week ranges */
  approach: {
    intro: string;
    phases: ServicePhase[];
  };
  /** Concrete things the client receives, listed under "What you get" */
  deliverables: string[];
  /** What we need from the client */
  needs: string[];
  /** Scorecard measures for this system */
  measures: string[];
  /** "What it looks like in practice" walkthrough */
  practice: {
    intro: string;
    beats: ServiceBeat[];
  };
  engagement: {
    /** Typical build time, e.g. "Three to five weeks" */
    duration: string;
    /** Where the system fits in a Quarter Plan. */
    body: string;
  };
}

export interface ServiceBeat {
  label: string;
  text: string;
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
  /** "What you get" paragraphs, ending with the ownership restatement */
  get: string[];
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

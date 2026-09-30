import type {
  ClosingCtaCopy,
  PageMeta,
  StatementBandCopy,
  Step,
} from "./types";

export const site = {
  name: "Dialed Intelligence",
  url: "https://dialedintelligence.com",
  email: "tyler@dialedintelligence.com",
  // Update with the firm's real LinkedIn URL before launch.
  linkedin: "https://www.linkedin.com/company/dialed-intelligence",
  // Set to a Calendly (or equivalent) scheduling URL to enable the
  // embedded scheduler on /contact. Leave empty to show the form only.
  schedulerUrl: process.env.NEXT_PUBLIC_SCHEDULER_URL ?? "",
  location: "Chicago based, working nationally.",
  positioning:
    "We diagnose like a consultancy. We deliver like a product team. You own the result.",
  brandLine: "Build it. You own it.",
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Ownership", href: "/ownership" },
  { label: "Approach", href: "/approach" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export const ctaLabel = "Book a Working Session";
export const ctaHref = "/contact";

/** Site-wide default title and description, set on the root layout. */
export const defaultMeta: PageMeta & { titleTemplate: string } = {
  title:
    "Dialed Intelligence | We find what is costing you most, then build the system that fixes it",
  titleTemplate: "%s | Dialed Intelligence",
  description:
    "Strategy and engineering in one firm. We diagnose the problem, build the AI that solves it, and hand it over. You own it outright.",
};

export const skipLinkLabel = "Skip to content";

export const header = {
  primaryNav: "Primary",
  mobileNav: "Mobile",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

export const footer = {
  homeLabel: "Dialed Intelligence home",
  firmHeading: "Firm",
  servicesHeading: "What we build",
  contactHeading: "Contact",
  contactLabel: "Contact",
  linkedinLabel: "LinkedIn",
  tagline: "Strategy that ends in a running system. Owned by you.",
};

/** Default copy for the lime closing band at the bottom of most pages. */
export const closingCta: ClosingCtaCopy = {
  eyebrow: "The first step",
  title: "Bring us the question you can't answer.",
  body: "The first hour is free, it is a working session rather than a sales call, and you will leave with something useful either way.",
};

/** The ink statement band on Home. */
export const ownershipBand: StatementBandCopy = {
  eyebrow: "The deal, in four words",
  titleLines: ["Build it.", "You own it."],
  body: "No seats. No recurring license. No platform to learn. We build the system, we hand you the keys, and we step back as far as you want.",
  // Handover durability, stated as features rather than buried. Answers the
  // "what happens when it breaks and you are gone" objection.
  points: [
    "We hand it over documented and tested, not as a black box.",
    "Your team gets the walkthrough and the docs to run it without us.",
    "Support stays optional and never becomes a subscription you cannot leave.",
  ],
  link: { label: "Why we work this way", href: "/ownership" },
};

/** The engagement strip, used on Home. */
export const processSteps: Step[] = [
  {
    title: "Working session",
    duration: "One hour, free",
    body: "A free hour where we name the single question worth the most to answer in your business. You leave with at least one useful observation whether or not we ever talk again.",
  },
  {
    title: "Diagnostic",
    duration: "One to two weeks",
    body: "A short fixed-fee engagement built around one output, the expected return. We quantify the problem, set a fixed price and a timeline, and put the return you can expect on paper before you commit to a build.",
  },
  {
    title: "Build",
    duration: "Three to eight weeks",
    body: "Fixed price, fixed scope. You see working software early and often, not a reveal at the end.",
  },
  {
    title: "Handover and support",
    duration: "Yours from day one",
    body: "You own the delivered system. Optional support keeps it healthy without ever becoming a subscription you resent.",
  },
];

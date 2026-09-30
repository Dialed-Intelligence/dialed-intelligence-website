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
    "A senior AI lead on your team. A written plan every quarter. Systems you own.",
  brandLine: "You own what we build.",
};

export const nav = [
  { label: "How it works", href: "/how-it-works" },
  { label: "What we deliver", href: "/services" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export const ctaLabel = "Book a 45-minute call";
export const ctaHref = "/contact";
/** Analytics event for every primary CTA click. */
export const ctaEvent = "cta_book_call";

/** Site-wide default title and description, set on the root layout. */
export const defaultMeta: PageMeta & { titleTemplate: string } = {
  title: "Dialed Intelligence | Fractional AI Leadership and Engineering",
  titleTemplate: "%s | Dialed Intelligence",
  description:
    "A fractional AI lead for businesses doing $2M to $25M. We set the strategy, build the systems, and train your team to run them. You own what we build.",
};

/** Organization and ProfessionalService structured data, on every page. */
export const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      email: site.email,
      logo: `${site.url}/icon.svg`,
      sameAs: [site.linkedin],
      founder: { "@type": "Person", name: "Tyler Dial" },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.name,
      url: site.url,
      description: defaultMeta.description,
      provider: { "@id": `${site.url}/#org` },
      areaServed: "US",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chicago",
        addressRegion: "IL",
        addressCountry: "US",
      },
      knowsAbout: [
        "Fractional Chief AI Officer",
        "Fractional AI engineering",
        "AI strategy",
        "AI implementation for small business",
      ],
    },
  ],
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
  servicesHeading: "Systems we build",
  contactHeading: "Contact",
  contactLabel: "Contact",
  linkedinLabel: "LinkedIn",
  tagline: "Fractional AI leadership and engineering. You own what we build.",
};

/** Default copy for the lime closing band at the bottom of most pages. */
export const closingCta: ClosingCtaCopy = {
  eyebrow: "The first step",
  title: "Tell us where AI should be paying off in your business.",
  body: "In 45 minutes we will tell you where we see the opportunity and whether we are the right fit.",
};

/** The ink ownership band. Home and How it works. */
export const ownershipBand: StatementBandCopy = {
  eyebrow: "Ownership",
  titleLines: ["You own everything", "we build."],
  body: "Code, data, documentation, and accounts sit in your name from the first day. No licenses to renew and no platform to leave. When the engagement ends, the systems stay and keep running.",
  points: [
    "Source code in your repository, under your accounts",
    "Documentation written for the people who will run it",
    "Training for your team before we step back",
  ],
  link: { label: "How handover works", href: "/how-it-works#ownership" },
};

/** From first call to handover. Home, and the spine of How it works. */
export const processSteps: Step[] = [
  {
    title: "Discovery call",
    duration: "45 minutes, free",
    body: "We learn how the business runs and where AI could pay off. You leave with at least one useful observation.",
  },
  {
    title: "Discovery project",
    duration: "One to two weeks, fixed fee",
    body: "We review your operations, data, and systems, size the opportunities, and draft your first Quarter Plan.",
  },
  {
    title: "First quarter",
    duration: "Three months, billed monthly",
    body: "We work to the plan and review the scorecard with you each month.",
  },
  {
    title: "Second term",
    duration: "Up to three months, optional",
    body: "We scale what worked and prepare your team to run it without us.",
  },
  {
    title: "Handover",
    duration: "Yours to run",
    body: "Your team runs the systems with full documentation and training. Light support stays available if you want it.",
  },
];

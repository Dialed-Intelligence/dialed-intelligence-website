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
    "A senior AI lead on your team. A payback date for every project. Systems we keep running.",
  brandLine: "AI that pays for itself.",
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
    "A fractional AI lead for businesses doing $2M to $25M. We find the AI projects that pay for themselves, build them, and keep them running.",
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
  tagline: "Fractional AI leadership and engineering. AI that pays for itself.",
};

/** Default copy for the lime closing band at the bottom of most pages. */
export const closingCta: ClosingCtaCopy = {
  eyebrow: "The first step",
  title: "Tell us where AI should be paying off in your business.",
  body: "In 45 minutes we will tell you where we see the opportunity and whether we are the right fit.",
};

/** The ink support band. What we deliver and How it works. */
export const supportBand: StatementBandCopy = {
  eyebrow: "After launch",
  titleLines: ["We keep what we build", "running."],
  body: "AI systems need care. Data changes, software vendors update their models, and your business changes. We monitor every system we build, fix what breaks, and tune it as the results come in. You do not need an engineering team to keep it working.",
  points: [
    "Monitoring and alerts on every system",
    "Fixes and model updates handled by us",
    "A monthly scorecard of what each system returns",
  ],
  link: { label: "How ongoing support works", href: "/how-it-works#support" },
};

/** From first call to ongoing support. */
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
    body: "We scale what worked and train the people who use each system.",
  },
  {
    title: "Ongoing support",
    duration: "Optional, ongoing",
    body: "We monitor each system, fix what breaks, and keep tuning it against the scorecard.",
  },
];

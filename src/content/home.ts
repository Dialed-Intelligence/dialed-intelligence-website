import type { HeroCopy } from "@/components/sections/hero";
import type {
  CaseLabels,
  CaseStudy,
  LinkCard,
  LinkCopy,
  OgCopy,
  SectionIntro,
  TitledText,
} from "./types";

export const og: OgCopy = {
  eyebrow: "Strategy that ends in a running system. Owned by you.",
  title:
    "We find what is costing you most, then build the system that fixes it.",
  alt: "Dialed Intelligence. We find what is costing you most, then build the system that fixes it.",
};

export const hero: HeroCopy = {
  eyebrow: "Strategy that ends in a running system",
  title: "We find what is costing you most, then",
  titleEmphasis: "build the system that fixes it.",
  subhead:
    "Strategy and engineering in one firm. We diagnose the problem, build the AI that solves it, and hand it over. You own it outright.",
  primaryCta: {
    label: "Book a Working Session",
    href: "/contact",
    event: "cta_book_session",
  },
  secondaryLink: { label: "See the work we do", href: "/services" },
  proofPoints: [
    "The problem found in your first hour",
    "A working system in weeks",
    "You own it outright, no recurring license",
  ],
};

export const marquee = [
  "DECISION SYSTEMS",
  "UNIFIED DATA SYSTEMS",
  "AI AGENTS",
  "DEMAND FORECASTING",
  "MARGIN RECOVERY",
  "OPERATIONS COPILOTS",
  "HUMAN IN THE LOOP",
];

export const paths: { intro: SectionIntro; items: TitledText[] } = {
  intro: {
    eyebrow: "How this usually goes",
    title: "Three familiar paths. Each stops short of a system you own.",
  },
  items: [
    {
      title: "Consultancies analyze.",
      body: "They map your problems with real rigor, then hand you a deck and a recommendation. Execution is left to you.",
    },
    {
      title: "Software companies productize.",
      body: "They ship working tools built for their average customer. You rent access forever and adapt your business to their roadmap.",
    },
    {
      title: "The best engineers embed elsewhere.",
      body: "Elite teams will put engineers inside a business and build exactly what it needs. That model is real. It is also reserved for enterprises many times your size, priced for them, and the system it builds is never yours to keep.",
    },
    {
      title: "We do both halves.",
      body: "We bring that caliber of embedded engineering, sized for a business doing 5 to 30 million in revenue and set at a fixed price you agree to up front. We find the single problem worth the most to solve, build the AI system that solves it, and hand it over. The code, the data, the asset. Yours.",
    },
  ],
};

// Card copy leads with the question each system answers. Independent of the
// service detail content files.
export const whatWeBuild: { intro: SectionIntro; items: LinkCard[] } = {
  intro: {
    eyebrow: "What we build",
    title: 'What "solved" looks like',
    link: { label: "The full services picture", href: "/services" },
  },
  items: [
    {
      href: "/services/operations-automation",
      title: "Operations Automation",
      desc: "Where is repetitive work eating my best people? Operations automation handles the work between your systems, supervised by your team.",
    },
    {
      href: "/services/data-systems",
      title: "Unified Data Systems",
      desc: "What is actually true across my business right now? Every source of truth in one place, answerable in plain English, trustworthy enough to act on.",
    },
    {
      href: "/services/automation-platform",
      title: "Your Own Automation Platform",
      desc: "Why am I renting my own workflows? A workflow automation platform on your infrastructure, under your brand, with no per-seat license ever.",
    },
    {
      href: "/services/inventory",
      title: "Inventory Intelligence",
      desc: "What should I reorder, and when? Reorder logic built around how your business actually works, not a template.",
    },
    {
      href: "/services/pricing",
      title: "Dynamic Pricing",
      desc: "Where is margin quietly leaking? Margin recovery across the long tail of your catalog, driven by real demand modeling.",
    },
  ],
};

// DRAFT engagement vignettes, pending Tyler's approval before they ship.
// These describe real engagement shapes with no client names attached and no
// metrics claimed yet. Add a `metric` string to any entry to surface a
// quantified result.
export const proof: {
  intro: SectionIntro;
  labels: CaseLabels;
  items: CaseStudy[];
} = {
  intro: {
    eyebrow: "In the field",
    title: "Systems we built and handed over.",
  },
  labels: {
    problem: "The problem.",
    system: "What we built.",
    outcome: "The result.",
  },
  items: [
    {
      client: "PE-backed skilled-nursing operator",
      problem:
        "Compliance gaps in MDS and PDPM documentation kept surfacing after submission, when they were expensive to fix.",
      system:
        "A documentation system that reads each record and flags the gaps before anything is filed.",
      outcome: "Reviewers catch problems while they are still cheap to correct.",
    },
    {
      client: "Public-sector data engagement",
      problem:
        "Divisions held data that could never be reconciled across the organization.",
      system:
        "A unified data layer that makes every division answerable from one place.",
      outcome: "Leadership works from one version of the truth instead of five.",
    },
    {
      client: "Research consultancy",
      problem:
        "Lead intelligence sat scattered across many sources and got sorted by hand.",
      system:
        "A multi-agent system that pulls those sources together and classifies leads automatically.",
      outcome: "Analysts spend their hours on judgment, not collection.",
    },
  ],
};

export const onRamp = {
  eyebrow: "Consulting, if that is all you need",
  title: "Not ready to build? Start with the thinking.",
  body: "Some engagements stay advisory. We map where AI creates real value in your operation, rank it by return, and hand you a plan you could take anywhere. Most clients ask us to build it. You do not have to.",
};

export const engagement: SectionIntro = {
  eyebrow: "How an engagement works",
  title: "Useful at every step, even the free one",
  link: { label: "Our approach in full", href: "/approach" },
};

export const credibility: {
  eyebrow: string;
  title: string;
  body: string;
  link: LinkCopy;
  disciplines: string[];
} = {
  eyebrow: "Who does the work",
  title:
    "Built by practitioners who ship production AI systems, with backgrounds in econometrics, investment banking, and management consulting.",
  body: "We have shipped multi-agent systems, unified data platforms, and automation for organizations from research consultancies to PE-backed operators.",
  link: { label: "Where the firm comes from", href: "/about" },
  disciplines: [
    "Econometrics",
    "Investment banking",
    "Management consulting",
    "Production AI engineering",
  ],
};

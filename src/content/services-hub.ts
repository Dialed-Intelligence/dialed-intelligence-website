import type {
  DeliverableGroup,
  OgCopy,
  PageMeta,
  SectionIntro,
} from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// What we deliver".

export const meta: PageMeta = {
  title: "What we deliver",
  description:
    "What a fractional AI lead delivers across strategy, engineering, and your team, and the systems we build most often in the first two quarters.",
  canonical: "/services",
};

export const og: OgCopy = {
  eyebrow: "What we deliver",
  title: "Strategy, engineering, and a team that can run what we build.",
  alt: "What Dialed Intelligence delivers. Strategy, engineering, and a team that can run what we build.",
};

export const header = {
  eyebrow: "What we deliver",
  title: "One role. Strategy, engineering, and a team that can run what we build.",
  intro:
    "Clients often call this role a fractional Chief AI Officer. We cover that seat and the engineering behind it. Here is what the role delivers, and the systems we build most often.",
};

export const groups: DeliverableGroup[] = [
  {
    id: "strategy",
    title: "Strategy",
    summary:
      "We find the places in your business where AI pays back its cost.",
    items: [
      "An AI opportunity map, ranked by return and effort",
      "A written Quarter Plan with deliverables and success measures",
      "Tool and vendor recommendations, with build or buy calls",
      "A data readiness review of your core systems",
      "An AI risk and policy review",
      "A monthly scorecard report to leadership",
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    summary:
      "We build the systems the plan calls for and put them into production.",
    items: [
      "Automation for repetitive work between your systems",
      "A unified data layer across your sources",
      "AI agents for defined tasks, with a person approving exceptions",
      "Demand forecasting and reorder logic",
      "Pricing models for the long tail of your catalog",
      "Tests, monitoring, and documentation for every system",
    ],
  },
  {
    id: "your-team",
    title: "Your team",
    summary:
      "We make sure the people who stay can run what we build.",
    items: [
      "Training for the people who will run each system",
      "Playbooks for daily operation and common failures",
      "A company AI use policy, written and approved",
      "AI training for leadership and staff",
      "A handover plan with a named owner for each system",
    ],
  },
];

export const systems: SectionIntro = {
  eyebrow: "Systems we build most often",
  title: "Usually built in the first two quarters",
};

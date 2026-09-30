import type { OgCopy, PageMeta } from "./types";

export const meta: PageMeta = {
  title: "Services",
  description:
    "Five areas cover most of what we are asked to build. Every engagement starts from a named problem and ends with an AI system you own.",
  canonical: "/services",
};

export const og: OgCopy = {
  eyebrow: "Services",
  title: "Every system here starts as a question worth answering.",
  alt: "Dialed Intelligence services. Each system starts as a question worth answering.",
};

export const header = {
  eyebrow: "Services",
  title: "Every system here starts as a question worth answering.",
  intro:
    "Every engagement starts from a named problem and ends with an AI system you own. These five areas cover most of what we are asked to build. If your problem does not fit neatly into one of them, that is usually a sign it is interesting. Bring it to a working session.",
};

export const architecture = {
  eyebrow: "How the systems fit",
  title:
    "The data system is the foundation. Everything else compounds on top of it.",
  body: "Most clients start with one painful workflow or one unanswerable question. The systems compound from there. Agents work better on unified data. Pricing works better with live inventory. Everything works better when you own the whole stack and nothing is fighting a vendor's API limits.",
  diagram: {
    chassis: "Your own automation platform",
    chassisNote: "Driven by your team",
    modules: ["Operations automation", "Inventory intelligence", "Dynamic pricing"],
    foundation: "Unified data systems",
    foundationNote: "The foundation",
    caption:
      "Every module reads from the same foundation, and you own every layer.",
  },
};

export const list = {
  eyebrow: "Five service areas",
  title: "Each one answers a question that costs you money",
  /** Prefix for the lowercased duration, e.g. "Typical engagement three to five weeks" */
  durationPrefix: "Typical engagement",
  linkLabel: "Read the full picture",
};

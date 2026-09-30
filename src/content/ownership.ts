import type { Faq, OgCopy, PageMeta, SectionIntro, TitledText } from "./types";

export const meta: PageMeta = {
  title: "The Ownership Model",
  description:
    "Why every system we build is handed over outright. The code, the data, the documentation, and the infrastructure belong to you, and the contract says so.",
  canonical: "/ownership",
};

export const og: OgCopy = {
  eyebrow: "The Ownership Model",
  title: "Build it. You own it.",
  alt: "The Dialed Intelligence ownership model. Build it. You own it.",
};

export const hero = {
  eyebrow: "The Ownership Model",
  titleLines: ["Build it.", "You own it."] as [string, string],
  subhead:
    "Most of the software industry is structured around the opposite idea. Here is why we broke from it.",
};

/** Screen-reader heading for the passages. */
export const argumentLabel = "The argument";

// The argument. Outline section 3.4, passages verbatim.
export const passages: TitledText[] = [
  {
    title: "The rental economy has a ceiling.",
    body: "Every SaaS subscription is a bet that the vendor's roadmap will keep matching your business. Sometimes it does. Often you end up paying more each year for software that fits a little worse each year, because it was built for their average customer and you are not average.",
  },
  {
    title: "Advice without execution is half a product.",
    body: "The consulting industry produces genuinely good analysis and then stops at the moment of greatest value. The deck describes the system you need. Someone still has to build it, and that someone is usually nobody.",
  },
  {
    title: "What ownership actually means here.",
    body: "When an engagement ends, you hold the code, the data, the documentation, the infrastructure, and the capability the system represents. Run it forever without us. Hire anyone you like to extend it. Audit every line. We keep our internal tooling and methods, you keep everything we shipped for you, and that line is written explicitly into every contract so there is never a question.",
  },
  {
    title: "Why this is good business for us too.",
    body: "A vendor who locks you in only has to be good once, at the sale. We have to be good every time, because the only thing keeping a client with us is that we keep being worth it. We think that produces better software, and we know it produces better relationships.",
  },
];

export const faqIntro: SectionIntro = {
  eyebrow: "The practical questions",
  title: "Fair questions, plain answers",
};

export const faqs: Faq[] = [
  {
    question: "What exactly do we own when the build is done?",
    answer:
      "Everything we shipped. The source code, the data and the pipelines that move it, the documentation, and the infrastructure it runs on, transferred to accounts you control. The contract names each of these in plain language, so ownership is a clause you can point to rather than a promise you have to remember.",
  },
  {
    question: "What happens if we never want to talk to you again after handover?",
    answer:
      "Nothing breaks. The system runs without us, on your infrastructure, under your accounts. The documentation is written assuming we are not in the room, so your team or any developer you hire can operate and extend it. We would rather earn the next call than make it mandatory.",
  },
  {
    question: "What do you keep?",
    answer:
      "Our internal scaffolding. The diagnostic methods, the templates, and the tooling we use to build across clients stay ours, and they get sharper with every engagement. Everything we ship for you, the code, the data, the documentation, stays yours. That line is written into every contract so there is never a question.",
  },
  {
    question: "Who maintains it?",
    answer:
      "Every build includes a support window, so the first weeks of real use are covered. After that, support is an optional retainer. Think of it as insurance tied to an asset you own, not a license that holds it hostage. Take it, skip it, or leave it whenever you want, and the system keeps running either way.",
  },
  {
    question: "Can our own developers work on it?",
    answer:
      "Yes, and we plan for it. We build with widely used, well-documented technology, and the handover documentation is written assuming your developers will extend the system without us. Plenty of clients run the asset entirely in-house after handover. That is the model working, not a problem to solve.",
  },
];

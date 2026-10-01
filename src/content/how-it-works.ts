import type { Stage, StageLabels } from "@/components/sections/stage-block";
import type { OgCopy, PageMeta, SectionIntro, TitledText } from "./types";

// DRAFT copy for review. Structure follows the Rebrand Spec, "Inner pages,
// How it works". Step names and durations match the home path.

export const meta: PageMeta = {
  title: "How it works",
  description:
    "The path from a free 45-minute call to handover. What each step delivers, what we need from you, and how the Quarter Plan keeps the work measurable.",
  canonical: "/how-it-works",
};

export const og: OgCopy = {
  eyebrow: "How it works",
  title: "A defined path from the first call to handover.",
  alt: "How a Dialed Intelligence engagement works, from the first call to handover.",
};

export const header = {
  eyebrow: "How it works",
  aside: "Five steps, one plan per quarter",
  title:
    "A defined path from the first call to the day your team runs it without us.",
  subhead:
    "Every step ends with something you keep, and you can stop after any of them. Here is what each one delivers and what we need from you.",
};

export const stageLabels: StageLabels = {
  stage: "Step",
  of: "of",
  whatHappens: "What happens",
  walkAway: "What you get",
  duration: "How long it takes",
  needs: "What we need from you",
  darkTag: "You own what we build.",
};

export const stages: Stage[] = [
  {
    n: "01",
    name: "Discovery call",
    body: "A conversation with the lead who would do the work. We learn how the business runs, where the time and margin go, and where AI could pay off. If we are not the right fit, we say so on the call.",
    walkAway: "At least one useful observation, whether or not we work together",
    duration: "45 minutes, free",
    needs: "Someone who knows how the business runs",
  },
  {
    n: "02",
    name: "Discovery project",
    body: "We review your operations, data, and systems with the people who run them. We size each opportunity by what it would return and what it would take to build. Then we draft your first Quarter Plan and set the monthly fee in writing.",
    walkAway: "A sized list of opportunities and a draft Quarter Plan, yours to keep",
    duration: "One to two weeks, fixed fee",
    needs: "Time with your leads and read access to the key systems",
  },
  {
    n: "03",
    name: "First quarter",
    body: "We join your team and work to the plan. Systems go into production as the plan calls for them, starting in the first month. We review the scorecard with leadership every month and change the plan in writing when the business changes.",
    walkAway: "Working systems, a monthly scorecard, and a plan for the next quarter",
    duration: "Three months, billed monthly",
    needs: "A sponsor, a point person, and the access you would give a senior hire",
  },
  {
    n: "04",
    name: "Second term",
    body: "Optional. We scale what worked in the first quarter and move each system to the people who will own it. The plan for this term ends with your team running everything.",
    walkAway: "Systems extended, and a team ready to run them",
    duration: "Up to three months, optional",
    needs: "The people who will own each system after handover",
  },
  {
    n: "05",
    name: "Handover",
    body: "Your team takes over. Code, data, documentation, and accounts are already in your name, so handover is training and a final review. Light support stays available if you want it.",
    walkAway: "Systems your team runs, documented and tested",
    duration: "Yours to run",
    needs: "Time for your team to train on each system",
  },
];

export const anatomy: { intro: SectionIntro; body: string; items: TitledText[] } = {
  intro: {
    eyebrow: "Anatomy of a Quarter Plan",
    title: "One short document sets the quarter.",
  },
  body: "Leadership signs the Quarter Plan before the quarter starts. It fits on a few pages, and every change to it happens in writing.",
  items: [
    {
      title: "Deliverables.",
      body: "The systems, documents, and training we will ship, month by month.",
    },
    {
      title: "Success measures.",
      body: "The numbers we aim to move and how we will measure them, agreed before work starts.",
    },
    {
      title: "The monthly review.",
      body: "A scorecard meeting with leadership. What shipped, what moved, and what changes next month.",
    },
    {
      title: "Access we need.",
      body: "The systems, data, and people the plan depends on, listed up front so nothing stalls mid-quarter.",
    },
    {
      title: "Who owns what.",
      body: "Your sponsor, your point person, and the person on your team who takes over each system.",
    },
  ],
};

export const standards: { intro: SectionIntro; items: TitledText[] } = {
  intro: {
    eyebrow: "What you can expect from us",
    title: "Service standards, in writing.",
  },
  items: [
    {
      title: "A standing weekly working session.",
      body: "The same slot every week, with the people doing the work.",
    },
    {
      title: "A monthly scorecard review.",
      body: "Progress against the Quarter Plan, reviewed with leadership.",
    },
    {
      title: "Replies within one business day.",
      body: "Every question gets an answer by the next business day.",
    },
    {
      title: "A seat where AI decisions get made.",
      body: "We join the leadership meeting you choose.",
    },
  ],
};

export const needs = {
  eyebrow: "What we need from you",
  title:
    "An executive sponsor, one point person, and the access you would give a senior hire.",
  body: "The sponsor sets priorities and signs the Quarter Plan. The point person keeps the work moving day to day. Access means the systems, data, and meetings the plan depends on, from the first week.",
};

export const exit = {
  label: "Renewal and exit",
  paragraphs: [
    "Near the end of the first quarter, we review the scorecard together and decide on a second term. A second term runs up to three months. Its job is to scale what worked and prepare your team to run it.",
    "Handover includes the documentation, a walkthrough of every system, and training for the people who will own them. After that, light support is available if you want it. Most clients reach handover in three to six months.",
  ],
};

export const faqIntro: SectionIntro = {
  eyebrow: "Questions",
  title: "What owners and CFOs ask before signing",
};

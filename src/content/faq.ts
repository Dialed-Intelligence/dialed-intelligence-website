import type { Faq } from "./types";

// The full FAQ from the Rebrand Spec, plus one answer that carries the
// "fractional Chief AI Officer" search term. Home shows three of these, How it
// works shows all of them, and the FAQPage structured data reads this list.
export const faqs: Faq[] = [
  {
    question: "Do you bill by the hour?",
    answer:
      "No. You pay a monthly fee for the role, and the Quarter Plan defines what we deliver. We do not track or sell hours.",
  },
  {
    question: "How is this different from a consultant?",
    answer:
      "A consultant hands you recommendations. We own the plan and build the systems as part of your team.",
  },
  {
    question: "How is this different from a full-time hire?",
    answer:
      "You get senior strategy and engineering in one role. The term is defined, and the cost is a fraction of a full-time executive.",
  },
  {
    question: "Is this the same as a fractional Chief AI Officer?",
    answer:
      "Clients often call the role a fractional Chief AI Officer. We cover that seat and the engineering behind it, so the person who sets the AI strategy also builds the systems.",
  },
  {
    question: "How long do engagements last?",
    answer:
      "Three months to start, with an option to extend. Most clients reach handover in three to six months.",
  },
  {
    question: "What happens when it ends?",
    answer:
      "Your team runs the systems. You keep all code, data, and documentation. Light support stays available if you want it.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on the size of the business and the scope of the role. The discovery project has a fixed fee. We set the monthly fee in writing before the first quarter starts.",
  },
  {
    question: "What access do you need?",
    answer:
      "An executive sponsor, one point person, and the access you would give a senior hire. That means leadership meetings and the relevant systems and data.",
  },
  {
    question: "Do we need clean data or a tech team?",
    answer:
      "No. Getting the data in order is often part of the first quarter.",
  },
  {
    question: "What size businesses do you work with?",
    answer:
      "Mostly owner-led and PE-backed businesses between $2M and $25M in revenue.",
  },
];

export function pickFaqs(questions: string[]): Faq[] {
  return questions.map((q) => {
    const faq = faqs.find((f) => f.question === q);
    if (!faq) throw new Error(`FAQ not found: ${q}`);
    return faq;
  });
}

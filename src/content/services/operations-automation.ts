import type { Service } from "./types";

export const operationsAutomation: Service = {
  slug: "operations-automation",
  title: "Operations Automation",
  eyebrow: "Operations Automation",
  headline:
    "Your team spends twenty hours a week moving information between systems. We can give most of those hours back.",
  problemStatement:
    "Repetitive work between your systems consumes your best people and scales with revenue.",
  card: "Repetitive work between your systems, handled by agents your team supervises.",
  metaTitle: "Operations Automation",
  metaDescription:
    "Workflow agents that handle routine operational work between your systems and route the exceptions to your team. First workflow live in six to ten weeks.",
  problem: [
    "Every growing company runs on a hidden layer of repetitive work. Keying orders from email into the system of record. Reconciling sales across channels. Matching invoices. Chasing suppliers for confirmations. Most of it needs accuracy more than judgment, and it grows in step with revenue.",
    "You already see what this costs in payroll. What is harder to see is the opportunity cost. Your best people spend their attention on transcription instead of on customers, suppliers, and decisions.",
  ],
  build: [
    "We build one workflow agent per process. It handles the routine cases on its own and sends the rest to a person on your team with everything filled in and ready for a decision. Most workflows start at 60 to 70 percent straight through and climb toward 85 percent as we tune the rules on real exceptions.",
    "Modern AI has made the hard parts cheap. Reading a messy order email, parsing an oddly formatted invoice, drafting a reply in your company's voice. The engineering effort goes into reliability. Clean integration with your existing systems, an audit trail on every action, and safe failure that never posts the same order twice.",
  ],
  approach: {
    intro:
      "The first workflow takes six to ten weeks from kickoff to running on its own. Later workflows reuse the same integrations and usually take three to five weeks each.",
    phases: [
      {
        weeks: "Weeks 1 to 2",
        name: "Map the process",
        body: "We sit with the people who do the work today and collect a few hundred real examples. We write down every rule they apply, including the ones nobody has written down before.",
      },
      {
        weeks: "Weeks 3 to 5",
        name: "Build and test on history",
        body: "We connect to your systems in a test environment and build the agent. Then we run it against past work and compare its output with what your team actually entered.",
      },
      {
        weeks: "Weeks 6 to 8",
        name: "Run alongside your team",
        body: "The agent processes live work and a person checks every result before it posts. We fix what it gets wrong and set the confidence level for straight-through processing.",
      },
      {
        weeks: "Weeks 9 to 10",
        name: "Go live",
        body: "Routine cases post on their own and exceptions land in a review queue. We train the person who works the queue and set up monitoring on every integration.",
      },
    ],
  },
  get: [
    "A named process that used to take hours of someone's day now runs with a person approving the exceptions. You see the before and after in hours per week and in errors caught downstream.",
    "After launch, we monitor every agent and integration and fix what breaks. When a supplier changes a document format, we update the system before your team notices.",
  ],
  deliverables: [
    "A written map of the process, with every rule and exception",
    "The agent, connected to your systems, with a log of every action",
    "A review queue that shows the source document beside the agent's reading",
    "Alerts when volume, errors, or the queue move out of range",
    "A runbook and training for the queue owner",
  ],
  needs: [
    "One person who knows the process well, for about two hours a week",
    "Access to the systems involved, starting in a test environment",
    "Three to six months of past examples",
  ],
  measures: [
    "Share of volume processed straight through",
    "Staff hours per week on the process",
    "Errors found downstream",
    "Time from receipt to entry",
  ],
  practice: {
    intro:
      "A building products distributor doing $11M a year receives about 80 purchase orders a day by email and PDF. Two customer service reps key each one into the ERP by hand.",
    beats: [
      {
        label: "Before",
        text: "The two reps spend about five hours a day on order entry between them. Roughly 3 in 100 orders carry a keying error, which shows up a week later as a wrong shipment or a credit.",
      },
      {
        label: "The build",
        text: "An agent reads each order, matches the customer and part numbers against the ERP, and checks prices against the customer's contract. Clean orders post directly. New part numbers, price mismatches, and odd quantities go to a review queue with the original document beside the agent's reading.",
      },
      {
        label: "After",
        text: "About 70 percent of orders post untouched in the first month and about 85 percent by month four. The queue takes one rep about 45 minutes a day. Keying errors fall below 1 in 200, and the reps spend the time on quotes and follow-up.",
      },
    ],
  },
  engagement: {
    duration: "Six to ten weeks",
    body: "Often the first system in a first quarter, because the payback is quick and easy to measure. The first workflow goes live in the second month. A second workflow follows the next quarter and reuses the same integrations.",
  },
};

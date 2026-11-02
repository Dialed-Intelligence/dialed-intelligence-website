import type { Service } from "./types";

export const quoting: Service = {
  slug: "quoting",
  title: "Quote Automation",
  eyebrow: "Quote Automation",
  headline:
    "The first accurate quote usually wins. Yours should go out the same day.",
  problemStatement:
    "Quotes take days because pricing lives in spreadsheets and in a few people's heads, and slow quotes lose deals.",
  card: "Same-day quotes built from your pricing rules and past jobs, with a rep approving every one.",
  metaTitle: "Quote Automation",
  metaDescription:
    "Quote automation that reads requests, applies your pricing rules and past jobs, and drafts each quote for a rep to approve. Faster quotes, steadier margins.",
  problem: [
    "In distribution, manufacturing, and the trades, quoting is where revenue starts and where it stalls. A request arrives as an email, a PDF drawing, or a spreadsheet of parts. Someone looks up costs, checks past jobs, applies a margin, and builds the document by hand.",
    "It takes one to three days, and the price depends on who did the quote. Margins vary by rep. When your two best estimators are busy, quotes wait, and buyers go with whoever answered first.",
  ],
  build: [
    "We build a quoting system around your own pricing rules. An agent reads the incoming request, pulls out the line items, and matches them to your catalog or past jobs. Then it applies your costs, margins, and freight and drafts the quote in your format.",
    "A rep reviews every quote before it goes out. Quotes above a size you set, or with low confidence on any line, go to a senior estimator. The system also records which quotes win, so pricing can be tuned on real results.",
  ],
  approach: {
    intro:
      "Eight to twelve weeks to every rep quoting from the system. Highly custom work may stay with your estimators, and we say so in the discovery project.",
    phases: [
      {
        weeks: "Weeks 1 to 2",
        name: "Write down the pricing",
        body: "We sit with your estimators and write down how they actually price. Costs, margins by customer type, freight, minimums, and the judgment calls they make without thinking.",
      },
      {
        weeks: "Weeks 3 to 6",
        name: "Build the quote engine",
        body: "We connect to your catalog, cost data, and CRM and build the agent that reads requests. We test it against 100 or more past quotes and compare its numbers with what you sent.",
      },
      {
        weeks: "Weeks 7 to 10",
        name: "Reps review every quote",
        body: "Two or three reps use the system on live requests and correct anything it gets wrong. We tune the rules on their corrections.",
      },
      {
        weeks: "Weeks 11 to 12",
        name: "Roll out and track wins",
        body: "Every rep moves onto the system, with approval rules by quote size. Win and loss tracking starts so pricing can improve next quarter.",
      },
    ],
  },
  get: [
    "Quotes out the same day, margins applied the same way every time, and estimators free for the complex jobs. You see quote turnaround and win rate on the monthly scorecard.",
    "After launch, we tune the pricing rules on win and loss data every month. Your team can change a rule on its own when costs move.",
  ],
  deliverables: [
    "Your pricing rules, written down where your team can edit them",
    "An agent that reads requests from email, PDF, and spreadsheets",
    "Quote drafts in your format, inside your CRM",
    "Approval rules by quote size and confidence",
    "Win and loss tracking by customer and product line",
    "Training for reps and estimators",
  ],
  needs: [
    "Your senior estimator for about three hours a week in the first month",
    "Access to your catalog, cost data, and CRM",
    "At least 100 past quotes with their outcomes",
  ],
  measures: [
    "Time from request to quote sent",
    "Quotes sent per rep",
    "Margin spread across reps",
    "Win rate",
  ],
  practice: {
    intro:
      "An industrial fasteners distributor doing $16M a year gets about 40 quote requests a day. Three inside sales reps build each quote in a spreadsheet.",
    beats: [
      {
        label: "Before",
        text: "The average quote takes a day and a half to go out. Margins on similar orders range from 18 to 31 percent depending on the rep. Requests with more than 50 lines often wait until the end of the week.",
      },
      {
        label: "The build",
        text: "The agent reads each request, matches part numbers to the catalog, applies cost, a margin by customer tier, and freight, then drafts the quote in the CRM. Reps review every quote. Anything over $25K goes to the sales manager.",
      },
      {
        label: "After",
        text: "Median time to quote falls to about three hours. The margin spread across reps narrows to about 4 points. Quotes sent the same day win about 9 points more often than later ones, and the team now tracks that every month.",
      },
    ],
  },
  engagement: {
    duration: "Eight to twelve weeks",
    body: "Fits in a first or second quarter for businesses where sales depend on quote speed. It works best once your catalog and costs are clean, which the discovery project checks. The scorecard tracks turnaround, margin spread, and win rate.",
  },
};

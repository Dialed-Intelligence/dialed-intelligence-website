import type { Service } from "./types";

export const dataSystems: Service = {
  slug: "data-systems",
  title: "Unified Data Systems",
  eyebrow: "Unified Data Systems",
  headline:
    "You should be able to ask your business a question and trust the answer.",
  problemStatement:
    "Your data lives in five places that do not talk to each other, so answering a basic question about your own business takes a day in Excel.",
  card: "Every source of truth in one place, tied out to your books, so the numbers hold up.",
  metaTitle: "Unified Data Systems",
  metaDescription:
    "We bring your ERP, accounting, sales channels, and spreadsheets into one warehouse you own, tied out to your books. Built in ten to fourteen weeks.",
  problem: [
    "Your data is real and it already exists. It just lives in five places that do not talk to each other. The ERP, the accounting system, the online store, a folder of spreadsheets, a supplier's emailed price lists. Answering a basic question about your own business means someone spends a day in Excel, and by the time the answer arrives, the question has changed.",
    "Under all of it sits a simpler problem. You cannot see your own business clearly.",
  ],
  build: [
    "We bring everything you already have into one warehouse that you own. The work is unglamorous and we are proud of that. Extraction from every source, matching so a customer is the same customer everywhere, and tie-out against your accounting so the numbers are right before anyone uses them.",
    "On top sits a set of written definitions, so revenue, margin, and an active customer mean one thing across the company. Every later system reads from here. That includes forecasting, pricing, and the dashboards and AI assistants in our Business Intelligence work.",
  ],
  approach: {
    intro:
      "Most of the time goes into making the numbers agree with your books. We plan for at least two month-end closes before we call the data trusted.",
    phases: [
      {
        weeks: "Weeks 1 to 2",
        name: "Audit the sources",
        body: "We list every system and spreadsheet that holds a number leadership uses. We get read access and agree on the 15 to 25 numbers that matter most.",
      },
      {
        weeks: "Weeks 3 to 6",
        name: "Extract and match",
        body: "We load each source into one warehouse in your cloud account on a schedule. We match customers, products, and vendors across systems so each one has a single record.",
      },
      {
        weeks: "Weeks 7 to 11",
        name: "Tie out to the books",
        body: "We reconcile revenue, cost, and margin against your accounting at each month-end close. Every gap gets traced to a cause and fixed at the source or written down.",
      },
      {
        weeks: "Weeks 12 to 14",
        name: "Reporting and monitoring",
        body: "A weekly leadership report and the month-end package run from the warehouse. We document every pipeline, set up failure alerts, and train your finance lead on the reports.",
      },
    ],
  },
  get: [
    "One place where your business is visible and correct. Month-end reporting that assembles itself, and a foundation that makes every later automation, forecast, and pricing decision better.",
    "After launch, we monitor every pipeline and fix failures before the morning reports run. When you add a system or change a definition, we update the warehouse.",
  ],
  deliverables: [
    "A data warehouse in your cloud account, loaded on a schedule",
    "Pipelines from each source, with alerts when a load fails",
    "One record per customer, product, and vendor across systems",
    "Written definitions for the numbers leadership uses",
    "A weekly leadership report and a month-end package",
    "Documentation and training for the data owner",
  ],
  needs: [
    "Read access to each source system and the spreadsheets that matter",
    "Your controller or bookkeeper for the tie-out, about two hours per close",
    "One person on your team who knows where the data comes from",
  ],
  measures: [
    "Hours to produce the month-end package",
    "Variance between the warehouse and the books",
    "Leadership questions answered without a manual export",
  ],
  practice: {
    intro:
      "A specialty food distributor doing $14M a year sells wholesale through its ERP, direct through an online store, and on two marketplaces. The controller holds it all together in spreadsheets.",
    beats: [
      {
        label: "Before",
        text: "Month-end reporting takes the controller about three days of exports. The same product carries different codes in the ERP and the online store, so margin by channel is an estimate.",
      },
      {
        label: "The build",
        text: "We load the ERP, the online store, the marketplaces, and the accounting system into one warehouse and map about 1,400 products to single records. The first close shows a 4 percent revenue gap, traced to marketplace fees booked in the wrong month. By the third close the numbers agree.",
      },
      {
        label: "After",
        text: "The month-end package assembles in about two hours. Warehouse revenue matches the books within half a percent. Channel margin is measured for the first time, and one marketplace earns about 6 points less than leadership assumed.",
      },
    ],
  },
  engagement: {
    duration: "Ten to fourteen weeks",
    body: "Usually a first-quarter foundation, started early so the tie-out can run across two or three closes. Forecasting, pricing, and Business Intelligence build on it in later quarters. The scorecard tracks reporting time and variance to the books.",
  },
};

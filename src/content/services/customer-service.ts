import type { Service } from "./types";

export const customerService: Service = {
  slug: "customer-service",
  title: "Customer Service Agents",
  eyebrow: "Customer Service Agents",
  headline:
    "Most customer emails ask the same twenty questions. Your team should only answer the hard ones.",
  problemStatement:
    "Your inbox grows with revenue, and most of it is order status, returns, and questions your team has answered a hundred times.",
  card: "Agents that answer routine customer questions from your own order and account data, with your team handling the rest.",
  metaTitle: "Customer Service Agents",
  metaDescription:
    "Customer service agents that answer routine questions from your order and account data and route the rest to your team, with every reply logged.",
  problem: [
    "Most customer service inboxes look alike. Order status, delivery dates, returns, stock checks, invoice copies. Each answer takes a few minutes of looking things up in two or three systems.",
    "Response times slip in the busy season, which is exactly when customers notice. Adding people helps for a season and then becomes a fixed cost.",
  ],
  build: [
    "We build an agent that reads each incoming message, works out what the customer needs, and looks up the answer in your order, shipping, and account systems. It drafts the reply in your tone inside the help desk your team already uses.",
    "Your team approves every draft at first. A category moves to automatic sending only after its drafts go out without edits about 95 percent of the time. Complaints, credits, and anything unclear always go to a person.",
  ],
  approach: {
    intro:
      "Eight to twelve weeks to automatic sending on the first categories. More categories follow as each one earns trust.",
    phases: [
      {
        weeks: "Weeks 1 to 2",
        name: "Read the inbox",
        body: "We classify three to six months of past messages to see what customers actually ask. Usually five to eight categories make up most of the volume.",
      },
      {
        weeks: "Weeks 3 to 5",
        name: "Build the answers",
        body: "We connect to order, shipping, and account data and write the answer patterns with your team. The agent drafts replies to past messages so we can compare them with what your team sent.",
      },
      {
        weeks: "Weeks 6 to 9",
        name: "Drafts with approval",
        body: "The agent drafts every reply and your team approves, edits, or rewrites it. We track the edit rate by category and fix the patterns behind each edit.",
      },
      {
        weeks: "Weeks 10 to 12",
        name: "Automatic sending",
        body: "Categories that clear the bar send on their own, and a person reviews a daily sample. Everything else stays on drafts.",
      },
    ],
  },
  get: [
    "Faster replies on routine questions, and a team that spends its time on the conversations that keep accounts. You see response times and resolution rates by category every month.",
    "The agent, the knowledge base it draws on, and the full log of every reply sit in your accounts. Your team edits the answers without calling us.",
  ],
  deliverables: [
    "A breakdown of your inbox by category and volume",
    "The agent, working inside your existing help desk",
    "A knowledge base your team can edit",
    "Approval rules by category, with a person always on complaints and credits",
    "A log of every message, draft, and send",
    "A runbook and training for the team lead",
  ],
  needs: [
    "Admin access to your help desk and read access to order and shipping data",
    "Your team lead for about two hours a week during the approval phase",
    "Three to six months of past messages",
  ],
  measures: [
    "First response time by category",
    "Share of messages resolved without a person",
    "Edit rate on drafts",
    "Customer satisfaction on resolved messages",
  ],
  practice: {
    intro:
      "A direct-to-consumer furniture brand doing $8M a year gets about 250 customer emails a day, rising to about 600 in the holiday season. A team of four answers them.",
    beats: [
      {
        label: "Before",
        text: "About 60 percent of messages ask about order status, delivery dates, or returns. First response averages about 14 hours and runs past two days in December. The company brings in two temporary staff every holiday season.",
      },
      {
        label: "The build",
        text: "The agent connects to the order system and the freight carrier's tracking and drafts replies in the help desk. Order status and delivery date questions move to automatic sending in week 10. Returns stay on approval because each one needs a judgment call on condition.",
      },
      {
        label: "After",
        text: "About 45 percent of messages resolve without a person. Routine questions get answered in minutes, and the team's own replies go out in under four hours. The next holiday season runs without temporary staff.",
      },
    ],
  },
  engagement: {
    duration: "Eight to twelve weeks",
    body: "Fits in a first or second quarter, whenever customer volume is growing faster than the team. It needs clean order and shipping data, so it sometimes follows a Unified Data System. The scorecard tracks response time and resolution rate by category.",
  },
};

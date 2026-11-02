import type { Service } from "./types";

export const pricing: Service = {
  slug: "pricing",
  title: "Dynamic Pricing Models",
  eyebrow: "Dynamic Pricing Models",
  headline:
    "Everyone reprices the bestsellers. The margin is leaking from everything else.",
  problemStatement:
    "Most of your catalog gets priced once and forgotten, and that is where margin quietly leaks year after year.",
  card: "Margin recovery across the long tail of your catalog, proven in a controlled pilot before it rolls out.",
  metaTitle: "Dynamic Pricing Models",
  metaDescription:
    "Pricing models built on real demand data, tested against a control group, and run within rules you set. Every price explainable, every rule yours.",
  problem: [
    "Most pricing attention, yours and your competitors', goes to the visible five percent of the catalog. The other ninety-five percent gets priced once and forgotten, and that is where margin quietly leaks year after year.",
    "At thousands of items, nobody has time to think about each price, so most prices are never really decided at all.",
  ],
  build: [
    "We estimate how your customers respond to price, product by product or group by group. Then an optimizer proposes prices across the catalog within rules you set. Floors over cost, ceilings, price steps between sizes and brands, and a limit on how far any price moves in a week.",
    "Everything is deterministic and explainable. You can ask why any price moved and get a real answer. This is our most quantitative work, and the place our econometrics background earns its keep.",
  ],
  approach: {
    intro:
      "Fourteen to twenty weeks, including a controlled pilot. We only roll out when the pilot shows a margin gain without a drop in unit sales.",
    phases: [
      {
        weeks: "Weeks 1 to 4",
        name: "Data and demand",
        body: "We pull two to three years of sales, cost, and price history. We estimate how demand responds to price for each item or group and flag where the data is too thin to trust.",
      },
      {
        weeks: "Weeks 5 to 6",
        name: "Set the rules",
        body: "We agree on the rules with your team. Floors over landed cost, ceilings, price steps between related items, and the largest move allowed in one week.",
      },
      {
        weeks: "Weeks 7 to 10",
        name: "Build and backtest",
        body: "We build the optimizer and test it on past periods. Every proposed price comes with a reason a category manager can read.",
      },
      {
        weeks: "Weeks 11 to 16",
        name: "Pilot with a control group",
        body: "We reprice one or two categories and hold similar categories at current prices for comparison. We measure margin and units for at least six weeks.",
      },
      {
        weeks: "Weeks 17 to 20",
        name: "Roll out",
        body: "If the pilot clears the bar, we expand category by category. Changes go out on a weekly cycle with a manager approving each list.",
      },
    ],
  },
  get: [
    "Margin recovered across the long tail, with every price defensible and every rule in your hands. A pilot report that shows the gain against a control group, so the result is measured.",
    "After launch, we track margin against the control group and retune the models every month. Your pricing rules and floors stay in place.",
  ],
  deliverables: [
    "Demand estimates by item or group, with confidence noted",
    "A written rule set your team controls",
    "A weekly list of proposed changes, ranked by margin impact, with a reason for each",
    "A pilot report comparing repriced and control categories",
    "Monitoring for margin and unit sales by category",
    "Training for your category managers",
  ],
  needs: [
    "Two to three years of sales, cost, and price history",
    "A category manager for about two hours a week",
    "A catalog of a few thousand items, or a few hundred with high volume",
  ],
  measures: [
    "Gross margin in repriced categories against control",
    "Unit sales by category",
    "Share of the catalog priced in the last 90 days",
  ],
  practice: {
    intro:
      "An online auto parts retailer doing $20M a year carries about 15,000 items. Outside the top 500 sellers, most prices have not changed since the items were listed.",
    beats: [
      {
        label: "Before",
        text: "A category manager reprices the top sellers monthly against two competitors and leaves the rest alone. Long-tail prices drift with old supplier costs, and about 300 items sell below current landed cost.",
      },
      {
        label: "The build",
        text: "We estimate demand for item groups from three years of history. The pilot reprices two categories, about 2,000 items, and holds two similar categories at current prices. No price moves more than 5 percent in a week, and nothing drops below landed cost plus 12 percent.",
      },
      {
        label: "After",
        text: "Over the eight-week pilot, gross margin in the repriced categories rises about 1.5 points against the control, with unit sales flat. Rollout covers the full catalog over the next quarter. The manager approves a ranked list of about 400 changes each week.",
      },
    ],
  },
  engagement: {
    duration: "Fourteen to twenty weeks",
    body: "A second-term system for clients with enough sales history and catalog depth for pricing to move real money. The discovery project tells us honestly whether your data supports it. The scorecard tracks margin by category against the pilot baseline.",
  },
};

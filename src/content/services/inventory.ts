import type { Service } from "./types";

export const inventory: Service = {
  slug: "inventory",
  title: "Inventory Management",
  eyebrow: "Inventory Management",
  headline:
    "Your bestsellers should never run out and your cash should never sleep on a shelf.",
  problemStatement:
    "Your bestsellers run out while cash sits trapped in inventory that has not moved in a year.",
  card: "Forecasts and reorder proposals built around how your business actually buys, with your buyer approving every order.",
  metaTitle: "Inventory Management",
  metaDescription:
    "Forecasts and weekly reorder proposals with the math shown and a buyer approving every order. Fewer stockouts and less cash in slow stock, owned by you.",
  problem: [
    "Stockouts on the products that drive your revenue. Capital tied up in inventory that has not moved in a year. Counts that drift from reality a little more each month.",
    "The cost shows up in two places you watch closely, lost sales and trapped cash. That makes this one of the easiest systems to justify on numbers alone.",
  ],
  build: [
    "If your inventory needs are standard, good off-the-shelf tools exist and we will tell you so in the discovery project. We build custom when the situation calls for it. Several sales channels, long or unreliable supplier lead times, strong seasons, kits and assemblies, or reorder logic that reflects how your business actually buys.",
    "The math underneath is classical and proven. Forecasts, reorder points, and safety stock, kept fully deterministic with a person approving every purchase. AI flags anomalies and sharpens the forecasts. It never spends your money.",
  ],
  approach: {
    intro:
      "Ten to sixteen weeks to live reorder proposals. Proving the result takes a full buying season, so the scorecard follows it for the next two to three quarters.",
    phases: [
      {
        weeks: "Weeks 1 to 3",
        name: "Clean the inputs",
        body: "We pull sales history, stock levels, open purchase orders, and supplier terms. Most of this phase is fixing item records and measuring real lead times, which rarely match the ones in the system.",
      },
      {
        weeks: "Weeks 4 to 7",
        name: "Forecast and test on history",
        body: "We build forecasts and reorder points, then test them on the last 12 to 24 months. We compare what the system would have ordered with what you ordered and what actually sold.",
      },
      {
        weeks: "Weeks 8 to 12",
        name: "Shadow mode",
        body: "Each week the system proposes a purchase list while your buyer orders as usual. We compare the two and adjust safety stock and rules on the differences.",
      },
      {
        weeks: "Weeks 13 to 16",
        name: "Live with approval",
        body: "The buyer works from the proposed list and approves every line. The system flags demand spikes and late suppliers. It never places an order.",
      },
    ],
  },
  get: [
    "Reorder proposals your buyer trusts, fewer stockouts on the items that matter, and cash recovered from slow stock. A clear before and after on numbers you already track.",
    "After launch, we track forecast accuracy every week and retrain the models as seasons and suppliers change. Your buyer keeps the final say on every order.",
  ],
  deliverables: [
    "Cleaned item records and measured lead times by supplier",
    "Forecasts and reorder points for every active item",
    "A weekly purchase proposal with the math shown on each line",
    "A slow stock report with a suggested plan for each item",
    "Alerts for demand spikes and supplier delays",
    "A runbook and training for the buyer",
  ],
  needs: [
    "At least 12 months of sales history, or 24 if you have strong seasons",
    "Your buyer for about two hours a week",
    "Supplier lead times and minimum order quantities, or permission to measure them",
  ],
  measures: [
    "Stockouts on your top 20 percent of items",
    "Cash in stock with no sale in 180 days",
    "Inventory turns",
    "Buyer hours per week on reordering",
  ],
  practice: {
    intro:
      "A pool and spa supply distributor doing $10M a year carries about 3,000 active items from 60 suppliers. Demand swings hard with the season, and many items come from overseas on 10 to 14 week lead times.",
    beats: [
      {
        label: "Before",
        text: "The buyer reorders from a min and max report and memory. Top items stock out several times each spring. About $450K sits in items with no sale in six months.",
      },
      {
        label: "The build",
        text: "We measure real lead times from two years of purchase orders, and overseas suppliers run about three weeks longer than the system says. Forecasts account for the season. The system runs in shadow mode for five weeks before the buyer starts working from its list.",
      },
      {
        label: "After",
        text: "Over the next season, stockouts on the top 300 items fall by about half. Slow stock drops by about $150K through markdowns and supplier returns. Reordering takes the buyer about four hours a week, down from about twelve.",
      },
    ],
  },
  engagement: {
    duration: "Ten to sixteen weeks",
    body: "Usually a late first-quarter or second-term system, because it works best on unified sales and purchasing data. Timing matters too. We aim to go live a few weeks before your main buying season so shadow mode covers real volume.",
  },
};

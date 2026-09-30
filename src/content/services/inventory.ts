import type { Service } from "./types";

export const inventory: Service = {
  slug: "inventory",
  title: "Inventory Intelligence",
  eyebrow: "Inventory Intelligence",
  headline:
    "Your bestsellers should never run out and your cash should never sleep on a shelf.",
  problemStatement:
    "Your bestsellers run out while cash sits trapped in inventory that has not moved in a year.",
  card: "Reorder logic built around how your business actually works.",
  metaTitle: "Inventory Intelligence",
  metaDescription:
    "Reorder signals you can trust, with deterministic math and a human approving every purchase. Fewer stockouts, cash recovered from dead stock, owned by you.",
  problem: [
    "Stockouts on the products that drive your revenue. Capital tied up in inventory that has not moved in a year. Counts that drift from reality a little more each month.",
    "The cost shows up in two places you watch closely, lost sales and trapped cash, which is why this is often the easiest system to justify on numbers alone.",
  ],
  build: [
    "Honest framing matters here. If your inventory needs are standard, capable off-the-shelf tools exist and we will tell you so in the discovery project. We build custom inventory systems when the situation is genuinely non-standard. Multi-channel setups that confuse template software, unusual supplier constraints and lead times, perishability, kitting and assembly, reorder logic that reflects how your business actually buys.",
    "The math underneath is classical and proven, forecasting plus reorder points plus safety stock, kept fully deterministic with a human approving every purchase decision. AI surfaces the anomalies and sharpens the forecasts. It never spends your money.",
  ],
  get: [
    "Reorder signals you trust, fewer stockouts on the products that matter, and capital recovered from dead stock. A clear before-and-after on numbers you already track.",
    "The system behind those signals belongs to you. The forecasts, the reorder logic, and the data pipeline run in your accounts, documented for your team.",
  ],
  practice: {
    intro:
      "A specialty outdoor retailer doing $6M a year sold around four hundred SKUs through a storefront, its own online store, and two marketplaces, with most products on twelve-week lead times from overseas suppliers.",
    beats: [
      {
        label: "Before",
        text: "Reordering ran on a spreadsheet and the buyer's memory. The bestsellers ran out two or three times every season, usually during the weeks that drive the year, and roughly $200,000 sat in products that had not sold through in over a year.",
      },
      {
        label: "The build",
        text: "We unified sell-through across all three channels, then built reorder points and safety stock around each supplier's real lead times and minimum order quantities. Every Monday the system produces a proposed purchase list with the math behind every line visible. The buyer reviews the list, adjusts for anything the data cannot see, and approves each order. AI flags the anomalies, a demand spike on one channel, a supplier's lead time slipping. It never places an order.",
      },
      {
        label: "After",
        text: "Across the next two buying seasons the bestsellers stocked out twice, both on supplier delays the system flagged weeks ahead. Planned markdowns turned about $120,000 of the dead stock back into cash, and the weekly reorder review takes the buyer under an hour.",
      },
    ],
  },
  engagement: {
    duration: "Three to six weeks",
    body: "Often a late first-quarter or second-term system, since it works best on unified sales and lead-time data. The scorecard tracks stockouts on top products and cash tied up in slow stock.",
  },
};

import type { Service } from "./types";

export const businessIntelligence: Service = {
  slug: "business-intelligence",
  title: "Business Intelligence and Custom MCP",
  eyebrow: "Business Intelligence and Custom MCP",
  headline:
    "Your leadership team should get answers in minutes, from the tools they already use.",
  problemStatement:
    "Leadership waits days for reports, and the AI assistants your team already uses cannot see your business data.",
  card: "Dashboards for the numbers leadership tracks, plus secure connections that let Claude or ChatGPT answer questions from your own systems.",
  metaTitle: "Business Intelligence and Custom MCP",
  metaDescription:
    "Leadership dashboards plus custom MCP servers that let AI assistants answer questions from your own systems, with permissions you control.",
  problem: [
    "Most owners get their numbers in a weekly spreadsheet that someone builds by hand. A new question means a new request and a few days of waiting. By the time the answer arrives, the decision has often been made on instinct.",
    "Meanwhile your team already uses Claude or ChatGPT every day. Those assistants write a good email, but they cannot see last week's sales, open orders, or customer history. So people paste exports into chat windows, which is slow and puts your data in places you do not control.",
  ],
  build: [
    "We build two things on top of your data. The first is a small set of dashboards for the numbers leadership reviews every week, each with one written definition and one owner.",
    "The second is a custom MCP server. MCP, the Model Context Protocol, is an open standard that lets AI assistants connect to other systems. Ours gives Claude or ChatGPT read access to your warehouse, ERP, or CRM through a short list of tools we define, such as open orders by customer or margin by product line. Each person sees only what their role allows, and every query is logged.",
  ],
  approach: {
    intro:
      "Six to ten weeks when your data already lives in one place. If it does not, we build a Unified Data System first and this follows in the next quarter.",
    phases: [
      {
        weeks: "Weeks 1 to 2",
        name: "Collect the questions",
        body: "We interview leadership and gather the 30 to 50 questions they ask most. We group them into the metrics and tools the system needs.",
      },
      {
        weeks: "Weeks 3 to 5",
        name: "Build the dashboards",
        body: "We define each metric in writing and build dashboards for the weekly review. Every number ties back to your books or your system of record.",
      },
      {
        weeks: "Weeks 5 to 8",
        name: "Build the MCP server",
        body: "We build a server with 10 to 20 approved tools and connect it to your assistant accounts. Permissions follow your existing roles, and the server reads data without changing it.",
      },
      {
        weeks: "Weeks 9 to 10",
        name: "Test and train",
        body: "We test the system against the original question list and fix wrong answers. Then we train each team on what to ask and how to check a result.",
      },
    ],
  },
  get: [
    "Leadership answers its own questions in minutes. A sales manager can ask which accounts ordered less this quarter and get a list built from live data, with the query shown so anyone can check it.",
    "After launch, we keep the dashboards and the MCP server current as your systems change. If you switch AI assistants next year, the server works with the new one.",
  ],
  deliverables: [
    "Dashboards for the weekly leadership review",
    "Written definitions for every metric shown",
    "A custom MCP server with 10 to 20 approved tools",
    "Role-based permissions and a log of every query",
    "A test set of real questions with checked answers",
    "Training for leadership and one admin",
  ],
  needs: [
    "About an hour with each member of leadership for the question interviews",
    "Admin access to your Claude or ChatGPT business accounts",
    "Your data in one place, or a plan to get it there first",
  ],
  measures: [
    "Manual report requests per month",
    "Share of test questions answered correctly",
    "Weekly active users among leadership",
  ],
  practice: {
    intro:
      "A regional HVAC services company doing $18M a year runs dispatch, accounting, and its CRM in three separate systems. A unified warehouse already exists from an earlier quarter.",
    beats: [
      {
        label: "Before",
        text: "The owner gets a Monday spreadsheet from the office manager that takes about four hours to build. Questions about technician utilization or membership renewals go into an email and come back days later.",
      },
      {
        label: "The build",
        text: "We build five dashboards for the weekly meeting and an MCP server with 14 tools covering jobs, revenue, memberships, and technician hours. Service managers see their own branch. The owner and controller see everything. Payroll data stays out of the server.",
      },
      {
        label: "After",
        text: "The Monday spreadsheet is retired. Leadership asks about 40 questions a week through the assistant. The test set scores 46 of 50, and the 4 misses are flagged as out of scope instead of answered wrong.",
      },
    ],
  },
  engagement: {
    duration: "Six to ten weeks",
    body: "Usually the quarter after a Unified Data System, when the numbers are already trusted. It is often the system leadership uses most, because it answers the questions they ask every week. The scorecard tracks manual report requests and answer accuracy.",
  },
};

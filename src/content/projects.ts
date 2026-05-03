export type Project = {
  slug: string;
  number: string;
  name: string;
  url: string;
  oneLiner: string;
  description: string;
  stack: string[];
  screenshot: string;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "pipeline",
    number: "01",
    name: "Pipeline",
    url: "https://pipeline.help",
    oneLiner: "Book 5 to 10 sales meetings every month, without an SDR.",
    description:
      "End-to-end LinkedIn outreach platform. Visual workflow builder, multi-account orchestration, AI sentiment analysis, agentic reply drafting, and a hosted MCP server. 687+ TypeScript files, 11 production agents, 176+ API routes.",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Supabase",
      "Drizzle",
      "Claude",
      "Unipile",
      "Stripe",
      "ReactFlow",
      "XState",
    ],
    screenshot: "/screenshots/pipeline.png",
    year: "2026",
  },
  {
    slug: "dmand",
    number: "02",
    name: "Dmand AI",
    url: "https://dmand.ai",
    oneLiner: "The GTM engine for healthcare sales.",
    description:
      "AI-powered prospecting platform for healthcare. Surfaces relevant HCPs and HCOs, generates ROI-driven sales pitches, and streamlines provider research. Server-rendered with App Router on Vercel.",
    stack: ["Next.js", "TypeScript", "Tailwind", "AI", "Vercel"],
    screenshot: "/screenshots/dmand.png",
    year: "2026",
  },
  {
    slug: "game-of-streaks",
    number: "03",
    name: "Game of Streaks",
    url: "https://gameofstreaks.com",
    oneLiner: "Free-to-play sports predictions. The thrill without the bill.",
    description:
      "Consumer web app for daily sports predictions. Build streaks, win cash prizes, and compete on a public leaderboard. Auth, scoring engine, hall of fame, and a backend tuned for daily-active engagement.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    screenshot: "/screenshots/game-of-streaks.png",
    year: "2025",
  },
  {
    slug: "quick-enrich",
    number: "04",
    name: "QuickEnrich Tools",
    url: "https://gtm.quickenrich.io",
    oneLiner: "Six free, open-source lead-gen tools. Bring your own keys.",
    description:
      "An MIT-licensed suite of in-browser GTM tools for finding the companies and people you actually want to talk to. Self-hostable, BYOK, no servers store your data. Designed for lean ops teams and indie founders.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Open Source"],
    screenshot: "/screenshots/quick-enrich.png",
    year: "2025",
  },
];

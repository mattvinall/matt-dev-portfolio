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
    name: "DMAND",
    url: "https://trydmand.ai",
    oneLiner: "3 to 5x your LinkedIn response rates without sounding like AI.",
    description:
      "LinkedIn message co-pilot for founders, coaches, and B2B teams. Analyzes the user's offering, builds personalized outreach, and keeps accounts safe. Instant 2-minute setup, AI-generated messages that read human.",
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

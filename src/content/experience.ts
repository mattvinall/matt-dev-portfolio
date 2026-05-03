export type ExperienceEntry = {
  role: string;
  company: string;
  location?: string;
  period: string;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Founder & Developer",
    company: "Pipeline Labs",
    location: "Remote",
    period: "Jan 2026 → Present",
    summary:
      "Built a full-stack AI LinkedIn outreach platform from zero to paying customers. Next.js 15, React 19, TypeScript, 100+ API routes, multi-tenant Supabase with RLS, ReactFlow + XState workflow engine, 11 production AI agents on Claude, and a public remote MCP server. Full E2E coverage with Playwright + Vitest.",
  },
  {
    role: "Co-Founder & CTO",
    company: "DMAND",
    location: "Remote",
    period: "Jul 2025 → Dec 2025",
    summary:
      "Built the entire platform as the only engineer. AI LinkedIn outreach, lead finder, prospect search, inbox, CRM pipeline, and post automation. Owned everything end to end: code, demo calls, customer onboarding, and product iteration. Multi-tier test coverage from day one (Jest, Playwright, regression suite for the Sales Navigator integration).",
  },
  {
    role: "Founder",
    company: "Leadsimple.io",
    location: "Remote",
    period: "Nov 2023 → Dec 2025",
    summary:
      "Ran a B2B outbound systems consultancy. Built and operated full GTM infrastructure for early-stage SaaS companies. Designed and managed cold email systems sending 5,000 to 10,000 emails per day across multiple client accounts. Owned the full outbound stack: sourcing, sequencing, deliverability, inbox, reporting, and demo booking.",
  },
  {
    role: "Software Developer",
    company: "Gore Mutual Insurance",
    location: "Remote",
    period: "Aug 2021 → Nov 2022",
    summary:
      "Built a real-time Metrics Dashboard pulling call data from Amazon Connect (React/TypeScript frontend, Lambda + DynamoDB backend, CloudWatch). Shipped serverless functions, S3, and EC2 across multiple POC delivery cycles. Earned AWS Certified Developer Associate within 3 months of joining.",
  },
  {
    role: "Team Lead, Web Development",
    company: "Q4 Inc",
    location: "Toronto, ON",
    period: "Jan 2021 → Jun 2023",
    summary:
      "Led a global team of four developers across LATAM and Canada delivering for Spotify, Pfizer, Moderna, Ford, and SBA Communications. Owned capacity, sprint planning, code reviews, retrospectives, hiring loops, and weekly 1:1s. Estimated out-of-scope features and held the team to quarterly KPIs.",
  },
  {
    role: "Lead JavaScript Mentor",
    company: "Juno College of Technology",
    location: "Toronto, ON",
    period: "Apr 2021 → Aug 2021",
    summary:
      "Mentored students through an intensive bootcamp covering JavaScript, React, and full-stack fundamentals.",
  },
  {
    role: "Web Developer II",
    company: "Q4 Inc",
    location: "Toronto, ON",
    period: "Aug 2019 → Dec 2020",
    summary:
      "Built Investor Relations sites on a proprietary CMS using HTML, JavaScript, SASS, and internal APIs. Delivered 100+ live client IR sites in 18 months. Trained and scaled the activations department from 3 to 20+ developers in one year. Built internal tooling with React, Firebase, AWS, and Puppeteer.",
  },
];

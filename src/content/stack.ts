export const stackStatement = {
  daily: "TypeScript",
  most: "React, Next.js, and Tailwind",
  hard: "Claude and MCP",
  data: "Supabase and Drizzle",
  ship: "Vercel",
};

export type StackPillar = {
  number: string;
  category: string;
  intent: string;
  primary: string[];
  secondary: string[];
};

export const stackPillars: StackPillar[] = [
  {
    number: "01",
    category: "Frontend",
    intent: "Where the user actually meets the product.",
    primary: ["TypeScript", "React 19", "Next.js 15", "Tailwind CSS"],
    secondary: ["Framer Motion", "ReactFlow", "Radix UI", "shadcn/ui"],
  },
  {
    number: "02",
    category: "Backend & Data",
    intent: "The boring 99%. Schema first, always.",
    primary: ["Supabase", "Drizzle ORM", "PostgreSQL", "Node.js"],
    secondary: ["REST", "JSON-RPC", "MCP", "AWS Lambda"],
  },
  {
    number: "03",
    category: "AI & Agents",
    intent: "Tool-using agents over single prompts. Evals over vibes.",
    primary: ["Anthropic Claude", "Model Context Protocol", "Tool use"],
    secondary: ["Prompt engineering", "RAG", "Evals", "Claude Code"],
  },
];

export const supportingStack = [
  "Clerk",
  "Stripe",
  "TanStack Query",
  "XState",
  "Zod",
  "Vercel",
  "Railway",
  "Cloudflare",
  "Vitest",
  "Playwright",
  "Jest",
];

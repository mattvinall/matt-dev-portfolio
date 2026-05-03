"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const items = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind",
  "Supabase",
  "Drizzle",
  "Anthropic Claude",
  "MCP",
  "Framer Motion",
  "Stripe",
  "Clerk",
  "TanStack Query",
  "XState",
  "ReactFlow",
  "Vercel",
  "Postgres",
];

export function Marquee() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && theme === "terminal") return null;

  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <div className="flex w-max animate-marquee gap-12 font-mono text-sm text-text-muted">
        {doubled.map((item, i) => (
          <span key={i} className="whitespace-nowrap">
            {item} <span className="text-accent/60">·</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

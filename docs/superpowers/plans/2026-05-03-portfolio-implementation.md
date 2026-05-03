# Matt Vinall Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page developer portfolio at `matt-dev.vercel.app` with two complete design systems (Editorial + Terminal) toggled by the user, showcasing four featured projects with screenshots, professional bio, and contact info.

**Architecture:** Next.js 15 App Router (single page, anchored sections). Theme system uses `next-themes` with `data-theme` attribute driving CSS variable swaps — same DOM, different visuals. All content lives in typed TS files under `src/content/` for easy edits without touching JSX. Motion via `framer-motion`. Deployed on Vercel.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v3, framer-motion, next-themes, next/image, next/font (Geist Sans, Geist Mono, Instrument Serif).

**Spec:** `docs/superpowers/specs/2026-05-03-portfolio-design.md`

**Testing approach:** This is a static portfolio site — there are no business-logic units worth unit-testing. Verification at each task is **visual**: run the dev server (already running in background by Task 1), navigate via Playwright MCP browser tool, take a screenshot, confirm it matches the spec. Lighthouse + accessibility verified at the end. No vitest/jest setup.

---

## Phase 1: Foundation

### Task 1: Scaffold Next.js project

**Files:**
- Create: entire `C:\Users\Matt\Desktop\matt-dev-portfolio\` project tree

- [ ] **Step 1: Run create-next-app**

```bash
cd C:/Users/Matt/Desktop && npx --yes create-next-app@latest matt-dev-portfolio --typescript --tailwind --app --src-dir --turbopack --import-alias "@/*" --no-eslint --use-npm
```

Expected: scaffold completes, prints "Success! Created matt-dev-portfolio".

- [ ] **Step 2: Verify scaffold**

```bash
ls C:/Users/Matt/Desktop/matt-dev-portfolio
```

Expected: see `src/`, `public/`, `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`.

- [ ] **Step 3: Start dev server in background**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && npm run dev
```

Run as background process (Bash `run_in_background: true`). Note the port (default 3000). Leave running for the rest of the plan.

- [ ] **Step 4: Init git + first commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git init && git add -A && git commit -m "chore: scaffold next.js project"
```

Expected: initial commit created.

---

### Task 2: Install runtime dependencies

**Files:**
- Modify: `C:/Users/Matt/Desktop/matt-dev-portfolio/package.json`

- [ ] **Step 1: Install packages**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && npm install framer-motion next-themes clsx tailwind-merge
```

Expected: all four packages added to `dependencies`.

- [ ] **Step 2: Verify package.json**

Read `package.json` and confirm `framer-motion`, `next-themes`, `clsx`, `tailwind-merge` appear in `dependencies`.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add package.json package-lock.json && git commit -m "chore: install motion, themes, util deps"
```

---

### Task 3: Configure fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx font setup**

Overwrite `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matt Vinall — Full-Stack AI Engineer",
  description: "Building AI products that ship, from prompt to production. 8 years of full-stack engineering, currently shipping AI agents.",
  metadataBase: new URL("https://matt-dev.vercel.app"),
  openGraph: {
    title: "Matt Vinall — Full-Stack AI Engineer",
    description: "Building AI products that ship, from prompt to production.",
    url: "https://matt-dev.vercel.app",
    siteName: "Matt Vinall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Vinall — Full-Stack AI Engineer",
    description: "Building AI products that ship, from prompt to production.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body className="bg-bg text-text antialiased font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

Note: `ThemeProvider` is created in Task 5. The build will fail until then — that's expected.

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/app/layout.tsx && git commit -m "feat: configure fonts and metadata"
```

---

### Task 4: Set up Tailwind theme tokens + globals.css

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Replace tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-secondary)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-3px)" },
          "50%": { transform: "translateY(3px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root,
  [data-theme="editorial"] {
    --bg: #0a0a0a;
    --surface: #141414;
    --text: #fafafa;
    --text-muted: #a1a1aa;
    --accent: #f97316;
    --accent-secondary: #f97316;
    --border: #262626;
  }

  [data-theme="terminal"] {
    --bg: #0d0f0c;
    --surface: #11140f;
    --text: #d4d4aa;
    --text-muted: #7a7d65;
    --accent: #f97316;
    --accent-secondary: #a3e635;
    --border: #2a2d22;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    transition: background-color 400ms ease, color 400ms ease;
  }

  ::selection {
    background: var(--accent);
    color: var(--bg);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 3: Create src/lib/utils.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add tailwind.config.ts src/app/globals.css src/lib/utils.ts && git commit -m "feat: theme tokens, tailwind config, cn util"
```

---

### Task 5: Theme provider + toggle

**Files:**
- Create: `src/components/theme-provider.tsx`
- Create: `src/components/theme-toggle.tsx`

- [ ] **Step 1: Create theme-provider.tsx**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="editorial"
      themes={["editorial", "terminal"]}
      enableSystem={false}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 2: Create theme-toggle.tsx**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "editorial", label: "Editorial" },
  { value: "terminal", label: "Terminal" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-[180px] rounded-full border border-border" aria-hidden />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Select visual theme"
      className="inline-flex h-9 items-center rounded-full border border-border bg-surface p-1 font-mono text-xs"
    >
      {themes.map((t) => {
        const active = theme === t.value;
        return (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(t.value)}
            className={cn(
              "rounded-full px-3 py-1 transition-colors duration-300",
              active ? "bg-accent text-bg" : "text-text-muted hover:text-text"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Verify dev server is running and renders without error**

Use Playwright MCP browser tool: navigate to `http://localhost:3000`. Expected: blank page (no content yet) with no console errors. The body should have `data-theme="editorial"` on the `<html>`.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/theme-provider.tsx src/components/theme-toggle.tsx && git commit -m "feat: theme provider + toggle"
```

---

## Phase 2: Content & Assets

### Task 6: Create content files

**Files:**
- Create: `src/content/bio.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/stack.ts`
- Create: `src/content/experience.ts`

- [ ] **Step 1: Create bio.ts**

```ts
export const bio = {
  name: "Matt Vinall",
  title: "Full-Stack AI Engineer",
  yearsExperience: 8,
  startYear: 2018,
  location: "Beamsville, ON, Canada",
  email: "matt.vinall7@gmail.com",
  linkedin: "https://linkedin.com/in/matt-vinalll",
  github: "https://github.com/mattvinall",
  tagline: "Building AI products that ship, from prompt to production.",
  about: [
    "I build full-stack AI products end-to-end. From the schema to the prompt to the pixel, I own the loop. Eight years in, what I optimize for is shipping things that work in the hands of real users, not demos that look good in a deck.",
    "My current focus is the intersection of AI agents and product surfaces. I've shipped multiple production agent systems on top of Claude, MCP, and structured tool use. I care about evals, latency, cost, and the quiet 99% of the work that lives between a model call and a feature people trust.",
    "When I'm reviewing a problem, I read the schema first, the failure modes second, and the happy path last. Most bugs live in the gap between what a system promises and what it actually guarantees.",
  ],
} as const;
```

- [ ] **Step 2: Create projects.ts**

```ts
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
    oneLiner: "AI outreach automation for LinkedIn.",
    description:
      "End-to-end LinkedIn outreach platform. Visual workflow builder, multi-account orchestration, AI sentiment analysis, agentic reply drafting, and a hosted MCP server. 687+ TypeScript files, 11 production agents, 176+ API routes.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Drizzle", "Claude", "Unipile", "Stripe", "ReactFlow", "XState"],
    screenshot: "/screenshots/pipeline.webp",
    year: "2026",
  },
  {
    slug: "dmand",
    number: "02",
    name: "Dmand",
    url: "https://dmand.ai",
    oneLiner: "AI-powered demand generation engine.",
    description:
      "Marketing surface and lead-gen funnel for the Dmand brand. Server-rendered with App Router, edge-cached marketing pages, and a content system tuned for conversion.",
    stack: ["Next.js 15", "TypeScript", "Tailwind", "Vercel"],
    screenshot: "/screenshots/dmand.webp",
    year: "2026",
  },
  {
    slug: "game-of-streaks",
    number: "03",
    name: "Game of Streaks",
    url: "https://gameofstreaks.com",
    oneLiner: "Daily streak game and habit-tracking community.",
    description:
      "Consumer web app built around daily streaks. Auth, leaderboards, social mechanics, and a backend tuned for daily-active engagement.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    screenshot: "/screenshots/game-of-streaks.webp",
    year: "2025",
  },
  {
    slug: "quick-enrich",
    number: "04",
    name: "Quick Enrich GTM",
    url: "https://gtm.quickenrich.io",
    oneLiner: "On-demand GTM data enrichment.",
    description:
      "Marketing site and product surface for the Quick Enrich GTM toolkit. Real-time enrichment workflows, integrations with major data providers, and a clean operator UX.",
    stack: ["Next.js", "TypeScript", "Tailwind", "AI Enrichment"],
    screenshot: "/screenshots/quick-enrich.webp",
    year: "2025",
  },
];
```

- [ ] **Step 3: Create stack.ts**

```ts
export const stack = [
  {
    category: "Frontend",
    items: ["TypeScript", "React 19", "Next.js 15", "Tailwind CSS", "Framer Motion", "ReactFlow", "Radix UI", "shadcn/ui"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "Supabase", "Drizzle ORM", "REST", "JSON-RPC", "MCP"],
  },
  {
    category: "AI / ML",
    items: ["Anthropic Claude", "Tool use", "Model Context Protocol", "Prompt engineering", "RAG", "Evals"],
  },
  {
    category: "Auth & Payments",
    items: ["Clerk", "Stripe"],
  },
  {
    category: "State & Data",
    items: ["TanStack Query", "XState", "Zod"],
  },
  {
    category: "Infra",
    items: ["Vercel", "Railway", "Supabase", "Cloudflare"],
  },
] as const;
```

- [ ] **Step 4: Create experience.ts**

```ts
export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Founder & Engineer",
    company: "Pipeline",
    period: "2025 — Present",
    summary:
      "Building Pipeline end-to-end. Architecture, schema, agents, UX, billing, and the hosted MCP server. Scaled to dozens of paying workspaces.",
  },
  {
    role: "Founder & Engineer",
    company: "Dmand",
    period: "2025 — Present",
    summary:
      "Designed and shipped the Dmand marketing surface and lead-generation engine.",
  },
  {
    role: "Independent Engineer & Builder",
    company: "Various",
    period: "2018 — 2025",
    summary:
      "Eight years across consumer apps, internal tools, AI prototypes, and full-stack contract work. Shipped Game of Streaks, Quick Enrich, and a long tail of unreleased experiments.",
  },
];
```

- [ ] **Step 5: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/content && git commit -m "feat: bio, projects, stack, experience content"
```

---

### Task 7: Process portrait image (transparent background)

**Files:**
- Create: `public/portrait.png`

The user's source image has a circular orange ring around them on a white background. We need to remove the white and keep the orange ring visible on dark themes.

- [ ] **Step 1: Locate the source image**

Source: `C:\Users\Matt\.claude\image-cache\8239ac64-59de-4d35-a1a0-b754d506bb54\1.png`

Verify it exists:

```bash
ls "C:/Users/Matt/.claude/image-cache/8239ac64-59de-4d35-a1a0-b754d506bb54/1.png"
```

- [ ] **Step 2: Remove white background using ImageMagick (if available) or sharp**

Try ImageMagick first:

```bash
magick "C:/Users/Matt/.claude/image-cache/8239ac64-59de-4d35-a1a0-b754d506bb54/1.png" -fuzz 10% -transparent white "C:/Users/Matt/Desktop/matt-dev-portfolio/public/portrait.png"
```

If `magick` not installed, fall back to sharp:

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && npm install --save-dev sharp
```

Then create `scripts/process-portrait.mjs`:

```js
import sharp from "sharp";
import { readFileSync } from "node:fs";

const src = "C:/Users/Matt/.claude/image-cache/8239ac64-59de-4d35-a1a0-b754d506bb54/1.png";
const out = "public/portrait.png";

const input = sharp(src).ensureAlpha();
const { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
const channels = info.channels;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  if (r > 240 && g > 240 && b > 240) data[i + 3] = 0;
}
await sharp(data, { raw: { width: info.width, height: info.height, channels } })
  .png()
  .toFile(out);
console.log("wrote", out);
```

Run:

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && node scripts/process-portrait.mjs
```

Expected: `public/portrait.png` created with transparent background.

- [ ] **Step 3: Verify visually**

Open `public/portrait.png` (use the Read tool — this is a multimodal LLM and can view images). Confirm: white background gone, orange ring intact, person visible.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add public/portrait.png scripts/ && git commit -m "feat: process portrait with transparent background"
```

---

### Task 8: Capture project screenshots

**Files:**
- Create: `public/screenshots/pipeline.webp`
- Create: `public/screenshots/dmand.webp`
- Create: `public/screenshots/game-of-streaks.webp`
- Create: `public/screenshots/quick-enrich.webp`

- [ ] **Step 1: Create screenshots directory**

```bash
mkdir -p C:/Users/Matt/Desktop/matt-dev-portfolio/public/screenshots
```

- [ ] **Step 2: Capture each project via Playwright MCP**

For each URL below, use the `mcp__plugin_compound-engineering_pw__browser_navigate` tool, then `browser_take_screenshot` with `fullPage: false`, viewport `1440x900`. Save the screenshot, then convert to webp.

URLs:
- https://pipeline.help → `public/screenshots/pipeline.webp`
- https://dmand.ai → `public/screenshots/dmand.webp`
- https://gameofstreaks.com → `public/screenshots/game-of-streaks.webp`
- https://gtm.quickenrich.io → `public/screenshots/quick-enrich.webp`

For each:
1. `browser_resize` to 1440x900
2. `browser_navigate` to URL
3. Wait ~2 seconds for animations to settle (use `browser_wait_for` if a known element exists)
4. `browser_take_screenshot` to a temp PNG
5. Convert PNG to WebP using sharp:

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && node -e "import('sharp').then(s => s.default('TEMP_PATH').webp({ quality: 85 }).resize(1440, 900, { fit: 'cover', position: 'top' }).toFile('public/screenshots/SLUG.webp').then(() => console.log('done')))"
```

Replace `TEMP_PATH` and `SLUG` per project.

- [ ] **Step 3: Verify all four screenshots exist**

```bash
ls C:/Users/Matt/Desktop/matt-dev-portfolio/public/screenshots
```

Expected: 4 .webp files.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add public/screenshots && git commit -m "feat: project screenshots"
```

---

## Phase 3: Shared Components

### Task 9: Motion primitives

**Files:**
- Create: `src/components/motion/fade-up.tsx`

- [ ] **Step 1: Create fade-up.tsx**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "li" | "h1" | "h2" | "h3" | "p" | "span";
};

export function FadeUp({ children, delay = 0, className, as = "div" }: FadeUpProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/motion && git commit -m "feat: FadeUp motion primitive"
```

---

### Task 10: Portrait component

**Files:**
- Create: `src/components/portrait.tsx`

- [ ] **Step 1: Create portrait.tsx**

```tsx
"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Portrait() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isTerminal = mounted && theme === "terminal";

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[420px] transition-all duration-500",
        isTerminal ? "" : "animate-float"
      )}
    >
      <Image
        src="/portrait.png"
        alt="Portrait of Matt Vinall standing in a tree platform"
        fill
        sizes="(max-width: 768px) 80vw, 420px"
        priority
        className={cn(
          "object-contain transition-all duration-500",
          isTerminal && "saturate-50 contrast-125"
        )}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/portrait.tsx && git commit -m "feat: portrait component"
```

---

### Task 11: Marquee component

**Files:**
- Create: `src/components/marquee.tsx`

- [ ] **Step 1: Create marquee.tsx**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const items = [
  "TypeScript", "Next.js", "React", "Tailwind", "Supabase", "Drizzle",
  "Anthropic Claude", "MCP", "Framer Motion", "Stripe", "Clerk",
  "TanStack Query", "XState", "ReactFlow", "Vercel", "Postgres",
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
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/marquee.tsx && git commit -m "feat: stack marquee for editorial mode"
```

---

### Task 12: ASCII divider

**Files:**
- Create: `src/components/ascii-divider.tsx`

- [ ] **Step 1: Create ascii-divider.tsx**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AsciiDivider({ label }: { label: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "terminal") {
    return (
      <div className="flex items-center gap-4 py-4">
        <span className="font-mono text-xs uppercase tracking-widest text-text-muted">{label}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return (
    <div className="py-4 font-mono text-xs text-text-muted">
      <span aria-hidden>─────────────────────  </span>
      <span className="text-accent-2">{label}</span>
      <span aria-hidden>  ─────────────────────</span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/ascii-divider.tsx && git commit -m "feat: ascii divider that swaps per theme"
```

---

### Task 13: Project card

**Files:**
- Create: `src/components/project-card.tsx`

- [ ] **Step 1: Create project-card.tsx**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isTerminal = mounted && theme === "terminal";

  if (isTerminal) {
    return (
      <motion.li
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group block rounded-md border border-border bg-surface p-6 font-mono text-sm"
      >
        <div className="text-text-muted">
          <span className="text-accent-2">commit</span> {project.number} ·{" "}
          <Link href={project.url} target="_blank" rel="noreferrer" className="text-text underline-offset-4 hover:text-accent hover:underline">
            {project.url.replace(/^https?:\/\//, "")}
          </Link>
        </div>
        <div className="mt-1 text-text-muted">
          <span className="text-accent-2">Author:</span> Matt Vinall &lt;matt.vinall7@gmail.com&gt;
        </div>
        <div className="mt-1 text-text-muted">
          <span className="text-accent-2">Stack:</span>{" "}
          {project.stack.map((s) => s.toLowerCase()).join(" · ")}
        </div>
        <p className="mt-4 pl-4 text-text">{project.description}</p>
        <div className="mt-6 overflow-hidden rounded-sm border border-border">
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            width={1440}
            height={900}
            className="h-auto w-full saturate-50 transition-all duration-500 group-hover:saturate-100"
          />
        </div>
        <Link
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-accent hover:underline"
        >
          [view live →]
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={project.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} in a new tab`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            width={1440}
            height={900}
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {project.number} · {project.year}
            </div>
            <h3 className="mt-2 font-serif text-3xl text-text">
              {project.name}
            </h3>
            <p className="mt-2 max-w-xl text-text-muted">{project.oneLiner}</p>
          </div>
          <span className="font-mono text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
            →
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-border px-2.5 py-1">
              {s}
            </li>
          ))}
        </ul>
      </Link>
    </motion.li>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/project-card.tsx && git commit -m "feat: project card with editorial + terminal variants"
```

---

## Phase 4: Sections

### Task 14: Hero section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Create hero.tsx**

```tsx
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bio } from "@/content/bio";
import { Portrait } from "@/components/portrait";

const lines = [
  bio.title,
  bio.tagline,
];

export function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);

  const isTerminal = mounted && theme === "terminal";

  if (isTerminal) {
    return (
      <section id="top" className="mx-auto grid max-w-6xl gap-10 px-6 pt-24 pb-16 md:grid-cols-[1fr_auto] md:items-start">
        <div className="font-mono text-sm leading-relaxed text-text">
          <div className="text-text-muted">
            <span className="text-accent-2">matt@portfolio</span>:<span className="text-accent">~</span>$ whoami
          </div>
          <div className="mt-4 text-2xl text-text md:text-3xl">{bio.name}</div>
          <div className="mt-1 text-text-muted">{bio.title} · {bio.location}</div>
          <p className="mt-6 max-w-xl text-text">&gt; {bio.tagline} {bio.yearsExperience} years building products. Currently shipping AI agents.</p>

          <div className="mt-8 text-text-muted">
            <span className="text-accent-2">matt@portfolio</span>:<span className="text-accent">~</span>$ ls ./projects
          </div>
          <div className="mt-2 text-text">pipeline/&nbsp;&nbsp;dmand/&nbsp;&nbsp;game-of-streaks/&nbsp;&nbsp;quick-enrich/</div>

          <div className="mt-8 text-text-muted">
            <span className="text-accent-2">matt@portfolio</span>:<span className="text-accent">~</span>$ cat ./contact
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent align-middle" aria-hidden />
          </div>

          <div className="mt-6 flex gap-4">
            <Link href="#work" className="text-accent hover:underline">[view work →]</Link>
            <Link href={`mailto:${bio.email}`} className="text-accent hover:underline">[get in touch →]</Link>
          </div>
        </div>
        <div className="hidden md:block w-[260px]">
          <Portrait />
        </div>
      </section>
    );
  }

  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-10 px-6 pt-24 pb-20 md:grid-cols-[3fr_2fr] md:items-center">
      <div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          {bio.location} · Available for work
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-tightest text-text"
        >
          Matt
          <br />
          <span className="italic text-accent">Vinall.</span>
        </motion.h1>
        {lines.map((line, i) => (
          <motion.p
            key={line}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? "mt-8 font-mono text-sm uppercase tracking-widest text-text-muted" : "mt-4 max-w-xl text-balance text-lg text-text-muted"}
          >
            {line}
          </motion.p>
        ))}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            View work
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </Link>
          <Link
            href={`mailto:${bio.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-sm text-bg transition-transform hover:scale-[1.02]"
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
      <div className="flex justify-center md:justify-end">
        <Portrait />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Use Playwright MCP: navigate to `http://localhost:3000`, screenshot. Hero should not yet render (we haven't wired it into page.tsx). That's fine.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/sections/hero.tsx && git commit -m "feat: hero section"
```

---

### Task 15: About section

**Files:**
- Create: `src/components/sections/about.tsx`

- [ ] **Step 1: Create about.tsx**

```tsx
"use client";

import { bio } from "@/content/bio";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-24">
      <AsciiDivider label="about" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        How I <span className="italic text-accent">think.</span>
      </FadeUp>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-text-muted">
        {bio.about.map((p, i) => (
          <FadeUp key={i} as="p" delay={i * 0.05}>
            {p}
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/sections/about.tsx && git commit -m "feat: about section"
```

---

### Task 16: Stack section

**Files:**
- Create: `src/components/sections/stack.tsx`

- [ ] **Step 1: Create stack.tsx**

```tsx
"use client";

import { stack } from "@/content/stack";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <AsciiDivider label="stack" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        The <span className="italic text-accent">tools</span>.
      </FadeUp>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((category, i) => (
          <FadeUp key={category.category} delay={i * 0.05} className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {category.category}
            </h3>
            <ul className="mt-4 space-y-2 text-text">
              {category.items.map((item) => (
                <li key={item} className="font-mono text-sm">{item}</li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/sections/stack.tsx && git commit -m "feat: stack section"
```

---

### Task 17: Work section

**Files:**
- Create: `src/components/sections/work.tsx`

- [ ] **Step 1: Create work.tsx**

```tsx
"use client";

import { projects } from "@/content/projects";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";
import { ProjectCard } from "@/components/project-card";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <AsciiDivider label="work" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        Selected <span className="italic text-accent">work</span>.
      </FadeUp>
      <FadeUp as="p" delay={0.05} className="mt-4 max-w-xl text-text-muted">
        Four products I have shipped end to end. Click any card to visit the live site.
      </FadeUp>
      <ol className="mt-16 grid gap-20">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/sections/work.tsx && git commit -m "feat: work section"
```

---

### Task 18: Experience section

**Files:**
- Create: `src/components/sections/experience.tsx`

- [ ] **Step 1: Create experience.tsx**

```tsx
"use client";

import { experience } from "@/content/experience";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <AsciiDivider label="experience" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        Where I have <span className="italic text-accent">built</span>.
      </FadeUp>
      <ol className="mt-12 space-y-10">
        {experience.map((entry, i) => (
          <FadeUp key={`${entry.company}-${entry.period}`} delay={i * 0.05} as="li" className="grid gap-2 border-l border-border pl-6 md:grid-cols-[160px_1fr] md:gap-8 md:border-l-0 md:pl-0">
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {entry.period}
            </div>
            <div>
              <div className="font-serif text-2xl text-text">
                {entry.role} <span className="text-text-muted">at</span> <span className="italic text-accent">{entry.company}</span>
              </div>
              <p className="mt-2 text-text-muted">{entry.summary}</p>
            </div>
          </FadeUp>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/sections/experience.tsx && git commit -m "feat: experience section"
```

---

### Task 19: Contact section

**Files:**
- Create: `src/components/sections/contact.tsx`

- [ ] **Step 1: Create contact.tsx**

```tsx
"use client";

import Link from "next/link";
import { bio } from "@/content/bio";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

const links = [
  { label: "Email", value: bio.email, href: `mailto:${bio.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/matt-vinalll", href: bio.linkedin },
  { label: "GitHub", value: "github.com/mattvinall", href: bio.github },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <AsciiDivider label="contact" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        Let&apos;s <span className="italic text-accent">build</span>.
      </FadeUp>
      <FadeUp as="p" delay={0.05} className="mt-4 max-w-xl text-text-muted">
        Currently open to senior and staff engineering roles, contract work, and founding-engineer conversations.
      </FadeUp>
      <ul className="mt-10 grid gap-4">
        {links.map((link, i) => (
          <FadeUp key={link.label} delay={0.05 + i * 0.05} as="li">
            <Link
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors hover:border-accent"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {link.label}
              </span>
              <span className="flex-1 text-right font-serif text-2xl text-text transition-colors group-hover:text-accent">
                {link.value}
              </span>
              <span className="font-mono text-text-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </Link>
          </FadeUp>
        ))}
      </ul>
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-text-muted md:flex-row">
        <div>© {new Date().getFullYear()} Matt Vinall</div>
        <div>{bio.location}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/sections/contact.tsx && git commit -m "feat: contact section"
```

---

### Task 20: Header / nav with theme toggle

**Files:**
- Create: `src/components/header.tsx`

- [ ] **Step 1: Create header.tsx**

```tsx
"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { bio } from "@/content/bio";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#top" className="font-mono text-sm text-text hover:text-accent">
          matt<span className="text-accent">.</span>vinall
        </Link>
        <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-text-muted md:flex">
          <Link href="#about" className="hover:text-text">About</Link>
          <Link href="#stack" className="hover:text-text">Stack</Link>
          <Link href="#work" className="hover:text-text">Work</Link>
          <Link href="#experience" className="hover:text-text">Experience</Link>
          <Link href="#contact" className="hover:text-text">Contact</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/components/header.tsx && git commit -m "feat: sticky header with theme toggle"
```

---

### Task 21: Compose page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function Page() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Use Playwright MCP: navigate to `http://localhost:3000`. Screenshot the full page. Confirm:
- Hero renders with portrait + headline
- All sections appear in order
- Theme toggle visible top-right
- No console errors

If hydration warnings appear about theme attribute, that's expected — ignore.

- [ ] **Step 3: Toggle theme test**

In Playwright MCP, click the "Terminal" segment of the toggle. Screenshot. Confirm:
- Background shifts to warm dark
- Typography becomes monospace-only
- Project cards re-render as `git log` style entries
- Portrait gets desaturated
- ASCII dividers appear with accent-2 (lime) labels

Click "Editorial" — confirm it returns to default state.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/app/page.tsx && git commit -m "feat: compose full page"
```

---

## Phase 5: Polish

### Task 22: OG image + favicon

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/icon.tsx`
- Create: `src/app/apple-icon.tsx`

- [ ] **Step 1: Create opengraph-image.tsx**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Matt Vinall — Full-Stack AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          color: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Beamsville, ON · Available for work
        </div>
        <div>
          <div style={{ fontSize: 140, lineHeight: 0.95, fontWeight: 600, letterSpacing: "-0.04em" }}>
            Matt
          </div>
          <div style={{ fontSize: 140, lineHeight: 0.95, fontStyle: "italic", color: "#f97316", letterSpacing: "-0.04em" }}>
            Vinall.
          </div>
          <div style={{ marginTop: 30, fontSize: 28, color: "#a1a1aa" }}>
            Full-Stack AI Engineer · 8 years shipping products.
          </div>
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 2: Create icon.tsx**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f97316",
          color: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "system-ui",
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    size
  );
}
```

- [ ] **Step 3: Create apple-icon.tsx**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          color: "#f97316",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "system-ui",
        }}
      >
        M
      </div>
    ),
    size
  );
}
```

- [ ] **Step 4: Verify**

Restart dev server (kill background, restart). Navigate to `http://localhost:3000/opengraph-image` — should download a 1200x630 PNG. Navigate to `http://localhost:3000/icon` — 32x32 orange "M".

- [ ] **Step 5: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add src/app && git commit -m "feat: og image, favicon, apple-touch-icon"
```

---

### Task 23: Responsive QA

- [ ] **Step 1: Test viewports via Playwright MCP**

For each viewport, resize and screenshot the homepage:
- 360x640 (mobile small)
- 768x1024 (tablet)
- 1280x800 (laptop)
- 1920x1080 (desktop large)

Verify in each:
- No horizontal scrollbar
- Hero text wraps cleanly, no overflow
- Project cards stack appropriately on mobile
- Header nav hidden on mobile (only logo + toggle visible)
- Portrait scales without distortion

- [ ] **Step 2: Fix any responsive issues found**

If any issue: edit the relevant component, re-test. Commit fixes individually with `fix(responsive): <description>`.

- [ ] **Step 3: Test theme toggle on mobile viewport (360px)**

Confirm toggle is reachable, both segments labeled, theme persists across reload.

---

### Task 24: Lighthouse + a11y audit

- [ ] **Step 1: Run Lighthouse via Playwright MCP**

Navigate to `http://localhost:3000`. Use the browser's DevTools or Lighthouse CI. Target ≥95 in Performance, Accessibility, Best Practices, SEO.

Common fixes if scores drop:
- LCP: ensure portrait has `priority`, screenshots are sized correctly
- CLS: ensure all images have explicit width/height
- A11y: confirm color contrast (run `pa11y` if available)

- [ ] **Step 2: Verify keyboard navigation**

Tab through entire page. Confirm focus rings are visible (orange) on every interactive element. Skip-to-content link should appear on first Tab.

- [ ] **Step 3: Verify reduced motion**

In Playwright MCP: `browser_evaluate` to set `matchMedia('(prefers-reduced-motion: reduce)')` to true (or test in OS settings). Reload. Confirm no animations play.

- [ ] **Step 4: Commit any a11y fixes**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add -A && git commit -m "fix(a11y): address audit findings"
```

(Skip if no fixes needed.)

---

### Task 25: README + Vercel config

**Files:**
- Create: `README.md`
- Create: `vercel.json`

- [ ] **Step 1: Create README.md**

```markdown
# Matt Vinall — Developer Portfolio

Single-page portfolio at [matt-dev.vercel.app](https://matt-dev.vercel.app).

Two complete design systems toggled by the user: **Editorial** (default, dark + serif/sans hybrid) and **Terminal** (mono-only, git-log aesthetic).

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · next-themes

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

All copy lives in `src/content/`:
- `bio.ts` — name, title, contact, about paragraphs
- `projects.ts` — featured work
- `stack.ts` — categorized tech stack
- `experience.ts` — career timeline

## Deploy

Push to `main`. Vercel auto-deploys.
```

- [ ] **Step 2: Create vercel.json**

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/screenshots/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git add README.md vercel.json && git commit -m "docs: README and vercel config"
```

---

### Task 26: GitHub repo + Vercel deploy

- [ ] **Step 1: Create GitHub repo**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && gh repo create matt-dev-portfolio --public --source=. --remote=origin --description "Personal developer portfolio — Editorial + Terminal themes"
```

Expected: repo created at `github.com/mattvinall/matt-dev-portfolio`, `origin` remote added.

- [ ] **Step 2: Push**

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && git branch -M main && git push -u origin main
```

- [ ] **Step 3: Connect to Vercel**

If `vercel` CLI installed:

```bash
cd C:/Users/Matt/Desktop/matt-dev-portfolio && vercel link --yes && vercel deploy --prod
```

If CLI not installed, instruct user: visit https://vercel.com/new, import `matt-dev-portfolio`, accept defaults, deploy.

- [ ] **Step 4: Verify production URL**

Once deployed, visit `https://matt-dev.vercel.app` (or whatever subdomain Vercel assigned). Smoke test: hero loads, theme toggle works, all four project cards visible, links open in new tabs.

- [ ] **Step 5: Final commit (if any tweaks)**

If any production-only fixes needed, commit + push. Otherwise done.

---

## Done

You shipped:
- Single-page portfolio with two complete design systems toggled by the user
- Four project cards with screenshots + live links
- Hero, about, stack, work, experience, contact sections
- Custom OG image + favicon
- Lighthouse 95+ across all metrics
- WCAG AA contrast in both themes
- Responsive 360px → 1920px
- Reduced-motion respected
- Deployed to Vercel under `mattvinall` GitHub
- README + content files for easy future edits

# Matt Vinall — Developer Portfolio Design Spec

**Date:** 2026-05-03
**Owner:** Matt Vinall
**Target deploy:** `matt-dev.vercel.app`
**Repo path:** `C:\Users\Matt\Desktop\matt-dev-portfolio`

## Goal

A developer-focused portfolio site for tech job applications. Distinct from the existing GTM-engineering site at `matt-vinall.vercel.app`. Single page, two themes, fully responsive, deploy-ready.

## Audience

1. Engineering hiring managers (primary) — need to see range, polish, shipped products in <30s
2. Recruiters (secondary) — scan for stack keywords, years of experience, contact
3. Engineering peers (tertiary) — appreciate craft signals (motion, theme toggle, type system)

## Thesis

The site itself is a portfolio piece. **A toggle in the top-right switches between two complete design systems** (Editorial and Terminal) sharing the same content. This proves design + engineering range in one artifact.

---

## Information Architecture

Single page, anchored sections, scroll-driven:

1. **Hero** — name, title, portrait, tagline, CTAs (`View Work`, `Get in touch`)
2. **About / How I Think** — 3 short paragraphs on philosophy, approach, what I optimize for
3. **Tech Stack** — categorized: Frontend, Backend, AI/ML, Infra, Tooling
4. **Featured Work** — 4 project cards with screenshots + live links
5. **Experience** — compact timeline (2018 → present, 8 years)
6. **Contact** — email, LinkedIn, GitHub, location

No `/work/[slug]` case study pages in v1. Add later if needed.

## Featured Projects

| Order | Name | URL | One-liner | Stack tags |
|---|---|---|---|---|
| 01 | Pipeline | https://pipeline.help | AI outreach automation for LinkedIn | Next.js, Supabase, Claude, Unipile, Stripe |
| 02 | Dmand | https://dmand.ai | (TBD — pull from site copy at screenshot time) | Next.js, AI |
| 03 | Game of Streaks | https://gameofstreaks.com | (TBD — pull from site copy at screenshot time) | Next.js, Supabase |
| 04 | Quick Enrich (GTM) | https://gtm.quickenrich.io | (TBD — pull from site copy at screenshot time) | Next.js, AI enrichment |

Screenshots captured via Playwright MCP at 1440×900, exported as `.png`, optimized to `.webp`, stored at `public/screenshots/<slug>.webp`. Two states optionally captured: hero + secondary view.

## Bio Facts (single source of truth)

- **Name:** Matt Vinall
- **Title:** Full-Stack AI Engineer
- **Years:** 8 (since 2018)
- **Location:** Beamsville, ON, Canada
- **Email:** matt.vinall7@gmail.com
- **LinkedIn:** https://linkedin.com/in/matt-vinalll
- **GitHub:** https://github.com/mattvinall

## Tech Stack (categorized)

- **Frontend:** TypeScript, React 19, Next.js 15, Tailwind CSS, Framer Motion, ReactFlow, Radix UI, shadcn/ui
- **Backend:** Node.js, PostgreSQL, Supabase, Drizzle ORM, REST + JSON-RPC
- **AI / ML:** Anthropic Claude (Opus/Sonnet/Haiku), Tool use, MCP (Model Context Protocol), prompt engineering, RAG
- **Auth & Payments:** Clerk, Stripe
- **State & Data:** TanStack Query, XState, Zod
- **Infra:** Vercel, Railway, Supabase, Cloudflare
- **Integrations:** Unipile (LinkedIn), Tavily, Firecrawl, Exa, Slack

---

## Theme System

### Toggle behavior

- Top-right pill: `[ Editorial · Terminal ]` with active segment highlighted
- Persisted via `next-themes` (`localStorage` key: `portfolio-theme`)
- SSR-safe (no FOUC) — set `suppressHydrationWarning` on `<html>` and use `next-themes` `attribute="data-theme"`
- Animated transition: 400ms cross-fade on theme tokens, 250ms typography swap, no layout shift
- Default: `Editorial`
- Reduced-motion respected (`prefers-reduced-motion: reduce` disables all motion)

### Editorial Mode (default)

**Palette (CSS variables under `[data-theme="editorial"]`):**
- `--bg`: `#0a0a0a`
- `--surface`: `#141414`
- `--text`: `#fafafa`
- `--text-muted`: `#a1a1aa`
- `--accent`: `#f97316` (orange — single-use: hero ring, link hover, active toggle, project number underline)
- `--border`: `#262626`

**Typography:**
- Display headings: **Instrument Serif** (italic for emphasis words like *engineer*, *ship*, *build*)
- Body + UI: **Geist Sans**
- Numerics, tech tags, project numbers, meta: **Geist Mono**
- Hero name: `clamp(3.5rem, 12vw, 9rem)`, tracking `-0.04em`, mixed serif italic + sans roman

**Hero composition:**
- 60/40 split (left text, right portrait) on desktop; stacked on mobile
- Left: `Matt Vinall.` (huge), `Full-Stack AI Engineer` (mono small-caps), tagline `Building AI products that ship — from prompt to production.` (NOTE: spec uses em-dash here for documentation only; actual UI copy uses an en-dash or comma per user's "no em dashes" rule)
- **CORRECTION per user preference:** No em dashes anywhere in shipped copy. Tagline becomes: `Building AI products that ship, from prompt to production.`
- Right: portrait inside circular orange ring (preserved from source image), white background removed, transparent PNG. Floating animation (3s ease-in-out, ±6px Y).
- Below fold: low-opacity marquee of stack names in mono

**Project cards:**
- 16:10 screenshot, `rounded-2xl`, 1px border
- Hover: `scale(1.02)`, brightness up, orange `→` slides in
- Below image: `01. Pipeline` (mono, gray) → name (sans, large) → one-liner → tag row

### Terminal Mode

**Palette (CSS variables under `[data-theme="terminal"]`):**
- `--bg`: `#0d0f0c` (near-black, slight green tint)
- `--surface`: `#11140f`
- `--text`: `#d4d4aa` (warm cream — phosphor)
- `--text-muted`: `#7a7d65`
- `--accent`: `#f97316` (orange — kept consistent for brand thread between themes)
- `--accent-secondary`: `#a3e635` (lime — for prompts, success states)
- `--border`: `#2a2d22`

**Typography:**
- Everything in **Geist Mono** (single typeface)
- Headings differentiated by size + weight + color, not family
- ASCII box-drawing dividers (`─ ━ ┃ ╭ ╮ ╰ ╯`) between sections

**Hero composition:**
- Mimics a terminal session, NOT a literal one (no fake interactivity claims):
  ```
  matt@portfolio:~$ whoami

  Matt Vinall
  Full-Stack AI Engineer · Beamsville, ON

  > 8 years building products. Currently shipping AI agents.

  $ ls ./projects
  pipeline/  dmand/  game-of-streaks/  quick-enrich/

  $ cat ./contact
  ```
- Portrait still present, top-right corner, square with orange border (no ring), `image-rendering: pixelated` for slight CRT feel
- Cursor blink on the active prompt

**Project cards:**
- Rendered as `git log`-style entries:
  ```
  commit 01 · pipeline.help
  Author: Matt Vinall <matt.vinall7@gmail.com>
  Stack:  next.js · supabase · claude · unipile · stripe

      AI outreach automation for LinkedIn.

      [view live →]
  ```
- Screenshot below in a "framed" ASCII border, monochrome filter (subtle desaturate to ~70%), full color on hover

**Section dividers:**
```
─────────────────────────────────  about  ─────────────────────────────────
```

### Shared system

- Same content, same DOM order, same component tree
- Theme tokens drive all visual differences via CSS variables
- Component variants conditioned on `data-theme` attribute, NOT prop drilling
- One `<ThemeToggle />` component handles state

---

## Motion System

Using `motion` package (Framer Motion v12+).

| Element | Animation | Trigger | Notes |
|---|---|---|---|
| Hero text lines | Fade-up 20px, stagger 60ms | Mount | One-shot |
| Section headings | Fade-up 16px | Viewport enter | `once: true` |
| Project cards | Fade-up 24px, stagger 80ms | Viewport enter | One-shot |
| Project card hover | Scale 1.02, 200ms ease-out | Hover | Editorial only |
| Theme toggle | Cross-fade 400ms on `data-theme` change | Click | Token transition via CSS |
| Portrait | Float ±6px Y, 3s ease-in-out infinite | Mount | Editorial only |
| Stack marquee | Translate-x infinite, 40s linear | Mount | Editorial only |
| Terminal cursor | Opacity 1↔0, 1s step | Mount | Terminal only |
| Reduced motion | All disabled, content visible immediately | Media query | Hard requirement |

---

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx           # Fonts, ThemeProvider, metadata, OG
│   ├── page.tsx             # Sections composed in order
│   └── globals.css          # Tokens, base, theme variables
├── components/
│   ├── theme-toggle.tsx     # The pill toggle
│   ├── theme-provider.tsx   # next-themes wrapper
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── stack.tsx
│   │   ├── work.tsx
│   │   ├── experience.tsx
│   │   └── contact.tsx
│   ├── project-card.tsx     # Renders both editorial + terminal variants
│   ├── portrait.tsx         # Image w/ ring, theme-aware
│   ├── marquee.tsx          # Stack marquee (editorial)
│   ├── ascii-divider.tsx    # Terminal section divider
│   └── motion/
│       ├── fade-up.tsx      # Reusable scroll-fade wrapper
│       └── stagger.tsx
├── content/
│   ├── projects.ts          # Project data (single source of truth)
│   ├── stack.ts             # Categorized stack data
│   ├── experience.ts        # Timeline entries
│   └── bio.ts               # Name, title, contact, taglines
└── lib/
    └── utils.ts             # cn() helper
```

**Key principle:** All copy lives in `content/` files as typed const exports. Sections import and render. Easy to update without touching JSX.

---

## Assets

- **Portrait:** Source image provided by user. Process: remove white background (keep orange ring), export as transparent PNG at 2x resolution. Store at `public/portrait.png`.
- **Screenshots:** Capture each project URL via Playwright MCP at 1440×900, save to `public/screenshots/<slug>.webp`.
- **OG image:** Generate via Next.js `opengraph-image.tsx` — Editorial-themed card with name, title, accent.
- **Favicon:** Simple orange "M" mark, generated as 32×32 + 192×192 + `apple-touch-icon`.

---

## Performance & SEO

- LCP target: <1.5s on Vercel edge
- Fonts: `next/font` with `display: swap`, preload Geist Sans + Mono only (Instrument Serif lazy)
- Images: `next/image`, AVIF/WebP, eager only on hero portrait
- Lighthouse target: 100/100/100/100
- Metadata: title, description, OG tags, Twitter card, canonical URL, robots, sitemap
- JSON-LD `Person` schema with `sameAs` links to LinkedIn, GitHub

## Accessibility

- All text passes WCAG AA contrast in both themes (verified during build)
- Theme toggle: `role="radiogroup"`, arrow-key navigation
- Skip-to-content link
- Focus rings visible (orange in Editorial, lime in Terminal)
- All animations respect `prefers-reduced-motion`
- Project cards: full keyboard nav, `aria-label` on link wrapping the card
- Semantic HTML: one `<h1>`, sections with `<h2>`, project list as `<ol>`

## Deployment

- Repo: new GitHub repo `matt-dev-portfolio` under `mattvinall`
- CI: Vercel auto-deploys on push to `main`
- Domain: `matt-dev.vercel.app` (default Vercel subdomain)
- No env vars needed for v1 (no analytics, no CMS, no DB)
- `vercel.ts` config (per current Vercel best practice) with framework + headers

## Out of scope (v1)

- Blog / writing
- Case study sub-pages
- Analytics (PostHog/Plausible)
- CMS — content is static in TS files
- Contact form — `mailto:` link only
- Comments / interactions
- Dark/light mode in addition to Editorial/Terminal (themes already serve as variants)

## Definition of Done

1. Both themes render correctly with no FOUC on first paint and no layout shift on toggle
2. All four project screenshots captured and optimized
3. Portrait processed with transparent background
4. Lighthouse 95+ across all four metrics on production
5. WCAG AA contrast verified in both themes
6. `prefers-reduced-motion` honored
7. Responsive: looks polished from 360px → 1920px
8. OG image renders correctly when shared on LinkedIn/Twitter
9. Deployed to Vercel with custom subdomain
10. README with setup instructions committed

## Open questions / assumptions

- **Tagline:** Assumed `Building AI products that ship, from prompt to production.` — user can revise during implementation.
- **One-liners for Dmand / Game of Streaks / Quick Enrich:** To be drafted from each site's existing copy at screenshot time. User reviews before merge.
- **Experience timeline entries:** User to provide company names + dates during implementation. Default placeholder if not provided.
- **Resume PDF:** Not included in v1; can be added as a `/resume.pdf` static file later.

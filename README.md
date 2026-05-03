# Matt Vinall · Developer Portfolio

Single-page portfolio at [matt-dev.vercel.app](https://matt-dev.vercel.app).

Two complete design systems toggled by the user:

- **Editorial** (default) — dark theme, serif/sans hybrid typography, asymmetric grid
- **Terminal** — mono-only, git-log project cards, ASCII dividers

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · next-themes

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

## Replace portrait

The hero portrait is a placeholder SVG at `public/portrait.svg`. To use a real photo:

1. Process the source image to remove the white background (transparent PNG)
2. Save as `public/portrait.png`
3. Update `src/components/portrait.tsx` to reference `/portrait.png`

## Replace project screenshots

Screenshots live at `public/screenshots/<slug>.png`. To refresh:

1. Open each project URL at 1440×900 viewport
2. Capture and save as `public/screenshots/<slug>.png`
3. Update the `screenshot` field in `src/content/projects.ts` if the path changes

## Deploy

Pushed to `main` on GitHub. Vercel auto-deploys.

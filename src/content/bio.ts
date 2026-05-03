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
    "I build full-stack AI products end to end. From the schema to the prompt to the pixel, I own the loop. Eight years in, what I optimize for is shipping things that work in the hands of real users, not demos that look good in a deck.",
    "My current focus is the intersection of AI agents and product surfaces. I have shipped multiple production agent systems on top of Claude, MCP, and structured tool use. I care about evals, latency, cost, and the quiet 99% of the work that lives between a model call and a feature people trust.",
    "When I am reviewing a problem, I read the schema first, the failure modes second, and the happy path last. Most bugs live in the gap between what a system promises and what it actually guarantees.",
  ],
  pullQuote: "I read the schema first, the failure modes second, and the happy path last.",
  principles: [
    {
      number: "01",
      title: "Ship the loop, not the demo.",
      body: "Production trumps prototype. Eight years in, what I optimize for is shipping things that survive contact with real traffic, not features that look good in a deck.",
    },
    {
      number: "02",
      title: "Own the stack, end to end.",
      body: "Schema, prompt, pixel. Same engineer. The handoff between model call and product surface is where most AI features die. I build through the whole stack so that gap stops existing.",
    },
    {
      number: "03",
      title: "Optimize for the boring 99%.",
      body: "The model call is the easy part. Evals, latency, cost, retries, graceful degradation, the cache layer that makes the third call sub-second. That is where the trust gets built. I spend my time there.",
    },
    {
      number: "04",
      title: "Failure modes are features.",
      body: "Most bugs live in the gap between what a system promises and what it actually guarantees. I sketch the failure tree before the happy path. If the schema can express it, the runtime can recover from it.",
    },
  ],
} as const;

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
  pullQuote: "I have built outbound systems, closed customers, and written the code. Often in the same week.",
  principles: [
    {
      number: "01",
      title: "Schema first. Failure modes second. Happy path last.",
      body: "Most production bugs live in the gap between what a system claims to guarantee and what it actually enforces. I find them faster by starting at the data layer and working outward, not the other way around.",
    },
    {
      number: "02",
      title: "The model call is the easy part.",
      body: "Evals, retries, cost ceilings, graceful degradation, the cache that keeps the third call sub-second. That is where AI products earn trust. I spend my time there, not on the prompt.",
    },
    {
      number: "03",
      title: "Code, demos, customer calls. Same week.",
      body: "I have shipped two SaaS products to paying customers in the last year. Writing the code is the easy half. The harder half is staying close enough to users that the next thing I build is the thing they actually need.",
    },
    {
      number: "04",
      title: "Net-negative is a feature.",
      body: "Most of my best PRs delete more lines than they add. Short files, narrow interfaces, no abstractions until they earn their keep. Codebases that hold together at scale are the ones that resist the urge to generalize early.",
    },
  ],
} as const;

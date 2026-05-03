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
    period: "2025 → Present",
    summary:
      "Building Pipeline end to end. Architecture, schema, agents, UX, billing, and the hosted MCP server. Scaled to dozens of paying workspaces.",
  },
  {
    role: "Founder & Engineer",
    company: "Dmand",
    period: "2025 → Present",
    summary:
      "Designed and shipped the Dmand marketing surface and lead-generation engine.",
  },
  {
    role: "Independent Engineer & Builder",
    company: "Various",
    period: "2018 → 2025",
    summary:
      "Eight years across consumer apps, internal tools, AI prototypes, and full-stack contract work. Shipped Game of Streaks, Quick Enrich, and a long tail of unreleased experiments.",
  },
];

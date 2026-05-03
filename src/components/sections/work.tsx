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

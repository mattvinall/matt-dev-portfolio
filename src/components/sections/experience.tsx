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
          <FadeUp
            key={`${entry.company}-${entry.period}`}
            delay={i * 0.05}
            as="li"
            className="grid gap-2 border-l border-border pl-6 md:grid-cols-[160px_1fr] md:gap-8 md:border-l-0 md:pl-0"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {entry.period}
            </div>
            <div>
              <div className="font-serif text-2xl text-text">
                {entry.role} <span className="text-text-muted">at</span>{" "}
                <span className="italic text-accent">{entry.company}</span>
              </div>
              <p className="mt-2 text-text-muted">{entry.summary}</p>
            </div>
          </FadeUp>
        ))}
      </ol>
    </section>
  );
}

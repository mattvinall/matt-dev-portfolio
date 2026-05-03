"use client";

import { experience } from "@/content/experience";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
      <AsciiDivider label="experience" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        Where I have <span className="italic text-accent">built</span>.
      </FadeUp>
      <ol className="mt-12 max-w-4xl space-y-10">
        {experience.map((entry, i) => (
          <FadeUp
            key={`${entry.company}-${entry.period}`}
            delay={i * 0.04}
            as="li"
            className="grid gap-2 border-l border-border pl-6 md:grid-cols-[180px_1fr] md:gap-8 md:border-l-0 md:pl-0"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {entry.period}
              {entry.location && (
                <div className="mt-1 normal-case tracking-normal text-text-muted/70">
                  {entry.location}
                </div>
              )}
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

      <FadeUp delay={0.2} className="mt-16 grid max-w-4xl gap-6 border-t border-border pt-10 md:grid-cols-2">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Certifications
          </div>
          <div className="mt-3 font-serif text-xl text-text">
            AWS Certified Developer <span className="text-text-muted">· Associate</span>
          </div>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Education
          </div>
          <ul className="mt-3 space-y-2 text-text">
            <li className="font-serif text-xl">
              University of Waterloo
              <div className="font-sans text-sm text-text-muted">
                BA, Legal Studies &amp; Sociology
              </div>
            </li>
            <li className="font-serif text-xl">
              HackerYou College of Technology
              <div className="font-sans text-sm text-text-muted">
                Web Development Immersive Certificate
              </div>
            </li>
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}

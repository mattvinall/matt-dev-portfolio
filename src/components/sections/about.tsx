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

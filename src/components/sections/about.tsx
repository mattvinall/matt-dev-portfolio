"use client";

import { bio } from "@/content/bio";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <AsciiDivider label="about" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        How I <span className="italic text-accent">think.</span>
      </FadeUp>

      <FadeUp delay={0.05} className="mt-14 max-w-4xl">
        <div
          aria-hidden
          className="font-serif text-7xl leading-none text-accent/60 md:text-8xl"
        >
          &ldquo;
        </div>
        <blockquote className="-mt-6 font-serif text-3xl leading-tight text-text md:text-4xl">
          <span className="italic">{bio.pullQuote}</span>
        </blockquote>
        <div className="mt-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          A working principle
        </div>
      </FadeUp>

      <ol className="mt-20 grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {bio.principles.map((p, i) => (
          <FadeUp
            key={p.number}
            delay={0.05 + i * 0.05}
            as="li"
            className="group relative"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-accent">{p.number}</span>
              <h3 className="font-serif text-2xl leading-snug text-text md:text-[26px]">
                {p.title}
              </h3>
            </div>
            <p className="mt-3 pl-9 text-base leading-relaxed text-text-muted">
              {p.body}
            </p>
          </FadeUp>
        ))}
      </ol>

    </section>
  );
}

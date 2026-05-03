"use client";

import { stackPillars, supportingStack, stackStatement } from "@/content/stack";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-16">
      <AsciiDivider label="stack" />

      <div className="mt-6 flex items-end justify-between gap-6">
        <FadeUp as="h2" className="font-serif text-4xl text-text md:text-5xl">
          The <span className="italic text-accent">tools</span>.
        </FadeUp>
        <FadeUp className="hidden font-mono text-xs uppercase tracking-widest text-text-muted md:block">
          Daily drivers · 2026
        </FadeUp>
      </div>

      {/* Hero typographic statement */}
      <FadeUp delay={0.05} className="mt-14 max-w-4xl">
        <p className="font-serif text-2xl leading-snug text-text-muted md:text-[28px] md:leading-[1.35]">
          Every day,{" "}
          <span className="italic text-text">{stackStatement.daily}</span>. Most days,{" "}
          <span className="italic text-text">{stackStatement.most}</span>. The hard parts
          go to <span className="italic text-accent">{stackStatement.hard}</span>. The
          data layer is{" "}
          <span className="italic text-text">{stackStatement.data}</span>. Everything
          ships on <span className="italic text-text">{stackStatement.ship}</span>.
        </p>
      </FadeUp>

      {/* Three pillar cards */}
      <ol className="mt-20 grid gap-5 md:grid-cols-3">
        {stackPillars.map((pillar, i) => (
          <FadeUp
            key={pillar.number}
            as="li"
            delay={0.05 + i * 0.06}
            className="group relative overflow-hidden rounded-xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent/40"
          >
            {/* Decorative number watermark */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[140px] leading-none text-accent/[0.04] transition-colors duration-500 group-hover:text-accent/10"
            >
              {pillar.number}
            </div>

            <div className="relative">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">{pillar.number}</span>
                <h3 className="font-serif text-2xl text-text">{pillar.category}</h3>
              </div>

              <p className="mt-3 font-serif text-base italic leading-snug text-text-muted">
                {pillar.intent}
              </p>

              {/* Primary tools - larger, prominent */}
              <ul className="mt-7 space-y-2">
                {pillar.primary.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[15px] text-text transition-colors duration-200 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* Secondary tools - smaller, comma-separated */}
              <div className="mt-6 border-t border-border pt-4 font-mono text-xs leading-relaxed text-text-muted">
                {pillar.secondary.join("  ·  ")}
              </div>
            </div>
          </FadeUp>
        ))}
      </ol>

      {/* Supporting toolkit row */}
      <FadeUp delay={0.3} className="mt-12 rounded-xl border border-dashed border-border p-7">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Also in the toolkit
          </span>
          <ul className="flex flex-wrap gap-x-2 gap-y-2">
            {supportingStack.map((item, i) => (
              <li
                key={item}
                className="font-mono text-sm text-text-muted transition-colors duration-200 hover:text-accent"
              >
                {item}
                {i < supportingStack.length - 1 && (
                  <span aria-hidden className="ml-2 text-text-muted/40">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}

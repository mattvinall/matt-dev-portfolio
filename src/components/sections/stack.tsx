"use client";

import { stack } from "@/content/stack";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <AsciiDivider label="stack" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        The <span className="italic text-accent">tools</span>.
      </FadeUp>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((category, i) => (
          <FadeUp
            key={category.category}
            delay={i * 0.05}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {category.category}
            </h3>
            <ul className="mt-4 space-y-2 text-text">
              {category.items.map((item) => (
                <li key={item} className="font-mono text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

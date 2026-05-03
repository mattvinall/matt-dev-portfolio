"use client";

import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

export function ActivityHeader() {
  return (
    <>
      <AsciiDivider label="activity" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        Recent <span className="italic text-accent">activity</span>.
      </FadeUp>
      <FadeUp as="p" delay={0.05} className="mt-4 max-w-xl text-text-muted">
        A year of public commits across personal and client work. Most of my Pipeline and DMAND work lives in private repos and is included here.
      </FadeUp>
    </>
  );
}

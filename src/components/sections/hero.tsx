"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bio } from "@/content/bio";
import { Portrait } from "@/components/portrait";

export function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);

  const isTerminal = mounted && theme === "terminal";

  if (isTerminal) {
    return (
      <section
        id="top"
        className="mx-auto grid max-w-6xl gap-10 px-6 pt-24 pb-16 md:grid-cols-[1fr_auto] md:items-start"
      >
        <div className="font-mono text-sm leading-relaxed text-text">
          <div className="text-text-muted">
            <span className="text-accent-2">matt@portfolio</span>
            <span className="text-text">:</span>
            <span className="text-accent">~</span>
            <span className="text-text">$</span> whoami
          </div>
          <div className="mt-4 text-2xl text-text md:text-3xl">{bio.name}</div>
          <div className="mt-1 text-text-muted">
            {bio.title} · {bio.location}
          </div>
          <p className="mt-6 max-w-xl text-text">
            &gt; {bio.tagline} {bio.yearsExperience} years building products. Currently shipping AI agents.
          </p>

          <div className="mt-8 text-text-muted">
            <span className="text-accent-2">matt@portfolio</span>
            <span className="text-text">:</span>
            <span className="text-accent">~</span>
            <span className="text-text">$</span> ls ./projects
          </div>
          <div className="mt-2 text-text">
            pipeline/&nbsp;&nbsp;dmand/&nbsp;&nbsp;game-of-streaks/&nbsp;&nbsp;quick-enrich/
          </div>

          <div className="mt-8 text-text-muted">
            <span className="text-accent-2">matt@portfolio</span>
            <span className="text-text">:</span>
            <span className="text-accent">~</span>
            <span className="text-text">$</span> cat ./contact
            <span
              className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent align-middle"
              aria-hidden
            />
          </div>

          <div className="mt-6 flex gap-4">
            <Link href="#work" className="text-accent hover:underline">
              [view work →]
            </Link>
            <Link href={`mailto:${bio.email}`} className="text-accent hover:underline">
              [get in touch →]
            </Link>
          </div>
        </div>
        <div className="hidden w-[260px] md:block">
          <Portrait />
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl gap-10 px-6 pt-24 pb-20 md:grid-cols-[3fr_2fr] md:items-center"
    >
      <div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          {bio.location} · Available for work
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-tightest text-text"
          style={{ letterSpacing: "-0.04em" }}
        >
          Matt
          <br />
          <span className="italic text-accent">Vinall.</span>
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-mono text-sm uppercase tracking-widest text-text-muted"
        >
          {bio.title}
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl text-balance text-lg text-text-muted"
        >
          {bio.tagline}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            View work
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </Link>
          <Link
            href={`mailto:${bio.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-sm text-bg transition-transform hover:scale-[1.02]"
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
      <div className="flex justify-center md:justify-end">
        <Portrait />
      </div>
    </section>
  );
}

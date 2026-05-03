"use client";

import Link from "next/link";
import { bio } from "@/content/bio";
import { FadeUp } from "@/components/motion/fade-up";
import { AsciiDivider } from "@/components/ascii-divider";

const links = [
  { label: "Email", value: bio.email, href: `mailto:${bio.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/matt-vinalll", href: bio.linkedin },
  { label: "GitHub", value: "github.com/mattvinall", href: bio.github },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <AsciiDivider label="contact" />
      <FadeUp as="h2" className="mt-6 font-serif text-4xl text-text md:text-5xl">
        Let&apos;s <span className="italic text-accent">build</span>.
      </FadeUp>
      <FadeUp as="p" delay={0.05} className="mt-4 max-w-xl text-text-muted">
        Currently open to senior and staff engineering roles, contract work, and founding-engineer conversations.
      </FadeUp>
      <ul className="mt-10 grid max-w-4xl gap-4">
        {links.map((link, i) => (
          <FadeUp key={link.label} delay={0.05 + i * 0.05} as="li">
            <Link
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors hover:border-accent"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {link.label}
              </span>
              <span className="flex-1 text-right font-serif text-2xl text-text transition-colors group-hover:text-accent">
                {link.value}
              </span>
              <span className="font-mono text-text-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </Link>
          </FadeUp>
        ))}
      </ul>
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-text-muted md:flex-row">
        <div>© {new Date().getFullYear()} Matt Vinall</div>
        <div>{bio.location}</div>
      </div>
    </section>
  );
}

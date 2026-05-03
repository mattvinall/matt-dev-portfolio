"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#top" className="font-mono text-sm text-text hover:text-accent">
          matt<span className="text-accent">.</span>vinall
        </Link>
        <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-text-muted md:flex">
          <Link href="#about" className="hover:text-text">About</Link>
          <Link href="#stack" className="hover:text-text">Stack</Link>
          <Link href="#work" className="hover:text-text">Work</Link>
          <Link href="#experience" className="hover:text-text">Experience</Link>
          <Link href="#contact" className="hover:text-text">Contact</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isTerminal = mounted && theme === "terminal";

  if (isTerminal) {
    return (
      <motion.li
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group block rounded-md border border-border bg-surface p-6 font-mono text-sm"
      >
        <div className="text-text-muted">
          <span className="text-accent-2">commit</span> {project.number} ·{" "}
          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-text underline-offset-4 hover:text-accent hover:underline"
          >
            {project.url.replace(/^https?:\/\//, "")}
          </Link>
        </div>
        <div className="mt-1 text-text-muted">
          <span className="text-accent-2">Author:</span> Matt Vinall &lt;matt.vinall7@gmail.com&gt;
        </div>
        <div className="mt-1 text-text-muted">
          <span className="text-accent-2">Stack:</span>{" "}
          {project.stack.map((s) => s.toLowerCase()).join(" · ")}
        </div>
        <p className="mt-4 pl-4 text-text">{project.description}</p>
        <div className="mt-6 overflow-hidden rounded-sm border border-border">
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            width={1440}
            height={900}
            className="h-auto w-full saturate-50 transition-all duration-500 group-hover:saturate-100"
          />
        </div>
        <Link
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-accent hover:underline"
        >
          [view live →]
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={project.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} in a new tab`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            width={1440}
            height={900}
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {project.number} · {project.year}
            </div>
            <h3 className="mt-2 font-serif text-3xl text-text">{project.name}</h3>
            <p className="mt-2 max-w-xl text-text-muted">{project.oneLiner}</p>
          </div>
          <span className="font-mono text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
            →
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-border px-2.5 py-1">
              {s}
            </li>
          ))}
        </ul>
      </Link>
    </motion.li>
  );
}

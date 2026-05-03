"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "editorial", label: "Editorial" },
  { value: "terminal", label: "Terminal" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-[180px] rounded-full border border-border" aria-hidden />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Select visual theme"
      className="inline-flex h-9 items-center rounded-full border border-border bg-surface p-1 font-mono text-xs"
    >
      {themes.map((t) => {
        const active = theme === t.value;
        return (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(t.value)}
            className={cn(
              "rounded-full px-3 py-1 transition-colors duration-300",
              active ? "bg-accent text-bg" : "text-text-muted hover:text-text"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AsciiDivider({ label }: { label: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "terminal") {
    return (
      <div className="flex items-center gap-4 py-4">
        <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return (
    <div className="py-4 font-mono text-xs text-text-muted">
      <span aria-hidden>─────────────────────  </span>
      <span className="text-accent-2">{label}</span>
      <span aria-hidden>  ─────────────────────</span>
    </div>
  );
}

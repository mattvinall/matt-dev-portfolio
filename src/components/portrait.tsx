"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Portrait() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isTerminal = mounted && theme === "terminal";

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[420px] transition-all duration-500",
        !isTerminal && "animate-float"
      )}
    >
      <Image
        src="/portrait.png"
        alt="Portrait of Matt Vinall"
        fill
        sizes="(max-width: 768px) 80vw, 420px"
        priority
        className={cn(
          "object-contain transition-all duration-500",
          isTerminal && "saturate-50 contrast-125"
        )}
      />
    </div>
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-[var(--radius)] skeleton ${className ?? ""}`} />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`
        w-9 h-9 flex items-center justify-center rounded-[var(--radius)]
        border border-[hsl(var(--border))] bg-[hsl(var(--surface))]
        text-[hsl(var(--foreground-2))] hover:text-[hsl(var(--primary))]
        hover:border-[hsl(var(--primary)/.4)] hover:bg-[hsl(var(--surface-2))]
        transition-all duration-200 cursor-pointer
        ${className ?? ""}
      `}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun size={17} className="transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Moon size={17} className="transition-transform duration-300" />
      )}
    </button>
  );
}

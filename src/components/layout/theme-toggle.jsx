"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      className="p-3 hover:cursor-pointer rounded-md"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {mounted && dark ? <Sun size={17} /> : <Moon size={17} />}
    </Button>
  );
}

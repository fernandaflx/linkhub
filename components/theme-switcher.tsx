/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null
  }


  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center space-x-3">
      <Sun className="size-4" />
      <Switch
        checked={isDark}
        onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className="size-4" />
    </div>
  );
}

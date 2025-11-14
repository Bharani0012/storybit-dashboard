"use client";

import { useTheme } from "../context/themecontext/ThemeProvider";
import { useState, useEffect } from "react";

export default function ThemeToggler() {
  const { theme, toggle } = useTheme();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!hydrated) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-foreground text-background"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

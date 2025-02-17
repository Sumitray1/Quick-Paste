"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevents hydration mismatch
  if (!mounted) return null;
  return (
    <label className="ui-switch">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
}

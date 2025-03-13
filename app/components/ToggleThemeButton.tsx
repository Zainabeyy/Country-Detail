"use client";

import IonIcon from "@reacticons/ionicons";
import React from "react";
import { motion } from "framer-motion";
import { themeType } from "../lib/dataType";

export default function ToggleThemeButton() {
  const [theme, setTheme] = React.useState<themeType>("light");

  React.useEffect(() => {
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = systemPreference ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  return (
    <button
      onClick={toggleTheme}
      className="min-w-16 bg-dark-background dark:bg-light-background rounded-4xl p-1"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <motion.div
          key="moon"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="max-w-6 max-h-6"
        >
          <IonIcon
            name="sunny-outline"
            className="text-xl bg-dark-background p-0.5 rounded-full"
          />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ opacity: 0, x: "0%" }}
          animate={{ opacity: 1, x: "130%" }}
          exit={{ opacity: 0, x: "0%" }}
          transition={{ duration: 0.3 }}
          className="max-w-6 max-h-6"
        >
          <IonIcon
            name="moon-outline"
            className="text-xl bg-light-background p-0.5 rounded-full"
          />
        </motion.div>
      )}
    </button>
  );
}

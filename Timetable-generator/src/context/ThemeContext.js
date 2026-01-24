import React, { createContext, useContext, useEffect, useState } from "react";

const THEME_KEY = "lt_theme";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children, defaultTheme = "light" }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return stored || defaultTheme;
    } catch (e) {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    // apply simple class to document element for css-driven themes
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

export default ThemeContext;

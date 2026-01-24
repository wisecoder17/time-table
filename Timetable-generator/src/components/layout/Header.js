import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import Button from "../common/Button";

/**
 * Header component with navigation
 */
const Header = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <header
      className="bg-blue-600 text-white shadow-md dark:bg-blue-900 transition-colors duration-200"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="mr-4 p-2 hover:bg-blue-700 dark:hover:bg-blue-800 rounded focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold">Timetable Generator</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user && (
            <>
              <span className="text-sm hidden sm:inline">
                Welcome, {user.name}
              </span>
              <Button
                variant="outlined"
                size="sm"
                onClick={logout}
                className="text-white border-white hover:bg-blue-700 dark:hover:bg-blue-800"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

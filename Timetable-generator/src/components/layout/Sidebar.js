import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Sidebar component with navigation links
 */
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Students", path: "/students", icon: "👥" },
    { label: "Courses", path: "/courses", icon: "📚" },
    { label: "Staff", path: "/staff", icon: "👨‍🏫" },
    { label: "Venues", path: "/venues", icon: "🏢" },
    { label: "Timetable", path: "/timetable", icon: "📅" },
    { label: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-screen w-64 bg-white text-gray-900 border-r border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 transform transition-transform z-40 md:translate-x-0 transition-colors duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <nav className="pt-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-400"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
              onClick={onClose}
              aria-current={
                location.pathname === item.path ? "page" : undefined
              }
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

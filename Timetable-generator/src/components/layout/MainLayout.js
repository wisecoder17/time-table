import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * Main layout wrapper
 */
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-auto" role="main">
          <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

import React from "react";
import Card from "../components/common/Card";

/**
 * Dashboard page component
 */
const DashboardPage = () => {
  const stats = [
    { label: "Total Students", value: "1,250", icon: "👥" },
    { label: "Total Courses", value: "48", icon: "📚" },
    { label: "Total Staff", value: "120", icon: "👨‍🏫" },
    { label: "Venues", value: "25", icon: "🏢" },
  ];

  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back! Here's what's happening today
        </p>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center hover:scale-105">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
            <span className="text-2xl mr-3">📅</span>
            <p className="text-gray-700 font-medium">
              Timetable generated successfully
            </p>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <span className="text-2xl mr-3">👤</span>
            <p className="text-gray-700 font-medium">New student registered</p>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
            <span className="text-2xl mr-3">📚</span>
            <p className="text-gray-700 font-medium">Course added to system</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;

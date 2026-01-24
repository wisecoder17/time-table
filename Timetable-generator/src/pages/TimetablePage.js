import React from "react";
import Card from "../components/common/Card";

/**
 * Timetable page
 */
const TimetablePage = () => {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Timetable Generator</h1>
        <p className="page-subtitle">Generate and manage timetables</p>
      </div>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <p className="text-gray-600 text-lg">
          Timetable generation coming soon...
        </p>
      </Card>
    </div>
  );
};

export default TimetablePage;

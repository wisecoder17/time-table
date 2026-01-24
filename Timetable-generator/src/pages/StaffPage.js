import React from "react";
import Card from "../components/common/Card";

/**
 * Staff management page
 */
const StaffPage = () => {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Staff Management</h1>
        <p className="page-subtitle">
          Manage staff members and their schedules
        </p>
      </div>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">👨‍🏫</div>
        <p className="text-gray-600 text-lg dark:text-gray-400">
          Staff management coming soon...
        </p>
      </Card>
    </div>
  );
};

export default StaffPage;

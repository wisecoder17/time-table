import React from "react";
import Card from "../components/common/Card";

/**
 * Venues management page
 */
const VenuesPage = () => {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Venues Management</h1>
        <p className="page-subtitle">Manage and schedule venue allocations</p>
      </div>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">🏢</div>
        <p className="text-gray-600 text-lg">
          Venues management coming soon...
        </p>
      </Card>
    </div>
  );
};

export default VenuesPage;

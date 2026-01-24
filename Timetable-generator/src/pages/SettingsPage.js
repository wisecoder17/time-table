import React from "react";
import Card from "../components/common/Card";

/**
 * Settings page
 */
const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Configure system preferences and options
        </p>
      </div>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">⚙️</div>
        <p className="text-gray-600 text-lg">Settings coming soon...</p>
      </Card>
    </div>
  );
};

export default SettingsPage;

import React from "react";

/**
 * Alert component for displaying notifications
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {string} message - Alert message
 * @param {Function} onClose - Close handler
 */
const Alert = ({ type = "info", message, onClose, className = "" }) => {
  const typeStyles = {
    success: "bg-green-50 border border-green-200 text-green-800",
    error: "bg-red-50 border border-red-200 text-red-800",
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border border-blue-200 text-blue-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "!",
    info: "ℹ",
  };

  return (
    <div
      className={`flex items-center p-4 rounded-md ${typeStyles[type]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <span className="mr-3 font-bold">{icons[type]}</span>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold hover:opacity-70"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;

import React from "react";

/**
 * Card component for content grouping
 * @param {string} title - Card title
 * @param {ReactNode} children - Card content
 */
const Card = ({ title, children, className = "", onClick = null }) => {
  return (
    <div
      className={`card-base ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;

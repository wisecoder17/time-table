import React from "react";

/**
 * Input component with label and error support
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} type - Input type
 * @param {boolean} required - Is required
 * @param {string} aria-describedby - Accessibility description ID
 */
const Input = React.forwardRef(
  (
    {
      label,
      error,
      type = "text",
      required = false,
      id,
      className = "",
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random()}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`input-base ${error ? "border-red-500" : ""} ${className}`}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

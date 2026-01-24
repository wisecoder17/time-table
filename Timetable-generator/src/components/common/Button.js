import React from "react";

/**
 * Button component with variants and accessibility support
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'outlined'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Disabled state
 * @param {string} aria-label - Accessibility label
 * @param {ReactNode} children - Button content
 * @param {Function} onClick - Click handler
 */
const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
      primary:
        "bg-brick-primary brand-gradient-panel text-white hover:brightness-110 focus:ring-brick-light disabled:opacity-50",
      secondary:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
      danger:
        "bg-academic-red text-white hover:brightness-90 focus:ring-red-500 disabled:opacity-50",
      outlined:
        "border-2 border-brick-primary text-brick-primary hover:bg-brick-light/10 focus:ring-brick-primary dark:border-white dark:text-white dark:hover:bg-white/10",
      brand: "brand-button-gold",
    };

    const sizeStyles = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const buttonClass = `${baseStyles} ${variantStyles[variant]} ${
      sizeStyles[size]
    } ${disabled ? "cursor-not-allowed" : ""} ${className}`;

    return (
      <button ref={ref} disabled={disabled} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;

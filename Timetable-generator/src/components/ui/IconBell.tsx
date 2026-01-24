import React from "react";

interface IconBellProps {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: number | string;
}

/**
 * IconBell - a compact bell icon used as a theme toggle control.
 */
const IconBell: React.FC<IconBellProps> = ({
  active = false,
  onClick,
  className = "",
  size = 20,
}) => {
  return (
    <button
      aria-label={active ? "Switch to light mode" : "Switch to dark mode"}
      title={active ? "Dark mode" : "Light mode"}
      onClick={onClick}
      className={`icon-bell ${className} focus:outline-none flex items-center justify-center cursor-pointer`}
      style={{
        background: "transparent",
        border: "none",
        padding: 6,
      }}
    >
      {active ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C10.343 2 9 3.343 9 5v1.07A6.002 6.002 0 006 12v4l-1 1v1h14v-1l-1-1v-4a6 6 0 00-3-5.93V5c0-1.657-1.343-3-3-3zM8.5 20a3.5 3.5 0 006.999.001L8.5 20z" />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      )}
    </button>
  );
};

export default IconBell;

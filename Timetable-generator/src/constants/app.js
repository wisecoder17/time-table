/**
 * Application constants
 */

export const APP_TITLE = "Timetable Generator";

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  TIMEOUT: 5000,
};

export const ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
  STUDENT: "student",
  COORDINATOR: "coordinator",
};

export const MESSAGES = {
  SUCCESS: {
    CREATED: "Item created successfully",
    UPDATED: "Item updated successfully",
    DELETED: "Item deleted successfully",
    SAVED: "Changes saved successfully",
  },
  ERROR: {
    NETWORK: "Network error. Please try again.",
    SERVER: "Server error. Please try again later.",
    UNAUTHORIZED: "Unauthorized. Please login again.",
    VALIDATION: "Please check your input and try again.",
  },
  CONFIRM: {
    DELETE: "Are you sure you want to delete this item?",
    LOGOUT: "Are you sure you want to logout?",
  },
};

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const DATE_FORMAT = "MMM DD, YYYY";
export const TIME_FORMAT = "hh:mm A";

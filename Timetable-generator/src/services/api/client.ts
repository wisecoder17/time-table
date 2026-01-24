import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

/**
 * Institutional API Client
 * Features: Type-safe requests, centralized error handling, and session management.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - disciplined session management
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - robust error orchestration
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - deterministic session purge
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    // Technical Error Reconstruction
    if (error.message === "Network Error") {
      error.message =
        "System connectivity issue - ensure academic servers are operational.";
    } else if (error.code === "ECONNABORTED") {
      error.message = `Registry timeout - Server at ${API_BASE_URL} responded with a wait error.`;
    } else if (!error.response && error.request) {
      error.message = `Critical Connection Failure - Unable to verify registry at ${API_BASE_URL}.`;
    }

    return Promise.reject(error);
  },
);

export default apiClient;

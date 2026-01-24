import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Increased from 5000 to 10000ms
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
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

// Response interceptor - handle errors with retry logic
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    // Improve error messages for debugging
    if (error.message === "Network Error") {
      error.message =
        "Network error - please check your internet connection and that the server is running.";
    } else if (error.code === "ECONNABORTED") {
      error.message =
        "Request timeout - server is not responding. Please ensure the backend server is running at " +
        API_BASE_URL;
    } else if (!error.response && error.request) {
      error.message =
        "Unable to connect to server at " +
        API_BASE_URL +
        ". Please ensure the backend is running.";
    }

    return Promise.reject(error);
  },
);

export default apiClient;

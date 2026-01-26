import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { User } from "../../types/institutional";

// Auth response is just User now

/**
 * Institutional Authentication Service
 * Features: Secure credential verification and session orchestration.
 */
export const authService = {
  login: async (username: string, password?: string): Promise<User> => {
    try {
      const response = await apiClient.post<any>("/users/login", {
        username,
        password,
      });

      // Backend returns the User object directly, no token wrapper
      const user = response.data;

      if (user && user.username) {
        localStorage.setItem("user_data", JSON.stringify(user));
        localStorage.setItem("username", user.username);
      }

      return mapBackendUserToFrontend(user);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  logout: (): void => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("username");
    localStorage.removeItem("auth_token"); // Cleanup old
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("username");
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      // Fallback to local storage if API is not available or just return stored user
      // Validating against backend if possible
      const username = localStorage.getItem("username");
      if (!username) throw new Error("No active session");

      const response = await apiClient.get<any>(`/users/${username}`);
      return mapBackendUserToFrontend(response.data);
    } catch (error: any) {
      // Fallback to stored data if network fail (optional)
      const stored = localStorage.getItem("user_data");
      if (stored) return mapBackendUserToFrontend(JSON.parse(stored));

      throw handleApiError(error);
    }
  },
};

// Helper to adapt Backend User to Frontend User Interface
const mapBackendUserToFrontend = (backendUser: any): User => {
  return {
    id: backendUser.id?.toString() || "0",
    username: backendUser.username,
    role: backendUser.role, // Assumes Enum strings match "ADMIN", "LECTURER" etc
    departmentId: backendUser.department?.id?.toString(),
    // Map other fields if available
  };
};

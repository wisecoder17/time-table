import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { User } from "../../types/institutional";

interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Institutional Authentication Service
 * Features: Secure credential verification and session orchestration.
 */
export const authService = {
  login: async (username: string, password?: string): Promise<AuthResponse> => {
    try {
      // In TS refactor state, we support both full creds and mock bypass
      const response = await apiClient.post<AuthResponse>("/users/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  logout: (): void => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token"); // Legacy cleanup
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<User>("/users/me");
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};

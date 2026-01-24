import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const authService = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post("/users/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

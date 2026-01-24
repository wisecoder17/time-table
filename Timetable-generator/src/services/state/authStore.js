import { create } from "zustand";
import { authService } from "../api/authService";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("auth_token"),
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login(username, password);
      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      error: null,
    });
  },

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

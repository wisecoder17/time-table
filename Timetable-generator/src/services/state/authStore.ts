import { create } from "zustand";
import { User } from "../../types/institutional";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * Institutional Auth Store
 * Enforces Zustand strictly for UI state only.
 */
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem("auth_token"),
  isLoading: false,
  error: null,

  login: (userData: User) => {
    // In a real system, this would come from a server via React Query
    // Here we maintain consistency with existing structure but with TS safety.
    const mockToken = "institutional-access-token";
    localStorage.setItem("auth_token", mockToken);
    set({
      user: userData,
      token: mockToken,
      isLoading: false,
      error: null,
    });
  },

  logout: () => {
    localStorage.removeItem("auth_token");
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

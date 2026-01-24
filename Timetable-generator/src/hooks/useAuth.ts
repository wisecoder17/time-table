import { useCallback } from "react";
import { useAuthStore } from "../services/state/authStore";
import { User } from "../types/institutional";

/**
 * Institutional Auth Hook
 * Features: Type-safe access to auth state, role-based checks.
 */
export const useAuth = () => {
  const { user, token, isLoading, error, login, logout, setUser } =
    useAuthStore();

  const isAuthenticated = useCallback(() => {
    return !!token && !!user;
  }, [token, user]);

  const hasRole = useCallback(
    (role: User["role"]) => {
      return user?.role === role;
    },
    [user],
  );

  return {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    setUser,
    isAuthenticated: isAuthenticated(),
    hasRole,
  };
};

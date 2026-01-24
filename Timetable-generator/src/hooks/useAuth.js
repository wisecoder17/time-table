import { useCallback } from "react";
import { useAuthStore } from "../services/state/authStore";

/**
 * Custom hook for authentication
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const { user, token, isLoading, error, login, logout, setUser } = useAuthStore();

  const isAuthenticated = useCallback(() => {
    return !!token && !!user;
  }, [token, user]);

  const hasRole = useCallback(
    (role) => {
      return user?.role === role;
    },
    [user]
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

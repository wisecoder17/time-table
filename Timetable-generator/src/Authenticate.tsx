import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "./types/institutional";

interface AuthContextType {
  user: User | null;
  token: string | null; // Compatibility with useAuth usage in App.tsx
  login: (userData: User) => void;
  logout: () => void;
}

const Authenticate = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || (user ? "mock-token" : null),
  );

  const login = (userData: User) => {
    setUser(userData);
    setToken("mock-token");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <Authenticate.Provider value={{ user, token, login, logout }}>
      {children}
    </Authenticate.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(Authenticate);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

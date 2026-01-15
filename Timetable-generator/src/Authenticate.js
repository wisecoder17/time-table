import { createContext, useContext, useState } from "react";

const Authenticate = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); //store the whole user object (username, role, dept)
  };

  const logout = () => setUser(null);

  return (
    <Authenticate.Provider value={{ user, login, logout }}>
      {children}
    </Authenticate.Provider>
  );
}

export const useAuth = () => useContext(Authenticate);

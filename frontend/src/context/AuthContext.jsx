import { createContext, useState, useContext, useEffect } from "react";
import { setUpdateTokenCallback } from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("access") || null,
  );

  function login(accessToken, refreshToken) {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setToken(accessToken);
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken(null);
  }

  function updateToken(newToken) {
    localStorage.setItem("access", newToken);
    setToken(newToken);
  }

  useEffect(() => {
    setUpdateTokenCallback(updateToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

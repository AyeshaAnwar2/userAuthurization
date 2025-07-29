import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || "";
  });

  useEffect(() => {
    // Sync user and token in localStorage
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem("authToken", token);
    }
  }, [user, token]);

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
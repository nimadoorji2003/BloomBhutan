// src/AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User authentication state and user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Holds user data including profile image

  // Function to log in the user
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Function to update user data
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

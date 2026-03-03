// src/contexts/AuthContext.jsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would validate the token with an API call
      // For now, we'll just set a dummy user object
      try {
        // Decode the token to get user info (simplified)
        const tokenPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(tokenPayload));
        setUser({
          email: decodedPayload.email,
          role: decodedPayload.role,
          id: decodedPayload.userId
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
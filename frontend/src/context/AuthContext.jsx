import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (t) => {
    try {
      const res = await fetch(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || 'Login failed');
    }

    const newToken = data.data.token;
    localStorage.setItem('admin_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    return data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Fetch helper that auto-attaches the Authorization header.
   * For FormData, don't set Content-Type (browser does it with boundary).
   */
  const authFetch = useCallback(async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type for FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401 || res.status === 403) {
      logout();
      throw new Error('Session expired. Please login again.');
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || `Request failed (${res.status})`);
    }
    return data;
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, isLoading, login, logout, authFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

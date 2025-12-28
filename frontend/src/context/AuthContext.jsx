import React, { createContext, useState, useContext } from 'react';
  import { login, register } from '../api/auth';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (credentials) => {
      try {
        setLoading(true);
        const data = await login(credentials);

        setUser(data);
        setToken(data.token);

        localStorage.setItem('token', data.token);

        return data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    const registerUser = async (userData) => {
      try {
        setLoading(true);
        const data = await register(userData);

        setUser(data);
        setToken(data.token);

        localStorage.setItem('token', data.token);

        return data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    const logout = () => {
      setUser(null);
      setToken(null);

      localStorage.removeItem('token');
    };

    const value = {
      user,
      token,
      loading,
      loginUser,
      registerUser,
      logout,
      isAuthenticated: !!token
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
  };
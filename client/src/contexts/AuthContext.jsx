
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      API.get('/auth/me').then(response => {
        setUser(response.data);
        setIsLoading(false);
      }).catch(() => {
        // Token is invalid, so remove it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete API.defaults.headers.common['Authorization'];
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const response = await API.post('/auth/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete API.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

// src/utils/auth.js

import axiosClient from '../api/axiosClient';

// Store authentication data
export const setAuthData = (token, email) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('loginTimestamp', new Date().toISOString());
  localStorage.setItem('isAuthenticated', 'true');
  
  // Set token in axios headers
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get user email
export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  return !!(token && isAuth);
};

// Clear all authentication data (for logout)
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('loginTimestamp');
  localStorage.removeItem('isAuthenticated');
  
  // Remove token from axios headers
  delete axiosClient.defaults.headers.common['Authorization'];
};

// Initialize auth on app load
export const initializeAuth = () => {
  const token = getAuthToken();
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Get login timestamp
export const getLoginTimestamp = () => {
  return localStorage.getItem('loginTimestamp');
};
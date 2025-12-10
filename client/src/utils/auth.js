import { authAPI } from '../services/api';

/**
 * Check if user is authenticated by validating token with backend
 * @returns {Promise<boolean>} - True if authenticated, false otherwise
 */
export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false;
  }

  try {
    await authAPI.getMe();
    return true;
  } catch (error) {
    // Token is invalid or expired
    localStorage.removeItem('token');
    return false;
  }
};

/**
 * Get authentication token
 * @returns {string|null} - Token or null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Remove authentication token (logout)
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Set authentication token
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};


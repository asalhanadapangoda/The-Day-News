import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      // Verify token is valid
      await authAPI.getMe();
      setIsAuthenticated(true);
    } catch (error) {
      // Token is invalid or server unavailable
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      // Don't log errors for missing tokens - that's expected
      if (token) {
        console.warn('Auth verification failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;


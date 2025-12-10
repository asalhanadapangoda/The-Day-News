import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      // Verify token is valid by calling the API
      await authAPI.getMe();
      setIsAuthenticated(true);
    } catch (error) {
      // Token is invalid or expired, or server is not available
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

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;


import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    verifyAuth();
    // Re-verify on route change
    const interval = setInterval(() => {
      verifyAuth();
    }, 5 * 60 * 1000); // Re-verify every 5 minutes

    return () => clearInterval(interval);
  }, [location.pathname]);

  const verifyAuth = async () => {
    const token = localStorage.getItem('token');
    
    // No token - immediately redirect to login
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      // Verify token is valid by calling the API
      const userData = await authAPI.getMe();
      
      // Additional check: ensure user is admin
      if (userData && userData.role === 'admin') {
        setIsAuthenticated(true);
      } else {
        // User is not admin - remove token and redirect
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Token is invalid, expired, or server is not available
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      
      // Log error for debugging (but don't expose to user)
      if (error.message && !error.message.includes('Cannot connect')) {
        console.warn('Auth verification failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while verifying
  if (loading) {
    return <LoadingSpinner />;
  }

  // Not authenticated - redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  // Authenticated - render protected content
  return children;
};

export default ProtectedRoute;


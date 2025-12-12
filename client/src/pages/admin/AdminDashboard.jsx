import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../../services/api';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    try {
      const userData = await authAPI.getMe();
      setUser(userData);
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      navigate('/admin', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin', { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TDN</span>
              </div>
              <span className="font-bold">Admin Panel</span>
            </div>

            <nav className="space-y-2">
              <Link
                to="/admin/dashboard/sections"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Manage Sections
              </Link>
              <Link
                to="/admin/dashboard/add-podcast"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Add New Podcast
              </Link>
              <Link
                to="/admin/dashboard/edit-podcast"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Edit Podcast
              </Link>
              <Link
                to="/admin/dashboard/upcoming"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Manage Upcoming
              </Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.username}</p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


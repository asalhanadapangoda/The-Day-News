import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, LayoutDashboard, FileText, Layers, Monitor } from 'lucide-react';
import logo from '../../assets/logo.png';

const AdminLayout = () => {
  const { admin, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds

  const handleLogout = () => {
    logout();
    navigate('/Samoa/TDNG_Admin/login');
  };

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log('Inactivity logout triggered');
      handleLogout();
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    if (admin) {
      // Setup activity listeners
      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
      
      const resetOnActivity = () => resetTimer();

      events.forEach(event => {
        window.addEventListener(event, resetOnActivity);
      });

      // Initial timer start
      resetTimer();

      return () => {
        // Cleanup listeners and timer
        events.forEach(event => {
          window.removeEventListener(event, resetOnActivity);
        });
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [admin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  if (!admin) {
    return <Navigate to="/Samoa/TDNG_Admin/login" replace />;
  }

  const navLinks = [
    { name: 'Dashboard', path: '/Samoa/TDNG_Admin/dashboard', icon: LayoutDashboard },
    { name: 'Articles', path: '/Samoa/TDNG_Admin/articles', icon: FileText },
    { name: 'Categories', path: '/Samoa/TDNG_Admin/categories', icon: Layers },
    { name: 'Hero Sliders', path: '/Samoa/TDNG_Admin/heroes', icon: Monitor },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 admin-sidebar flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link to="/Samoa/TDNG_Admin/dashboard" className="block text-center flex flex-col items-center justify-center">
            <img src={logo} alt="The Day News Admin" className="h-[75px] w-auto mx-auto object-contain" />
            <div className="mt-3 text-[10px] font-black tracking-[0.2em] text-white/50 bg-white/10 px-3 py-1 rounded-full uppercase border border-white/10 shadow-lg">NZ Admin Console</div>
          </Link>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#1a1a1a]">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

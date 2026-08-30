import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, LayoutDashboard, Video, FileText, Settings, MessageSquare, Layers, Image, Monitor, Handshake, Calendar } from 'lucide-react';
import logo from '../assets/logo.webp';
import api from '../services/api';

const AdminLayout = () => {
  const { admin, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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

  useEffect(() => {
    if (admin) {
      const fetchUnreadMessages = async () => {
        try {
          const { data } = await api.get('/messages');
          const unreadCount = data.filter(msg => !msg.isRead).length;
          setUnreadMessages(unreadCount);
        } catch (error) {
          console.error('Failed to fetch unread messages', error);
        }
      };

      fetchUnreadMessages();
      const interval = setInterval(fetchUnreadMessages, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }
  }, [admin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Programs', path: '/admin/programs', icon: Video },
    { name: 'Episodes', path: '/admin/episodes', icon: Image },
    { name: 'Articles', path: '/admin/articles', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Advertisements', path: '/admin/ads', icon: Image },
    { name: 'Hero Sliders', path: '/admin/heroes', icon: Monitor },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Partners', path: '/admin/partners', icon: Handshake },
    { name: 'Events', path: '/admin/events', icon: Calendar },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 admin-sidebar flex flex-col h-screen sticky top-0 shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <Link to="/admin/dashboard" className="block text-center flex flex-col items-center justify-center">
            <img src={logo} alt="The Day News Admin" className="h-[75px] w-auto mx-auto object-contain" />
            <div className="mt-3 text-[10px] font-black tracking-[0.2em] text-white/50 bg-white/10 px-3 py-1 rounded-full uppercase border border-white/10 shadow-lg">Admin Console</div>
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
                    className="flex items-center justify-between px-6 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      {link.name}
                    </div>
                    {link.name === 'Messages' && unreadMessages > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {unreadMessages}
                      </span>
                    )}
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
      <main className="flex-1 h-screen overflow-y-auto bg-[#1a1a1a]">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

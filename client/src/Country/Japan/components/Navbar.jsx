import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import logo from '../../../Global/assets/logo.webp';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Japan/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/Japan' },
    { name: 'Articles', path: '/Japan/articles' },
    { name: 'About Us', path: '/Japan/about' },
    { name: 'Contact', path: '/Japan/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0014]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/Japan" className="flex items-center">
              <img 
                src={logo} 
                alt="The Day News Global" 
                className="h-[75px] w-auto py-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] object-contain" 
                width={180}
                height={75}
                              loading="eager"
                fetchpriority="high"
                decoding="sync"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/Japan'}
                className={({ isActive }) =>
                  `text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${isActive ? 'text-primary text-glow' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 text-white text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48 transition-all duration-300 focus:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button aria-label="Submit search"
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-primary transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/Japan'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider ${isActive ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
 
            <form onSubmit={handleSearch} className="relative mt-4 px-3">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg pl-4 pr-10 py-3 w-full focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button aria-label="Submit search"
                type="submit"
                className="absolute right-6 top-3 text-gray-400 hover:text-primary"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

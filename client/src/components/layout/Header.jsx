import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/thedaynews.png';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="shadow-md sticky top-0 z-50" style={{ backgroundColor: '#151565ff' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={logo} alt="The Day News Logo" className="h-18 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-white'
                  : 'text-blue-100 hover:text-white'
              }`}
              style={isActive('/') ? { backgroundColor: '#000060' } : { backgroundColor: 'transparent' }}
            >
              Home
            </Link>
            <Link
              to="/podcasts"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/podcasts')
                  ? 'text-white'
                  : 'text-blue-100 hover:text-white'
              }`}
              style={isActive('/podcasts') ? { backgroundColor: '#000060' } : { backgroundColor: 'transparent' }}
            >
              Podcasts
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-white'
                  : 'text-blue-100 hover:text-white'
              }`}
              style={isActive('/about') ? { backgroundColor: '#000060' } : { backgroundColor: 'transparent' }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-white'
                  : 'text-blue-100 hover:text-white'
              }`}
              style={isActive('/contact') ? { backgroundColor: '#000060' } : { backgroundColor: 'transparent' }}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


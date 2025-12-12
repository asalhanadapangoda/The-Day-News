import { Link } from 'react-router-dom';
import logo from '../../assets/The day News Logo.jpeg';

const Footer = () => {
  return (
    <footer className="glass-blue border-t border-white/20 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo} 
                alt="THE DAY NEWS" 
                className="h-10 md:h-12 w-auto object-contain"
              />
              <span className="text-lg md:text-xl font-bold text-gray-800 text-premium">THE DAY NEWS</span>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Your trusted source for daily news and insightful podcasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-gray-800 text-base md:text-lg">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/podcasts" className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                  Podcasts
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-gray-800 text-base md:text-lg">Connect</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.facebook.com/thedaynewsglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base flex items-center space-x-2 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-gray-800 text-base md:text-lg">Stay Updated</h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
              Subscribe to get the latest news and podcast updates.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 md:mt-10 pt-8 md:pt-10 text-center text-gray-600 text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} THE DAY NEWS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


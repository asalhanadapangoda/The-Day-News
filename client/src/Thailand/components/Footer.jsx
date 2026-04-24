import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import logo from '../../assets/logo.png';

const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ['th-settings'],
    queryFn: () => api.get('/settings').then(res => res.data),
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  return (
    <footer className="bg-[#08000f] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/Thailand" className="inline-block">
              <img
                src={logo}
                alt="The Day News Global"
                className="h-[80px] w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                width={200}
                height={80}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Your Media Partner In Cyberspace...
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/thedaynewsglobal/" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.bing.com/ck/a?!&&p=06585dbc01d391738d57c0aaf90af8118e3e8c4cff1d50e580e724811af96d1fJmltdHM9MTc3MzcwNTYwMA&ptn=3&ver=2&hsh=4&fclid=1d3c2763-6e69-6665-1396-327d6f2c67d2&psq=thedaynewsglobal+&u=a1aHR0cHM6Ly9say5saW5rZWRpbi5jb20vY29tcGFueS90aGUtZGF5LW5ld3MtZ2xvYmFs" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/daynewsglobal/" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@TheDayNewsGlobal" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/Thailand" className="text-gray-400 hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/Thailand/articles" className="text-gray-400 hover:text-primary text-sm transition-colors">Articles</Link></li>
              <li><Link to="/Thailand/about" className="text-gray-400 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/Thailand/contact" className="text-gray-400 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  The Third Place, TRACE Expert City, Colombo 10
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">contact@thedaynewsglobal.lk</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 The Day News Global. Trusted journalism, 24/7.</p>
          <div className="text-gray-500 text-xs text-glow-primary">
            Designed for truth, built for clarity.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import logo from '../assets/logo.png';

const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then(res => res.data),
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  return (
    <footer className="bg-[#08000f] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="The Day News Global" className="h-[100px] w-auto object-contain" width={250} height={100} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              {settings?.aboutUsText
                ? settings.aboutUsText.replace(/<[^>]+>/g, '').substring(0, 150) + '...'
                : 'The Day News Global serves as a premier, interactive media platform dedicated to the pursuit of knowledge and meaningful insights.'}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings?.socialLinks?.facebook || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href={settings?.socialLinks?.linkedin || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={settings?.socialLinks?.instagram || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href={settings?.socialLinks?.youtube || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/programs" className="text-gray-400 hover:text-primary text-sm transition-colors">Programs</Link></li>
              <li><Link to="/articles" className="text-gray-400 hover:text-primary text-sm transition-colors">Articles</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-primary text-sm transition-colors">Events</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  {settings?.contactAddress || '123 Media Avenue, New York, NY 10001, USA'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings?.contactPhone || '+1 (555) 123-4567'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings?.contactEmail || 'contact@thedaynewsglobal.com'}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {settings?.footerText || '© 2026 The Day News Global. Trusted journalism, 24/7.'}
          </p>
          <div className="text-gray-500 text-xs">
            Designed for truth, built for clarity.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

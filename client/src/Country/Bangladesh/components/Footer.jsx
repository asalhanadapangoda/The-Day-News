import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import logo from '../assets/logo.webp';

const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ['bd-settings'],
    queryFn: () => api.get('/settings').then(res => res.data),
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  return (
    <footer className="bg-[#08000f] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/Bangladesh" className="inline-block">
              <img 
                src={logo} 
                alt="The Day News Global" 
                className="h-[100px] w-auto object-contain" 
                width={250}
                height={100}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              {settings?.aboutUsText
                ? settings.aboutUsText.replace(/<[^>]+>/g, '').substring(0, 150) + '...'
                : 'Your Media Partner In Cyberspace...'}
            </p>
            <div className="flex space-x-4 pt-2">
              <a aria-label="Visit our social media page" href={settings?.socialLinks?.facebook || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a aria-label="Visit our social media page" href={settings?.socialLinks?.linkedin || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a aria-label="Visit our social media page" href={settings?.socialLinks?.instagram || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a aria-label="Visit our social media page" href={settings?.socialLinks?.youtube || '#'} className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a aria-label="Visit our X (Twitter) page" href="https://x.com/daynewsglobal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/Bangladesh" className="text-gray-400 hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/Bangladesh/programs" className="text-gray-400 hover:text-primary text-sm transition-colors">Programs</Link></li>
              <li><Link to="/Bangladesh/articles" className="text-gray-400 hover:text-primary text-sm transition-colors">Articles</Link></li>
              <li><Link to="/Bangladesh/events" className="text-gray-400 hover:text-primary text-sm transition-colors">Events</Link></li>
              <li><Link to="/Bangladesh/about" className="text-gray-400 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/Bangladesh/contact" className="text-gray-400 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
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
                  {settings?.contactAddress || 'The Third Place, TRACE Expert City, Colombo 10'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings?.contactEmail || 'contact@thedaynewsglobal.com'}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {settings?.footerText || '© 2026 The Day News Global. Trusted journalism, 24/7.'}
          </p>
          <div className="text-gray-400 text-xs">
            Designed for truth, built for clarity.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

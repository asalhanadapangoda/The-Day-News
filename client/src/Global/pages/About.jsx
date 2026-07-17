import { Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorldMap from '../components/WorldMap';

const OPERATING_COUNTRIES = [
  'Australia',
  'Bangladesh',
  'Sri Lanka',
  'Japan',
  'India',
  'USA',
  'Thailand',
  'Denmark',
  'South Africa',
  'New Zealand',
  'Samoa',
];

const About = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center bg-[#0c0014] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#0c0014] opacity-50"></div>
        <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-[100px] -top-20 -left-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow tracking-wider uppercase">About Us</h1>
          <p className="text-xl text-primary font-semibold">The Day News Global</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="glass-card p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full"></div>
          <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-4">About THE DAY NEWS</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              The Day News Global serves as a premier, interactive media platform dedicated to the pursuit of knowledge.
              We empower a global audience to gain meaningful insights through active engagement with diverse perspectives.
            </p>
            <p>
              Positioned as your strategic media partner in cyberspace, we bridge the gap between unheard information
              and actionable understanding, fostering a community where continuous learning is integrated into the daily experience.
            </p>
          </div>
        </div>
        
        {/* Our Packages Section */}
        <div className="glass-card p-8 md:p-12 mb-20 relative overflow-hidden group">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-grow">
              <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-primary pl-4 flex items-center gap-3">
                Our Media Packages
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                We offer premium and platinum media packages tailored to amplify your brand&apos;s digital presence. From high-quality podcast production to comprehensive social media strategy, our packages are designed for impact.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link 
                to="/Packages" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:gap-4 shadow-xl shadow-primary/20 whitespace-nowrap"
              >
                View Our Packages
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Presence / World Map Section */}
        <div className="mb-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-5">
              <Globe size={16} className="text-primary" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Worldwide</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Our Global Presence</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Delivering trusted news and insights across continents — connecting communities around the world.
            </p>
          </div>

          {/* Map Container */}
          <div className="glass-card p-3 md:p-4 mb-8">
            <WorldMap />
          </div>

          {/* Country Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {OPERATING_COUNTRIES.map((name) => (
              <div
                key={name}
                className="bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/10 rounded-full px-4 py-2 transition-all duration-300 group cursor-default"
              >
                <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default About;

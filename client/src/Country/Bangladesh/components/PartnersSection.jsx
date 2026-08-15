import { useState, useEffect, useRef } from 'react';
import { cloudinaryOptimize } from '../../../utils/cloudinary';

const PartnersSection = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  // Ensure we have enough items to cover the screen width several times
  // This creates a truly seamless loop even with a small number of partners
  const repeatCount = partners.length < 5 ? 20 : 10;
  const displayPartners = Array(repeatCount).fill(partners).flat();

  return (
    <section className="py-24 bg-[#0c0014] overflow-hidden border-t border-white/5 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 mb-12 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Our <span className="text-primary">Trusted Partners</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* 3D Perspective Container for "Circular" feel */}
      <div className="relative flex overflow-hidden group py-10 perspective-1000">
        <div className="flex animate-marquee whitespace-nowrap items-center py-4">
          {displayPartners.map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className="mx-8 md:mx-16 flex-shrink-0 transition-all duration-700 hover:scale-125"
            >
              <div className="relative group/logo">
                {/* Glow Effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-pink-500/30 to-purple-500/30 rounded-full blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700 scale-150"></div>
                
                <img
                  src={cloudinaryOptimize(partner.logoUrl, 300)}
                  width={300}
                  height={150}
                  alt={partner.name}
                  className="h-12 md:h-20 w-auto object-contain grayscale brightness-125 opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:brightness-100 transition-all duration-700 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                  title={partner.name}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Deep Gradient Overlays for "Circular Tunnel" effect */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0c0014] via-[#0c0014]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0c0014] via-[#0c0014]/80 to-transparent z-20 pointer-events-none"></div>
      </div>

      <style jsx="true">{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;

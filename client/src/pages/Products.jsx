import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Product = () => {
  const packages = [
    {
      name: "Premium Package",
      price: "LKR 125,000",
      features: [
        "Podcast Interview (30–40 minutes)",
        "3 Podcast mid-range videos",
        "Photography Coverage",
        "3 voice-cut videos",
        "Highlight/Promo video (60-90 seconds)",
        "Web Article",
        "2 social media promotional posts"
      ]
    },
    {
      name: "Platinum Package",
      price: "LKR 75,000",
      features: [
        "Photography Coverage",
        "3 voice-cut videos",
        "Highlight/Promo video (60-90 seconds)",
        "Web Article",
        "2 social media promotional posts"
      ]
    }
  ];

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center bg-[#0c0014] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#0c0014] opacity-50"></div>
        <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-[100px] -top-20 -left-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow tracking-wider uppercase">Our Products</h1>
          <p className="text-xl text-primary font-semibold">Elevate Your Presence with The Day News Global</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="glass-card p-8 md:p-10 flex flex-col h-full relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{pkg.name}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-primary">{pkg.price}</span>
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <p className="text-gray-400 font-medium uppercase text-xs tracking-widest border-b border-white/10 pb-2">What&apos;s included:</p>
                <ul className="space-y-4">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <CheckCircle className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Minimalist Premium Design */}
        <div className="py-12 md:py-16 relative overflow-hidden text-center">
          {/* Animated decorative background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8">
              Need More <span className="text-gradient-primary">Information?</span>
            </h2>

            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 transform bg-[#0c0014] rounded-full hover:scale-105 shadow-[0_0_25px_rgba(79,70,229,0.2)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
              <span className="relative flex items-center gap-3 text-base">
                Contact Us Today
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

import { CheckCircle, Tag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Packages = () => {
  const packages = [
    {
      name: "Premium Package",
      originalPrice: 125000,
      discount: 20, // 20% off
      popular: true,
      tagline: "The ultimate media event coverage and broadcast",
      features: [
        "Podcast Interview (30–40 minutes)",
        "3 Podcast mid-range videos",
        "Photography Coverage",
        "3 Voice-cut videos",
        "Highlight/Promo video (60-90 seconds)",
        "Web Article",
        "2 social media promotional posts"
      ]
    },
    {
      name: "Platinum Package",
      originalPrice: 75000,
      discount: 60, // 15% off
      tagline: "Premium digital coverage and social outreach",
      features: [
        "Photography Coverage",
        "3 voice-cut videos",
        "Highlight/Promo video (60-90 seconds)",
        "Web Article",
        "2 Social media promotional posts"
      ]
    },
    {
      name: "Photography Package",
      originalPrice: 45000,
      discount: 60, // 60% off
      tagline: "Full capture of raw moments and high-res edits",
      features: [
        "Full Event Coverage",
        "High-Resolution Edited Photos",
        "Online Gallery Access",
        "2 Social media promotional posts",
        "Web Article"
      ]
    },
    {
      name: "Podcast Package",
      originalPrice: 60000,
      discount: 30, // 30% off
      tagline: "Dedicated audio-visual recording and interview production",
      features: [
        "Podcast Interview (20-30 minutes)",
        "2 mid range videos",
        "2 Social media promotional posts",
        "Web Article"
      ]
    },
    {
      name: "Article Package",
      originalPrice: 12500,
      discount: 0,
      tagline: "Essential digital presence boost",
      features: [
        "2 Social media promotional posts",
        "Web Article"
      ]
    }
  ];

  return (
    <div className="w-full pb-20 animate-fade-in">
      {/* Hero Section */}
      <div className="relative w-full h-[45vh] min-h-[350px] flex items-center justify-center bg-[#0c0014] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#0c0014] opacity-50"></div>
        <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-[100px] -top-20 -left-20 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] -bottom-20 -right-20 animate-pulse-slow"></div>
        <div className="relative z-10 text-center px-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase mb-4 inline-block animate-pulse">
            Exclusive Digital Media Offer
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-glow tracking-wider uppercase">
            Our Packages
          </h1>
          <p className="text-lg md:text-xl text-primary font-semibold max-w-2xl mx-auto">
            Elevate Your Presence with The Day News Global. Choose a premium plan customized for your brand or event.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {packages.map((pkg, index) => {
            const savings = (pkg.originalPrice * pkg.discount) / 100;
            const discountedPrice = pkg.originalPrice - savings;

            return (
              <div
                key={index}
                className={`glass-card p-8 md:p-10 flex flex-col h-full relative overflow-hidden transition-all duration-500 hover:scale-[1.02] ${pkg.popular
                  ? 'border-2 border-primary/40 shadow-[0_0_30px_rgba(79,70,229,0.15)] bg-gradient-to-b from-[#180029]/90 to-dark-card/90'
                  : 'border border-white/5 hover:border-white/10'
                  }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <span className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-indigo-500 text-white text-[10px] uppercase font-black tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg border-l border-b border-white/10">
                      <Sparkles size={11} className="animate-spin-slow" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-extrabold text-white mb-1 tracking-tight flex items-center gap-2">
                    {pkg.name}
                  </h2>
                  <p className="text-gray-400 text-sm italic mb-4">{pkg.tagline}</p>

                  {/* Pricing Block */}
                  <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10"></div>

                    {pkg.discount > 0 ? (
                      <>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Normal Price</span>
                            <span className="text-lg font-bold text-gray-500 line-through decoration-red-500/80 decoration-2">
                              LKR {pkg.originalPrice.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider animate-bounce-subtle">
                            <Tag size={12} />
                            Save {pkg.discount}%
                          </div>
                        </div>

                        <div className="border-t border-white/5 my-2"></div>
                      </>
                    ) : null}

                    <div className="flex flex-col">
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                        {pkg.discount > 0 ? 'Special Promotional Price' : 'Price'}
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl md:text-4xl font-black text-white text-glow">
                          LKR {discountedPrice.toLocaleString()}
                        </span>
                      </div>
                      {pkg.discount > 0 && (
                        <span className="text-[10px] text-emerald-400/90 font-medium mt-1">
                          Instant savings of LKR {savings.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-grow space-y-4 mb-8">
                  <p className="text-gray-400 font-semibold uppercase text-xs tracking-wider border-b border-white/5 pb-2">
                    What&apos;s included in this plan:
                  </p>
                  <ul className="space-y-3.5">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <CheckCircle className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 group-hover:text-indigo-400 transition-all duration-300" size={16} />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Link
                  to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold transition-all duration-300 text-center flex items-center justify-center gap-2 ${pkg.popular
                    ? 'bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 hover:scale-[1.01]'
                    }`}
                >
                  Book {pkg.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Premium Design */}
        <div className="py-12 md:py-16 relative overflow-hidden text-center glass-card border border-white/5 rounded-3xl p-8 md:p-12">
          {/* Animated decorative background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Need a Custom <span className="text-gradient-primary">Media Solution?</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
              We understand that every event and brand has unique demands. Contact our media consulting team to tailor a bespoke package that matches your exact creative specifications.
            </p>

            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 transform bg-[#0c0014] rounded-full hover:scale-105 shadow-[0_0_25px_rgba(79,70,229,0.2)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
              <span className="relative flex items-center gap-3 text-base">
                Get a Free Consultation
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

export default Packages;

import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Skeleton from '../../../Global/components/Skeleton';
import OptimizedImage from '../../../Global/components/OptimizedImage';
import SEO from '../../../components/SEO';

// Lazy load non-critical components
const AIChatBot = lazy(() => import('../components/AIChatBot'));

const Home = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Fetch all data using React Query
  // Fetch all data using React Query with tuned caching
  const { data: settings } = useQuery({ 
    queryKey: ['us-settings'], 
    queryFn: () => api.get('/settings').then(res => res.data),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  const { data: articles = [] } = useQuery({ 
    queryKey: ['us-articles'], 
    queryFn: () => api.get('/articles').then(res => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const { data: heroes = [] } = useQuery({ 
    queryKey: ['us-heroes'], 
    queryFn: () => api.get('/heroes').then(res => res.data),
    staleTime: Infinity * 60 * 30, // 30 minutes
  });

  const loading = !heroes.length && !articles.length;

  useEffect(() => {
    if (heroes.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroes]);

  if (loading) {
    return (
      <div className="w-full">
        {/* Hero Skeleton */}
        <div className="h-[45vh] md:h-[80vh] min-h-[250px] md:min-h-[600px] w-full bg-white/5 animate-pulse relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014] to-transparent"></div>
          <div className="absolute bottom-16 left-8 md:bottom-24 md:left-16 space-y-6 w-full max-w-2xl px-4">
            <div className="h-12 md:h-16 bg-white/10 rounded w-full md:w-3/4"></div>
            <div className="h-6 bg-white/5 rounded w-1/2"></div>
            <div className="h-14 bg-white/10 rounded-full w-40"></div>
          </div>
        </div>

        {/* Grid Skeletons */}
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
          <div>
            <div className="h-10 bg-white/10 rounded w-64 mb-10 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <Skeleton key={i} type="article" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Derived data
  const recentArticles = articles.slice(0, 8);

  return (
    <div className="w-full">
      <SEO 
        title="USA News & US Politics | THE DAY NEWS USA" 
        description="Breaking news, US politics, business, tech, and world coverage from the United States."
        keywords="us news, american news, washington news, new york news, breaking news usa, the day news usa"
      />
      {/* 1. Hero Section (Dynamic Slider) */}
      <section className="relative h-[45vh] md:h-[80vh] min-h-[250px] md:min-h-[600px] w-full overflow-hidden bg-black">
        {heroes.length > 0 ? (
          heroes.map((hero, index) => (
            <div
              key={hero._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                } bg-black`}
            >
              <OptimizedImage
                src={hero.imageUrl}
                alt={hero.title}
                className="w-full h-full"
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "auto"}
                sizes="100vw"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014]/90 via-[#0c0014]/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0014]/80 via-[#0c0014]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto h-full flex flex-col justify-end">
                <div className="max-w-3xl space-y-3 md:space-y-4">
                  <h1 className="text-2xl md:text-6xl font-bold text-white leading-tight text-glow drop-shadow-lg">
                    {hero.title}
                  </h1>
                  {hero.subtitle && (
                    <p className="text-white text-[10px] md:text-sm font-bold uppercase tracking-widest drop-shadow-md line-clamp-2 md:line-clamp-none">
                      {hero.subtitle}
                    </p>
                  )}
                  {hero.linkUrl && (
                    <div className="pt-2 md:pt-4">
                      <Link to={hero.linkUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary-hover text-white text-sm md:text-base font-bold rounded-full transition-all hover-glow">
                        <PlayCircle size={20} className="md:w-6 md:h-6" />
                        <span>Watch Now</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-contain md:bg-cover bg-center bg-no-repeat bg-black" style={{ backgroundImage: `url('https://placehold.co/1920x1080/08000f/333?text=NZ+Regional+Portal')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014]/90 via-[#0c0014]/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0014]/80 via-[#0c0014]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto flex flex-col justify-end h-full">
              <div className="max-w-3xl space-y-4 md:space-y-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full">
                  USA
                </span>
                <h1 className="text-2xl md:text-6xl font-bold text-white leading-tight text-glow">
                  Welcome to The Day News Global - USA
                </h1>
                <p className="text-sm md:text-xl text-gray-300 line-clamp-3 md:line-clamp-none">
                  Your trusted media partner for credible, engaging, and informative news coverage across USA and beyond.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Slider Controls */}
        {heroes.length > 1 && (
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {heroes.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentHeroIndex(idx)}
                className="p-3 -m-3"
              >
                <div className={`w-3 h-3 rounded-full transition-all ${idx === currentHeroIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'}`} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 2. Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Featured Articles
          </h2>
          <Link to="/USA/articles" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold">
            View All size={16} />
          </Link>
        </div>

        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map(article => (
              <Link key={article._id} to={`/USA/articles/${article.slug}`} className="group bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-colors flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    width={400}
                    height={225}
                  />
                  {article.category && (
                    <div className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                      {article.category.name}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">{article.excerpt}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-2 mt-auto">
                    {format(new Date(article.publishDate), 'MMM dd, yyyy')} • {article.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-500 italic">No articles found. Stay tuned for new updates from USA.</p>
          </div>
        )}
      </section>

      <Suspense fallback={null}>
        <AIChatBot />
      </Suspense>
    </div>
  );
};

export default Home;

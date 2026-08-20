import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { PlayCircle, ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Skeleton from '../components/Skeleton';
import OptimizedImage from '../../../Global/components/OptimizedImage';
import SEO from '../../../components/SEO';

// Lazy load non-critical components
const AIChatBot = lazy(() => import('../components/AIChatBot'));
const PartnersSection = lazy(() => import('../components/PartnersSection'));

const Home = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Fetch all data using React Query
  const { data: settings } = useQuery({ queryKey: ['bd-settings'], queryFn: () => api.get('/settings').then(res => res.data) });
  const { data: episodes = [] } = useQuery({ queryKey: ['bd-episodes'], queryFn: () => api.get('/episodes').then(res => res.data) });
  const { data: articles = [] } = useQuery({ queryKey: ['bd-articles'], queryFn: () => api.get('/articles').then(res => res.data) });
  const { data: categories = [] } = useQuery({ queryKey: ['bd-categories'], queryFn: () => api.get('/categories').then(res => res.data) });
  const { data: programs = [] } = useQuery({ queryKey: ['bd-programs'], queryFn: () => api.get('/programs').then(res => res.data) });
  const { data: ads = [] } = useQuery({ queryKey: ['bd-ads'], queryFn: () => api.get('/ads').then(res => res.data) });
  const { data: heroes = [] } = useQuery({ queryKey: ['bd-heroes'], queryFn: () => api.get('/heroes').then(res => res.data) , staleTime: Infinity });
  const { data: partners = [] } = useQuery({ queryKey: ['bd-partners'], queryFn: () => api.get('/partners').then(res => res.data), staleTime: Infinity * 60 * 30 });

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="h-40 bg-white/5 rounded-xl animate-pulse"></div>
            <div className="h-40 bg-white/5 rounded-xl animate-pulse"></div>
          </div>
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
  const featuredProgram = programs.find(p => p.isFeatured) || programs[0];
  const featuredEpisodes = featuredProgram
    ? episodes.filter(e => e.program?._id === featuredProgram._id).slice(0, 3)
    : [];

  const getAdsByPlacement = (placement) => ads.filter(ad => ad.placement === placement);
  const homeTopAds = getAdsByPlacement('home_top');
  const homeMiddleAds = getAdsByPlacement('home_middle');

  const recentEpisodes = episodes.slice(0, 3);
  const recentArticles = articles.slice(0, 4);

  return (
    <div className="w-full">
      <SEO 
        title="Bangladesh News & Updates | THE DAY NEWS BANGLADESH" 
        description="Latest politics, business, entertainment, and video programs from Bangladesh."
        keywords="bangladesh news, dhaka news, bangladesh bd news, the day news bangladesh"
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
                fetchPriority={index === 0 ? "high" : "auto"}
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
          <div className="absolute inset-0 bg-contain md:bg-cover bg-center bg-no-repeat bg-black" style={{ backgroundImage: `url('https://placehold.co/1920x1080/08000f/333?text=Hero+Banner')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014]/90 via-[#0c0014]/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0014]/80 via-[#0c0014]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto flex flex-col justify-end h-full">
              <div className="max-w-3xl space-y-4 md:space-y-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full">
                  Featured Insight
                </span>
                <h1 className="text-2xl md:text-6xl font-bold text-white leading-tight text-glow">
                  Welcome to The Day News Global
                </h1>
                <p className="text-sm md:text-xl text-gray-300 line-clamp-3 md:line-clamp-none">
                  Watch the latest programs and read media features from around the entire world.
                </p>
                <div className="pt-2 md:pt-0">
                  <Link to={'/Bangladesh/programs'}
                    className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary-hover text-white text-sm md:text-base font-bold rounded-full transition-all hover-glow">
                    <PlayCircle size={20} className="md:w-6 md:h-6" />
                    <span>Watch Now</span>
                  </Link>
                </div>
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



      {/* 4. Recent Articles (Slot 3) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-10 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Latest News & Stories
          </h2>
          <Link to="/Bangladesh/articles" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold whitespace-nowrap">
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentArticles.map(article => (
            <Link key={article._id} to={`/Bangladesh/articles/${article.slug}`} className="group bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-colors flex flex-col h-full">
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
      </section>

      {/* 2. Top Ad Placement (Moved) */}
      {homeTopAds && homeTopAds.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className={`grid grid-cols-1 ${homeTopAds.length > 1 ? 'md:grid-cols-2' : ''} gap-8`}>
            {homeTopAds.slice(0, 2).map((ad) => (
              <a key={ad._id} href={ad.linkUrl || '#'} target="_blank" rel="noopener noreferrer" className="block w-full group">
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm shadow-2xl transition-all group-hover:border-primary/30" style={{ aspectRatio: '3/1' }}>
                  <OptimizedImage 
                    src={ad.imageUrl} 
                    alt={ad.title} 
                    className="w-full h-auto" 
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    objectFit="contain"
                    width={600}
                    height={200}
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] text-primary/80 uppercase tracking-widest border border-white/10">
                    Sponsored
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 3. Recent Episodes (Slot 4) */}
      <section className="bg-black/20 backdrop-blur-sm py-16 border-y border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Recent Releases
            </h2>
            <Link to="/Bangladesh/programs" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold whitespace-nowrap">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>

          {recentEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentEpisodes.map(episode => (
                <Link key={episode._id} to={`/Bangladesh/programs/${episode.program?.slug}`} className="group glass-card overflow-hidden block">
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage 
                      src={episode.thumbnailImage} 
                      alt={episode.title} 
                      className="w-full h-full" 
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      width={480}
                      height={270}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <PlayCircle size={48} className="text-white/80 group-hover:text-white transform group-hover:scale-110 transition-all drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{episode.program?.title}</div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">{episode.title}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Calendar size={14} /> {format(new Date(episode.publishDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <PlayCircle size={36} className="text-primary/60" />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary animate-ping opacity-40"></span>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary opacity-70"></span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Coming Soon</p>
              <h3 className="text-2xl font-bold text-white mb-3">New Releases On The Way</h3>
              <p className="text-gray-500 text-sm max-w-md">
                Fresh content is being prepared for Bangladesh. Stay tuned — our latest programs and episodes will be available here shortly.
              </p>
            </div>
          )}
        </div>
      </section>


      {/* 5. All Programs Poster Section */}
      {programs && programs.filter(p => p.posterImage).length > 0 && (
        <section className="py-16 border-y border-white/5 bg-gradient-to-b from-[#0c0014] to-[#0a0012]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end gap-4 mb-10 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Our Programs
              </h2>
              <Link to="/Bangladesh/programs" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold whitespace-nowrap">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {programs.filter(p => p.posterImage).map(prog => (
                <Link
                  key={prog._id}
                  to={`/programs/${prog.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-2 duration-500 bg-[#1a1a1a]"
                  style={{ aspectRatio: '3/4.5' }}
                >
                  <OptimizedImage
                    src={prog.posterImage}
                    alt={prog.title}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    width={300}
                    height={450}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-black text-xl md:text-2xl leading-tight drop-shadow-lg group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      Explore Program
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Middle Ad Placement */}
      {homeMiddleAds && homeMiddleAds.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeMiddleAds.slice(0, 2).map((ad) => (
              <a key={ad._id} href={ad.linkUrl || '#'} target="_blank" rel="noopener noreferrer" className="block w-full group">
                <div className="h-40 md:h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black/20 backdrop-blur-sm relative group-hover:border-primary/30 transition-all">
                  <OptimizedImage 
                    src={ad.imageUrl} 
                    alt={ad.title} 
                    className="w-full h-full" 
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={600}
                    height={200}
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] text-primary/80 uppercase tracking-widest border border-white/10">
                    Sponsored
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 7. Per-Program Latest Episodes */}
      {programs.length > 0 && episodes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
          {programs.map(prog => {
            const progEpisodes = episodes
              .filter(e => e.program?._id === prog._id)
              .slice(0, 3);
            if (progEpisodes.length === 0) return null;
            return (
              <div key={prog._id}>
                {/* Program header */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl md:text-2xl font-bold text-white">{prog.title}</h2>
                  </div>
                  <Link
                    to={`/programs/${prog.slug}`}
                    className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold whitespace-nowrap"
                  >
                    View All Episodes <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Episode cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {progEpisodes.map(episode => (
                    <div key={episode._id} className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all shadow-lg flex flex-col group">
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        <OptimizedImage
                          src={episode.thumbnailImage}
                          alt={episode.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          sizes="(max-width: 768px) 50vw, 300px"
                          width={320}
                          height={180}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <PlayCircle size={44} className="text-white/70 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-lg" />
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {episode.title}
                        </h3>
                        {episode.description && (
                          <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                            {episode.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                          <p className="text-gray-500 text-xs flex items-center gap-1">
                            <Calendar size={12} />
                            {format(new Date(episode.publishDate), 'MMM dd, yyyy')}
                          </p>
                          <Link
                            to={`/Bangladesh/programs/${prog.slug}`}
                            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1 hover-glow"
                          >
                            <PlayCircle size={13} /> View Full Episode
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}


      <Suspense fallback={<div className="h-64 bg-white/5 animate-pulse rounded-2xl mx-auto max-w-7xl mb-12"></div>}>
        <PartnersSection partners={partners} />
      </Suspense>

      <Suspense fallback={null}>
        <AIChatBot />
      </Suspense>
    </div>
  );
};

export default Home;

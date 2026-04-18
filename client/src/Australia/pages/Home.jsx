import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle, ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import AIChatBot from '../components/AIChatBot';
import Skeleton from '../../components/Skeleton';
import { cloudinaryOptimize } from '../../utils/cloudinary';
import OptimizedImage from '../../components/OptimizedImage';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    settings: null,
    recentEpisodes: [],
    recentArticles: [],
    categories: [],
    featuredProgram: null,
    featuredEpisodes: [],
    ads: [],
    heroes: [],
    allPrograms: [],
    allEpisodes: [],
  });
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (data.heroes.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % data.heroes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data.heroes]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [
          settingsRes,
          episodesRes,
          articlesRes,
          categoriesRes,
          programsRes,
          heroesRes,
        ] = await Promise.all([
          api.get('/settings'),
          api.get('/episodes'),
          api.get('/articles'),
          api.get('/categories'),
          api.get('/programs'),
          api.get('/heroes'),
        ]);

        const settings = settingsRes.data;
        const allEpisodes = Array.isArray(episodesRes.data) ? episodesRes.data : [];
        const allPrograms = Array.isArray(programsRes.data) ? programsRes.data : [];
        const articles = Array.isArray(articlesRes.data) ? articlesRes.data : [];
        const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
        const heroes = Array.isArray(heroesRes.data) ? heroesRes.data : [];

        // Extract featured program info
        const featuredProgram = allPrograms.find(p => p.isFeatured) || allPrograms[0];
        const featuredEpisodes = featuredProgram
          ? allEpisodes.filter(e => e.program?._id === featuredProgram._id).slice(0, 3)
          : [];

        setData({
          settings,
          recentEpisodes: allEpisodes.slice(0, 3), // Get latest 3 overall
          recentArticles: articles.slice(0, 4), // Get latest 4 articles
          categories,
          featuredProgram,
          featuredEpisodes,
          heroes,
          allPrograms,
          allEpisodes,
        });
      } catch (error) {
        console.error("Error loading home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        {/* Hero Skeleton */}
        <div className="h-[80vh] min-h-[600px] w-full bg-white/5 animate-pulse relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014] to-transparent"></div>
          <div className="absolute bottom-16 left-8 md:bottom-24 md:left-16 space-y-6 w-full max-w-2xl px-4">
            <div className="h-12 md:h-16 bg-white/10 rounded w-full md:w-3/4"></div>
            <div className="h-6 bg-white/5 rounded w-1/2"></div>
            <div className="h-14 bg-white/10 rounded-full w-40"></div>
          </div>
        </div>

        {/* Grid Skeletons */}
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
          {/* Ads Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="h-40 bg-white/5 rounded-xl animate-pulse"></div>
            <div className="h-40 bg-white/5 rounded-xl animate-pulse"></div>
          </div>

          {/* Articles Skeleton */}
          <div>
            <div className="h-10 bg-white/10 rounded w-64 mb-10 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <Skeleton key={i} type="article" />)}
            </div>
          </div>

          {/* Episodes Skeleton */}
          <div>
            <div className="h-10 bg-white/10 rounded w-48 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <Skeleton key={i} type="episode" />)}
            </div>
          </div>

          {/* Posters Skeleton */}
          <div>
            <div className="h-10 bg-white/10 rounded w-48 mb-10 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => <Skeleton key={i} type="poster" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 1. Hero Section (Dynamic Slider) */}
      <section className="relative h-[45vh] md:h-[80vh] min-h-[250px] md:min-h-[600px] w-full overflow-hidden bg-black">
        {data.heroes.length > 0 ? (
          data.heroes.map((hero, index) => (
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
                  Watch the latest programs and read breaking media features from around the entire world.
                </p>
                <div className="pt-2 md:pt-0">
                  <Link to={'/Australia/programs'}
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
        {data.heroes.length > 1 && (
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {data.heroes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentHeroIndex ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </section>



      {/* 4. Recent Articles (Slot 3) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Latest News & Stories
          </h2>
          <Link to="/Australia/articles" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold">
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.recentArticles.map(article => (
            <Link key={article._id} to={`/Australia/articles/${article.slug}`} className="group bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-colors flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage 
                  src={article.featuredImage} 
                  alt={article.title} 
                  className="w-full h-full" 
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
      {/* 3. Recent Episodes (Slot 4) */}
      <section className="bg-black/20 backdrop-blur-sm py-16 border-y border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Recent Releases
            </h2>
            <Link to="/Australia/programs" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm uppercase tracking-wider font-semibold">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>

          {data.recentEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.recentEpisodes.map(episode => (
                <Link key={episode._id} to={`/Australia/programs/${episode.program?.slug}`} className="group glass-card overflow-hidden block">
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage 
                      src={episode.thumbnailImage} 
                      alt={episode.title} 
                      className="w-full h-full" 
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                Fresh content is being prepared for Australia. Stay tuned — our latest programs and episodes will be available here shortly.
              </p>
            </div>
          )}
        </div>
      </section>



    </div>
  );
};

export default Home;

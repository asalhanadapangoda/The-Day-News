import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { format } from 'date-fns';
import { Search as SearchIcon, Video, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import OptimizedImage from '../../../Global/components/OptimizedImage';
import SEO from '../../../components/SEO';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: results = { articles: [], episodes: [], programs: [] }, isLoading: loading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return { articles: [], episodes: [], programs: [] };
      const [articlesRes, episodesRes, programsRes] = await Promise.all([
        api.get('/articles'),
        api.get('/episodes'),
        api.get('/programs')
      ]);
      const q = query.toLowerCase();
      return {
        articles: articlesRes.data.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)),
        episodes: episodesRes.data.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)),
        programs: programsRes.data.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      };
    },
    enabled: !!query
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const q = formData.get('q');
    if (q) setSearchParams({ q });
  };

  const totalResults = results.articles.length + results.episodes.length + results.programs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[70vh]">
      <SEO 
        title={query ? `Search: "${query}" | THE DAY NEWS BANGLADESH` : 'Search News | THE DAY NEWS BANGLADESH'}
        description={query ? `Search results for "${query}" on The Day News Bangladesh.` : 'Search for news articles and programs in Bangladesh.'}
        keywords={`search, ${query ? query + ', ' : ''}bangladesh news search, articles, the day news bangladesh`}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-6">Search Results</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search for programs, episodes, articles..."
            className="w-full bg-white/5 border border-white/20 text-white text-lg rounded-full pl-6 pr-12 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xl"
          />
          <button type="submit" className="absolute right-4 top-4 text-gray-400 hover:text-primary">
            <SearchIcon size={24} />
          </button>
        </form>
        {query && !loading && (
          <p className="text-gray-400 mt-6">
            Found <span className="text-white font-bold">{totalResults}</span> matching results for "{query}"
          </p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      )}

      {/* Results grid */}
      {!loading && query && totalResults > 0 && (
        <div className="space-y-16">
          
          {/* Programs */}
          {results.programs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                <Video className="text-primary" /> Matching Programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.programs.map((program) => (
                  <Link key={program._id} to={`/Bangladesh/programs/${program.slug}`} className="group glass-card overflow-hidden block">
                    <div className="h-40 overflow-hidden relative">
                      <OptimizedImage 
                        src={program.coverImage} 
                        className="w-full h-full" 
                        width={400} 
                        height={225}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        alt={program.title}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary">{program.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mt-2">{program.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Episodes */}
          {results.episodes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                <Video className="text-primary" /> Matching Episodes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.episodes.map(episode => (
                  <Link key={episode._id} to={`/Bangladesh/programs/${episode.program?.slug || ''}`} className="glass-card flex p-4 gap-4 hover-glow transition-all">
                    <OptimizedImage 
                      src={episode.thumbnailImage} 
                      className="w-32 h-24 rounded flex-shrink-0" 
                      width={128}
                      height={96}
                      loading="lazy"
                      alt={episode.title}
                    />
                    <div>
                      <h4 className="text-white font-bold line-clamp-1">{episode.title}</h4>
                      <p className="text-gray-400 text-sm line-clamp-2 mt-1">{episode.description}</p>
                      <p className="text-xs text-primary mt-2">{format(new Date(episode.publishDate), 'MMM dd, yyyy')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {results.articles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                <FileText className="text-primary" /> Matching Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.articles.map((article) => (
                  <Link key={article._id} to={`/Bangladesh/articles/${article.slug}`} className="glass-card block h-full hover-glow transition-all overflow-hidden flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <OptimizedImage 
                        src={article.featuredImage} 
                        className="w-full h-full" 
                        width={400}
                        height={225}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        alt={article.title}
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h4 className="text-white font-bold line-clamp-2 mb-2">{article.title}</h4>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && query && totalResults === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchIcon size={40} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Results Found</h2>
          <p className="text-gray-400">We couldn't find any matches for "{query}". Try checking your spelling or using more general terms.</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-20 text-gray-500">
          Enter a search term above to find content across our entire platform.
        </div>
      )}
    </div>
  );
};

export default Search;

import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search as SearchIcon, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import OptimizedImage from '../../components/OptimizedImage';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: results = { articles: [] }, isLoading: loading } = useQuery({
    queryKey: ['nz-search', query],
    queryFn: async () => {
      if (!query) return { articles: [] };
      const articlesRes = await api.get('/articles');
      const q = query.toLowerCase();
      return {
        articles: articlesRes.data.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)),
      };
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const q = formData.get('q');
    if (q) setSearchParams({ q });
  };

  const totalResults = results.articles.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-6">Search Results</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search for articles..."
            className="w-full bg-white/5 border border-white/20 text-white text-lg rounded-full pl-6 pr-12 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xl"
          />
          <button type="submit" className="absolute right-4 top-4 text-gray-400 hover:text-primary">
            <SearchIcon size={24} />
          </button>
        </form>
        {query && !loading && (
          <p className="text-gray-400 mt-6">
            Found <span className="text-white font-bold">{totalResults}</span> matching articles for "{query}"
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
          {/* Articles */}
          {results.articles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                <FileText className="text-primary" /> Matching Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.articles.map((article) => (
                  <Link key={article._id} to={`/NewZealand/articles/${article.slug}`} className="glass-card block h-full hover-glow transition-all overflow-hidden flex flex-col">
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
          <p className="text-gray-400">We couldn't find any articles matching "{query}". Try checking your spelling or using more general terms.</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-20 text-gray-500">
          Enter a search term above to find content in the New Zealand region.
        </div>
      )}
    </div>
  );
};

export default Search;

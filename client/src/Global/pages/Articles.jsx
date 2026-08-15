import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { format } from 'date-fns';
import Skeleton from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/SEO';

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data: categories = [] } = useQuery({ 
    queryKey: ['categories'], 
    queryFn: () => api.get('/categories').then(res => res.data) 
  });

  const { data, isLoading: loading } = useQuery({ 
    queryKey: ['articles', currentCategory, page], 
    queryFn: () => {
      const url = currentCategory 
        ? `/articles?category=${currentCategory}&page=${page}&limit=12` 
        : `/articles?page=${page}&limit=12`;
      return api.get(url).then(res => ({
        articles: res.data,
        totalPages: parseInt(res.headers['x-total-pages'], 10) || 1,
      }));
    }
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handleCategoryChange = (slug) => {
    if (slug) {
      setSearchParams({ category: slug, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  };

  const handlePageChange = (newPage) => {
    const params = { page: newPage };
    if (currentCategory) params.category = currentCategory;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedCategoryObj = categories.find(c => c.slug === currentCategory);
  const pageTitle = selectedCategoryObj ? `${selectedCategoryObj.name} Articles` : 'Latest News Articles';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <SEO 
        title={pageTitle}
        description={`Explore the latest ${selectedCategoryObj ? selectedCategoryObj.name.toLowerCase() : 'global'} news articles, breaking stories, and in-depth reports.`}
        keywords={`articles, news, ${selectedCategoryObj ? selectedCategoryObj.name.toLowerCase() + ', ' : ''}breaking news, global news, journalism`}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 text-glow transition-all duration-300">Latest Articles</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          In-depth analysis, breaking news, and featured stories from our global correspondents.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${
            currentCategory === '' 
              ? 'bg-primary border-primary text-white' 
              : 'bg-transparent border-white/20 text-gray-300 hover:border-primary hover:text-white'
          }`}
        >
          All News
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${
              currentCategory === cat.slug 
                ? 'bg-primary border-primary text-white' 
                : 'bg-transparent border-white/20 text-gray-300 hover:border-primary hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} type="article" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/10">
          No articles found for this category.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <Link key={article._id} to={`/articles/${article.slug}`} className="group glass-card overflow-hidden block flex flex-col h-full hover-glow">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage 
                    src={article.featuredImage} 
                    alt={article.title} 
                    className="w-full h-full" 
                    loading="lazy"
                    width={400}
                    height={225}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {article.category && (
                    <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                      {article.category.name}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2 flex justify-between items-center">
                    <span>{format(new Date(article.publishDate), 'MMM dd, yyyy')}</span>
                    {article.country && (
                      <span className="text-gray-500 uppercase tracking-tighter">{article.country}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h2>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">{article.excerpt}</p>
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider mt-auto group-hover:text-white transition-colors">
                    Read Article →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span>
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Articles;

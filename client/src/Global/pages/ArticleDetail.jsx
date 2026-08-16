import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Calendar, User, Facebook, Linkedin, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../../components/SEO';

const ArticleDetail = () => {
  const { slug } = useParams();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Main Article Query
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => api.get(`/articles/${slug}`).then(res => res.data),
  });

  // Related Articles Query (depends on article category)
  const { data: relatedArticles = [] } = useQuery({
    queryKey: ['related-articles', article?.category?.slug],
    queryFn: () => api.get(`/articles?category=${article.category.slug}`).then(res => {
      const data = res.data;
      return data.filter(a => a._id !== article._id).slice(0, 3);
    }),
    enabled: !!article?.category?.slug,
  });
  
  const handleShare = async () => {
    if (!article) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.title,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err.message);
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20 text-white min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Article Not Found</h2>
        <Link to="/articles" className="text-primary hover:underline">Return to Articles</Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <SEO 
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.excerpt || (article.content ? article.content.replace(/<[^>]+>/g, '').slice(0, 160) : '')}
        keywords={article.metaKeywords || `news, ${article.category?.name || 'article'}, ${article.country || 'world'}, breaking news`}
        ogTitle={article.metaTitle || article.title}
        ogDescription={article.metaDescription || article.excerpt}
        ogImage={article.metaImage || article.featuredImage}
        ogType="article"
        author={article.author?.name || 'The Day News Team'}
      />
      {/* Header Banner */}
      <div className="w-full relative min-h-[40vh] md:min-h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={article.featuredImage} 
            alt={article.title} 
            className="w-full h-full" 
            loading="eager" 
            fetchPriority="high"
            width={1920}
            height={1080}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014] via-[#0c0014]/80 to-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full pb-10">
          {article.category && (
            <Link to={`/articles?category=${article.category.slug}`} className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-6 hover:bg-white hover:text-primary transition-colors">
              {article.category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-gray-300 mb-8 border-l-4 border-primary pl-4">{article.excerpt}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-mono">
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              <span className="text-white">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span>{format(new Date(article.publishDate), 'MMMM dd, yyyy')}</span>
            </div>
            {article.country && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">|</span>
                <span className="text-gray-400 tracking-wider uppercase">{article.country}</span>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12">
        {/* Article Body */}
        <div className="bg-transparent">
          {/* Mobile Share */}
          <div className="flex gap-3 mb-8 pb-8 border-b border-white/10">
            <span className="text-sm text-gray-400 font-bold uppercase flex items-center mr-2">Share:</span>
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              title="Share or Copy Link"
            >
              <Share2 size={18} />
            </button>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <article 
            className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed
              prose-headings:text-white prose-headings:font-bold 
              prose-a:text-primary prose-a:no-underline hover:prose-a:text-white hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:w-full
              prose-blockquote:border-primary prose-blockquote:bg-white/5 border-white/10 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-200"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 font-bold uppercase mt-1 mr-2">Tags:</span>
              {article.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="bg-[#121212] py-16 mt-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Related Content
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <Link key={rel._id} to={`/articles/${rel.slug}`} className="group glass-card overflow-hidden block hover-glow flex flex-col h-full">
                  <div className="relative h-40 overflow-hidden">
                    <OptimizedImage 
                      src={rel.featuredImage} 
                      alt={rel.title} 
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                      width={600}
                      height={340}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">{rel.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 flex-grow">{rel.excerpt}</p>
                    <p className="text-gray-500 text-xs mt-4">
                      {format(new Date(rel.publishDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;

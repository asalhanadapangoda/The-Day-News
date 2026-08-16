import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle } from 'lucide-react';
import Skeleton from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../components/SEO';

const Programs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading: loading } = useQuery({
    queryKey: ['programs', page],
    queryFn: () => api.get(`/programs?page=${page}&limit=12`).then(res => ({
      programs: res.data,
      totalPages: parseInt(res.headers['x-total-pages'], 10) || 1,
    }))
  });

  const programs = data?.programs || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
        <SEO title="Featured Programs | THE DAY NEWS" description="Explore video programs and specialized media broadcasting from The Day News." />
        <div className="text-center mb-16 opacity-50">
          <div className="h-10 bg-white/10 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-white/5 rounded-lg w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} type="program" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <SEO 
        title="Featured Programs | THE DAY NEWS" 
        description="Explore our wide range of award-winning video journalism, special broadcasts, and media programs."
        keywords="programs, video news, shows, episodes, broadcasts, journalism, media"
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4 text-glow">All Programs</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of award-winning journalism and specialized media broadcasting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <Link 
            key={program._id} 
            to={`/programs/${program.slug}`} 
            className="group relative h-72 rounded-2xl overflow-hidden block shadow-2xl border border-white/5 hover:border-primary/50 transition-all duration-500"
          >
            {/* Background Image */}
            <OptimizedImage 
              src={program.coverImage} 
              alt={program.title} 
              className="w-full h-full" 
              loading="lazy"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight drop-shadow-lg">
                  {program.title}
                </h2>
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mt-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <PlayCircle size={14} /> View Episodes
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No programs found. Check back later!
        </div>
      )}

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
    </div>
  );
};

export default Programs;

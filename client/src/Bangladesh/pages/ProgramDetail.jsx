import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import OptimizedImage from '../../components/OptimizedImage';

const ProgramDetail = () => {
  const { slug } = useParams();
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: program, isLoading: programLoading } = useQuery({
    queryKey: ['program', slug],
    queryFn: () => api.get(`/programs/${slug}`).then(res => res.data)
  });

  const { data: episodes = [], isLoading: episodesLoading } = useQuery({
    queryKey: ['episodes', program?._id],
    queryFn: () => api.get(`/episodes?program=${program._id}`).then(res => res.data),
    enabled: !!program?._id
  });

  const loading = programLoading || (!!program?._id && episodesLoading);
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center py-20 text-white min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Program Not Found</h2>
        <Link to="/Bangladesh/programs" className="text-primary hover:underline">Return to Programs</Link>
      </div>
    );
  }

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const openEpisode = (episode) => {
    setPlayingEpisode(episode);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full pb-20">
      {/* Dynamic Header */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <OptimizedImage 
          src={program.coverImage} 
          className="absolute inset-0 w-full h-full object-cover object-top" 
          alt={program.title} 
          loading="eager" 
          fetchpriority="high" 
          width={1920}
          height={600}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014] via-[#0c0014]/60 to-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto flex items-end gap-6">
          <div className="pb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{program.title}</h1>
            <p className="text-gray-300 max-w-3xl text-lg">{program.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span> All Episodes
        </h3>
        
        {episodes.length === 0 ? (
          <p className="text-gray-500">No episodes available for this program yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map(episode => (
              <div 
                key={episode._id} 
                onClick={() => openEpisode(episode)}
                className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group flex flex-col h-full shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={episode.thumbnailImage} 
                    className="w-full h-full" 
                    alt={episode.title} 
                    loading="lazy" 
                    width={480}
                    height={270}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    <PlayCircle size={48} className="text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">{episode.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">{episode.description}</p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/> {format(new Date(episode.publishDate), 'MMM dd, yyyy')}</span>
                    <button className="text-primary font-bold hover:underline">WATCH NOW</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isModalOpen && playingEpisode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-5xl bg-[#0c0014] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-[#0c0014] to-[#1a1a1a]">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white line-clamp-1">{playingEpisode.title}</h2>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                   <span className="text-primary font-bold">{program.title}</span>
                   <span>•</span>
                   <span>{format(new Date(playingEpisode.publishDate), 'MMM dd, yyyy')}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 ml-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="aspect-video bg-black relative">
              {playingEpisode.videoUrl.includes('youtube') || playingEpisode.videoUrl.includes('youtu.be') ? (
                <iframe 
                  src={getEmbedUrl(playingEpisode.videoUrl)} 
                  className="w-full h-full absolute inset-0"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <video src={playingEpisode.videoUrl} controls autoPlay className="w-full h-full absolute inset-0 bg-black"></video>
              )}
            </div>
            
            <div className="p-6 md:p-8 bg-gradient-to-b from-[#1a1a1a] to-[#0c0014] max-h-[150px] overflow-hidden">
              <p className="text-gray-300 leading-relaxed italic border-l-2 border-primary pl-4">{playingEpisode.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramDetail;

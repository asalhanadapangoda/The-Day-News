import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Calendar, MapPin, PlayCircle, X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await api.get(`/events/${slug}`);
        setEvent(data);
      } catch (error) {
        console.error("Error loading event details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [slug]);

  // Hero Rotation (Every 5 seconds)
  useEffect(() => {
    if (event?.heroImages?.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % event.heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [event]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // 1. Check for YouTube formats
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const ytMatch = url.match(youtubeRegex);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&showinfo=0&autoplay=0`;
    }

    // 2. Check for Facebook formats
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
      // Use the Facebook Video Plugin URL format
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=auto`;
    }
    
    // Return original if it's already an embed link or other format
    return url;
  };

  const openLightbox = (index) => {
    setCurrentGalleryIndex(index);
    setIsLightboxOpen(true);
  };

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % event.galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + event.galleryImages.length) % event.galleryImages.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20 text-white min-h-[60vh] flex flex-col justify-center items-center px-4">
        <h2 className="text-4xl font-bold mb-4">Event Not Found</h2>
        <Link to="/Bangladesh/events" className="text-primary hover:underline uppercase tracking-widest text-sm font-bold">Return to Events</Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 bg-gradient-to-b from-[#0c0014] to-[#121212]">
      {/* 1. Hero Section (3-Image Rotation) */}
      <section className="relative w-full h-[60vh] md:h-[85vh] min-h-[400px] overflow-hidden bg-black">
        {event.heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img src={image} className="w-full h-full object-cover object-center" alt={`${event.title} - Hero ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        
        {/* Hero Overlay Content */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0c0014] via-black/20 to-transparent"></div>
        <div className="absolute inset-0 z-30 flex items-end">
          <div className="max-w-7xl mx-auto px-6 w-full pb-12 md:pb-20">
             <div className="max-w-3xl animate-in slide-in-from-bottom duration-700">
                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 shadow-lg active:scale-95 transition-transform">Global Events Excellence</span>
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-4">{event.title}</h1>
                <p className="text-gray-300 text-sm md:text-xl font-medium line-clamp-3 mb-8 italic border-l-2 border-primary pl-4 py-1 leading-relaxed">{event.tagline}</p>
                
                <div className="flex flex-wrap gap-6 text-white text-xs md:text-sm font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md p-4 rounded-xl w-fit border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-2">
                       <Calendar size={18} className="text-primary" />
                       <span>{format(new Date(event.eventDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin size={18} className="text-primary" />
                       <span>{event.location}</span>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-10 right-10 z-40 flex gap-2">
           {event.heroImages.map((_, idx) => (
             <button 
               key={idx} 
               onClick={() => setCurrentHeroIndex(idx)}
               className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/60'}`}
             />
           ))}
        </div>
      </section>

      {/* 2. Highlight Reel Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 gap-4">
           <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-4">
                 <span className="w-2 h-10 bg-primary rounded-full"></span>
                 Highlight Reel
              </h2>
              <p className="text-gray-400 mt-2 text-sm italic">Experience the powerful moments and insights from the event.</p>
           </div>
        </div>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-card shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10 group flex items-center justify-center bg-white/5">
           {event.videoUrl ? (
              <iframe 
                 src={getEmbedUrl(event.videoUrl)} 
                 className="w-full h-full absolute inset-0"
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
                 title="Highlight Reel Video"
              ></iframe>
           ) : (
              <div className="text-center p-10 animate-pulse">
                 <PlayCircle size={64} className="text-primary/30 mx-auto mb-4" />
                 <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest italic">Coming Soon</h3>
                 <p className="text-gray-500 text-sm mt-2 font-medium">The highlight video for this event is currently being processed.</p>
              </div>
           )}
        </div>
      </section>

      {/* 3. Photo Gallery Section */}
      <section className="bg-white/5 backdrop-blur-sm py-20 md:py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
              <h2 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-4">
                 <span className="w-2 h-10 bg-primary rounded-full"></span>
                 Event Gallery
              </h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.galleryImages.map((image, index) => (
                 <div 
                   key={index} 
                   onClick={() => openLightbox(index)}
                   className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg border border-white/5 hover:border-primary/50 transition-all duration-500"
                 >
                    <img src={image} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700" alt={`Gallery ${index + 1}`} loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                       <div className="bg-primary/80 backdrop-blur-md p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <ImageIcon size={24} />
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           <div className="mt-16 flex flex-wrap justify-center gap-6">
              {event.albumUrl ? (
                <a 
                  href={event.albumUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:gap-5 shadow-2xl"
                >
                   View All Photos <ArrowRight size={20} />
                </a>
              ) : (
                <button 
                  onClick={() => openLightbox(0)}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:gap-5 shadow-2xl"
                >
                   View All Photos <ArrowRight size={20} />
                </button>
              )}
           </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12 animate-in fade-in duration-300">
           <button 
             onClick={() => setIsLightboxOpen(false)}
             className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-primary transition-colors rounded-full text-white"
           >
              <X size={32} />
           </button>
           
           <button 
             onClick={prevGalleryImage}
             className="absolute left-4 z-[110] p-4 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
           >
             <ChevronLeft size={48} />
           </button>

           <div className="relative w-full max-w-6xl aspect-auto max-h-[85vh] flex items-center justify-center">
              <img 
                src={event.galleryImages[currentGalleryIndex]} 
                className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-500" 
                alt="Lightbox Full-screen" 
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                 <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-xs">
                    {currentGalleryIndex + 1} / {event.galleryImages.length}
                 </p>
              </div>
           </div>

           <button 
             onClick={nextGalleryImage}
             className="absolute right-4 z-[110] p-4 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
           >
             <ChevronRight size={48} />
           </button>
        </div>
      )}
    </div>
  );
};

export default EventDetail;

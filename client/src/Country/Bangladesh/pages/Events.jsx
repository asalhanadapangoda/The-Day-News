import { Link } from 'react-router-dom';
import api from '../services/api';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Skeleton from '../components/Skeleton';
import OptimizedImage from '../../../Global/components/OptimizedImage';
import { useQuery } from '@tanstack/react-query';
import SEO from '../../../components/SEO';

const Events = () => {
  const { data: events = [], isLoading: loading } = useQuery({
    queryKey: ['events'],
    queryFn: () => api.get('/events').then(res => res.data)
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
        <SEO title="Events | THE DAY NEWS BANGLADESH" description="Explore upcoming news forums and media events in Bangladesh." />
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
        title="Events & Summits | THE DAY NEWS BANGLADESH" 
        description="Join us at major forums, summits, and media celebrations in Bangladesh."
        keywords="bangladesh events, summits, media conferences, celebrations, the day news bangladesh"
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4 text-glow">Global Events</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join us at our major international forums, summits, and media celebrations around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            key={event._id} 
            to={`/Bangladesh/events/${event.slug}`} 
            className="group glass-card overflow-hidden block flex flex-col h-full border-white/5 hover:border-primary/40"
          >
            <div className="relative h-64 overflow-hidden">
              <OptimizedImage 
                src={event.heroImages[0]} 
                alt={event.title} 
                className="w-full h-full" 
                loading="lazy"
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0014] via-transparent to-transparent"></div>

            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">{event.tagline}</p>
              
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Calendar size={14} className="text-primary" />
                  <span>{format(new Date(event.eventDate), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <MapPin size={14} className="text-primary" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-primary text-[11px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Event Details <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No events found. Check back later!
        </div>
      )}
    </div>
  );
};

export default Events;

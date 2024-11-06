import React, { useEffect, useState } from 'react';
import { X, Star, Clock, Calendar, Tv, Film } from 'lucide-react';
import { TMDBMovie, TMDBTVShow, MediaType, tmdb } from '../services/tmdb';

interface MediaDetailProps {
  item: TMDBMovie | TMDBTVShow;
  type: MediaType;
  onClose: () => void;
}

export function MediaDetail({ item: initialItem, type, onClose }: MediaDetailProps) {
  const [item, setItem] = useState(initialItem);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await tmdb.getDetails(type, initialItem.id);
        setItem(details);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [initialItem.id, type]);

  const title = type === 'movie' ? (item as TMDBMovie).title : (item as TMDBTVShow).name;
  const date = type === 'movie' ? (item as TMDBMovie).release_date : (item as TMDBTVShow).first_air_date;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-2xl max-w-2xl mx-auto overflow-hidden animate-slideUp border border-gray-700/50">
        <div className="relative h-64 sm:h-96">
          <img 
            src={tmdb.getImageUrl(item.backdrop_path || item.poster_path, 'original')}
            alt={title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <div className="flex items-center gap-2 mb-2">
              {type === 'movie' ? (
                <Film className="w-5 h-5 text-indigo-400" />
              ) : (
                <Tv className="w-5 h-5 text-indigo-400" />
              )}
              <span className="text-indigo-400 font-medium">
                {type === 'movie' ? 'Película' : 'Serie'}
              </span>
            </div>
            <h2 className="text-white font-bold text-2xl">{title}</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-6 mb-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{item.vote_average.toFixed(1)}</span>
            </div>
            {type === 'movie' && (item as TMDBMovie).runtime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{Math.floor((item as TMDBMovie).runtime! / 60)}h {(item as TMDBMovie).runtime! % 60}min</span>
              </div>
            )}
            {type === 'tv' && (
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5" />
                <span>{(item as TMDBTVShow).number_of_seasons} temporadas</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(date).toLocaleDateString('es-ES')}</span>
            </div>
          </div>

          {item.genres && (
            <div className="mb-4 flex flex-wrap gap-2">
              {item.genres.map((genre) => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm border border-gray-600"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-300 leading-relaxed">{item.overview}</p>
        </div>
      </div>
    </div>
  );
}
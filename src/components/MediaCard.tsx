import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { TMDBMovie, TMDBTVShow, MediaType, tmdb } from '../services/tmdb';

interface MediaCardProps {
  item: TMDBMovie | TMDBTVShow;
  type: MediaType;
  onClick: (item: TMDBMovie | TMDBTVShow) => void;
}

export function MediaCard({ item, type, onClick }: MediaCardProps) {
  const title = type === 'movie' ? (item as TMDBMovie).title : (item as TMDBTVShow).name;
  const date = type === 'movie' ? (item as TMDBMovie).release_date : (item as TMDBTVShow).first_air_date;

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-gray-700/50"
      onClick={() => onClick(item)}
    >
      <div className="relative h-64 sm:h-80">
        <img 
          src={tmdb.getImageUrl(item.poster_path)}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <h3 className="text-white font-bold text-lg line-clamp-1">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-2 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{item.vote_average.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(date).toLocaleDateString('es-ES')}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{item.overview}</p>
      </div>
    </div>
  );
}
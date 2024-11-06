import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { TMDBMovie } from '../services/tmdb';
import { tmdb } from '../services/tmdb';

interface MovieCardProps {
  movie: TMDBMovie;
  onClick: (movie: TMDBMovie) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-gray-700/50"
      onClick={() => onClick(movie)}
    >
      <div className="relative h-64 sm:h-80">
        <img 
          src={tmdb.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <h3 className="text-white font-bold text-lg line-clamp-1">{movie.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-2 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(movie.release_date).toLocaleDateString('es-ES')}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );
}
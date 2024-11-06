import React, { useEffect, useState } from 'react';
import { X, Star, Clock, Calendar } from 'lucide-react';
import { TMDBMovie, tmdb } from '../services/tmdb';

interface MovieDetailProps {
  movie: TMDBMovie;
  onClose: () => void;
}

export function MovieDetail({ movie: initialMovie, onClose }: MovieDetailProps) {
  const [movie, setMovie] = useState(initialMovie);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await tmdb.getMovieDetails(initialMovie.id);
        setMovie(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [initialMovie.id]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-2xl max-w-2xl mx-auto overflow-hidden animate-slideUp border border-gray-700/50">
        <div className="relative h-64 sm:h-96">
          <img 
            src={tmdb.getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <h2 className="text-white font-bold text-2xl">{movie.title}</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-6 mb-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
            </div>
            {movie.runtime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(movie.release_date).toLocaleDateString('es-ES')}</span>
            </div>
          </div>

          {movie.genres && (
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm border border-gray-600"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
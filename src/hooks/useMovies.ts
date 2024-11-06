import { useState, useEffect } from 'react';
import { tmdb, TMDBMovie } from '../services/tmdb';

export function useMovies() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await tmdb.getNowPlaying(page);
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError('Error al cargar las películas');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { movies, loading, error, hasMore, loadMore };
}
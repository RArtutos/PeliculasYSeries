import { useState, useEffect } from 'react';
import { tmdb, TMDBMovie, TMDBTVShow, MediaType } from '../services/tmdb';

export function useMedia(type: MediaType) {
  const [items, setItems] = useState<(TMDBMovie | TMDBTVShow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [type]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await tmdb.getNowPlaying(type, page);
        if (page === 1) {
          setItems(data.results);
        } else {
          setItems(prev => [...prev, ...data.results]);
        }
        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError(`Error al cargar ${type === 'movie' ? 'las películas' : 'las series'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { items, loading, error, hasMore, loadMore };
}
import React, { useState } from 'react';
import { Search, Film, Tv } from 'lucide-react';
import { TMDBMovie, TMDBTVShow, MediaType } from './services/tmdb';
import { MediaCard } from './components/MediaCard';
import { MediaDetail } from './components/MediaDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useMedia } from './hooks/useMedia';

export default function App() {
  const [search, setSearch] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [selectedItem, setSelectedItem] = useState<TMDBMovie | TMDBTVShow | null>(null);
  const { items, loading, error, hasMore, loadMore } = useMedia(mediaType);

  const getTitle = (item: TMDBMovie | TMDBTVShow) => {
    return mediaType === 'movie' ? (item as TMDBMovie).title : (item as TMDBTVShow).name;
  };

  const filteredItems = items.filter(item => {
    const title = getTitle(item);
    return (
      title?.toLowerCase().includes(search.toLowerCase()) ||
      item.overview?.toLowerCase().includes(search.toLowerCase()) ||
      ''
    );
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-indigo-400" />
              <h1 className="text-2xl font-bold text-white">CineApp</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMediaType('movie')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  mediaType === 'movie'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Film className="w-5 h-5" />
                <span className="hidden sm:inline">Películas</span>
              </button>
              <button
                onClick={() => setMediaType('tv')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  mediaType === 'tv'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Tv className="w-5 h-5" />
                <span className="hidden sm:inline">Series</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Buscar ${mediaType === 'movie' ? 'películas' : 'series'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  type={mediaType}
                  onClick={setSelectedItem}
                />
              ))}
            </div>

            {loading && <LoadingSpinner />}

            {!loading && filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No se encontraron {mediaType === 'movie' ? 'películas' : 'series'}
                </p>
              </div>
            )}

            {hasMore && !loading && filteredItems.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Cargar más {mediaType === 'movie' ? 'películas' : 'series'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Media Detail Modal */}
      {selectedItem && (
        <MediaDetail
          item={selectedItem}
          type={mediaType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
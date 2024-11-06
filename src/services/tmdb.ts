import axios from 'axios';

const TMDB_API_KEY = 'f29ed2e5713682f185568e22e8e2b0ae';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBCommon {
  id: number;
  overview: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string; }[];
}

export interface TMDBMovie extends TMDBCommon {
  title: string;
  release_date: string;
  runtime?: number;
}

export interface TMDBTVShow extends TMDBCommon {
  name: string;
  first_air_date: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export type MediaType = 'movie' | 'tv';

export const tmdb = {
  async getNowPlaying(type: MediaType, page = 1) {
    const endpoint = type === 'movie' ? 'now_playing' : 'on_the_air';
    const response = await axios.get(`${BASE_URL}/${type}/${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES',
        page,
        region: 'ES'
      }
    });
    return response.data;
  },

  async getDetails(type: MediaType, id: number) {
    const response = await axios.get(`${BASE_URL}/${type}/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES'
      }
    });
    return response.data;
  },

  getImageUrl(path: string, size: 'w500' | 'original' = 'w500') {
    return path ? `${IMAGE_BASE_URL}/${size}${path}` : '';
  }
};
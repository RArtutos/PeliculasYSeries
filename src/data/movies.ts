export interface Movie {
  id: string;
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
  duration: string;
  genres: string[];
  image: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Beyond the Horizon",
    overview: "A groundbreaking sci-fi epic about humanity's first interstellar mission to find a new home.",
    releaseDate: "2024-03-15",
    rating: 4.8,
    duration: "2h 35m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800"
  },
  {
    id: "2",
    title: "Urban Legends",
    overview: "A thrilling mystery that unfolds in the heart of a metropolis as ancient myths come to life.",
    releaseDate: "2024-03-10",
    rating: 4.5,
    duration: "2h 15m",
    genres: ["Mystery", "Thriller", "Fantasy"],
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800"
  },
  {
    id: "3",
    title: "The Last Canvas",
    overview: "An artist's journey through time as her paintings become portals to different eras.",
    releaseDate: "2024-03-05",
    rating: 4.7,
    duration: "2h 20m",
    genres: ["Drama", "Fantasy", "Romance"],
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800"
  }
  // Adding more movies would make this response too long
];
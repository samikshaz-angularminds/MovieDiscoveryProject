import axios from 'axios';
import { TMDB_API_KEY } from '@env';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      page,
      language: 'en-US',
      region: 'IN',
    },
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
      page,
      language: 'en-US',
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const [details, credits, reviews] = await Promise.all([
    axios.get(`${BASE_URL}/movie/${movieId}`, { params: { api_key: TMDB_API_KEY } }),
    axios.get(`${BASE_URL}/movie/${movieId}/credits`, { params: { api_key: TMDB_API_KEY } }),
    axios.get(`${BASE_URL}/movie/${movieId}/reviews`, { params: { api_key: TMDB_API_KEY } }),
  ]);
  return { details: details.data, credits: credits.data, reviews: reviews.data };
};

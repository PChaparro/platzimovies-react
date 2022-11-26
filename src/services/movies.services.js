import axios from 'axios';
import { CONFIG } from '../config/config';

export const GetTrendingsService = async (page) => {
  try {
    const reply = await axios.get(
      `${CONFIG.API_BASE}/trending/movie/week?api_key=${CONFIG.API_KEY}&page=${page}`,
    );
    return { success: true, movies: reply.data.results };
  } catch {
    return { success: false, movies: [] };
  }
};

export const GetCategoriesService = async () => {
  try {
    const reply = await axios.get(`${CONFIG.API_BASE}/genre/movie/list?api_key=${CONFIG.API_KEY}`);
    const genres = reply.data.genres;
    return { success: true, genres };
  } catch {
    return { success: false, genres: [] };
  }
};

export const GetGenreService = async (genre, page) => {
  try {
    const reply = await axios.get(
      `${CONFIG.API_BASE}/discover/movie?api_key=${CONFIG.API_KEY}&with_genres=${genre}&page=${page}`,
    );

    return { success: true, movies: reply.data.results };
  } catch {
    return { success: false, movies: [] };
  }
};

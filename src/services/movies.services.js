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
  return ['Action', 'Adventure', 'Romance', 'Musical', 'Comedy', 'Drama'];
};

import { useEffect } from 'react';

import { HomeHero } from '../../components/HomeHero/HomeHero';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';

import { GetTrendingsService } from '../../services/movies.services';
import { useState } from 'react';

export const Home = () => {
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    // Trending movies
    const getTrendings = async () => {
      const reply = await GetTrendingsService(1);
      setTrendings(reply.movies);
    };

    getTrendings();
  }, []);

  return (
    <>
      <HomeHero />
      <SearchBar />
      <section>{<MoviesGrid movies={trendings} />}</section>
    </>
  );
};

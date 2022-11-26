import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { GetGenreService } from '../../services/movies.services';

import Styles from './CategoryPage.module.css';

export const CategoryPage = () => {
  const location = useLocation();

  const { id } = useParams();
  const { name, color } = location.state;

  const [movies, setMovies] = useState([]);

  console.log(location);

  // Get movies on load
  useEffect(() => {
    const getMovies = async () => {
      const movies = await GetGenreService(id, 1);
      setMovies(movies.movies);
    };

    getMovies();
  }, []);

  return (
    <main>
      <header
        className={Styles.category__header}
        style={{ background: `linear-gradient(to bottom, ${color}, transparent` }}
      ></header>
      <div className={`${Styles.category__title} container`}>
        <div className={Styles.category__color} style={{ backgroundColor: color }}></div>
        <h1 className={'section__title'}>{name}</h1>
      </div>
      <MoviesGrid movies={movies} />
    </main>
  );
};

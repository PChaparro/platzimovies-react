import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { GetGenreService } from '../../services/movies.services';

import Styles from './CategoryPage.module.css';

export const CategoryPage = () => {
  const location = useLocation();

  const { id } = useParams();
  const { name, color } = location.state;

  // Last element for intersection observer
  const [last, setLast] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get movies on load
  useEffect(() => {
    const getMovies = async () => {
      const movies = await GetGenreService(id, currentPage);
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

      <MoviesGrid isSlider={false}>
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={`${movie.id}-${id}-${index}`}
              movie={movie}
              lazy={index >= 3 ? true : false}
              isSlider={false}
            />
          );
        })}
      </MoviesGrid>
    </main>
  );
};

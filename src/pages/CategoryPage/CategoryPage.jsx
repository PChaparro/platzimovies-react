// Components
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { GetGenreService } from '../../services/movies.services';

// Hooks
import { useObserver } from '../../hooks/useObserver';
import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Styles from './CategoryPage.module.css';

export const CategoryPage = () => {
  const location = useLocation();

  const { id } = useParams();
  const { name, color } = location.state;

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lastElement = useRef(null);

  // Function to get a new movies page
  const fetch = async () => {
    const page = await GetGenreService(id, currentPage);
    setMovies([...movies, ...page.movies]);
    setCurrentPage(currentPage + 1);
  };

  const { observe } = useObserver(fetch);

  // Get movies on load
  useEffect(() => {
    const getMovies = async () => {
      await fetch();
    };

    getMovies();
  }, []);

  useEffect(() => {
    if (lastElement.current) {
      // Change the observed element
      observe(lastElement.current);
    }
  }, [movies]);

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
              ref={index === movies.length - 1 ? lastElement : null}
            />
          );
        })}
      </MoviesGrid>
    </main>
  );
};

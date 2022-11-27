import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { GetGenreService } from '../../services/movies.services';

import { useObserver } from '../../hooks/useObserver';
import Styles from './CategoryPage.module.css';

export const CategoryPage = () => {
  const location = useLocation();

  const { id } = useParams();
  const { name, color } = location.state;

  // Last element for intersection observer
  const lastElement = useRef(null);

  const intersectedCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      const { isIntersecting } = entry;
      if (isIntersecting) {
        const page = await GetGenreService(id, currentPage);
        // console.table(page.movies);
        setMovies([...movies, ...page.movies]);
        setCurrentPage(currentPage + 1);
      }
    });
  };
  const { observe } = useObserver(intersectedCallback);

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get movies on load
  useEffect(() => {
    const getMovies = async () => {
      const movies = await GetGenreService(id, currentPage);
      setMovies(movies.movies);
      setCurrentPage(currentPage + 1);
    };

    getMovies();
  }, []);

  useEffect(() => {
    if (lastElement.current) {
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

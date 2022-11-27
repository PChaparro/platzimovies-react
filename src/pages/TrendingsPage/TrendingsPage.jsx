// Components
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';

// Services
import { GetTrendingsService } from '../../services/movies.services';

// Hooks
import { useObserver } from '../../hooks/useObserver';
import { useEffect, useState, useRef } from 'react';

export const TrendingsPage = () => {
  // States
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lastElement = useRef(null);

  // Function to get a new movies page
  const fetch = async () => {
    const page = await GetTrendingsService(currentPage);
    setMovies([...movies, ...page.movies]);
    setCurrentPage(currentPage + 1);
  };

  const { observe } = useObserver(fetch);

  // Get movies on load
  useEffect(() => {
    fetch();
  }, []);

  // Change the observed element
  useEffect(() => {
    if (lastElement.current) {
      observe(lastElement.current);
    }
  }, [movies]);

  return (
    <main className='section container'>
      <h1 className='section__title'>Trending movies</h1>
      <MoviesGrid isSlider={false}>
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={`${movie.id}-treding-${index}`}
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

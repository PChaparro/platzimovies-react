import { SearchMoviesService } from '../../services/movies.services';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useObserver } from '../../hooks/useObserver';

// Components
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';

export const SearchPage = () => {
  // Get the current query param as needed
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  // States
  const [criteria, setCriteria] = useState(new URLSearchParams(search).get('criteria'));
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  // Handle new search
  const handleSearch = (value) => {
    // Update the url
    const params = new URLSearchParams();

    if (value) {
      params.append('query', value);
    } else {
      params.delete('query');
    }

    // TODO: Search a better way to implement this
    // Navigate (to update the url)
    navigate({ pathname: '/search', search: params.toString() });

    // Reset values
    setCriteria(value);
    setPage(1);
  };

  // Function to get a new movies page
  const fetch = async (reset) => {
    const reply = await SearchMoviesService(criteria, page);
    reset ? setMovies([...reply.movies]) : setMovies([...movies, ...reply.movies]);
    setPage(page + 1);
  };

  // Infinite scroll
  const lastElement = useRef(null);
  const { observe } = useObserver(fetch);

  // Effects
  useEffect(() => {
    const getMovies = async () => {
      await fetch(true);
    };

    getMovies();
  }, [criteria]);

  useEffect(() => {
    if (lastElement.current) {
      // Change the observed element
      observe(lastElement.current);
    }
  }, [movies]);

  return (
    <main className='container'>
      <SearchBar current={criteria || ''} callback={handleSearch} />
      <MoviesGrid isSlider={false}>
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={`${movie.id}-${criteria}-${index}`}
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

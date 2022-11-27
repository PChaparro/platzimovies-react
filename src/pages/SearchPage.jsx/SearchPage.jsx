import { SearchMoviesService } from '../../services/movies.services';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useObserver } from '../../hooks/useObserver';

// Components
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Loader } from '../../components/Loader/Loader';

export const SearchPage = () => {
  // Get the current query param as needed
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  // States
  const [loading, setLoading] = useState(true);
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

    // Update the criteria and start from first page again
    setCriteria(value);
    setPage(1);
  };

  // Function to get a new movies page
  const fetch = async (reset) => {
    setLoading(true);
    const reply = await SearchMoviesService(criteria, page);
    reset ? setMovies([...reply.movies]) : setMovies([...movies, ...reply.movies]);
    setPage(page + 1);
    setLoading(false);
  };

  // Infinite scroll satates
  const lastElement = useRef(null);
  const { observe } = useObserver(fetch);

  // Load new movies when page is loaded or criteria
  // was changed
  useEffect(() => {
    const getMovies = async () => {
      await fetch(true);
    };

    getMovies();
  }, [criteria]);

  // Updated the observed item when new movies
  // are added
  useEffect(() => {
    if (lastElement.current) {
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
      {loading && <Loader />}
    </main>
  );
};

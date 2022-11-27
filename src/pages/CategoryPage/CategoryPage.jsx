// Components
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { MoviesGrid } from '../../components/MoviesGrid/MoviesGrid';
import { GetCategoriesService, GetGenreService } from '../../services/movies.services';

// Hooks
import { useObserver } from '../../hooks/useObserver';
import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import randomColor from 'randomcolor';
import Styles from './CategoryPage.module.css';

export const CategoryPage = () => {
  // Get the genre id from the url param
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // States
  const [color, setColor] = useState(location.color || '');
  const [name, setName] = useState(location.name || '');
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
      if (!name) {
        // Get the genre and color if the page was loaded from the url
        const { genres } = await GetCategoriesService();
        const current = genres.filter((genre) => genre.id === parseInt(id))[0];

        if (!current) {
          // Go to the home page if the genre was not found
          navigate('/');
        } else {
          // Update the name and get a random color
          setName(current.name);
          setColor(randomColor());
        }
      }

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

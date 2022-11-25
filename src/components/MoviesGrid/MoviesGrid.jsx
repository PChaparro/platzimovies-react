import Styles from './MoviesGrid.module.css';

import { MovieCard } from '../MovieCard/MovieCard';

export const MoviesGrid = ({ movies }) => {
  return (
    <div className={`${Styles.movies} container`}>
      {movies.map((movie, index) => {
        return <MovieCard key={`${movie.id}-card-${index}`} movie={movie} />;
      })}
    </div>
  );
};

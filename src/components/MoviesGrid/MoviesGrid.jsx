import Styles from './MoviesGrid.module.css';

import { MovieCard } from '../MovieCard/MovieCard';

export const MoviesGrid = ({ movies, isSlider }) => {
  return (
    <div className={`${Styles.movies} ${isSlider && Styles['movies--slider']} container`}>
      {movies.map((movie, index) => {
        return (
          <MovieCard
            key={`${movie.id}-card-${index}`}
            movie={movie}
            lazy={index >= 3 ? true : false}
            isSlider={isSlider}
          />
        );
      })}
    </div>
  );
};

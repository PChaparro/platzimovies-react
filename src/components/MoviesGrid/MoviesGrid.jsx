import Styles from './MoviesGrid.module.css';
import { MovieCard } from './MovieCard/MovieCard';

export const MoviesGrid = ({ children, isSlider }) => {
  return (
    <div className={`${Styles.movies} ${isSlider && Styles['movies--slider']} container`}>
      {children}
    </div>
  );
};

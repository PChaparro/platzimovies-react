import { forwardRef } from 'react';
import Styles from './MovieCard.module.css';

export const MovieCard = forwardRef((props, ref) => {
  return (
    <article className={`${Styles.movie} ${props.isSlider && Styles['movie--slider']}`} ref={ref}>
      <img
        className={Styles.movie__image}
        src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`}
        alt={`${props.movie.title} poster`}
        loading={props.lazy ? 'lazy' : 'eager'}
      ></img>
    </article>
  );
});

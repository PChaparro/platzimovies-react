import Styles from './MovieCard.module.css';

export const MovieCard = ({ movie, lazy, isSlider }) => {
  return (
    <article className={`Styles.movie ${isSlider && Styles['movie--slider']}`}>
      <img
        className={Styles.movie__image}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={`${movie.title} poster`}
        loading={lazy ? 'lazy' : 'eager'}
      ></img>
    </article>
  );
};

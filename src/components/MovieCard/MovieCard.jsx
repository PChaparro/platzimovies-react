import Styles from './MovieCard.module.css';

export const MovieCard = ({ movie, lazy }) => {
  return (
    <article className={Styles.movie}>
      <img
        className={Styles.movie__image}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={`${movie.title} poster`}
        loading={lazy ? 'lazy' : 'eager'}
      ></img>
    </article>
  );
};

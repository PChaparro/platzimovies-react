import { forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import { SessionContext } from '../../../context/sessionContext';
import { FavoriteIcon } from '../../FavoriteIcon/FavoriteIcon';
import Styles from './MovieCard.module.css';

export const MovieCard = forwardRef((props, ref) => {
  const { ExistsOnFavorites, addFavorite, removeFavorite } = useContext(SessionContext);
  const isFavorite = ExistsOnFavorites(props.movie.id);

  return (
    <article className={`${Styles.movie} ${props.isSlider && Styles['movie--slider']}`} ref={ref}>
      {isFavorite ? (
        <FavoriteIcon
          isFavorite={isFavorite}
          callback={() => {
            removeFavorite(props.movie.id);
          }}
        />
      ) : (
        <FavoriteIcon
          isFavorite={isFavorite}
          callback={() => {
            addFavorite({
              id: props.movie.id,
              title: props.movie.title,
              poster_path: props.movie.poster_path,
            });
          }}
        />
      )}
      <Link to={`/movie/${props.movie.id}`} aria-label={`View ${props.movie.title} movie details`}>
        <img
          className={Styles.movie__image}
          src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`}
          alt={`${props.movie.title} poster`}
          loading={props.lazy ? 'lazy' : 'eager'}
        ></img>
      </Link>
    </article>
  );
});

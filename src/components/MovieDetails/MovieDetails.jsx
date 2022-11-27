import Styles from './MovieDetails.module.css';

import { FaStar } from 'react-icons/fa';
import { CategoriesGrid } from '../CategoriesGrid/CategoriesGrid';
import { MoviesGrid } from '../MoviesGrid/MoviesGrid';
import { MovieCard } from '../MoviesGrid/MovieCard/MovieCard';

import { useContext } from 'react';
import { SessionContext } from '../../context/sessionContext';
import { FavoriteIcon } from '../FavoriteIcon/FavoriteIcon';

export const MovieDetails = ({ movie, similars }) => {
  const { ExistsOnFavorites, addFavorite, removeFavorite } = useContext(SessionContext);
  const isFavorite = ExistsOnFavorites(movie.id);

  return (
    <>
      <main className={`${Styles.movie} container`}>
        <div className={Styles['movie__poster-container']}>
          <img
            className={Styles.movie__poster}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
          {isFavorite ? (
            <FavoriteIcon
              isFavorite={isFavorite}
              callback={() => {
                removeFavorite(movie.id);
              }}
            />
          ) : (
            <FavoriteIcon
              isFavorite={isFavorite}
              callback={() => {
                addFavorite({ id: movie.id, title: movie.title, poster_path: movie.poster_path });
              }}
            />
          )}
        </div>
        <div className={Styles.movie__details}>
          <div className={Styles.movie__header}>
            <h1 className={Styles.movie__title}>{movie.title}</h1>
            <p className={Styles.movie__stars}>
              <FaStar color='#edcb74' title='Stars icon' /> {movie.vote_average}
            </p>
          </div>
          <p className={Styles.movie__description}>{movie.overview}</p>
          <section>
            <h2 className='section__title'>Categories</h2>
            <CategoriesGrid categories={movie.genres || []} />
          </section>
        </div>
      </main>
      <section className='container section'>
        <h2 className='section__title'>Similar movies</h2>
        <MoviesGrid isSlider={true}>
          {similars.map((movie, index) => {
            return (
              <MovieCard
                key={`similars-${movie.title}-${index}`}
                movie={movie}
                lazy={index >= 3 ? true : false}
                isSlider={true}
              />
            );
          })}
        </MoviesGrid>
      </section>
    </>
  );
};

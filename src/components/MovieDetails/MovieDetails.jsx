import Styles from './MovieDetails.module.css';

import { FaStar } from 'react-icons/fa';
import { CategoriesGrid } from '../CategoriesGrid/CategoriesGrid';
import { MoviesGrid } from '../MoviesGrid/MoviesGrid';
import { MovieCard } from '../MoviesGrid/MovieCard/MovieCard';

export const MovieDetails = ({ movie, similars }) => {
  return (
    <>
      <main className={`${Styles.movie} container`}>
        <img
          className={Styles.movie__poster}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
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

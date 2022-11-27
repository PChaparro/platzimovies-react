import Styles from './MovieDetails.module.css';

import { FaStar } from 'react-icons/fa';
import { CategoriesGrid } from '../CategoriesGrid/CategoriesGrid';

export const MovieDetails = ({ movie }) => {
  return (
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
  );
};

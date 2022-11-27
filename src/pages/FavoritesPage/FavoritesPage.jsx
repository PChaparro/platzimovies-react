import { useContext } from 'react';
import { SessionContext } from '../../context/sessionContext';

import { MoviesGrid } from '.././../components/MoviesGrid/MoviesGrid';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';

export const FavoritesPage = () => {
  const { favorites } = useContext(SessionContext);

  return (
    <main className='section container'>
      <h1 className='section__title'>Favorites</h1>
      <MoviesGrid isSlider={false}>
        {favorites.map((favorite, index) => {
          return <MovieCard key={`favorite-${index}`} movie={favorite} />;
        })}
      </MoviesGrid>
    </main>
  );
};

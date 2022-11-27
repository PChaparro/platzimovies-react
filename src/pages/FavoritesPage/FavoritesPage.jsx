import { useContext } from 'react';
import { SessionContext } from '../../context/sessionContext';

import { MoviesGrid } from '.././../components/MoviesGrid/MoviesGrid';
import { MovieCard } from '../../components/MoviesGrid/MovieCard/MovieCard';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../hooks/useNotification';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { triggerWarningNotification } = useNotification();

  const { favorites } = useContext(SessionContext);

  if (favorites.length === 0) {
    triggerWarningNotification('You have not favorites yet');
    return navigate('/');
  }

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

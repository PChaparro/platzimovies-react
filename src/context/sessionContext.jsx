import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const { items, addItem, removeItem } = useLocalStorage('FAVORITES_V1');

  const ExistsOnFavorites = (movieId) => {
    return items.some((item) => item.id === movieId);
  };

  return (
    <SessionContext.Provider
      value={{
        favorites: items,
        addFavorite: addItem,
        removeFavorite: removeItem,
        ExistsOnFavorites,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

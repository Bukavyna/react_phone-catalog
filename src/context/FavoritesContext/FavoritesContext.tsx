import React, { createContext } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FavoritesContextType } from '../../types/favorites.types';

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const toggleFavorite = (itemId: string) => {
    setFavorites(current =>
      current.includes(itemId)
        ? current.filter(id => id !== itemId)
        : [...current, itemId],
    );
  };

  const isFavorites = (itemId: string) => favorites.includes(itemId);

  const clearFavorites = () => setFavorites([]);

  const value = {
    favorites,
    toggleFavorite,
    isFavorites,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

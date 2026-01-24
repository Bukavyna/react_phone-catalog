import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorites: (itemId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
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

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};

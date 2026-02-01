export interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorites: (itemId: string) => boolean;
  clearFavorites: () => void;
}

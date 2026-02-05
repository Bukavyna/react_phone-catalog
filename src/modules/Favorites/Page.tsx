import React from 'react';

import styles from './FavoritesPage.module.scss';

import { ProductCard } from '../../components/ProductCard';
import { useFavorites } from '../../hooks/useFavorites';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumbs />

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length > 0 ? (
        <div className={styles.grid}>
          {favorites.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>Your favorites list is empty</h2>
        </div>
      )}
    </div>
  );
};

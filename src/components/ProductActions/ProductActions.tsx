import React from 'react';

import styles from './ProductActions.module.scss';

import { Product } from '../../types/product.types';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

interface ProductActionsProps {
  product: Product;
  variant?: 'card' | 'details';
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  variant = 'card',
}) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorites } = useFavorites();

  const idToCheck = product.id;
  const added = isInCart(idToCheck);
  const favorite = isFavorites(idToCheck);

  return (
    <div className={`${styles.actions} ${styles[`actions--${variant}`]}`}>
      <button
        type="button"
        className={`${styles.cardButton} ${added ? styles.cardButtonSecondary : styles.cardButtonPrimary}`}
        disabled={added}
        onClick={() => !added && addToCart(product)}
      >
        {added ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
        onClick={() => toggleFavorite(idToCheck)}
        aria-label="Toggle favorite"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.5C6 0 2 1 2 5c0 4 6 8 6 8s6-4 6-8c0-4-4-5-6-2.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill={favorite ? 'currentColor' : 'none'}
          />
        </svg>
      </button>
    </div>
  );
};

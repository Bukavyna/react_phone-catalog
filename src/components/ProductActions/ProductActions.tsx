import React from 'react';

import styles from './ProductActions.module.scss';

import { ProductType } from '../../types/product.types';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { HeartIcon } from '../HeartIcon';
import { Button } from '../Button';

interface ProductActionsProps {
  product: ProductType;
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
      <Button
        variant={added ? 'secondary' : 'primary'}
        disabled={added}
        onClick={() => addToCart(product)}
      >
        {added ? 'Added to cart' : 'Add to cart'}
      </Button>

      <button
        type="button"
        className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
        onClick={() => toggleFavorite(product)}
      >
        <HeartIcon
          favorite={favorite}
          className={styles.heartIcon}
          fill={favorite ? '#EB5757' : 'none'}
        />
      </button>
    </div>
  );
};

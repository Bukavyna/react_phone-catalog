import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import { Product } from '../../types/product.types';
import { getProductPrice } from '../../utils/priceHelper';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart: isProductInCart } = useCart();
  const { toggleFavorite, isFavorites } = useFavorites();

  const { itemId, name, screen, capacity, category, ram } = product;

  const isAddedToCart = isProductInCart(itemId);
  const isFavoriteItem = isFavorites(itemId);

  const { oldPrice, currentPrice } = getProductPrice(product);

  const detailsUtl = `/${category}/${itemId}`;

  const productImage = product.images?.[0] || product.image;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(itemId);
  };

  return (
    <div className={styles.card}>
      <Link to={detailsUtl} className={styles.imageLink}>
        <img
          src={productImage || '/img/product-not-found.png'}
          alt={name}
          className={styles.image}
        />
      </Link>

      <h2 className={styles.name}>
        <Link to={detailsUtl} className={styles.nameLink}>
          {name}
        </Link>
      </h2>

      <div className={styles.priceContainer}>
        <span className={styles.newPrice}>{currentPrice}</span>
        {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
      </div>

      <div className={styles.separator} />

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span className={styles.specKey}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specKey}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specKey}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.cardButton} ${isAddedToCart ? styles.secondary : styles.primary}`}
          disabled={isAddedToCart}
          onClick={handleAddToCart}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.favoriteButton} ${isFavoriteItem ? styles.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
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
              fill={isFavoriteItem ? 'currentColor' : 'none'}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

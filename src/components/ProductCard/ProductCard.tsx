import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import { ProductType } from '../../types/product.types';
import { getProductPrice } from '../../utils/priceHelper';
import { ProductActions } from '../ProductActions';

interface ProductCardProps {
  product: ProductType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id: productId, name, screen, capacity, ram } = product;

  const { oldPrice, currentPrice } = getProductPrice(product);

  const productImage = product.images?.[0] || product.image;

  return (
    <div className={styles.card}>
      <Link to={`/products/${productId}`} className={styles.link}>
        <img
          src={
            productImage
              ? `${import.meta.env.BASE_URL}${productImage}`
              : `${import.meta.env.BASE_URL}img/page-not-found.png`
          }
          alt={name}
          className={styles.image}
        />

        <h2 className={styles.name}>{name}</h2>

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
      </Link>

      <ProductActions product={product} />
    </div>
  );
};

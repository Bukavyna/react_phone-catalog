import React from 'react';
import { Link } from 'react-router-dom';

import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.imageWrapper}>
        <img
          src="/img/cart-is-empty.png"
          alt="Empty cart"
          className={styles.image}
        />
      </div>

      <h2 className={styles.title}>Your cart is empty</h2>
      <p className={styles.description}>
        But it&apos;s never too late to fix it! Check out our catalog to find
        something special.
      </p>

      <Link to="/phones" className={styles.button}>
        Checkout
      </Link>
    </div>
  );
};

import React from 'react';

import styles from './CartPage.module.scss';

import { useCart } from '../../hooks/useCart';
import { CartList } from './components/CartList';
import { CartSummary } from './components/CartSummary/CartSummary';
import { EmptyCart } from './components/EmptyCart';
import { BackButton } from '../../components/BackButton';

export const CartPage: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className={styles.cartPage}>
      <BackButton />
      <h1 className={styles.title}>Cart</h1>

      {cart.length > 0 ? (
        <div className={styles.content}>
          <CartList />
          <CartSummary />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

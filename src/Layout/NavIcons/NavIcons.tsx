import React from 'react';
import { Link } from 'react-router-dom';

import baseStyles from './NavIcons.module.scss';

import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';

interface NavIconsProps {
  styles: { [key: string]: string };
}

export const NavIcons: React.FC<NavIconsProps> = ({ styles }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  const getClassName = (className: string) => {
    return `${baseStyles[className] || ''} ${styles[className] || ''}`.trim();
  };

  return (
    <div className={styles.navigation__right}>
      <Link to="/favorites" className={styles.navigation__iconLink}>
        <svg
          className={getClassName('navigation__icon')}
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
            fill={favoritesCount ? 'currentColor' : 'none'}
          />
        </svg>
        {favoritesCount > 0 && (
          <span className={styles.counter}>{favoritesCount}</span>
        )}
      </Link>

      <div className={styles.divider} />

      <Link to="/cart" className={styles.navigation__iconLink}>
        <svg
          className={getClassName('navigation__icon')}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2h1.5l1.6 8.8c.1.5.5.9 1 .9h6.8c.5 0 .9-.4 1-.9L15 5H4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="6" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
        </svg>
        {cartCount > 0 && <span className={styles.counter}>{cartCount}</span>}
      </Link>
    </div>
  );
};

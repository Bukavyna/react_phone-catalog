import React from 'react';
import { Link } from 'react-router-dom';

import baseStyles from './NavIcons.module.scss';

import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';
import { HeartIcon } from '../../components/HeartIcon';

interface NavIconsProps {
  styles: { [key: string]: string };
  onClose: () => void;
}

export const NavIcons: React.FC<NavIconsProps> = ({ styles, onClose }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  const getClassName = (className: string) => {
    return `${baseStyles[className] || ''} ${styles[className] || ''}`.trim();
  };

  return (
    <div className={styles.navigation__right}>
      <Link
        to="/favorites"
        className={styles.navigation__iconLink}
        onClick={onClose}
      >
        <HeartIcon
          favorite={favorites}
          className={styles.heartIcon}
          fill={favorites.length ? '#EB5757' : 'none'}
        />

        {favoritesCount > 0 && (
          <span className={styles.counter}>{favoritesCount}</span>
        )}
      </Link>

      <div className={styles.divider} />

      <Link
        to="/cart"
        className={styles.navigation__iconLink}
        onClick={onClose}
      >
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

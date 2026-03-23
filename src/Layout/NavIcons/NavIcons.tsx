import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lordicon/react';

import baseStyles from './NavIcons.module.scss';

import wiredTrolley from '../../img/wiredTrolley1.json';

import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';
import { HeartIcon } from '../../components/HeartIcon';
import { WiredTrolley } from '../../components/WiredTrolley';

interface NavIconsProps {
  styles: { [key: string]: string };
  onClose: () => void;
}

export const NavIcons: React.FC<NavIconsProps> = ({ styles, onClose }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;
  const cartRef = useRef<Player | null>(null);

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
          isSelected={favoritesCount > 0}
          className={styles.heartIcon}
          trigger={favoritesCount}
        />

        {favoritesCount > 0 && (
          <span className={baseStyles.counter}>{favoritesCount}</span>
        )}
      </Link>

      <Link
        to="/cart"
        className={styles.navigation__iconLink}
        onClick={onClose}
      >
        <WiredTrolley
          ref={cartRef}
          className={getClassName('navigation__icon')}
          icon={wiredTrolley}
          trigger={cartCount}
        />

        {cartCount > 0 && (
          <span className={baseStyles.counter}>{cartCount}</span>
        )}
      </Link>
    </div>
  );
};

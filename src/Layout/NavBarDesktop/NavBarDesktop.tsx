import React from 'react';
import { Link } from 'react-router-dom';

import { NavIcons } from '../NavIcons';

import styles from './NavBarDesktop.module.scss';

interface NavBarDesktopProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavBarDesktop: React.FC<NavBarDesktopProps> = () => {
  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.navigation__link}>
        home
      </Link>
      <Link to="/phones" className={styles.navigation__link}>
        phones
      </Link>
      <Link to="/tablets" className={styles.navigation__link}>
        tablets
      </Link>
      <Link to="/accessories" className={styles.navigation__link}>
        accessories
      </Link>

      <NavIcons styles={styles} />
    </nav>
  );
};

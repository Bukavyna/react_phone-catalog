import React from 'react';
import { Link } from 'react-router-dom';

import { NavIcons } from '../NavIcons';

import styles from './NavBarMobile.module.scss';

interface NavBarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavBarMobile: React.FC<NavBarMobileProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <nav className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
      <Link to="/" onClick={onClose} className={styles.navigation__link}>
        home
      </Link>

      <Link onClick={onClose} to="/" className={styles.navigation__link}>
        home
      </Link>
      <Link
        onClick={onClose}
        to="/api/phones"
        className={styles.navigation__link}
      >
        phones
      </Link>
      <Link onClick={onClose} to="/tablets" className={styles.navigation__link}>
        tablets
      </Link>
      <Link
        onClick={onClose}
        to="/accessories"
        className={styles.navigation__link}
      >
        accessories
      </Link>

      <NavIcons styles={styles} />
    </nav>
  );
};

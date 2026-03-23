import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';

import { Logo } from '../../components/Logo';
import { goTo } from '../../utils/scrollToPosition';
import { ArrowButton } from '../../components/ArrowButton';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Logo />

      <nav className={styles.navigation}>
        <Link to="/" className={styles.navigation__link}>
          Github
        </Link>
        <Link to="/phones" className={styles.navigation__link}>
          {t('footer.contacts')}
        </Link>
        <Link to="/tablets" className={styles.navigation__link}>
          {t('footer.rights')}
        </Link>
      </nav>

      <div className={styles.scrollToTop}>
        {t('footer.backToTop')}
        <ArrowButton
          className={styles.scrollButtonToTop}
          arrowClassName={styles.arrowIcon}
          onClick={goTo}
        />
      </div>
    </footer>
  );
};

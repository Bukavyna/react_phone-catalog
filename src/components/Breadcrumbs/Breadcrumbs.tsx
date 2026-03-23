import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Player } from '@lordicon/react';

import styles from './Breadcrumbs.module.scss';

import homeIcon from '../../img/home.json';
import { ArrowIcon } from '../ArrowIcon';
import { useLordicon } from '../../hooks/useLordicon';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const pathNames = pathname.split('/').filter(x => x);
  const { t } = useTranslation();
  const { playerRef, handleMouseEnter } = useLordicon();

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink} onMouseEnter={handleMouseEnter}>
        <Player ref={playerRef} icon={homeIcon} />
      </Link>

      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathNames.length - 1;

        return (
          <React.Fragment key={routeTo}>
            <ArrowIcon className={styles.arrow} />
            {isLast ? (
              <span className={styles.current}>{t(`categories.${name}`)}</span>
            ) : (
              <Link to={routeTo} className={styles.link}>
                {t(`categories.${name}`)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

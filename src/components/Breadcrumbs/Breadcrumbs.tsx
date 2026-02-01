import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

import { ArrowIcon } from '../ArrowIcon';

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d={`
        M13.75 6.75L8 1.5L2.25 6.75V13.5C2.25 13.7652 2.35536
        14.0196 2.54289 14.2071C2.73043 14.3946 2.98478 14.5 3.25
        14.5H5.5V10.5H10.5V14.5H12.75C13.0152 14.5 13.2696 14.3946
        13.4571 14.2071C13.6446 14.0196 13.75 13.7652 13.75 13.5V6.75Z
      `}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();

  const pathNames = pathname.split('/').filter(x => x);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <HomeIcon />
      </Link>

      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathNames.length - 1;

        return (
          <React.Fragment key={routeTo}>
            <ArrowIcon className={styles.arrow} />
            {isLast ? (
              <span className={styles.current}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <Link to={routeTo} className={styles.link}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

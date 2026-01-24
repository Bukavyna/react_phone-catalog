import React from 'react';
import classNames from 'classnames';

import styles from './Pagination.module.scss';

interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  onPageChange,
}) => {
  if (total <= 1) {
    return null;
  }

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(styles.arrow, {
          [styles.disabled]: current === 1,
        })}
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        {'<'}
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={classNames(styles.page, {
            [styles.active]: page === current,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(styles.arrow, {
          [styles.disabled]: current === total,
        })}
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
      >
        {'>'}
      </button>
    </div>
  );
};

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { Spinner } from '../Spinner';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  loading,
  type = 'button',
  disabled,
  ...rest
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[variant],
    styles[size],
    className,
    {
      [styles.loading]: loading,
    },
  );

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Spinner />}
      <span className={clsx({ [styles.hidden]: loading })}>{children}</span>
    </button>
  );
};

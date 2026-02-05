import React from 'react';
import { ThemeConfig } from './themeConfig';
import styles from './ThemeSelector.module.scss';

interface ThemeCardProps {
  theme: ThemeConfig;
  isActive: boolean;
  onClick: () => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  isActive,
  onClick,
}) => {
  return (
    <label
      className={`${styles.themeCard} ${isActive ? styles.active : ''}`}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className={styles.cardContent}>
        <span className={styles.themeName}>{theme.name}</span>

        <div
          className={styles.demoButton}
          style={{ backgroundColor: theme.backgroundColor }}
        />
      </div>

      <input
        type="radio"
        name="theme"
        value={String(theme.id)}
        checked={isActive}
        onChange={onClick}
        className={styles.radio}
      />

      <span className={styles.radioCustom}>
        {isActive && <span className={styles.radioInner} />}
      </span>
    </label>
  );
};

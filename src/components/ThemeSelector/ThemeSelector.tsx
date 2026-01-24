import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeCard } from './ThemeCard';
import { THEMES } from './themeConfig';

import styles from './ThemeSelector.module.scss';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null!);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideDropdown = dropdownRef.current!.contains(target);

      const clickedButton = buttonRef.current!.contains(target);

      if (!clickedInsideDropdown && !clickedButton) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.themeSelector}>
      <button
        ref={buttonRef}
        className={styles.toggleButton}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Select theme"
      >
        <svg
          className={styles.svgIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`
              M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 9.38 2.03 10.63
              2.89 11.59C3.33 12.09 3.95 12.5 4.64 12.5C5.78 12.5
              6.5 11.47 6.5 10.5C6.5 9.95 6.78 9.5 7.25 9.5C7.94
              9.5 8.5 10.06 8.5 10.75C8.5 12.54 10.21 14 12 14C13.93
              14 15.5 12.43 15.5 10.5C15.5 5.53 11.97 1.5 8 1.5
              Z
            `}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="5" cy="6" r="1" fill="currentColor" />
          <circle cx="8" cy="4.5" r="1" fill="currentColor" />
          <circle cx="11" cy="6" r="1" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropdownContent}>
            {THEMES.map(themeConfig => (
              <ThemeCard
                key={themeConfig.id}
                theme={themeConfig}
                isActive={theme === themeConfig.id}
                onClick={() => {
                  setTheme(themeConfig.id);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

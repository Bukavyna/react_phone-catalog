import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '../../components/ThemeSelector';

export type Theme = (typeof THEMES)[number]['id'];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [them, setThem] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');

    if (
      savedTheme &&
      (THEMES.map(theme => theme.id) as string[]).includes(savedTheme)
    ) {
      return savedTheme as Theme;
    }

    return 'original-light';
  });

  useEffect(() => {
    const allThemeClasses = THEMES.map(theme => theme.id);

    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !allThemeClasses.includes(cls))
      .join(' ');

    document.body.classList.add(them);

    localStorage.setItem('theme', them);
  }, [them]);

  const value: ThemeContextType = {
    theme: them,
    setTheme: setThem,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(`useTheme must be used within ThemeProvider`);
  }

  return context;
};

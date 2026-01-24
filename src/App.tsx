import React from 'react';

import './App.scss';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { Router } from './router/Router';

export const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

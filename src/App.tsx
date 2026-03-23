import React from 'react';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { Router } from './router/Router';

export const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 400,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Router />
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

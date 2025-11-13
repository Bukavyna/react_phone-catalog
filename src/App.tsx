import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { CatalogPage } from './modules/Catalog/Page';
import { HomePage } from './modules/Home/Page';

import './App.scss';
import { Button } from './components/Button/Button';

export const App = () => {
  return (
    <>
      <h1>Hi!</h1>
      <Button />
      <BrowserRouter>
        <FavoritesProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="phones" element={<CatalogPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </FavoritesProvider>
      </BrowserRouter>
    </>
  );
};

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { HomePage } from '../modules/Home/Page';
import { CatalogPage } from '../modules/Catalog/Page';
import { ProductDetailsPage } from '../modules/ProductDetails/Page';
import { NotFound } from '../modules/NotFound';
import { CartPage } from '../modules/Cart/Page';
import { FavoritesPage } from '../modules/Favorites';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path=":category" element={<CatalogPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

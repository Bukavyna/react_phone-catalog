import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { HomePage } from '../modules/Home/Page';
import { CatalogPage } from '../modules/Catalog/Page';
import { ProductDetailsPage } from '../modules/ProductDetails/Page';
import { NotFound } from '../modules/NotFound';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path=":category" element={<CatalogPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

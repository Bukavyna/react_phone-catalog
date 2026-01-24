import React from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsPreset } from '../../../../types/product.types';

export const HotPrices: React.FC = () => {
  return (
    <ProductsSlider
      title="Hot prices"
      productsPreset={ProductsPreset.HotPrices}
    />
  );
};

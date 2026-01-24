import React from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsPreset } from '../../../../types/product.types';

export const NewModels: React.FC = () => {
  return (
    <ProductsSlider
      title="Brand new models"
      productsPreset={ProductsPreset.Newest}
    />
  );
};

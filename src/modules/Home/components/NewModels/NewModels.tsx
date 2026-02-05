import React from 'react';
import { ProductsSlider } from '../../../ProductsSlider';
import { ProductsPresetType } from '../../../../types/sorting.types';

export const NewModels: React.FC = () => {
  return (
    <ProductsSlider
      title="Brand new models"
      productsPreset={ProductsPresetType.Newest}
    />
  );
};

import React from 'react';
import { ProductsSlider } from '../../../ProductsSlider';
import { ProductsPresetType } from '../../../../types/sorting.types';

export const HotPrices: React.FC = () => {
  return (
    <ProductsSlider
      title="Hot prices"
      productsPreset={ProductsPresetType.HotPrices}
    />
  );
};

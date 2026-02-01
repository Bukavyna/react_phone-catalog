import React from 'react';
import { useParams } from 'react-router-dom';

import { ProductsSlider } from '../../../ProductsSlider';

interface SuggestedProductsProps {
  category: string;
}

export const SuggestedProducts: React.FC<SuggestedProductsProps> = ({
  category,
}) => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <ProductsSlider
      title="You may also like"
      category={category}
      excludeItemId={productId || ''}
      limit={12}
      preset="random"
    />
  );
};

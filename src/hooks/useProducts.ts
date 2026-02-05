import { useState, useEffect } from 'react';

import { getProducts } from '../api';
import { getErrorMessage } from '../utils/errorUtils';
import { ProductDetailsType } from '../types/product-details.types';

interface UseProductsResult {
  products: ProductDetailsType[];
  loading: boolean;
  errorMessage: string;
}

export const useProducts = (category?: string): UseProductsResult => {
  const [products, setProducts] = useState<ProductDetailsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getProducts(category)
      .then(data => {
        setProducts(data);
      })
      .catch(e => setErrorMessage(getErrorMessage(e, 'NETWORK')))
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, errorMessage };
};

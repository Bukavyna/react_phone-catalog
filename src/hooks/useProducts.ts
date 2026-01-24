import { useState, useEffect } from 'react';

import { Product } from '../types/product.types';
import { getProducts } from '../api';
import { getErrorMessage } from '../utils/errorUtils';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  errorMessage: string;
}

export const useProducts = (category?: string): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getProducts(category)
      .then(setProducts)
      .catch(e => setErrorMessage(getErrorMessage(e, 'NETWORK')))
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, errorMessage };
};

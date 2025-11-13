import { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts } from '../api/products';
import { getErrorMessage } from '../utils/errorUtils';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  errorMessage: string;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);

    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();

        setProducts(fetchedProducts);
      } catch (e) {
        const message = getErrorMessage(e, 'NETWORK');

        setErrorMessage(message);
        // eslint-disable-next-line no-console
        console.error('Error loading products, e');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, errorMessage };
};

{
}

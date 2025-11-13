import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Spinner } from '../../components/Spinner';
import { ProductsList } from './components/ProductsList';
import { ErrorMessage } from '../shared/components/ErrorMessage';

export const CatalogPage = () => {
  const { products, loading, errorMessage } = useProducts();

  if (loading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container">
        <ErrorMessage message={errorMessage} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Mobile telephones ({products.length})</h1>

      <ProductsList products={products} />
    </div>
  );
};

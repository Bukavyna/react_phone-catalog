import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './CatalogPage.module.scss';

import { NotFound } from '../NotFound';
import { CATEGORIES } from '../../utils/categories';
import { sortProducts } from '../../utils/sorting';
import { filterProductsByCategory } from '../../utils/filtering';
import { useProducts } from '../../hooks/useProducts';
import { Spinner } from '../../components/Spinner';
import { ProductsList } from './components/ProductsList';
import { SortSelect } from './components/SortSelect';
import { SortType } from '../../types/sorting.types';
import { Pagination } from './components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const { loading, error, products } = useProducts(category || 'phones');

  const [sortBy, setSortBy] = useState<SortType>(SortType.Newest);
  const [perPage, setPerPage] = useState<string>('16');

  const [currentPage, setCurrentPage] = useState(1);

  if (!category) {
    return <NotFound />;
  }

  const currentCategory = CATEGORIES.find(cat => cat.apiEndpoint === category);

  if (!currentCategory) {
    return <NotFound />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  if (!products.length) {
    return <p className={styles.empty}>Product not found</p>;
  }

  const visibleProducts = filterProductsByCategory(
    products,
    currentCategory.apiEndpoint,
  );

  const sortedProducts = sortProducts(visibleProducts, sortBy);

  const onSortChange = (value: string) => {
    setSortBy(value as SortType);
    setCurrentPage(1);
  };

  const onPerPageChange = (value: string) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const finalProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className={styles.productsBox}>
      <Breadcrumbs />

      <h1 className={styles.title}>{currentCategory.categoryName}</h1>
      <p>{visibleProducts.length} models</p>

      <SortSelect
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={onSortChange}
        onPerPage={onPerPageChange}
      />

      <ProductsList products={finalProducts} />

      <Pagination
        total={totalPages}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

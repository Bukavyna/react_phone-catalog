import React, { useState, useEffect } from 'react';

import styles from './ProductsSlider.module.scss';

import { getProducts } from '../../api/products.api';
import { Product } from '../../types/product.types';
import { ProductsPreset } from '../../types/sorting.types';
import { SortType } from '../../types/sorting.types';
import { Spinner } from '../../components/Spinner';
import { ProductCard } from '../../components/ProductCard';
import { useSlider } from '../../hooks/useSlider';
import { ArrowButton } from '../../components/ArrowButton';
import { sortProducts } from '../../utils/sorting';
import { filterProductsByCategory } from '../../utils/filtering';

interface ProductsSliderProps {
  title: string;
  productsPreset?: ProductsPreset;
  category?: string;
  excludeItemId?: string;
}

const resolveProductsByPreset = (
  allProducts: Product[],
  preset?: ProductsPreset,
  category?: string,
  excludeItemId?: string,
): Product[] => {
  let filtered = [...allProducts];

  if (category) {
    filtered = filterProductsByCategory(allProducts, category);
  }

  if (excludeItemId) {
    filtered = filtered.filter(product => product.id !== excludeItemId);
  }

  if (!preset) {
    filtered = filtered.sort(() => Math.random() - 0.5);
  }

  if (filtered.length < 12) {
    const otherProducts = allProducts
      .filter(
        product =>
          product.category !== category && product.id !== excludeItemId,
      )
      .sort(() => Math.random() - 0.5);

    filtered = [...filtered, ...otherProducts];
  }

  switch (preset) {
    case ProductsPreset.Newest:
      return filtered.slice(-12).reverse();

    case ProductsPreset.HotPrices:
      return sortProducts(filtered, SortType.HotPrices).slice(0, 12);

    default:
      return filtered.slice(0, 12);
  }
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  productsPreset,
  category,
  excludeItemId,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = windowWidth < 640 ? 1.5 : windowWidth < 1024 ? 2.5 : 4;

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(data => {
        const allProducts = data as unknown as Product[];

        const result = resolveProductsByPreset(
          allProducts,
          productsPreset,
          category,
          excludeItemId,
        );

        setProducts(result);
      })
      .finally(() => setLoading(false));
  }, [productsPreset, category, excludeItemId]);

  const { currentIndex, next, prev, canNext, canPrev } = useSlider({
    itemsCount: products.length,
    autoDelay: 5000,
    itemsPerView,
    loop: true,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={styles.productSlider}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.buttonBox}>
          <ArrowButton
            onClick={prev}
            className={styles.buttonLeft}
            arrowClassName={styles.arrowLeft}
            disabled={!canPrev}
          />

          <ArrowButton
            onClick={next}
            className={styles.buttonRight}
            arrowClassName={styles.arrowRight}
            disabled={!canNext}
          />
        </div>
      </div>

      <div className={styles.sliderWindow}>
        <div
          className={styles.sliderContainer}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map(product => (
            <div className={styles.cardWrapper} key={product.id}>
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

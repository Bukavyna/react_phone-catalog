import React, { useState, useEffect } from 'react';

import styles from './ProductsSlider.module.scss';

import { getProducts } from '../../../../api/products.api';
import {
  Product,
  ProductsPreset,
  SortType,
} from '../../../../types/product.types';
import { Spinner } from '../../../../components/Spinner';
import { ProductCard } from '../../../../components/ProductCard';
import { useSlider } from '../../../../hooks/useSlider';
import { ArrowButton } from '../../../../components/ArrowButton';
import { sortProducts } from '../../../../utils/sorting';

interface ProductsSliderProps {
  title: string;
  productsPreset: ProductsPreset;
}

const resolveProductsByPreset = (
  products: Product[],
  preset: ProductsPreset,
): Product[] => {
  switch (preset) {
    case ProductsPreset.Newest:
      return products.slice(-12).reverse();

    case ProductsPreset.HotPrices:
      return sortProducts(products, SortType.HotPrices).slice(0, 12);

    default:
      return [];
  }
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  productsPreset,
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
        setProducts(resolveProductsByPreset(data, productsPreset));
      })
      .finally(() => setLoading(false));
  }, [productsPreset]);

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
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

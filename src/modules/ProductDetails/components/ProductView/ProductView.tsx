import React from 'react';

import styles from './ProductView.module.scss';

import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { ArrowButton } from '../../../../components/ArrowButton';
import { ColorPicker } from '../ColorPicker';
import { CapacityPicker } from '../CapacityPicker';
import { ProductDetails } from '../../../../types/product.types';
import { useNavigate } from 'react-router-dom';
import { ImageGallery } from '../ImageGallery';
import { TechSpecs } from '../TechSpecs';
import { AboutSection } from '../AboutSection';
import { ProductActions } from '../../../../components/ProductActions';

interface ProductViewProps {
  details: ProductDetails;
}

const getNewPath = (
  details: ProductDetails,
  newColor?: string,
  newCapacity?: string,
) => {
  if (!details) {
    return '';
  }

  const color = newColor || details.color;
  const capacity = (newCapacity || details.capacity).toLowerCase();

  return `/products/${details.namespaceId}-${capacity}-${color.replace(/\s+/g, '-')}`;
};

export const ProductView: React.FC<ProductViewProps> = ({ details }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Breadcrumbs />
      </nav>

      <ArrowButton
        onClick={() => navigate(-1)}
        className={styles.arrowButtonBack}
      >
        Back
      </ArrowButton>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.productDetails}>
        <div className={styles.productPageHero}>
          <ImageGallery details={details} />

          <section className={styles.selectionBlock}>
            <ColorPicker
              colors={details.colorsAvailable}
              currentColor={details.color}
              getNewPath={color => getNewPath(details, color, undefined)}
            />

            <CapacityPicker
              capacity={details.capacityAvailable}
              currentCapacity={details.capacity}
              getNewPath={capacity => getNewPath(details, undefined, capacity)}
            />

            <p>Price: ${details.priceDiscount || details.priceRegular}</p>

            <ProductActions product={details} />

            <div className={styles.technicalInformation}>
              <div>
                <span>Screen:</span>
                <span>{details.screen}</span>
              </div>
              <div>
                <span>Resolution:</span>
                <span>{details.resolution}</span>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.description}>
          <AboutSection details={details} />
          <TechSpecs details={details} />
        </div>
      </div>
    </div>
  );
};

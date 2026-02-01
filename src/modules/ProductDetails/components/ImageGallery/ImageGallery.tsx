import React, { useEffect, useState } from 'react';

import styles from './ImageGallery.module.scss';

import { ProductDetails } from '../../../../types/product-details.types';

interface ImageGalleryProps {
  details: ProductDetails;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ details }) => {
  const [mainImage, setMainImage] = useState(details.images[0]);

  useEffect(() => {
    setMainImage(details.images[0]);

    if (details.images.length > 0) {
      setMainImage(details.images[0]);
    }
  }, [details.images]);

  if (!details || !details.images) {
    return <div className={styles.loader}>No images available</div>;
  }

  return (
    <div className={styles.imagesBlock}>
      <div className={styles.mainImageBoss}>
        <img className={styles.imageBoss} src={mainImage} alt={details.name} />
      </div>

      <div className={styles.imagesBox}>
        {details.images.map(img => (
          <button
            key={img}
            type="button"
            className={`${styles.imgButton} ${mainImage === img ? styles.active : ''}`}
            onClick={() => setMainImage(img)}
          >
            <img className={styles.thumbnail} src={img} alt="Thumbnail" />
          </button>
        ))}
      </div>
    </div>
  );
};

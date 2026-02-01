import styles from './ProductDetailsSkeleton.module.scss';

import { Skeleton } from '../../../../components/Skeleton';

export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.containerProductDetailsPage}>
      {/*Верхній блок*/}
      {/*<div className={`${styles.skeleton} ${styles.productPageHero}`}>*/}
      <div className={styles.productPageHero}>
        {/*Секція з фотографіями*/}
        <section className={styles.imagesBlock}>
          <Skeleton />
        </section>

        {/*Блок з вибором кольору, памяті, ціною, кнопками додавання і сердечка а також короткою інформацією*/}
        <section className={styles.selectionBlock}>
          <Skeleton />
        </section>
      </div>

      <div className={styles.description}>
        <div className={styles.about}>
          <Skeleton />
        </div>
        <div className={`${styles.skeleton} ${styles.techSpecs}`}>
          <Skeleton />
        </div>
      </div>

      {/*You may also like*/}
      <div className={styles.alsoLike}>
        <Skeleton />
      </div>
    </div>
  );
};

import React from 'react';

import styles from './AboutSection.module.scss';

import { ProductDetails } from '../../../../types/product-details.types';

interface AboutSectionProps {
  details: ProductDetails;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ details }) => {
  return (
    <div className={styles.aboutSection}>
      <h3 className={styles.sectionTitle}>About</h3>
      {details.description.map(detail => (
        <div key={detail.title}>
          <h4>{detail.title}</h4>
          {detail.text.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

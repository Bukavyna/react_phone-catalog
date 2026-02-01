import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CapacityPicker.module.scss';

interface CapacityPickerProps {
  capacity: string[];
  currentCapacity: string;
  getNewPath: (capacity: string) => string;
}

export const CapacityPicker: React.FC<CapacityPickerProps> = ({
  capacity,
  currentCapacity,
  getNewPath,
}) => {
  return (
    <div className={styles.capacitySelectionBox}>
      <p className={styles.label}>Available capacity</p>
      <div className={styles.capacitySelection}>
        {capacity.map(cap => (
          <Link
            to={getNewPath(cap)}
            key={cap}
            className={`${styles.capacityButton} ${currentCapacity === cap ? styles.active : ''}`}
          >
            {cap}
          </Link>
        ))}
      </div>
    </div>
  );
};

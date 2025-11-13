import { useState, useEffect } from 'react';
import { getErrorMessage } from '../utils/errorUtils';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const getInitialValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      const errorMessage = getErrorMessage(e, 'LOCAL_STORAGE_READ');

      // eslint-disable-next-line no-console
      console.error(`Error reading localStorage key "${key}": ${errorMessage}`);

      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getInitialValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      const errorMessage = getErrorMessage(e, 'LOCAL_STORAGE_WRITE');

      // eslint-disable-next-line no-console
      console.error(`Error setting localStorage key "${key}": ${errorMessage}`);
    }
  }, [key, value]);

  return [value, setValue];
}

import { getProductsByCategory } from './products.api';

export const getAccessories = () => {
  return getProductsByCategory('accessories');
};

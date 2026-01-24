import { getProductsByCategory } from './products.api';

export const getPhones = () => {
  return getProductsByCategory('phones');
};

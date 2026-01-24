import { getProductsByCategory } from './products.api';

export const getTablets = () => {
  return getProductsByCategory('tablets');
};

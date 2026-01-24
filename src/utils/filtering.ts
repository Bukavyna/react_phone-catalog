import { Product } from '../types/product.types';

export const filterProductsByCategory = (
  products: Product[],
  category: string,
): Product[] => {
  return products.filter(product => product.category === category);
};

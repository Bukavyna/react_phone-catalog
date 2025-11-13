import { Product } from '../types';
import { client } from './client';

const BASE_URL = '/api/products.json';

export const getProducts = () => {
  return client<Product[]>(BASE_URL);
};

export const getProductDetails = async (itemId: string) => {
  const products = getProducts();

  const productDetails = products.find(product => product.itemId === itemId);

  if (!productDetails) {
    throw new Error(`Product with ID ${itemId} not found`);
  }

  return productDetails;
};

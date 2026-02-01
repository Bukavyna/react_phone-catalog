import { ProductDetails } from '../types/product-details.types';
import { client } from './client';

const BASE = import.meta.env.BASE_URL;

const ACCESSORIES_URL = `${BASE}api/accessories.json`;
const PHONES_URL = `${BASE}api/phones.json`;
const TABLETS_URL = `${BASE}api/tablets.json`;

let allProductsCache: ProductDetails[] | null = null;

const loadAllProducts = async (): Promise<ProductDetails[]> => {
  if (allProductsCache) {
    return allProductsCache;
  }

  const [accessories, phones, tablets] = await Promise.all([
    client<ProductDetails[]>(ACCESSORIES_URL),
    client<ProductDetails[]>(PHONES_URL),
    client<ProductDetails[]>(TABLETS_URL),
  ]);

  allProductsCache = [...accessories, ...phones, ...tablets];

  return allProductsCache;
};

export const getProductDetails = async (
  itemId: string,
): Promise<ProductDetails> => {
  const allProducts = await loadAllProducts();

  const foundProduct = allProducts.find(
    product => product.namespaceId === itemId || product.id === itemId,
  );

  if (!foundProduct) {
    throw new Error(`Product with ID ${itemId} not found`);
  }

  return foundProduct;
};

export const getProducts = async (): Promise<ProductDetails[]> => {
  return loadAllProducts();
};

export const getProductsByCategory = async (
  category: string,
): Promise<ProductDetails[]> => {
  const allProducts = await loadAllProducts();

  return allProducts.filter(product => product.category === category);
};

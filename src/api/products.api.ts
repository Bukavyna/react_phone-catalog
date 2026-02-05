import { ProductDetailsType } from '../types/product-details.types';
import { client } from './client';

const BASE = import.meta.env.BASE_URL;

const ACCESSORIES_URL = `${BASE}api/accessories.json`;
const PHONES_URL = `${BASE}api/phones.json`;
const TABLETS_URL = `${BASE}api/tablets.json`;

let allProductsCache: ProductDetailsType[] | null = null;

const loadAllProducts = async (): Promise<ProductDetailsType[]> => {
  if (allProductsCache) {
    return allProductsCache;
  }

  const [accessories, phones, tablets] = await Promise.all([
    client<ProductDetailsType[]>(ACCESSORIES_URL),
    client<ProductDetailsType[]>(PHONES_URL),
    client<ProductDetailsType[]>(TABLETS_URL),
  ]);

  allProductsCache = [...accessories, ...phones, ...tablets];

  return allProductsCache;
};

export const getProductDetails = async (
  itemId: string,
): Promise<ProductDetailsType> => {
  const allProducts = await loadAllProducts();

  const foundProduct = allProducts.find(
    product => product.namespaceId === itemId || product.id === itemId,
  );

  if (!foundProduct) {
    throw new Error(`Product with ID ${itemId} not found`);
  }

  return foundProduct;
};

export const getProducts = async (
  category?: string,
): Promise<ProductDetailsType[]> => {
  const allProducts = await loadAllProducts();

  if (!category) {
    return allProducts;
  }

  return allProducts.filter(product => product.category === category);
};

import { Product, ProductDetails } from '../types/product.types';
import { client } from './client';

const BASE = import.meta.env.BASE_URL;

const PRODUCTS_URL = `${BASE}api/products.json`;
const ACCESSORIES_URL = `${BASE}api/accessories.json`;
const PHONES_URL = `${BASE}api/phones.json`;
const TABLETS_URL = `${BASE}api/tablets.json`;

export const getProducts = async (category?: string): Promise<Product[]> => {
  try {
    const url = category ? `${BASE}api/${category}.json` : PRODUCTS_URL;

    return await client<Product[]>(url);
  } catch (error) {
    throw error;
  }
};

export const getProductDetails = async (itemId: string, category?: string) => {
  if (category) {
    const url =
      category === 'phones'
        ? PHONES_URL
        : category === 'tablets'
          ? TABLETS_URL
          : ACCESSORIES_URL;

    const products = await client<ProductDetails[]>(url);
    const product = products.find(
      prod => prod.namespaceId === itemId || prod.id === itemId,
    );

    if (!product) {
      throw new Error(`Product with ID ${itemId} not found`);
    }

    return product;
  }

  const [accessories, phones, tablets] = await Promise.all([
    client<ProductDetails[]>(ACCESSORIES_URL),
    client<ProductDetails[]>(PHONES_URL),
    client<ProductDetails[]>(TABLETS_URL),
  ]);

  const all = [...accessories, ...phones, ...tablets];

  const product = all.find(
    prod => prod.namespaceId === itemId || prod.id === itemId,
  );

  if (!product) {
    throw new Error(`Product with ID ${itemId} not found`);
  }

  return product;
};

export const getProductsByCategory = async (category: string) => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

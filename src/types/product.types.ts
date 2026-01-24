export interface Product {
  id: string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;

  priceDiscount: number;
  priceRegular: number;

  images: string[];
}

export interface ProductDescriptionBlock {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  capacity: string;
  capacityAvailable: string[];
  color: string;
  colorsAvailable: string[];
  images: string[];
  description: ProductDescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell?: string[];
  year?: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface FavoriteItem {
  id: string;
}

export enum SortType {
  Newest = 'none',
  Alphabetically = 'name',
  Cheapest = 'price',
  HotPrices = 'hotPrices',
}

export enum ProductsPreset {
  Newest = 'newest',
  HotPrices = 'hotPrices',
}

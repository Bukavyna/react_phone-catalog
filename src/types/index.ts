export interface Product {
  id: number;
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
}

export type SortableField = 'name' | 'price' | 'year';

export type SortOrder = 'asc' | 'desc';

export interface CartItem {
  id: string;
  quantity: number;
}

export interface FavoriteItem {
  id: string;
}

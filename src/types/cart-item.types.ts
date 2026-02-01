import { Product } from './product.types';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

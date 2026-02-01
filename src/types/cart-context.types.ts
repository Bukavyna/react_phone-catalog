import { CartItem } from './cart-item.types';
import { Product } from './product.types';

export interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
}

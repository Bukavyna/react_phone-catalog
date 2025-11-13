import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItem } from '../../types';

const CART_STORAGE_KEY = 'cart';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

// const defaultContextValue: CartContextType = {
//   cart: [],
//   cartCount: 0,
//   addToCart: () => {},
//   removeFromCart: () => {},
//   updateQuantity: () => {},
//   clearCart: () => {},
// };

const CartContext = createContext<CartContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);

  useEffect(() => {
    if (!Array.isArray(cart)) {
      setCart([]);
    }
  }, [cart, setCart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (itemToAdd: CartItem, quantityToAdd = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === itemToAdd.id);

      if (existingItem) {
        return currentCart.map(item =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [...currentCart, { ...itemToAdd, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCart(currentCart => {
      if (newQuantity <= 0 || Number.isNaN(newQuantity)) {
        return currentCart.filter(item => item.id !== itemId);
      }

      return currentCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue: CartContextType = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

import React, { createContext, useEffect } from 'react';

import { CartContextType } from '../../types/cart-context.types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/product.types';
import { CartItem } from '../../types/cart-item.types';

const CART_STORAGE_KEY = 'cart';

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);

  useEffect(() => {
    if (!Array.isArray(cart)) {
      setCart([]);
    }
  }, [cart, setCart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, quantityToAdd = 1) => {
    setCart(currentCart => {
      const existing = currentCart.find(item => item.id === product.id);

      if (existing) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          quantity: quantityToAdd,
          product: product,
        },
      ];
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

  const isInCart = (itemId: string) => {
    return cart.some(item => item.id === itemId);
  };

  const contextValue: CartContextType = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

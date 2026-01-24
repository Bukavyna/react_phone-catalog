import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItem, Product } from '../../types/product.types';

const CART_STORAGE_KEY = 'cart';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  // addToCart: (item: CartItem) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
}

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

  const addToCart = (product: Product, quantityToAdd = 1) => {
    setCart(currentCart => {
      const existing = currentCart.find(item => item.id === product.itemId);

      if (existing) {
        return currentCart.map(item =>
          item.id === product.itemId
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          id: product.itemId,
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

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

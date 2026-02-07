'use client';

/**
 * Cart Context and Hooks
 * Requirements: 3.1, 14.1, 14.2, 14.5, 14.6
 * 
 * Provides cart state management with session storage persistence
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/lib/types';
import { calculateCartTotal } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
}

// ============================================================================
// Context
// ============================================================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from session storage on mount
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from session storage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to session storage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Calculate totals
  const { subtotal, tax, total } = calculateCartTotal(items);

  // Calculate total item count
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Add item to cart or increment quantity if already exists
   * Requirement 14.1: Cart state maintenance
   */
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.menuItemId === item.menuItemId
      );

      if (existingItem) {
        // Increment quantity if item already in cart
        return prevItems.map((i) =>
          i.menuItemId === item.menuItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  /**
   * Remove item from cart
   * Requirement 14.2: Cart item removal
   */
  const removeFromCart = (menuItemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.menuItemId !== menuItemId)
    );
  };

  /**
   * Update item quantity
   * Requirement 14.6: Quantity adjustment
   */
  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setItems([]);
  };

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access cart context
 * Requirements: 3.1, 14.1, 14.2, 14.5, 14.6
 * 
 * @throws Error if used outside CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

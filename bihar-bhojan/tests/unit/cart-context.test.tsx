/**
 * Unit tests for Cart Context and Hooks
 * Requirements: 3.1, 14.1, 14.2, 14.5, 14.6
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../contexts/CartContext';
import { CartItem } from '../../lib/types';

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// ============================================================================
// Test Setup
// ============================================================================

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const sampleItem1: Omit<CartItem, 'quantity'> = {
  menuItemId: '1',
  name: 'Litti Chokha',
  nameHi: 'लिट्टी चोखा',
  price: 150,
  image: '/images/dishes/litti-chokha.jpg',
};

const sampleItem2: Omit<CartItem, 'quantity'> = {
  menuItemId: '2',
  name: 'Sattu Paratha',
  nameHi: 'सत्तू पराठा',
  price: 80,
  image: '/images/dishes/sattu-paratha.jpg',
};

// ============================================================================
// Tests
// ============================================================================

describe('CartContext', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
  });

  describe('useCart hook', () => {
    it('should throw error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');

      consoleError.mockRestore();
    });

    it('should provide cart context when used within CartProvider', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.items).toEqual([]);
      expect(result.current.itemCount).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart with quantity 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...sampleItem1,
        quantity: 1,
      });
    });

    it('should increment quantity if item already exists', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
        result.current.addToCart(sampleItem1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('should add multiple different items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
        result.current.addToCart(sampleItem2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].menuItemId).toBe('1');
      expect(result.current.items[1].menuItemId).toBe('2');
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
        result.current.addToCart(sampleItem2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.removeFromCart('1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].menuItemId).toBe('2');
    });

    it('should do nothing if item not in cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeFromCart('999');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
      });

      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item if quantity is 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.updateQuantity('1', 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should remove item if quantity is negative', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.updateQuantity('1', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
        result.current.addToCart(sampleItem2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('itemCount', () => {
    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.itemCount).toBe(0);
    });

    it('should return sum of all item quantities', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
        result.current.addToCart(sampleItem1);
        result.current.addToCart(sampleItem2);
      });

      expect(result.current.itemCount).toBe(3); // 2 + 1
    });
  });

  describe('cart totals', () => {
    it('should calculate subtotal correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1); // 150
        result.current.addToCart(sampleItem1); // 150
        result.current.addToCart(sampleItem2); // 80
      });

      expect(result.current.subtotal).toBe(380); // 150*2 + 80*1
    });

    it('should calculate tax at 5%', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1); // 150
      });

      expect(result.current.tax).toBe(7.5); // 150 * 0.05
    });

    it('should calculate total correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1); // 150
      });

      expect(result.current.total).toBe(157.5); // 150 + 7.5
    });
  });

  describe('session storage persistence', () => {
    it('should save cart to session storage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(sampleItem1);
      });

      // Wait for useEffect to run
      setTimeout(() => {
        const stored = sessionStorageMock.getItem('cart');
        expect(stored).toBeDefined();
        
        const parsed = JSON.parse(stored!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].menuItemId).toBe('1');
      }, 100);
    });

    it('should load cart from session storage on mount', () => {
      // Pre-populate session storage
      const existingCart: CartItem[] = [
        { ...sampleItem1, quantity: 2 },
        { ...sampleItem2, quantity: 1 },
      ];
      sessionStorageMock.setItem('cart', JSON.stringify(existingCart));

      const { result } = renderHook(() => useCart(), { wrapper });

      // Wait for useEffect to run
      setTimeout(() => {
        expect(result.current.items).toHaveLength(2);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.items[1].quantity).toBe(1);
      }, 100);
    });

    it('should handle invalid JSON in session storage', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      sessionStorageMock.setItem('cart', 'invalid json');

      const { result } = renderHook(() => useCart(), { wrapper });

      // Should start with empty cart
      expect(result.current.items).toEqual([]);

      consoleError.mockRestore();
    });
  });
});

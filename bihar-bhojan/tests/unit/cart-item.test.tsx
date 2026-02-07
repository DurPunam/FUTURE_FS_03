/**
 * Unit tests for CartItem component
 * Requirements: 14.6, 14.2
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import CartItem from '@/components/cart/CartItem';
import { CartItem as CartItemType } from '@/lib/types';

// Mock the CartContext
const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();

vi.mock('@/contexts/CartContext', () => ({
  useCart: () => ({
    updateQuantity: mockUpdateQuantity,
    removeFromCart: mockRemoveFromCart,
  }),
}));

// Mock translations
const messages = {
  cart: {
    title: 'Your Cart',
  },
};

// Helper function to render with providers
function renderCartItem(item: CartItemType) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <CartItem item={item} />
    </NextIntlClientProvider>
  );
}

describe('CartItem Component', () => {
  const mockItem: CartItemType = {
    menuItemId: '1',
    name: 'Litti Chokha',
    nameHi: 'लिट्टी चोखा',
    price: 120,
    quantity: 2,
    image: '/images/dishes/litti-chokha.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render item image with correct src and alt text', () => {
      renderCartItem(mockItem);
      const image = screen.getByAltText('Litti Chokha');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/dishes/litti-chokha.jpg');
    });

    it('should render item name', () => {
      renderCartItem(mockItem);
      expect(screen.getByText('Litti Chokha')).toBeInTheDocument();
    });

    it('should render item price', () => {
      renderCartItem(mockItem);
      expect(screen.getByText('₹120.00')).toBeInTheDocument();
    });

    it('should render current quantity', () => {
      renderCartItem(mockItem);
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should render item total (price × quantity)', () => {
      renderCartItem(mockItem);
      expect(screen.getByText('₹240.00')).toBeInTheDocument();
    });

    it('should render increment button', () => {
      renderCartItem(mockItem);
      const incrementButton = screen.getByLabelText('Increase quantity');
      expect(incrementButton).toBeInTheDocument();
    });

    it('should render decrement button', () => {
      renderCartItem(mockItem);
      const decrementButton = screen.getByLabelText('Decrease quantity');
      expect(decrementButton).toBeInTheDocument();
    });

    it('should render remove button', () => {
      renderCartItem(mockItem);
      const removeButton = screen.getByLabelText('Remove Litti Chokha from cart');
      expect(removeButton).toBeInTheDocument();
    });
  });

  describe('Quantity Controls', () => {
    it('should call updateQuantity with incremented value when increment button is clicked', async () => {
      const user = userEvent.setup();
      renderCartItem(mockItem);
      
      const incrementButton = screen.getByLabelText('Increase quantity');
      await user.click(incrementButton);
      
      expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3);
      expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
    });

    it('should call updateQuantity with decremented value when decrement button is clicked', async () => {
      const user = userEvent.setup();
      renderCartItem(mockItem);
      
      const decrementButton = screen.getByLabelText('Decrease quantity');
      await user.click(decrementButton);
      
      expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 1);
      expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
    });

    it('should disable decrement button when quantity is 1', () => {
      const itemWithQuantityOne: CartItemType = {
        ...mockItem,
        quantity: 1,
      };
      renderCartItem(itemWithQuantityOne);
      
      const decrementButton = screen.getByLabelText('Decrease quantity');
      expect(decrementButton).toBeDisabled();
    });

    it('should not disable decrement button when quantity is greater than 1', () => {
      renderCartItem(mockItem);
      
      const decrementButton = screen.getByLabelText('Decrease quantity');
      expect(decrementButton).not.toBeDisabled();
    });

    it('should not call updateQuantity when decrement button is clicked at quantity 1', async () => {
      const user = userEvent.setup();
      const itemWithQuantityOne: CartItemType = {
        ...mockItem,
        quantity: 1,
      };
      renderCartItem(itemWithQuantityOne);
      
      const decrementButton = screen.getByLabelText('Decrease quantity');
      await user.click(decrementButton);
      
      expect(mockUpdateQuantity).not.toHaveBeenCalled();
    });

    it('should handle multiple increment clicks', async () => {
      const user = userEvent.setup();
      renderCartItem(mockItem);
      
      const incrementButton = screen.getByLabelText('Increase quantity');
      await user.click(incrementButton);
      await user.click(incrementButton);
      
      expect(mockUpdateQuantity).toHaveBeenCalledTimes(2);
      expect(mockUpdateQuantity).toHaveBeenNthCalledWith(1, '1', 3);
      expect(mockUpdateQuantity).toHaveBeenNthCalledWith(2, '1', 3);
    });
  });

  describe('Remove Item', () => {
    it('should call removeFromCart with correct menuItemId when remove button is clicked', async () => {
      const user = userEvent.setup();
      renderCartItem(mockItem);
      
      const removeButton = screen.getByLabelText('Remove Litti Chokha from cart');
      await user.click(removeButton);
      
      expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
      expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('Price Calculations', () => {
    it('should display correct total for quantity 1', () => {
      const itemWithQuantityOne: CartItemType = {
        ...mockItem,
        quantity: 1,
      };
      renderCartItem(itemWithQuantityOne);
      
      // When quantity is 1, both price and total are the same
      const prices = screen.getAllByText('₹120.00');
      expect(prices).toHaveLength(2); // Unit price and total
    });

    it('should display correct total for quantity 5', () => {
      const itemWithQuantityFive: CartItemType = {
        ...mockItem,
        quantity: 5,
      };
      renderCartItem(itemWithQuantityFive);
      
      expect(screen.getByText('₹600.00')).toBeInTheDocument();
    });

    it('should display correct total for different price', () => {
      const expensiveItem: CartItemType = {
        ...mockItem,
        price: 250,
        quantity: 3,
      };
      renderCartItem(expensiveItem);
      
      expect(screen.getByText('₹750.00')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      renderCartItem(mockItem);
      
      expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
      expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
      expect(screen.getByLabelText('Remove Litti Chokha from cart')).toBeInTheDocument();
    });

    it('should have proper disabled state styling', () => {
      const itemWithQuantityOne: CartItemType = {
        ...mockItem,
        quantity: 1,
      };
      renderCartItem(itemWithQuantityOne);
      
      const decrementButton = screen.getByLabelText('Decrease quantity');
      expect(decrementButton).toHaveClass('disabled:opacity-50');
      expect(decrementButton).toHaveClass('disabled:cursor-not-allowed');
    });

    it('should have image alt text', () => {
      renderCartItem(mockItem);
      const image = screen.getByAltText('Litti Chokha');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle item with long name', () => {
      const itemWithLongName: CartItemType = {
        ...mockItem,
        name: 'Very Long Dish Name That Should Be Handled Properly',
      };
      renderCartItem(itemWithLongName);
      
      expect(screen.getByText('Very Long Dish Name That Should Be Handled Properly')).toBeInTheDocument();
    });

    it('should handle item with zero price', () => {
      const freeItem: CartItemType = {
        ...mockItem,
        price: 0,
        quantity: 1,
      };
      renderCartItem(freeItem);
      
      // When price is 0, both unit price and total are ₹0.00
      const prices = screen.getAllByText('₹0.00');
      expect(prices).toHaveLength(2); // Unit price and total
    });

    it('should handle large quantity', () => {
      const itemWithLargeQuantity: CartItemType = {
        ...mockItem,
        quantity: 99,
      };
      renderCartItem(itemWithLargeQuantity);
      
      expect(screen.getByText('99')).toBeInTheDocument();
      expect(screen.getByText('₹11,880.00')).toBeInTheDocument();
    });
  });
});

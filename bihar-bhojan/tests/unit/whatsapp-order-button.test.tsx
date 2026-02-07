/**
 * Unit tests for WhatsAppOrderButton component
 * Requirements: 3.2, 3.3, 3.4, 3.6
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import WhatsAppOrderButton from '@/components/cart/WhatsAppOrderButton';
import { CartProvider } from '@/contexts/CartContext';
import { CartItem } from '@/lib/types';

// Mock translations
const messages = {
  whatsapp: {
    orderButton: 'Order via WhatsApp',
    form: {
      title: 'Complete Your Order',
      subtitle: 'Enter your details to place order via WhatsApp',
      name: 'Your Name',
      namePlaceholder: 'Enter your full name',
      phone: 'Phone Number',
      phonePlaceholder: '10-digit mobile number',
      address: 'Delivery Address',
      addressPlaceholder: 'Enter your complete delivery address',
      cancel: 'Cancel',
      submit: 'Send Order',
      sending: 'Sending...',
    },
  },
  cart: {
    title: 'Your Cart',
    close: 'Close cart',
    subtotal: 'Subtotal',
    tax: 'Tax (5%)',
    total: 'Total',
    checkout: 'Proceed to Order',
    empty: {
      title: 'Your cart is empty',
      message: 'Add some delicious dishes to get started!',
      browseMenu: 'Browse Menu',
    },
  },
};

// Helper to render component with providers
function renderWithProviders(ui: React.ReactElement, { locale = 'en' } = {}) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CartProvider>{ui}</CartProvider>
    </NextIntlClientProvider>
  );
}

// Mock window.open
const mockWindowOpen = vi.fn();
window.open = mockWindowOpen;

describe('WhatsAppOrderButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear session storage before each test
    sessionStorage.clear();
  });

  describe('Initial State', () => {
    it('should render the order button', () => {
      renderWithProviders(<WhatsAppOrderButton restaurantWhatsApp="9876543210" />);

      const button = screen.getByRole('button', { name: /order via whatsapp/i });
      expect(button).toBeInTheDocument();
    });

    it('should display WhatsApp icon on button', () => {
      renderWithProviders(<WhatsAppOrderButton restaurantWhatsApp="9876543210" />);

      const button = screen.getByRole('button', { name: /order via whatsapp/i });
      // Check for icon by looking for svg element
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Cart Empty State - Requirement 3.6', () => {
    it('should disable button when cart is empty', () => {
      renderWithProviders(<WhatsAppOrderButton restaurantWhatsApp="9876543210" />);

      const button = screen.getByRole('button', { name: /order via whatsapp/i });
      expect(button).toBeDisabled();
    });

    it('should have gray appearance when disabled', () => {
      renderWithProviders(<WhatsAppOrderButton restaurantWhatsApp="9876543210" />);

      const button = screen.getByRole('button', { name: /order via whatsapp/i });
      expect(button).toHaveClass('bg-gray-300');
      expect(butt
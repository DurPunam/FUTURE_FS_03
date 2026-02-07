/**
 * Unit tests for Cart component
 * Requirements: 14.4, 14.7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Cart from '@/components/cart/Cart';
import { CartProvider } from '@/contexts/CartContext';
import { NextIntlClientProvider } from 'next-intl';
import { CartItem } from '@/lib/types';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// ============================================================================
// Test Data
// ============================================================================

const mockCartItems: CartItem[] = [
  {
    menuItemId: 'item-1',
    name: 'Litti Chokha',
    nameHi: 'लिट्टी चोखा',
    price: 150,
    quantity: 2,
    image: '/images/dishes/litti-chokha.jpg',
  },
  {
    menuItemId: 'item-2',
    name: 'Sattu Paratha',
    nameHi: 'सत्तू पराठा',
    price: 80,
    quantity: 1,
    image: '/images/dishes/sattu-paratha.jpg',
  },
];

// English translations
const enMessages = {
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

// Hindi translations
const hiMessages = {
  cart: {
    title: 'आपका कार्ट',
    close: 'कार्ट बंद करें',
    subtotal: 'उप-योग',
    tax: 'कर (5%)',
    total: 'कुल',
    checkout: 'ऑर्डर करें',
    empty: {
      title: 'आपका कार्ट खाली है',
      message: 'शुरू करने के लिए कुछ स्वादिष्ट व्यंजन जोड़ें!',
      browseMenu: 'मेनू देखें',
    },
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

function renderWithProviders(
  component: React.ReactElement,
  locale: 'en' | 'hi' = 'en',
  initialCart: CartItem[] = []
) {
  const messages = locale === 'en' ? enMessages : hiMessages;

  // Pre-populate session storage if initial cart provided
  if (initialCart.length > 0) {
    sessionStorage.setItem('cart', JSON.stringify(initialCart));
  }

  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CartProvider>{component}</CartProvider>
    </NextIntlClientProvider>
  );
}

// ============================================================================
// Tests
// ============================================================================

describe('Cart Component', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  describe('Visibility and Animation', () => {
    it('should not render when isOpen is false', () => {
      renderWithProviders(<Cart isOpen={false} onClose={() => {}} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      renderWithProviders(<Cart isOpen={true} onClose={() => {}} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes', () => {
      renderWithProviders(<Cart isOpen={true} onClose={() => {}} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'cart-title');
    });
  });

  describe('Header', () => {
    it('should display cart title with item count', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      // Total items: 2 + 1 = 3
      expect(screen.getByText(/Your Cart \(3\)/i)).toBeInTheDocument();
    });

    it('should display close button', () => {
      const onClose = vi.fn();
      renderWithProviders(<Cart isOpen={true} onClose={onClose} />);

      const closeButton = screen.getByLabelText('Close cart');
      expect(closeButton).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = vi.fn();
      renderWithProviders(<Cart isOpen={true} onClose={onClose} />);

      const closeButton = screen.getByLabelText('Close cart');
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', () => {
      const onClose = vi.fn();
      const { container } = renderWithProviders(
        <Cart isOpen={true} onClose={onClose} />
      );

      // Find backdrop (the div with bg-black/50)
      const backdrop = container.querySelector('.bg-black\\/50');
      expect(backdrop).toBeInTheDocument();

      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Empty Cart State', () => {
    it('should display empty cart message when cart is empty', () => {
      renderWithProviders(<Cart isOpen={true} onClose={() => {}} />);

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(
        screen.getByText('Add some delicious dishes to get started!')
      ).toBeInTheDocument();
    });

    it('should display browse menu button in empty state', () => {
      const onClose = vi.fn();
      renderWithProviders(<Cart isOpen={true} onClose={onClose} />);

      const browseButton = screen.getByRole('button', {
        name: /browse menu/i,
      });
      expect(browseButton).toBeInTheDocument();
    });

    it('should close cart when browse menu button is clicked', () => {
      const onClose = vi.fn();
      renderWithProviders(<Cart isOpen={true} onClose={onClose} />);

      const browseButton = screen.getByRole('button', {
        name: /browse menu/i,
      });
      fireEvent.click(browseButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not display totals section when cart is empty', () => {
      renderWithProviders(<Cart isOpen={true} onClose={() => {}} />);

      expect(screen.queryByText('Subtotal')).not.toBeInTheDocument();
      expect(screen.queryByText('Tax (5%)')).not.toBeInTheDocument();
      expect(screen.queryByText('Total')).not.toBeInTheDocument();
    });
  });

  describe('Cart Items Display', () => {
    it('should display all cart items', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      expect(screen.getByText('Litti Chokha')).toBeInTheDocument();
      expect(screen.getByText('Sattu Paratha')).toBeInTheDocument();
    });

    it('should display item images', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      const littiImage = screen.getByAltText('Litti Chokha');
      const sattuImage = screen.getByAltText('Sattu Paratha');

      expect(littiImage).toBeInTheDocument();
      expect(sattuImage).toBeInTheDocument();
      expect(littiImage).toHaveAttribute(
        'src',
        '/images/dishes/litti-chokha.jpg'
      );
      expect(sattuImage).toHaveAttribute(
        'src',
        '/images/dishes/sattu-paratha.jpg'
      );
    });

    it('should display item prices and quantities', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      // Item 1: ₹150.00 price and quantity 2
      expect(screen.getByText('₹150.00')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      // Item 2: ₹80.00 price and quantity 1
      expect(screen.getByText('₹80.00')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should display item totals', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      // Item 1 total: ₹150 × 2 = ₹300
      expect(screen.getByText('₹300.00')).toBeInTheDocument();
      // Item 2 total: ₹80 × 1 = ₹80
      expect(screen.getByText('₹80.00')).toBeInTheDocument();
    });
  });

  describe('Totals Calculation', () => {
    it('should display correct subtotal', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      // Subtotal: (150 × 2) + (80 × 1) = 380
      const subtotalElements = screen.getAllByText('₹380.00');
      expect(subtotalElements.length).toBeGreaterThan(0);
    });

    it('should display correct tax (5%)', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      // Tax: 380 × 0.05 = 19
      expect(screen.getByText('₹19.00')).toBeInTheDocument();
    });

    it('should display correct total', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      // Total: 380 + 19 = 399
      expect(screen.getByText('₹399.00')).toBeInTheDocument();
    });

    it('should display totals section labels', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('Tax (5%)')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
    });

    it('should display checkout button when cart has items', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        mockCartItems
      );

      const checkoutButton = screen.getByRole('button', {
        name: /proceed to order/i,
      });
      expect(checkoutButton).toBeInTheDocument();
    });
  });

  describe('Localization', () => {
    it('should display Hindi title and labels', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'hi',
        mockCartItems
      );

      expect(screen.getByText(/आपका कार्ट/i)).toBeInTheDocument();
      expect(screen.getByText('उप-योग')).toBeInTheDocument();
      expect(screen.getByText('कर (5%)')).toBeInTheDocument();
      expect(screen.getByText('कुल')).toBeInTheDocument();
    });

    it('should display Hindi empty state messages', () => {
      renderWithProviders(<Cart isOpen={true} onClose={() => {}} />, 'hi');

      expect(screen.getByText('आपका कार्ट खाली है')).toBeInTheDocument();
      expect(
        screen.getByText('शुरू करने के लिए कुछ स्वादिष्ट व्यंजन जोड़ें!')
      ).toBeInTheDocument();
    });

    it('should display Hindi button labels', () => {
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'hi',
        mockCartItems
      );

      expect(
        screen.getByRole('button', { name: /ऑर्डर करें/i })
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle single item in cart', () => {
      const singleItem: CartItem[] = [mockCartItems[0]];
      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        singleItem
      );

      expect(screen.getByText(/Your Cart \(2\)/i)).toBeInTheDocument(); // 2 quantity
      expect(screen.getByText('Litti Chokha')).toBeInTheDocument();
    });

    it('should handle items with quantity 1', () => {
      const item: CartItem[] = [
        {
          menuItemId: 'item-1',
          name: 'Test Item',
          nameHi: 'टेस्ट आइटम',
          price: 100,
          quantity: 1,
          image: '/test.jpg',
        },
      ];

      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        item
      );

      expect(screen.getByText('₹100.00')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should handle items with high quantities', () => {
      const item: CartItem[] = [
        {
          menuItemId: 'item-1',
          name: 'Test Item',
          nameHi: 'टेस्ट आइटम',
          price: 50,
          quantity: 10,
          image: '/test.jpg',
        },
      ];

      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        item
      );

      expect(screen.getByText('₹50.00')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      // ₹500.00 appears twice (item total and subtotal), so use getAllByText
      const amounts = screen.getAllByText('₹500.00');
      expect(amounts.length).toBeGreaterThan(0);
    });

    it('should handle items with decimal prices', () => {
      const item: CartItem[] = [
        {
          menuItemId: 'item-1',
          name: 'Test Item',
          nameHi: 'टेस्ट आइटम',
          price: 99.99,
          quantity: 1,
          image: '/test.jpg',
        },
      ];

      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        item
      );

      expect(screen.getByText('₹99.99')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should handle long item names gracefully', () => {
      const item: CartItem[] = [
        {
          menuItemId: 'item-1',
          name: 'This is a very long item name that should be truncated',
          nameHi: 'यह एक बहुत लंबा नाम है',
          price: 100,
          quantity: 1,
          image: '/test.jpg',
        },
      ];

      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        item
      );

      // Check that the name is displayed (truncation is handled by CSS in CartItem)
      expect(
        screen.getByText(
          'This is a very long item name that should be truncated'
        )
      ).toBeInTheDocument();
    });

    it('should handle cart with zero total (free items)', () => {
      const item: CartItem[] = [
        {
          menuItemId: 'item-1',
          name: 'Free Item',
          nameHi: 'मुफ्त आइटम',
          price: 0,
          quantity: 1,
          image: '/test.jpg',
        },
      ];

      renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />,
        'en',
        item
      );

      // Subtotal, tax, and total should all be 0
      const zeroAmounts = screen.getAllByText('₹0.00');
      expect(zeroAmounts.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should have full width on mobile', () => {
      const { container } = renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />
      );

      const cartPanel = screen.getByRole('dialog');
      expect(cartPanel).toHaveClass('w-full');
    });

    it('should have fixed width on desktop', () => {
      const { container } = renderWithProviders(
        <Cart isOpen={true} onClose={() => {}} />
      );

      const cartPanel = screen.getByRole('dialog');
      expect(cartPanel).toHaveClass('sm:w-96');
    });
  });
});

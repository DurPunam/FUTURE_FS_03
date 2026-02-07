/**
 * Unit tests for MenuItemCard component
 * Requirements: 4.5, 4.3, 7.4
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { MenuItem } from '@/lib/types';
import { CartProvider } from '@/contexts/CartContext';
import { NextIntlClientProvider } from 'next-intl';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// ============================================================================
// Test Data
// ============================================================================

const mockMenuItem: MenuItem = {
  id: 'test-1',
  name: 'Test Dish',
  nameHi: 'टेस्ट डिश',
  description: 'A delicious test dish',
  descriptionHi: 'एक स्वादिष्ट टेस्ट डिश',
  price: 199,
  category: 'thali',
  image: '/images/dishes/test-dish.jpg',
  isVeg: true,
  spiceLevel: 'medium',
  isAvailable: true,
  featured: false,
};

const mockVegMenuItem: MenuItem = {
  ...mockMenuItem,
  isVeg: true,
};

const mockNonVegMenuItem: MenuItem = {
  ...mockMenuItem,
  id: 'test-2',
  name: 'Non-Veg Dish',
  nameHi: 'मांसाहारी डिश',
  isVeg: false,
};

const mockUnavailableMenuItem: MenuItem = {
  ...mockMenuItem,
  id: 'test-3',
  isAvailable: false,
};

const mockFeaturedMenuItem: MenuItem = {
  ...mockMenuItem,
  id: 'test-4',
  featured: true,
};

const mockNoSpiceMenuItem: MenuItem = {
  ...mockMenuItem,
  id: 'test-5',
  spiceLevel: undefined,
};

// English translations
const enMessages = {
  menu: {
    addToCart: 'Add to Cart',
    featured: 'Featured',
    unavailable: 'Unavailable',
    vegetarian: 'Vegetarian',
    nonVegetarian: 'Non-Vegetarian',
  },
};

// Hindi translations
const hiMessages = {
  menu: {
    addToCart: 'कार्ट में जोड़ें',
    featured: 'विशेष',
    unavailable: 'उपलब्ध नहीं',
    vegetarian: 'शाकाहारी',
    nonVegetarian: 'मांसाहारी',
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

function renderWithProviders(
  component: React.ReactElement,
  locale: 'en' | 'hi' = 'en'
) {
  const messages = locale === 'en' ? enMessages : hiMessages;
  
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CartProvider>{component}</CartProvider>
    </NextIntlClientProvider>
  );
}

// ============================================================================
// Tests
// ============================================================================

describe('MenuItemCard', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  describe('Basic Rendering', () => {
    it('should render menu item with name, description, and price', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      expect(screen.getByText('Test Dish')).toBeInTheDocument();
      expect(screen.getByText('A delicious test dish')).toBeInTheDocument();
      expect(screen.getByText('₹199')).toBeInTheDocument();
    });

    it('should render menu item image with correct alt text', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      const image = screen.getByAltText('Test Dish');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/dishes/test-dish.jpg');
    });

    it('should render add to cart button', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });

  describe('Localization', () => {
    it('should display English name and description when locale is en', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />, 'en');

      expect(screen.getByText('Test Dish')).toBeInTheDocument();
      expect(screen.getByText('A delicious test dish')).toBeInTheDocument();
    });

    it('should display Hindi name and description when locale is hi', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />, 'hi');

      expect(screen.getByText('टेस्ट डिश')).toBeInTheDocument();
      expect(screen.getByText('एक स्वादिष्ट टेस्ट डिश')).toBeInTheDocument();
    });

    it('should display localized button text', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />, 'hi');

      expect(screen.getByRole('button', { name: /कार्ट में जोड़ें/i })).toBeInTheDocument();
    });
  });

  describe('Dietary Indicators', () => {
    it('should display vegetarian indicator for veg items', () => {
      const { container } = renderWithProviders(
        <MenuItemCard item={mockVegMenuItem} />
      );

      // Check for green border (vegetarian indicator)
      const vegIndicator = container.querySelector('.border-green-600');
      expect(vegIndicator).toBeInTheDocument();
    });

    it('should display non-vegetarian indicator for non-veg items', () => {
      const { container } = renderWithProviders(
        <MenuItemCard item={mockNonVegMenuItem} />
      );

      // Check for red border (non-vegetarian indicator)
      const nonVegIndicator = container.querySelector('.border-red-600');
      expect(nonVegIndicator).toBeInTheDocument();
    });
  });

  describe('Spice Level Indicator', () => {
    it('should display spice level for items with spice level', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      expect(screen.getByText('🌶️🌶️')).toBeInTheDocument();
      expect(screen.getByText('medium')).toBeInTheDocument();
    });

    it('should display mild spice level correctly', () => {
      const mildItem = { ...mockMenuItem, spiceLevel: 'mild' as const };
      renderWithProviders(<MenuItemCard item={mildItem} />);

      expect(screen.getByText('🌶️')).toBeInTheDocument();
      expect(screen.getByText('mild')).toBeInTheDocument();
    });

    it('should display hot spice level correctly', () => {
      const hotItem = { ...mockMenuItem, spiceLevel: 'hot' as const };
      renderWithProviders(<MenuItemCard item={hotItem} />);

      expect(screen.getByText('🌶️🌶️🌶️')).toBeInTheDocument();
      expect(screen.getByText('hot')).toBeInTheDocument();
    });

    it('should not display spice level for items without spice level', () => {
      renderWithProviders(<MenuItemCard item={mockNoSpiceMenuItem} />);

      expect(screen.queryByText('🌶️')).not.toBeInTheDocument();
      expect(screen.queryByText(/mild|medium|hot/i)).not.toBeInTheDocument();
    });
  });

  describe('Featured Badge', () => {
    it('should display featured badge for featured items', () => {
      renderWithProviders(<MenuItemCard item={mockFeaturedMenuItem} />);

      expect(screen.getByText('Featured')).toBeInTheDocument();
    });

    it('should not display featured badge for non-featured items', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      expect(screen.queryByText('Featured')).not.toBeInTheDocument();
    });
  });

  describe('Availability', () => {
    it('should disable add to cart button for unavailable items', () => {
      renderWithProviders(<MenuItemCard item={mockUnavailableMenuItem} />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      expect(button).toBeDisabled();
    });

    it('should display unavailable overlay for unavailable items', () => {
      renderWithProviders(<MenuItemCard item={mockUnavailableMenuItem} />);

      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });

    it('should enable add to cart button for available items', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe('Add to Cart Functionality', () => {
    it('should add item to cart when button is clicked', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(button);

      // Check if item was added to session storage
      const cartData = sessionStorage.getItem('cart');
      expect(cartData).toBeTruthy();
      
      if (cartData) {
        const cart = JSON.parse(cartData);
        expect(cart).toHaveLength(1);
        expect(cart[0].menuItemId).toBe('test-1');
        expect(cart[0].name).toBe('Test Dish');
        expect(cart[0].price).toBe(199);
        expect(cart[0].quantity).toBe(1);
      }
    });

    it('should increment quantity when same item is added multiple times', () => {
      renderWithProviders(<MenuItemCard item={mockMenuItem} />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      
      // Add item twice
      fireEvent.click(button);
      fireEvent.click(button);

      const cartData = sessionStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(2);
      }
    });

    it('should not add unavailable items to cart', () => {
      renderWithProviders(<MenuItemCard item={mockUnavailableMenuItem} />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(button);

      // Cart should be empty or have empty array
      const cartData = sessionStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        expect(cart).toHaveLength(0);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with long names gracefully', () => {
      const longNameItem = {
        ...mockMenuItem,
        name: 'This is a very long dish name that should be truncated properly',
        nameHi: 'यह एक बहुत लंबा व्यंजन नाम है जिसे ठीक से काटा जाना चाहिए',
      };

      const { container } = renderWithProviders(
        <MenuItemCard item={longNameItem} />
      );

      // Check for line-clamp class
      const nameElement = container.querySelector('.line-clamp-1');
      expect(nameElement).toBeInTheDocument();
    });

    it('should handle items with long descriptions gracefully', () => {
      const longDescItem = {
        ...mockMenuItem,
        description:
          'This is a very long description that should be truncated to two lines to maintain consistent card heights across the grid layout',
      };

      const { container } = renderWithProviders(
        <MenuItemCard item={longDescItem} />
      );

      // Check for line-clamp class
      const descElement = container.querySelector('.line-clamp-2');
      expect(descElement).toBeInTheDocument();
    });

    it('should handle items with zero price', () => {
      const freeItem = { ...mockMenuItem, price: 0 };
      renderWithProviders(<MenuItemCard item={freeItem} />);

      expect(screen.getByText('₹0')).toBeInTheDocument();
    });

    it('should handle items with high prices', () => {
      const expensiveItem = { ...mockMenuItem, price: 9999 };
      renderWithProviders(<MenuItemCard item={expensiveItem} />);

      expect(screen.getByText('₹9999')).toBeInTheDocument();
    });
  });
});

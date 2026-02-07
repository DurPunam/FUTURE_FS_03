/**
 * Unit tests for CategoryFilter component
 * Requirements: 4.1
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { MenuCategory } from '@/lib/types';
import { NextIntlClientProvider } from 'next-intl';

// ============================================================================
// Mock translations
// ============================================================================

const messages = {
  menu: {
    categories: {
      all: 'All',
      thali: 'Thali',
      'ghar-ka-khana': 'Ghar Ka Khana',
      'street-delights': 'Street Delights',
      mithai: 'Mithai',
      'sattu-specials': 'Sattu Specials',
    },
  },
};

// ============================================================================
// Helper function to render with providers
// ============================================================================

function renderWithIntl(
  ui: React.ReactElement,
  locale: 'en' | 'hi' = 'en'
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

// ============================================================================
// Tests
// ============================================================================

describe('CategoryFilter', () => {
  describe('Rendering', () => {
    it('should render all category buttons', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      // Check that all category buttons are rendered
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Thali')).toBeInTheDocument();
      expect(screen.getByText('Ghar Ka Khana')).toBeInTheDocument();
      expect(screen.getByText('Street Delights')).toBeInTheDocument();
      expect(screen.getByText('Mithai')).toBeInTheDocument();
      expect(screen.getByText('Sattu Specials')).toBeInTheDocument();
    });

    it('should render 6 category buttons in total', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(6);
    });
  });

  describe('Active State', () => {
    it('should highlight the selected category', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="thali"
          onCategoryChange={mockOnChange}
        />
      );

      const thaliButton = screen.getByText('Thali');
      expect(thaliButton).toHaveClass('bg-[#D35400]');
      expect(thaliButton).toHaveClass('text-white');
    });

    it('should highlight "All" when selected', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      const allButton = screen.getByText('All');
      expect(allButton).toHaveClass('bg-[#D35400]');
      expect(allButton).toHaveClass('text-white');
    });

    it('should not highlight non-selected categories', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="thali"
          onCategoryChange={mockOnChange}
        />
      );

      const mithaiButton = screen.getByText('Mithai');
      expect(mithaiButton).not.toHaveClass('bg-[#D35400]');
      expect(mithaiButton).toHaveClass('bg-white');
    });

    it('should set aria-pressed to true for selected category', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="mithai"
          onCategoryChange={mockOnChange}
        />
      );

      const mithaiButton = screen.getByText('Mithai');
      expect(mithaiButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should set aria-pressed to false for non-selected categories', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="mithai"
          onCategoryChange={mockOnChange}
        />
      );

      const thaliButton = screen.getByText('Thali');
      expect(thaliButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('User Interactions', () => {
    it('should call onCategoryChange when a category is clicked', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      const thaliButton = screen.getByText('Thali');
      fireEvent.click(thaliButton);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('thali');
    });

    it('should call onCategoryChange with "all" when All is clicked', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="thali"
          onCategoryChange={mockOnChange}
        />
      );

      const allButton = screen.getByText('All');
      fireEvent.click(allButton);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('all');
    });

    it('should call onCategoryChange for each category', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      const categories: Array<{ label: string; value: MenuCategory }> = [
        { label: 'Thali', value: 'thali' },
        { label: 'Ghar Ka Khana', value: 'ghar-ka-khana' },
        { label: 'Street Delights', value: 'street-delights' },
        { label: 'Mithai', value: 'mithai' },
        { label: 'Sattu Specials', value: 'sattu-specials' },
      ];

      categories.forEach(({ label, value }) => {
        const button = screen.getByText(label);
        fireEvent.click(button);
        expect(mockOnChange).toHaveBeenCalledWith(value);
      });

      expect(mockOnChange).toHaveBeenCalledTimes(5);
    });

    it('should allow clicking the same category multiple times', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="thali"
          onCategoryChange={mockOnChange}
        />
      );

      const thaliButton = screen.getByText('Thali');
      fireEvent.click(thaliButton);
      fireEvent.click(thaliButton);

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenCalledWith('thali');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for each button', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      const thaliButton = screen.getByText('Thali');
      expect(thaliButton).toHaveAttribute('aria-label', 'Filter by Thali');
    });

    it('should be keyboard accessible', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      const thaliButton = screen.getByText('Thali');
      thaliButton.focus();
      expect(thaliButton).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('should handle all valid MenuCategory values', () => {
      const mockOnChange = vi.fn();
      const categories: Array<MenuCategory | 'all'> = [
        'all',
        'thali',
        'ghar-ka-khana',
        'street-delights',
        'mithai',
        'sattu-specials',
      ];

      categories.forEach((category) => {
        const { unmount } = renderWithIntl(
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={mockOnChange}
          />
        );
        
        // Should render without errors
        expect(screen.getAllByRole('button')).toHaveLength(6);
        
        unmount();
      });
    });

    it('should render correctly when selectedCategory changes', () => {
      const mockOnChange = vi.fn();
      const { rerender } = renderWithIntl(
        <CategoryFilter
          selectedCategory="all"
          onCategoryChange={mockOnChange}
        />
      );

      let allButton = screen.getByText('All');
      expect(allButton).toHaveClass('bg-[#D35400]');

      // Change selected category
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <CategoryFilter
            selectedCategory="thali"
            onCategoryChange={mockOnChange}
          />
        </NextIntlClientProvider>
      );

      const thaliButton = screen.getByText('Thali');
      expect(thaliButton).toHaveClass('bg-[#D35400]');
      
      allButton = screen.getByText('All');
      expect(allButton).not.toHaveClass('bg-[#D35400]');
    });
  });
});

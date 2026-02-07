/**
 * Unit tests for DietaryFilter component
 * Requirements: 4.2
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DietaryFilter } from '@/components/menu/DietaryFilter';
import type { DietaryPreference } from '@/components/menu/DietaryFilter';
import { NextIntlClientProvider } from 'next-intl';

// ============================================================================
// Mock translations
// ============================================================================

const messages = {
  menu: {
    dietary: {
      all: 'All',
      veg: 'Veg',
      'non-veg': 'Non-Veg',
      filterLabel: 'Dietary Preference',
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

describe('DietaryFilter', () => {
  describe('Rendering', () => {
    it('should render all dietary preference buttons', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      // Check that all dietary buttons are rendered
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Veg')).toBeInTheDocument();
      expect(screen.getByText('Non-Veg')).toBeInTheDocument();
    });

    it('should render 3 dietary preference buttons in total', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('should render the filter label', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      expect(screen.getByText('Dietary Preference')).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should highlight the selected dietary preference with correct color', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      expect(vegButton).toHaveClass('bg-[#27AE60]'); // Green for veg
      expect(vegButton).toHaveClass('text-white');
    });

    it('should highlight "All" with terracotta color when selected', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const allButton = screen.getByText('All');
      expect(allButton).toHaveClass('bg-[#D35400]'); // Terracotta for all
      expect(allButton).toHaveClass('text-white');
    });

    it('should highlight "Non-Veg" with red color when selected', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="non-veg"
          onDietaryChange={mockOnChange}
        />
      );

      const nonVegButton = screen.getByText('Non-Veg');
      expect(nonVegButton).toHaveClass('bg-[#DC2626]'); // Red for non-veg
      expect(nonVegButton).toHaveClass('text-white');
    });

    it('should not highlight non-selected dietary preferences', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const nonVegButton = screen.getByText('Non-Veg');
      expect(nonVegButton).not.toHaveClass('bg-[#DC2626]');
      expect(nonVegButton).toHaveClass('bg-white');
    });

    it('should set aria-pressed to true for selected dietary preference', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      expect(vegButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should set aria-pressed to false for non-selected dietary preferences', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const nonVegButton = screen.getByText('Non-Veg');
      expect(nonVegButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('User Interactions', () => {
    it('should call onDietaryChange when a dietary preference is clicked', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      fireEvent.click(vegButton);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('veg');
    });

    it('should call onDietaryChange with "all" when All is clicked', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const allButton = screen.getByText('All');
      fireEvent.click(allButton);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('all');
    });

    it('should call onDietaryChange with "non-veg" when Non-Veg is clicked', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const nonVegButton = screen.getByText('Non-Veg');
      fireEvent.click(nonVegButton);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('non-veg');
    });

    it('should call onDietaryChange for each dietary preference', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const preferences: Array<{ label: string; value: DietaryPreference }> = [
        { label: 'Veg', value: 'veg' },
        { label: 'Non-Veg', value: 'non-veg' },
      ];

      preferences.forEach(({ label, value }) => {
        const button = screen.getByText(label);
        fireEvent.click(button);
        expect(mockOnChange).toHaveBeenCalledWith(value);
      });

      expect(mockOnChange).toHaveBeenCalledTimes(2);
    });

    it('should allow clicking the same dietary preference multiple times', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      fireEvent.click(vegButton);
      fireEvent.click(vegButton);

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenCalledWith('veg');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for each button', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      expect(vegButton).toHaveAttribute('aria-label', 'Filter by Veg');

      const nonVegButton = screen.getByText('Non-Veg');
      expect(nonVegButton).toHaveAttribute('aria-label', 'Filter by Non-Veg');
    });

    it('should be keyboard accessible', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      vegButton.focus();
      expect(vegButton).toHaveFocus();
    });

    it('should have a label element for the filter section', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const label = screen.getByText('Dietary Preference');
      expect(label.tagName).toBe('LABEL');
    });
  });

  describe('Edge Cases', () => {
    it('should handle all valid DietaryPreference values', () => {
      const mockOnChange = vi.fn();
      const preferences: DietaryPreference[] = ['all', 'veg', 'non-veg'];

      preferences.forEach((preference) => {
        const { unmount } = renderWithIntl(
          <DietaryFilter
            selectedDietary={preference}
            onDietaryChange={mockOnChange}
          />
        );
        
        // Should render without errors
        expect(screen.getAllByRole('button')).toHaveLength(3);
        
        unmount();
      });
    });

    it('should render correctly when selectedDietary changes', () => {
      const mockOnChange = vi.fn();
      const { rerender } = renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      let allButton = screen.getByText('All');
      expect(allButton).toHaveClass('bg-[#D35400]');

      // Change selected dietary preference
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DietaryFilter
            selectedDietary="veg"
            onDietaryChange={mockOnChange}
          />
        </NextIntlClientProvider>
      );

      const vegButton = screen.getByText('Veg');
      expect(vegButton).toHaveClass('bg-[#27AE60]');
      
      allButton = screen.getByText('All');
      expect(allButton).not.toHaveClass('bg-[#D35400]');
    });

    it('should apply correct color for each dietary preference', () => {
      const mockOnChange = vi.fn();
      
      // Test "all" color
      const { rerender } = renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );
      expect(screen.getByText('All')).toHaveClass('bg-[#D35400]');

      // Test "veg" color
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DietaryFilter
            selectedDietary="veg"
            onDietaryChange={mockOnChange}
          />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Veg')).toHaveClass('bg-[#27AE60]');

      // Test "non-veg" color
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DietaryFilter
            selectedDietary="non-veg"
            onDietaryChange={mockOnChange}
          />
        </NextIntlClientProvider>
      );
      expect(screen.getByText('Non-Veg')).toHaveClass('bg-[#DC2626]');
    });
  });

  describe('Color Coding', () => {
    it('should use green color for vegetarian option when active', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="veg"
          onDietaryChange={mockOnChange}
        />
      );

      const vegButton = screen.getByText('Veg');
      expect(vegButton.className).toContain('bg-[#27AE60]');
    });

    it('should use red color for non-vegetarian option when active', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="non-veg"
          onDietaryChange={mockOnChange}
        />
      );

      const nonVegButton = screen.getByText('Non-Veg');
      expect(nonVegButton.className).toContain('bg-[#DC2626]');
    });

    it('should use terracotta color for all option when active', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <DietaryFilter
          selectedDietary="all"
          onDietaryChange={mockOnChange}
        />
      );

      const allButton = screen.getByText('All');
      expect(allButton.className).toContain('bg-[#D35400]');
    });
  });
});

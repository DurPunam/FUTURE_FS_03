/**
 * Unit tests for SearchBar component
 * Requirements: 4.4
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/menu/SearchBar';
import { NextIntlClientProvider } from 'next-intl';

// ============================================================================
// Mock translations
// ============================================================================

const messages = {
  menu: {
    search: {
      label: 'Search Menu',
      placeholder: 'Search for dishes...',
      ariaLabel: 'Search menu items',
      clearButton: 'Clear search',
    },
  },
};

const messagesHi = {
  menu: {
    search: {
      label: 'मेनू खोजें',
      placeholder: 'व्यंजन खोजें...',
      ariaLabel: 'मेनू आइटम खोजें',
      clearButton: 'खोज साफ़ करें',
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
  const msgs = locale === 'en' ? messages : messagesHi;
  return render(
    <NextIntlClientProvider locale={locale} messages={msgs}>
      {ui}
    </NextIntlClientProvider>
  );
}

// ============================================================================
// Tests
// ============================================================================

describe('SearchBar', () => {
  describe('Rendering', () => {
    it('should render search input with label', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      expect(screen.getByLabelText('Search Menu')).toBeInTheDocument();
      expect(screen.getByText('Search Menu')).toBeInTheDocument();
    });

    it('should render search input with placeholder', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByPlaceholderText('Search for dishes...');
      expect(input).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      // Search icon should be present (lucide-react renders as svg)
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should not render clear button when search is empty', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should render clear button when search has value', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="biryani" onSearchChange={mockOnChange} />
      );

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('should display current search query in input', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="litti chokha" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('litti chokha');
    });
  });

  describe('User Interactions', () => {
    it('should call onSearchChange when user types', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'sattu' } });

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('sattu');
    });

    it('should call onSearchChange with empty string when clear button is clicked', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="biryani" onSearchChange={mockOnChange} />
      );

      const clearButton = screen.getByLabelText('Clear search');
      fireEvent.click(clearButton);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('');
    });

    it('should handle multiple character inputs', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'l' } });
      fireEvent.change(input, { target: { value: 'li' } });
      fireEvent.change(input, { target: { value: 'lit' } });

      expect(mockOnChange).toHaveBeenCalledTimes(3);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 'l');
      expect(mockOnChange).toHaveBeenNthCalledWith(2, 'li');
      expect(mockOnChange).toHaveBeenNthCalledWith(3, 'lit');
    });

    it('should handle backspace/deletion', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="sattu" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'satt' } });

      expect(mockOnChange).toHaveBeenCalledWith('satt');
    });

    it('should handle special characters', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'dal-bhat' } });

      expect(mockOnChange).toHaveBeenCalledWith('dal-bhat');
    });

    it('should handle Hindi text input', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'लिट्टी चोखा' } });

      expect(mockOnChange).toHaveBeenCalledWith('लिट्टी चोखा');
    });
  });

  describe('Bilingual Support', () => {
    it('should render Hindi labels when locale is hi', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />,
        'hi'
      );

      expect(screen.getByText('मेनू खोजें')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('व्यंजन खोजें...')).toBeInTheDocument();
    });

    it('should render English labels when locale is en', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />,
        'en'
      );

      expect(screen.getByText('Search Menu')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search for dishes...')).toBeInTheDocument();
    });

    it('should render Hindi clear button label when locale is hi', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="test" onSearchChange={mockOnChange} />,
        'hi'
      );

      const clearButton = screen.getByLabelText('खोज साफ़ करें');
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByLabelText('Search Menu');
      expect(input).toHaveAttribute('id', 'menu-search');
    });

    it('should have aria-label on input', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search menu items');
    });

    it('should have aria-label on clear button', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="test" onSearchChange={mockOnChange} />
      );

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });

    it('should allow tabbing to clear button', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="test" onSearchChange={mockOnChange} />
      );

      const clearButton = screen.getByLabelText('Clear search');
      clearButton.focus();
      expect(clearButton).toHaveFocus();
    });

    it('should have type="button" on clear button to prevent form submission', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="test" onSearchChange={mockOnChange} />
      );

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string search query', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle very long search queries', () => {
      const mockOnChange = vi.fn();
      const longQuery = 'a'.repeat(100);
      renderWithIntl(
        <SearchBar searchQuery={longQuery} onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe(longQuery);
    });

    it('should handle search query with only spaces', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="   " onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('   ');
      
      // Clear button should still appear
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('should handle rapid input changes', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      
      // Simulate rapid typing
      for (let i = 0; i < 10; i++) {
        fireEvent.change(input, { target: { value: `test${i}` } });
      }

      expect(mockOnChange).toHaveBeenCalledTimes(10);
    });

    it('should handle search query update from parent', () => {
      const mockOnChange = vi.fn();
      const { rerender } = renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      let input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');

      // Parent updates search query
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <SearchBar searchQuery="updated" onSearchChange={mockOnChange} />
        </NextIntlClientProvider>
      );

      input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('updated');
    });

    it('should show clear button after parent updates search query', () => {
      const mockOnChange = vi.fn();
      const { rerender } = renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();

      // Parent updates search query
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <SearchBar searchQuery="test" onSearchChange={mockOnChange} />
        </NextIntlClientProvider>
      );

      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('should handle numbers in search query', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '123' } });

      expect(mockOnChange).toHaveBeenCalledWith('123');
    });

    it('should handle mixed alphanumeric search', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'dish123' } });

      expect(mockOnChange).toHaveBeenCalledWith('dish123');
    });
  });

  describe('Styling', () => {
    it('should have proper CSS classes for styling', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('rounded-lg');
      expect(input).toHaveClass('border');
    });

    it('should have focus ring styles', () => {
      const mockOnChange = vi.fn();
      renderWithIntl(
        <SearchBar searchQuery="" onSearchChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:ring-2');
      expect(input).toHaveClass('focus:ring-[#D35400]');
    });
  });
});

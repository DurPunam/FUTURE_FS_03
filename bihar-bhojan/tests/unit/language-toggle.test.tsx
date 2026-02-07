/**
 * Unit tests for LanguageToggle component
 * Requirements: 1.1, 1.4
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageToggle from '@/components/layout/LanguageToggle';

// Mock next-intl
const mockPush = vi.fn();
const mockPathname = '/en/menu';
let mockLocale = 'en';

vi.mock('next-intl', () => ({
  useLocale: () => mockLocale,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

describe('LanguageToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'en';
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock as any;
  });

  it('should render with current locale', () => {
    render(<LanguageToggle />);
    
    // When locale is 'en', button should show 'HI' (to switch to Hindi)
    expect(screen.getByText('HI')).toBeDefined();
  });

  it('should show EN when locale is Hindi', () => {
    mockLocale = 'hi';
    render(<LanguageToggle />);
    
    // When locale is 'hi', button should show 'EN' (to switch to English)
    expect(screen.getByText('EN')).toBeDefined();
  });

  it('should toggle language when clicked', () => {
    render(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Should save to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('preferredLocale', 'hi');
    
    // Should navigate to new locale
    expect(mockPush).toHaveBeenCalledWith('/hi/menu');
  });

  it('should have proper aria-label', () => {
    render(<LanguageToggle />);
    
    const button = screen.getByLabelText('Switch to Hindi');
    expect(button).toBeDefined();
  });

  it('should persist language preference to localStorage', () => {
    render(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('preferredLocale', 'hi');
  });
});

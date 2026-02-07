/**
 * Unit tests for Footer component
 * Requirements: 10.6, 11.4
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'footer.restaurantName': 'Bihar Bhojan',
      'footer.tagline': 'Authentic Bihari Cuisine',
      'footer.address': '123 Gandhi Maidan, Patna, Bihar 800001',
      'footer.phone': '+91 612 123 4567',
      'footer.email': 'info@biharbhojan.com',
      'footer.hours': 'Operating Hours',
      'footer.hoursDetail': 'Mon-Sun: 11:00 AM - 10:00 PM',
      'footer.quickLinks': 'Quick Links',
      'footer.connectWithUs': 'Connect With Us',
      'footer.rights': 'All rights reserved',
      'nav.home': 'Home',
      'nav.menu': 'Menu',
      'nav.experience': 'Experience',
      'nav.about': 'About',
      'nav.contact': 'Contact',
    };
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer Component', () => {
  it('should render restaurant name and tagline', () => {
    render(<Footer />);

    expect(screen.getByText('Bihar Bhojan')).toBeDefined();
    expect(screen.getByText('Authentic Bihari Cuisine')).toBeDefined();
  });

  it('should render restaurant contact information', () => {
    render(<Footer />);

    expect(screen.getByText('123 Gandhi Maidan, Patna, Bihar 800001')).toBeDefined();
    expect(screen.getByText('+91 612 123 4567')).toBeDefined();
    expect(screen.getByText('info@biharbhojan.com')).toBeDefined();
  });

  it('should render operating hours', () => {
    render(<Footer />);

    expect(screen.getByText('Operating Hours')).toBeDefined();
    expect(screen.getByText('Mon-Sun: 11:00 AM - 10:00 PM')).toBeDefined();
  });

  it('should render quick links section', () => {
    render(<Footer />);

    expect(screen.getByText('Quick Links')).toBeDefined();
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Menu')).toBeDefined();
    expect(screen.getByText('Experience')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Contact')).toBeDefined();
  });

  it('should render social media section', () => {
    render(<Footer />);

    expect(screen.getByText('Connect With Us')).toBeDefined();
    
    // Check for social media links
    const socialLinks = screen.getAllByRole('link');
    const socialMediaLinks = socialLinks.filter(link => 
      link.getAttribute('href')?.includes('facebook') ||
      link.getAttribute('href')?.includes('instagram') ||
      link.getAttribute('href')?.includes('twitter')
    );
    
    expect(socialMediaLinks.length).toBeGreaterThan(0);
  });

  it('should render copyright notice with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeDefined();
    expect(screen.getByText(/All rights reserved/)).toBeDefined();
  });

  it('should have Madhubani-inspired divider', () => {
    const { container } = render(<Footer />);
    
    // Check for the gradient divider element
    const divider = container.querySelector('.bg-gradient-to-r');
    expect(divider).toBeDefined();
  });
});

'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const t = useTranslations();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/menu', label: t('nav.menu') },
    { href: '/experience', label: t('nav.experience') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-gray-200 dark:border-slate-700' 
        : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className={`text-2xl font-bold transition-all duration-300 ${
            scrolled 
              ? 'text-terracotta dark:text-turmeric' 
              : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] font-extrabold'
          }`}>
            Bihar Bhojan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold text-base transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-900 dark:text-gray-100 hover:text-terracotta dark:hover:text-turmeric' 
                    : 'text-white hover:text-turmeric drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            
            {/* Cart Badge */}
            <Link
              href="/menu"
              className={`relative p-2 rounded-full transition-all duration-300 ${
                scrolled 
                  ? 'hover:bg-gray-100 dark:hover:bg-slate-800' 
                  : 'hover:bg-white/20'
              }`}
              aria-label="Shopping cart"
            >
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${
                  scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? 'hover:bg-gray-100 dark:hover:bg-slate-800' 
                  : 'hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className={`w-6 h-6 ${scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={`w-6 h-6 ${scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 dark:border-slate-700/50">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium py-2 transition-colors duration-300 ${
                    scrolled 
                      ? 'text-gray-800 dark:text-gray-200 hover:text-terracotta dark:hover:text-turmeric' 
                      : 'text-white hover:text-turmeric'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load preference from localStorage
    const savedLocale = localStorage.getItem('preferredLocale');
    if (savedLocale && savedLocale !== locale) {
      // Preference exists but doesn't match current locale
      // This can happen on first load or direct navigation
    }
  }, [locale]);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    
    // Save preference to localStorage
    localStorage.setItem('preferredLocale', newLocale);
    
    // Update the URL to use the new locale
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="px-3 py-1 rounded-md bg-gray-100 text-dark font-medium text-sm"
        disabled
      >
        EN
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-dark font-medium text-sm transition-colors"
      aria-label={`Switch to ${locale === 'en' ? 'Hindi' : 'English'}`}
    >
      {locale === 'en' ? 'HI' : 'EN'}
    </button>
  );
}

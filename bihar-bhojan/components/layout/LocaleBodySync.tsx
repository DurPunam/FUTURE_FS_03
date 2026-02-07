'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

/**
 * Syncs the current locale to document (html lang and body font class).
 * Used when root layout owns <html>/<body> but locale is only known in [locale] layout.
 */
export default function LocaleBodySync() {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    document.body.classList.remove('font-devanagari', 'font-inter');
    document.body.classList.add(locale === 'hi' ? 'font-devanagari' : 'font-inter');
  }, [locale]);

  return null;
}

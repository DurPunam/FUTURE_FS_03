'use client';

/**
 * SearchBar Component
 * Requirements: 4.4
 * 
 * Real-time search input for filtering menu items:
 * - Search input field with icon
 * - Filter menu items by name (both English and Hindi)
 * - Clear button to reset search
 * - Bilingual placeholder text using next-intl
 * - Responsive design with Tailwind CSS
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// ============================================================================
// Component
// ============================================================================

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  const t = useTranslations('menu.search');

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  /**
   * Handle clear button click
   */
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="w-full">
      {/* Search label */}
      <label
        htmlFor="menu-search"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {t('label')}
      </label>

      {/* Search input container */}
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>

        {/* Search input */}
        <input
          id="menu-search"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={t('placeholder')}
          className="
            block w-full pl-10 pr-10 py-2 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#D35400] focus:border-transparent
            transition-colors duration-200
          "
          aria-label={t('ariaLabel')}
        />

        {/* Clear button */}
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="
              absolute inset-y-0 right-0 pr-3 
              flex items-center
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              transition-colors duration-200
            "
            aria-label={t('clearButton')}
            type="button"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

'use client';

/**
 * CategoryFilter Component
 * Requirements: 4.1
 * 
 * Displays category filter buttons for menu items:
 * - Buttons for each category (Thali, Ghar Ka Khana, Street Delights, Mithai, Sattu Specials)
 * - "All" option to show all items
 * - Active state styling to show selected category
 * - Bilingual labels (English/Hindi) using next-intl
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MenuCategory } from '@/lib/types';
import { useTranslations } from 'next-intl';

// ============================================================================
// Types
// ============================================================================

interface CategoryFilterProps {
  selectedCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}

// ============================================================================
// Constants
// ============================================================================

const CATEGORIES: Array<MenuCategory | 'all'> = [
  'all',
  'thali',
  'ghar-ka-khana',
  'street-delights',
  'mithai',
  'sattu-specials',
];

// ============================================================================
// Component
// ============================================================================

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const t = useTranslations('menu.categories');

  /**
   * Get category label
   */
  const getCategoryLabel = (category: MenuCategory | 'all'): string => {
    return t(category);
  };

  return (
    <div className="w-full">
      {/* Mobile: Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:justify-center">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap
                transition-colors duration-200 min-w-fit
                ${
                  isActive
                    ? 'bg-[#D35400] text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={isActive}
              aria-label={`Filter by ${getCategoryLabel(category)}`}
            >
              {getCategoryLabel(category)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

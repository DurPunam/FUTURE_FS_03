'use client';

/**
 * DietaryFilter Component
 * Requirements: 4.2
 * 
 * Displays dietary preference filter buttons for menu items:
 * - Toggle for veg/non-veg/all options
 * - Filter menu items by dietary preference
 * - Active state styling to show selected preference
 * - Bilingual labels (English/Hindi) using next-intl
 * - Color indicators: green for veg (#27AE60), red for non-veg (#DC2626)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// ============================================================================
// Types
// ============================================================================

export type DietaryPreference = 'all' | 'veg' | 'non-veg';

interface DietaryFilterProps {
  selectedDietary: DietaryPreference;
  onDietaryChange: (dietary: DietaryPreference) => void;
}

// ============================================================================
// Constants
// ============================================================================

const DIETARY_OPTIONS: DietaryPreference[] = ['all', 'veg', 'non-veg'];

// Color mapping for dietary preferences
const DIETARY_COLORS = {
  all: 'bg-[#D35400]', // Terracotta (default brand color)
  veg: 'bg-[#27AE60]', // Leaf Green
  'non-veg': 'bg-[#DC2626]', // Red
};

// ============================================================================
// Component
// ============================================================================

export function DietaryFilter({
  selectedDietary,
  onDietaryChange,
}: DietaryFilterProps) {
  const t = useTranslations('menu.dietary');

  /**
   * Get dietary preference label
   */
  const getDietaryLabel = (dietary: DietaryPreference): string => {
    return t(dietary);
  };

  /**
   * Get active color class for dietary preference
   */
  const getActiveColor = (dietary: DietaryPreference): string => {
    return DIETARY_COLORS[dietary];
  };

  return (
    <div className="w-full">
      {/* Filter label */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {t('filterLabel')}
      </label>

      {/* Dietary options */}
      <div className="flex gap-2 flex-wrap">
        {DIETARY_OPTIONS.map((dietary) => {
          const isActive = selectedDietary === dietary;

          return (
            <motion.button
              key={dietary}
              onClick={() => onDietaryChange(dietary)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap
                transition-colors duration-200 min-w-fit
                ${
                  isActive
                    ? `${getActiveColor(dietary)} text-white shadow-md`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={isActive}
              aria-label={`Filter by ${getDietaryLabel(dietary)}`}
            >
              {getDietaryLabel(dietary)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

/**
 * MenuItemCard Component
 * Requirements: 4.5, 4.3, 7.4
 * 
 * Displays a menu item with:
 * - Image with lazy loading (Next.js Image)
 * - Name, description, price
 * - Dietary indicator (veg/non-veg icon)
 * - Spice level indicator
 * - Add to cart button
 * - Hover animations (Framer Motion)
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuItem } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useLocale, useTranslations } from 'next-intl';

// ============================================================================
// Types
// ============================================================================

interface MenuItemCardProps {
  item: MenuItem;
}

// ============================================================================
// Component
// ============================================================================

export function MenuItemCard({ item }: MenuItemCardProps) {
  const locale = useLocale() as 'en' | 'hi';
  const t = useTranslations('menu');
  const { addToCart } = useCart();

  // Get localized name and description
  const name = locale === 'hi' ? item.nameHi : item.name;
  const description = locale === 'hi' ? item.descriptionHi : item.description;

  /**
   * Handle add to cart
   */
  const handleAddToCart = () => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      nameHi: item.nameHi,
      price: item.price,
      image: item.image,
    });
  };

  /**
   * Get spice level display
   */
  const getSpiceLevelDisplay = () => {
    if (!item.spiceLevel) return null;

    const spiceIcons = {
      mild: '🌶️',
      medium: '🌶️🌶️',
      hot: '🌶️🌶️🌶️',
    };

    return (
      <div className="flex items-center gap-1 text-sm">
        <span>{spiceIcons[item.spiceLevel]}</span>
        <span className="text-gray-600 dark:text-gray-400 capitalize">
          {item.spiceLevel}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Dietary Indicator Badge */}
        <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
          {item.isVeg ? (
            <div className="w-5 h-5 border-2 border-green-600 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-red-600 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full" />
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-2 right-2 bg-[#F39C12] text-white px-2 py-1 rounded-md text-xs font-semibold">
            {t('featured')}
          </div>
        )}

        {/* Unavailable Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {t('unavailable')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Spice Level */}
        {item.spiceLevel && (
          <div className="mb-3">
            {getSpiceLevelDisplay()}
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-xl font-bold text-[#D35400]">
            ₹{item.price}
          </div>
          
          <motion.button
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              item.isAvailable
                ? 'bg-[#27AE60] text-white hover:bg-[#229954]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={item.isAvailable ? { scale: 1.05 } : {}}
            whileTap={item.isAvailable ? { scale: 0.95 } : {}}
          >
            {t('addToCart')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

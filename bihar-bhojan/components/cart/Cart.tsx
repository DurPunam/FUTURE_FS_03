'use client';

/**
 * Cart Component
 * Requirements: 14.4, 14.7
 * 
 * Displays cart items with quantities, totals, and empty state
 * Includes slide-in animation from right side
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import CartItem from './CartItem';
import WhatsAppOrderButton from './WhatsAppOrderButton';

// ============================================================================
// Types
// ============================================================================

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// Component
// ============================================================================

export default function Cart({ isOpen, onClose }: CartProps) {
  const t = useTranslations();
  const { items, subtotal, tax, total, itemCount } = useCart();

  // Animation variants for slide-in from right
  const cartVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />

          {/* Cart Panel */}
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2
                id="cart-title"
                className="text-xl font-semibold text-gray-900"
              >
                {t('cart.title')} ({itemCount})
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={t('cart.close')}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                // Empty Cart State
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('cart.empty.title')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t('cart.empty.message')}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-[#D35400] text-white rounded-lg hover:bg-[#B84700] transition-colors"
                  >
                    {t('cart.empty.browseMenu')}
                  </button>
                </div>
              ) : (
                // Cart Items List
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.menuItemId} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Totals */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {/* Subtotal */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{t('cart.tax')}</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-4 pt-3 border-t border-gray-300">
                  <span>{t('cart.total')}</span>
                  <span className="text-[#D35400]">{formatCurrency(total)}</span>
                </div>

                {/* Checkout Button - Will be implemented in next task */}
                <WhatsAppOrderButton restaurantWhatsApp={process.env.NEXT_PUBLIC_RESTAURANT_WHATSAPP || '9876543210'} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

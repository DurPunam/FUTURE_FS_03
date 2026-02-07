'use client';

/**
 * CartItem Component
 * Requirements: 14.6, 14.2
 * 
 * Displays individual cart item with quantity controls and remove button
 */

import React from 'react';
// import { useTranslations } from 'next-intl';
import { Plus, Minus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

// ============================================================================
// Types
// ============================================================================

interface CartItemProps {
  item: CartItemType;
}

// ============================================================================
// Component
// ============================================================================

export default function CartItem({ item }: CartItemProps) {
  // const t = useTranslations();
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.menuItemId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.menuItemId, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.menuItemId);
  };

  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
      {/* Item Image */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        {/* Item Name */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-medium text-gray-900 text-sm leading-tight">
            {item.name}
          </h4>
          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="p-1 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
            aria-label={`Remove ${item.name} from cart`}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Price */}
        <p className="text-sm text-gray-600 mb-2">
          {formatCurrency(item.price)}
        </p>

        {/* Quantity Controls and Total */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={item.quantity === 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 text-gray-700" />
            </button>
            
            <span className="w-8 text-center font-medium text-gray-900">
              {item.quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 text-gray-700" />
            </button>
          </div>

          {/* Item Total */}
          <p className="text-sm font-semibold text-[#D35400]">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

/**
 * WhatsAppOrderButton Component
 * Requirements: 3.2, 3.3, 3.4, 3.6
 * 
 * Generates formatted WhatsApp message and opens WhatsApp with pre-filled order
 * Includes customer info form (name, phone, address)
 * Disabled when cart is empty
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, User, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WhatsAppCustomerInfoSchema, type WhatsAppCustomerInfoData } from '@/lib/validation';
import { generateWhatsAppMessage, generateWhatsAppURL } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

// ============================================================================
// Types
// ============================================================================

interface WhatsAppOrderButtonProps {
  restaurantWhatsApp: string; // Restaurant's WhatsApp number
}

// ============================================================================
// Component
// ============================================================================

export default function WhatsAppOrderButton({ restaurantWhatsApp }: WhatsAppOrderButtonProps) {
  const t = useTranslations();
  const { items } = useCart();
  const [showForm, setShowForm] = useState(false);

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WhatsAppCustomerInfoData>({
    resolver: zodResolver(WhatsAppCustomerInfoSchema),
  });

  // Check if cart is empty
  const isCartEmpty = items.length === 0;

  /**
   * Handle form submission
   * Generate WhatsApp message and open WhatsApp
   */
  const onSubmit = (data: WhatsAppCustomerInfoData) => {
    // Generate formatted WhatsApp message
    const message = generateWhatsAppMessage(items, data);

    // Generate WhatsApp URL
    const whatsappURL = generateWhatsAppURL(restaurantWhatsApp, message);

    // Open WhatsApp in new window/tab
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');

    // Reset form and close
    reset();
    setShowForm(false);
  };

  /**
   * Handle button click
   * Show form if cart has items
   */
  const handleButtonClick = () => {
    if (!isCartEmpty) {
      setShowForm(true);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    setShowForm(false);
    reset();
  };

  return (
    <div>
      {/* Main Order Button */}
      {!showForm && (
        <button
          onClick={handleButtonClick}
          disabled={isCartEmpty}
          className={`
            w-full py-3 rounded-lg font-semibold transition-all duration-200
            flex items-center justify-center gap-2
            ${
              isCartEmpty
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#27AE60] text-white hover:bg-[#229954] hover:shadow-lg active:scale-95'
            }
          `}
          aria-label={t('whatsapp.orderButton')}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{t('whatsapp.orderButton')}</span>
        </button>
      )}

      {/* Customer Info Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form Header */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {t('whatsapp.form.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('whatsapp.form.subtitle')}
            </p>
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{t('whatsapp.form.name')}</span>
              </div>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`
                w-full px-3 py-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#27AE60]
                ${errors.name ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder={t('whatsapp.form.namePlaceholder')}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{t('whatsapp.form.phone')}</span>
              </div>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`
                w-full px-3 py-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#27AE60]
                ${errors.phone ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder={t('whatsapp.form.phonePlaceholder')}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{t('whatsapp.form.address')}</span>
              </div>
            </label>
            <textarea
              id="address"
              {...register('address')}
              rows={3}
              className={`
                w-full px-3 py-2 border rounded-lg resize-none
                focus:outline-none focus:ring-2 focus:ring-[#27AE60]
                ${errors.address ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder={t('whatsapp.form.addressPlaceholder')}
              aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <p id="address-error" className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-2">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="
                flex-1 py-2 px-4 border border-gray-300 rounded-lg
                text-gray-700 font-medium
                hover:bg-gray-50 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {t('whatsapp.form.cancel')}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                flex-1 py-2 px-4 bg-[#27AE60] text-white rounded-lg font-semibold
                hover:bg-[#229954] transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? t('whatsapp.form.sending')
                  : t('whatsapp.form.submit')}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Utility functions for Bihar Bhojan Restaurant
 * Requirements: 14.4, 3.2, 13.4
 */

import { CartItem, CustomerInfo } from './types';

// ============================================================================
// Currency Formatting
// ============================================================================

/**
 * Formats a number as Indian Rupees (INR)
 * Requirement 14.4: Cart total calculation and display
 * 
 * @param amount - The amount to format
 * @param locale - The locale to use for formatting (default: 'en-IN')
 * @returns Formatted currency string (e.g., "₹1,234.56")
 * 
 * @example
 * formatCurrency(1234.56) // "₹1,234.56"
 * formatCurrency(1234.56, 'hi-IN') // "₹1,234.56"
 */
export function formatCurrency(amount: number, locale: 'en-IN' | 'hi-IN' = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ============================================================================
// Date Formatting
// ============================================================================

/**
 * Formats a date in a locale-aware manner
 * Requirement 14.4: Display dates in appropriate format
 * 
 * @param date - The date to format
 * @param locale - The locale to use for formatting ('en' or 'hi')
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date('2024-01-15'), 'en') // "January 15, 2024"
 * formatDate(new Date('2024-01-15'), 'hi') // "15 जनवरी 2024"
 */
export function formatDate(
  date: Date,
  locale: 'en' | 'hi' = 'en',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const localeCode = locale === 'hi' ? 'hi-IN' : 'en-IN';
  return new Intl.DateTimeFormat(localeCode, options).format(date);
}

// ============================================================================
// Cart Calculations
// ============================================================================

/**
 * Tax rate for cart calculations (5%)
 */
const TAX_RATE = 0.05;

/**
 * Calculates cart totals (subtotal, tax, and total)
 * Requirement 14.4: Cart total calculation
 * 
 * @param items - Array of cart items
 * @returns Object containing subtotal, tax, and total amounts
 * 
 * @example
 * const items = [
 *   { price: 100, quantity: 2 },
 *   { price: 50, quantity: 1 }
 * ];
 * calculateCartTotal(items) // { subtotal: 250, tax: 12.5, total: 262.5 }
 */
export function calculateCartTotal(items: CartItem[]): {
  subtotal: number;
  tax: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

// ============================================================================
// WhatsApp Message Generation
// ============================================================================

/**
 * Generates a formatted WhatsApp message from cart and customer info
 * Requirement 3.2: WhatsApp-based ordering with formatted message
 * 
 * @param cartItems - Array of items in the cart
 * @param customerInfo - Customer information (name, phone, address)
 * @returns Formatted WhatsApp message string
 * 
 * @example
 * const message = generateWhatsAppMessage(
 *   [{ name: 'Litti Chokha', quantity: 2, price: 150 }],
 *   { name: 'John Doe', phone: '9876543210', address: '123 Main St' }
 * );
 */
export function generateWhatsAppMessage(
  cartItems: CartItem[],
  customerInfo: CustomerInfo
): string {
  const { subtotal, tax, total } = calculateCartTotal(cartItems);

  // Build the message
  let message = '🍽️ *Bihar Bhojan Order*\n\n';
  
  // Customer details
  message += `*Customer:* ${customerInfo.name}\n`;
  message += `*Phone:* ${customerInfo.phone}\n`;
  message += `*Address:* ${customerInfo.address}\n\n`;
  
  // Order items
  message += '*Order Items:*\n';
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
  });
  
  // Totals
  message += `\n*Subtotal:* ₹${subtotal.toFixed(2)}\n`;
  message += `*Tax (5%):* ₹${tax.toFixed(2)}\n`;
  message += `*Total:* ₹${total.toFixed(2)}\n\n`;
  
  // Payment method
  message += 'Payment: Cash on Delivery';

  return message;
}

/**
 * Generates a WhatsApp URL with pre-filled message
 * Requirement 3.2: Open WhatsApp with order details
 * 
 * @param phoneNumber - Restaurant's WhatsApp number (without country code)
 * @param message - The message to pre-fill
 * @returns WhatsApp URL
 * 
 * @example
 * const url = generateWhatsAppURL('9876543210', 'Hello, I want to order...');
 * // Returns: https://wa.me/919876543210?text=Hello%2C%20I%20want%20to%20order...
 */
export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  // Add country code for India (+91) if not present
  const formattedPhone = phoneNumber.startsWith('91') ? phoneNumber : `91${phoneNumber}`;
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

// ============================================================================
// Phone Number Validation
// ============================================================================

/**
 * Validates Indian phone number format (10 digits)
 * Requirement 13.4: Phone number validation
 * 
 * @param phone - Phone number string to validate
 * @returns true if valid, false otherwise
 * 
 * @example
 * validateIndianPhone('9876543210') // true
 * validateIndianPhone('123') // false
 * validateIndianPhone('98765432101') // false (11 digits)
 */
export function validateIndianPhone(phone: string): boolean {
  // Check if the phone number is exactly 10 digits
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Formats an Indian phone number for display
 * 
 * @param phone - 10-digit phone number
 * @returns Formatted phone number (e.g., "98765-43210")
 * 
 * @example
 * formatPhoneNumber('9876543210') // "98765-43210"
 */
export function formatPhoneNumber(phone: string): string {
  if (!validateIndianPhone(phone)) {
    return phone; // Return as-is if invalid
  }
  
  // Format as XXXXX-XXXXX
  return `${phone.slice(0, 5)}-${phone.slice(5)}`;
}

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Truncates a string to a specified length and adds ellipsis
 * 
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 * 
 * @example
 * truncateText('This is a long text', 10) // "This is a..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param text - The text to capitalize
 * @returns Capitalized string
 * 
 * @example
 * capitalize('hello world') // "Hello world"
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Chunks an array into smaller arrays of specified size
 * Useful for pagination or grid layouts
 * 
 * @param array - The array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 * 
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// ============================================================================
// URL Utilities
// ============================================================================

/**
 * Builds a query string from an object
 * 
 * @param params - Object with key-value pairs
 * @returns Query string (without leading '?')
 * 
 * @example
 * buildQueryString({ page: 1, limit: 10 }) // "page=1&limit=10"
 */
export function buildQueryString(params: Record<string, string | number | boolean>): string {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

// ============================================================================
// Time Utilities
// ============================================================================

/**
 * Formats a time string (HH:MM) to 12-hour format with AM/PM
 * 
 * @param time - Time in 24-hour format (HH:MM)
 * @param locale - Locale for formatting ('en' or 'hi')
 * @returns Formatted time string
 * 
 * @example
 * formatTime('14:30', 'en') // "2:30 PM"
 * formatTime('09:00', 'en') // "9:00 AM"
 */
export function formatTime(time: string, locale: 'en' | 'hi' = 'en'): string {
  const [hours, minutes] = time.split(':').map(Number);
  
  // Validate hours and minutes
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return time; // Return as-is if invalid
  }
  
  const date = new Date();
  date.setHours(hours, minutes);
  
  const localeCode = locale === 'hi' ? 'hi-IN' : 'en-IN';
  return new Intl.DateTimeFormat(localeCode, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Checks if a time string is valid (HH:MM format)
 * 
 * @param time - Time string to validate
 * @returns true if valid, false otherwise
 * 
 * @example
 * isValidTime('14:30') // true
 * isValidTime('25:00') // false
 * isValidTime('14:60') // false
 */
export function isValidTime(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

// ============================================================================
// Number Utilities
// ============================================================================

/**
 * Clamps a number between a minimum and maximum value
 * 
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 * 
 * @example
 * clamp(5, 1, 10) // 5
 * clamp(15, 1, 10) // 10
 * clamp(-5, 1, 10) // 1
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to specified decimal places
 * 
 * @param value - The value to round
 * @param decimals - Number of decimal places
 * @returns Rounded value
 * 
 * @example
 * roundTo(3.14159, 2) // 3.14
 * roundTo(3.14159, 0) // 3
 */
export function roundTo(value: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

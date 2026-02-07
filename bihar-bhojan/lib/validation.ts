/**
 * Zod validation schemas for Bihar Bhojan Restaurant forms
 * Requirements: 13.1, 13.3, 13.4
 */

import { z } from 'zod';

// ============================================================================
// Booking Form Schema
// ============================================================================

/**
 * Booking form validation schema
 * Requirements: 13.1, 2.3, 2.4, 2.5
 * 
 * Validates:
 * - Name is required
 * - Email is valid format
 * - Phone is 10 digits (Indian format)
 * - Date is not in the past
 * - Time is required
 * - Party size is between 1 and 20
 */
export const BookingFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  
  date: z
    .date({
      message: 'Please select a valid date',
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: 'Please select a future date' }
    ),
  
  time: z
    .string()
    .min(1, 'Time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'),
  
  partySize: z
    .number({
      message: 'Party size must be a number',
    })
    .int('Party size must be a whole number')
    .min(1, 'Party size must be at least 1')
    .max(20, 'Party size must be at most 20'),
  
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),
});

/**
 * Type inference from BookingFormSchema
 */
export type BookingFormData = z.infer<typeof BookingFormSchema>;

// ============================================================================
// Contact Form Schema
// ============================================================================

/**
 * Contact form validation schema
 * Requirements: 13.1, 13.3, 10.5
 * 
 * Validates:
 * - Name is required
 * - Email is valid format
 * - Phone is 10 digits (Indian format)
 * - Message is required
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

/**
 * Type inference from ContactFormSchema
 */
export type ContactFormData = z.infer<typeof ContactFormSchema>;

// ============================================================================
// Admin Login Schema
// ============================================================================

/**
 * Admin login validation schema
 * Requirements: 13.1, 6.1
 * 
 * Validates:
 * - Password is required
 * - Password meets minimum length
 */
export const AdminLoginSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

/**
 * Type inference from AdminLoginSchema
 */
export type AdminLoginData = z.infer<typeof AdminLoginSchema>;

// ============================================================================
// Menu Item Schema
// ============================================================================

/**
 * Menu item validation schema for admin editing
 * Requirements: 13.1, 13.4, 6.2, 6.4
 * 
 * Validates:
 * - All required fields are present
 * - Price is positive
 * - Category is valid
 * - Spice level is valid (if provided)
 */
export const MenuItemSchema = z.object({
  id: z
    .string()
    .min(1, 'ID is required'),
  
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  nameHi: z
    .string()
    .min(1, 'Hindi name is required')
    .max(100, 'Hindi name must be less than 100 characters'),
  
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters'),
  
  descriptionHi: z
    .string()
    .min(1, 'Hindi description is required')
    .max(500, 'Hindi description must be less than 500 characters'),
  
  price: z
    .number({
      message: 'Price must be a number',
    })
    .positive('Price must be a positive number')
    .finite('Price must be a finite number'),
  
  category: z.enum(
    ['thali', 'ghar-ka-khana', 'street-delights', 'mithai', 'sattu-specials'],
    {
      message: 'Invalid category',
    }
  ),
  
  image: z
    .string()
    .min(1, 'Image path is required')
    .regex(/^\/images\/dishes\/.*\.(jpg|jpeg|png|webp)$/i, 'Invalid image path format'),
  
  isVeg: z
    .boolean({
      message: 'Vegetarian status must be true or false',
    }),
  
  spiceLevel: z
    .enum(['mild', 'medium', 'hot'], {
      message: 'Invalid spice level',
    })
    .optional(),
  
  isAvailable: z
    .boolean({
      message: 'Availability status must be true or false',
    }),
  
  featured: z
    .boolean({
      message: 'Featured status must be true or false',
    }),
});

/**
 * Type inference from MenuItemSchema
 */
export type MenuItemFormData = z.infer<typeof MenuItemSchema>;

/**
 * Schema for validating an array of menu items
 * Used when admin updates the entire menu.json file
 */
export const MenuItemsArraySchema = z.array(MenuItemSchema).min(1, 'At least one menu item is required');

/**
 * Type inference from MenuItemsArraySchema
 */
export type MenuItemsArrayData = z.infer<typeof MenuItemsArraySchema>;

// ============================================================================
// WhatsApp Order Customer Info Schema
// ============================================================================

/**
 * Customer information validation for WhatsApp orders
 * Requirements: 13.1, 3.4
 * 
 * Validates customer info before generating WhatsApp message
 */
export const WhatsAppCustomerInfoSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  
  address: z
    .string()
    .min(1, 'Delivery address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(300, 'Address must be less than 300 characters'),
});

/**
 * Type inference from WhatsAppCustomerInfoSchema
 */
export type WhatsAppCustomerInfoData = z.infer<typeof WhatsAppCustomerInfoSchema>;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validates Indian phone number format (10 digits)
 * Can be used for additional validation beyond Zod
 */
export function validateIndianPhone(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone);
}

/**
 * Validates email format
 * Can be used for additional validation beyond Zod
 */
export function validateEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

/**
 * Validates that a date is not in the past
 */
export function validateFutureDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

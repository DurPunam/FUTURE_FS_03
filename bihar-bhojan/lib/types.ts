/**
 * TypeScript interfaces for Bihar Bhojan Restaurant data models
 * Requirements: 4.1, 14.1, 2.1
 */

// ============================================================================
// Menu Item Types
// ============================================================================

/**
 * Menu category types
 */
export type MenuCategory =
  | 'thali'
  | 'ghar-ka-khana'
  | 'street-delights'
  | 'mithai'
  | 'sattu-specials';

/**
 * Spice level indicator
 */
export type SpiceLevel = 'mild' | 'medium' | 'hot';

/**
 * Menu item interface
 * Requirement 4.1: Menu display with categories
 */
export interface MenuItem {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  category: MenuCategory;
  image: string; // Path to /public/images/dishes/
  isVeg: boolean;
  spiceLevel?: SpiceLevel;
  isAvailable: boolean;
  featured: boolean;
}

// ============================================================================
// Cart Types
// ============================================================================

/**
 * Cart item interface
 * Requirement 14.1: Cart management
 */
export interface CartItem {
  menuItemId: string;
  name: string;
  nameHi: string;
  price: number;
  quantity: number;
  image: string;
}

/**
 * Cart interface with totals
 * Requirement 14.1: Cart management with calculations
 */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// ============================================================================
// Booking Types
// ============================================================================

/**
 * Booking status types
 */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

/**
 * Booking interface
 * Requirement 2.1: Table booking system
 */
export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string; // Format: "HH:MM"
  partySize: number; // 1-20
  specialRequests?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking form data (before submission)
 */
export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
}

// ============================================================================
// WhatsApp Order Types
// ============================================================================

/**
 * WhatsApp order item
 */
export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  price: number;
}

/**
 * WhatsApp order interface
 * Requirement 3.2: WhatsApp-based ordering
 */
export interface WhatsAppOrder {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: WhatsAppOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderDate: Date;
}

/**
 * Customer information for orders
 */
export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

// ============================================================================
// Restaurant Information Types
// ============================================================================

/**
 * Operating hours for a day
 */
export interface OperatingHours {
  open: string;
  close: string;
}

/**
 * Restaurant information interface
 * Requirement 10.6: Contact and location information
 */
export interface RestaurantInfo {
  name: string;
  nameHi: string;
  address: string;
  addressHi: string;
  phone: string;
  whatsapp: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    [key: string]: OperatingHours;
  };
}

// ============================================================================
// Cultural Event Types
// ============================================================================

/**
 * Cultural event types
 */
export type CulturalEventType =
  | 'cultural-evening'
  | 'cooking-workshop'
  | 'special-event';

/**
 * Cultural event interface
 * Requirement 15.2: Cultural experience showcase
 */
export interface CulturalEvent {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  date: Date;
  time: string;
  image: string;
  type: CulturalEventType;
}

// ============================================================================
// Testimonial Types
// ============================================================================

/**
 * Customer testimonial interface
 * Requirement 17.4: Customer testimonials display
 */
export interface Testimonial {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  commentHi: string;
  date: Date;
  image?: string;
}

// ============================================================================
// Contact Form Types
// ============================================================================

/**
 * Contact form data
 * Requirement 10.1: Contact form
 */
export interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ============================================================================
// Experience Types
// ============================================================================

/**
 * Experience interface for cultural experiences page
 * Requirement 15.1: Traditional seating and experiences
 */
export interface Experience {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  image: string;
  type: 'seating' | 'event' | 'workshop';
}

// ============================================================================
// Result Types (for Server Actions)
// ============================================================================

/**
 * Generic result type for server actions
 * Success or error response
 */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ============================================================================
// Locale Types
// ============================================================================

/**
 * Supported locales
 * Requirement 1.1: Multi-language support
 */
export type Locale = 'en' | 'hi';

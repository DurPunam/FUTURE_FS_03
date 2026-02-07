/**
 * Example usage of Bihar Bhojan type definitions
 * This file demonstrates how to use the types in the application
 */

import type {
  MenuItem,
  Cart,
  CartItem,
  Booking,
  WhatsAppOrder,
  RestaurantInfo,
  CulturalEvent,
  Testimonial,
  Result,
} from './types';

// ============================================================================
// Example: Creating a menu item
// ============================================================================

export const exampleMenuItem: MenuItem = {
  id: 'litti-chokha-001',
  name: 'Litti Chokha',
  nameHi: 'लिट्टी चोखा',
  description:
    'Traditional Bihari dish made with roasted wheat balls served with mashed vegetables',
  descriptionHi:
    'भुने हुए गेहूं के गोले जो मसले हुए सब्जियों के साथ परोसे जाते हैं',
  price: 150,
  category: 'ghar-ka-khana',
  image: '/images/dishes/litti-chokha.jpg',
  isVeg: true,
  spiceLevel: 'medium',
  isAvailable: true,
  featured: true,
};

// ============================================================================
// Example: Creating a cart with items
// ============================================================================

export const exampleCartItem: CartItem = {
  menuItemId: 'litti-chokha-001',
  name: 'Litti Chokha',
  nameHi: 'लिट्टी चोखा',
  price: 150,
  quantity: 2,
  image: '/images/dishes/litti-chokha.jpg',
};

export const exampleCart: Cart = {
  items: [exampleCartItem],
  subtotal: 300, // 150 * 2
  tax: 15, // 5% tax
  total: 315,
};

// ============================================================================
// Example: Creating a booking
// ============================================================================

export const exampleBooking: Booking = {
  id: 'booking-20241225-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '9876543210',
  date: new Date('2024-12-25T00:00:00'),
  time: '19:00',
  partySize: 4,
  specialRequests: 'Window seat preferred, celebrating anniversary',
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ============================================================================
// Example: Creating a WhatsApp order
// ============================================================================

export const exampleWhatsAppOrder: WhatsAppOrder = {
  customerName: 'Priya Singh',
  customerPhone: '9876543211',
  deliveryAddress: '123 Gandhi Maidan, Patna, Bihar 800001',
  items: [
    {
      name: 'Litti Chokha',
      quantity: 2,
      price: 150,
    },
    {
      name: 'Sattu Paratha',
      quantity: 3,
      price: 80,
    },
  ],
  subtotal: 540, // (150 * 2) + (80 * 3)
  tax: 27, // 5% tax
  total: 567,
  orderDate: new Date(),
};

// ============================================================================
// Example: Restaurant information
// ============================================================================

export const exampleRestaurantInfo: RestaurantInfo = {
  name: 'Bihar Bhojan',
  nameHi: 'बिहार भोजन',
  address: '123 Gandhi Maidan, Patna, Bihar 800001',
  addressHi: '123 गांधी मैदान, पटना, बिहार 800001',
  phone: '+919876543210',
  whatsapp: '+919876543210',
  email: 'info@biharbhojan.com',
  coordinates: {
    lat: 25.5941,
    lng: 85.1376,
  },
  hours: {
    monday: { open: '11:00', close: '22:00' },
    tuesday: { open: '11:00', close: '22:00' },
    wednesday: { open: '11:00', close: '22:00' },
    thursday: { open: '11:00', close: '22:00' },
    friday: { open: '11:00', close: '23:00' },
    saturday: { open: '11:00', close: '23:00' },
    sunday: { open: '11:00', close: '22:00' },
  },
};

// ============================================================================
// Example: Cultural event
// ============================================================================

export const exampleCulturalEvent: CulturalEvent = {
  id: 'chhath-puja-2024',
  title: 'Chhath Puja Celebration',
  titleHi: 'छठ पूजा समारोह',
  description:
    'Join us for a traditional Chhath Puja celebration with authentic Bihari rituals and special prasad',
  descriptionHi:
    'प्रामाणिक बिहारी रीति-रिवाजों और विशेष प्रसाद के साथ पारंपरिक छठ पूजा समारोह में शामिल हों',
  date: new Date('2024-11-07T00:00:00'),
  time: '18:00',
  image: '/images/cultural/chhath-puja.jpg',
  type: 'cultural-evening',
};

// ============================================================================
// Example: Customer testimonial
// ============================================================================

export const exampleTestimonial: Testimonial = {
  id: 'testimonial-001',
  customerName: 'Amit Sharma',
  rating: 5,
  comment:
    'Absolutely authentic Bihari cuisine! The Litti Chokha reminded me of my grandmother\'s cooking. Highly recommended!',
  commentHi:
    'बिल्कुल प्रामाणिक बिहारी व्यंजन! लिट्टी चोखा ने मुझे मेरी दादी के खाने की याद दिला दी। अत्यधिक अनुशंसित!',
  date: new Date('2024-01-15T00:00:00'),
  image: '/images/testimonials/amit-sharma.jpg',
};

// ============================================================================
// Example: Server action result types
// ============================================================================

// Success result
export const exampleSuccessResult: Result<Booking> = {
  success: true,
  data: exampleBooking,
};

// Error result
export const exampleErrorResult: Result<Booking> = {
  success: false,
  error: 'Booking date must be in the future',
};

// ============================================================================
// Example: Type guards for Result type
// ============================================================================

export function isSuccessResult<T>(result: Result<T>): result is { success: true; data: T } {
  return result.success === true;
}

export function isErrorResult<T>(result: Result<T>): result is { success: false; error: string } {
  return result.success === false;
}

// Usage example:
export function handleBookingResult(result: Result<Booking>): void {
  if (isSuccessResult(result)) {
    console.log('Booking created:', result.data.id);
  } else {
    console.error('Booking failed:', result.error);
  }
}

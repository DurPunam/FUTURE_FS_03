/**
 * Unit tests for TypeScript type definitions
 * Validates that all interfaces are properly defined and usable
 */

import { describe, it, expect } from 'vitest';
import type {
  MenuItem,
  MenuCategory,
  SpiceLevel,
  CartItem,
  Cart,
  Booking,
  BookingData,
  BookingStatus,
  WhatsAppOrder,
  WhatsAppOrderItem,
  CustomerInfo,
  RestaurantInfo,
  OperatingHours,
  CulturalEvent,
  CulturalEventType,
  Testimonial,
  ContactData,
  Experience,
  Result,
  Locale,
} from '../../lib/types';

describe('Type Definitions', () => {
  describe('MenuItem', () => {
    it('should accept valid menu item object', () => {
      const menuItem: MenuItem = {
        id: '1',
        name: 'Litti Chokha',
        nameHi: 'लिट्टी चोखा',
        description: 'Traditional Bihari dish',
        descriptionHi: 'पारंपरिक बिहारी व्यंजन',
        price: 150,
        category: 'ghar-ka-khana',
        image: '/images/dishes/litti-chokha.jpg',
        isVeg: true,
        spiceLevel: 'medium',
        isAvailable: true,
        featured: true,
      };

      expect(menuItem.id).toBe('1');
      expect(menuItem.name).toBe('Litti Chokha');
      expect(menuItem.price).toBe(150);
      expect(menuItem.isVeg).toBe(true);
    });

    it('should accept menu item without optional spiceLevel', () => {
      const menuItem: MenuItem = {
        id: '2',
        name: 'Kheer',
        nameHi: 'खीर',
        description: 'Sweet rice pudding',
        descriptionHi: 'मीठा चावल की खीर',
        price: 80,
        category: 'mithai',
        image: '/images/dishes/kheer.jpg',
        isVeg: true,
        isAvailable: true,
        featured: false,
      };

      expect(menuItem.spiceLevel).toBeUndefined();
    });
  });

  describe('MenuCategory', () => {
    it('should accept all valid category values', () => {
      const categories: MenuCategory[] = [
        'thali',
        'ghar-ka-khana',
        'street-delights',
        'mithai',
        'sattu-specials',
      ];

      expect(categories).toHaveLength(5);
    });
  });

  describe('SpiceLevel', () => {
    it('should accept all valid spice level values', () => {
      const levels: SpiceLevel[] = ['mild', 'medium', 'hot'];

      expect(levels).toHaveLength(3);
    });
  });

  describe('CartItem', () => {
    it('should accept valid cart item object', () => {
      const cartItem: CartItem = {
        menuItemId: '1',
        name: 'Litti Chokha',
        nameHi: 'लिट्टी चोखा',
        price: 150,
        quantity: 2,
        image: '/images/dishes/litti-chokha.jpg',
      };

      expect(cartItem.quantity).toBe(2);
      expect(cartItem.price).toBe(150);
    });
  });

  describe('Cart', () => {
    it('should accept valid cart object with calculations', () => {
      const cart: Cart = {
        items: [
          {
            menuItemId: '1',
            name: 'Litti Chokha',
            nameHi: 'लिट्टी चोखा',
            price: 150,
            quantity: 2,
            image: '/images/dishes/litti-chokha.jpg',
          },
        ],
        subtotal: 300,
        tax: 15,
        total: 315,
      };

      expect(cart.items).toHaveLength(1);
      expect(cart.subtotal).toBe(300);
      expect(cart.total).toBe(315);
    });
  });

  describe('Booking', () => {
    it('should accept valid booking object', () => {
      const booking: Booking = {
        id: 'booking-1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 4,
        specialRequests: 'Window seat please',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(booking.name).toBe('John Doe');
      expect(booking.partySize).toBe(4);
      expect(booking.status).toBe('pending');
    });

    it('should accept booking without optional specialRequests', () => {
      const booking: Booking = {
        id: 'booking-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9876543211',
        date: new Date('2024-12-26'),
        time: '20:00',
        partySize: 2,
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(booking.specialRequests).toBeUndefined();
    });
  });

  describe('BookingStatus', () => {
    it('should accept all valid booking status values', () => {
      const statuses: BookingStatus[] = ['pending', 'confirmed', 'cancelled'];

      expect(statuses).toHaveLength(3);
    });
  });

  describe('BookingData', () => {
    it('should accept valid booking form data', () => {
      const bookingData: BookingData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 4,
        specialRequests: 'Window seat',
      };

      expect(bookingData.name).toBe('John Doe');
      expect(bookingData.partySize).toBe(4);
    });
  });

  describe('WhatsAppOrder', () => {
    it('should accept valid WhatsApp order object', () => {
      const order: WhatsAppOrder = {
        customerName: 'John Doe',
        customerPhone: '9876543210',
        deliveryAddress: '123 Main St, Patna',
        items: [
          {
            name: 'Litti Chokha',
            quantity: 2,
            price: 150,
          },
        ],
        subtotal: 300,
        tax: 15,
        total: 315,
        orderDate: new Date(),
      };

      expect(order.customerName).toBe('John Doe');
      expect(order.items).toHaveLength(1);
      expect(order.total).toBe(315);
    });
  });

  describe('CustomerInfo', () => {
    it('should accept valid customer info object', () => {
      const customerInfo: CustomerInfo = {
        name: 'John Doe',
        phone: '9876543210',
        address: '123 Main St, Patna',
      };

      expect(customerInfo.name).toBe('John Doe');
      expect(customerInfo.phone).toBe('9876543210');
    });
  });

  describe('RestaurantInfo', () => {
    it('should accept valid restaurant info object', () => {
      const restaurantInfo: RestaurantInfo = {
        name: 'Bihar Bhojan',
        nameHi: 'बिहार भोजन',
        address: '123 Gandhi Maidan, Patna',
        addressHi: '123 गांधी मैदान, पटना',
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
        },
      };

      expect(restaurantInfo.name).toBe('Bihar Bhojan');
      expect(restaurantInfo.coordinates.lat).toBe(25.5941);
      expect(restaurantInfo.hours.monday.open).toBe('11:00');
    });
  });

  describe('CulturalEvent', () => {
    it('should accept valid cultural event object', () => {
      const event: CulturalEvent = {
        id: 'event-1',
        title: 'Chhath Puja Celebration',
        titleHi: 'छठ पूजा समारोह',
        description: 'Traditional Chhath Puja celebration',
        descriptionHi: 'पारंपरिक छठ पूजा समारोह',
        date: new Date('2024-11-07'),
        time: '18:00',
        image: '/images/cultural/chhath.jpg',
        type: 'cultural-evening',
      };

      expect(event.title).toBe('Chhath Puja Celebration');
      expect(event.type).toBe('cultural-evening');
    });
  });

  describe('CulturalEventType', () => {
    it('should accept all valid event type values', () => {
      const types: CulturalEventType[] = [
        'cultural-evening',
        'cooking-workshop',
        'special-event',
      ];

      expect(types).toHaveLength(3);
    });
  });

  describe('Testimonial', () => {
    it('should accept valid testimonial object', () => {
      const testimonial: Testimonial = {
        id: 'testimonial-1',
        customerName: 'Rajesh Kumar',
        rating: 5,
        comment: 'Excellent authentic Bihari food!',
        commentHi: 'उत्कृष्ट प्रामाणिक बिहारी भोजन!',
        date: new Date('2024-01-15'),
        image: '/images/testimonials/rajesh.jpg',
      };

      expect(testimonial.customerName).toBe('Rajesh Kumar');
      expect(testimonial.rating).toBe(5);
    });

    it('should accept testimonial without optional image', () => {
      const testimonial: Testimonial = {
        id: 'testimonial-2',
        customerName: 'Priya Singh',
        rating: 4,
        comment: 'Great food and ambiance',
        commentHi: 'बढ़िया खाना और माहौल',
        date: new Date('2024-01-20'),
      };

      expect(testimonial.image).toBeUndefined();
    });
  });

  describe('ContactData', () => {
    it('should accept valid contact form data', () => {
      const contactData: ContactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to inquire about catering services.',
      };

      expect(contactData.name).toBe('John Doe');
      expect(contactData.message).toContain('catering');
    });
  });

  describe('Experience', () => {
    it('should accept valid experience object', () => {
      const experience: Experience = {
        id: 'exp-1',
        title: 'Traditional Floor Seating',
        titleHi: 'पारंपरिक फर्श बैठक',
        description: 'Experience authentic Bihari dining on traditional floor seating',
        descriptionHi: 'पारंपरिक फर्श बैठक पर प्रामाणिक बिहारी भोजन का अनुभव करें',
        image: '/images/experiences/floor-seating.jpg',
        type: 'seating',
      };

      expect(experience.title).toBe('Traditional Floor Seating');
      expect(experience.type).toBe('seating');
    });
  });

  describe('Result', () => {
    it('should accept success result', () => {
      const result: Result<string> = {
        success: true,
        data: 'Operation completed successfully',
      };

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('Operation completed successfully');
      }
    });

    it('should accept error result', () => {
      const result: Result<string> = {
        success: false,
        error: 'Operation failed',
      };

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Operation failed');
      }
    });

    it('should work with complex data types', () => {
      const result: Result<Booking> = {
        success: true,
        data: {
          id: 'booking-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9876543210',
          date: new Date('2024-12-25'),
          time: '19:00',
          partySize: 4,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
      }
    });
  });

  describe('Locale', () => {
    it('should accept all valid locale values', () => {
      const locales: Locale[] = ['en', 'hi'];

      expect(locales).toHaveLength(2);
    });
  });
});

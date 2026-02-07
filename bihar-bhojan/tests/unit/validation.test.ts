/**
 * Unit tests for Zod validation schemas
 * Requirements: 13.1, 13.3, 13.4
 */

import { describe, it, expect } from 'vitest';
import {
  BookingFormSchema,
  ContactFormSchema,
  AdminLoginSchema,
  MenuItemSchema,
  MenuItemsArraySchema,
  WhatsAppCustomerInfoSchema,
  validateIndianPhone,
  validateEmail,
  validateFutureDate,
} from '../../lib/validation';

// ============================================================================
// BookingFormSchema Tests
// ============================================================================

describe('BookingFormSchema', () => {
  describe('valid data', () => {
    it('should accept valid booking data', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
        specialRequests: 'Window seat please',
      };

      const result = BookingFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept booking without special requests', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9123456789',
        date: tomorrow,
        time: '20:00',
        partySize: 2,
      };

      const result = BookingFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept party size of 1', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const validData = {
        name: 'Solo Diner',
        email: 'solo@example.com',
        phone: '9000000001',
        date: tomorrow,
        time: '18:00',
        partySize: 1,
      };

      const result = BookingFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept party size of 20', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const validData = {
        name: 'Large Group',
        email: 'group@example.com',
        phone: '9999999999',
        date: tomorrow,
        time: '19:00',
        partySize: 20,
      };

      const result = BookingFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('invalid name', () => {
    it('should reject empty name', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: '',
        email: 'test@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Name is required');
      }
    });

    it('should reject name with only 1 character', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'A',
        email: 'test@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 2 characters');
      }
    });
  });

  describe('invalid email', () => {
    it('should reject invalid email format', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid email');
      }
    });

    it('should reject empty email', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: '',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Email is required');
      }
    });
  });

  describe('invalid phone', () => {
    it('should reject phone with less than 10 digits', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '987654321',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('10 digits');
      }
    });

    it('should reject phone with more than 10 digits', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '98765432101',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('10 digits');
      }
    });

    it('should reject phone with non-numeric characters', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '987-654-321',
        date: tomorrow,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('10 digits');
      }
    });
  });

  describe('invalid date', () => {
    it('should reject past date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: yesterday,
        time: '19:30',
        partySize: 4,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('future date');
      }
    });
  });

  describe('invalid party size', () => {
    it('should reject party size of 0', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 0,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 1');
      }
    });

    it('should reject party size greater than 20', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: 21,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at most 20');
      }
    });

    it('should reject negative party size', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:30',
        partySize: -5,
      };

      const result = BookingFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

// ============================================================================
// ContactFormSchema Tests
// ============================================================================

describe('ContactFormSchema', () => {
  describe('valid data', () => {
    it('should accept valid contact data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to inquire about catering services.',
      };

      const result = ContactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('invalid message', () => {
    it('should reject empty message', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: '',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Message is required');
      }
    });

    it('should reject message shorter than 10 characters', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'Hi there',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 10 characters');
      }
    });

    it('should reject message longer than 1000 characters', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'a'.repeat(1001),
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('less than 1000 characters');
      }
    });
  });
});

// ============================================================================
// AdminLoginSchema Tests
// ============================================================================

describe('AdminLoginSchema', () => {
  describe('valid data', () => {
    it('should accept valid password', () => {
      const validData = {
        password: 'SecurePassword123',
      };

      const result = AdminLoginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept password with exactly 8 characters', () => {
      const validData = {
        password: 'Pass1234',
      };

      const result = AdminLoginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('invalid password', () => {
    it('should reject empty password', () => {
      const invalidData = {
        password: '',
      };

      const result = AdminLoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Password is required');
      }
    });

    it('should reject password shorter than 8 characters', () => {
      const invalidData = {
        password: 'Pass123',
      };

      const result = AdminLoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 8 characters');
      }
    });
  });
});

// ============================================================================
// MenuItemSchema Tests
// ============================================================================

describe('MenuItemSchema', () => {
  describe('valid data', () => {
    it('should accept valid menu item', () => {
      const validData = {
        id: 'litti-chokha-1',
        name: 'Litti Chokha',
        nameHi: 'लिट्टी चोखा',
        description: 'Traditional Bihari dish with roasted wheat balls',
        descriptionHi: 'भुने हुए गेहूं के गोले के साथ पारंपरिक बिहारी व्यंजन',
        price: 150,
        category: 'ghar-ka-khana',
        image: '/images/dishes/litti-chokha.jpg',
        isVeg: true,
        spiceLevel: 'medium',
        isAvailable: true,
        featured: true,
      };

      const result = MenuItemSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept menu item without spice level', () => {
      const validData = {
        id: 'rasgulla-1',
        name: 'Rasgulla',
        nameHi: 'रसगुल्ला',
        description: 'Sweet cottage cheese balls in sugar syrup',
        descriptionHi: 'चीनी की चाशनी में मीठे पनीर के गोले',
        price: 80,
        category: 'mithai',
        image: '/images/dishes/rasgulla.png',
        isVeg: true,
        isAvailable: true,
        featured: false,
      };

      const result = MenuItemSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('invalid price', () => {
    it('should reject negative price', () => {
      const invalidData = {
        id: 'test-1',
        name: 'Test Dish',
        nameHi: 'टेस्ट डिश',
        description: 'Test description',
        descriptionHi: 'टेस्ट विवरण',
        price: -50,
        category: 'thali',
        image: '/images/dishes/test.jpg',
        isVeg: true,
        isAvailable: true,
        featured: false,
      };

      const result = MenuItemSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('positive');
      }
    });

    it('should reject zero price', () => {
      const invalidData = {
        id: 'test-1',
        name: 'Test Dish',
        nameHi: 'टेस्ट डिश',
        description: 'Test description',
        descriptionHi: 'टेस्ट विवरण',
        price: 0,
        category: 'thali',
        image: '/images/dishes/test.jpg',
        isVeg: true,
        isAvailable: true,
        featured: false,
      };

      const result = MenuItemSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('positive');
      }
    });
  });

  describe('invalid category', () => {
    it('should reject invalid category', () => {
      const invalidData = {
        id: 'test-1',
        name: 'Test Dish',
        nameHi: 'टेस्ट डिश',
        description: 'Test description',
        descriptionHi: 'टेस्ट विवरण',
        price: 100,
        category: 'invalid-category',
        image: '/images/dishes/test.jpg',
        isVeg: true,
        isAvailable: true,
        featured: false,
      };

      const result = MenuItemSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('invalid image path', () => {
    it('should reject image path without proper format', () => {
      const invalidData = {
        id: 'test-1',
        name: 'Test Dish',
        nameHi: 'टेस्ट डिश',
        description: 'Test description',
        descriptionHi: 'टेस्ट विवरण',
        price: 100,
        category: 'thali',
        image: 'invalid-path.jpg',
        isVeg: true,
        isAvailable: true,
        featured: false,
      };

      const result = MenuItemSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid image path');
      }
    });
  });

  describe('invalid spice level', () => {
    it('should reject invalid spice level', () => {
      const invalidData = {
        id: 'test-1',
        name: 'Test Dish',
        nameHi: 'टेस्ट डिश',
        description: 'Test description',
        descriptionHi: 'टेस्ट विवरण',
        price: 100,
        category: 'thali',
        image: '/images/dishes/test.jpg',
        isVeg: true,
        spiceLevel: 'extra-hot',
        isAvailable: true,
        featured: false,
      };

      const result = MenuItemSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

// ============================================================================
// MenuItemsArraySchema Tests
// ============================================================================

describe('MenuItemsArraySchema', () => {
  it('should accept array of valid menu items', () => {
    const validData = [
      {
        id: 'item-1',
        name: 'Dish 1',
        nameHi: 'डिश 1',
        description: 'Description 1',
        descriptionHi: 'विवरण 1',
        price: 100,
        category: 'thali',
        image: '/images/dishes/dish1.jpg',
        isVeg: true,
        isAvailable: true,
        featured: false,
      },
      {
        id: 'item-2',
        name: 'Dish 2',
        nameHi: 'डिश 2',
        description: 'Description 2',
        descriptionHi: 'विवरण 2',
        price: 150,
        category: 'mithai',
        image: '/images/dishes/dish2.jpg',
        isVeg: true,
        isAvailable: true,
        featured: true,
      },
    ];

    const result = MenuItemsArraySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty array', () => {
    const invalidData: any[] = [];

    const result = MenuItemsArraySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('At least one menu item');
    }
  });
});

// ============================================================================
// WhatsAppCustomerInfoSchema Tests
// ============================================================================

describe('WhatsAppCustomerInfoSchema', () => {
  describe('valid data', () => {
    it('should accept valid customer info', () => {
      const validData = {
        name: 'John Doe',
        phone: '9876543210',
        address: '123 Main Street, Patna, Bihar 800001',
      };

      const result = WhatsAppCustomerInfoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('invalid address', () => {
    it('should reject empty address', () => {
      const invalidData = {
        name: 'John Doe',
        phone: '9876543210',
        address: '',
      };

      const result = WhatsAppCustomerInfoSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('address is required');
      }
    });

    it('should reject address shorter than 10 characters', () => {
      const invalidData = {
        name: 'John Doe',
        phone: '9876543210',
        address: 'Short',
      };

      const result = WhatsAppCustomerInfoSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 10 characters');
      }
    });

    it('should reject address longer than 300 characters', () => {
      const invalidData = {
        name: 'John Doe',
        phone: '9876543210',
        address: 'a'.repeat(301),
      };

      const result = WhatsAppCustomerInfoSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('less than 300 characters');
      }
    });
  });
});

// ============================================================================
// Helper Functions Tests
// ============================================================================

describe('validateIndianPhone', () => {
  it('should return true for valid 10-digit phone', () => {
    expect(validateIndianPhone('9876543210')).toBe(true);
    expect(validateIndianPhone('8123456789')).toBe(true);
  });

  it('should return false for invalid phone', () => {
    expect(validateIndianPhone('987654321')).toBe(false); // 9 digits
    expect(validateIndianPhone('98765432101')).toBe(false); // 11 digits
    expect(validateIndianPhone('987-654-3210')).toBe(false); // with dashes
    expect(validateIndianPhone('abcdefghij')).toBe(false); // letters
  });
});

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.in')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('missing@domain')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
  });
});

describe('validateFutureDate', () => {
  it('should return true for future dates', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(validateFutureDate(tomorrow)).toBe(true);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    expect(validateFutureDate(nextWeek)).toBe(true);
  });

  it('should return true for today', () => {
    const today = new Date();
    expect(validateFutureDate(today)).toBe(true);
  });

  it('should return false for past dates', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(validateFutureDate(yesterday)).toBe(false);

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    expect(validateFutureDate(lastWeek)).toBe(false);
  });
});

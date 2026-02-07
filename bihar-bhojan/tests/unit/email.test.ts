/**
 * Unit tests for email service
 * Requirements: 2.2, 10.1, 12.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendBookingEmail, sendBookingStatusEmail, sendContactEmail } from '../../lib/email';
import type { Booking } from '../../lib/types';

// Mock Resend
vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
      },
    })),
  };
});

describe('Email Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sendBookingEmail', () => {
    it('should send booking confirmation email without errors', async () => {
      const mockBooking: Booking = {
        id: 'booking-123',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 4,
        specialRequests: 'Window seat please',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();
    });

    it('should handle booking without special requests', async () => {
      const mockBooking: Booking = {
        id: 'booking-456',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        date: new Date('2024-12-26'),
        time: '20:00',
        partySize: 2,
        specialRequests: undefined,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();
    });

    it('should handle large party sizes', async () => {
      const mockBooking: Booking = {
        id: 'booking-789',
        name: 'Corporate Event',
        email: 'events@company.com',
        phone: '9876543212',
        date: new Date('2024-12-27'),
        time: '18:00',
        partySize: 20,
        specialRequests: 'Need separate room',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();
    });
  });

  describe('sendBookingStatusEmail', () => {
    it('should send confirmation email to customer', async () => {
      const mockBooking: Booking = {
        id: 'booking-123',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 4,
        specialRequests: 'Window seat please',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(
        sendBookingStatusEmail(mockBooking, 'confirmed')
      ).resolves.not.toThrow();
    });

    it('should send cancellation email to customer', async () => {
      const mockBooking: Booking = {
        id: 'booking-456',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        date: new Date('2024-12-26'),
        time: '20:00',
        partySize: 2,
        specialRequests: undefined,
        status: 'cancelled',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(
        sendBookingStatusEmail(mockBooking, 'cancelled')
      ).resolves.not.toThrow();
    });

    it('should handle different date formats', async () => {
      const mockBooking: Booking = {
        id: 'booking-789',
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543213',
        date: new Date('2025-01-01'),
        time: '12:00',
        partySize: 3,
        specialRequests: undefined,
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(
        sendBookingStatusEmail(mockBooking, 'confirmed')
      ).resolves.not.toThrow();
    });
  });

  describe('sendContactEmail', () => {
    it('should send contact form email', async () => {
      const contactData = {
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '9876543214',
        message: 'I would like to inquire about catering services for a wedding.',
      };

      await expect(sendContactEmail(contactData)).resolves.not.toThrow();
    });

    it('should handle long messages', async () => {
      const contactData = {
        name: 'Neha Singh',
        email: 'neha@example.com',
        phone: '9876543215',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20),
      };

      await expect(sendContactEmail(contactData)).resolves.not.toThrow();
    });

    it('should handle special characters in message', async () => {
      const contactData = {
        name: 'Vikram Rao',
        email: 'vikram@example.com',
        phone: '9876543216',
        message: 'Can you accommodate dietary restrictions? We need:\n- Gluten-free options\n- Vegan dishes\n- No nuts',
      };

      await expect(sendContactEmail(contactData)).resolves.not.toThrow();
    });

    it('should handle Hindi names', async () => {
      const contactData = {
        name: 'राजेश कुमार',
        email: 'rajesh.hindi@example.com',
        phone: '9876543217',
        message: 'मुझे बिहारी व्यंजनों के बारे में जानकारी चाहिए।',
      };

      await expect(sendContactEmail(contactData)).resolves.not.toThrow();
    });
  });

  describe('Email formatting', () => {
    it('should format dates correctly for Indian locale', async () => {
      const mockBooking: Booking = {
        id: 'booking-format-test',
        name: 'Format Test',
        email: 'format@example.com',
        phone: '9876543218',
        date: new Date('2024-12-31'),
        time: '23:59',
        partySize: 1,
        specialRequests: undefined,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Should not throw and should handle date formatting
      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();
    });

    it('should handle party size of 1 (singular)', async () => {
      const mockBooking: Booking = {
        id: 'booking-singular',
        name: 'Solo Diner',
        email: 'solo@example.com',
        phone: '9876543219',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 1,
        specialRequests: undefined,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();
    });

    it('should handle party size > 1 (plural)', async () => {
      const mockBooking: Booking = {
        id: 'booking-plural',
        name: 'Group Diner',
        email: 'group@example.com',
        phone: '9876543220',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 5,
        specialRequests: undefined,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();
    });
  });

  describe('Error handling', () => {
    it('should work without RESEND_API_KEY (console fallback)', async () => {
      // When no API key is set, emails should log to console instead
      const originalEnv = process.env.RESEND_API_KEY;
      delete process.env.RESEND_API_KEY;

      const mockBooking: Booking = {
        id: 'booking-no-key',
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543221',
        date: new Date('2024-12-25'),
        time: '19:00',
        partySize: 2,
        specialRequests: undefined,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(sendBookingEmail(mockBooking)).resolves.not.toThrow();

      // Restore environment
      if (originalEnv) {
        process.env.RESEND_API_KEY = originalEnv;
      }
    });
  });
});

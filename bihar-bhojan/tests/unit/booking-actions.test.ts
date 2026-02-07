/**
 * Unit tests for booking server actions
 * Requirements: 2.1, 2.2, 6.3, 6.6
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createBooking, getBookings, updateBookingStatus } from '../../app/actions/bookings';
import { prisma } from '../../lib/prisma';

// Mock the email module
vi.mock('../../lib/email', () => ({
  sendBookingEmail: vi.fn().mockResolvedValue(undefined),
  sendBookingStatusEmail: vi.fn().mockResolvedValue(undefined),
}));

describe('Booking Server Actions', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await prisma.booking.deleteMany();
  });

  describe('createBooking', () => {
    it('should create a booking with valid data', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 4,
        specialRequests: 'Window seat please',
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBe(bookingData.name);
        expect(result.data.email).toBe(bookingData.email);
        expect(result.data.phone).toBe(bookingData.phone);
        expect(result.data.time).toBe(bookingData.time);
        expect(result.data.partySize).toBe(bookingData.partySize);
        expect(result.data.specialRequests).toBe(bookingData.specialRequests);
        expect(result.data.status).toBe('pending');
        expect(result.data.createdAt).toBeDefined();
        expect(result.data.updatedAt).toBeDefined();
      }
    });

    it('should create a booking without special requests', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9123456789',
        date: tomorrow,
        time: '20:00',
        partySize: 2,
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.specialRequests).toBeUndefined();
      }
    });

    it('should reject booking with invalid email', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 4,
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('valid email');
      }
    });

    it('should reject booking with invalid phone', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123',
        date: tomorrow,
        time: '19:00',
        partySize: 4,
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('10 digits');
      }
    });

    it('should reject booking with past date', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const bookingData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: yesterday,
        time: '19:00',
        partySize: 4,
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('future date');
      }
    });

    it('should reject booking with party size less than 1', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 0,
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('at least 1');
      }
    });

    it('should reject booking with party size greater than 20', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookingData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 21,
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('at most 20');
      }
    });

    it('should reject booking with missing required fields', async () => {
      const bookingData = {
        name: 'John Doe',
        // Missing email, phone, date, time, partySize
      };

      const result = await createBooking(bookingData);

      expect(result.success).toBe(false);
    });
  });

  describe('getBookings', () => {
    it('should return all bookings sorted by date', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      // Create two bookings
      await createBooking({
        name: 'User 1',
        email: 'user1@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 2,
      });

      await createBooking({
        name: 'User 2',
        email: 'user2@example.com',
        phone: '9876543211',
        date: nextWeek,
        time: '20:00',
        partySize: 4,
      });

      const result = await getBookings('admin-token');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(2);
        // Should be sorted by date descending (nextWeek first)
        expect(result.data[0].name).toBe('User 2');
        expect(result.data[1].name).toBe('User 1');
      }
    });

    it('should return empty array when no bookings exist', async () => {
      const result = await getBookings('admin-token');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(0);
      }
    });

    it('should reject request without admin auth', async () => {
      const result = await getBookings();

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Authentication required');
      }
    });
  });

  describe('updateBookingStatus', () => {
    it('should update booking status to confirmed', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Create a booking
      const createResult = await createBooking({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 4,
      });

      expect(createResult.success).toBe(true);
      if (!createResult.success) return;

      const bookingId = createResult.data.id;

      // Update status
      const updateResult = await updateBookingStatus(
        bookingId,
        'confirmed',
        'admin-token'
      );

      expect(updateResult.success).toBe(true);

      // Verify status was updated
      const getResult = await getBookings('admin-token');
      expect(getResult.success).toBe(true);
      if (getResult.success) {
        const booking = getResult.data.find((b) => b.id === bookingId);
        expect(booking?.status).toBe('confirmed');
      }
    });

    it('should update booking status to cancelled', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Create a booking
      const createResult = await createBooking({
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9123456789',
        date: tomorrow,
        time: '20:00',
        partySize: 2,
      });

      expect(createResult.success).toBe(true);
      if (!createResult.success) return;

      const bookingId = createResult.data.id;

      // Update status
      const updateResult = await updateBookingStatus(
        bookingId,
        'cancelled',
        'admin-token'
      );

      expect(updateResult.success).toBe(true);

      // Verify status was updated
      const getResult = await getBookings('admin-token');
      expect(getResult.success).toBe(true);
      if (getResult.success) {
        const booking = getResult.data.find((b) => b.id === bookingId);
        expect(booking?.status).toBe('cancelled');
      }
    });

    it('should reject update with invalid status', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Create a booking
      const createResult = await createBooking({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        date: tomorrow,
        time: '19:00',
        partySize: 4,
      });

      expect(createResult.success).toBe(true);
      if (!createResult.success) return;

      const bookingId = createResult.data.id;

      // Try to update with invalid status
      const updateResult = await updateBookingStatus(
        bookingId,
        'invalid-status' as any,
        'admin-token'
      );

      expect(updateResult.success).toBe(false);
      if (!updateResult.success) {
        expect(updateResult.error).toContain('Invalid status');
      }
    });

    it('should reject update for non-existent booking', async () => {
      const updateResult = await updateBookingStatus(
        'non-existent-id',
        'confirmed',
        'admin-token'
      );

      expect(updateResult.success).toBe(false);
      if (!updateResult.success) {
        expect(updateResult.error).toContain('not found');
      }
    });

    it('should reject update without admin auth', async () => {
      const updateResult = await updateBookingStatus(
        'some-id',
        'confirmed'
      );

      expect(updateResult.success).toBe(false);
      if (!updateResult.success) {
        expect(updateResult.error).toContain('Authentication required');
      }
    });
  });
});

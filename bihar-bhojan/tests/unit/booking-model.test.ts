import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { prisma } from '@/lib/prisma';

describe('Booking Model', () => {
  // Clean up test data after each test
  afterEach(async () => {
    await prisma.booking.deleteMany();
  });

  it('should create a booking with all required fields', async () => {
    const bookingData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      date: new Date('2025-12-31'),
      time: '19:00',
      partySize: 4,
    };

    const booking = await prisma.booking.create({
      data: bookingData,
    });

    expect(booking).toBeDefined();
    expect(booking.id).toBeDefined();
    expect(booking.name).toBe(bookingData.name);
    expect(booking.email).toBe(bookingData.email);
    expect(booking.phone).toBe(bookingData.phone);
    expect(booking.time).toBe(bookingData.time);
    expect(booking.partySize).toBe(bookingData.partySize);
    expect(booking.status).toBe('pending'); // Default status
    expect(booking.createdAt).toBeInstanceOf(Date);
    expect(booking.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a booking with optional specialRequests field', async () => {
    const bookingData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      date: new Date('2025-12-31'),
      time: '19:00',
      partySize: 4,
      specialRequests: 'Window seat please',
    };

    const booking = await prisma.booking.create({
      data: bookingData,
    });

    expect(booking.specialRequests).toBe('Window seat please');
  });

  it('should retrieve a booking by id', async () => {
    const bookingData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      date: new Date('2025-12-31'),
      time: '19:00',
      partySize: 4,
    };

    const createdBooking = await prisma.booking.create({
      data: bookingData,
    });

    const retrievedBooking = await prisma.booking.findUnique({
      where: { id: createdBooking.id },
    });

    expect(retrievedBooking).toBeDefined();
    expect(retrievedBooking?.id).toBe(createdBooking.id);
    expect(retrievedBooking?.name).toBe(bookingData.name);
  });

  it('should update booking status', async () => {
    const bookingData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      date: new Date('2025-12-31'),
      time: '19:00',
      partySize: 4,
    };

    const booking = await prisma.booking.create({
      data: bookingData,
    });

    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'confirmed' },
    });

    expect(updatedBooking.status).toBe('confirmed');
    expect(updatedBooking.updatedAt.getTime()).toBeGreaterThan(
      booking.updatedAt.getTime()
    );
  });

  it('should retrieve all bookings', async () => {
    const bookings = [
      {
        name: 'User 1',
        email: 'user1@example.com',
        phone: '9876543210',
        date: new Date('2025-12-31'),
        time: '19:00',
        partySize: 2,
      },
      {
        name: 'User 2',
        email: 'user2@example.com',
        phone: '9876543211',
        date: new Date('2025-12-31'),
        time: '20:00',
        partySize: 4,
      },
    ];

    await prisma.booking.createMany({
      data: bookings,
    });

    const allBookings = await prisma.booking.findMany();

    expect(allBookings).toHaveLength(2);
  });
});

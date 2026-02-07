/**
 * Server Actions for booking management
 * Requirements: 2.1, 2.2, 6.3, 6.6
 */

'use server';

import { prisma } from '@/lib/prisma';
import { BookingFormSchema } from '@/lib/validation';
import { sendBookingEmail, sendBookingStatusEmail } from '@/lib/email';
import type { Result, Booking, BookingStatus } from '@/lib/types';

/**
 * Create a new booking
 * Requirements: 2.1, 2.2
 * 
 * Validates input, stores in database, and sends email notification
 */
export async function createBooking(
  data: unknown
): Promise<Result<Booking>> {
  try {
    // Validate input with Zod
    const validationResult = BookingFormSchema.safeParse(data);
    
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0].message,
      };
    }

    const validData = validationResult.data;

    // Store in database via Prisma
    const booking = await prisma.booking.create({
      data: {
        name: validData.name,
        email: validData.email,
        phone: validData.phone,
        date: validData.date,
        time: validData.time,
        partySize: validData.partySize,
        specialRequests: validData.specialRequests,
        status: 'pending',
      },
    });

    // Convert Prisma booking to our Booking type
    const bookingResult: Booking = {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      partySize: booking.partySize,
      specialRequests: booking.specialRequests || undefined,
      status: booking.status as BookingStatus,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    // Send email notification (non-blocking)
    sendBookingEmail(bookingResult).catch((error) => {
      console.error('Failed to send booking email:', error);
      // Don't fail the booking if email fails
    });

    return {
      success: true,
      data: bookingResult,
    };
  } catch (error: unknown) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: 'Failed to create booking. Please try again.',
    };
  }
}

/**
 * Get all bookings (admin only)
 * Requirement 6.3
 * 
 * Fetches all bookings from database, sorted by date
 */
export async function getBookings(
  adminAuth?: string
): Promise<Result<Booking[]>> {
  try {
    // TODO: Verify admin authentication when auth is implemented
    // For now, we'll allow access (will be secured in task 4.7)
    if (!adminAuth) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    // Fetch all bookings from database
    const bookings = await prisma.booking.findMany({
      orderBy: [
        { date: 'desc' },
        { time: 'desc' },
      ],
    });

    // Convert Prisma bookings to our Booking type
    const bookingResults: Booking[] = bookings.map((booking: typeof bookings[0]): Booking => ({
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      partySize: booking.partySize,
      specialRequests: booking.specialRequests || undefined,
      status: booking.status as BookingStatus,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }));

    return {
      success: true,
      data: bookingResults,
    };
  } catch (error: unknown) {
    console.error('Error fetching bookings:', error);
    return {
      success: false,
      error: 'Failed to fetch bookings. Please try again.',
    };
  }
}

/**
 * Update booking status (admin only)
 * Requirement 6.6
 * 
 * Updates booking status and sends confirmation email
 */
export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminAuth?: string
): Promise<Result<void>> {
  try {
    // TODO: Verify admin authentication when auth is implemented
    // For now, we'll allow access (will be secured in task 4.7)
    if (!adminAuth) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    // Validate status
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return {
        success: false,
        error: 'Invalid status. Must be pending, confirmed, or cancelled.',
      };
    }

    // Update booking status
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    // Convert to our Booking type
    const bookingResult: Booking = {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      partySize: booking.partySize,
      specialRequests: booking.specialRequests || undefined,
      status: booking.status as BookingStatus,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    // Send confirmation email (non-blocking)
    sendBookingStatusEmail(bookingResult, status).catch((error) => {
      console.error('Failed to send status update email:', error);
      // Don't fail the update if email fails
    });

    return {
      success: true,
      data: undefined,
    };
  } catch (error: unknown) {
    console.error('Error updating booking status:', error);
    
    // Check if booking not found
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return {
        success: false,
        error: 'Booking not found.',
      };
    }

    return {
      success: false,
      error: 'Failed to update booking status. Please try again.',
    };
  }
}

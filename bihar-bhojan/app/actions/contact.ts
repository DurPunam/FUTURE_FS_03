/**
 * Server Actions for contact form
 * Requirements: 10.1
 */

'use server';

import { ContactFormSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';
import type { Result, ContactData } from '@/lib/types';

/**
 * Send contact form message
 * Requirement 10.1
 * 
 * Validates input and sends email to restaurant
 */
export async function sendContactMessage(
  data: unknown
): Promise<Result<void>> {
  try {
    // Validate input with Zod
    const validationResult = ContactFormSchema.safeParse(data);
    
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0].message,
      };
    }

    const validData = validationResult.data;

    // Prepare contact data
    const contactData: ContactData = {
      name: validData.name,
      email: validData.email,
      phone: validData.phone,
      message: validData.message,
    };

    // Send email via free service
    await sendContactEmail(contactData);

    return {
      success: true,
      data: undefined,
    };
  } catch (error: unknown) {
    console.error('Error sending contact message:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    };
  }
}

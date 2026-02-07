/**
 * Unit tests for contact server actions
 * Requirements: 10.1
 */

import { describe, it, expect, vi } from 'vitest';
import { sendContactMessage } from '../../app/actions/contact';

// Mock the email module
vi.mock('../../lib/email', () => ({
  sendContactEmail: vi.fn().mockResolvedValue(undefined),
}));

describe('Contact Server Actions', () => {
  describe('sendContactMessage', () => {
    it('should send contact message with valid data', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(true);
    });

    it('should reject message with invalid email', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('valid email');
      }
    });

    it('should reject message with invalid phone', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('10 digits');
      }
    });

    it('should reject message with missing name', async () => {
      const contactData = {
        name: '',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Name is required');
      }
    });

    it('should reject message with short name', async () => {
      const contactData = {
        name: 'J',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('at least 2 characters');
      }
    });

    it('should reject message with missing email', async () => {
      const contactData = {
        name: 'John Doe',
        email: '',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Email is required');
      }
    });

    it('should reject message with missing phone', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Phone number is required');
      }
    });

    it('should reject message with missing message', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: '',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Message is required');
      }
    });

    it('should reject message with short message', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'Hi',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('at least 10 characters');
      }
    });

    it('should reject message with too long message', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'a'.repeat(1001),
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('less than 1000 characters');
      }
    });

    it('should reject message with too long name', async () => {
      const contactData = {
        name: 'a'.repeat(101),
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('less than 100 characters');
      }
    });

    it('should reject message with phone containing non-digits', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '98765-4321',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('10 digits');
      }
    });

    it('should reject message with missing required fields', async () => {
      const contactData = {
        name: 'John Doe',
        // Missing email, phone, message
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
    });

    it('should handle email service errors gracefully', async () => {
      // Mock email service to throw error
      const { sendContactEmail } = await import('../../lib/email');
      vi.mocked(sendContactEmail).mockRejectedValueOnce(new Error('Email service error'));

      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        message: 'I would like to know more about your catering services.',
      };

      const result = await sendContactMessage(contactData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Failed to send message');
      }

      // Reset mock
      vi.mocked(sendContactEmail).mockResolvedValue(undefined);
    });
  });
});

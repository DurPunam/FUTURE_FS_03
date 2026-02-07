/**
 * Unit tests for admin authentication server actions
 * Requirement: 6.1
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { authenticateAdmin, verifyAdminSession, logoutAdmin } from '../../app/actions/admin';

// Store original environment variables
const originalEnv = process.env;

describe('Admin Authentication Server Actions', () => {
  beforeEach(() => {
    // Reset environment variables before each test
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.ADMIN_PASSWORD = 'test-admin-password';
    process.env.JWT_SECRET = 'test-jwt-secret-for-testing';
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('authenticateAdmin', () => {
    it('should authenticate with correct password', async () => {
      const result = await authenticateAdmin('test-admin-password');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(typeof result.data).toBe('string');
        expect(result.data.length).toBeGreaterThan(0);
      }
    });

    it('should reject authentication with incorrect password', async () => {
      const result = await authenticateAdmin('wrong-password');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid password.');
      }
    });

    it('should reject authentication with empty password', async () => {
      const result = await authenticateAdmin('');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid password.');
      }
    });

    it('should handle missing ADMIN_PASSWORD environment variable', async () => {
      delete process.env.ADMIN_PASSWORD;

      const result = await authenticateAdmin('any-password');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('not configured');
      }
    });

    it('should create a valid token', async () => {
      const result = await authenticateAdmin('test-admin-password');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(typeof result.data).toBe('string');
        expect(result.data.length).toBeGreaterThan(0);
        // Token should have 2 parts separated by a dot (payload.signature)
        const parts = result.data.split('.');
        expect(parts).toHaveLength(2);
      }
    });
  });

  describe('verifyAdminSession', () => {
    it('should verify a valid session token', async () => {
      // First authenticate to get a token
      const authResult = await authenticateAdmin('test-admin-password');
      expect(authResult.success).toBe(true);
      if (!authResult.success) return;

      const token = authResult.data;

      // Verify the token
      const isValid = await verifyAdminSession(token);
      expect(isValid).toBe(true);
    });

    it('should reject an invalid token', async () => {
      const isValid = await verifyAdminSession('invalid-token');
      expect(isValid).toBe(false);
    });

    it('should reject an empty token', async () => {
      const isValid = await verifyAdminSession('');
      expect(isValid).toBe(false);
    });

    it('should reject when no token is provided and no cookie exists', async () => {
      const isValid = await verifyAdminSession();
      expect(isValid).toBe(false);
    });

    it('should reject a malformed JWT token', async () => {
      const isValid = await verifyAdminSession('not.a.valid.jwt');
      expect(isValid).toBe(false);
    });

    it('should reject a token with wrong signature', async () => {
      // Create a token with different secret
      const crypto = await import('crypto');
      const wrongSecret = 'wrong-secret';
      
      const payload = { authenticated: true, createdAt: Date.now(), expiresAt: Date.now() + 86400000 };
      const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const hmac = crypto.createHmac('sha256', wrongSecret);
      hmac.update(payloadBase64);
      const signature = hmac.digest('base64url');
      const token = `${payloadBase64}.${signature}`;

      const isValid = await verifyAdminSession(token);
      expect(isValid).toBe(false);
    });

    it('should reject an expired token', async () => {
      // Create an expired token
      const crypto = await import('crypto');
      const secret = process.env.JWT_SECRET || 'test-jwt-secret-for-testing';
      
      const pastTime = Date.now() - 1000; // 1 second ago
      const payload = {
        authenticated: true,
        createdAt: pastTime - 86400000,
        expiresAt: pastTime, // Already expired
      };
      
      const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payloadBase64);
      const signature = hmac.digest('base64url');
      const token = `${payloadBase64}.${signature}`;

      const isValid = await verifyAdminSession(token);
      expect(isValid).toBe(false);
    });

    it('should reject a token without authenticated flag', async () => {
      // Create a token without authenticated: true
      const crypto = await import('crypto');
      const secret = process.env.JWT_SECRET || 'test-jwt-secret-for-testing';
      
      const now = Date.now();
      const payload = {
        authenticated: false, // Not authenticated
        createdAt: now,
        expiresAt: now + 86400000,
      };
      
      const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payloadBase64);
      const signature = hmac.digest('base64url');
      const token = `${payloadBase64}.${signature}`;

      const isValid = await verifyAdminSession(token);
      expect(isValid).toBe(false);
    });
  });

  describe('logoutAdmin', () => {
    it('should successfully logout', async () => {
      const result = await logoutAdmin();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });
  });

  describe('Session lifecycle', () => {
    it('should complete full authentication lifecycle', async () => {
      // 1. Authenticate
      const authResult = await authenticateAdmin('test-admin-password');
      expect(authResult.success).toBe(true);
      if (!authResult.success) return;

      const token = authResult.data;

      // 2. Verify session is valid
      const isValid = await verifyAdminSession(token);
      expect(isValid).toBe(true);

      // 3. Logout
      const logoutResult = await logoutAdmin();
      expect(logoutResult.success).toBe(true);
    });

    it('should reject authentication after multiple failed attempts', async () => {
      // Try wrong password multiple times
      for (let i = 0; i < 3; i++) {
        const result = await authenticateAdmin('wrong-password');
        expect(result.success).toBe(false);
      }

      // Correct password should still work (no rate limiting in this implementation)
      const result = await authenticateAdmin('test-admin-password');
      expect(result.success).toBe(true);
    });
  });

  describe('Token properties', () => {
    it('should create tokens with 24-hour expiration', async () => {
      const authResult = await authenticateAdmin('test-admin-password');
      expect(authResult.success).toBe(true);
      if (!authResult.success) return;

      const token = authResult.data;

      // Decode token to check expiration
      const [payloadBase64] = token.split('.');
      const payloadString = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
      const payload = JSON.parse(payloadString);
      
      // Check that expiresAt is approximately 24 hours from now
      const now = Date.now();
      const duration = payload.expiresAt - now;
      
      // Should be close to 24 hours (86400000 ms), allow 1000ms variance
      expect(duration).toBeGreaterThan(86399000);
      expect(duration).toBeLessThan(86401000);
    });

    it('should include required session fields in token', async () => {
      const authResult = await authenticateAdmin('test-admin-password');
      expect(authResult.success).toBe(true);
      if (!authResult.success) return;

      const token = authResult.data;

      // Decode token to check payload
      const [payloadBase64] = token.split('.');
      const payloadString = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
      const payload = JSON.parse(payloadString);
      
      expect(payload.authenticated).toBe(true);
      expect(payload.createdAt).toBeDefined();
      expect(payload.expiresAt).toBeDefined();
      expect(typeof payload.createdAt).toBe('number');
      expect(typeof payload.expiresAt).toBe('number');
    });
  });
});

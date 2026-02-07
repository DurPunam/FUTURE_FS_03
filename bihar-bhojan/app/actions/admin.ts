/**
 * Server Actions for admin authentication
 * Requirement: 6.1
 */

'use server';

import { cookies } from 'next/headers';
import crypto from 'crypto';
import type { Result } from '@/lib/types';

// Session configuration
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const SECRET_KEY = process.env.JWT_SECRET || 'bihar-bhojan-default-secret-change-in-production';

/**
 * Admin session payload
 */
interface AdminSession {
  authenticated: boolean;
  createdAt: number;
  expiresAt: number;
}

/**
 * Create a signed token
 */
function createToken(payload: AdminSession): string {
  const payloadString = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadString).toString('base64url');
  
  // Create HMAC signature
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(payloadBase64);
  const signature = hmac.digest('base64url');
  
  return `${payloadBase64}.${signature}`;
}

/**
 * Verify and decode a signed token
 */
function verifyToken(token: string): AdminSession | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    
    if (!payloadBase64 || !signature) {
      return null;
    }
    
    // Verify signature
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(payloadBase64);
    const expectedSignature = hmac.digest('base64url');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    // Decode payload
    const payloadString = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const payload = JSON.parse(payloadString) as AdminSession;
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Authenticate admin with password
 * Requirement 6.1: Admin authentication
 * 
 * Verifies password against environment variable and creates session token
 * 
 * @param password - Admin password to verify
 * @returns Result with session token on success
 */
export async function authenticateAdmin(
  password: string
): Promise<Result<string>> {
  try {
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set');
      return {
        success: false,
        error: 'Admin authentication is not configured.',
      };
    }

    // Verify password
    if (password !== adminPassword) {
      return {
        success: false,
        error: 'Invalid password.',
      };
    }

    // Create session token
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION;

    const payload: AdminSession = {
      authenticated: true,
      createdAt: now,
      expiresAt,
    };

    const token = createToken(payload);

    // Set session cookie
    try {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION / 1000, // Convert to seconds
        path: '/',
      });
    } catch (error) {
      // Cookie setting may fail in test environment, but token is still valid
      console.warn('Failed to set session cookie:', error);
    }

    return {
      success: true,
      data: token,
    };
  } catch (error: unknown) {
    console.error('Error authenticating admin:', error);
    return {
      success: false,
      error: 'Authentication failed. Please try again.',
    };
  }
}

/**
 * Verify admin session validity
 * Requirement 6.1: Admin authentication
 * 
 * Checks if the current session token is valid
 * 
 * @param token - Optional session token to verify (if not provided, reads from cookie)
 * @returns True if session is valid, false otherwise
 */
export async function verifyAdminSession(token?: string): Promise<boolean> {
  try {
    // Get token from parameter or cookie
    let sessionToken = token;
    
    if (!sessionToken) {
      try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get(SESSION_COOKIE_NAME);
        sessionToken = cookie?.value;
      } catch {
        // Cookie access may fail in test environment
        return false;
      }
    }

    if (!sessionToken) {
      return false;
    }

    // Verify and decode token
    const payload = verifyToken(sessionToken);
    
    if (!payload) {
      return false;
    }
    
    // Check if authenticated
    if (!payload.authenticated) {
      return false;
    }

    // Check if session has expired
    const now = Date.now();
    if (payload.expiresAt < now) {
      return false;
    }

    return true;
  } catch (error: unknown) {
    // Token verification failed
    console.error('Error verifying admin session:', error);
    return false;
  }
}

/**
 * Logout admin by clearing session cookie
 * 
 * @returns Result indicating success
 */
export async function logoutAdmin(): Promise<Result<void>> {
  try {
    try {
      const cookieStore = await cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);
    } catch (error) {
      // Cookie deletion may fail in test environment
      console.warn('Failed to delete session cookie:', error);
    }

    return {
      success: true,
      data: undefined,
    };
  } catch (error: unknown) {
    console.error('Error logging out admin:', error);
    return {
      success: false,
      error: 'Logout failed. Please try again.',
    };
  }
}

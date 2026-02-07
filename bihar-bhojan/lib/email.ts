/**
 * Email service for Bihar Bhojan Restaurant
 * Requirements: 2.2, 10.1, 12.3
 * 
 * Uses Resend free tier for email delivery
 * Free tier: 100 emails/day, 3,000 emails/month
 */

import { Resend } from 'resend';
import { Booking } from './types';

/**
 * Email configuration
 */
const EMAIL_CONFIG = {
  restaurantEmail: process.env.RESTAURANT_EMAIL || 'info@biharbhojan.com',
  fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev', // Use Resend's default for testing
  resendApiKey: process.env.RESEND_API_KEY || '',
};

/**
 * Initialize Resend client
 * If no API key is provided, emails will be logged to console only
 */
const resend = EMAIL_CONFIG.resendApiKey ? new Resend(EMAIL_CONFIG.resendApiKey) : null;

/**
 * Generate HTML template for booking confirmation email
 */
function generateBookingEmailHtml(booking: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - Bihar Bhojan</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1E293B;
      background-color: #FFF7ED;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #D35400 0%, #F39C12 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .booking-details {
      background-color: #FFF7ED;
      border-left: 4px solid #D35400;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #E5E7EB;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      color: #64748B;
    }
    .detail-value {
      color: #1E293B;
      text-align: right;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #64748B;
    }
    .cta-button {
      display: inline-block;
      background-color: #27AE60;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍽️ New Table Booking</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Bihar Bhojan Restaurant</p>
    </div>
    <div class="content">
      <p>A new table booking has been received. Please review and confirm:</p>
      
      <div class="booking-details">
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">${booking.id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Customer Name:</span>
          <span class="detail-value">${booking.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">${booking.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span class="detail-value">${booking.phone}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${booking.date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span class="detail-value">${booking.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Party Size:</span>
          <span class="detail-value">${booking.partySize} ${booking.partySize === 1 ? 'person' : 'people'}</span>
        </div>
        ${booking.specialRequests ? `
        <div class="detail-row">
          <span class="detail-label">Special Requests:</span>
          <span class="detail-value">${booking.specialRequests}</span>
        </div>
        ` : ''}
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="text-transform: uppercase; font-weight: 600; color: #F39C12;">${booking.status}</span>
        </div>
      </div>
      
      <p style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/dashboard" class="cta-button">
          View in Admin Dashboard
        </a>
      </p>
      
      <p style="color: #64748B; font-size: 14px; margin-top: 20px;">
        Please confirm or manage this booking through the admin dashboard.
      </p>
    </div>
    <div class="footer">
      <p style="margin: 0;">Bihar Bhojan - Authentic Bihari Cuisine</p>
      <p style="margin: 5px 0 0 0;">This is an automated notification from your restaurant booking system.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate HTML template for booking status update email to customer
 */
function generateBookingStatusEmailHtml(booking: Booking, newStatus: string): string {
  const statusColor = newStatus === 'confirmed' ? '#27AE60' : '#E74C3C';
  const statusEmoji = newStatus === 'confirmed' ? '✅' : '❌';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking ${newStatus} - Bihar Bhojan</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1E293B;
      background-color: #FFF7ED;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #D35400 0%, #F39C12 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .status-badge {
      display: inline-block;
      background-color: ${statusColor};
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: 600;
      text-transform: uppercase;
      margin: 20px 0;
    }
    .booking-details {
      background-color: #FFF7ED;
      border-left: 4px solid #D35400;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #E5E7EB;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      color: #64748B;
    }
    .detail-value {
      color: #1E293B;
      text-align: right;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #64748B;
    }
    .contact-info {
      background-color: #F8FAFC;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍽️ Bihar Bhojan</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Authentic Bihari Cuisine</p>
    </div>
    <div class="content">
      <p>Dear ${booking.name},</p>
      
      <p style="text-align: center;">
        <span class="status-badge">${statusEmoji} Booking ${newStatus}</span>
      </p>
      
      <p>Your table booking at Bihar Bhojan has been <strong>${newStatus}</strong>.</p>
      
      <div class="booking-details">
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">${booking.id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${booking.date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span class="detail-value">${booking.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Party Size:</span>
          <span class="detail-value">${booking.partySize} ${booking.partySize === 1 ? 'person' : 'people'}</span>
        </div>
      </div>
      
      ${newStatus === 'confirmed' ? `
      <p style="color: #27AE60; font-weight: 600;">
        We look forward to serving you authentic Bihari cuisine! 🎉
      </p>
      <p>Please arrive 10 minutes before your reservation time. If you need to make any changes, please contact us.</p>
      ` : `
      <p>If you have any questions or would like to make another booking, please don't hesitate to contact us.</p>
      `}
      
      <div class="contact-info">
        <p style="margin: 0; font-weight: 600; color: #1E293B;">Contact Us:</p>
        <p style="margin: 5px 0;">📞 Phone: ${process.env.NEXT_PUBLIC_RESTAURANT_PHONE || '+91 1234567890'}</p>
        <p style="margin: 5px 0;">📧 Email: ${EMAIL_CONFIG.restaurantEmail}</p>
        <p style="margin: 5px 0;">💬 WhatsApp: ${process.env.NEXT_PUBLIC_RESTAURANT_WHATSAPP || '+91 1234567890'}</p>
      </div>
      
      <p style="margin-top: 20px;">Best regards,<br><strong>Bihar Bhojan Team</strong></p>
    </div>
    <div class="footer">
      <p style="margin: 0;">Bihar Bhojan - Authentic Bihari Cuisine</p>
      <p style="margin: 5px 0 0 0;">Experience the rich flavors of Bihar</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate HTML template for contact form email
 */
function generateContactEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission - Bihar Bhojan</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1E293B;
      background-color: #FFF7ED;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #D35400 0%, #F39C12 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .contact-details {
      background-color: #FFF7ED;
      border-left: 4px solid #27AE60;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .detail-row {
      padding: 8px 0;
      border-bottom: 1px solid #E5E7EB;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      color: #64748B;
      display: block;
      margin-bottom: 4px;
    }
    .detail-value {
      color: #1E293B;
    }
    .message-box {
      background-color: #F8FAFC;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #64748B;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Bihar Bhojan Restaurant</p>
    </div>
    <div class="content">
      <p>You have received a new message through the contact form:</p>
      
      <div class="contact-details">
        <div class="detail-row">
          <span class="detail-label">Name:</span>
          <span class="detail-value">${data.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value"><a href="mailto:${data.email}" style="color: #D35400;">${data.email}</a></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span class="detail-value"><a href="tel:${data.phone}" style="color: #D35400;">${data.phone}</a></span>
        </div>
      </div>
      
      <p style="font-weight: 600; color: #1E293B; margin-bottom: 10px;">Message:</p>
      <div class="message-box">
${data.message}
      </div>
      
      <p style="color: #64748B; font-size: 14px; margin-top: 20px;">
        Please respond to this inquiry as soon as possible.
      </p>
    </div>
    <div class="footer">
      <p style="margin: 0;">Bihar Bhojan - Authentic Bihari Cuisine</p>
      <p style="margin: 5px 0 0 0;">This is an automated notification from your restaurant contact form.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Send booking confirmation email to restaurant
 * Requirement 2.2: Email notification for bookings
 */
export async function sendBookingEmail(booking: Booking): Promise<void> {
  const subject = `New Booking: ${booking.name} - ${booking.partySize} people`;
  const htmlContent = generateBookingEmailHtml(booking);
  const textContent = `
New Table Booking Received

Booking Details:
- Name: ${booking.name}
- Email: ${booking.email}
- Phone: ${booking.phone}
- Date: ${booking.date.toLocaleDateString('en-IN')}
- Time: ${booking.time}
- Party Size: ${booking.partySize}
- Special Requests: ${booking.specialRequests || 'None'}
- Booking ID: ${booking.id}
- Status: ${booking.status}

Please confirm or manage this booking through the admin dashboard.
  `.trim();

  if (resend) {
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.fromEmail,
        to: EMAIL_CONFIG.restaurantEmail,
        subject,
        html: htmlContent,
        text: textContent,
      });
      console.log('✅ Booking email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send booking email:', error);
      throw new Error('Failed to send booking confirmation email');
    }
  } else {
    // Fallback: Log to console if no API key configured
    console.log('📧 Email would be sent (no API key configured):');
    console.log(`To: ${EMAIL_CONFIG.restaurantEmail}`);
    console.log(`From: ${EMAIL_CONFIG.fromEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${textContent}`);
    console.log('---');
  }
}

/**
 * Send booking status update email to customer
 * Requirement 6.6: Email notification for status updates
 */
export async function sendBookingStatusEmail(
  booking: Booking,
  newStatus: string
): Promise<void> {
  const subject = `Booking ${newStatus.toUpperCase()}: Bihar Bhojan - ${booking.date.toLocaleDateString('en-IN')}`;
  const htmlContent = generateBookingStatusEmailHtml(booking, newStatus);
  const textContent = `
Dear ${booking.name},

Your table booking at Bihar Bhojan has been ${newStatus}.

Booking Details:
- Date: ${booking.date.toLocaleDateString('en-IN')}
- Time: ${booking.time}
- Party Size: ${booking.partySize}
- Booking ID: ${booking.id}

${
  newStatus === 'confirmed'
    ? 'We look forward to serving you authentic Bihari cuisine!'
    : 'If you have any questions, please contact us.'
}

Best regards,
Bihar Bhojan Team
  `.trim();

  if (resend) {
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.fromEmail,
        to: booking.email,
        subject,
        html: htmlContent,
        text: textContent,
      });
      console.log('✅ Booking status email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send booking status email:', error);
      throw new Error('Failed to send booking status update email');
    }
  } else {
    // Fallback: Log to console if no API key configured
    console.log('📧 Email would be sent (no API key configured):');
    console.log(`To: ${booking.email}`);
    console.log(`From: ${EMAIL_CONFIG.fromEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${textContent}`);
    console.log('---');
  }
}

/**
 * Send contact form message email to restaurant
 * Requirement 10.1: Contact form email
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<void> {
  const subject = `Contact Form: ${data.name}`;
  const htmlContent = generateContactEmailHtml(data);
  const textContent = `
New Contact Form Submission

From: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
  `.trim();

  if (resend) {
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.fromEmail,
        to: EMAIL_CONFIG.restaurantEmail,
        subject,
        html: htmlContent,
        text: textContent,
        replyTo: data.email, // Allow easy reply to customer
      });
      console.log('✅ Contact email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send contact email:', error);
      throw new Error('Failed to send contact form email');
    }
  } else {
    // Fallback: Log to console if no API key configured
    console.log('📧 Email would be sent (no API key configured):');
    console.log(`To: ${EMAIL_CONFIG.restaurantEmail}`);
    console.log(`From: ${EMAIL_CONFIG.fromEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${textContent}`);
    console.log('---');
  }
}

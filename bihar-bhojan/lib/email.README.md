# Email Service Setup Guide

## Overview

The Bihar Bhojan restaurant website uses [Resend](https://resend.com) for sending transactional emails. Resend offers a generous free tier that's perfect for small restaurants:

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **No credit card required** for free tier
- **Simple API** with excellent TypeScript support
- **Beautiful HTML emails** with fallback to plain text

## Email Types

The system sends three types of emails:

1. **Booking Confirmation** (to restaurant)
   - Sent when a customer makes a new booking
   - Contains all booking details
   - Includes link to admin dashboard

2. **Booking Status Update** (to customer)
   - Sent when admin confirms or cancels a booking
   - Personalized with customer name
   - Includes contact information

3. **Contact Form** (to restaurant)
   - Sent when a customer submits the contact form
   - Includes customer details and message
   - Reply-to set to customer's email for easy response

## Setup Instructions

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Bihar Bhojan Production")
5. Copy the API key (starts with `re_`)

### Step 3: Configure Environment Variables

1. Open your `.env` file
2. Add your Resend API key:
   ```
   RESEND_API_KEY="re_your_actual_api_key_here"
   ```
3. Update the restaurant email (where you want to receive notifications):
   ```
   RESTAURANT_EMAIL="your-actual-email@example.com"
   ```
4. Update the from email (for testing, use Resend's default):
   ```
   FROM_EMAIL="onboarding@resend.dev"
   ```

### Step 4: Verify Domain (Optional, for Production)

For production use, you should verify your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `biharbhojan.com`)
4. Add the DNS records provided by Resend to your domain
5. Wait for verification (usually takes a few minutes)
6. Update `FROM_EMAIL` to use your domain:
   ```
   FROM_EMAIL="noreply@biharbhojan.com"
   ```

**Note**: Without domain verification, you can only send emails to the email address you signed up with. This is fine for testing but not for production.

## Testing the Email Service

### Local Testing (Without API Key)

If no API key is configured, the system will log emails to the console instead of sending them. This is useful for development:

```bash
npm run dev
```

Then make a booking or submit a contact form. Check the terminal for email logs.

### Testing with Resend (Free Tier)

1. Add your API key to `.env`
2. Make sure `RESTAURANT_EMAIL` is set to your verified email
3. Restart the development server
4. Make a test booking or submit a contact form
5. Check your email inbox

### Testing Email Templates

You can preview the HTML email templates by:

1. Opening `lib/email.ts`
2. Looking at the `generate*EmailHtml()` functions
3. Copying the HTML to an online HTML viewer

## Email Templates

All emails use responsive HTML templates with:

- **Brand colors**: Terracotta (#D35400) and Turmeric (#F39C12)
- **Mobile-friendly**: Responsive design that works on all devices
- **Accessible**: Proper semantic HTML and color contrast
- **Professional**: Clean, modern design with Bihar Bhojan branding

### Customizing Templates

To customize the email templates:

1. Open `lib/email.ts`
2. Find the template function you want to modify:
   - `generateBookingEmailHtml()` - Booking confirmation to restaurant
   - `generateBookingStatusEmailHtml()` - Status update to customer
   - `generateContactEmailHtml()` - Contact form to restaurant
3. Edit the HTML/CSS within the template string
4. Test by sending a test email

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly in `.env`
2. **Check Console**: Look for error messages in the terminal
3. **Verify Email**: Make sure `RESTAURANT_EMAIL` is verified in Resend
4. **Check Spam**: Emails might be in spam folder
5. **Rate Limits**: Free tier has 100 emails/day limit

### Domain Verification Issues

1. **DNS Propagation**: DNS changes can take up to 48 hours
2. **Correct Records**: Double-check all DNS records match Resend's requirements
3. **TTL Settings**: Lower TTL values speed up propagation

### Email Formatting Issues

1. **Test in Multiple Clients**: Gmail, Outlook, Apple Mail render differently
2. **Use Tables**: For complex layouts, use table-based HTML
3. **Inline CSS**: Some email clients strip `<style>` tags
4. **Plain Text Fallback**: Always provide a text version

## Production Checklist

Before deploying to production:

- [ ] Resend account created and verified
- [ ] Domain verified in Resend (for custom from address)
- [ ] API key added to production environment variables
- [ ] Restaurant email set to actual business email
- [ ] From email set to verified domain
- [ ] Test all three email types
- [ ] Check emails in multiple email clients
- [ ] Verify emails don't go to spam
- [ ] Set up email monitoring/alerts

## Alternative: FormSubmit

If you prefer not to use Resend, you can use [FormSubmit](https://formsubmit.co) as an alternative:

### Pros:
- No API key needed
- No signup required
- Completely free

### Cons:
- Less control over email formatting
- No programmatic sending (form-based only)
- Limited customization

To use FormSubmit, you would need to modify the contact form to submit directly to FormSubmit's endpoint. This is not recommended for booking emails as it requires form submission.

## Support

- **Resend Documentation**: https://resend.com/docs
- **Resend Status**: https://status.resend.com
- **Resend Support**: support@resend.com

## Cost Considerations

The free tier should be sufficient for most small restaurants:

- **100 emails/day** = ~3,000 emails/month
- Typical usage: 2-5 bookings/day + occasional contact forms
- Estimated monthly usage: 100-200 emails

If you exceed the free tier, Resend's paid plans start at $20/month for 50,000 emails.

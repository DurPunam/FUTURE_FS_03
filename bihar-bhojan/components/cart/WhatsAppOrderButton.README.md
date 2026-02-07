# WhatsAppOrderButton Component

## Overview

The `WhatsAppOrderButton` component enables customers to place orders via WhatsApp by collecting their information and generating a pre-filled WhatsApp message with order details.

## Requirements

- **3.2**: Generate formatted WhatsApp message containing all cart items with quantities and prices
- **3.3**: Open WhatsApp with pre-filled message directed to restaurant's WhatsApp number
- **3.4**: Include customer name, phone number, delivery address, and total amount in message
- **3.6**: Disable button when cart is empty

## Features

### Core Functionality

1. **Order Button**: Main button to initiate WhatsApp order
   - Displays "Order via WhatsApp" with WhatsApp icon
   - Disabled when cart is empty (gray appearance)
   - Shows customer info form when clicked

2. **Customer Info Form**: Collects required customer details
   - Name field (2-100 characters)
   - Phone field (10-digit Indian format)
   - Address field (10-300 characters)
   - Form validation using React Hook Form + Zod
   - Real-time validation error messages

3. **WhatsApp Integration**:
   - Generates formatted message with order details
   - Creates WhatsApp URL with restaurant's number
   - Opens WhatsApp in new window/tab
   - Preserves user privacy (no data stored)

### User Experience

- **Progressive Disclosure**: Form only shown when button clicked
- **Clear Validation**: Field-specific error messages
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Bilingual**: Full support for English and Hindi via next-intl
- **Responsive**: Works on mobile and desktop

## Props

```typescript
interface WhatsAppOrderButtonProps {
  restaurantWhatsApp: string; // Restaurant's WhatsApp number (10 digits)
}
```

## Usage

```tsx
import WhatsAppOrderButton from '@/components/cart/WhatsAppOrderButton';

// In Cart component footer
<WhatsAppOrderButton 
  restaurantWhatsApp={process.env.NEXT_PUBLIC_RESTAURANT_WHATSAPP || '9876543210'} 
/>
```

## Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_RESTAURANT_WHATSAPP=9876543210
```

## Form Validation

Uses `WhatsAppCustomerInfoSchema` from `lib/validation.ts`:

- **Name**: Required, 2-100 characters
- **Phone**: Required, exactly 10 digits (Indian format)
- **Address**: Required, 10-300 characters

## WhatsApp Message Format

Generated message includes:

```
🍽️ *Bihar Bhojan Order*

*Customer:* John Doe
*Phone:* 9876543210
*Address:* 123 Main Street, Patna

*Order Items:*
1. Litti Chokha x2 - ₹300
2. Sattu Paratha x1 - ₹80

*Subtotal:* ₹380.00
*Tax (5%):* ₹19.00
*Total:* ₹399.00

Payment: Cash on Delivery
```

## States

1. **Initial State**: Shows "Order via WhatsApp" button
   - Disabled if cart is empty
   - Enabled if cart has items

2. **Form State**: Shows customer info form
   - Triggered by button click
   - Includes cancel and submit buttons
   - Shows validation errors inline

3. **Submitting State**: During form submission
   - Submit button shows "Sending..."
   - Buttons disabled to prevent double submission

4. **Success State**: After successful submission
   - Opens WhatsApp in new window
   - Resets form
   - Returns to initial state

## Accessibility

- Semantic HTML with proper labels
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Error announcements
- Disabled state properly communicated

## Styling

- Uses Tailwind CSS with Bihar Bhojan color palette
- Green (#27AE60) for primary action
- Gray for disabled state
- Red for validation errors
- Smooth transitions and hover effects
- Responsive design (mobile-first)

## Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers/zod`: Zod integration
- `zod`: Schema validation
- `next-intl`: Internationalization
- `lucide-react`: Icons
- `@/lib/utils`: Utility functions
- `@/lib/validation`: Validation schemas
- `@/contexts/CartContext`: Cart state

## Testing

See `tests/unit/whatsapp-order-button.test.tsx` for:

- Button disabled when cart empty
- Form display on button click
- Form validation
- WhatsApp URL generation
- Message formatting
- Form reset after submission

## Related Components

- `Cart`: Parent component that includes this button
- `CartItem`: Displays individual cart items
- `CartContext`: Provides cart state

## Notes

- No data is stored or sent to backend
- Order is placed directly via WhatsApp
- Restaurant receives order as WhatsApp message
- Customer can modify message before sending
- Works with WhatsApp Web and mobile app

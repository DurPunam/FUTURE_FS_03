# Cart Component

## Overview

The Cart component displays the user's shopping cart with items, quantities, and calculated totals. It features a slide-in animation from the right side and includes an empty state when no items are present.

## Requirements

- **14.4**: Display subtotal, tax, and total amount
- **14.7**: Cart summary display with slide-in animation

## Features

- **Slide-in Animation**: Smooth animation from right side using Framer Motion
- **Cart Items Display**: Shows all items with images, names, prices, and quantities
- **Empty State**: Displays message and icon when cart is empty
- **Totals Calculation**: Shows subtotal, tax (5%), and total
- **Bilingual Support**: All labels support English and Hindi via next-intl
- **Responsive Design**: Works on mobile and desktop
- **Backdrop**: Semi-transparent backdrop that closes cart when clicked
- **Close Button**: X button in header to close the cart

## Props

```typescript
interface CartProps {
  isOpen: boolean;    // Controls cart visibility
  onClose: () => void; // Callback to close the cart
}
```

## Usage

```tsx
import Cart from '@/components/cart/Cart';
import { useState } from 'react';

function MyComponent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsCartOpen(true)}>
        Open Cart
      </button>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
}
```

## Cart State

The component uses the `useCart` hook from `CartContext` to access:
- `items`: Array of cart items
- `subtotal`: Sum of all item prices × quantities
- `tax`: 5% tax on subtotal
- `total`: Subtotal + tax
- `itemCount`: Total number of items (sum of quantities)

## Styling

- **Colors**: Uses Bihar Bhojan color palette
  - Primary: `#D35400` (Terracotta)
  - Success: `#27AE60` (Leaf Green)
- **Layout**: Fixed position, full height, 384px width on desktop
- **Animation**: Spring animation with damping for smooth motion
- **Shadows**: Large shadow for depth

## Accessibility

- **ARIA**: Proper `role="dialog"` and `aria-modal="true"`
- **Labels**: All interactive elements have aria-labels
- **Keyboard**: Can be closed with backdrop click
- **Focus**: Proper focus management

## Empty State

When the cart is empty:
- Shopping cart icon (gray)
- "Your cart is empty" title
- Helpful message
- "Browse Menu" button to close cart and return to shopping

## Future Enhancements

- Quantity adjustment controls (will be in CartItem component - Task 9.2)
- Remove item functionality (will be in CartItem component - Task 9.2)
- WhatsApp order button (will be in WhatsAppOrderButton component - Task 9.3)

## Translation Keys

### English (en.json)
```json
{
  "cart": {
    "title": "Your Cart",
    "close": "Close cart",
    "subtotal": "Subtotal",
    "tax": "Tax (5%)",
    "total": "Total",
    "checkout": "Proceed to Order",
    "empty": {
      "title": "Your cart is empty",
      "message": "Add some delicious dishes to get started!",
      "browseMenu": "Browse Menu"
    }
  }
}
```

### Hindi (hi.json)
```json
{
  "cart": {
    "title": "आपका कार्ट",
    "close": "कार्ट बंद करें",
    "subtotal": "उप-योग",
    "tax": "कर (5%)",
    "total": "कुल",
    "checkout": "ऑर्डर करें",
    "empty": {
      "title": "आपका कार्ट खाली है",
      "message": "शुरू करने के लिए कुछ स्वादिष्ट व्यंजन जोड़ें!",
      "browseMenu": "मेनू देखें"
    }
  }
}
```

## Dependencies

- `framer-motion`: Animation library
- `next-intl`: Internationalization
- `lucide-react`: Icons (X, ShoppingCart)
- `@/contexts/CartContext`: Cart state management
- `@/lib/utils`: Currency formatting utility

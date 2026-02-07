# CartItem Component

## Overview

The `CartItem` component displays an individual item in the shopping cart with quantity adjustment controls and a remove button. It provides an intuitive interface for managing cart items.

## Requirements

- **14.6**: Cart quantity adjustment
- **14.2**: Cart item removal

## Features

- **Item Display**: Shows item image, name, and price
- **Quantity Controls**: Increment (+) and decrement (-) buttons
- **Remove Button**: X button to remove item from cart
- **Disabled State**: Decrement button is disabled when quantity is 1
- **Item Total**: Displays calculated total (price × quantity)
- **Responsive Design**: Compact layout optimized for mobile and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Props

```typescript
interface CartItemProps {
  item: CartItemType;
}

interface CartItemType {
  menuItemId: string;
  name: string;
  nameHi: string;
  price: number;
  quantity: number;
  image: string;
}
```

## Usage

```tsx
import CartItem from '@/components/cart/CartItem';
import { CartItem as CartItemType } from '@/lib/types';

const item: CartItemType = {
  menuItemId: '1',
  name: 'Litti Chokha',
  nameHi: 'लिट्टी चोखा',
  price: 120,
  quantity: 2,
  image: '/images/dishes/litti-chokha.jpg'
};

<CartItem item={item} />
```

## Styling

- Uses Tailwind CSS with Bihar Bhojan color palette
- Terracotta (#D35400) for item total
- Gray tones for background and borders
- Hover effects on interactive elements
- Compact 44px minimum touch targets for accessibility

## Behavior

### Quantity Adjustment

- **Increment**: Clicking the + button increases quantity by 1
- **Decrement**: Clicking the - button decreases quantity by 1
- **Minimum Quantity**: Decrement button is disabled when quantity is 1
- **Remove at Zero**: If quantity would go below 1, item is removed instead

### Remove Item

- Clicking the X button removes the item from cart immediately
- No confirmation dialog (can be added if needed)

### Cart Integration

- Uses `useCart` hook from CartContext
- Calls `updateQuantity(menuItemId, newQuantity)` for quantity changes
- Calls `removeFromCart(menuItemId)` for item removal
- Cart totals update automatically via context

## Accessibility

- **ARIA Labels**: All buttons have descriptive aria-label attributes
- **Keyboard Navigation**: All controls are keyboard accessible
- **Focus Indicators**: Visible focus states on interactive elements
- **Disabled States**: Proper disabled attribute and visual feedback
- **Alt Text**: Image has descriptive alt text

## Internationalization

- Component uses next-intl for translations
- Item name displays in current locale (name or nameHi)
- Currency formatting respects locale settings

## Testing

Unit tests should cover:
- Rendering with different item data
- Increment button functionality
- Decrement button functionality
- Decrement button disabled state when quantity is 1
- Remove button functionality
- Price calculation display
- Accessibility attributes

## Related Components

- **Cart**: Parent component that displays list of CartItems
- **CartContext**: Provides cart state and operations
- **WhatsAppOrderButton**: Uses cart items for order generation

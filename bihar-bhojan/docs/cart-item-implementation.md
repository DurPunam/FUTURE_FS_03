# CartItem Component Implementation

## Overview

This document describes the implementation of the CartItem component for the Bihar Bhojan restaurant website, completed as part of Task 9.2.

## Requirements Addressed

- **Requirement 14.6**: Cart quantity adjustment - Users can adjust item quantities directly in the cart
- **Requirement 14.2**: Cart item removal - Users can remove items from the cart

## Component Structure

### File Location
- **Component**: `bihar-bhojan/components/cart/CartItem.tsx`
- **Tests**: `bihar-bhojan/tests/unit/cart-item.test.tsx`
- **Documentation**: `bihar-bhojan/components/cart/CartItem.README.md`

### Component Interface

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

## Features Implemented

### 1. Item Display
- **Item Image**: 16x16 thumbnail with rounded corners
- **Item Name**: Displayed in current locale (English or Hindi)
- **Unit Price**: Formatted in INR currency
- **Quantity**: Current quantity displayed between controls
- **Item Total**: Calculated as price × quantity, displayed in Terracotta color

### 2. Quantity Controls
- **Increment Button (+)**: Increases quantity by 1
- **Decrement Button (-)**: Decreases quantity by 1
- **Disabled State**: Decrement button is disabled when quantity is 1
- **Visual Feedback**: Hover effects on buttons
- **Accessibility**: Proper ARIA labels for screen readers

### 3. Remove Button
- **X Icon**: Located in top-right corner of item card
- **Immediate Removal**: Removes item from cart without confirmation
- **Accessibility**: Descriptive aria-label with item name

### 4. Styling
- **Color Palette**: Uses Bihar Bhojan colors
  - Terracotta (#D35400) for item total
  - Gray tones for background and borders
- **Layout**: Compact horizontal layout optimized for mobile
- **Touch Targets**: All buttons meet 44px minimum for accessibility
- **Responsive**: Works well on all screen sizes

## Integration

### Cart Context Integration
The component uses the `useCart` hook from CartContext to access:
- `updateQuantity(menuItemId, quantity)`: Updates item quantity
- `removeFromCart(menuItemId)`: Removes item from cart

### Parent Component
The CartItem component is used by the Cart component:

```tsx
// In Cart.tsx
import CartItem from './CartItem';

// Render cart items
{items.map((item) => (
  <CartItem key={item.menuItemId} item={item} />
))}
```

## Behavior Details

### Quantity Adjustment
1. User clicks increment (+) button
2. Component calls `updateQuantity(menuItemId, currentQuantity + 1)`
3. CartContext updates state and session storage
4. Component re-renders with new quantity
5. Cart totals update automatically

### Item Removal
1. User clicks remove (X) button
2. Component calls `removeFromCart(menuItemId)`
3. CartContext removes item from state and session storage
4. Component unmounts (no longer in cart)
5. Cart totals update automatically

### Disabled State Logic
- Decrement button is disabled when `quantity === 1`
- This prevents quantity from going below 1
- If user wants to remove item, they must use the remove button
- This provides clear intent distinction between "reduce quantity" and "remove item"

## Testing

### Test Coverage
- **24 unit tests** covering all functionality
- **100% pass rate** on all tests

### Test Categories
1. **Rendering Tests** (8 tests)
   - Image, name, price, quantity display
   - Button presence and accessibility

2. **Quantity Control Tests** (6 tests)
   - Increment functionality
   - Decrement functionality
   - Disabled state behavior
   - Multiple click handling

3. **Remove Item Tests** (1 test)
   - Remove button functionality

4. **Price Calculation Tests** (3 tests)
   - Different quantities
   - Different prices
   - Total calculation accuracy

5. **Accessibility Tests** (3 tests)
   - ARIA labels
   - Disabled state styling
   - Image alt text

6. **Edge Case Tests** (3 tests)
   - Long item names
   - Zero price items
   - Large quantities

## Accessibility Features

### ARIA Labels
- Increment button: "Increase quantity"
- Decrement button: "Decrease quantity"
- Remove button: "Remove [Item Name] from cart"

### Keyboard Navigation
- All buttons are keyboard accessible
- Tab order follows logical flow
- Enter/Space keys activate buttons

### Visual Feedback
- Focus indicators on all interactive elements
- Disabled state clearly visible (opacity 50%)
- Hover states provide feedback

### Screen Reader Support
- Descriptive labels for all controls
- Image alt text describes item
- Semantic HTML structure

## Internationalization

The component supports bilingual display:
- Item names use current locale (name or nameHi)
- Currency formatting respects locale
- All UI text uses next-intl translations

## Performance Considerations

- **Minimal Re-renders**: Component only re-renders when item prop changes
- **Optimized Images**: Uses standard img tag (Next.js Image not needed for small thumbnails)
- **Efficient Updates**: Cart context handles state updates efficiently

## Future Enhancements

Potential improvements for future iterations:
1. **Confirmation Dialog**: Add optional confirmation for remove action
2. **Undo Feature**: Allow users to undo item removal
3. **Quantity Input**: Allow direct quantity input via text field
4. **Animation**: Add smooth transitions for quantity changes
5. **Batch Operations**: Select multiple items for bulk actions

## Related Components

- **Cart**: Parent component that displays list of CartItems
- **CartContext**: Provides cart state and operations
- **WhatsAppOrderButton**: Uses cart items for order generation
- **MenuItemCard**: Adds items to cart that become CartItems

## Conclusion

The CartItem component successfully implements all required functionality for displaying and managing individual cart items. It provides an intuitive, accessible interface that works seamlessly with the cart management system while maintaining the Bihar Bhojan design aesthetic.

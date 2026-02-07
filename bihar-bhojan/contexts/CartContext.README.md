# Cart Context and Hooks

## Overview

The Cart Context provides global state management for the shopping cart functionality in the Bihar Bhojan restaurant website. It implements cart operations with session storage persistence.

## Requirements

- **3.1**: Cart state maintenance during session
- **14.1**: Add items to cart with quantity increment
- **14.2**: Remove items from cart
- **14.5**: Session storage persistence
- **14.6**: Quantity adjustment

## Usage

### 1. Wrap your app with CartProvider

```tsx
import { CartProvider } from '@/contexts/CartContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

### 2. Use the useCart hook in components

```tsx
import { useCart } from '@/contexts/CartContext';

export function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      nameHi: item.nameHi,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

### 3. Display cart information

```tsx
import { useCart } from '@/contexts/CartContext';

export function CartSummary() {
  const { items, itemCount, subtotal, tax, total, removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      <h2>Cart ({itemCount} items)</h2>
      
      {items.map((item) => (
        <div key={item.menuItemId}>
          <h3>{item.name}</h3>
          <p>₹{item.price} × {item.quantity}</p>
          
          <button onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}>
            +
          </button>
          
          <button onClick={() => removeFromCart(item.menuItemId)}>
            Remove
          </button>
        </div>
      ))}
      
      <div>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax (5%): ₹{tax}</p>
        <p>Total: ₹{total}</p>
      </div>
    </div>
  );
}
```

## API Reference

### CartProvider

Provider component that wraps your app to provide cart context.

**Props:**
- `children: React.ReactNode` - Child components

### useCart()

Hook to access cart context. Must be used within a CartProvider.

**Returns:**
- `items: CartItem[]` - Array of cart items
- `itemCount: number` - Total number of items (sum of quantities)
- `subtotal: number` - Sum of all item prices × quantities
- `tax: number` - Tax amount (5% of subtotal)
- `total: number` - Subtotal + tax
- `addToCart: (item: Omit<CartItem, 'quantity'>) => void` - Add item or increment quantity
- `removeFromCart: (menuItemId: string) => void` - Remove item from cart
- `updateQuantity: (menuItemId: string, quantity: number) => void` - Update item quantity
- `clearCart: () => void` - Remove all items from cart

## Features

### Automatic Quantity Increment

When adding an item that already exists in the cart, the quantity is automatically incremented instead of creating a duplicate entry.

```tsx
addToCart(item); // Adds item with quantity 1
addToCart(item); // Increments quantity to 2
```

### Session Storage Persistence

Cart data is automatically saved to session storage and restored on page reload. The cart persists during the browser session but is cleared when the browser is closed.

### Automatic Total Calculation

Subtotal, tax (5%), and total are automatically calculated whenever the cart changes.

### Quantity Management

- Setting quantity to 0 or negative removes the item
- Quantity can be updated directly using `updateQuantity`

## Implementation Details

### Session Storage Key

Cart data is stored in session storage under the key `'cart'`.

### Tax Rate

Tax is calculated at 5% of the subtotal (defined in `lib/utils.ts`).

### Error Handling

- Invalid JSON in session storage is caught and logged
- Using `useCart` outside of `CartProvider` throws an error

## Testing

Unit tests are located in `tests/unit/cart-context.test.tsx` and cover:

- Adding items to cart
- Removing items from cart
- Updating quantities
- Clearing cart
- Item count calculation
- Total calculations
- Session storage persistence
- Error handling

Run tests with:
```bash
npm test cart-context.test.tsx
```

## Related Files

- `contexts/CartContext.tsx` - Context and hook implementation
- `lib/types.ts` - CartItem and Cart type definitions
- `lib/utils.ts` - calculateCartTotal utility function
- `tests/unit/cart-context.test.tsx` - Unit tests

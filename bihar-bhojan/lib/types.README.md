# Bihar Bhojan Type Definitions

This document provides an overview of the TypeScript type definitions for the Bihar Bhojan restaurant website.

## Files

- **`types.ts`**: Main type definitions file containing all interfaces and types
- **`types.test.ts`**: Unit tests validating all type definitions
- **`types.example.ts`**: Example usage demonstrating how to use the types

## Type Categories

### 1. Menu Types

- **`MenuItem`**: Complete menu item with bilingual content
- **`MenuCategory`**: Category types (thali, ghar-ka-khana, street-delights, mithai, sattu-specials)
- **`SpiceLevel`**: Spice level indicators (mild, medium, hot)

### 2. Cart Types

- **`CartItem`**: Individual item in the shopping cart
- **`Cart`**: Complete cart with items and calculated totals

### 3. Booking Types

- **`Booking`**: Complete booking record with status
- **`BookingData`**: Form data for creating a booking
- **`BookingStatus`**: Status values (pending, confirmed, cancelled)

### 4. Order Types

- **`WhatsAppOrder`**: Complete order for WhatsApp message generation
- **`WhatsAppOrderItem`**: Individual item in an order
- **`CustomerInfo`**: Customer contact information

### 5. Restaurant Information Types

- **`RestaurantInfo`**: Complete restaurant information
- **`OperatingHours`**: Daily operating hours

### 6. Cultural Content Types

- **`CulturalEvent`**: Cultural events and workshops
- **`CulturalEventType`**: Event types (cultural-evening, cooking-workshop, special-event)
- **`Testimonial`**: Customer testimonials
- **`Experience`**: Cultural experiences offered

### 7. Form Types

- **`ContactData`**: Contact form submission data

### 8. Utility Types

- **`Result<T>`**: Generic success/error response type for server actions
- **`Locale`**: Supported languages (en, hi)

## Usage Examples

### Importing Types

```typescript
import type {
  MenuItem,
  Cart,
  Booking,
  Result,
} from '@/lib/types';
```

### Creating a Menu Item

```typescript
const menuItem: MenuItem = {
  id: 'litti-chokha-001',
  name: 'Litti Chokha',
  nameHi: 'लिट्टी चोखा',
  description: 'Traditional Bihari dish',
  descriptionHi: 'पारंपरिक बिहारी व्यंजन',
  price: 150,
  category: 'ghar-ka-khana',
  image: '/images/dishes/litti-chokha.jpg',
  isVeg: true,
  spiceLevel: 'medium',
  isAvailable: true,
  featured: true,
};
```

### Using Result Type in Server Actions

```typescript
async function createBooking(data: BookingData): Promise<Result<Booking>> {
  try {
    const booking = await db.booking.create({ data });
    return { success: true, data: booking };
  } catch (error) {
    return { success: false, error: 'Failed to create booking' };
  }
}
```

### Type Guards for Result Type

```typescript
function isSuccessResult<T>(result: Result<T>): result is { success: true; data: T } {
  return result.success === true;
}

// Usage
const result = await createBooking(bookingData);
if (isSuccessResult(result)) {
  console.log('Booking ID:', result.data.id);
} else {
  console.error('Error:', result.error);
}
```

## Requirements Mapping

This implementation satisfies the following requirements:

- **Requirement 4.1**: Menu display with categories (MenuItem, MenuCategory)
- **Requirement 14.1**: Cart management (Cart, CartItem)
- **Requirement 2.1**: Table booking system (Booking, BookingData, BookingStatus)
- **Requirement 3.2**: WhatsApp-based ordering (WhatsAppOrder, CustomerInfo)
- **Requirement 10.6**: Contact and location information (RestaurantInfo)
- **Requirement 15.2**: Cultural experience showcase (CulturalEvent, Experience)
- **Requirement 17.4**: Customer testimonials (Testimonial)
- **Requirement 1.1**: Multi-language support (Locale, bilingual fields)

## Testing

All type definitions are validated with comprehensive unit tests. Run tests with:

```bash
npm test -- tests/unit/types.test.ts
```

## Best Practices

1. **Always use type imports**: Use `import type` for type-only imports to improve build performance
2. **Leverage type safety**: Let TypeScript catch errors at compile time
3. **Use Result type**: Wrap server action responses in Result type for consistent error handling
4. **Bilingual content**: Always provide both English and Hindi versions of user-facing text
5. **Optional fields**: Use `?` for optional fields (e.g., `spiceLevel?`, `specialRequests?`)

## Future Enhancements

Consider adding these types as the application grows:

- **`Order`**: For tracking order history (if implemented)
- **`User`**: For user authentication (if implemented)
- **`Review`**: For detailed menu item reviews (if implemented)
- **`Promotion`**: For special offers and discounts (if implemented)

# Validation Schemas Documentation

This document describes the Zod validation schemas implemented for the Bihar Bhojan restaurant website.

## Overview

The validation schemas are defined in `lib/validation.ts` and provide type-safe form validation using Zod v4. All schemas include comprehensive error messages and validation rules that align with the project requirements.

## Schemas

### 1. BookingFormSchema

**Purpose:** Validates table booking form submissions

**Fields:**
- `name` (string): Required, 2-100 characters
- `email` (string): Required, valid email format
- `phone` (string): Required, exactly 10 digits (Indian format)
- `date` (Date): Required, must not be in the past
- `time` (string): Required, HH:MM format
- `partySize` (number): Required, integer between 1-20
- `specialRequests` (string): Optional, max 500 characters

**Requirements:** 13.1, 2.3, 2.4, 2.5

**Usage:**
```typescript
import { BookingFormSchema, type BookingFormData } from '@/lib/validation';

const result = BookingFormSchema.safeParse(formData);
if (result.success) {
  // Use result.data (type: BookingFormData)
} else {
  // Handle result.error
}
```

### 2. ContactFormSchema

**Purpose:** Validates contact form submissions

**Fields:**
- `name` (string): Required, 2-100 characters
- `email` (string): Required, valid email format
- `phone` (string): Required, exactly 10 digits (Indian format)
- `message` (string): Required, 10-1000 characters

**Requirements:** 13.1, 13.3, 10.5

**Usage:**
```typescript
import { ContactFormSchema, type ContactFormData } from '@/lib/validation';

const result = ContactFormSchema.safeParse(formData);
```

### 3. AdminLoginSchema

**Purpose:** Validates admin login credentials

**Fields:**
- `password` (string): Required, minimum 8 characters

**Requirements:** 13.1, 6.1

**Usage:**
```typescript
import { AdminLoginSchema, type AdminLoginData } from '@/lib/validation';

const result = AdminLoginSchema.safeParse({ password });
```

### 4. MenuItemSchema

**Purpose:** Validates individual menu items for admin editing

**Fields:**
- `id` (string): Required
- `name` (string): Required, max 100 characters
- `nameHi` (string): Required, max 100 characters (Hindi name)
- `description` (string): Required, max 500 characters
- `descriptionHi` (string): Required, max 500 characters (Hindi description)
- `price` (number): Required, positive number
- `category` (enum): Required, one of: 'thali', 'ghar-ka-khana', 'street-delights', 'mithai', 'sattu-specials'
- `image` (string): Required, must match pattern `/images/dishes/*.{jpg,jpeg,png,webp}`
- `isVeg` (boolean): Required
- `spiceLevel` (enum): Optional, one of: 'mild', 'medium', 'hot'
- `isAvailable` (boolean): Required
- `featured` (boolean): Required

**Requirements:** 13.1, 13.4, 6.2, 6.4

**Usage:**
```typescript
import { MenuItemSchema, type MenuItemFormData } from '@/lib/validation';

const result = MenuItemSchema.safeParse(menuItem);
```

### 5. MenuItemsArraySchema

**Purpose:** Validates an array of menu items (for bulk updates)

**Validation:** Array of MenuItemSchema, minimum 1 item required

**Usage:**
```typescript
import { MenuItemsArraySchema, type MenuItemsArrayData } from '@/lib/validation';

const result = MenuItemsArraySchema.safeParse(menuItems);
```

### 6. WhatsAppCustomerInfoSchema

**Purpose:** Validates customer information before generating WhatsApp order

**Fields:**
- `name` (string): Required, 2-100 characters
- `phone` (string): Required, exactly 10 digits (Indian format)
- `address` (string): Required, 10-300 characters

**Requirements:** 13.1, 3.4

**Usage:**
```typescript
import { WhatsAppCustomerInfoSchema, type WhatsAppCustomerInfoData } from '@/lib/validation';

const result = WhatsAppCustomerInfoSchema.safeParse(customerInfo);
```

## Helper Functions

### validateIndianPhone(phone: string): boolean

Validates that a phone number is exactly 10 digits.

```typescript
import { validateIndianPhone } from '@/lib/validation';

if (validateIndianPhone('9876543210')) {
  // Valid phone
}
```

### validateEmail(email: string): boolean

Validates email format using Zod's email validator.

```typescript
import { validateEmail } from '@/lib/validation';

if (validateEmail('user@example.com')) {
  // Valid email
}
```

### validateFutureDate(date: Date): boolean

Validates that a date is today or in the future.

```typescript
import { validateFutureDate } from '@/lib/validation';

if (validateFutureDate(selectedDate)) {
  // Valid future date
}
```

## Integration with React Hook Form

These schemas are designed to work seamlessly with React Hook Form using the `@hookform/resolvers` package:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingFormSchema, type BookingFormData } from '@/lib/validation';

const form = useForm<BookingFormData>({
  resolver: zodResolver(BookingFormSchema),
  defaultValues: {
    name: '',
    email: '',
    phone: '',
    partySize: 2,
  },
});
```

## Error Messages

All schemas include user-friendly error messages in English. Error messages are designed to be:
- Clear and actionable
- Specific to the validation failure
- Suitable for display to end users

Example error messages:
- "Name is required"
- "Please enter a valid email address"
- "Phone number must be 10 digits"
- "Please select a future date"
- "Party size must be between 1 and 20"

## Testing

Comprehensive unit tests are available in `tests/unit/validation.test.ts`:
- 43 test cases covering all schemas
- Tests for valid data acceptance
- Tests for invalid data rejection
- Tests for edge cases and boundary values
- Tests for helper functions

Run tests with:
```bash
npm test -- validation.test.ts
```

## Type Safety

All schemas export inferred TypeScript types:
- `BookingFormData`
- `ContactFormData`
- `AdminLoginData`
- `MenuItemFormData`
- `MenuItemsArrayData`
- `WhatsAppCustomerInfoData`

These types ensure type safety throughout the application when working with validated data.

## Requirements Traceability

| Schema | Requirements |
|--------|-------------|
| BookingFormSchema | 13.1, 2.3, 2.4, 2.5 |
| ContactFormSchema | 13.1, 13.3, 10.5 |
| AdminLoginSchema | 13.1, 6.1 |
| MenuItemSchema | 13.1, 13.4, 6.2, 6.4 |
| WhatsAppCustomerInfoSchema | 13.1, 3.4 |

## Notes

- All phone validation uses Indian format (10 digits)
- Date validation ensures no past dates for bookings
- Image paths must follow the pattern `/images/dishes/*.{jpg,jpeg,png,webp}`
- All schemas use Zod v4 API
- Schemas are compatible with React Hook Form via zodResolver

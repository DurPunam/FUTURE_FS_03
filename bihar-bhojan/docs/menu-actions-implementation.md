# Menu Server Actions Implementation

## Overview

This document describes the implementation of menu server actions for the Bihar Bhojan restaurant website.

**Task:** 4.3 Implement menu server actions  
**Requirements:** 4.6, 6.2  
**Status:** ✅ Completed

## Implementation Details

### Files Created

1. **`app/actions/menu.ts`** - Server actions for menu management
2. **`tests/unit/menu-actions.test.ts`** - Unit tests (19 tests)
3. **`tests/integration/menu-actions.integration.test.ts`** - Integration tests (5 tests)

### Server Actions

#### `getMenuItems()`

**Purpose:** Read and return all menu items from menu.json file  
**Requirement:** 4.6

**Features:**
- Reads from `data/menu.json` file
- Parses JSON and validates structure
- Returns `Result<MenuItem[]>` type
- Error handling for:
  - File not found (ENOENT)
  - Invalid JSON format
  - Invalid data structure

**Usage:**
```typescript
const result = await getMenuItems();
if (result.success) {
  const menuItems = result.data;
  // Use menu items
}
```

#### `updateMenuItems(items, adminAuth)`

**Purpose:** Validate and write menu items to menu.json file (admin only)  
**Requirements:** 6.2, 6.4

**Features:**
- Requires admin authentication token
- Validates all menu items using Zod schema
- Checks for duplicate IDs
- Writes formatted JSON (2-space indentation)
- Error handling for:
  - Missing authentication
  - Validation errors
  - Duplicate IDs
  - File write permissions

**Validation Rules:**
- All required fields must be present
- Price must be positive
- Category must be valid (thali, ghar-ka-khana, street-delights, mithai, sattu-specials)
- Spice level must be valid if provided (mild, medium, hot)
- Image path must follow format: `/images/dishes/*.{jpg|jpeg|png|webp}`
- At least one menu item required

**Usage:**
```typescript
const result = await updateMenuItems(menuItems, 'admin-token');
if (result.success) {
  // Menu updated successfully
}
```

## Testing

### Unit Tests (19 tests)

**Test Coverage:**
- ✅ Reading menu items successfully
- ✅ File not found error handling
- ✅ Invalid JSON format handling
- ✅ Invalid data structure handling
- ✅ Empty menu items array
- ✅ Admin authentication requirement
- ✅ Successful menu update
- ✅ Menu item structure validation
- ✅ Negative price rejection
- ✅ Invalid category rejection
- ✅ Invalid spice level rejection
- ✅ Duplicate ID detection
- ✅ Empty array rejection
- ✅ File write permission errors
- ✅ JSON formatting with indentation
- ✅ Optional spice level handling
- ✅ Image path validation
- ✅ All valid categories acceptance
- ✅ All valid spice levels acceptance

### Integration Tests (5 tests)

**Test Coverage:**
- ✅ Reading from actual menu.json file
- ✅ Loading all menu categories
- ✅ Loading featured items
- ✅ Loading vegetarian and non-vegetarian items
- ✅ Loading items with various spice levels

### Test Results

```
Unit Tests:     19 passed (19)
Integration:    5 passed (5)
Total:          24 passed (24)
```

## Error Handling

### Client-Friendly Error Messages

- "Authentication required" - When admin auth is missing
- "Menu file not found" - When menu.json doesn't exist
- "Invalid JSON format in menu file" - When JSON is malformed
- "Invalid menu data structure" - When structure is incorrect
- "Validation error: [field] - [message]" - When validation fails
- "Duplicate menu item IDs found" - When IDs are not unique
- "Permission denied to write menu file" - When file write fails
- "Failed to load/update menu items. Please try again." - Generic errors

### Error Logging

All errors are logged to console with full details for debugging while returning user-friendly messages to clients.

## Data Flow

### Reading Menu Items

```
Client Request
    ↓
getMenuItems()
    ↓
Read data/menu.json
    ↓
Parse JSON
    ↓
Validate structure
    ↓
Return Result<MenuItem[]>
```

### Updating Menu Items

```
Admin Request + Auth Token
    ↓
updateMenuItems(items, auth)
    ↓
Verify authentication
    ↓
Validate with Zod schema
    ↓
Check for duplicate IDs
    ↓
Write to data/menu.json
    ↓
Return Result<void>
```

## Security Considerations

1. **Admin Authentication:** All write operations require admin authentication token
2. **Input Validation:** All menu items validated with Zod schema before writing
3. **Duplicate Prevention:** Checks for duplicate IDs to prevent data corruption
4. **Error Sanitization:** Technical errors logged but not exposed to clients

## Future Enhancements

1. **Task 4.7:** Implement proper admin authentication system
2. **Task 4.4:** Add property-based tests for menu actions
3. **Caching:** Consider adding caching layer for frequently accessed menu data
4. **Revalidation:** Trigger Next.js revalidation after menu updates

## Dependencies

- **Zod:** Schema validation (`MenuItemSchema`, `MenuItemsArraySchema`)
- **Node.js fs/promises:** File system operations
- **TypeScript:** Type safety with `MenuItem`, `Result` types

## Related Files

- `lib/types.ts` - MenuItem interface definition
- `lib/validation.ts` - MenuItemSchema and validation rules
- `data/menu.json` - Menu data storage
- `app/actions/bookings.ts` - Similar server action pattern

## Compliance

✅ Follows Next.js 14 Server Actions pattern  
✅ Uses TypeScript for type safety  
✅ Implements proper error handling  
✅ Includes comprehensive test coverage  
✅ Follows existing code patterns from bookings.ts  
✅ Meets requirements 4.6 and 6.2

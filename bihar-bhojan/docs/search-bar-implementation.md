# SearchBar Component Implementation

## Overview

This document describes the implementation of the SearchBar component for the Bihar Bhojan restaurant website.

## Task Reference

- **Task**: 8.6 Create SearchBar component
- **Requirements**: 4.4 (Real-time menu item search by name)

## Implementation Details

### Component Location

- **Component**: `bihar-bhojan/components/menu/SearchBar.tsx`
- **Tests**: `bihar-bhojan/tests/unit/search-bar.test.tsx`
- **Documentation**: `bihar-bhojan/components/menu/SearchBar.README.md`

### Features Implemented

1. **Real-time Search Input**
   - Controlled input component with `searchQuery` and `onSearchChange` props
   - Immediate callback on every keystroke for real-time filtering
   - Supports both English and Hindi text input

2. **Search Icon**
   - Uses `lucide-react` Search icon for visual clarity
   - Positioned on the left side of the input field
   - Marked with `aria-hidden="true"` for accessibility

3. **Clear Button**
   - Animated X icon button appears when search query is not empty
   - Uses Framer Motion for smooth fade-in/fade-out animation
   - Clears the search query when clicked
   - Properly labeled for screen readers

4. **Bilingual Support**
   - Uses `next-intl` for internationalization
   - Supports English and Hindi labels and placeholders
   - Translation keys under `menu.search` namespace

5. **Styling**
   - Follows Bihar Bhojan design system
   - Terracotta (#D35400) focus ring
   - Dark mode support
   - Responsive design with proper spacing
   - Rounded corners and smooth transitions

6. **Accessibility**
   - Proper label association with `htmlFor` and `id`
   - ARIA labels for screen readers
   - Keyboard accessible (Tab, Enter, Escape)
   - Clear button has descriptive `aria-label`
   - Icons marked with `aria-hidden="true"`
   - Type="button" on clear button to prevent form submission

### Dependencies Added

- **lucide-react**: Icon library for Search and X icons
  - Installed via: `npm install lucide-react`

### Translation Keys Added

#### English (`messages/en.json`)
```json
{
  "menu": {
    "search": {
      "label": "Search Menu",
      "placeholder": "Search for dishes...",
      "ariaLabel": "Search menu items",
      "clearButton": "Clear search"
    }
  }
}
```

#### Hindi (`messages/hi.json`)
```json
{
  "menu": {
    "search": {
      "label": "मेनू खोजें",
      "placeholder": "व्यंजन खोजें...",
      "ariaLabel": "मेनू आइटम खोजें",
      "clearButton": "खोज साफ़ करें"
    }
  }
}
```

### Usage Example

```tsx
import { SearchBar } from '@/components/menu/SearchBar';
import { useState } from 'react';

function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter menu items based on search query
  const filteredItems = menuItems.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.nameHi.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {/* Render filtered items */}
    </div>
  );
}
```

### Test Coverage

**31 unit tests** covering:

1. **Rendering** (6 tests)
   - Label and placeholder rendering
   - Search icon presence
   - Clear button conditional rendering
   - Current value display

2. **User Interactions** (6 tests)
   - Input change handling
   - Clear button functionality
   - Multiple character inputs
   - Backspace/deletion
   - Special characters
   - Hindi text input

3. **Bilingual Support** (3 tests)
   - Hindi label rendering
   - English label rendering
   - Hindi clear button label

4. **Accessibility** (6 tests)
   - Label association
   - ARIA labels
   - Keyboard navigation
   - Button type attribute

5. **Edge Cases** (8 tests)
   - Empty string handling
   - Very long queries
   - Whitespace-only queries
   - Rapid input changes
   - Parent-driven updates
   - Numbers and mixed alphanumeric

6. **Styling** (2 tests)
   - CSS classes
   - Focus ring styles

### Test Results

```
✓ tests/unit/search-bar.test.tsx (31 tests) 792ms
  All tests passed successfully
```

## Design Decisions

1. **Controlled Component**: The component is fully controlled, allowing parent components to manage the search state and implement custom filtering logic.

2. **Real-time Filtering**: The component calls `onSearchChange` on every keystroke, enabling real-time search without requiring a submit button.

3. **Bilingual Search**: The parent component should implement filtering logic that searches both English (`name`) and Hindi (`nameHi`) fields.

4. **Clear Button Animation**: Uses Framer Motion for smooth animations, consistent with other components in the project.

5. **Icon Library**: Uses `lucide-react` for consistent, high-quality icons that match the modern design aesthetic.

## Next Steps

The SearchBar component is now ready to be integrated into the menu page (Task 13.1). The parent component should:

1. Maintain search query state
2. Implement filtering logic for both English and Hindi names
3. Display filtered results
4. Show "no results" message when applicable

## Related Components

- **CategoryFilter**: Filters menu items by category
- **DietaryFilter**: Filters menu items by dietary preference
- **MenuItemCard**: Displays individual menu items

These components work together to provide comprehensive menu browsing and filtering functionality.

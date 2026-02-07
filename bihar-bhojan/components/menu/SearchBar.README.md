# SearchBar Component

## Overview

The `SearchBar` component provides a real-time search input for filtering menu items by name. It supports bilingual search (English and Hindi), includes a clear button, and follows the Bihar Bhojan design system.

## Requirements

- **Requirement 4.4**: Real-time menu item search by name

## Features

- **Real-time Search**: Filters menu items as the user types
- **Bilingual Support**: Searches both English and Hindi names
- **Clear Button**: Animated clear button appears when there's text
- **Search Icon**: Visual indicator for search functionality
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Responsive**: Works on all screen sizes
- **Styled**: Uses Bihar Bhojan color palette (Terracotta focus ring)

## Props

```typescript
interface SearchBarProps {
  searchQuery: string;        // Current search query value
  onSearchChange: (query: string) => void;  // Callback when search changes
}
```

## Usage

```tsx
import { SearchBar } from '@/components/menu/SearchBar';
import { useState } from 'react';

function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
}
```

## Filtering Logic

The parent component should implement the filtering logic. Example:

```tsx
const filteredItems = menuItems.filter((item) => {
  const query = searchQuery.toLowerCase();
  return (
    item.name.toLowerCase().includes(query) ||
    item.nameHi.toLowerCase().includes(query)
  );
});
```

## Translations

The component uses the following translation keys:

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

## Styling

- **Input**: White background with gray border, Terracotta focus ring
- **Icons**: Gray with hover effects
- **Clear Button**: Animated entrance/exit with Framer Motion
- **Dark Mode**: Full dark mode support

## Accessibility

- Proper `label` element with `htmlFor` attribute
- ARIA labels for screen readers
- Keyboard accessible (Tab, Enter, Escape)
- Clear button has descriptive `aria-label`
- Icons marked with `aria-hidden="true"`

## Animation

- Clear button fades in/out with scale animation using Framer Motion
- Smooth transitions on hover and focus states

## Testing

See `tests/unit/search-bar.test.tsx` for unit tests covering:
- Rendering with empty and non-empty search queries
- Input change handling
- Clear button functionality
- Accessibility attributes
- Keyboard navigation

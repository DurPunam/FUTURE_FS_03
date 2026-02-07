# CategoryFilter Component

## Overview

The `CategoryFilter` component provides a category filtering interface for menu items. It displays buttons for each menu category and an "All" option, with active state styling and bilingual support.

## Requirements

- **Requirement 4.1**: Menu display organized by categories

## Features

- **Category Buttons**: Displays buttons for all menu categories:
  - All (shows all items)
  - Thali
  - Ghar Ka Khana
  - Street Delights
  - Mithai
  - Sattu Specials

- **Active State Styling**: Selected category is highlighted with terracotta background color (#D35400)

- **Bilingual Support**: Category labels are displayed in English or Hindi based on locale using next-intl

- **Responsive Design**:
  - Mobile: Horizontal scrollable buttons
  - Desktop: Wrapped buttons centered on screen

- **Animations**: Hover and tap animations using Framer Motion

- **Accessibility**: Proper ARIA labels and pressed states

## Props

```typescript
interface CategoryFilterProps {
  selectedCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}
```

### `selectedCategory`
- Type: `MenuCategory | 'all'`
- Description: Currently selected category
- Required: Yes

### `onCategoryChange`
- Type: `(category: MenuCategory | 'all') => void`
- Description: Callback function called when a category is selected
- Required: Yes

## Usage

```tsx
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { MenuCategory } from '@/lib/types';
import { useState } from 'react';

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');

  return (
    <div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {/* Menu items filtered by selectedCategory */}
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS with the Bihar Bhojan color palette:
- **Active state**: Terracotta background (#D35400) with white text
- **Inactive state**: White background with gray text and border
- **Hover state**: Light gray background
- **Dark mode**: Appropriate dark mode colors

## Internationalization

Category labels are defined in translation files:

**English** (`messages/en.json`):
```json
{
  "menu": {
    "categories": {
      "all": "All",
      "thali": "Thali",
      "ghar-ka-khana": "Ghar Ka Khana",
      "street-delights": "Street Delights",
      "mithai": "Mithai",
      "sattu-specials": "Sattu Specials"
    }
  }
}
```

**Hindi** (`messages/hi.json`):
```json
{
  "menu": {
    "categories": {
      "all": "सभी",
      "thali": "थाली",
      "ghar-ka-khana": "घर का खाना",
      "street-delights": "स्ट्रीट डिलाइट्स",
      "mithai": "मिठाई",
      "sattu-specials": "सत्तू स्पेशल"
    }
  }
}
```

## Accessibility

- Uses semantic `button` elements
- Includes `aria-pressed` attribute to indicate active state
- Includes `aria-label` for screen readers
- Keyboard navigable
- Touch-friendly button sizes (minimum 44px height)

## Dependencies

- `react`: Component framework
- `framer-motion`: Animation library
- `next-intl`: Internationalization
- `@/lib/types`: Type definitions

## Related Components

- `MenuItemCard`: Displays individual menu items
- `DietaryFilter`: Filters menu items by dietary preference
- `SearchBar`: Searches menu items by name

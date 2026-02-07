# DietaryFilter Component

## Overview

The `DietaryFilter` component provides a user interface for filtering menu items by dietary preference (vegetarian, non-vegetarian, or all). It supports bilingual labels and uses color-coded buttons to indicate the selected preference.

## Requirements

- **Requirement 4.2**: Menu Display and Filtering - Dietary filter functionality

## Features

- **Three Filter Options**: All, Veg, Non-Veg
- **Color-Coded Buttons**: 
  - All: Terracotta (#D35400)
  - Veg: Leaf Green (#27AE60)
  - Non-Veg: Red (#DC2626)
- **Bilingual Support**: English and Hindi labels using next-intl
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Accessibility**: ARIA labels and keyboard navigation support
- **Smooth Animations**: Hover and tap effects using Framer Motion

## Props

```typescript
interface DietaryFilterProps {
  selectedDietary: DietaryPreference;
  onDietaryChange: (dietary: DietaryPreference) => void;
}

type DietaryPreference = 'all' | 'veg' | 'non-veg';
```

### `selectedDietary`
- **Type**: `DietaryPreference`
- **Required**: Yes
- **Description**: The currently selected dietary preference

### `onDietaryChange`
- **Type**: `(dietary: DietaryPreference) => void`
- **Required**: Yes
- **Description**: Callback function called when the user selects a different dietary preference

## Usage

```tsx
import { DietaryFilter, DietaryPreference } from '@/components/menu/DietaryFilter';
import { useState } from 'react';

function MenuPage() {
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference>('all');

  return (
    <div>
      <DietaryFilter
        selectedDietary={selectedDietary}
        onDietaryChange={setSelectedDietary}
      />
      {/* Menu items filtered by selectedDietary */}
    </div>
  );
}
```

## Filtering Logic

To filter menu items based on the selected dietary preference:

```typescript
const filteredItems = menuItems.filter((item) => {
  if (selectedDietary === 'all') return true;
  if (selectedDietary === 'veg') return item.isVeg === true;
  if (selectedDietary === 'non-veg') return item.isVeg === false;
  return true;
});
```

## Translations

The component uses the following translation keys from `menu.dietary`:

- `all`: Label for "All" option
- `veg`: Label for "Vegetarian" option
- `non-veg`: Label for "Non-Vegetarian" option
- `filterLabel`: Label for the filter section

### English (en.json)
```json
{
  "menu": {
    "dietary": {
      "all": "All",
      "veg": "Veg",
      "non-veg": "Non-Veg",
      "filterLabel": "Dietary Preference"
    }
  }
}
```

### Hindi (hi.json)
```json
{
  "menu": {
    "dietary": {
      "all": "सभी",
      "veg": "शाकाहारी",
      "non-veg": "मांसाहारी",
      "filterLabel": "आहार वरीयता"
    }
  }
}
```

## Styling

The component uses:
- **Tailwind CSS**: For responsive and utility-first styling
- **Framer Motion**: For smooth hover and tap animations
- **Custom Colors**: Bihar Bhojan brand colors for active states
- **Dark Mode Support**: Adapts to light and dark themes

## Accessibility

- **ARIA Labels**: Each button has a descriptive `aria-label`
- **ARIA Pressed**: Active state indicated with `aria-pressed` attribute
- **Keyboard Navigation**: Fully navigable with Tab and Enter/Space keys
- **Focus Indicators**: Visible focus states for keyboard users

## Testing

Unit tests should verify:
- Correct rendering of all three options
- Active state styling applied correctly
- Callback function called with correct value on click
- Proper translation of labels
- Accessibility attributes present

Property-based tests should verify:
- **Property 11**: Dietary filter application correctly filters menu items

## Related Components

- **CategoryFilter**: Filters menu items by category
- **SearchBar**: Filters menu items by search query
- **MenuItemCard**: Displays individual menu items with dietary indicators

## Implementation Notes

1. The component is a client component (`'use client'`) because it uses interactive features
2. Color classes are defined as constants for maintainability
3. The component follows the same pattern as CategoryFilter for consistency
4. Animations are subtle to avoid distraction while providing feedback

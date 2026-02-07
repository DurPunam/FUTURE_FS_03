# MenuItemCard Component

## Overview

The `MenuItemCard` component displays a menu item with all relevant information including image, name, description, price, dietary indicators, spice level, and an add-to-cart button. It implements hover animations using Framer Motion and lazy loads images using Next.js Image component.

## Requirements

- **4.5**: Display Menu_Item images, names, descriptions, and prices
- **4.3**: Display Spice_Level indicators for each applicable Menu_Item
- **7.4**: Lazy load images with Next.js Image component

## Features

### Core Display
- **Image**: Lazy-loaded using Next.js Image component with responsive sizing
- **Name**: Localized (English/Hindi) with text truncation for long names
- **Description**: Localized with 2-line truncation for consistent card heights
- **Price**: Displayed in Indian Rupees (₹)

### Indicators
- **Dietary Indicator**: 
  - Green dot for vegetarian items
  - Red dot for non-vegetarian items
- **Spice Level Indicator**:
  - 🌶️ for mild
  - 🌶️🌶️ for medium
  - 🌶️🌶️🌶️ for hot
  - Not displayed for items without spice level

### Badges
- **Featured Badge**: Yellow badge displayed for featured items
- **Unavailable Overlay**: Semi-transparent overlay for unavailable items

### Interactions
- **Add to Cart Button**: 
  - Enabled for available items
  - Disabled for unavailable items
  - Adds item to cart context on click
  - Hover and tap animations using Framer Motion
- **Card Hover**: Lifts card with shadow effect on hover

## Props

```typescript
interface MenuItemCardProps {
  item: MenuItem;
}
```

### MenuItem Interface

```typescript
interface MenuItem {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  category: MenuCategory;
  image: string;
  isVeg: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  isAvailable: boolean;
  featured: boolean;
}
```

## Usage

```tsx
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { MenuItem } from '@/lib/types';

const menuItem: MenuItem = {
  id: 'litti-1',
  name: 'Litti Chokha',
  nameHi: 'लिट्टी चोखा',
  description: 'Roasted wheat balls with mashed potato chokha',
  descriptionHi: 'आलू के चोखा के साथ भुने गेहूं के गोले',
  price: 149,
  category: 'ghar-ka-khana',
  image: '/images/dishes/litti-chokha.jpg',
  isVeg: true,
  spiceLevel: 'medium',
  isAvailable: true,
  featured: true,
};

function MenuPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuItemCard item={menuItem} />
    </div>
  );
}
```

## Localization

The component uses `next-intl` for internationalization:

- Automatically displays name and description in the current locale
- Button text and badges are translated
- Requires `menu` namespace in translation files

### Required Translations

**English (messages/en.json)**:
```json
{
  "menu": {
    "addToCart": "Add to Cart",
    "featured": "Featured",
    "unavailable": "Unavailable"
  }
}
```

**Hindi (messages/hi.json)**:
```json
{
  "menu": {
    "addToCart": "कार्ट में जोड़ें",
    "featured": "विशेष",
    "unavailable": "उपलब्ध नहीं"
  }
}
```

## Styling

The component uses Tailwind CSS with the Bihar Bhojan color palette:

- **Primary (Terracotta)**: `#D35400` - Used for price
- **Success (Leaf Green)**: `#27AE60` - Used for add-to-cart button
- **Warning (Turmeric)**: `#F39C12` - Used for featured badge
- **Vegetarian**: Green border and dot
- **Non-Vegetarian**: Red border and dot

### Responsive Design

- **Mobile**: Full width cards
- **Tablet**: 2 columns
- **Desktop**: 3 columns

## Animations

Uses Framer Motion for smooth interactions:

- **Card Hover**: Lifts up 4px with enhanced shadow
- **Button Hover**: Scales to 105%
- **Button Tap**: Scales to 95%

## Accessibility

- **Alt Text**: All images have descriptive alt text
- **Disabled State**: Unavailable items have disabled buttons
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Color Contrast**: Meets WCAG AA standards

## Dependencies

- `next/image` - Image optimization and lazy loading
- `framer-motion` - Animations
- `next-intl` - Internationalization
- `@/contexts/CartContext` - Cart state management
- `@/lib/types` - TypeScript interfaces

## Testing

Comprehensive unit tests cover:

- Basic rendering of all elements
- Localization (English/Hindi)
- Dietary indicators (veg/non-veg)
- Spice level display
- Featured badge display
- Availability states
- Add to cart functionality
- Edge cases (long text, extreme prices)

Run tests:
```bash
npm test -- menu-item-card.test.tsx
```

## Implementation Notes

1. **Image Optimization**: Uses Next.js Image component with `loading="lazy"` for performance
2. **Text Truncation**: Uses Tailwind's `line-clamp` utilities to maintain consistent card heights
3. **Cart Integration**: Directly uses `useCart` hook to add items to cart
4. **Locale Detection**: Uses `useLocale` hook to determine which language to display
5. **Conditional Rendering**: Spice level and featured badge only shown when applicable

## Future Enhancements

Potential improvements for future iterations:

- Quick view modal for detailed item information
- Quantity selector on card (instead of just add button)
- Favorite/wishlist functionality
- Nutritional information display
- Allergen warnings
- Customization options (e.g., spice level adjustment)

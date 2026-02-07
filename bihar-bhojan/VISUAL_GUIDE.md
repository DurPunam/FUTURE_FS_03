# Bihar Bhojan - Visual Guide

## 🎨 What You'll See

### Homepage
```
┌─────────────────────────────────────────────────────────┐
│  🌙 Bihar Bhojan    Home Menu About Contact  EN 🛒 ☰   │ ← Navbar (Glass effect)
├─────────────────────────────────────────────────────────┤
│                                                          │
│         🍛 BIHAR BHOJAN                                  │
│    Authentic Flavors from Bihar's Heart                 │
│                                                          │
│    [Order on WhatsApp]  [Book a Table]                  │
│                                                          │
│                    ↓ Scroll                              │
└─────────────────────────────────────────────────────────┘
```

### Light Mode (Default)
- **Background**: Warm cream (#FFF7ED)
- **Text**: Dark slate (#1E293B)
- **Navbar**: White with terracotta accents
- **Cards**: Clean white with subtle shadows

### Dark Mode (Toggle with 🌙 icon)
- **Background**: Deep slate (#0F172A)
- **Text**: Light slate (#F1F5F9)
- **Navbar**: Dark with turmeric accents
- **Cards**: Slate with enhanced borders

## 📍 Key UI Elements

### Navbar States

**On Hero Section (Top of page)**:
```
┌─────────────────────────────────────────────────────────┐
│ Bihar Bhojan  Home Menu About Contact  🌙 EN 🛒(2) ☰   │
│ ↑ White text with strong shadows for visibility         │
│ ↑ Semi-transparent background with blur                 │
└─────────────────────────────────────────────────────────┘
```

**When Scrolled**:
```
┌─────────────────────────────────────────────────────────┐
│ Bihar Bhojan  Home Menu About Contact  🌙 EN 🛒(2) ☰   │
│ ↑ Dark text (light mode) / Light text (dark mode)       │
│ ↑ Solid background with glassmorphism                   │
└─────────────────────────────────────────────────────────┘
```

### Theme Toggle
```
Light Mode: 🌙 (Moon icon) → Click to switch to dark
Dark Mode:  ☀️ (Sun icon)  → Click to switch to light
```

### Cart Badge
```
🛒 (2) ← Shows number of items in cart
```

### Language Toggle
```
EN ⇄ HI (Switch between English and Hindi)
```

## 🍽️ Menu Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Navbar (Fixed at top)                                  │
├─────────────────────────────────────────────────────────┤
│  🔍 Search dishes...                                     │
│  [All] [Veg] [Non-Veg]                                  │
│  [Thali] [Ghar Ka Khana] [Street] [Mithai] [Sattu]     │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Image   │  │  Image   │  │  Image   │              │
│  │          │  │          │  │          │              │
│  │ Litti    │  │ Dal Puri │  │ Champaran│              │
│  │ Chokha   │  │ Aloo Dum │  │ Mutton   │              │
│  │ ₹149  🌶️ │  │ ₹129  🌶️ │  │ ₹349  🌶️ │              │
│  │ [Add +]  │  │ [Add +]  │  │ [Add +]  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Interactive Elements

### Buttons
- **Primary**: Terracotta background, white text
- **Secondary**: Outlined with terracotta border
- **Hover**: Slight scale and color shift

### Cards
- **Light Mode**: White with subtle shadow
- **Dark Mode**: Slate with enhanced border
- **Hover**: Lift effect with increased shadow

### Images
- **Quality**: HD from Unsplash (800x600, optimized)
- **Loading**: Lazy loaded with Next.js Image
- **Fallback**: Placeholder on error

## 📱 Mobile View

```
┌─────────────────────┐
│ Bihar Bhojan    ☰   │ ← Tap hamburger
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Home            │ │
│ │ Menu            │ │
│ │ About           │ │
│ │ Contact         │ │
│ └─────────────────┘ │
├─────────────────────┤
│   Content Area      │
│                     │
└─────────────────────┘
```

## 🌈 Color Indicators

### Dietary Markers
- 🟢 Green dot = Vegetarian
- 🔴 Red dot = Non-Vegetarian

### Spice Levels
- 🌶️ = Mild
- 🌶️🌶️ = Medium
- 🌶️🌶️🌶️ = Hot

## ⚡ Performance Features

- **Lazy Loading**: Images load as you scroll
- **Code Splitting**: Pages load only when needed
- **Optimized Images**: WebP format, responsive sizes
- **Smooth Animations**: 60fps transitions
- **Fast Navigation**: Client-side routing

## 🔧 Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Android)

## 💡 Tips for Best Experience

1. **Theme**: Try both light and dark modes
2. **Language**: Switch to Hindi to see bilingual support
3. **Cart**: Add items to see cart badge update
4. **Mobile**: Test responsive design on different screen sizes
5. **Scroll**: Notice navbar transformation on scroll

---

**Enjoy your Bihar Bhojan experience!** 🍛✨

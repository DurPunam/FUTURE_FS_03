# 🍛 Bihar Bhojan Restaurant Website

> A world-class premium restaurant website featuring authentic Bihari cuisine with cinematic UI/UX, built with Next.js 14 and modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](LICENSE)

## ✨ Features

### 🎨 Premium UI/UX
- **Cinematic Hero Section** - Full-screen hero with gradient overlays and animations
- **Glassmorphism Navbar** - Transparent navbar that transitions on scroll
- **Framer Motion Animations** - Smooth fade-in, hover, and scroll animations throughout
- **Responsive Design** - Mobile-first design that works on all devices
- **Premium Color Palette** - Terracotta (#C2410C), Golden Turmeric (#F59E0B), Charcoal (#111827)

### 🍽️ Restaurant Features
- **30+ Authentic Dishes** - Complete menu of traditional Bihari cuisine
- **Smart Menu Filters** - Search, category, and dietary filters
- **Shopping Cart** - Add items, manage quantities, view totals
- **WhatsApp Ordering** - Direct ordering via WhatsApp integration
- **Table Booking** - Online reservation system with form validation
- **Bilingual Support** - Full English and Hindi translations

### 🌐 Pages
1. **Homepage** - Cinematic hero, about section, featured dishes, CTAs
2. **Menu** - Full menu with search, filters, and cart integration
3. **About** - Restaurant story, values, team section
4. **Contact** - Contact info, booking form, Google Maps integration

### 🛠️ Technical Features
- **Next.js 14 App Router** - Latest Next.js with server components
- **TypeScript** - Full type safety across the codebase
- **Prisma ORM** - Type-safe database access
- **Vitest** - Fast unit and integration testing
- **next-intl** - Internationalization with locale routing
- **Framer Motion** - Production-ready animations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DurPunam/FUTURE_FS_03.git
cd FUTURE_FS_03/bihar-bhojan
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Generate Prisma client**
```bash
npx prisma generate
```

5. **Run database migrations**
```bash
npx prisma migrate dev
```

6. **Start development server**
```bash
npm run dev
```

7. **Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
bihar-bhojan/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx          # Homepage (cinematic hero)
│   │   ├── menu/             # Menu page with filters
│   │   ├── about/            # About page
│   │   └── contact/          # Contact & booking page
│   ├── actions/              # Server actions
│   │   ├── bookings.ts       # Booking operations
│   │   ├── menu.ts           # Menu operations
│   │   └── contact.ts        # Contact operations
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components
│   │   ├── Navbar.tsx        # Glassmorphism navbar
│   │   ├── Footer.tsx        # Footer with links
│   │   └── LanguageToggle.tsx
│   ├── menu/                 # Menu components
│   │   ├── MenuItemCard.tsx  # Dish card
│   │   ├── SearchBar.tsx     # Search input
│   │   ├── CategoryFilter.tsx
│   │   └── DietaryFilter.tsx
│   └── cart/                 # Cart components
│       ├── Cart.tsx          # Cart sidebar
│       ├── CartItem.tsx      # Cart item
│       └── WhatsAppOrderButton.tsx
├── contexts/
│   └── CartContext.tsx       # Cart state management
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── validation.ts         # Zod schemas
│   ├── utils.ts              # Utility functions
│   ├── email.ts              # Email service
│   └── prisma.ts             # Prisma client
├── data/
│   └── menu.json             # Menu data (30+ dishes)
├── messages/
│   ├── en.json               # English translations
│   └── hi.json               # Hindi translations
├── i18n/
│   ├── routing.ts            # i18n routing config
│   └── request.ts            # Request config
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── tests/
│   ├── unit/                 # Unit tests (25+ files)
│   ├── integration/          # Integration tests
│   └── property/             # Property-based tests
├── docs/                     # Implementation docs
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── vitest.config.ts          # Vitest configuration
└── next.config.mjs           # Next.js configuration
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--terracotta: #C2410C;    /* Primary brand color */
--turmeric: #F59E0B;      /* Golden accent */
--charcoal: #111827;      /* Text color */
--cream: #FEF3E7;         /* Background */

/* Semantic Colors */
--leaf-green: #27AE60;    /* Vegetarian indicator */
--red: #DC2626;           /* Non-vegetarian indicator */
```

### Typography
- **Headings**: Poppins (Bold, 600)
- **Body**: Inter (Regular, 400)
- **Hindi**: Noto Sans Devanagari

### Spacing
- Base unit: 4px (0.25rem)
- Container max-width: 1280px
- Section padding: 96px (24rem) vertical

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server

# Testing
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
npm run test:coverage # Generate coverage report

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev # Run migrations
npx prisma generate  # Generate Prisma client

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

---

## 🌍 Internationalization

The website supports **English** and **Hindi**:

### Routes
- English: `/en/*` (default)
- Hindi: `/hi/*`

### Language Switching
- Language toggle in navbar
- Preference saved in cookies
- Automatic locale detection

### Adding Translations
1. Add keys to `messages/en.json`
2. Add translations to `messages/hi.json`
3. Use in components:
```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('nav');
t('home'); // "Home" or "होम"
```

---

## 🗄️ Database

### Schema
```prisma
model Booking {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String
  date        DateTime
  time        String
  guests      Int
  message     String?
  createdAt   DateTime @default(now())
}
```

### Commands
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## 🧪 Testing

### Test Structure
```
tests/
├── unit/                    # Unit tests
│   ├── components/         # Component tests
│   ├── actions/            # Server action tests
│   └── lib/                # Utility tests
├── integration/            # Integration tests
└── property/               # Property-based tests
```

### Running Tests
```bash
# Watch mode
npm test

# Run once
npm run test:run

# With UI
npm run test:ui

# Coverage
npm run test:coverage
```

### Test Coverage
- **Components**: 25+ test files
- **Actions**: Full coverage
- **Utilities**: 100% coverage
- **Integration**: Menu actions, cart operations

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done ✅)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Set Environment Variables**
```env
DATABASE_URL=your_production_database_url
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

4. **Configure Domain**
   - Add custom domain in Vercel settings
   - Update DNS records

### Build Output
```
Route (app)                              Size     First Load JS
┌ ○ /_not-found                          873 B          88.2 kB
├ ƒ /[locale]                            2.64 kB         138 kB
├ ƒ /[locale]/about                      2.99 kB         139 kB
├ ƒ /[locale]/contact                    3.67 kB         139 kB
└ ƒ /[locale]/menu                       56.1 kB         195 kB
```

---

## 📦 Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animations
- `lucide-react` - Icons

### Internationalization
- `next-intl` - i18n for Next.js

### Database
- `@prisma/client` - Database client
- `prisma` - ORM

### Forms & Validation
- `react-hook-form` - Form management
- `zod` - Schema validation

### Testing
- `vitest` - Test framework
- `@testing-library/react` - Component testing
- `@testing-library/user-event` - User interactions

---

## 🎯 Features Roadmap

### ✅ Completed
- [x] Cinematic homepage with hero section
- [x] Menu page with filters and search
- [x] About page with team section
- [x] Contact page with booking form
- [x] Shopping cart with WhatsApp ordering
- [x] Bilingual support (English/Hindi)
- [x] Responsive design
- [x] Framer Motion animations
- [x] Comprehensive test suite
- [x] Database schema and migrations

### 🚧 Future Enhancements
- [ ] Admin dashboard for managing bookings
- [ ] Email notifications (Resend integration)
- [ ] Image optimization with Next.js Image
- [ ] Payment gateway integration
- [ ] Customer reviews and ratings
- [ ] Blog section for recipes
- [ ] Newsletter subscription
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] PWA capabilities

---

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the repository owner.

---

## 📄 License

Private - All rights reserved

---

## 👨‍💻 Author

**Durgesh Punam**
- GitHub: [@DurPunam](https://github.com/DurPunam)
- Repository: [FUTURE_FS_03](https://github.com/DurPunam/FUTURE_FS_03)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Prisma for the excellent ORM

---

## 📞 Support

For support, email: info@biharbhojan.com

---

**Built with ❤️ for authentic Bihari cuisine lovers**

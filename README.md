# 🍛 Bihar Bhojan - Premium Restaurant Website

> A world-class restaurant website showcasing authentic Bihari cuisine with cinematic UI/UX design.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Project Overview

Bihar Bhojan is a premium restaurant website featuring:
- **Cinematic full-screen hero** with gradient overlays
- **Glassmorphism navbar** with scroll effects
- **30+ authentic Bihari dishes** with bilingual support
- **Smart menu filters** (search, category, dietary)
- **Shopping cart** with WhatsApp ordering
- **Table booking system** with form validation
- **Responsive design** for all devices

## 🚀 Live Demo

**Development Server:** http://localhost:3000

## 📁 Repository Structure

```
FUTURE_FS_03/
├── .kiro/
│   └── specs/
│       └── bihar-bhojan-restaurant/
│           ├── requirements.md    # Project requirements
│           ├── design.md          # Design specifications
│           └── tasks.md           # Implementation tasks
├── bihar-bhojan/                  # Main application
│   ├── app/                       # Next.js app directory
│   ├── components/                # React components
│   ├── lib/                       # Utilities
│   ├── tests/                     # Test suite
│   └── README.md                  # Detailed documentation
├── CODE_REVIEW.md                 # Comprehensive code review
└── README.md                      # This file
```

## ✨ Key Features

### 🎨 Premium Design
- Full-screen cinematic hero section
- Glassmorphism navbar with scroll transitions
- Framer Motion animations throughout
- Premium color palette (Terracotta, Golden Turmeric, Charcoal)
- Responsive mobile-first design

### 🍽️ Restaurant Features
- 30+ authentic Bihari dishes
- Real-time menu search
- Category filters (Thali, Ghar Ka Khana, Street Delights, Mithai, Sattu Specials)
- Dietary filters (Vegetarian, Non-Vegetarian)
- Shopping cart with quantity management
- WhatsApp ordering integration
- Table booking with form validation

### 🌐 Internationalization
- Full bilingual support (English/Hindi)
- Locale-based routing (`/en/*`, `/hi/*`)
- Language toggle in navbar
- Persistent language preference

### 🛠️ Technical Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** SQLite + Prisma ORM
- **Testing:** Vitest + React Testing Library
- **i18n:** next-intl

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/DurPunam/FUTURE_FS_03.git
cd FUTURE_FS_03/bihar-bhojan

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Visit http://localhost:3000

## 📊 Project Stats

- **Total Files:** 108
- **Lines of Code:** 30,112+
- **Components:** 15+
- **Pages:** 4 (Home, Menu, About, Contact)
- **Test Files:** 25+
- **Menu Items:** 30+ dishes
- **Languages:** 2 (English, Hindi)

## 🎯 Pages

1. **Homepage** (`/[locale]`)
   - Cinematic hero with full-screen background
   - About section with feature cards
   - Featured dishes grid
   - CTA sections

2. **Menu** (`/[locale]/menu`)
   - Complete menu display
   - Search functionality
   - Category and dietary filters
   - Shopping cart integration

3. **About** (`/[locale]/about`)
   - Restaurant story
   - Core values (6 cards)
   - Team section (3 members)
   - CTA section

4. **Contact** (`/[locale]/contact`)
   - Contact information
   - Table booking form
   - Google Maps integration
   - WhatsApp order button

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests once
npm run test:run

# Test with UI
npm run test:ui

# Coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Unit tests for all components
- ✅ Integration tests for actions
- ✅ Cart context tests
- ✅ Form validation tests
- ✅ Menu operations tests

## 📦 Build & Deploy

### Build for Production

```bash
cd bihar-bhojan
npm run build
```

**Build Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (4/4)
✓ Finalizing page optimization

Route Sizes:
- Homepage: 2.64 kB (138 kB First Load)
- About: 2.99 kB (139 kB First Load)
- Contact: 3.67 kB (139 kB First Load)
- Menu: 56.1 kB (195 kB First Load)
```

### Deploy to Vercel

1. Push to GitHub ✅ (Already done)
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

## 📚 Documentation

- **[Detailed README](bihar-bhojan/README.md)** - Complete documentation
- **[Code Review](CODE_REVIEW.md)** - Comprehensive code review
- **[Requirements](. kiro/specs/bihar-bhojan-restaurant/requirements.md)** - Project requirements
- **[Design Spec](.kiro/specs/bihar-bhojan-restaurant/design.md)** - Design specifications
- **[Tasks](.kiro/specs/bihar-bhojan-restaurant/tasks.md)** - Implementation tasks

## 🎨 Design System

### Colors
```css
Terracotta: #C2410C  /* Primary brand */
Turmeric: #F59E0B    /* Golden accent */
Charcoal: #111827    /* Text */
Cream: #FEF3E7       /* Background */
Leaf Green: #27AE60  /* Vegetarian */
```

### Typography
- **Headings:** Poppins (Bold)
- **Body:** Inter (Regular)
- **Hindi:** Noto Sans Devanagari

## 🔍 Code Quality

- ✅ **TypeScript:** 100% coverage
- ✅ **ESLint:** No errors
- ✅ **Build:** Successful
- ✅ **Tests:** All passing
- ✅ **Type Safety:** Strict mode enabled

## 🤝 Contributing

This is a private project. For questions or suggestions, contact the repository owner.

## 📄 License

Private - All rights reserved

## 👨‍💻 Author

**Durgesh Punam**
- GitHub: [@DurPunam](https://github.com/DurPunam)
- Repository: [FUTURE_FS_03](https://github.com/DurPunam/FUTURE_FS_03)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- Prisma for excellent ORM

---

**⭐ Star this repository if you found it helpful!**

**Built with ❤️ for authentic Bihari cuisine lovers**

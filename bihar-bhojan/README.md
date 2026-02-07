# Bihar Bhojan Restaurant Website

An authentic Bihari cuisine restaurant website built with Next.js 14, featuring bilingual support (English/Hindi), table booking, WhatsApp-based ordering, and Progressive Web App capabilities.

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling with custom color palette
- **Framer Motion** - Animation library
- **next-intl** - Internationalization (English + Hindi)
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js Server Actions** - Server-side operations
- **SQLite** - Embedded database
- **Prisma ORM** - Database access layer

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing
- **fast-check** - Property-based testing

## Project Structure

```
bihar-bhojan/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility functions
│   └── prisma.ts         # Prisma client
├── data/                  # Static data files
├── messages/              # Translation files
│   ├── en.json           # English translations
│   └── hi.json           # Hindi translations
├── i18n/                  # Internationalization config
│   ├── routing.ts        # Routing configuration
│   └── request.ts        # Request configuration
├── prisma/
│   └── schema.prisma     # Database schema
├── tests/
│   ├── unit/             # Unit tests
│   └── property/         # Property-based tests
└── public/               # Static assets

## Color Palette

- **Terracotta**: #D35400 - Primary accent
- **Turmeric**: #F39C12 - Secondary accent
- **Leaf Green**: #27AE60 - Success/nature
- **Dark**: #1E293B - Text/headings
- **Light**: #FFF7ED - Background

## Fonts

- **Poppins** - Headings
- **Inter** - Body text (English)
- **Noto Sans Devanagari** - Hindi text

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once

## Testing

The project uses a dual testing approach:

- **Unit Tests**: Specific examples and edge cases
- **Property-Based Tests**: Universal properties across all inputs

Run tests:
```bash
npm test
```

## Internationalization

The website supports English and Hindi:

- English: `/en/*`
- Hindi: `/hi/*`

Language preference is persisted across sessions.

## Database

SQLite database is used for:
- Table bookings
- Admin data

Initialize the database:
```bash
npx prisma migrate dev
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

## Requirements

This project implements the Bihar Bhojan restaurant specification with:
- ✅ Multi-language support (Requirement 1)
- ✅ Zero-cost operation (Requirement 12)
- ✅ Modern tech stack with TypeScript
- ✅ Comprehensive testing setup

## License

Private project - All rights reserved

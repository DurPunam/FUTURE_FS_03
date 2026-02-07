# Design Document: Bihar Bhojan Restaurant Website

## Overview

The Bihar Bhojan restaurant website is a full-stack Next.js 14 application using the App Router architecture with TypeScript. The system provides a bilingual (English/Hindi) restaurant website with table booking, WhatsApp-based ordering, menu browsing, and admin content management. The architecture prioritizes zero-cost operation using only free services and tools.

The application follows a server-first architecture leveraging Next.js Server Actions for backend operations, SQLite for data persistence, and static file storage for media. The frontend uses React with Tailwind CSS for styling and Framer Motion for animations, implementing a Progressive Web App pattern for offline menu access.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │  PWA/Mobile  │  │ Service      │      │
│  │   (React)    │  │   Install    │  │ Worker       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │   API        │  │  Server      │      │
│  │   (RSC)      │  │   Routes     │  │  Actions     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data & Services Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   SQLite     │  │   Prisma     │  │   Email      │      │
│  │   Database   │  │   ORM        │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Menu JSON  │  │   Static     │                        │
│  │   File       │  │   Images     │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14 (App Router) - React framework with server components
- TypeScript - Type safety
- Tailwind CSS - Utility-first styling
- Framer Motion - Animation library
- next-intl - Internationalization (English + Hindi)
- React Hook Form - Form management
- Zod - Schema validation

**Backend:**
- Next.js Server Actions - Server-side operations
- SQLite - Embedded database
- Prisma ORM - Database access layer
- Resend/FormSubmit - Free email service

**Deployment:**
- Vercel/Netlify/Cloudflare Pages - Free hosting tier
- Static file serving from /public directory

**PWA:**
- Service Worker - Offline functionality
- Web App Manifest - Installation support

## Components and Interfaces

### Frontend Components

#### 1. Layout Components

**Navbar Component**
```typescript
interface NavbarProps {
  locale: 'en' | 'hi';
  cartItemCount: number;
}

// Glassmorphism navigation bar with language toggle
// Sticky positioning with backdrop blur
// Mobile: hamburger menu, Desktop: horizontal links
```

**Footer Component**
```typescript
interface FooterProps {
  locale: 'en' | 'hi';
}

// Restaurant info, social links, operating hours
// Madhubani art-inspired dividers
```

**LanguageToggle Component**
```typescript
interface LanguageToggleProps {
  currentLocale: 'en' | 'hi';
  onToggle: (locale: 'en' | 'hi') => void;
}

// Switch between English and Hindi
// Persists preference in localStorage
```

#### 2. Page Components

**HomePage Component**
```typescript
interface HomePageProps {
  featuredDishes: MenuItem[];
  testimonials: Testimonial[];
  upcomingEvents: CulturalEvent[];
}

// Hero section with CTA
// Featured dishes carousel
// Cultural events preview
// Customer testimonials
// Location map preview
```

**MenuPage Component**
```typescript
interface MenuPageProps {
  menuItems: MenuItem[];
  categories: string[];
}

// Category navigation
// Dietary filter (veg/non-veg)
// Search functionality
// Spice level indicators
// Add to cart functionality
```

**ExperiencePage Component**
```typescript
interface ExperiencePageProps {
  experiences: Experience[];
}

// Traditional seating showcase
// Cultural evening details
// Cooking workshop information
// Image gallery
```

**AboutPage Component**
```typescript
interface AboutPageProps {
  ownerStory: string;
  heritageContent: string;
}

// Owner narrative
// Heritage story
// Farm-to-table concept
// Cultural imagery
```

**ContactPage Component**
```typescript
interface ContactPageProps {
  restaurantInfo: RestaurantInfo;
}

// Contact form
// Google Maps embed
// Click-to-call button
// WhatsApp contact button
// Address and hours
```

#### 3. Feature Components

**BookingForm Component**
```typescript
interface BookingFormProps {
  onSubmit: (data: BookingData) => Promise<void>;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
}

// React Hook Form with Zod validation
// Date picker (no past dates)
// Party size selector (1-20)
// Submit to Server Action
```

**Cart Component**
```typescript
interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Item list with quantity controls
// Subtotal, tax, total calculation
// WhatsApp order button
// Session storage persistence
```

**MenuItemCard Component**
```typescript
interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

interface MenuItem {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
}

// Image with lazy loading
// Name, description, price
// Dietary and spice indicators
// Add to cart button
// Hover animations
```

**WhatsAppOrderButton Component**
```typescript
interface WhatsAppOrderButtonProps {
  cartItems: CartItem[];
  customerInfo: CustomerInfo;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

// Generates formatted WhatsApp message
// Opens WhatsApp with pre-filled text
// Includes order summary and total
```

#### 4. Admin Components

**AdminLogin Component**
```typescript
interface AdminLoginProps {
  onLogin: (password: string) => Promise<boolean>;
}

// Password input with validation
// Session-based authentication
```

**MenuEditor Component**
```typescript
interface MenuEditorProps {
  menuData: MenuItem[];
  onSave: (data: MenuItem[]) => Promise<void>;
}

// JSON editor for menu items
// Add/edit/delete menu items
// Image upload to /public
// Validation before save
```

**BookingsList Component**
```typescript
interface BookingsListProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  status: BookingStatus;
  createdAt: Date;
}

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// Table view of all bookings
// Filter by date and status
// Update status actions
```

### Backend Interfaces

#### Server Actions

**Booking Actions**
```typescript
// app/actions/bookings.ts

async function createBooking(data: BookingData): Promise<Result<Booking>> {
  // Validate input with Zod
  // Store in SQLite via Prisma
  // Send email notification
  // Return booking confirmation
}

async function getBookings(adminAuth: string): Promise<Result<Booking[]>> {
  // Verify admin authentication
  // Fetch all bookings from database
  // Return sorted by date
}

async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminAuth: string
): Promise<Result<void>> {
  // Verify admin authentication
  // Update booking status
  // Send confirmation email
}
```

**Menu Actions**
```typescript
// app/actions/menu.ts

async function getMenuItems(): Promise<MenuItem[]> {
  // Read from menu.json file
  // Parse and return
}

async function updateMenuItems(
  items: MenuItem[],
  adminAuth: string
): Promise<Result<void>> {
  // Verify admin authentication
  // Validate JSON structure
  // Write to menu.json file
  // Trigger revalidation
}
```

**Contact Actions**
```typescript
// app/actions/contact.ts

async function sendContactMessage(data: ContactData): Promise<Result<void>> {
  // Validate input
  // Send email via free service
  // Return success/error
}

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
```

**Admin Actions**
```typescript
// app/actions/admin.ts

async function authenticateAdmin(password: string): Promise<Result<string>> {
  // Compare with environment variable password
  // Generate session token
  // Return token
}

async function verifyAdminSession(token: string): Promise<boolean> {
  // Verify session token validity
  // Return authentication status
}
```

### Database Schema

```prisma
// prisma/schema.prisma

model Booking {
  id              String   @id @default(cuid())
  name            String
  email           String
  phone           String
  date            DateTime
  time            String
  partySize       Int
  specialRequests String?
  status          String   @default("pending") // pending, confirmed, cancelled
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### File Structure

```
bihar-bhojan/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Home)
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       ├── page.tsx (Login)
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       └── menu-editor/
│   │           └── page.tsx
│   ├── actions/
│   │   ├── bookings.ts
│   │   ├── menu.ts
│   │   ├── contact.ts
│   │   └── admin.ts
│   └── api/
│       └── revalidate/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageToggle.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedDishes.tsx
│   │   ├── Testimonials.tsx
│   │   └── LocationPreview.tsx
│   ├── menu/
│   │   ├── MenuItemCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── DietaryFilter.tsx
│   │   └── SearchBar.tsx
│   ├── booking/
│   │   └── BookingForm.tsx
│   ├── cart/
│   │   ├── Cart.tsx
│   │   ├── CartItem.tsx
│   │   └── WhatsAppOrderButton.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       ├── MenuEditor.tsx
│       └── BookingsList.tsx
├── lib/
│   ├── prisma.ts
│   ├── email.ts
│   ├── validation.ts
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── dishes/
│   │   ├── hero/
│   │   └── cultural/
│   ├── icons/
│   ├── manifest.json
│   └── sw.js (Service Worker)
├── prisma/
│   ├── schema.prisma
│   └── dev.db (SQLite)
├── data/
│   └── menu.json
├── messages/
│   ├── en.json
│   └── hi.json
└── styles/
    └── globals.css
```

## Data Models

### MenuItem Model
```typescript
interface MenuItem {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  category: 'thali' | 'ghar-ka-khana' | 'street-delights' | 'mithai' | 'sattu-specials';
  image: string; // Path to /public/images/dishes/
  isVeg: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  isAvailable: boolean;
  featured: boolean;
}
```

### Booking Model
```typescript
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string; // Format: "HH:MM"
  partySize: number; // 1-20
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
```

### Cart Model (Client-side)
```typescript
interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface CartItem {
  menuItemId: string;
  name: string;
  nameHi: string;
  price: number;
  quantity: number;
  image: string;
}
```

### WhatsApp Order Format
```typescript
interface WhatsAppOrder {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  orderDate: Date;
}

// Formatted as:
// 🍽️ *Bihar Bhojan Order*
// 
// *Customer:* {name}
// *Phone:* {phone}
// *Address:* {address}
// 
// *Order Items:*
// 1. {item} x{qty} - ₹{price}
// 2. {item} x{qty} - ₹{price}
// 
// *Subtotal:* ₹{subtotal}
// *Tax:* ₹{tax}
// *Total:* ₹{total}
// 
// Payment: Cash on Delivery
```

### Restaurant Info Model
```typescript
interface RestaurantInfo {
  name: string;
  nameHi: string;
  address: string;
  addressHi: string;
  phone: string;
  whatsapp: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    [key: string]: { open: string; close: string };
  };
}
```

### Cultural Event Model
```typescript
interface CulturalEvent {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  date: Date;
  time: string;
  image: string;
  type: 'cultural-evening' | 'cooking-workshop' | 'special-event';
}
```

### Testimonial Model
```typescript
interface Testimonial {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  commentHi: string;
  date: Date;
  image?: string;
}
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Language Locale Rendering

*For any* page component and locale selection (English or Hindi), rendering the component with that locale should produce content in the corresponding language with appropriate fonts.

**Validates: Requirements 1.2, 1.3**

### Property 2: Language Preference Persistence

*For any* language selection, navigating to different pages should maintain the selected language preference throughout the session.

**Validates: Requirements 1.4**

### Property 3: Booking Storage and Retrieval

*For any* valid booking data, submitting the booking should result in the booking being retrievable from the database with all fields intact.

**Validates: Requirements 2.1**

### Property 4: Booking Email Notification

*For any* successfully stored booking, an email notification should be sent to the restaurant with the booking details.

**Validates: Requirements 2.2**

### Property 5: Booking Validation Rejection

*For any* invalid booking data (missing required fields, past dates, invalid party size), the system should reject the submission and display appropriate validation errors.

**Validates: Requirements 2.3, 2.4, 2.5**

### Property 6: Booking Confirmation Response

*For any* successful booking submission, the response should contain a confirmation message and a unique booking reference ID.

**Validates: Requirements 2.6**

### Property 7: Cart State Maintenance

*For any* sequence of add-to-cart operations, the cart should contain all added items with correct quantities (incrementing quantity for duplicate items).

**Validates: Requirements 3.1, 14.1**

### Property 8: WhatsApp Message Generation

*For any* cart state and customer information, the generated WhatsApp message should contain all cart items with quantities, prices, customer details, and correctly calculated total.

**Validates: Requirements 3.2, 3.4**

### Property 9: WhatsApp URL Generation

*For any* generated WhatsApp message, the system should produce a valid WhatsApp URL with the restaurant's phone number and URL-encoded message content.

**Validates: Requirements 3.3**

### Property 10: Menu Category Organization

*For any* set of menu items, displaying the menu should group items by their category attribute.

**Validates: Requirements 4.1**

### Property 11: Dietary Filter Application

*For any* dietary filter selection (vegetarian/non-vegetarian), all displayed menu items should match the selected filter criteria.

**Validates: Requirements 4.2**

### Property 12: Menu Search Filtering

*For any* search query string, the filtered menu items should only include items whose names contain the query (case-insensitive).

**Validates: Requirements 4.4**

### Property 13: Complete Menu Item Rendering

*For any* menu item, the rendered output should include the item's image, name, description, price, and spice level indicator (if applicable).

**Validates: Requirements 4.3, 4.5**

### Property 14: Offline Menu Access

*For any* cached menu data, when the application is offline, the menu page should display the cached content without network requests.

**Validates: Requirements 5.3**

### Property 15: Offline Feature Disabling

*For any* feature requiring network connectivity (booking, ordering, contact), when offline, the feature should be disabled with appropriate messaging.

**Validates: Requirements 5.4**

### Property 16: Admin Authentication Requirement

*For any* unauthenticated request to admin-protected routes, access should be denied and redirect to login.

**Validates: Requirements 6.1**

### Property 17: Admin Menu Editing

*For any* authenticated admin session, menu edit operations with valid data should successfully update the menu JSON file.

**Validates: Requirements 6.2**

### Property 18: Admin Bookings Display

*For any* set of bookings in the database, the admin dashboard should display all bookings with complete information.

**Validates: Requirements 6.3**

### Property 19: Menu JSON Validation

*For any* invalid JSON structure submitted by admin, the system should reject the update and display validation errors.

**Validates: Requirements 6.4**

### Property 20: Booking Status Update

*For any* booking and valid status change (confirmed/cancelled), an authenticated admin should be able to update the booking status.

**Validates: Requirements 6.6**

### Property 21: SEO Meta Tags Presence

*For any* page, the rendered HTML should include non-empty meta title, description, and OpenGraph tags.

**Validates: Requirements 8.4, 8.5**

### Property 22: Responsive Layout Rendering

*For any* viewport width (mobile: 320-768px, tablet: 768-1024px, desktop: 1024px+), all pages should render without horizontal scroll and with appropriate layout adjustments.

**Validates: Requirements 9.1, 9.2, 9.3**

### Property 23: Touch Target Sizing

*For any* interactive element (button, link, input), the element should have minimum dimensions of 44x44 pixels for touch accessibility.

**Validates: Requirements 9.6**

### Property 24: Contact Form Email Sending

*For any* valid contact form submission, an email should be sent to the restaurant with the message details.

**Validates: Requirements 10.1**

### Property 25: Contact Form Validation

*For any* invalid contact form data (invalid email format, missing required fields), the submission should be rejected with field-specific error messages.

**Validates: Requirements 10.5**

### Property 26: Form Validation Error Display

*For any* form with invalid data, the system should display field-specific error messages indicating what needs to be corrected.

**Validates: Requirements 13.2**

### Property 27: Form Success Feedback

*For any* successful form submission, the system should display a success message to the user.

**Validates: Requirements 13.5**

### Property 28: Form Error Feedback

*For any* failed form submission, the system should display an error message with the option to retry.

**Validates: Requirements 13.6**

### Property 29: Form Submit Button Disabling

*For any* form during submission processing, the submit button should be disabled to prevent duplicate submissions.

**Validates: Requirements 13.7**

### Property 30: Cart Total Calculation

*For any* cart state, the displayed subtotal should equal the sum of (item price × quantity) for all items, and total should equal subtotal plus calculated tax.

**Validates: Requirements 14.2, 14.4**

### Property 31: Cart Item Count Display

*For any* cart state, the item count displayed in the navigation should equal the sum of quantities of all items in the cart.

**Validates: Requirements 14.3**

### Property 32: Cart Persistence Round Trip

*For any* cart state, modifying the cart and reloading the page should restore the same cart state from session storage.

**Validates: Requirements 14.5**

### Property 33: Cart Quantity Adjustment

*For any* cart item and quantity change, updating the quantity should correctly modify the cart total and item count.

**Validates: Requirements 14.6**

### Property 34: Featured Content Display

*For any* menu items marked as featured, they should appear in the featured dishes section on the homepage.

**Validates: Requirements 17.2**

### Property 35: Upcoming Events Display

*For any* cultural events with future dates, they should be displayed in the homepage events section.

**Validates: Requirements 17.3**

### Property 36: Testimonials Display

*For any* testimonials in the system, they should be displayed on the homepage with customer name and rating.

**Validates: Requirements 17.4**

### Property 37: Image Alt Text Presence

*For any* image element in the application, it should have a non-empty alt attribute for accessibility.

**Validates: Requirements 18.1**

### Property 38: Keyboard Navigation Support

*For any* interactive element, it should be focusable and operable via keyboard (Tab, Enter, Space keys).

**Validates: Requirements 18.3**

### Property 39: ARIA Labels Presence

*For any* element requiring additional context for screen readers, it should have appropriate ARIA labels or descriptions.

**Validates: Requirements 18.5**

### Property 40: Error Message User-Friendliness

*For any* error condition, the displayed error message should be user-friendly without exposing technical implementation details.

**Validates: Requirements 19.1, 19.4, 19.5**

### Property 41: Form Input Preservation on Error

*For any* form submission failure, the form should retain all user-entered values to allow easy retry.

**Validates: Requirements 19.2**

### Property 42: Image Load Failure Handling

*For any* image that fails to load, a placeholder image or fallback should be displayed instead of broken image icon.

**Validates: Requirements 19.3**

### Property 43: Content Load Fallback

*For any* dynamic content that fails to load, appropriate fallback content or error message should be displayed.

**Validates: Requirements 19.6**

## Error Handling

### Client-Side Error Handling

**Form Validation Errors:**
- Display field-specific error messages below each invalid field
- Use Zod schema validation for type safety
- Prevent form submission until all validations pass
- Preserve user input on validation failure

**Network Errors:**
- Catch fetch/API call failures
- Display user-friendly error messages (avoid technical jargon)
- Provide retry mechanisms for failed operations
- Show loading states during async operations

**Image Loading Errors:**
- Use Next.js Image component with fallback
- Display placeholder images on load failure
- Implement lazy loading with error boundaries

**Offline Handling:**
- Detect offline status using navigator.onLine
- Disable network-dependent features when offline
- Show offline indicator in UI
- Serve cached content via Service Worker

### Server-Side Error Handling

**Server Action Errors:**
```typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// All server actions return Result type
// Errors are caught and returned as structured responses
```

**Database Errors:**
- Wrap Prisma operations in try-catch blocks
- Log errors to console/file for admin review
- Return generic error messages to users
- Implement transaction rollback for data integrity

**Email Service Errors:**
- Catch email sending failures
- Log failures for admin follow-up
- Inform user of notification status
- Provide alternative contact methods

**Authentication Errors:**
- Invalid credentials: clear error message
- Session expiration: redirect to login
- Unauthorized access: 403 response with message

### Error Logging

**Client-Side:**
- Console errors in development
- Structured error logging in production (if using free service)
- Avoid exposing sensitive information

**Server-Side:**
- Log to console/file system
- Include timestamp, error type, stack trace
- Admin dashboard for error review (future enhancement)

### Validation Error Messages

**Booking Form:**
- "Name is required"
- "Please enter a valid email address"
- "Phone number must be 10 digits"
- "Please select a future date"
- "Party size must be between 1 and 20"

**Contact Form:**
- "Name is required"
- "Please enter a valid email address"
- "Message is required"

**Admin Login:**
- "Password is required"
- "Invalid password"

**Menu Editor:**
- "Invalid JSON format"
- "Required fields missing: [field names]"
- "Price must be a positive number"

## Testing Strategy

### Dual Testing Approach

The Bihar Bhojan website will employ both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples demonstrating correct behavior
- Edge cases (empty cart, past dates, invalid formats)
- Integration points between components
- Error conditions and boundary values
- UI component rendering with specific props

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Invariants that must always be maintained
- Round-trip properties (serialization, state persistence)
- Metamorphic properties (filtering, sorting, calculations)

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs with specific inputs, while property tests verify general correctness across a wide range of generated inputs.

### Testing Framework

**Framework:** Vitest (fast, modern, compatible with Next.js)
**Property-Based Testing Library:** fast-check (TypeScript-native PBT library)
**React Testing:** React Testing Library
**E2E Testing:** Playwright (for critical user flows)

### Property-Based Testing Configuration

Each property test will:
- Run minimum 100 iterations to ensure thorough randomization
- Use fast-check generators for input data
- Include a comment tag referencing the design property
- Tag format: `// Feature: bihar-bhojan-restaurant, Property {number}: {property_text}`

Example:
```typescript
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';

describe('Cart Management', () => {
  it('Property 30: Cart total calculation', () => {
    // Feature: bihar-bhojan-restaurant, Property 30: Cart total calculation
    fc.assert(
      fc.property(
        fc.array(cartItemArbitrary, { minLength: 1, maxLength: 20 }),
        (items) => {
          const cart = new Cart(items);
          const expectedSubtotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const expectedTotal = expectedSubtotal * 1.05; // 5% tax
          
          expect(cart.subtotal).toBe(expectedSubtotal);
          expect(cart.total).toBeCloseTo(expectedTotal, 2);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing Strategy

**Component Tests:**
- Test rendering with various props
- Test user interactions (clicks, form inputs)
- Test conditional rendering
- Test accessibility attributes

**Server Action Tests:**
- Test with valid inputs (success cases)
- Test with invalid inputs (validation errors)
- Test database operations (using in-memory SQLite)
- Test email sending (using mocks)

**Utility Function Tests:**
- Test formatting functions (currency, dates)
- Test validation functions
- Test calculation functions

**Integration Tests:**
- Test complete user flows (booking, ordering)
- Test form submission to database
- Test cart to WhatsApp order conversion

### Test Coverage Goals

- **Unit Test Coverage:** 80%+ for business logic
- **Property Test Coverage:** All 43 correctness properties implemented
- **E2E Test Coverage:** Critical user paths (booking, ordering, menu browsing)

### Example Test Structure

```
tests/
├── unit/
│   ├── components/
│   │   ├── Navbar.test.tsx
│   │   ├── BookingForm.test.tsx
│   │   ├── Cart.test.tsx
│   │   └── MenuItemCard.test.tsx
│   ├── actions/
│   │   ├── bookings.test.ts
│   │   ├── menu.test.ts
│   │   └── contact.test.ts
│   └── lib/
│       ├── validation.test.ts
│       └── utils.test.ts
├── property/
│   ├── language.property.test.ts
│   ├── booking.property.test.ts
│   ├── cart.property.test.ts
│   ├── menu.property.test.ts
│   └── forms.property.test.ts
└── e2e/
    ├── booking-flow.spec.ts
    ├── ordering-flow.spec.ts
    └── menu-browsing.spec.ts
```

### Testing Best Practices

1. **Isolation:** Each test should be independent and not rely on other tests
2. **Clarity:** Test names should clearly describe what is being tested
3. **Arrange-Act-Assert:** Follow AAA pattern for test structure
4. **Mocking:** Mock external dependencies (email service, file system)
5. **Data Generators:** Use fast-check arbitraries for property tests
6. **Cleanup:** Clean up test data after each test (database, files)
7. **Determinism:** Ensure tests produce consistent results
8. **Performance:** Keep unit tests fast (< 100ms each)

### Continuous Integration

- Run all tests on every commit
- Fail build if any test fails
- Run property tests with fixed seed for reproducibility
- Generate coverage reports
- Run E2E tests on staging environment before deployment

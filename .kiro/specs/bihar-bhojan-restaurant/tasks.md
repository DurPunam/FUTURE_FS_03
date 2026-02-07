# Implementation Plan: Bihar Bhojan Restaurant Website

## Overview

This implementation plan breaks down the Bihar Bhojan restaurant website into incremental coding tasks. The approach follows a bottom-up strategy: starting with foundational infrastructure (database, types, utilities), then building core features (menu, cart, booking), followed by UI pages, and finally PWA and admin features. Each task builds on previous work, ensuring no orphaned code.

## Tasks

- [x] 1. Project setup and foundational infrastructure
  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure Tailwind CSS with custom color palette (Terracotta, Turmeric, Leaf Green, Dark, Light)
  - Set up Prisma with SQLite database
  - Configure next-intl for English/Hindi internationalization
  - Create translation files (messages/en.json, messages/hi.json)
  - Set up Vitest and React Testing Library
  - Install dependencies: Framer Motion, React Hook Form, Zod, fast-check
  - _Requirements: 1.5, 12.2, 12.4_

- [ ] 2. Database schema and data models
  - [x] 2.1 Create Prisma schema for Booking model
    - Define Booking model with all fields (name, email, phone, date, time, partySize, status, etc.)
    - Run Prisma migration to create SQLite database
    - _Requirements: 2.1_

  - [ ]* 2.2 Write property test for booking data persistence
    - **Property 3: Booking Storage and Retrieval**
    - **Validates: Requirements 2.1**

  - [x] 2.3 Create TypeScript interfaces for all data models
    - Define MenuItem, Cart, CartItem, Booking, RestaurantInfo, CulturalEvent, Testimonial interfaces
    - Create types file (lib/types.ts)
    - _Requirements: 4.1, 14.1, 2.1_

  - [x] 2.4 Create menu.json file with sample Bihari dishes
    - Add dishes across all categories (Thali, Ghar Ka Khana, Street Delights, Mithai, Sattu Specials)
    - Include English and Hindi names/descriptions
    - Add dietary flags, spice levels, prices
    - _Requirements: 4.1, 4.3_

- [ ] 3. Validation and utility functions
  - [x] 3.1 Create Zod schemas for form validation
    - BookingFormSchema (name, email, phone, date, time, partySize)
    - ContactFormSchema (name, email, phone, message)
    - AdminLoginSchema (password)
    - MenuItemSchema (for admin editing)
    - _Requirements: 13.1, 13.3, 13.4_

  - [ ]* 3.2 Write property tests for validation schemas
    - **Property 5: Booking Validation Rejection**
    - **Property 25: Contact Form Validation**
    - **Validates: Requirements 2.3, 2.4, 2.5, 10.5**

  - [x] 3.3 Create utility functions
    - formatCurrency (INR formatting)
    - formatDate (locale-aware date formatting)
    - calculateCartTotal (subtotal, tax, total)
    - generateWhatsAppMessage (cart to formatted message)
    - validateIndianPhone (10-digit validation)
    - _Requirements: 14.4, 3.2, 13.4_

  - [ ]* 3.4 Write property tests for utility functions
    - **Property 30: Cart Total Calculation**
    - **Property 8: WhatsApp Message Generation**
    - **Validates: Requirements 14.4, 3.2, 3.4**

- [ ] 4. Server Actions implementation
  - [x] 4.1 Implement booking server actions
    - createBooking: validate, store in DB, send email
    - getBookings: fetch all bookings (admin only)
    - updateBookingStatus: update status (admin only)
    - _Requirements: 2.1, 2.2, 6.3, 6.6_

  - [ ]* 4.2 Write property tests for booking actions
    - **Property 3: Booking Storage and Retrieval**
    - **Property 4: Booking Email Notification**
    - **Property 6: Booking Confirmation Response**
    - **Property 20: Booking Status Update**
    - **Validates: Requirements 2.1, 2.2, 2.6, 6.6**

  - [x] 4.3 Implement menu server actions
    - getMenuItems: read from menu.json
    - updateMenuItems: validate and write to menu.json (admin only)
    - _Requirements: 4.6, 6.2_

  - [ ]* 4.4 Write property tests for menu actions
    - **Property 17: Admin Menu Editing**
    - **Property 19: Menu JSON Validation**
    - **Validates: Requirements 6.2, 6.4**

  - [x] 4.5 Implement contact server action
    - sendContactMessage: validate and send email
    - _Requirements: 10.1_

  - [ ]* 4.6 Write property test for contact action
    - **Property 24: Contact Form Email Sending**
    - **Validates: Requirements 10.1**

  - [x] 4.7 Implement admin authentication actions
    - authenticateAdmin: verify password, create session
    - verifyAdminSession: check session validity
    - Use environment variable for admin password
    - _Requirements: 6.1_

  - [ ]* 4.8 Write property test for admin authentication
    - **Property 16: Admin Authentication Requirement**
    - **Validates: Requirements 6.1**

- [ ] 5. Email service integration
  - [x] 5.1 Set up free email service (Resend or FormSubmit)
    - Configure email service with API key (free tier)
    - Create email templates for booking confirmation and contact messages
    - Implement sendEmail utility function
    - _Requirements: 2.2, 10.1, 12.3_

  - [ ]* 5.2 Write unit tests for email sending
    - Test email formatting
    - Test error handling
    - Use mocks for email service
    - _Requirements: 2.2, 10.1_

- [ ] 6. Cart management (client-side)
  - [x] 6.1 Create cart context and hooks
    - CartContext with React Context API
    - useCart hook for cart operations
    - addToCart, removeFromCart, updateQuantity, clearCart functions
    - Session storage persistence
    - _Requirements: 3.1, 14.1, 14.2, 14.5, 14.6_

  - [ ]* 6.2 Write property tests for cart operations
    - **Property 7: Cart State Maintenance**
    - **Property 30: Cart Total Calculation**
    - **Property 31: Cart Item Count Display**
    - **Property 32: Cart Persistence Round Trip**
    - **Property 33: Cart Quantity Adjustment**
    - **Validates: Requirements 3.1, 14.1, 14.2, 14.3, 14.4, 14.5, 14.6**

- [ ] 7. Layout components
  - [x] 7.1 Create Navbar component
    - Glassmorphism effect with backdrop blur
    - Language toggle (EN/HI)
    - Cart item count badge
    - Mobile: hamburger menu, Desktop: horizontal links
    - Sticky positioning
    - _Requirements: 1.1, 14.3, 9.4, 9.5, 11.6_

  - [ ]* 7.2 Write unit tests for Navbar
    - Test language toggle functionality
    - Test cart count display
    - Test responsive menu rendering
    - _Requirements: 1.1, 14.3, 9.4, 9.5_

  - [x] 7.3 Create Footer component
    - Restaurant info, social links, operating hours
    - Madhubani art-inspired dividers
    - Responsive layout
    - _Requirements: 10.6, 11.4_

  - [x] 7.4 Create LanguageToggle component
    - Switch between EN and HI
    - Persist preference in localStorage
    - Update next-intl locale
    - _Requirements: 1.1, 1.4_

  - [ ]* 7.5 Write property test for language persistence
    - **Property 2: Language Preference Persistence**
    - **Validates: Requirements 1.4**

  - [x] 7.6 Create root layout with internationalization
    - Set up [locale] dynamic route
    - Configure fonts (Poppins, Inter, Noto Sans Devanagari)
    - Include Navbar and Footer
    - Add metadata for SEO
    - _Requirements: 1.2, 1.3, 11.2, 11.3, 8.4, 8.5_

- [ ] 8. Menu feature components
  - [x] 8.1 Create MenuItemCard component
    - Display image, name, description, price
    - Show dietary indicator (veg/non-veg icon)
    - Show spice level indicator
    - Add to cart button
    - Hover animations with Framer Motion
    - Lazy load images with Next.js Image
    - _Requirements: 4.5, 4.3, 7.4_

  - [ ]* 8.2 Write property test for menu item rendering
    - **Property 13: Complete Menu Item Rendering**
    - **Validates: Requirements 4.3, 4.5**

  - [x] 8.3 Create CategoryFilter component
    - Buttons for each category
    - Active state styling
    - Filter menu items by category
    - _Requirements: 4.1_

  - [x] 8.4 Create DietaryFilter component
    - Toggle for veg/non-veg/all
    - Filter menu items by dietary preference
    - _Requirements: 4.2_

  - [ ]* 8.5 Write property test for dietary filtering
    - **Property 11: Dietary Filter Application**
    - **Validates: Requirements 4.2**

  - [x] 8.6 Create SearchBar component
    - Real-time search input
    - Filter menu items by name
    - Clear button
    - _Requirements: 4.4_

  - [ ]* 8.7 Write property test for menu search
    - **Property 12: Menu Search Filtering**
    - **Validates: Requirements 4.4**

- [ ] 9. Cart feature components
  - [x] 9.1 Create Cart component
    - Display cart items with quantities
    - Show subtotal, tax, total
    - Empty cart state
    - Slide-in animation
    - _Requirements: 14.4, 14.7_

  - [x] 9.2 Create CartItem component
    - Display item name, price, quantity
    - Quantity adjustment buttons (+/-)
    - Remove item button
    - _Requirements: 14.6, 14.2_

  - [-] 9.3 Create WhatsAppOrderButton component
    - Generate formatted WhatsApp message
    - Open WhatsApp with pre-filled message
    - Disabled when cart is empty
    - Include customer info form (name, phone, address)
    - _Requirements: 3.2, 3.3, 3.4, 3.6_

  - [ ]* 9.4 Write property tests for WhatsApp ordering
    - **Property 8: WhatsApp Message Generation**
    - **Property 9: WhatsApp URL Generation**
    - **Validates: Requirements 3.2, 3.3, 3.4**

- [ ] 10. Booking feature components
  - [ ] 10.1 Create BookingForm component
    - Form fields: name, email, phone, date, time, partySize, specialRequests
    - React Hook Form with Zod validation
    - Date picker (no past dates)
    - Party size selector (1-20)
    - Submit to createBooking server action
    - Success/error message display
    - Loading state during submission
    - _Requirements: 2.1, 2.3, 2.4, 2.5, 13.2, 13.5, 13.6, 13.7_

  - [ ]* 10.2 Write property tests for booking form
    - **Property 5: Booking Validation Rejection**
    - **Property 26: Form Validation Error Display**
    - **Property 27: Form Success Feedback**
    - **Property 29: Form Submit Button Disabling**
    - **Validates: Requirements 2.3, 2.4, 2.5, 13.2, 13.5, 13.7**

  - [ ]* 10.3 Write unit tests for booking form
    - Test form submission with valid data
    - Test validation error display
    - Test date picker restrictions
    - _Requirements: 2.3, 2.4, 2.5_

- [ ] 11. Checkpoint - Core features complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Homepage implementation
  - [ ] 12.1 Create Hero component
    - Large hero image with overlay
    - Restaurant tagline in EN/HI
    - CTA button for table booking
    - Smooth scroll animation
    - _Requirements: 17.1, 17.5_

  - [ ] 12.2 Create FeaturedDishes component
    - Display featured menu items
    - Carousel with Framer Motion
    - Add to cart functionality
    - _Requirements: 17.2_

  - [ ]* 12.3 Write property test for featured dishes display
    - **Property 34: Featured Content Display**
    - **Validates: Requirements 17.2**

  - [ ] 12.4 Create Testimonials component
    - Display customer testimonials
    - Show ratings (star icons)
    - Carousel or grid layout
    - _Requirements: 17.4_

  - [ ]* 12.5 Write property test for testimonials display
    - **Property 36: Testimonials Display**
    - **Validates: Requirements 17.4**

  - [ ] 12.6 Create LocationPreview component
    - Embed Google Maps
    - Display address and hours
    - Click-to-call button
    - WhatsApp contact button
    - _Requirements: 10.2, 10.3, 10.4, 10.6, 17.6_

  - [ ] 12.7 Create CulturalEvents component
    - Display upcoming events
    - Event cards with images
    - Date and time display
    - _Requirements: 17.3_

  - [ ]* 12.8 Write property test for events display
    - **Property 35: Upcoming Events Display**
    - **Validates: Requirements 17.3**

  - [ ] 12.9 Assemble homepage
    - Combine all homepage components
    - Add scroll animations
    - Implement SEO metadata
    - _Requirements: 17.1, 8.4, 8.5_

- [ ] 13. Menu page implementation
  - [ ] 13.1 Create menu page layout
    - Category navigation sidebar
    - Search bar at top
    - Dietary filter controls
    - Grid of menu item cards
    - Responsive layout (mobile: single column, desktop: 3 columns)
    - _Requirements: 4.1, 4.2, 4.4, 9.1, 9.2, 9.3_

  - [ ] 13.2 Implement menu filtering logic
    - Combine category, dietary, and search filters
    - Update displayed items reactively
    - Show "no results" message when applicable
    - _Requirements: 4.2, 4.4_

  - [ ]* 13.3 Write property test for menu organization
    - **Property 10: Menu Category Organization**
    - **Validates: Requirements 4.1**

  - [ ] 13.4 Add cart sidebar to menu page
    - Floating cart button (mobile)
    - Slide-in cart panel
    - Persistent across page navigation
    - _Requirements: 14.7_

- [ ] 14. Experience page implementation
  - [ ] 14.1 Create experience page
    - Traditional seating section with images
    - Cultural evening events section
    - Cooking workshops section
    - Image gallery with lightbox
    - Contact form for event interest
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [ ]* 14.2 Write unit tests for experience page
    - Test content rendering
    - Test image gallery functionality
    - _Requirements: 15.1, 15.2, 15.3_

- [ ] 15. About page implementation
  - [ ] 15.1 Create about page
    - Owner story section with photo
    - Heritage narrative with cultural imagery
    - Farm-to-table concept explanation
    - Timeline or visual storytelling
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

  - [ ]* 15.2 Write unit tests for about page
    - Test content rendering
    - Test responsive layout
    - _Requirements: 16.1, 16.2, 16.3_

- [ ] 16. Contact page implementation
  - [ ] 16.1 Create ContactForm component
    - Form fields: name, email, phone, message
    - React Hook Form with Zod validation
    - Submit to sendContactMessage server action
    - Success/error message display
    - _Requirements: 10.1, 10.5, 13.2, 13.5, 13.6_

  - [ ]* 16.2 Write property tests for contact form
    - **Property 25: Contact Form Validation**
    - **Property 26: Form Validation Error Display**
    - **Property 28: Form Error Feedback**
    - **Validates: Requirements 10.5, 13.2, 13.6**

  - [ ] 16.3 Create contact page layout
    - Contact form on left
    - Google Maps embed on right
    - Restaurant info (address, phone, hours)
    - Click-to-call and WhatsApp buttons
    - Responsive layout (mobile: stacked)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

- [ ] 17. SEO and metadata implementation
  - [ ] 17.1 Add Schema.org structured data
    - Restaurant schema with name, address, phone, hours
    - Menu schema for dishes
    - LocalBusiness schema
    - Add to layout and page components
    - _Requirements: 8.1, 8.6_

  - [ ] 17.2 Generate sitemap.xml
    - Include all pages (home, menu, experience, about, contact)
    - Use Next.js sitemap generation
    - _Requirements: 8.2_

  - [ ] 17.3 Create robots.txt
    - Allow all crawlers
    - Reference sitemap
    - _Requirements: 8.3_

  - [ ]* 17.4 Write unit tests for SEO elements
    - Test schema markup presence
    - Test meta tags on all pages
    - Test sitemap generation
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ]* 17.5 Write property test for meta tags
    - **Property 21: SEO Meta Tags Presence**
    - **Validates: Requirements 8.4, 8.5**

- [ ] 18. Checkpoint - Public pages complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 19. Admin authentication and layout
  - [ ] 19.1 Create AdminLogin component
    - Password input field
    - Submit to authenticateAdmin server action
    - Store session token in cookie
    - Redirect to dashboard on success
    - _Requirements: 6.1_

  - [ ] 19.2 Create admin layout with authentication check
    - Verify session on admin routes
    - Redirect to login if not authenticated
    - Admin navigation menu
    - Logout functionality
    - _Requirements: 6.1_

  - [ ]* 19.3 Write unit tests for admin authentication
    - Test login flow
    - Test session verification
    - Test redirect behavior
    - _Requirements: 6.1_

- [ ] 20. Admin dashboard implementation
  - [ ] 20.1 Create BookingsList component
    - Table view of all bookings
    - Columns: name, date, time, party size, status
    - Filter by date and status
    - Update status buttons (confirm/cancel)
    - Pagination for large datasets
    - _Requirements: 6.3, 6.6_

  - [ ]* 20.2 Write property tests for admin bookings
    - **Property 18: Admin Bookings Display**
    - **Property 20: Booking Status Update**
    - **Validates: Requirements 6.3, 6.6**

  - [ ] 20.3 Create admin dashboard page
    - Display bookings list
    - Show summary statistics (total bookings, pending, confirmed)
    - Link to menu editor
    - _Requirements: 6.3_

- [ ] 21. Admin menu editor implementation
  - [ ] 21.1 Create MenuEditor component
    - Display current menu items in editable table
    - Add new item form
    - Edit existing item inline
    - Delete item button
    - Image upload to /public/images/dishes/
    - Validate before save
    - Submit to updateMenuItems server action
    - _Requirements: 6.2, 6.4_

  - [ ]* 21.2 Write property tests for menu editor
    - **Property 17: Admin Menu Editing**
    - **Property 19: Menu JSON Validation**
    - **Validates: Requirements 6.2, 6.4**

  - [ ]* 21.3 Write unit tests for menu editor
    - Test add/edit/delete operations
    - Test validation error display
    - Test image upload
    - _Requirements: 6.2, 6.4_

  - [ ] 21.4 Create menu editor page
    - Include MenuEditor component
    - Add save confirmation dialog
    - Show success/error messages
    - _Requirements: 6.2_

- [ ] 22. PWA implementation
  - [ ] 22.1 Create web app manifest
    - Define app name, icons, theme colors
    - Set display mode to standalone
    - Add to public directory
    - Link in root layout
    - _Requirements: 5.1_

  - [ ] 22.2 Implement service worker
    - Cache menu page and static assets
    - Implement offline fallback
    - Cache-first strategy for images
    - Network-first strategy for API calls
    - _Requirements: 5.2, 5.3_

  - [ ]* 22.3 Write property tests for offline functionality
    - **Property 14: Offline Menu Access**
    - **Property 15: Offline Feature Disabling**
    - **Validates: Requirements 5.3, 5.4**

  - [ ] 22.4 Add offline indicator to UI
    - Detect online/offline status
    - Show banner when offline
    - Disable network-dependent features
    - _Requirements: 5.4_

  - [ ]* 22.5 Write unit tests for PWA features
    - Test manifest validity
    - Test service worker registration
    - Test offline detection
    - _Requirements: 5.1, 5.2, 5.4_

- [ ] 23. Accessibility implementation
  - [ ] 23.1 Add alt text to all images
    - Update all Image components with descriptive alt text
    - Use empty alt for decorative images
    - _Requirements: 18.1_

  - [ ]* 23.2 Write property test for image alt text
    - **Property 37: Image Alt Text Presence**
    - **Validates: Requirements 18.1**

  - [ ] 23.3 Implement keyboard navigation
    - Ensure all interactive elements are focusable
    - Add keyboard event handlers (Enter, Space)
    - Implement focus trap in modals
    - Add skip-to-content link
    - _Requirements: 18.3_

  - [ ]* 23.4 Write property test for keyboard navigation
    - **Property 38: Keyboard Navigation Support**
    - **Validates: Requirements 18.3**

  - [ ] 23.5 Add ARIA labels and roles
    - Add aria-label to icon buttons
    - Add role attributes to custom components
    - Add aria-live regions for dynamic content
    - _Requirements: 18.5_

  - [ ]* 23.6 Write property test for ARIA labels
    - **Property 39: ARIA Labels Presence**
    - **Validates: Requirements 18.5**

- [ ] 24. Error handling and resilience
  - [ ] 24.1 Implement error boundaries
    - Create ErrorBoundary component
    - Wrap page components
    - Display user-friendly error messages
    - Log errors for debugging
    - _Requirements: 19.1, 19.5_

  - [ ]* 24.2 Write property test for error messages
    - **Property 40: Error Message User-Friendliness**
    - **Validates: Requirements 19.1, 19.4, 19.5**

  - [ ] 24.3 Add form input preservation on error
    - Preserve form values on submission failure
    - Re-populate form fields after error
    - _Requirements: 19.2_

  - [ ]* 24.4 Write property test for input preservation
    - **Property 41: Form Input Preservation on Error**
    - **Validates: Requirements 19.2**

  - [ ] 24.5 Implement image fallback handling
    - Add onError handler to Image components
    - Display placeholder on load failure
    - _Requirements: 19.3_

  - [ ]* 24.6 Write property test for image fallback
    - **Property 42: Image Load Failure Handling**
    - **Validates: Requirements 19.3**

  - [ ] 24.7 Add content load fallback
    - Implement loading skeletons
    - Show fallback content on fetch failure
    - Add retry mechanisms
    - _Requirements: 19.6_

  - [ ]* 24.8 Write property test for content fallback
    - **Property 43: Content Load Fallback**
    - **Validates: Requirements 19.6**

- [ ] 25. Responsive design refinement
  - [ ] 25.1 Test and refine mobile layouts
    - Test all pages at 320px, 375px, 414px widths
    - Adjust spacing, font sizes, touch targets
    - Ensure no horizontal scroll
    - _Requirements: 9.1, 9.6_

  - [ ]* 25.2 Write property test for responsive rendering
    - **Property 22: Responsive Layout Rendering**
    - **Validates: Requirements 9.1, 9.2, 9.3**

  - [ ]* 25.3 Write property test for touch targets
    - **Property 23: Touch Target Sizing**
    - **Validates: Requirements 9.6**

  - [ ] 25.4 Test and refine tablet layouts
    - Test all pages at 768px, 834px, 1024px widths
    - Optimize grid layouts for tablet
    - _Requirements: 9.2_

  - [ ] 25.5 Test and refine desktop layouts
    - Test all pages at 1280px, 1440px, 1920px widths
    - Ensure proper max-width constraints
    - Optimize whitespace and typography
    - _Requirements: 9.3_

- [ ] 26. Performance optimization
  - [ ] 26.1 Optimize images
    - Convert images to WebP format
    - Generate multiple sizes for responsive images
    - Implement lazy loading for below-fold images
    - _Requirements: 7.3, 7.4_

  - [ ] 26.2 Implement code splitting
    - Use dynamic imports for heavy components
    - Split admin routes into separate bundle
    - Lazy load Framer Motion animations
    - _Requirements: 7.5_

  - [ ] 26.3 Optimize fonts
    - Use font-display: swap
    - Preload critical fonts
    - Subset fonts to required characters
    - _Requirements: 7.6_

  - [ ]* 26.4 Run Lighthouse audit
    - Test performance, accessibility, SEO scores
    - Ensure all scores > 90
    - Fix any identified issues
    - _Requirements: 7.2_

- [ ] 27. Analytics integration
  - [ ] 27.1 Set up Google Analytics (free tier)
    - Add GA4 tracking code
    - Configure page view tracking
    - Set up event tracking (bookings, orders, clicks)
    - _Requirements: 20.1, 20.2_

  - [ ]* 27.2 Write unit tests for analytics
    - Test event tracking calls
    - Use mocks for GA
    - _Requirements: 20.2_

- [ ] 28. Final integration and testing
  - [ ] 28.1 Write E2E tests for critical flows
    - Test booking flow (form fill, submit, confirmation)
    - Test ordering flow (add to cart, WhatsApp order)
    - Test menu browsing (filter, search, view details)
    - Test admin flow (login, view bookings, edit menu)
    - _Requirements: 2.1, 3.1, 4.1, 6.1_

  - [ ] 28.2 Cross-browser testing
    - Test on Chrome, Firefox, Safari, Edge
    - Test on iOS Safari and Android Chrome
    - Fix any browser-specific issues
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 28.3 Test language switching
    - Verify all content translates correctly
    - Test language persistence
    - Check Hindi font rendering
    - _Requirements: 1.2, 1.3, 1.4_

  - [ ]* 28.4 Run full property test suite
    - Execute all 43 property tests
    - Ensure 100+ iterations per test
    - Fix any failures
    - _Requirements: All_

- [ ] 29. Deployment preparation
  - [ ] 29.1 Set up environment variables
    - ADMIN_PASSWORD
    - EMAIL_API_KEY (Resend/FormSubmit)
    - NEXT_PUBLIC_RESTAURANT_PHONE
    - NEXT_PUBLIC_RESTAURANT_WHATSAPP
    - NEXT_PUBLIC_GA_ID (Google Analytics)
    - _Requirements: 6.1, 2.2, 10.1_

  - [ ] 29.2 Configure deployment platform
    - Set up Vercel/Netlify/Cloudflare Pages project
    - Configure build settings
    - Set environment variables
    - Configure custom domain (if applicable)
    - _Requirements: 12.4_

  - [ ] 29.3 Create deployment documentation
    - Document environment variables
    - Document deployment process
    - Document admin access instructions
    - Create README with project overview
    - _Requirements: 12.4_

- [ ] 30. Final checkpoint - Complete system
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at major milestones
- Property tests validate universal correctness properties (100+ iterations each)
- Unit tests validate specific examples and edge cases
- E2E tests validate complete user flows
- All code uses TypeScript for type safety
- All components follow Next.js 14 App Router patterns
- All styling uses Tailwind CSS with custom theme
- All forms use React Hook Form with Zod validation
- All animations use Framer Motion
- All internationalization uses next-intl
- Database operations use Prisma with SQLite
- No paid services are used anywhere in the stack

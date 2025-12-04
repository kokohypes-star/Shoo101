# SHOOBU - Advanced Tech E-commerce Storefront

## Overview
SHOOBU is a fully-functional tech e-commerce storefront with responsive design, user account management, shopping cart functionality, and mobile-optimized navigation. The storefront features product categories including Audio, Wearables, Cables, Accessories, and Chargers, with a focus on premium tech products at competitive prices.

## Current State
The application is a fully developed React/TypeScript frontend with Express backend, featuring a complete e-commerce experience with shopping cart, user authentication, and product browsing.

### Project Structure
```
client/
├── src/
│   ├── pages/
│   │   ├── storefront-pages/
│   │   │   ├── Header.tsx        # Main header with search, cart, navigation
│   │   │   ├── Home.tsx          # Homepage with hero, categories, products
│   │   │   ├── Account.tsx       # User account with profile management
│   │   │   ├── ProductList.tsx   # Product listing page
│   │   │   └── ...
│   │   └── Storefront.tsx        # Main storefront layout
│   ├── components/ui/            # Shadcn UI components
│   ├── lib/                      # Utility functions and query client
│   └── hooks/                    # Custom React hooks
server/
├── index.ts                      # Express server entry point
├── routes.ts                     # API routes
├── storage.ts                    # In-memory storage
└── vite.ts                       # Vite dev server integration
shared/
└── schema.ts                     # Data models and types
```

## Project Architecture
- **Frontend**: React with TypeScript, Vite, TailwindCSS, Shadcn UI
- **Backend**: Express.js server on port 5000
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side navigation
- **Styling**: TailwindCSS with custom design system
- **Technology Stack**: Node.js 20, TypeScript, React

## Key Features
- Responsive header (65px mobile / 108px desktop)
- Animated gradient SHOOBU logo (40px mobile / 80px desktop)
- Wide search bar (70% width on desktop)
- Mobile dropdown search with slide animation
- Shopping cart with item count and preview
- User authentication with profile management
- Product categories with hover effects
- Hero carousel with promotional banners
- Features section (Express Shipping, Secure Payment, Easy Returns)

## Setup Instructions
1. Dependencies are already installed via npm
2. Run `npm run dev` to start the development server
3. Server runs on port 5000 with host 0.0.0.0

## Deployment
- Configured for autoscale deployment
- Build command: `npm run build`
- Run command: Production server configuration

## Recent Changes
- December 04, 2025: Enhanced header styling with mobile/desktop responsive sizing
- December 04, 2025: Added mobile dropdown search with slide animation
- December 04, 2025: Upgraded Account page with profile picture upload and edit functionality
- December 04, 2025: Fixed mobile navigation with proper wouter Link routing
- December 04, 2025: Improved Premium Tech section button styling
- December 04, 2025: Features section displays horizontally on mobile

## User Preferences
- Use wouter Link component for all navigation (proper client-side routing)
- Mobile search slides down below header instead of navigating to new page
- Features section must be horizontal on mobile
- Account page includes profile picture upload and editable personal details
- Profile data persists in localStorage

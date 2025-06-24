# Replit.md - JuiceCraft Store

## Overview

JuiceCraft is a modern e-commerce web application for premium artisan juices, built with a full-stack TypeScript architecture. The project combines a React frontend with shadcn/ui components and an Express.js backend, using Drizzle ORM with PostgreSQL for data persistence. The application features a clean, Airbnb-inspired design with robust e-commerce functionality similar to Amazon's shopping experience.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with custom design tokens

### Backend Architecture
- **Express.js** with TypeScript for the REST API server
- **Node.js 20** runtime environment
- **Session-based storage** for cart persistence using session IDs
- **Middleware** for request logging, JSON parsing, and error handling

### Database Architecture
- **PostgreSQL 16** as the primary database
- **Drizzle ORM** for type-safe database operations
- **Drizzle Kit** for schema migrations and database management
- **Neon Database** integration for serverless PostgreSQL hosting

## Key Components

### Database Schema
- **Products Table**: Stores juice product information (name, description, image, ingredients, category)
- **Cart Items Table**: Manages shopping cart state with session-based persistence
- **Users Table**: Handles user authentication (username, hashed password)

### API Endpoints
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Get single product details
- `GET /api/cart/:sessionId` - Fetch cart items for session
- `POST /api/cart` - Add items to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item

### UI Components
- **BentoGrid**: Desktop masonry layout for product display
- **MobileCarousel**: Touch-friendly mobile product browsing
- **ProductCard**: Reusable product display component with add-to-cart functionality
- **Header**: Navigation with cart counter and logo branding

## Data Flow

1. **Product Display**: Client fetches products from `/api/products` and renders in responsive layouts
2. **Cart Management**: Session-based cart storage with localStorage session ID generation
3. **Shopping Flow**: Add to cart → Update quantities → Persistent storage across sessions
4. **State Management**: TanStack Query handles API caching and optimistic updates

## External Dependencies

### UI & Styling
- Radix UI primitives for accessible component foundations
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Google Fonts (Inter) for typography

### Development Tools
- TypeScript for type safety across the stack
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

### Database & ORM
- Drizzle ORM with Zod schema validation
- PostgreSQL with Neon serverless integration
- Connection pooling and query optimization

## Deployment Strategy

### Development Environment
- **Replit** hosting with Node.js 20 and PostgreSQL 16 modules
- **Vite dev server** with HMR for frontend development
- **tsx** for TypeScript execution in development
- **Port 5000** for the Express server

### Production Build
- **Vite build** for optimized client-side assets
- **ESBuild** for server-side bundle creation
- **Autoscale deployment** target on Replit
- Static asset serving from Express server

### Database Management
- **Drizzle migrations** stored in `/migrations` directory
- **Environment variables** for secure database connection
- **Schema synchronization** with `drizzle-kit push` command

## Deployment Configuration

### AWS Amplify Setup
- ✓ Created `amplify.yml` build configuration
- ✓ Added `_redirects` file for SPA routing
- ✓ Configured environment variable support (`VITE_API_URL`)
- ✓ Set up frontend build optimization with code splitting
- ✓ Created comprehensive deployment guide (`README-AMPLIFY.md`)

### Production Considerations
- Backend requires separate deployment (Vercel, Heroku, AWS Lambda)
- Database needs external hosting (AWS RDS, Neon.tech)
- Environment variables must be configured in both frontend and backend
- Session-based cart storage requires persistent backend service

## Changelog

- June 24, 2025: Added cart functionality with red badge counter and slide-out menu
- June 24, 2025: Implemented slower fade transitions for mobile carousel (6s intervals)
- June 24, 2025: Fixed product display issues for AWS deployment with fallback catalog
- June 24, 2025: AWS Amplify deployment configuration completed
- June 24, 2025: Fixed nodemailer and server startup issues
- June 24, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
Site purpose: Product catalog/display only - no payment processing or e-commerce functionality needed.
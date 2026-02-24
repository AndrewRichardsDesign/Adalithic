# Adalithic - Software Startup Website

## Overview

This is a full-stack website for Adalithic, a software startup introducing Arcatext, an AI-powered language practice app. The website is built with React (frontend) and Express.js (backend), featuring a modern tech stack including TypeScript, Tailwind CSS, and shadcn/ui components. The system showcases the Arcatext product and provides contact functionality for potential users and partners.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Management**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: RESTful API endpoints
- **Session Management**: Built-in session handling
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Database Schema
The application uses two main database tables:
- **Projects**: Stores information about Arcatext with title, description, body content, and support details
- **Contact Submissions**: Form submissions from potential users and partners

### API Endpoints
- `GET /api/projects` - Fetch Arcatext project information
- `POST /api/contact` - Submit contact form

### UI Components
- **Hero Section**: Large introduction text about Adalithic and Arcatext
- **Products Section**: Detailed information about Arcatext with support email and privacy policy links
- **About Section**: Information about Adalithic startup and Arcatext features
- **Contact Form**: Simple contact form for inquiries
- **Navigation**: Top navigation bar with Products, About, Contact links
- **Privacy Policy**: Dedicated page for privacy policy

## Data Flow

1. **Client Request**: React components use React Query to fetch data from API endpoints
2. **API Processing**: Express.js routes handle requests and interact with the database
3. **Database Operations**: Drizzle ORM manages PostgreSQL operations
4. **Response Handling**: Data is returned to frontend components and cached by React Query
5. **UI Updates**: Components re-render with fresh data automatically

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Form Validation**: Zod schema validation
- **State Management**: TanStack React Query
- **Date Handling**: date-fns utility library
- **Icons**: Lucide React icons

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for request validation

## Deployment Strategy

### Development
- Frontend: Vite dev server with hot module replacement
- Backend: Express server with TypeScript compilation via tsx
- Database: Drizzle migrations with `db:push` command

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Database: Environment variable `DATABASE_URL` for PostgreSQL connection

### Environment Configuration
- Development: Local development with Vite middleware
- Production: Serves built frontend assets from Express server
- Database: Uses PostgreSQL connection string from environment

## Changelog
- July 07, 2025: Initial UX designer portfolio setup
- July 07, 2025: Transformed into Adalithic startup website featuring Arcatext AI-powered language practice app
  - Updated hero section with large startup introduction text
  - Simplified navigation to Products, About, Contact
  - Created single product showcase for Arcatext
  - Added support email link and privacy policy page
  - Updated about section to focus on startup mission and AI technology
  - Simplified contact form removing budget field
  - Updated branding throughout from Alex Thompson to Adalithic

## User Preferences

Preferred communication style: Simple, everyday language.
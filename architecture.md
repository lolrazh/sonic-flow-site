# Sonic Flow Site Architecture

This document provides a comprehensive overview of the codebase structure, explaining each file and folder's purpose and how they fit into the overall system.

## Project Overview

Sonic Flow Site is a Next.js application that uses a modern tech stack including:

- **Next.js 15**: React framework for building web applications
- **TypeScript**: For type safety across the codebase
- **tRPC**: End-to-end typesafe APIs
- **Supabase**: Backend as a service platform for authentication and database
- **TailwindCSS**: Utility-first CSS framework
- **React Query**: Data fetching and state management
- **Geist Font**: Typography system

## Directory Structure

### Root Directory

- `.git/`: Git version control system folder
- `.next/`: Next.js build output
- `node_modules/`: External dependencies
- `public/`: Static assets served by Next.js
- `src/`: Source code (main application code)
- `supabase/`: Supabase configuration files

### Configuration Files

- `next.config.js`: Next.js configuration
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.ts`: TailwindCSS configuration
- `postcss.config.js`: PostCSS configuration
- `prettier.config.js`: Code formatting rules
- `.eslintrc.cjs`: ESLint configuration
- `.env.local` & `.env.example`: Environment variables
- `components.json`: Configuration for UI components
- `site-prd.md` & `product-prd.md`: Product requirements documentation

### src/ Directory

The main application code is organized in the `src/` directory with the following structure:

#### app/

The Next.js App Router implementation, containing:

- `layout.tsx`: Root layout that wraps all pages with HTML structure, Geist font, and ClientWrapper
- `page.tsx`: Homepage component
- `login/`: Login page implementation
  - `page.tsx`: Client component that implements Supabase Auth UI for authentication
- `dashboard/`: Dashboard page implementation
  - `layout.tsx`: Auth-protected layout that checks for valid sessions
  - `page.tsx`: Main dashboard page content
  - `components/`: Dashboard-specific components
- `(components)/`: Route component organization structure (grouped route components)
- `_components/`: Private components for app directory (not part of the routing)
- `api/`: API routes including tRPC implementation

#### components/

Reusable React components:

- `ui/`: UI components library
  - `LoadingSpinner.tsx`: Loading indicator with full-screen option
  - `SiteName.tsx`: Site branding component
  - `index.ts`: Export barrel file for UI components
- `magicui/`: Advanced UI components with animations
- `ClientWrapper.tsx`: Client-side wrapper that provides tRPC provider and hydration handling
- `ClientOnly.tsx`: Component that only renders on the client side after hydration

#### lib/

Utility functions and shared code:

- `auth.ts`: Authentication utilities using Supabase, including:
  - `getSession()`: Retrieves the current user session
  - `signOut()`: Handles user logout
  - `getRedirectUrl()`: Generates redirect URLs for auth flows
  - `onAuthStateChange()`: Subscription for auth state changes
- `hooks/`: Custom React hooks
- `utils.ts`: General utility functions

#### trpc/

tRPC implementation:

- `server.ts`: Server-side tRPC setup with:
  - Context creation for Server Components
  - Direct procedure calls without HTTP for RSC
  - SuperJSON transformation
- `react.tsx`: React integration for tRPC with:
  - Client-side tRPC provider
  - QueryClient configuration
  - Type inference helpers
- `query-client.ts`: Query client configuration

#### server/

Server-side code:

- `api/`: Server API implementations, including tRPC routers and procedures

#### types/

TypeScript type definitions for the application

#### styles/

Global CSS and style definitions including TailwindCSS imports

#### pages/

Legacy Pages Router components (if any)

#### env.js

Environment variable validation and typing using @t3-oss/env-nextjs

### supabase/

Supabase configuration and setup:

- `config.toml`: Supabase configuration for local development
- `.temp/`: Temporary files for local development

## Application Flow

### Initialization and Rendering

1. The application entry point is `src/app/layout.tsx` which:
   - Sets up the base HTML structure
   - Applies the Geist font
   - Defines metadata (title, description)
   - Wraps the application with `ClientWrapper`

2. The `ClientWrapper` component:
   - Handles client-side hydration with a mounted state check
   - Prevents content flash by returning null during server-side rendering
   - Wraps the application with `TRPCReactProvider` once mounted

3. The `TRPCReactProvider` in `src/trpc/react.tsx`:
   - Creates and manages the React Query client
   - Sets up the tRPC client with HTTP batch link
   - Provides error handling to prevent app crashes

### Authentication Flow

1. Authentication is handled via Supabase Auth as configured in `src/lib/auth.ts`:
   - Supabase client is initialized with environment variables
   - Helper functions manage session retrieval, sign-out, and redirects
   - Auth state changes are tracked through subscription

2. Login flow implementation in `src/app/login/page.tsx`:
   - Uses Supabase Auth UI for a pre-built authentication experience
   - Supports sign in and sign up modes (toggleable via URL parameter)
   - Includes Google OAuth provider integration
   - Handles auth state changes with a subscription
   - Redirects to dashboard on successful authentication

3. Protected routes in `src/app/dashboard/layout.tsx`:
   - Checks for valid session on mount and redirects to login if none exists
   - Subscribes to auth state changes to handle sign-outs
   - Shows loading spinner during authentication checks
   - Displays error UI when authentication fails
   - Only renders children when user is properly authenticated

### API Communication

1. The application uses tRPC for typesafe API calls:
   - Server-side definitions in `src/server/api/root.ts` and procedure files
   - React integration through `src/trpc/react.tsx`
   - Server component support via `src/trpc/server.ts`

2. API call flow:
   - Client components use the tRPC React hooks to call procedures
   - Server components use the direct server API
   - Both share the same type definitions ensuring end-to-end type safety

## Key Components and Their Interactions

### Client-Side Architecture

1. **ClientWrapper** (`src/components/ClientWrapper.tsx`):
   - Manages client-side hydration
   - Prevents rendering during SSR to avoid hydration mismatch
   - Wraps the application with tRPC provider

2. **TRPCReactProvider** (`src/trpc/react.tsx`):
   - Manages React Query client singleton
   - Sets up tRPC client with appropriate links
   - Provides error handling for tRPC initialization

3. **UI Components** (`src/components/ui/`):
   - `LoadingSpinner.tsx`: Provides loading indicator with configurable fullscreen mode
   - `SiteName.tsx`: Brand component with stylized display
   - Additional UI components for consistent design system implementation

### Server-Side Architecture

1. **tRPC Server** (`src/trpc/server.ts`):
   - Creates context for server components
   - Sets up direct procedure calls for RSC
   - Implements error handling

2. **API Routers** (`src/server/api/`):
   - Define tRPC procedures
   - Implement business logic
   - Handle authentication and authorization

### Authentication Components

1. **Auth Utilities** (`src/lib/auth.ts`):
   - Supabase client initialization
   - Session management functions
   - Redirect URL generation
   - Auth state change subscription

2. **Login Page** (`src/app/login/page.tsx`):
   - Client component that uses Supabase Auth UI
   - Handles both sign in and sign up flows
   - Provides error handling and loading states
   - Implements redirection logic after authentication

3. **Protected Layout** (`src/app/dashboard/layout.tsx`):
   - Client component that verifies authentication
   - Implements auth state monitoring
   - Provides route protection for child components/pages

## Styling System

The application uses a combination of:

- **TailwindCSS**: For utility-based styling
- **Class Variance Authority (CVA)**: For component variants
- **tailwind-merge**: For conditional class application
- **Geist Font**: For typography
- **Custom color theme**: Using a dark color scheme with orange accent colors

## Development and Deployment

### Development Workflow

Development scripts in `package.json` include:
- `npm run dev`: Local development server
- `npm run build`: Production build
- `npm run lint` & `npm run lint:fix`: Code linting
- `npm run format:check` & `npm run format:write`: Code formatting
- `npm run typecheck`: TypeScript type checking

### Environment Configuration

Environment variables are defined in:
- `.env.local`: Local environment variables
- `.env.example`: Example environment variables template

Important environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase instance URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

## Best Practices and Patterns

### Component Organization

- **UI Components**: Reusable UI components in `src/components/ui`
- **Page Components**: Co-located with their pages in `src/app/*`
- **Server Components**: Default to React Server Components unless marked with "use client"
- **Client Components**: Explicitly marked with "use client" directive

### Authentication Pattern

- **Centralized Auth**: Auth functions centralized in `src/lib/auth.ts`
- **Route Protection**: Implemented at the layout level for dashboard routes
- **Auth Subscriptions**: Reactive updates to auth state changes
- **Error Handling**: Dedicated error UI for authentication failures

### Data Fetching

- **Server-Side Data Fetching**: Using tRPC server API in React Server Components
- **Client-Side Data Fetching**: Using tRPC React hooks with React Query

### Error Handling

- **tRPC Error Handling**: Error responses are properly formatted
- **Authentication Errors**: Captured and handled in auth utility functions
- **UI Error States**: Dedicated UI components for error presentation

## Future Architecture Considerations

Areas for potential improvement or extension:
- Structured error handling system
- Enhanced state management with context or global stores
- Performance optimization strategies
- Testing infrastructure integration
- CI/CD pipeline setup 
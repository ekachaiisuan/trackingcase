# Tracking Case Project

## Project Overview
This is a comprehensive case tracking system built with **Next.js 15** and **Supabase**. It leverages the Next.js App Router for modern routing and Server Actions for backend logic. The application provides a full-featured dashboard for managing "cases," including authentication, CRUD operations, and real-time updates.

### Main Technologies
- **Frontend Framework:** Next.js 15 (App Router, TypeScript)
- **Backend/Database:** Supabase (PostgreSQL, Auth, Real-time)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Data Fetching/State:** Next.js Server Actions, TanStack Table
- **Icons/UI:** Lucide React, Sonner (Notifications)

## Directory Structure Highlights
- `/app`: Contains the application routes, layouts, and Server Actions.
  - `/app/action`: Centralized Server Actions for database operations (e.g., `getcases.ts`, `insertform.ts`, `updatecase.ts`).
  - `/app/auth`: Authentication-related routes (Login, Sign-up, Forgot Password).
  - `/app/dashboard`: The main management interface.
  - `/app/form`: Forms for creating and editing cases.
- `/components`: Reusable UI components.
  - `/components/ui`: Low-level UI primitives from shadcn/ui.
  - `data-table.tsx`: A flexible data table component powered by TanStack Table.
  - `realtime-cases.tsx`: Handles real-time subscriptions to the Supabase database.
- `/lib/supabase`: Supabase client configurations for both client and server environments.
  - `server.ts`: Factory for creating a Supabase client in Server Components and Actions.
  - `client.ts`: Factory for creating a Supabase client in Client Components.
  - `proxy.ts`: Middleware-level session management and authentication guards.

## Building and Running

### Prerequisites
- Node.js (Latest LTS recommended)
- A Supabase project (URL and Anon/Publishable Key)

### Local Development
1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Rename `.env.example` to `.env.local` and provide your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the result.

### Build and Test
- **Build for production:** `npm run build`
- **Start production server:** `npm run start`
- **Linting:** `npm run lint`

## Development Conventions

### Data Management
- **Server Actions:** All database mutations (Create, Update, Delete) and sensitive reads should be handled via Server Actions in `app/action`.
- **SSR Client:** Always use `createClient()` from `@supabase/server` within Server Components and Actions to ensure session cookies are handled correctly.

### UI & Styling
- **Shadcn UI:** Follow the established pattern of using Radix-based components. New UI primitives should be added via the `npx shadcn-ui@latest add [component]` command if applicable.
- **Tailwind:** Use utility classes for styling. Avoid writing custom CSS unless absolutely necessary (defined in `app/globals.css`).

### Authentication
- Authentication is handled via Supabase Auth with cookie-based sessions.
- Middleware (`lib/supabase/proxy.ts` called from `middleware.ts` if it exists) manages route protection. Ensure any new protected routes are correctly handled in the session update logic.

### Real-time
- Use the `realtime-cases.tsx` component or similar patterns to subscribe to database changes for immediate UI updates.

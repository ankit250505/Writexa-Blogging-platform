# Assignment Write-up

## Which AI tool I used

I used Google Gemini through the official `@google/genai` JavaScript SDK.

## Why I chose it

The assignment specifically allowed Google Gemini, and the official SDK gave me a clean way to call the model from the server while keeping the API key private.

## How it helped

It generates a short, reader-friendly summary for each new post. That improves the homepage listing because users can understand a post quickly before opening it.

## Authentication flow

The app uses Supabase Auth with email and password. When a user signs up, Supabase creates the auth record, and a database trigger automatically inserts a matching row into the `public.users` table with a default role of `viewer`. After login, the server fetches the authenticated user and profile, and middleware protects authenticated pages.

## Role-based access flow

Roles are stored in the `users` table and checked in three places:

1. Route-level checks in protected pages
2. Server actions before create/edit/comment operations
3. Supabase RLS policies in the database

This means the app does not rely only on hidden frontend buttons.

## Post creation logic

When an author or admin creates a post, the form sends the title, body, and optional image to a server action. The server validates input, uploads the image to Supabase Storage, calls Gemini to generate the summary, and inserts the final post into the `posts` table.

## AI summary generation flow

The summary is generated only once when the post is created. The backend sends the title and body to Gemini with a prompt asking for an approximately 200-word summary. The result is stored in `posts.summary` and shown later in the blog listing and post page.

## Cost optimization strategy

- Summary is generated only once on creation
- Summary is stored in the database
- No repeated summary generation on homepage or post detail page
- Edit flow keeps the existing summary by default
- Gemini API calls happen only on the server

## One bug I faced and how I resolved it

A common bug in role-based apps is protecting only the UI and forgetting to protect the backend. I resolved that by checking permissions in the pages, in the server actions, and in Supabase RLS policies. Even if someone manually calls a request, the database still enforces the rules.

## Key architecture decisions

- Next.js App Router for clean server-first architecture
- Server components for data-heavy pages
- Client components only for interactive forms
- Supabase trigger for automatic user profile creation
- Supabase Storage for featured images
- Service-role client limited to server-only read helpers
- Interview-friendly structure with `components`, `lib`, `types`, and `supabase`

## Development phases and testing checklist

### Phase 1

Scope:
- Next.js project setup
- Tailwind and TypeScript configuration
- Folder structure

Test:
- App starts
- Global layout renders
- Navbar works

### Phase 2

Scope:
- Supabase schema
- Trigger for profile creation
- Storage bucket policies
- RLS policies

Test:
- Tables are created
- Signup inserts into `users`
- Storage bucket accepts authenticated uploads

### Phase 3

Scope:
- Signup, login, logout
- Server-side profile fetching
- Middleware protection

Test:
- Viewer signup works
- Login redirects to dashboard
- Protected routes redirect unauthenticated users

### Phase 4

Scope:
- Homepage listing
- Search
- Pagination

Test:
- Post cards load
- Search filters results
- Pagination changes pages correctly

### Phase 5

Scope:
- Create post form
- Image upload
- Gemini summary generation

Test:
- Author/admin can create posts
- Viewer cannot access create page
- Summary is saved once in the database

### Phase 6

Scope:
- Single post page
- Comments list
- Comment creation

Test:
- Full post opens
- Logged-in user can comment
- Logged-out user is prompted to log in

### Phase 7

Scope:
- Edit post flow
- Ownership checks

Test:
- Author edits own post
- Author cannot edit another author's post
- Admin can edit any post

### Phase 8

Scope:
- Role-aware dashboard
- My posts page
- Comments monitoring page

Test:
- Viewer sees limited dashboard
- Author sees own post tools
- Admin sees all comments and all posts in dashboard scope

### Phase 9

Scope:
- Loading state
- Error state
- Responsive styling cleanup

Test:
- Loading fallback appears
- Error boundary is user-friendly
- Layout works on mobile and desktop

### Phase 10

Scope:
- README
- Deployment notes
- Final write-up

Test:
- README is enough to set up the project
- Environment variables are documented
- Vercel deployment steps are clear

# Writexa

Writexa is a full-stack blogging platform built for an internship assignment using Next.js App Router, TypeScript, Supabase, Tailwind CSS, and the Google Gemini API. It supports authentication, role-based access control, post creation and editing, comments, search, pagination, and one-time AI-generated summaries.

## Features

- Supabase Auth with email and password
- Roles: `viewer`, `author`, `admin`
- Public blog listing with search and pagination
- AI-generated summary stored in the database when a post is created
- Supabase Storage image uploads for featured images
- Full post page with comments
- Author/Admin dashboard with route protection and server-side permission checks
- Admin or author comment monitoring

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database, Storage
- Google Gemini API via the official `@google/genai` SDK
- Vercel for deployment

## Project structure

```text
app/
components/
lib/
supabase/
types/
```

Key folders:

- `app/` page routes and layouts
- `components/` UI grouped by feature
- `lib/supabase/` browser, server, middleware, and admin helpers
- `lib/actions/` server actions for auth, posts, and comments
- `lib/queries/` read-side data fetching
- `supabase/schema.sql` schema, indexes, triggers, RLS, and storage policies

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
```

Notes:

- `NEXT_PUBLIC_*` values are safe for the browser.
- `SUPABASE_SERVICE_ROLE_KEY` is used only on the server for secure joins and dashboard queries.
- `GOOGLE_GENERATIVE_AI_API_KEY` is used only on the server for summary generation.

## Supabase setup

1. Create a new Supabase project.
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. In Authentication, enable Email/Password provider.
4. In Storage, confirm the `post-images` bucket exists after running the SQL.
5. Optionally disable email confirmation during local development for faster testing.
6. To test roles, manually update a user row in `public.users`:

```sql
update public.users
set role = 'author'
where email = 'author@example.com';
```

Change to `admin` when needed.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Authentication flow

1. User signs up with name, email, and password.
2. Supabase Auth creates the auth user.
3. A database trigger inserts the corresponding row into `public.users` with default role `viewer`.
4. The app fetches the logged-in user and profile on the server.
5. Middleware protects dashboard and profile routes.
6. Sensitive actions still do server-side role checks before writing data.

## Role-based access flow

- `viewer`: read posts, read summaries, open posts, comment when logged in
- `author`: viewer permissions + create posts + edit only own posts + review comments on own posts
- `admin`: full post editing + all comment monitoring

Protection layers:

- Middleware for authenticated areas
- Server-side role checks in page routes
- Server-side permission checks inside server actions
- Supabase Row Level Security for database enforcement

## AI summary flow

When an author/admin creates a post:

1. The form submits to a server action.
2. The server uploads the optional image to Supabase Storage.
3. The server sends the title and body to Gemini with a summary prompt.
4. The generated summary is saved in `posts.summary`.
5. The post is inserted once with the stored summary.

If Gemini fails, the app stores `"Summary unavailable"` instead of repeatedly retrying.

## Cost optimization decisions

- Summary is generated only once during post creation
- Summary is stored in the database and reused in listings
- No summary generation on page load or on listing fetch
- Edit flow preserves the existing summary by default
- Gemini runs only on the server so the API key stays private

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the same environment variables in the Vercel project settings.
4. Deploy.
5. In Supabase Auth, add your Vercel domain to allowed redirect URLs if needed.

## Demo accounts

Create accounts through the UI, then promote roles directly in Supabase for testing:

- `viewer@example.com` -> `viewer`
- `author@example.com` -> `author`
- `admin@example.com` -> `admin`

## Assignment write-up notes

### Which AI tool I used

I used Google Gemini through the official `@google/genai` SDK.

### Why I chose it

It has a simple server-side integration, a free developer-friendly entry point, and it fits the assignment requirement for a Google AI API.

### How it helped

It generated reader-friendly post summaries that improve the homepage listing experience without requiring users to open every post.

### Post creation logic

The create-post form submits to a server action. The server validates input, uploads the image, generates the summary once, and inserts the final post into Supabase.

### One bug I faced and how I resolved it

An easy bug in this stack is accidentally relying only on hidden frontend buttons for permissions. I avoided that by adding permission checks both in the page routes and inside the server actions, with RLS policies as the final safety layer.

### Key architecture decisions

- App Router with mostly server components
- Server actions for mutations
- Supabase trigger for profile creation
- RLS plus server-side permission checks
- Stored AI summary instead of regenerating
- Service-role client limited to server-only read helpers

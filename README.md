# Eagles RFC Web App

## Run Locally

Prerequisites:
- Node.js 20+

Setup:
1. Install dependencies:
   `npm install`
2. Copy environment template:
   `cp .env.example .env.local`
3. Fill Supabase values in `.env.local`.
4. Start dev server:
   `npm run dev`

## Match Poll Backend (Supabase Postgres)

This project now uses Supabase Postgres as the only source of truth for the match poll.

### 1) Create database objects
1. Open your Supabase project.
2. Go to SQL Editor.
3. Run `supabase/poll_schema.sql`.

### 2) Configure frontend env
Set these values in `.env.local` (and in your production host):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_POLL_KEY` (default key used by schema seed: `eagles-vs-golden-badgers`)

### 3) Behavior provided
- In-app voting (no redirects)
- One vote per browser session
- Shared counts across devices
- Win/Draw/Loss totals and overall total votes

## Build

Run production build:

`npm run build`

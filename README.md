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

## Match Poll Backend (Express + SQLite)

The match poll uses the local API server in `api/server.js` with SQLite (`better-sqlite3`) as the source of truth.

### 1) API endpoints
- `GET /api/poll/:key/counts`
- `POST /api/poll/:key/vote`

Counts response includes:
- `win`, `draw`, `loss`, `total`
- `active_polls_total`

Vote response includes:
- `accepted`, `win`, `draw`, `loss`, `total`
- `active_polls_total`

### 2) Persistence requirements
- SQLite file path: `/data/polls.db`
- `docker-compose.yml` mounts persistent volume `poll_data` to `/data`
- This volume is required so poll data survives container/site restarts

### 3) Behavior provided
- In-app voting (no redirects)
- One vote per browser/device token per poll key
- Shared counts across browsers/devices
- Win/Draw/Loss percentage bars with totals in UI

## Build

Run production build:

`npm run build`

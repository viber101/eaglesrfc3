# Eagles RFC — Hosting & Deployment Reference

## Project Info
- **Project**: Eagles RFC Website (React + Vite + TypeScript + Tailwind)
- **GitHub Repo**: https://github.com/viber101/eaglesrfc3
- **Live Domain**: https://eaglesrugbyug.com
- **Live IP**: http://72.60.83.198

---

## Hosting: Hostinger VPS

| Detail | Value |
|---|---|
| Provider | Hostinger |
| Plan | KVM 2 VPS |
| OS | Ubuntu 24.04 |
| Server IP | `72.60.83.198` |
| Server Location | Germany – Frankfurt |
| SSH Access | `ssh root@72.60.83.198` |
| hPanel VPS URL | https://hpanel.hostinger.com → VPS |

### VPS Root Password
- Reset via: Hostinger hPanel → VPS → Overview → **"Change"** next to Root password

---

## Deployment: GitHub Actions (Auto-Deploy)

Every `git push` to the `main` branch automatically:
1. Builds the React app (`npm run build`)
2. SSHs into the VPS
3. Copies `dist/` files to `/var/www/eaglesrfc/`
4. Starts Nginx via Docker Compose

### Workflow File
- [`eaglesrfc3/.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### GitHub Secrets Required
Set at: https://github.com/viber101/eaglesrfc3/settings/secrets/actions

| Secret Name | Description |
|---|---|
| `VPS_HOST` | `72.60.83.198` |
| `VPS_USER` | `root` |
| `VPS_PASSWORD` | VPS root password (from Hostinger hPanel) |
| `SSL_EMAIL` | Your email for Let's Encrypt SSL renewal |
| `VITE_SUPABASE_URL` | Supabase project URL (for poll feature) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (for poll feature) |
| `VITE_POLL_KEY` | `eagles-vs-golden-badgers` |

### Watch Deployments
- https://github.com/viber101/eaglesrfc3/actions

---

## Server File Structure (on VPS)

```
/var/www/eaglesrfc/
├── dist/           ← Built React app (uploaded by GitHub Actions)
├── nginx.conf      ← Nginx config (React Router + SSL)
└── docker-compose.yml
```

---

## SSL / HTTPS

- **Provider**: Let's Encrypt (free, auto-renews every 90 days)
- **Tool**: Certbot
- **Certificate path on VPS**: `/etc/letsencrypt/live/eaglesrugbyug.com/`
- SSL is obtained automatically on first deployment via GitHub Actions

### Manual SSL renewal (if needed)
SSH into VPS and run:
```bash
certbot renew
```

---

## DNS Records (Hostinger DNS Manager)

| Type | Name | Points To | TTL |
|---|---|---|---|
| `A` | `@` | `72.60.83.198` | 3600 |
| `A` | `www` | `72.60.83.198` | 3600 |

> Manage at: Hostinger hPanel → Domains → eaglesrugbyug.com → DNS Records

---

## Docker Setup (on VPS)

- **Container name**: `eaglesrfc_web`
- **Image**: `nginx:alpine`
- **Ports**: `80` (HTTP) and `443` (HTTPS)
- **Config file**: [`docker-compose.yml`](docker-compose.yml)

### Useful Docker commands (run on VPS via Terminal)
```bash
# Check if container is running
docker ps

# View Nginx logs
docker logs eaglesrfc_web

# Restart container
cd /var/www/eaglesrfc && docker compose restart

# Stop container
cd /var/www/eaglesrfc && docker compose down

# Start container
cd /var/www/eaglesrfc && docker compose up -d
```

---

## How to Deploy a New Update

```bash
# Make your code changes, then:
git add .
git commit -m "describe your changes"
git push origin main
```

GitHub Actions will automatically build and deploy within ~3 minutes.

---

## Local Development

```bash
cd eaglesrfc3
npm install
npm run dev
# Opens at http://localhost:3000
```

### Environment Variables (local)
Create `eaglesrfc3/.env` (never commit this file):
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_POLL_KEY=eagles-vs-golden-badgers
```

---

## Key Files

| File | Purpose |
|---|---|
| [`nginx.conf`](nginx.conf) | Nginx server config (React Router + SSL + gzip) |
| [`docker-compose.yml`](docker-compose.yml) | Docker setup for Nginx on VPS |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | GitHub Actions auto-deploy workflow |
| [`vite.config.ts`](vite.config.ts) | Vite build configuration |
| [`.env.example`](.env.example) | Template for environment variables |

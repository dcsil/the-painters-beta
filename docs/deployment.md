---
sidebar_position: 7
title: Deployment
---

# Deployment

This guide covers both how the Oversight team deployed the application to Vercel and how an external contributor can self-host it.

---

## Team Deployment (Vercel)

Oversight is deployed as a serverless Next.js application on [Vercel](https://vercel.com).

**Live URL:** [https://the-painters-product.vercel.app](https://the-painters-product.vercel.app)

### How It Works

1. The GitHub repository is connected to Vercel
2. Every push to `main` triggers an automatic deployment
3. Pull requests get preview deployments on unique URLs
4. Vercel auto-detects the Next.js framework and configures the build

### Infrastructure

| Service | Purpose | Tier |
|---|---|---|
| **Vercel** | Hosting, serverless functions, CDN | Free / Pro |
| **Neon** | PostgreSQL database (connection pooling) | Free |
| **Vercel Blob** | File storage for uploaded conversation files | Included with Vercel |
| **Google AI Studio** | Gemini API for analysis | Free tier |
| **Groq** | Llama inference for chatbot and analysis | Free tier |
| **Resend** | Email delivery for analyst alerts | Free tier |

### Environment Variables on Vercel

All environment variables are configured in the Vercel dashboard under **Settings → Environment Variables**:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | Neon pooled connection string |
| `GEMINI_API_KEY` | Yes | Google AI Studio key |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `BLOB_READ_WRITE_TOKEN` | Yes | Auto-configured when linking Vercel Blob store |
| `GROQ_API_KEY` | Yes (for chatbot) | Groq console key |
| `RESEND_API_KEY` | Optional | Resend API key |
| `ALERT_EMAIL_FROM` | Optional | Sender email address |

`NEXTAUTH_URL` is not needed on Vercel — it auto-detects from `VERCEL_URL`.

### Database Migrations

After connecting the database, run migrations from your local machine or a CI step:

```bash
npx prisma migrate deploy
```

This applies all pending migrations to the production database.

### Vercel Blob Store

1. In the Vercel dashboard, go to **Storage → Create → Blob**
2. Link the blob store to your project
3. The `BLOB_READ_WRITE_TOKEN` is automatically added to your environment

### Serverless Constraints

- **Max function execution: 120 seconds** — Analysis requests are configured with this timeout. Complex analyses (especially "Both" mode) may approach this limit.
- **No streaming progress** — Serverless functions cannot push progress updates mid-execution, which is why the processing page uses a simulated progress bar.
- **Cold starts** — First request after inactivity may be slower due to serverless cold starts.

---

## Self-Hosting Guide

For contributors who want to run Oversight in their own environment.

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Neon recommended, but any PostgreSQL 14+ works)
- API keys for Google Gemini (required) and Groq (optional)

### Step 1: Clone and Install

```bash
git clone https://github.com/dcsil/the-painters-product.git
cd the-painters-product
npm install
```

### Step 2: Configure Environment

Create a `.env.local` file with all required variables. See the [Setup Guide](/docs/setup#step-4-configure-environment-variables) for the full reference table.

### Step 3: Set Up the Database

If using Neon:
```bash
npx prisma migrate deploy
```

If using a local PostgreSQL:
```bash
# Ensure DATABASE_URL points to your local instance
# e.g., DATABASE_URL="postgresql://user:pass@localhost:5432/oversight"
npx prisma migrate deploy
```

:::warning[Local PostgreSQL]

If using a local PostgreSQL (not Neon), the Prisma adapter configuration in `lib/prisma.ts` uses the Neon adapter. You may need to modify the Prisma client setup to use the standard adapter instead for a non-Neon PostgreSQL.

:::

### Step 4: Build and Start

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The application starts on `http://localhost:3000` by default.

### Step 5: Reverse Proxy (Optional)

For production self-hosting, place a reverse proxy (Nginx, Caddy, etc.) in front of the Node.js server:

- Terminate TLS at the proxy
- Forward requests to `localhost:3000`
- Set `NEXTAUTH_URL` to your public domain

### File Storage

Vercel Blob is the default file storage. For self-hosting without Vercel:
- You will need a `BLOB_READ_WRITE_TOKEN` from a Vercel project, OR
- Modify the upload route to use a different storage backend (local filesystem, S3, etc.)

### Health Check

Verify your deployment is working:

```bash
curl https://your-domain.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "checks": { "db": true, "gemini": true, "groq": true, "blob": true }
}
```

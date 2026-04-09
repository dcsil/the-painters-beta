---
sidebar_position: 1
title: Setup Guide
---

# Setup Guide

This guide walks you through installing, configuring, and launching Oversight from scratch. Each step is discrete and ordered — follow them in sequence. No prior knowledge of the codebase is required.

## Prerequisites

Before you begin, make sure you have the following installed and available:

| Requirement | Minimum Version | How to Check |
|---|---|---|
| **Node.js** | 18.0+ | `node --version` |
| **npm** | Bundled with Node.js | `npm --version` |
| **Git** | Any recent version | `git --version` |

You will also need accounts on the following services (all have free tiers):

| Service | Purpose | Required? | Sign Up |
|---|---|---|---|
| **Neon** | PostgreSQL database hosting | Yes | [neon.tech](https://neon.tech) |
| **Google AI Studio** | Gemini API key for analysis | Yes | [aistudio.google.com](https://aistudio.google.com) |
| **Groq** | Llama API key for chatbot + Groq/Both analysis modes | Optional | [console.groq.com](https://console.groq.com) |
| **Vercel** | Blob storage token (for file uploads) | Yes (local dev) | [vercel.com](https://vercel.com) |
| **Resend** | Email delivery for analyst alerts | Optional | [resend.com](https://resend.com) |

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/dcsil/the-painters-product.git
cd the-painters-product
```

**Expected output:** A new `the-painters-product` directory is created with the project files.

---

## Step 2: Install Dependencies

```bash
npm install
```

**Expected output:** Dependencies install and you should see `prisma generate` run automatically (via the `postinstall` hook). The Prisma client is generated in `node_modules/.prisma/client`.

:::warning If npm install fails
- Ensure you are using Node.js 18 or later: `node --version`
- Delete `node_modules` and `package-lock.json`, then retry: `rm -rf node_modules package-lock.json && npm install`
:::

---

## Step 3: Set Up the Database (Neon)

1. Log in to [neon.tech](https://neon.tech) and create a new project
2. In your project dashboard, go to **Connection Details**
3. Select **Pooled connection** (this is critical — do NOT use the direct connection)
4. Copy the connection string. It should look like:
   ```
   postgresql://user:password@ep-xxx-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```

:::danger Use the pooled connection string
Oversight uses Neon's connection pooler via the `@prisma/adapter-neon` package. Using the direct (non-pooled) connection string will cause `PrismaClientInitializationError` at runtime.
:::

---

## Step 4: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Add the following variables. Refer to the table below for where to find each value:

```env
# Required
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
GEMINI_API_KEY="your-gemini-api-key"
NEXTAUTH_SECRET="generate-with-openssl-command-below"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Optional — enables Groq-powered chatbot and Groq/Both analysis modes
GROQ_API_KEY="your-groq-api-key"

# Optional — enables analyst email alerts on chat session analysis
RESEND_API_KEY="your-resend-api-key"
ALERT_EMAIL_FROM="Oversight <alerts@yourdomain.com>"
```

### Environment Variable Reference

| Variable | Required | Description | Where to Get It |
|---|---|---|---|
| `DATABASE_URL` | **Yes** | Neon PostgreSQL pooled connection string | Neon dashboard → Connection Details → Pooled |
| `GEMINI_API_KEY` | **Yes** | Google Gemini API key for hallucination, bias, and toxicity analysis | [Google AI Studio](https://aistudio.google.com) → Get API Key |
| `GEMINI_MODEL` | No | Gemini model override (default: `gemini-2.5-flash`) | — |
| `NEXTAUTH_SECRET` | **Yes** | Random secret for JWT session encryption | Generate with: `openssl rand -base64 32` |
| `BLOB_READ_WRITE_TOKEN` | **Yes** (local) | Vercel Blob storage read/write token | Vercel dashboard → Storage → Blob → Manage → Token |
| `GROQ_API_KEY` | No | Groq API key — enables the chatbot and "Groq" / "Both" analysis modes | [console.groq.com](https://console.groq.com) → API Keys |
| `GROQ_MODEL` | No | Groq analysis model override (default: `openai/gpt-oss-120b`) | — |
| `GROQ_CHAT_MODEL` | No | Groq chatbot model override (default: `meta-llama/llama-4-scout-17b-16e-instruct`) | — |
| `RESEND_API_KEY` | No | Resend API key for analyst email alerts | [resend.com](https://resend.com) → API Keys |
| `ALERT_EMAIL_FROM` | No | Sender address for alert emails (default: `Oversight <alerts@oversight-app.com>`) | — |

### Generate NEXTAUTH_SECRET

Run this command and paste the output into your `.env.local`:

```bash
openssl rand -base64 32
```

---

## Step 5: Run Database Migrations

Apply the database schema to your Neon database:

```bash
npx prisma migrate deploy
```

**Expected output:** You should see output like:
```
X migrations found in prisma/migrations
Applying migration 20260301_init ...
Applying migration 20260325_add_rate_limiting ...
...
Applied N migration(s) successfully.
```

:::warning If migrations fail
- **`PrismaClientInitializationError`**: Your `DATABASE_URL` is incorrect or not using the pooled connection string
- **Connection timeout**: Check that your Neon project is active (free-tier projects may pause after inactivity)
- **Permission denied**: Ensure the connection string includes write permissions
:::

---

## Step 6: Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
   ▲ Next.js 16.1.7
   - Local:        http://localhost:3000
   ✓ Starting...
   ✓ Ready in Xs
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Oversight home page.

---

## Step 7: Create an Analyst Account

1. Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Enter your email, name (optional), and a password (minimum 8 characters)
3. Click **Sign Up**
4. You will be automatically logged in and redirected to the home page

**Expected result:** You see the Oversight header navigation with links to Chatbot, Monitor, Trends, Upload, History, Ground Truth, and Settings.

---

## Step 8: Verify Everything Works

Upload a sample conversation file to confirm the full pipeline is working:

1. Navigate to [http://localhost:3000/upload](http://localhost:3000/upload)
2. Drag and drop (or click to select) the file `sample-telus-one-hallucination.json` from the project root
3. Leave the default settings (Gemini mode, all analysis types selected)
4. Click **Upload**
5. You will be redirected to the processing page — wait for analysis to complete (up to 60 seconds)
6. Once complete, you are redirected to the analysis dashboard

**Expected result:** The dashboard shows results across the Overview, Hallucination, Bias, and Toxicity tabs. The hallucination tab should flag at least one issue.

:::info About the processing animation
The processing page shows a simulated progress bar that animates from 0% to ~90%, then jumps to 100% when analysis actually completes. This is a known UX limitation due to Vercel's serverless architecture — the actual backend analysis cannot stream progress updates.
:::

---

## Input File Format

Oversight expects JSON files containing an array of conversation messages. Each message must have:

```json
[
  { "id": "user", "content": "What are your business hours?" },
  { "id": "assistant", "content": "We are open Monday to Friday, 9am to 5pm EST." },
  { "id": "user", "content": "Do you offer weekend support?" },
  { "id": "assistant", "content": "Yes, we offer limited weekend support via email." }
]
```

- `id` must be either `"user"` or `"assistant"`
- `content` is the message text (string)
- The file must be valid JSON
- Maximum file size: 5 MB

Sample files are included in the repository root:
- `sample-conversation.json` — Generic Q&A (clean)
- `sample-telus-clean.json` — TELUS telecom support (no issues)
- `sample-telus-one-hallucination.json` — TELUS support with one hallucination
- `sample-telus-many-hallucinations.json` — TELUS support with multiple hallucinations

---

## Troubleshooting Setup Issues

### `PrismaClientInitializationError`

**Cause:** `DATABASE_URL` is not set, incorrectly formatted, or using a direct (non-pooled) connection string.

**Fix:** Ensure your `.env.local` has the pooled connection string from Neon (URL contains `-pooler` in the hostname).

### `Gemini API error 403`

**Cause:** `GEMINI_API_KEY` is invalid, expired, or has exceeded its quota.

**Fix:** Generate a new API key at [Google AI Studio](https://aistudio.google.com) and update `.env.local`.

### Blank analysis results

**Cause:** You selected "Groq" or "Both" mode but `GROQ_API_KEY` is not set.

**Fix:** Either set `GROQ_API_KEY` in `.env.local` or switch to "Gemini" analysis mode.

### Blob upload failure

**Cause:** `BLOB_READ_WRITE_TOKEN` is not set in `.env.local`.

**Fix:** Create a Vercel Blob store and copy the read/write token to your `.env.local`.

### Auth loop at `/login`

**Cause:** `NEXTAUTH_SECRET` is not set.

**Fix:** Generate a secret with `openssl rand -base64 32` and add it to `.env.local`.

### Alert emails not arriving

**Cause:** `RESEND_API_KEY` is not set, or `alertEmail` is not configured in Settings.

**Fix:** Set `RESEND_API_KEY` in `.env.local`, then go to Settings (`/settings`) and enter your alert email address.

### `DATABASE_URL` connection errors

**Cause:** Must use the pooled connection string from Neon, not the direct connection.

**Fix:** In Neon dashboard, copy the connection string with `-pooler` in the hostname.

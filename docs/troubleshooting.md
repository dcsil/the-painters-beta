---
sidebar_position: 8
title: Troubleshooting & FAQ
---

# Troubleshooting & FAQ

## Frequently Asked Questions

### What JSON format does the uploader accept?

The file must be a JSON array of message objects. Each message has two fields:

```json
[
  { "id": "user", "content": "Your message here" },
  { "id": "assistant", "content": "Bot response here" }
]
```

- `id` must be `"user"` or `"assistant"`
- `content` is the message text (string)
- Maximum file size: 5 MB

### What's the difference between Gemini, Groq, and Both modes?

| Mode | Provider | Trade-off |
|---|---|---|
| **Gemini** | Google Gemini | Balanced accuracy and speed. Best default choice |
| **Groq** | Llama via Groq | Faster inference. Also powers the chatbot |
| **Both** | Gemini → Groq cross-check | Highest confidence. Slower since both run sequentially |

See [Analysis Modes](/docs/features/analysis-modes) for details.

### Why is my analysis showing "No issues detected" when I expect issues?

- **Try "Both" mode** — Cross-checking catches more issues than a single provider
- **Add a ground truth document** — Provides factual reference for the model to verify against
- **Check your selected analysis types** — Make sure the relevant categories (hallucination, bias, toxicity) are selected on the upload page

### Can I analyze CSV or plain text files?

No, Oversight only accepts JSON files in the specific conversation format. See the [input file format](/docs/setup#input-file-format) for details.

### How do I reset my password?

There is currently no self-service password reset. Contact the project administrators for assistance.

### Where can I find sample files to test with?

Four sample conversation files are included in the repository root:

| File | Description |
|---|---|
| `sample-conversation.json` | Generic Q&A (clean, no issues) |
| `sample-telus-clean.json` | TELUS telecom support (no issues) |
| `sample-telus-one-hallucination.json` | TELUS support with one hallucination |
| `sample-telus-many-hallucinations.json` | TELUS support with multiple hallucinations |

---

## Common Issues

### Processing page progress bar is stuck

**Symptom:** The progress bar reaches ~90% and appears to stall.

**Explanation:** This is expected behavior. The progress bar is a simulated animation — it does not reflect actual backend progress. The analysis is running in the background and may take up to 120 seconds (the Vercel serverless function limit). When analysis completes, the bar jumps to 100% and you are redirected to the dashboard.

**What to do:** Wait up to 2 minutes. If the page still hasn't redirected, the analysis may have failed — check the upload at `/uploads` for an error status.

### `PrismaClientInitializationError`

**Cause:** The `DATABASE_URL` environment variable is not set, is malformed, or is using a direct (non-pooled) Neon connection string.

**Fix:** Use the **pooled** connection string from the Neon dashboard (the URL should contain `-pooler` in the hostname). See [Setup Guide — Step 3](/docs/setup#step-3-set-up-the-database-neon).

### Gemini API error 403

**Cause:** The `GEMINI_API_KEY` is invalid, expired, or has exceeded the free-tier quota.

**Fix:** Generate a new API key at [Google AI Studio](https://aistudio.google.com) and update your `.env.local`.

### Blank analysis results

**Cause:** You selected "Groq" or "Both" analysis mode, but `GROQ_API_KEY` is not configured.

**Fix:** Either add `GROQ_API_KEY` to your `.env.local`, or switch to "Gemini" mode.

### I'm getting a 429 error on uploads

**Explanation:** You've hit the rate limit. Limits are:

| Endpoint | Minute Limit | Daily Limit |
|---|---|---|
| Upload | 5/min | 40/day |
| Chat | 5/min | 40/day |
| Feedback | 5/min | 20/day |

**What to do:** Wait for the rate limit to reset (check the `Retry-After` response header). The minute counter resets after 60 seconds; the daily counter resets at midnight UTC.

### Live monitoring isn't working on the chatbot

**Cause:** `GROQ_API_KEY` is not set. Live monitoring and the chatbot both require Groq.

**Fix:** Add `GROQ_API_KEY` to your `.env.local` and restart the dev server.

### Alert emails aren't arriving

**Checklist:**
1. Is `RESEND_API_KEY` set in `.env.local`?
2. Have you entered your alert email in `/settings`?
3. Check your spam/junk folder
4. Verify the Resend API key is valid at [resend.com](https://resend.com)

### Auth loop at `/login`

**Cause:** `NEXTAUTH_SECRET` is not set in `.env.local`.

**Fix:** Generate a secret and add it:
```bash
openssl rand -base64 32
```

### Blob upload failure / "Failed to upload file"

**Cause:** `BLOB_READ_WRITE_TOKEN` is not set in `.env.local`.

**Fix:** Create a Vercel Blob store, copy the read/write token, and add it to `.env.local`.

### `DATABASE_URL` connection errors / timeouts

**Possible causes:**
- Using the direct connection string instead of pooled (must contain `-pooler`)
- Neon project is paused due to inactivity (free tier pauses after 5 minutes of idle)
- Network connectivity issues

**Fix:** Verify you're using the pooled connection string. If the project is paused, visit the Neon dashboard to wake it up.

### Build errors (`npm run build` fails)

**Common causes:**
- Missing dependencies: `rm -rf node_modules && npm install`
- TypeScript errors: check the build output for file and line numbers
- Prisma client not generated: run `npx prisma generate`

### Chat session shows "Session has ended" immediately

**Cause:** The chat session was already completed (either by the user ending it or by a violation being detected).

**Fix:** Start a new chat session by refreshing the `/chat` page.

---
sidebar_position: 4
title: How It Works
---

# How It Works — Workflow Infographics

This page provides visual walkthroughs of the primary user journeys in Oversight. Each workflow shows what the user does, what the system does in response, and key decision points and error states.

---

## Workflow 1: Analyst File Upload

This is the primary workflow for analyzing a pre-recorded chatbot conversation.

:::info Infographic Placeholder
TODO: Add workflow infographic for the file upload flow
:::

**Text description of the flow:**

1. **User selects a JSON file** on the `/upload` page
2. **Client-side validation** — File type, size (≤ 5 MB), and JSON structure are checked
   - *Error state:* Invalid format or size → inline error message shown
3. **User configures analysis settings** — Analysis mode (Gemini/Groq/Both), analysis types (hallucination/bias/toxicity), and optional ground truth document
4. **User clicks Upload** → `POST /api/upload` fires
   - *Error state:* Rate limit exceeded (5/min or 40/day) → HTTP 429 shown
5. **File is stored** to Vercel Blob storage
6. **Upload record is created** in the database with status `processing`
7. **Analysis pipeline runs** — Each selected category (hallucination, bias, toxicity) is analyzed in parallel using the selected provider(s)
8. **User sees the processing page** (`/processing/[id]`) with a polling animation
   - *Note:* The progress bar is simulated — it does not reflect actual backend progress
9. **Upload status updated** to `completed` or `failed`
   - *Error state:* All analyses fail → status set to `failed`, error message stored
   - *Success:* At least one analysis category succeeds → status set to `completed`
10. **User is redirected** to the analysis dashboard (`/dashboard/[id]`)
11. **Dashboard displays results** across tabs: Overview, Hallucination, Bias, Toxicity

---

## Workflow 2: Live Chat Monitoring

This workflow covers a customer interacting with the live chatbot and the automatic quality monitoring.

:::info Infographic Placeholder
TODO: Add workflow infographic for the live chat monitoring flow
:::

**Text description of the flow:**

1. **Customer visits `/chat`** (no login required)
2. **Customer types a message** → `POST /api/chat`
   - *Rate limit check:* 5/min, 40/day per IP address
   - *Error state:* Rate limit exceeded → HTTP 429 returned
3. **Bot reply generated** using Groq Llama
4. **Live monitoring runs in parallel** on the latest assistant turn:
   - Hallucination check → returns `true` or `false`
   - Bias score check → returns a score from 0 to 100
5. **Monitoring results displayed** in the monitoring panel below the chat
6. **Decision point: Violation detected?**
   - **No violation** — Conversation continues, monitoring result shown
   - **Violation** (hallucination = true OR bias score ≥ analyst threshold):
     1. Session is automatically ended
     2. "Live agent required" message shown to customer
     3. `POST /api/chat/[id]/complete` fires with violation details
     4. Full batch analysis runs on the entire conversation
     5. Alert emails sent to all analysts with `alertEmail` configured
7. **On normal "End Chat"** (no violation path):
   1. `POST /api/chat/[id]/complete` fires
   2. Full batch analysis runs on the entire conversation
   3. Alert emails sent to analysts
   4. Upload record created with `source: "chat"`, visible in all analysts' upload history

---

## Workflow 3: Analyst Live Monitoring Dashboard

This workflow covers an analyst observing active and recent chat sessions.

:::info Infographic Placeholder
TODO: Add workflow infographic for the analyst monitoring dashboard
:::

**Text description of the flow:**

1. **Analyst visits `/monitor`**
2. **Session Sidebar** loads and polls `GET /api/monitor/sessions` every 30 seconds
   - Shows sessions from the last 30 minutes
   - Each session shows: status badge (Active/Violated/Ended), last message preview, message count, relative timestamp
3. **Analyst clicks a session** in the sidebar
4. **Session Detail Panel** loads the full message history via `GET /api/chat/[id]`
   - If the session is active: polls every 5 seconds for new messages
5. **Per-message monitoring results** are displayed:
   - Bias score bar (color-coded: green/yellow/red based on threshold)
   - Hallucination flag indicator
   - Violation banner if the session was flagged
6. **Analyst adjusts threshold** in `/settings` to tune sensitivity for future sessions

---

## Workflow 4: Batch Upload

This workflow covers uploading and analyzing multiple files at once.

:::info Infographic Placeholder
TODO: Add workflow infographic for the batch upload flow
:::

**Text description of the flow:**

1. **User selects up to 10 JSON files** on the `/upload` page
2. **Shared settings configured** — Analysis mode, analysis types, optional ground truth (same for all files)
3. **Files uploaded sequentially** to `POST /api/upload`, each with a shared `batchId`
   - Per-file status shown inline: Pending → Uploading → Done / Error
   - *Error state:* Individual file fails → marked as error, other files continue
4. **When all files complete** — "View Batch Report" button appears
5. **Batch report at `/batch/[batchId]`** shows:
   - Aggregate KPIs (total issues, detection rates across all files)
   - Per-file results table sorted by issue count
   - Subtype breakdown across all files
   - Link to individual dashboard per file

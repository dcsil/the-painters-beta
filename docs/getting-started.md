---
sidebar_position: 2
title: Getting Started
---

# Getting Started

This guide assumes you have completed the [Setup Guide](/docs/setup) and have Oversight running locally or are using the [live deployment](https://the-painters-product.vercel.app).

## Create Your Account

1. Navigate to `/signup`
2. Enter your email, name (optional), and password (minimum 8 characters)
3. Click **Sign Up** — you will be automatically logged in

:::info Screenshot Placeholder
TODO: Add screenshot of the signup page
:::

---

## Configure Your Settings

Before your first analysis, configure your preferences at `/settings`:

1. **Analysis Mode** — Choose your default LLM provider:
   - **Gemini** — Balanced accuracy using Google Gemini (recommended for most users)
   - **Groq** — Faster analysis using Llama via Groq (requires `GROQ_API_KEY`)
   - **Both** — Runs Gemini first, then Groq cross-checks the results for higher confidence
2. **Analysis Types** — Select which categories to analyze: Hallucination, Bias, Toxicity (all selected by default)
3. **Alert Email** — Enter your email to receive notifications when chat session analyses complete
4. **Bias Threshold** — Set the live monitoring sensitivity (0–100, default 70). A lower threshold triggers violations more easily

:::info Screenshot Placeholder
TODO: Add screenshot of the settings page
:::

---

## Upload Your First Conversation

1. Go to `/upload`
2. Drag and drop a JSON conversation file (see [Input File Format](/docs/setup#input-file-format))
3. Optionally adjust:
   - **Analysis Mode** — Override your default for this upload
   - **Analysis Types** — Select specific categories
   - **Ground Truth** — Choose a knowledge base document for improved accuracy (see [Ground Truth](/docs/features/ground-truth))
4. Click **Upload**
5. Wait on the processing page (up to 60 seconds for the analysis to complete)
6. Review results on the analysis dashboard

:::info Screenshot Placeholder
TODO: Add screenshot of the upload page with a file selected
:::

### Reading the Dashboard

The analysis dashboard has four tabs:

- **Overview** — Summary KPI cards showing detection rates and issue counts per category, with a breakdown bar chart
- **Hallucination** — Flagged turns with subtype (Self-Contradiction, Overconfidence, Fabricated Citation, Hardcoded Fact), reason, and confidence score
- **Bias** — Flagged turns with subtype (Gender, Racial, Age, Stereotyping), reason, and confidence score
- **Toxicity** — Flagged turns with subtype (Hostile Language, Condescension, Inappropriate Content, Profanity) and severity level

:::info Screenshot Placeholder
TODO: Add screenshot of the analysis dashboard with results
:::

---

## Try the Live Chatbot

The chatbot simulates a customer support interaction and is publicly accessible (no login required):

1. Go to `/chat`
2. Type a message as a customer (e.g., *"What are your data plans?"*)
3. The AI assistant replies — each reply is automatically checked for hallucinations and bias in real time
4. The **Monitoring Panel** below the chat shows:
   - A bias score bar (green/yellow/red based on your threshold)
   - Whether a hallucination was detected
5. If a violation is detected (hallucination flagged OR bias score exceeds threshold), the session is automatically ended, a "live agent required" message is shown, and alert emails are sent to all analysts with an alert email configured
6. Otherwise, click **End Chat** when done — this triggers a full analysis of the entire conversation

:::info Screenshot Placeholder
TODO: Add screenshot of the chatbot with monitoring panel visible
:::

---

## Monitor Live Sessions

As an analyst, you can watch active and recent chat sessions in real time:

1. Go to `/monitor`
2. The **left sidebar** shows sessions from the last 30 minutes, refreshing every 30 seconds
3. Click a session to view its full message history and per-message monitoring results
4. Active sessions poll for new messages every 5 seconds
5. Sessions show status badges:
   - **Active** (green pulse) — Currently in progress
   - **Violated** (red) — Ended due to a violation
   - **Ended** (gray) — Completed normally

:::info Screenshot Placeholder
TODO: Add screenshot of the monitoring dashboard with an active session
:::

---

## View Trends & Analytics

Track analysis trends over time at `/trends`:

1. View daily KPI cards (total uploads, total issues, detection rates)
2. Toggle between **Count** and **Rate %** modes on the line chart
3. Select a time range: 7, 30, or 90 days
4. View subtype breakdowns for hallucination, bias, and toxicity categories
5. Compare with the prior period to see trends

:::info Screenshot Placeholder
TODO: Add screenshot of the trends page
:::

---

## View Upload History

See all your past analyses at `/uploads`:

- **Single uploads** appear as individual cards with file name, date, status, and issue count
- **Batch uploads** appear as collapsible cards showing all files in the batch
- Click any upload to view its full analysis dashboard
- Chat-sourced uploads (from the live chatbot) are also listed here for all analysts

---

## Next Steps

- Learn about each detection type: [Hallucination](/docs/features/hallucination-detection), [Bias](/docs/features/bias-detection), [Toxicity](/docs/features/toxicity-detection)
- Explore [Analysis Modes](/docs/features/analysis-modes) to understand the trade-offs between Gemini, Groq, and Both
- Upload [Ground Truth](/docs/features/ground-truth) documents to improve analysis accuracy
- Try [Batch Uploads](/docs/features/batch-uploads) for analyzing multiple files at once
- Set up [Email Alerts](/docs/features/email-alerts) to get notified when chat sessions complete

---
sidebar_position: 5
title: Architecture
---

# Architecture

This page describes the system topology for the Oversight beta release, including all major components, data flows, and external dependencies.

## Architecture Diagram

:::info Diagram Placeholder
TODO: Add architecture diagram image showing the full system topology
:::

---

## System Overview

Oversight is a full-stack Next.js application deployed on Vercel. The application uses the App Router for both the frontend pages and API routes, communicates with external LLM providers for analysis, and stores data in a PostgreSQL database hosted on Neon.

### Core Components

| Component | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 App Router, React 19, Tailwind CSS 4 | All user-facing pages (upload, dashboard, chat, monitor, trends, settings) |
| **API Layer** | Next.js API Routes (serverless) | 18 API endpoints handling auth, uploads, chat, analysis, monitoring, settings |
| **Core Logic** | TypeScript modules in `lib/` | Analysis pipeline, live monitoring, chat reply generation, email alerts, rate limiting |
| **Database** | PostgreSQL via Neon | All persistent data (users, uploads, analyses, chat sessions, settings) |
| **ORM** | Prisma 7 with Neon adapter | Database access with connection pooling |
| **Authentication** | NextAuth.js v5 (beta) | Email/password auth, JWT sessions, bcrypt password hashing |
| **File Storage** | Vercel Blob | Uploaded JSON conversation files |
| **Email** | Resend | Analyst alert notifications |

### External LLM Providers

| Provider | Models | Used For |
|---|---|---|
| **Google Gemini** | `gemini-2.5-flash`, `gemini-3.1-flash-lite` (fallback) | Hallucination, bias, and toxicity analysis in Gemini and Both modes |
| **Groq** | `openai/gpt-oss-120b`, Kimi K2 variants (fallback) | Analysis in Groq and Both modes, live monitoring, chatbot reply generation |

### Data Flow

1. **File Upload Flow**: User → Upload Page → `POST /api/upload` → Vercel Blob (file storage) → `lib/run-analysis.ts` → Gemini/Groq API → Analysis results → PostgreSQL
2. **Chat Flow**: Customer → Chat Page → `POST /api/chat` → Groq (bot reply) → `lib/live-monitor.ts` → Groq (monitoring) → PostgreSQL (message + monitoring data)
3. **Alert Flow**: Chat session completes → `lib/run-analysis.ts` (full analysis) → `lib/send-alert-email.ts` → Resend API → Analyst inbox

---

## Database Schema

The database consists of 9 models:

| Model | Purpose | Key Relations |
|---|---|---|
| **User** | Analyst accounts (email, password hash, name) | Has many: Uploads, Feedbacks, GroundTruths; Has one: UserPreferences |
| **UserPreferences** | Per-user settings (default mode, alert email, bias threshold, T&C acceptance) | Belongs to: User |
| **Upload** | A conversation file upload or chat-sourced analysis | Belongs to: User (optional), GroundTruth (optional); Has many: Analyses; Has one: ChatSession |
| **Analysis** | A single analysis result (e.g., hallucination-gemini) | Belongs to: Upload |
| **ChatSession** | A live chatbot conversation session | Has many: ChatMessages; Has one: Upload |
| **ChatMessage** | A single message in a chat session (with optional monitoring data) | Belongs to: ChatSession |
| **GroundTruth** | A reference document for factual verification | Belongs to: User (optional); Has many: Uploads |
| **Feedback** | In-app user feedback (bug/feature/general) | Belongs to: User |
| **RateLimit** | Per-user/IP rate limiting counters | Unique on: (identifier, type) |

---

## Alpha → Beta Changes

The system topology is unchanged from alpha. The same components (Next.js, Neon PostgreSQL, Vercel Blob, Gemini, Groq, Resend, NextAuth) remain in the same architectural positions.

Beta additions were **functional enhancements** within the existing component structure:

| Enhancement | Type |
|---|---|
| Rate limiting (5/min, 40/day for uploads and chat; 5/min, 20/day for feedback) | New `RateLimit` model + middleware in API routes |
| Terms & Conditions modal | New `UserPreferences` fields (`termsAcceptedAt`, `termsVersion`) |
| In-app feedback button | New `Feedback` model + `POST /api/feedback` endpoint |
| Model fallback chains (Gemini + Groq) | Enhanced `lib/gemini.ts` and `lib/groq.ts` |
| Health endpoint | New `GET /api/health` route |
| Trends count/rate toggle | Enhanced `GET /api/trends` response + frontend toggle |
| GitHub contribution infrastructure | Issue templates, PR template, CONTRIBUTING.md, CODE_OF_CONDUCT.md |
| Beta-readiness documentation | Bug severity audit, security controls review, external tester framework |
| Bug fixes | Trends daily rate calculation, batch upload count, chat interaction inclusion in trends |

No components were added, removed, or re-positioned. No new external services were introduced.

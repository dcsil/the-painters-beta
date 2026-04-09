---
sidebar_position: 1
title: API Overview
slug: /api
---

# API Reference

Oversight exposes 18 RESTful API endpoints via Next.js API Routes. All endpoints are serverless functions deployed on Vercel with a maximum execution time of 120 seconds.

## Base URL

```
https://the-painters-product.vercel.app/api
```

For local development: `http://localhost:3000/api`

## Authentication

Most endpoints require authentication via a NextAuth.js session cookie. Authenticated requests must include the session cookie set during login. Unauthenticated requests to protected endpoints receive a `401 Unauthorized` response.

**Public endpoints** (no authentication required):
- `POST /api/auth/register`
- `POST /api/chat`
- `GET /api/chat/[id]`
- `POST /api/chat/[id]/complete`
- `GET /api/health`

## Rate Limiting

Rate limits are enforced per-user (authenticated) or per-IP (public endpoints):

| Endpoint Group | Minute Limit | Daily Limit | Identifier |
|---|---|---|---|
| Upload (`POST /api/upload`) | 5/min | 40/day | `user:{userId}` |
| Chat (`POST /api/chat`) | 5/min | 40/day | `ip:{clientIP}` |
| Feedback (`POST /api/feedback`) | 5/min | 20/day | `user:{userId}` |

Rate-limited responses return HTTP `429 Too Many Requests` with a `Retry-After` header.

## Endpoint Categories

| Category | Endpoints | Description |
|---|---|---|
| [Authentication](/docs/api/authentication) | 2 | User registration and session management |
| [Uploads](/docs/api/uploads) | 3 | File upload, status, and history |
| [Batch](/docs/api/batch) | 1 | Batch upload grouping |
| [Chat](/docs/api/chat) | 3 | Live chatbot messaging and session management |
| [Ground Truth](/docs/api/ground-truth) | 4 | Knowledge base document management |
| [Settings](/docs/api/settings) | 2 | User preferences |
| [Monitoring & Trends](/docs/api/monitoring) | 2 | Live session monitoring and analytics |
| [System](/docs/api/system) | 2 | Health check and feedback |

## Common Error Responses

| Status Code | Meaning |
|---|---|
| `400` | Bad request — invalid or missing parameters |
| `401` | Unauthorized — session cookie missing or expired |
| `403` | Forbidden — authenticated but not authorized (e.g., accessing another user's upload) |
| `404` | Not found — resource does not exist |
| `429` | Too many requests — rate limit exceeded |
| `500` | Internal server error — unexpected failure |

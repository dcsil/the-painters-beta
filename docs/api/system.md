---
sidebar_position: 9
title: System
---

# System API

## GET /api/health

Health check endpoint to verify system status and external service connectivity.

**Auth:** Public (no authentication required)

**Success Response (200):**

```json
{
  "status": "ok",
  "checks": {
    "db": true,
    "gemini": true,
    "groq": true,
    "blob": true
  }
}
```

**Degraded Response (200):**

```json
{
  "status": "degraded",
  "checks": {
    "db": true,
    "gemini": true,
    "groq": false,
    "blob": true
  }
}
```

**Fields:**

| Field | Description |
|---|---|
| `status` | `"ok"` if all checks pass, `"degraded"` if any check fails |
| `checks.db` | Database connectivity (can connect to Neon PostgreSQL) |
| `checks.gemini` | `GEMINI_API_KEY` environment variable is set |
| `checks.groq` | `GROQ_API_KEY` environment variable is set |
| `checks.blob` | `BLOB_READ_WRITE_TOKEN` environment variable is set |

**Notes:**
- API key checks only verify the environment variable is set, not that the key is valid
- Database check performs an actual connectivity test
- Returns `200` in both `ok` and `degraded` states

---

## POST /api/feedback

Submit in-app feedback (bug reports, feature suggestions, or general comments).

**Auth:** Required

**Rate Limit:** 5/min, 20/day per user

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `category` | string | Yes | `"bug"`, `"feature"`, or `"general"` |
| `message` | string | Yes | Feedback text (max 2000 characters) |

**Example Request:**

```json
{
  "category": "bug",
  "message": "The processing page progress bar jumps from 90% to 100% suddenly"
}
```

**Success Response (200):**

```json
{
  "success": true
}
```

**Error Responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "Category and message are required" }` | Missing fields |
| `400` | `{ "error": "Invalid category" }` | Category not in allowed values |
| `400` | `{ "error": "Message too long (max 2000 characters)" }` | Message exceeds limit |
| `401` | `{ "error": "Unauthorized" }` | Not authenticated |
| `429` | `{ "error": "Rate limit exceeded" }` | Rate limit hit |

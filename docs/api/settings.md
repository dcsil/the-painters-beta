---
sidebar_position: 7
title: Settings
---

# Settings API

## GET /api/settings

Fetch the authenticated user's preferences. Creates default preferences on first access.

**Auth:** Required

**Success Response (200):**

```json
{
  "id": "clxxpref123",
  "userId": "clxxuser123",
  "defaultAnalysisMode": "gemini",
  "defaultAnalyses": "hallucination,bias,toxicity",
  "alertEmail": "analyst@example.com",
  "biasThreshold": 70,
  "termsAcceptedAt": "2026-04-08T12:00:00.000Z",
  "termsVersion": "alpha-1",
  "createdAt": "2026-04-08T12:00:00.000Z",
  "updatedAt": "2026-04-08T12:00:00.000Z"
}
```

**Error Responses:**

| Status | Cause |
|---|---|
| `401` | Not authenticated |

**Notes:**
- Uses upsert — preferences are created with defaults on first access if they don't exist
- Default values: `defaultAnalysisMode: "gemini"`, `defaultAnalyses: "hallucination,bias,toxicity"`, `biasThreshold: 70`

---

## PUT /api/settings

Update the authenticated user's preferences.

**Auth:** Required

**Content-Type:** `application/json`

**Request Body:**

All fields are optional — only include fields you want to update.

| Field | Type | Validation | Description |
|---|---|---|---|
| `defaultAnalysisMode` | string | `"gemini"`, `"groq"`, or `"both"` | Default LLM provider for analysis |
| `defaultAnalyses` | string | Comma-separated: any of `"hallucination"`, `"bias"`, `"toxicity"` | Default analysis categories |
| `alertEmail` | string \| null | Valid email format or empty string to clear | Email address for chat session alert notifications |
| `biasThreshold` | number | 0–100 | Live monitoring bias threshold |
| `termsAccepted` | boolean | `true` only | Accept the Terms & Conditions |

**Example Request:**

```json
{
  "defaultAnalysisMode": "both",
  "alertEmail": "analyst@example.com",
  "biasThreshold": 60
}
```

**Success Response (200):**

```json
{
  "id": "clxxpref123",
  "userId": "clxxuser123",
  "defaultAnalysisMode": "both",
  "defaultAnalyses": "hallucination,bias,toxicity",
  "alertEmail": "analyst@example.com",
  "biasThreshold": 60,
  "termsAcceptedAt": "2026-04-08T12:00:00.000Z",
  "termsVersion": "alpha-1",
  "createdAt": "2026-04-08T12:00:00.000Z",
  "updatedAt": "2026-04-08T14:30:00.000Z"
}
```

**Error Responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "Invalid analysis mode" }` | Mode not in allowed values |
| `400` | `{ "error": "Invalid analysis types" }` | Contains unrecognized analysis type |
| `400` | `{ "error": "Bias threshold must be between 0 and 100" }` | Out of range |
| `401` | `{ "error": "Unauthorized" }` | Not authenticated |

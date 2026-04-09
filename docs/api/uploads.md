---
sidebar_position: 3
title: Uploads
---

# Uploads API

## POST /api/upload

Upload a JSON conversation file and trigger the analysis pipeline.

**Auth:** Required

**Rate Limit:** 5/min, 40/day per user

**Content-Type:** `multipart/form-data`

**Timeout:** 120 seconds (Vercel serverless limit)

**Request Body (FormData):**

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | File | Yes | JSON conversation file (max 5 MB) |
| `fileName` | string | Yes | Original filename |
| `fileSize` | string | Yes | File size in bytes (as string) |
| `analysisMode` | string | No | `"gemini"`, `"groq"`, or `"both"` (defaults to user's default mode) |
| `selectedAnalyses` | string | No | Comma-separated: `"hallucination,bias,toxicity"` (defaults to user's defaults) |
| `groundTruthId` | string | No | CUID of a ground truth document to use as reference |
| `batchId` | string | No | CUID to group multiple uploads in a batch |

**Success Response (200):**

```json
{
  "success": true,
  "uploadId": "clxx1234567890",
  "message": "File uploaded and analysed successfully"
}
```

**Error Responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "No file provided" }` | Missing file in form data |
| `400` | `{ "error": "Invalid JSON file" }` | File is not valid JSON |
| `400` | `{ "error": "Conversation must be an array..." }` | JSON structure doesn't match expected format |
| `400` | `{ "error": "Gemini API key not configured" }` | `GEMINI_API_KEY` not set when using Gemini/Both mode |
| `400` | `{ "error": "Groq API key not configured" }` | `GROQ_API_KEY` not set when using Groq/Both mode |
| `401` | `{ "error": "Unauthorized" }` | Not authenticated |
| `429` | `{ "error": "Rate limit exceeded", "retryAfter": 60 }` | Rate limit hit |
| `500` | `{ "error": "Upload failed" }` | Server error |

**Notes:**
- The file is stored in Vercel Blob storage
- Analysis runs synchronously within the same request (up to 120s)
- If at least one analysis category succeeds, the upload is marked `completed`
- If all categories fail, the upload is marked `failed`

---

## GET /api/upload/[id]

Fetch an upload's status and analysis results.

**Auth:** Required

**URL Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `id` | string | Upload CUID |

**Success Response (200):**

```json
{
  "id": "clxx1234567890",
  "fileName": "1712345678-conversation.json",
  "fileSize": 2048,
  "uploadedAt": "2026-04-08T12:00:00.000Z",
  "status": "completed",
  "errorMessage": null,
  "analysisMode": "gemini",
  "selectedAnalyses": "hallucination,bias,toxicity",
  "source": "upload",
  "batchId": null,
  "analyses": [
    {
      "id": "clxx...",
      "analysisType": "hallucination-gemini",
      "result": "{\"flaggedTurns\": [...], \"summary\": \"...\"}",
      "confidence": 0.85,
      "detectedIssues": 2,
      "createdAt": "2026-04-08T12:00:30.000Z"
    }
  ]
}
```

**Error Responses:**

| Status | Cause |
|---|---|
| `401` | Not authenticated |
| `403` | Upload belongs to another user (non-chat uploads) |
| `404` | Upload not found |

**Notes:**
- Chat-sourced uploads (`source: "chat"`) are accessible to any authenticated analyst
- The `result` field is a JSON string that must be parsed — its structure depends on the analysis type

---

## GET /api/uploads

List all uploads for the authenticated user.

**Auth:** Required

**Success Response (200):**

```json
[
  {
    "id": "clxx1234567890",
    "fileName": "1712345678-conversation.json",
    "fileSize": 2048,
    "uploadedAt": "2026-04-08T12:00:00.000Z",
    "status": "completed",
    "analysisMode": "gemini",
    "selectedAnalyses": "hallucination,bias,toxicity",
    "source": "upload",
    "batchId": null,
    "analyses": [...],
    "chatSession": null
  }
]
```

**Notes:**
- Returns the user's own uploads plus all chat-sourced uploads (visible to all analysts)
- Ordered by `uploadedAt` descending (newest first)
- Includes `analyses` relation and `chatSession` metadata

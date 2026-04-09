---
sidebar_position: 4
title: Batch
---

# Batch API

## GET /api/batch/[batchId]

Fetch all uploads in a batch, grouped by the shared `batchId`.

**Auth:** Required

**URL Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `batchId` | string | Batch CUID (assigned during upload) |

**Success Response (200):**

```json
{
  "uploads": [
    {
      "id": "clxx1111111111",
      "fileName": "1712345678-conversation1.json",
      "fileSize": 1024,
      "uploadedAt": "2026-04-08T12:00:00.000Z",
      "status": "completed",
      "analysisMode": "gemini",
      "selectedAnalyses": "hallucination,bias,toxicity",
      "batchId": "clxxbatch123456",
      "analyses": [
        {
          "id": "clxx...",
          "analysisType": "hallucination-gemini",
          "result": "{...}",
          "confidence": 0.85,
          "detectedIssues": 2,
          "createdAt": "2026-04-08T12:00:30.000Z"
        }
      ]
    },
    {
      "id": "clxx2222222222",
      "fileName": "1712345679-conversation2.json",
      "fileSize": 2048,
      "uploadedAt": "2026-04-08T12:00:05.000Z",
      "status": "completed",
      "analysisMode": "gemini",
      "selectedAnalyses": "hallucination,bias,toxicity",
      "batchId": "clxxbatch123456",
      "analyses": [...]
    }
  ]
}
```

**Error Responses:**

| Status | Cause |
|---|---|
| `401` | Not authenticated |
| `403` | Batch belongs to another user |
| `404` | No uploads found with this batchId |

**Notes:**
- All uploads in the batch must belong to the authenticated user
- Uploads are returned with their full `analyses` relations
- The frontend uses this to render the batch report at `/batch/[batchId]`

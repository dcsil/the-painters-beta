---
sidebar_position: 6
title: Ground Truth
---

# Ground Truth API

## GET /api/ground-truth

List all ground truth documents available to the authenticated user.

**Auth:** Required

**Success Response (200):**

```json
[
  {
    "id": "clxxbuiltin1",
    "name": "TELUS Telecom",
    "fileType": "md",
    "isBuiltIn": true,
    "createdAt": "2026-04-01T00:00:00.000Z",
    "userId": null
  },
  {
    "id": "clxxcustom1",
    "name": "My Company FAQ",
    "fileType": "txt",
    "isBuiltIn": false,
    "createdAt": "2026-04-08T12:00:00.000Z",
    "userId": "clxxuser123"
  }
]
```

**Notes:**
- Returns the user's own ground truths plus all built-in ground truths
- Built-in ground truths are seeded on first access (TELUS Telecom from `data/telus-ground-truth.md`)
- `userId` is `null` for built-in documents

---

## POST /api/ground-truth

Upload a new custom ground truth document.

**Auth:** Required

**Content-Type:** `multipart/form-data`

**Request Body (FormData):**

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | File | Yes | Ground truth document (max 100 KB) |
| `name` | string | Yes | Display name for the document |

**Allowed file types:** `.txt`, `.md`, `.json`

**Success Response (201):**

```json
{
  "id": "clxxcustom2",
  "name": "Healthcare FAQ"
}
```

**Error Responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "Name and file are required" }` | Missing fields |
| `400` | `{ "error": "File type not allowed" }` | Invalid file extension |
| `400` | `{ "error": "File too large (max 100KB)" }` | File exceeds size limit |
| `401` | `{ "error": "Unauthorized" }` | Not authenticated |

---

## GET /api/ground-truth/[id]

Fetch a single ground truth document with its full content.

**Auth:** Required

**URL Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `id` | string | Ground truth CUID |

**Success Response (200):**

```json
{
  "id": "clxxbuiltin1",
  "name": "TELUS Telecom",
  "content": "# TELUS Telecom Facts\n\n## Contact Numbers\n...",
  "fileType": "md",
  "isBuiltIn": true,
  "createdAt": "2026-04-01T00:00:00.000Z",
  "userId": null
}
```

**Error Responses:**

| Status | Cause |
|---|---|
| `401` | Not authenticated |
| `403` | Custom document belongs to another user |
| `404` | Document not found |

**Notes:**
- Built-in ground truths are accessible to all authenticated users
- Custom ground truths are only accessible to their owner

---

## DELETE /api/ground-truth/[id]

Delete a custom ground truth document.

**Auth:** Required

**URL Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `id` | string | Ground truth CUID |

**Success Response (200):**

```json
{
  "success": true
}
```

**Error Responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "Cannot delete built-in ground truth" }` | Attempted to delete a built-in document |
| `401` | `{ "error": "Unauthorized" }` | Not authenticated |
| `403` | `{ "error": "Not authorized" }` | Document belongs to another user |
| `404` | `{ "error": "Ground truth not found" }` | Document doesn't exist |

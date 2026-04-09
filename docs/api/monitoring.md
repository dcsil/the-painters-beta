---
sidebar_position: 8
title: Monitoring & Trends
---

# Monitoring & Trends API

## GET /api/monitor/sessions

List recent chat sessions for the analyst monitoring dashboard.

**Auth:** Required

**Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `since` | string (ISO date) | 30 minutes ago | Only return sessions active after this timestamp |
| `limit` | number | 20 | Number of sessions to return (1–100) |
| `cursor` | string | — | Cursor for pagination (session ID to start after) |

**Success Response (200):**

```json
{
  "sessions": [
    {
      "id": "clxxsession1",
      "createdAt": "2026-04-08T12:00:00.000Z",
      "lastActivityAt": "2026-04-08T12:05:00.000Z",
      "endedAt": null,
      "endedReason": null,
      "messageCount": 6,
      "lastMessage": "We offer several data plans starting from..."
    },
    {
      "id": "clxxsession2",
      "createdAt": "2026-04-08T11:50:00.000Z",
      "lastActivityAt": "2026-04-08T11:55:00.000Z",
      "endedAt": "2026-04-08T11:55:30.000Z",
      "endedReason": "violation",
      "messageCount": 4,
      "lastMessage": "Live agent required..."
    }
  ],
  "nextCursor": "clxxsession3"
}
```

**Fields:**

| Field | Description |
|---|---|
| `endedAt` | `null` if session is still active |
| `endedReason` | `"user"` (normal end), `"violation"` (auto-ended), or `null` (active) |
| `messageCount` | Total messages in the session |
| `lastMessage` | Truncated preview of the last message content |
| `nextCursor` | Pass as `cursor` in next request for pagination |

**Error Responses:**

| Status | Cause |
|---|---|
| `401` | Not authenticated |

---

## GET /api/trends

Fetch aggregate analytics data for the trends dashboard.

**Auth:** Required

**Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `days` | number | 30 | Number of days to analyze (1–365) |

**Success Response (200):**

```json
{
  "dailyData": [
    {
      "date": "2026-04-08",
      "uploadCount": 5,
      "totalIssues": 12,
      "hallucinationRate": 0.15,
      "biasRate": 0.08,
      "toxicityRate": 0.03,
      "hallucinationFlagged": 3,
      "biasFlagged": 2,
      "toxicityFlagged": 1
    }
  ],
  "subtypeBreakdown": {
    "hallucination": {
      "SELF_CONTRADICTION": 5,
      "OVERCONFIDENCE": 3,
      "FABRICATED_CITATION": 8,
      "HARDCODED_FACT": 2
    },
    "bias": {
      "GENDER_BIAS": 4,
      "RACIAL_BIAS": 1,
      "AGE_BIAS": 2,
      "STEREOTYPING": 3
    },
    "toxicity": {
      "HOSTILE_LANGUAGE": 1,
      "CONDESCENSION": 3,
      "INAPPROPRIATE_CONTENT": 0,
      "PROFANITY": 1
    }
  },
  "totals": {
    "uploads": 42,
    "issues": 120,
    "hallucinationRate": 0.12,
    "biasRate": 0.06,
    "toxicityRate": 0.02,
    "priorPeriod": {
      "uploads": 38,
      "issues": 95,
      "hallucinationRate": 0.14,
      "biasRate": 0.07,
      "toxicityRate": 0.03
    }
  }
}
```

**Fields:**

| Field | Description |
|---|---|
| `dailyData` | Array of daily buckets with counts and rates |
| `subtypeBreakdown` | Aggregate counts by issue subtype across the entire period |
| `totals` | Period totals and rates |
| `totals.priorPeriod` | Same metrics for the preceding period (for comparison) |

**Notes:**
- Rates are calculated as (flagged turns / total turns analyzed)
- Includes both file uploads and chat-sourced analyses
- `priorPeriod` covers the same number of days immediately before the selected range

**Error Responses:**

| Status | Cause |
|---|---|
| `400` | `days` parameter out of range (1–365) |
| `401` | Not authenticated |

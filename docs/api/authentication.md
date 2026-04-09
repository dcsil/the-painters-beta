---
sidebar_position: 2
title: Authentication
---

# Authentication API

## POST /api/auth/register

Create a new analyst account.

**Auth:** Public (no authentication required)

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | string | Yes | Email address (must be unique) |
| `password` | string | Yes | Password (minimum 8 characters) |
| `name` | string | No | Display name |

**Success Response (201):**

```json
{
  "success": true
}
```

**Error Responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{ "error": "Email and password are required" }` | Missing fields |
| `400` | `{ "error": "Password must be at least 8 characters" }` | Password too short |
| `409` | `{ "error": "Email already in use" }` | Duplicate email |
| `500` | `{ "error": "Failed to register" }` | Server error |

**Notes:**
- Passwords are hashed with bcrypt (12 rounds) before storage
- After registration, use the NextAuth sign-in endpoint to obtain a session

---

## GET/POST /api/auth/[...nextauth]

NextAuth.js session handler. Manages sign-in, sign-out, session validation, and CSRF token generation.

**Auth:** Varies by operation

This is a catch-all route handled by NextAuth.js. The primary sub-routes are:

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/signin` | GET/POST | Sign in with credentials |
| `/api/auth/signout` | POST | Sign out and clear session |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/csrf` | GET | Get CSRF token |

**Sign-In Request:**

```
POST /api/auth/callback/credentials
Content-Type: application/x-www-form-urlencoded

email=analyst@example.com&password=mypassword&csrfToken=...
```

**Session Response (GET /api/auth/session):**

```json
{
  "user": {
    "id": "clxx...",
    "email": "analyst@example.com",
    "name": "Jane Doe"
  },
  "expires": "2026-05-08T..."
}
```

**Notes:**
- Sessions use JWT stored in an HTTP-only cookie
- Session strategy: JWT (no database sessions)
- Custom sign-in page: `/login`

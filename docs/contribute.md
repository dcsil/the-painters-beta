---
sidebar_position: 9
title: Contributing
---

# Contributing to Oversight

We welcome contributions from the community. This page explains how to report bugs, suggest features, and contribute code to Oversight.

---

## Filing a Bug Report

If you find a bug, please file an issue using our bug report template:

**[File a Bug Report](https://github.com/dcsil/the-painters-product/issues/new?template=bug_report.yml)**

The template will ask you to provide:
- **Bug description** — What happened vs. what you expected
- **Severity** — Critical, High, Medium, or Low
- **Environment** — Production, Preview, or Local
- **Analysis mode** — Which mode(s) were you using (Gemini, Groq, Both)
- **Workaround** — If you found a way around the issue

---

## Suggesting a Feature

Have an idea for improving Oversight? File a feature suggestion:

**[Suggest a Feature](https://github.com/dcsil/the-painters-product/issues/new?template=suggestion.yml)**

The template will ask you to describe:
- The problem your suggestion solves
- Your proposed solution
- Alternative approaches you considered
- Which roadmap items it aligns with (if any)

---

## Triage SLA

We follow a structured triage process for all incoming issues:

| Metric | Target |
|---|---|
| **First response** | Within 24 hours (acknowledgment + initial labels) |
| **Triage decision** | Within 72 hours (severity assigned + milestone set) |

### Fix Timelines by Severity

| Severity | Response |
|---|---|
| **Critical** | Deployed fix within 48 hours |
| **High** | Fixed in the next sprint |
| **Medium** | Added to backlog, scheduled based on capacity |
| **Low** | No deadline — addressed as time permits |

---

## Issue Lifecycle

Every issue follows this lifecycle:

```
needs-triage → triaged → in-progress → resolved (or wont-fix)
```

1. **needs-triage** — Newly filed, awaiting team review
2. **triaged** — Severity and milestone assigned
3. **in-progress** — A team member is actively working on it
4. **resolved** — Fix is merged and deployed, OR **wont-fix** — Deferred with explanation

---

## Contributing Code

### Branch Naming

| Prefix | Use |
|---|---|
| `fix/<description>` | Bug fixes |
| `feat/<description>` | New features |
| `docs/<description>` | Documentation changes |
| `chore/<description>` | Maintenance, dependencies |

### Pull Request Process

1. Fork the repository or create a branch from `main`
2. Make your changes following existing code conventions
3. Fill out the [PR template](https://github.com/dcsil/the-painters-product/blob/main/.github/PULL_REQUEST_TEMPLATE.md) — includes a testing checklist
4. Ensure:
   - `npm run lint` passes
   - `npm run build` succeeds
   - Dev server starts without errors
   - Smoke test your changes manually
5. Request review — at least 1 approval required
6. No direct pushes to `main`

### Schema Changes

If your change modifies the database schema:
1. Create a migration: `npx prisma migrate dev --name your_migration_name`
2. Test the migration with a fresh database
3. Document any new environment variables in the README and CLAUDE.md

### Security Issues

Report security vulnerabilities **privately** to the team — do not file a public issue. See [CONTRIBUTING.md](https://github.com/dcsil/the-painters-product/blob/main/CONTRIBUTING.md) for details.

---

## Project Guidelines

For the full contribution guidelines, including development setup and testing procedures:

- **[CONTRIBUTING.md](https://github.com/dcsil/the-painters-product/blob/main/CONTRIBUTING.md)** — Development setup, testing, PR process, and triage SLA
- **[CODE_OF_CONDUCT.md](https://github.com/dcsil/the-painters-product/blob/main/CODE_OF_CONDUCT.md)** — Community standards, expected behavior, and reporting process

---

## External Contribution Evidence (Section 4.3)

This section documents the lifecycle of an externally filed issue — from initial report through team response to resolution.

:::warning TODO
This section will be populated once an external contributor files an issue on the repository.

**Planned evidence:**
- Link to the filed external issue
- Team's first response (within 24h SLA)
- Triage decision and resolution/deferral reasoning

**Suggested issue:** A bug report about the simulated processing progress bar (known issue BUG-001) — the progress animation does not reflect actual backend analysis progress, which can be misleading for users.
:::

### External Issue

- **Issue:** TODO — Link to the filed GitHub issue
- **Filed by:** TODO — External contributor username
- **Date filed:** TODO

### Team Response

- **First response:** TODO — Within \_\_ hours
- **Response details:** TODO — Description of acknowledgment and triage

### Resolution

- **Decision:** TODO — Fix, defer, or wont-fix with reasoning
- **PR:** TODO — Link to PR if applicable
- **Date resolved:** TODO

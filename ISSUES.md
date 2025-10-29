# Project Issues, Improvements, and Enhancements

This document tracks current gaps, known issues, and proposed enhancements across the backend, frontend, landing site, and DevOps.

## Backend (FastAPI)
- Replace mock `/query` response with real AI agent/service integration.
- Make CORS origins configurable via environment variables; avoid hardcoding `http://localhost:3000`.
- Add structured logging and request IDs; configure log levels via env.
- Input validation: stricter Pydantic request/response models; size limits.
- Error handling: standardized error responses and exception handlers.
- Testing: add pytest suite and CI; contract tests for `/query`.
- Security: rate limiting, security headers, basic auth/session (if required).
- Observability: health/readiness/metrics; control OpenAPI docs exposure in prod.
- Packaging/Run: `Dockerfile`, optional `docker-compose` (with frontend and proxy).
- Config: `.env` schema; `ALLOWED_ORIGINS`, `PORT`, `LOG_LEVEL`, provider keys.

## Frontend (Next.js 16 / React 19)
- Env: document/validate `NEXT_PUBLIC_API_URL`; dev/prod examples.
- Chat: streaming UI, graceful cancellation, better error toasts.
- State: persist conversation history (localStorage or backend); wire `/history`.
- Auth: implement login/register flows (pages are placeholders).
- Accessibility: focus states, landmarks, reduced motion option.
- Performance: code-splitting, defer heavy libs; image optimization (non-export mode).
- Theming: ensure consistent dark mode and contrast.
- Testing: unit (RTL/Jest) and E2E (Playwright/Cypress); ESLint ruleset hardening.
- Deployment: document static export and `NEXT_PUBLIC_BASE_PATH` usage.

## Landing (Static HTML/CSS/JS)
- Link buttons to frontend `/chat` when hosted.
- Optimize assets; add OG/Twitter social images.
- SEO: sitemap, robots; improved meta when domain is final.
- Lighthouse: performance and accessibility passes.
- Decide to keep separate or migrate into Next app with clear deploy.

## DevOps / Tooling
- CI: GitHub Actions for lint, type-check, tests on PRs.
- CD: deployment jobs for chosen hosting; Pages export for static hosting.
- Pre-commit: format, lint, secrets scan hooks.
- Dependency hygiene: Dependabot/Renovate for npm and Python.
- Containers: add `docker-compose` for local dev.

## Documentation
- Expand root README with production config and security checklist.
- Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Provide `.env.example` files for backend and frontend.

## Nice-to-haves
- Telemetry banner and opt-in analytics (privacy-first) on frontend.
- Feature flags for experimental UI/agent capabilities.
- Internationalization scaffolding.

---

Track individual items in GitHub Issues and link back to this file for context.

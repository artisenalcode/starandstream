# Star and Stream — Agent Guidelines

This document provides essential context for AI agents working in this repository.

## Project Overview

- **Stack**: Astro, React (UI components), Tailwind CSS, Vite+
- **Package Manager**: Bun
- **Toolchain**: Vite+ (`vp` command)
- **Infrastructure**: Running inside a Podman container on VPS.

## Key Architectures

### 1. Form Submissions & Reverse Proxy
All contact form (`/api/contact`) and pre-registration (`/api/register`) POST submissions are reverse-proxied by Nginx on the host directly to a centralized **`form-api`** container:
- Proxy endpoint: `http://form-api:3000/submit/starandstream`
- The `form-api` container reads SMTP credentials dynamically from this site's host `.env` file to handle validations, rate limiting, and email dispatch securely.

## Guidelines & Rules

- **No Commit Footers**: Do not append automated attribution lines (such as "Generated with Crush") to git commit messages or PR bodies.
- **Vite+ Usage**: Ensure you run `vp check` or `vp test` to lint, format, typecheck, and test modifications before concluding work.
- **Indentation & Formatting**: Maintain existing aesthetic spacing, coding styles, and standards.

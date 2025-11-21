# Frontend Architecture · Marengo Decor Estimation Studio

This document describes the architectural decisions behind the Marengo Decor
estimation studio. The goal is not to mirror a full-scale product, but to
showcase practices expected from a **Senior Front-End Engineer** working with
**Next.js 16, React 19, TypeScript, React Query, Zustand and Tailwind**.

---

## 1. High-Level Goals

The project was designed around a few explicit goals:

1. **Separation of concerns**  
   - Isolate routing, state, domain models, API logic and UI primitives.
   - Keep each layer small and composable.

2. **Typed server communication**  
   - Use TypeScript to model client ↔ server contracts.
   - Ensure API routes and consumers stay in sync via shared types.

3. **Clear server vs. client boundaries**  
   - Leverage App Router, server components and client components consciously.
   - Only mark components as `"use client"` when needed (state, hooks, events).

4. **Demonstrate real-world patterns in a small codebase**  
   - Route groups for feature separation.
   - Route-scoped providers (React Query).
   - Domain-oriented folder structure.
   - Minimal but coherent design system.

---

## 2. Routing & Layouts

### 2.1 App Router Structure

```txt
src/app
├─ layout.tsx                  # Root layout (server component)
├─ page.tsx                    # Home: entry point for estimator + login
├─ api/
│   └─ calculate/route.ts      # API route for estimations
├─ (public)/
│   └─ login/page.tsx          # Public login route (client component)
└─ (budget)/
    ├─ layout.tsx              # Layout for the budget segment (client)
    └─ budget/page.tsx         # Estimator page (client)
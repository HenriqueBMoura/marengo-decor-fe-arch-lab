# Marengo Decor · Frontend Architecture Lab

Internal estimation studio for curtains and blinds built with **Next.js 16**,  
designed as a **frontend architecture lab** to practise skills expected from a  
Senior Front-End Engineer (React / Next.js / TypeScript).

The goal is not to ship a production app, but to demonstrate:

- Clean **application architecture** on top of the App Router
- Separation of **UI, state and API layers**
- Typed communication between **server routes and client components**
- Usage of **React Query** and **Zustand** in a modern Next.js setup
- A small, composable **Tailwind-based design system**

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, React Compiler enabled)
- **Language:** TypeScript
- **Routing:** App Router with **route groups** `/(public)` and `/(budget)`
- **State Management:**
  - **React Query** (server state, mutations)
  - **Zustand** (local UI state for forms)
- **Styling:** Tailwind CSS + minimal UI primitives
- **Build Tooling:** pnpm, ESLint

---

## High-level Architecture

The app is intentionally small but structured like a real-world product.

### Routing & Layouts

```txt
src/app
├─ layout.tsx                  # Root layout (fonts, global shell)
├─ page.tsx                    # Home: entry to /budget and /login
├─ api/
│   └─ calculate/route.ts      # Typed estimation API
├─ (public)/
│   └─ login/page.tsx          # Public login route (bypass → /budget)
└─ (budget)/
    ├─ layout.tsx              # React Query provider scoped to this segment
    └─ budget/page.tsx         # Estimation screen
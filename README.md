# Marengo Decor · Frontend Architecture Lab

Internal estimation studio for curtains and blinds built with **Next.js 16**,  
designed as a **frontend architecture lab** to practise skills expected from a  
Senior Front-End Engineer (React / Next.js / TypeScript).

The goal is not to ship a production app, but to demonstrate:

- Clean **application architecture** on top of the App Router  
- Separation of **UI, state and API layers**  
- Typed communication between **server routes and client components**  
- Usage of **React Query** and **Zustand** in a modern Next.js setup  
- A small, composable **Tailwind-based design system** with semantic tokens  

---

## 1. Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, React Compiler enabled)
- **Language:** TypeScript
- **Routing:** App Router with route groups `/(public)` and `/(budget)`
- **State Management:**
  - **React Query** — server state and mutations
  - **Zustand** — local UI form state
- **Styling:** Tailwind CSS + minimal UI primitives + design tokens  
- **Build Tooling:** pnpm, ESLint

---

## 2. High-level Architecture

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
```
---

Key decisions:

- Route groups split public vs feature routes.  
- Feature-scoped layout wires React Query only where required.  
- Components are marked `"use client"` only when necessary (state, effects, events).  

---

## 3. Design Tokens & Theming System

The project includes a **fully token-based light/dark theme architecture**, designed to match Marengo Decor's brand palette while ensuring WCAG-compliant contrast.

### 3.1 Key Characteristics

- Semantic, CSS variable–based tokens:
  - `--background`, `--surface`, `--surface-soft`, `--border`
  - `--text-primary`, `--text-muted`
  - `--brand`, `--brand-soft`, `--brand-foreground`
  - `--ring`, `--success`, `--destructive`
- Tailwind config maps these tokens into utility classes  
  (`bg-background`, `text-text-primary`, `border-border`, etc.)
- Eliminates raw hex colors from UI components  
- Ensures consistent theming across all screens

---

### 3.2 Theming Runtime

The dedicated **ThemeProvider** is responsible for:

- Synchronizing the theme with `localStorage`
- Applying or removing the `dark` class on `<html>` to ensure SSR compatibility  
- Preventing hydration issues through controlled theme initialization
- Exposing a clean API for toggling modes

A refined **ThemeToggle** component provides:

- Sliding indicator with smooth transitions  
- Accessible keyboard navigation (Space / Enter)
- Optimized icons for light/dark modes  
- Brand-consistent color application  

---

### 3.3 Updated UI Primitives

All UI primitives—`Button`, `Input`, `Select`, `Card`—were refactored to use semantic tokens.

This ensures:

- Consistent spacing & elevation  
- Predictable dark/light mode behavior  
- Improved focus states using `--ring`  
- Brand-aware interaction patterns  
- Unified styling across Login and Budget pages  

These updates establish the foundation for a scalable design system as the app evolves.

---

## 4. Folder Structure (High-Level Overview)

```txt

src/
├─ app/                        # App Router: routing & layouts
├─ components/
│   ├─ ui/                     # Token-based UI primitives
│   ├─ theme/                  # ThemeProvider + ThemeToggle
│   └─ icons/                  # Shared icon components
├─ data/                       # Static material data
├─ lib/
│   ├─ types/                  # Domain models
│   ├─ hooks/                  # React Query hooks
│   └─ state/                  # Zustand stores
└─ e2e/                        # Playwright tests
```

---

---

## 5. Estimation Engine (API)

`/api/calculate/route.ts` exposes a typed endpoint:

- Receives width, height, material ID
- Validates request payload
- Computes area in m²
- Returns detailed pricing using material rates
- Enforces type-safety between client and server

React Query handles:

- Request lifecycle  
- Loading & error states  
- Reset behavior  

---

## 6. Pages

### 6.1 Login Page

- Public route under `/(public)`  
- Mock authentication; always redirects to `/budget`  
- Uses the new design system + Card layout  
- Demonstrates public vs feature separation  

### 6.2 Budget Estimator Page

- Located under `/(budget)`  
- Form with width/height/material  
- Zustand for UI state  
- React Query mutation for submitting estimation requests  
- Fully typed results panel showing:
  - Material name
  - Area (m²)
  - Price per m²
  - Total estimate  

---

## 7. Testing (Playwright)

Playwright is configured with:

- Page Objects  
- Fixtures  
- E2E flows covering:
  - Login redirect logic  
  - Form interaction  
  - Estimation calculation  
  - Error handling  

Commands:

```bash
pnpm test:e2e
pnpm test:e2e:ui



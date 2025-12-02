"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/budget"); // mocked auth
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-soft">
        {/* Top bar with brand label + theme switch */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Marengo Decor · Frontend Architecture
          </p>
          <ThemeToggle />
        </div>

        {/* Header */}
        <header className="mb-6 space-y-1">
          <h1 className="text-display-2 text-balance font-semibold text-text-primary">
            Sign in to dashboard
          </h1>
          <p className="text-sm text-text-muted leading-relaxed max-w-sm">
            This route is used to practise public vs. feature segments.
            Submitting the form intentionally redirects straight into the
            estimator.
          </p>
        </header>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="font-medium text-text-primary">
              Work email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-md border border-border bg-surface-soft px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="font-medium text-text-primary">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-border bg-surface-soft px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand focus:ring-2 focus:ring-brand"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:bg-brand-soft"
          >
            Sign in and go to estimator
          </button>
        </form>

        {/* Footer text */}
        <p className="mt-6 text-xs leading-relaxed text-text-muted">
          Authentication is intentionally mocked. Submitting this form redirects
          to <code className="text-text-primary">/budget</code> so the focus stays
          on routing, layouts and frontend architecture rather than auth
          implementation.
        </p>
      </div>
    </main>
  );
}
"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // bypass fake auth → go straight to budget estimator
    router.push("/budget");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <header className="mb-6 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Marengo Decor · Frontend Architecture
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Sign in to dashboard
          </h1>
          <p className="text-sm text-neutral-500">
            This route is used to practise public vs. feature segments. Submitting
            the form intentionally redirects straight into the estimator.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1 text-sm">
            <label className="font-medium text-neutral-800" htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="font-medium text-neutral-800" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Sign in and go to estimator
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          Authentication is intentionally mocked. Submitting this form redirects to{" "}
          <code>/budget</code> so the focus stays on routing, layouts and frontend
          architecture rather than auth implementation.
        </p>
      </div>
    </main>
  );
}
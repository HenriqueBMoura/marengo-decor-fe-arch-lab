"use client";

import type React from "react";
import { ReactQueryProvider } from "@/lib/api/react-query-provider";
import { AppHeader } from "@/components/layout/app-header";

export default function BudgetGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <div className="min-h-screen bg-background text-text-primary">
        <div className="container py-page-y">
          <AppHeader />
          {children}
        </div>
      </div>
    </ReactQueryProvider>
  );
}
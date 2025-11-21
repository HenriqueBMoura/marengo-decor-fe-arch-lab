"use client";

import { ReactQueryProvider } from "@/lib/api/react-query-provider";

export default function BudgetGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Everything under /budget will have React Query context
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
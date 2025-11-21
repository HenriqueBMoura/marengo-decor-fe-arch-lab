"use client";

import { useMutation } from "@tanstack/react-query";
import type { BudgetRequest, BudgetResponse } from "@/lib/types/budget";

export function useCalculateBudget() {
  return useMutation<BudgetResponse, Error, BudgetRequest>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erro ao calcular orçamento");
      }

      return res.json() as Promise<BudgetResponse>;
    },
  });
}
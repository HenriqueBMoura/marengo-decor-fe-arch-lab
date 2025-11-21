import { create } from "zustand";

type BudgetField = "width" | "height" | "materialId";

interface BudgetState {
  width: string;
  height: string;
  materialId: string;
  setField: (field: BudgetField, value: string) => void;
  reset: () => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  width: "",
  height: "",
  materialId: "",
  setField: (field, value) => set({ [field]: value } as Partial<BudgetState>),
  reset: () => set({ width: "", height: "", materialId: "" }),
}));
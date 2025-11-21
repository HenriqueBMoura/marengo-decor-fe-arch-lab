export interface BudgetRequest {
  widthCm: number;
  heightCm: number;
  materialId: string;
}

export interface BudgetResponse {
  materialName: string;
  areaM2: number;
  pricePerM2: number;
  total: number;
}
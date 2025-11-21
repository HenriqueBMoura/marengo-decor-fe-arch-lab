import { NextRequest, NextResponse } from "next/server";
import { materials } from "@/data/materials";
import type { BudgetRequest, BudgetResponse } from "@/lib/types/budget";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<BudgetRequest>;

  if (
    !body.widthCm ||
    !body.heightCm ||
    !body.materialId ||
    body.widthCm <= 0 ||
    body.heightCm <= 0
  ) {
    return NextResponse.json(
      { message: "Parâmetros inválidos para cálculo" },
      { status: 400 },
    );
  }

  const material = materials.find((m) => m.id === body.materialId);

  if (!material) {
    return NextResponse.json({ message: "Material não encontrado" }, { status: 400 });
  }

  const areaM2 = (body.widthCm * body.heightCm) / 10000;
  const total = areaM2 * material.pricePerSquareMeter;

  const response: BudgetResponse = {
    materialName: material.name,
    areaM2: Number(areaM2.toFixed(2)),
    pricePerM2: material.pricePerSquareMeter,
    total: Number(total.toFixed(2)),
  };

  return NextResponse.json(response);
}
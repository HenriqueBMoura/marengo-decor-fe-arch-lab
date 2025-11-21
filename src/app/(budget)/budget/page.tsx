"use client";

import { useBudgetStore } from "@/lib/state/budgetStore";
import { useCalculateBudget } from "@/lib/hooks/useCalculateBudget";
import { materials } from "@/data/materials";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BudgetPage() {
  const { width, height, materialId, setField, reset } = useBudgetStore();
  const calc = useCalculateBudget();

  const canSubmit =
    width.trim() !== "" && height.trim() !== "" && materialId.trim() !== "";

  const handleCalculate = () => {
    if (!canSubmit) return;

    calc.mutate({
      widthCm: Number(width),
      heightCm: Number(height),
      materialId,
    });
  };

  const hasResult = !!calc.data;

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-neutral-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Marengo Decor · Estimation Studio
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Curtain & blinds estimator
              </h1>
              <p className="max-w-xl text-sm text-neutral-400">
                Internal tool used to quickly estimate pricing based on opening
                dimensions and material. Built to practice frontend
                architecture, state management and server interaction in
                Next.js 16.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Left column – form */}
          <Card className="bg-white/95 text-neutral-900">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Opening & material
                </h2>
                <p className="text-xs text-neutral-500">
                  Dimensions are entered in centimeters and converted to square
                  meters on the server.
                </p>
              </div>

              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-50">
                v1 · Architecture lab
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Width (cm)"
                inputMode="decimal"
                value={width}
                onChange={(e) => setField("width", e.target.value)}
                placeholder="e.g. 250"
              />
              <Input
                label="Height (cm)"
                inputMode="decimal"
                value={height}
                onChange={(e) => setField("height", e.target.value)}
                placeholder="e.g. 260"
              />
            </div>

            <div className="mt-4">
              <Select
                label="Material"
                value={materialId}
                onChange={(e) => setField("materialId", e.target.value)}
              >
                <option value="">Select a material</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — R$ {m.pricePerSquareMeter}/m²
                  </option>
                ))}
              </Select>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={handleCalculate}
                disabled={!canSubmit || calc.isPending}
              >
                {calc.isPending ? "Calculating..." : "Calculate estimate"}
              </Button>

              <Button
                type="button"
                className="border border-neutral-300 bg-transparent text-sm font-medium text-neutral-950 hover:bg-neutral-100 hover:text-white"
                onClick={() => {
                  reset();
                  calc.reset();
                }}
              >
                Clear form
              </Button>
            </div>

            {calc.isError && (
              <p className="mt-3 text-xs text-red-600">
                Something went wrong while calculating the estimate. Please try
                again.
              </p>
            )}

            <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">
              This form intentionally keeps the UX simple to focus on
              architecture: server/client boundaries, React Query for server
              state, Zustand for UI state, and a small Tailwind-based design
              system.
            </p>
          </Card>

          {/* Right column – result / empty state */}
          <Card className="bg-neutral-900/40 text-neutral-50">
            {hasResult ? (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  Estimate summary
                </h2>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-neutral-400">Material:</span>{" "}
                    <span className="font-medium text-white">
                      {calc.data!.materialName}
                    </span>
                  </p>
                  <p>
                    <span className="text-neutral-400">Total area:</span>{" "}
                    <span className="font-medium text-white">
                      {calc.data!.areaM2.toFixed(2)} m²
                    </span>
                  </p>
                  <p>
                    <span className="text-neutral-400">Unit price:</span>{" "}
                    <span className="font-medium text-white">
                      R$ {calc.data!.pricePerM2.toFixed(2)} / m²
                    </span>
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-neutral-50 px-4 py-3 text-neutral-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Estimated total
                  </p>
                  <p className="text-2xl font-semibold">
                    R$ {calc.data!.total.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    This is a simulated value. Final pricing may include labour,
                    hardware and on-site adjustments.
                  </p>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-neutral-400">
                  From an architecture perspective, this panel consumes only the
                  typed API response, keeping all calculation logic on the
                  server. This makes it easier to evolve pricing rules without
                  touching the UI.
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col items-start justify-center gap-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  No estimate yet
                </p>
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  Fill the form to generate an estimate
                </h2>
                <p className="text-sm text-neutral-400">
                  Once you provide width, height and material, the server will
                  calculate the area in m² and return a fully typed estimate
                  object for this panel to render.
                </p>
              </div>
            )}
          </Card>
        </section>
      </div>
    </main>
  );
}
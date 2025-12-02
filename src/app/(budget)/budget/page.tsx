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

  // Layout shell (background, container, header) is handled by (budget)/layout.tsx
  return (
    <>
      <header className="mb-8 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-2">
            <h1 className="text-display-2 font-semibold">
              Curtain &amp; blinds estimator
            </h1>
            <p className="text-sm text-text-muted">
              Internal tool used to quickly estimate pricing based on opening
              dimensions and material. Built to practise frontend architecture,
              state management and server interaction in Next.js 16.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="rounded-full border border-border px-3 py-1 uppercase tracking-[0.18em]">
              v1 · Architecture lab
            </span>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Left column – form */}
        <Card className="space-y-5 border border-border bg-surface shadow-soft">
          <div className="space-y-1">
            <h2 className="text-heading-lg font-semibold">Opening &amp; material</h2>
            <p className="text-xs text-text-muted">
              Dimensions are entered in centimeters and converted to square
              meters on the server.
            </p>
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

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              onClick={handleCalculate}
              disabled={!canSubmit || calc.isPending}
            >
              {calc.isPending ? "Calculating..." : "Calculate estimate"}
            </Button>

            <Button
              type="button"
              className="border border-border bg-transparent text-sm font-medium text-text-muted hover:bg-surface-soft hover:text-text-primary"
              onClick={() => {
                reset();
                calc.reset();
              }}
            >
              Clear form
            </Button>
          </div>

          {calc.isError && (
            <p className="text-xs text-destructive">
              Something went wrong while calculating the estimate. Please try again.
            </p>
          )}

          <p className="text-[11px] leading-relaxed text-text-muted">
            This form intentionally keeps the UX simple to focus on architecture:
            server/client boundaries, React Query for server state, Zustand for UI
            state, and a small Tailwind-based design system.
          </p>
        </Card>

        {/* Right column – result / empty state */}
        <Card className="border border-border bg-surface-soft shadow-soft">
          {hasResult ? (
            <div className="space-y-4">
              <h2 className="text-heading-lg font-semibold">Estimate summary</h2>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-text-muted">Material:</span>{" "}
                  <span className="font-medium">
                    {calc.data!.materialName}
                  </span>
                </p>
                <p>
                  <span className="text-text-muted">Total area:</span>{" "}
                  <span className="font-medium">
                    {calc.data!.areaM2.toFixed(2)} m²
                  </span>
                </p>
                <p>
                  <span className="text-text-muted">Unit price:</span>{" "}
                  <span className="font-medium">
                    R$ {calc.data!.pricePerM2.toFixed(2)} / m²
                  </span>
                </p>
              </div>

              <div className="mt-3 rounded-lg bg-surface px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Estimated total
                </p>
                <p className="text-2xl font-semibold">
                  R$ {calc.data!.total.toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  This is a simulated value. Final pricing may include labour,
                  hardware and on-site adjustments.
                </p>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-text-muted">
                From an architecture perspective, this panel consumes only the
                typed API response, keeping all calculation logic on the server.
                This makes it easier to evolve pricing rules without touching the UI.
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center gap-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                No estimate yet
              </p>
              <h2 className="text-heading-lg font-semibold">
                Fill the form to generate an estimate
              </h2>
              <p className="text-sm text-text-muted">
                Once you provide width, height and material, the server calculates
                the area in m² and returns a fully typed estimate object for this
                panel to render.
              </p>
            </div>
          )}
        </Card>
      </section>
    </>
  );
}
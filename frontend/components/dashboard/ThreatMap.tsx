import type { RiskLevel, Threat } from "@/lib/types";
import { EmptyState, ErrorBanner, LoadingSkeleton } from "./PanelStates";

const PUNE_BOUNDS = {
  minLat: 18.48,
  maxLat: 18.62,
  minLng: 73.72,
  maxLng: 73.94,
};

function toPosition(latitude: number, longitude: number) {
  const x =
    ((longitude - PUNE_BOUNDS.minLng) /
      (PUNE_BOUNDS.maxLng - PUNE_BOUNDS.minLng)) *
    100;
  const y =
    ((PUNE_BOUNDS.maxLat - latitude) /
      (PUNE_BOUNDS.maxLat - PUNE_BOUNDS.minLat)) *
    100;

  return {
    left: `${Math.min(94, Math.max(6, x))}%`,
    top: `${Math.min(90, Math.max(10, y))}%`,
  };
}

const pinColor: Record<RiskLevel, string> = {
  CRITICAL: "bg-critical",
  HIGH: "bg-high",
  MEDIUM: "bg-medium",
  LOW: "bg-low",
};

export function ThreatMap({
  threats,
  selectedThreatId,
  onSelectThreat,
  isLoading,
  error,
}: {
  threats: Threat[];
  selectedThreatId: string | null;
  onSelectThreat: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}) {
  return (
    <section className="relative flex h-full min-h-[50vh] flex-col overflow-hidden rounded-lg border border-border bg-panel">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted">
          PUNE OPERATIONS MAP
        </h2>
        <span className="font-mono text-[10px] text-muted">
          PLACEHOLDER · MAPBOX LATER
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        {error ? (
          <div className="absolute inset-x-3 top-3 z-10">
            <ErrorBanner message={error} />
          </div>
        ) : null}
        {isLoading ? (
          <div className="p-3">
            <LoadingSkeleton />
          </div>
        ) : threats.length === 0 ? (
          <div className="flex h-full items-center justify-center p-4">
            <EmptyState message="No ATM locations to plot" />
          </div>
        ) : (
          <div
            className="map-scan relative h-full min-h-[50vh] lg:min-h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgb(28 42 61 / 0.7) 1px, transparent 1px),
                linear-gradient(90deg, rgb(28 42 61 / 0.7) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
              backgroundColor: "#071018",
            }}
          >
            <p className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-accent/70">
              18.52°N 73.85°E · PUNE
            </p>
            {threats.map((threat) => {
              const selected = threat.id === selectedThreatId;
              const position = toPosition(threat.latitude, threat.longitude);
              const size =
                threat.risk === "CRITICAL"
                  ? "h-4 w-4"
                  : threat.risk === "HIGH"
                    ? "h-3.5 w-3.5"
                    : "h-3 w-3";

              return (
                <button
                  key={threat.id}
                  type="button"
                  aria-label={`${threat.risk} threat at ${threat.atm_id}`}
                  onClick={() => onSelectThreat(threat.id)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
                    selected
                      ? "border-white"
                      : "border-black/40"
                  } ${pinColor[threat.risk]} ${size} ${
                    threat.risk === "CRITICAL" ? "pulse-critical" : ""
                  }`}
                  style={position}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

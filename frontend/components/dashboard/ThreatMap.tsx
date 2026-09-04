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
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-500",
  MEDIUM: "bg-yellow-400",
  LOW: "bg-green-500",
};

const riskPriority: Record<RiskLevel, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

function getUniqueThreats(threats: Threat[]) {
  const grouped = new Map<string, Threat>();

  for (const threat of threats) {
    const key = threat.atm_id;

    const existing = grouped.get(key);

    if (!existing) {
      grouped.set(key, threat);
      continue;
    }

    if (riskPriority[threat.risk] > riskPriority[existing.risk]) {
      grouped.set(key, threat);
    }
  }

  return Array.from(grouped.values());
}

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
  const mapThreats = getUniqueThreats(threats);

  const criticalCount = threats.filter(
    (threat) => threat.risk === "CRITICAL",
  ).length;

  const highCount = threats.filter(
    (threat) => threat.risk === "HIGH",
  ).length;

  return (
    <section className="relative flex h-full min-h-[50vh] flex-col overflow-hidden rounded-lg border border-border bg-panel">
      {/* Map Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted">
            PUNE OPERATIONS MAP
          </h2>

          <p className="mt-1 text-[10px] text-muted">
            ATM RISK LOCATIONS · {mapThreats.length} LOCATIONS
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-critical" />
            CRITICAL {criticalCount}
          </span>

          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-high" />
            HIGH {highCount}
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="relative min-h-0 flex-1">
        {error ? (
          <div className="absolute inset-x-3 top-3 z-20">
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
            {/* Map coordinates */}
            <p className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[10px] tracking-[0.2em] text-accent/70">
              18.52°N 73.85°E · PUNE
            </p>

            <p className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[9px] text-muted">
              GEOSPATIAL THREAT VISUALIZATION
            </p>

            {/* North indicator */}
            <div className="pointer-events-none absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-black/40 font-mono text-sm text-muted">
              N
            </div>

            {/* ATM locations */}
            {mapThreats.map((threat) => {
              const selected = threat.id === selectedThreatId;
              const position = toPosition(
                threat.latitude,
                threat.longitude,
              );

              const size =
                threat.risk === "CRITICAL"
                  ? "h-5 w-5"
                  : threat.risk === "HIGH"
                    ? "h-4 w-4"
                    : "h-3.5 w-3.5";

              return (
                <button
                  key={threat.atm_id}
                  type="button"
                  aria-label={`${threat.risk} threat at ${threat.atm_id}`}
                  title={`${threat.atm_id} · ${threat.risk}`}
                  onClick={() => onSelectThreat(threat.id)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform hover:scale-125 ${
                    selected
                      ? "border-white ring-4 ring-white/30"
                      : "border-black/50"
                  } ${pinColor[threat.risk]} ${size} ${
                    threat.risk === "CRITICAL"
                      ? "pulse-critical"
                      : ""
                  }`}
                  style={position}
                />
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-3 right-3 z-10 rounded-lg border border-border bg-black/70 p-3 text-[10px]">
              <p className="mb-2 font-semibold text-white">
                RISK LEGEND
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-critical" />
                  <span className="text-muted">
                    Critical
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-high" />
                  <span className="text-muted">
                    High
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-medium" />
                  <span className="text-muted">
                    Medium
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-low" />
                  <span className="text-muted">
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
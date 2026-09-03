import type { Threat } from "@/lib/types";
import { EmptyState, ErrorBanner, LoadingSkeleton } from "./PanelStates";
import { ThreatListItem } from "./ThreatListItem";

export function ThreatSidebar({
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
  const sorted = [...threats].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-border bg-panel">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted">
          INCOMING THREATS
        </h2>
        <span className="font-mono text-[11px] text-muted">{sorted.length}</span>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
        {error ? <ErrorBanner message={error} /> : null}
        {isLoading ? (
          <LoadingSkeleton />
        ) : sorted.length === 0 ? (
          <EmptyState message="No active cash-withdrawal threats" />
        ) : (
          sorted.map((threat) => (
            <ThreatListItem
              key={threat.id}
              threat={threat}
              selected={threat.id === selectedThreatId}
              onSelect={onSelectThreat}
            />
          ))
        )}
      </div>
    </section>
  );
}

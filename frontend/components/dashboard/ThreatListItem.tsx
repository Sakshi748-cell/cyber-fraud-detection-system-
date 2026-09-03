import { formatAmount, formatRelativeTime } from "@/lib/format";
import type { Threat } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";

export function ThreatListItem({
  threat,
  selected,
  onSelect,
}: {
  threat: Threat;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(threat.id)}
      className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors ${
        selected
          ? "border-accent/50 bg-accent/10"
          : "border-border bg-panel-raised hover:border-accent/30 hover:bg-panel"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <RiskBadge risk={threat.risk} />
        <span className="font-mono text-[10px] text-muted">
          {formatRelativeTime(threat.timestamp)}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-xs tracking-wide text-foreground">
        {threat.atm_id}
      </p>
      <p className="mt-0.5 text-sm font-medium text-foreground">
        {formatAmount(threat.amount)}
      </p>
    </button>
  );
}

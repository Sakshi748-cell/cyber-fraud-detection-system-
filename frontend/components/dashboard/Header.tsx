import { ConnectionStatus } from "./ConnectionStatus";
import type { FeedStatus } from "@/hooks/useThreats";

export function Header({ status }: { status: FeedStatus }) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-panel px-4 py-3 lg:px-6">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-accent">
            SIH26184
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.16em] text-muted sm:inline">
            PUNE SECTOR
          </span>
        </div>
        <h1 className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
          Predictive Cybercrime Cash-Withdrawal Forecasting
        </h1>
        <p className="truncate text-xs text-muted">
          Pune ATM withdrawal intelligence
        </p>
      </div>
      <ConnectionStatus status={status} />
    </header>
  );
}

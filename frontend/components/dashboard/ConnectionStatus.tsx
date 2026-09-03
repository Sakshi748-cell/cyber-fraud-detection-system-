import type { FeedStatus } from "@/hooks/useThreats";

const labels: Record<FeedStatus, string> = {
  mock: "MOCK FEED",
  connecting: "CONNECTING",
  live: "LIVE",
  error: "FEED ERROR",
};

const dots: Record<FeedStatus, string> = {
  mock: "bg-accent",
  connecting: "bg-medium animate-pulse",
  live: "bg-emerald-400",
  error: "bg-critical",
};

export function ConnectionStatus({ status }: { status: FeedStatus }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-border bg-panel-raised px-3 py-1.5"
      aria-live="polite"
    >
      <span className={`h-2 w-2 rounded-full ${dots[status]}`} />
      <span className="font-mono text-[11px] tracking-[0.16em] text-muted">
        {labels[status]}
      </span>
    </div>
  );
}

import { formatAmount } from "@/lib/format";
import type { Threat } from "@/lib/types";

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-panel px-3 py-3 lg:px-4">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted">
        {label}
      </p>
      <p className={`mt-1 text-xl font-semibold tabular-nums ${accent ?? "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

export function StatsBar({
  threats,
  isLoading,
}: {
  threats: Threat[];
  isLoading: boolean;
}) {
  const total = threats.length;
  const critical = threats.filter((threat) => threat.risk === "CRITICAL").length;
  const high = threats.filter((threat) => threat.risk === "HIGH").length;
  const flagged = threats.reduce((sum, threat) => sum + threat.amount, 0);

  if (isLoading) {
    return (
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {["TOTAL THREATS", "CRITICAL", "HIGH", "FLAGGED AMOUNT"].map((label) => (
          <StatCard key={label} label={label} value="—" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="TOTAL THREATS" value={String(total)} />
      <StatCard
        label="CRITICAL"
        value={String(critical)}
        accent="text-critical"
      />
      <StatCard label="HIGH" value={String(high)} accent="text-high" />
      <StatCard
        label="FLAGGED AMOUNT"
        value={formatAmount(flagged)}
        accent="text-accent"
      />
    </section>
  );
}

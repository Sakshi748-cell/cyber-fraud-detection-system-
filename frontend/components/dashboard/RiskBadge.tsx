import type { RiskLevel } from "@/lib/types";

const styles: Record<RiskLevel, string> = {
  CRITICAL: "border-critical/50 bg-critical/15 text-critical",
  HIGH: "border-high/50 bg-high/15 text-high",
  MEDIUM: "border-medium/50 bg-medium/15 text-medium",
  LOW: "border-low/50 bg-low/15 text-low",
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] ${styles[risk]}`}
    >
      {risk}
    </span>
  );
}

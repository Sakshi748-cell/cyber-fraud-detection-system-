import { formatAmount, formatTimestamp } from "@/lib/format";
import type { Threat } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border py-2 first:border-t-0">
      <dt className="font-mono text-[10px] tracking-[0.14em] text-muted">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function ThreatDetail({ threat }: { threat: Threat | null }) {
  return (
    <section className="rounded-lg border border-border bg-panel px-3 py-3">
      <h2 className="mb-2 font-mono text-[11px] tracking-[0.16em] text-muted">
        THREAT DETAILS
      </h2>
      {threat ? (
        <dl>
          <div className="mb-2 flex items-center justify-between gap-2">
            <RiskBadge risk={threat.risk} />
          </div>
          <Field label="THREAT ID" value={threat.id} />
          <Field label="ATM ID" value={threat.atm_id} />
          <Field label="AMOUNT" value={formatAmount(threat.amount)} />
          <Field label="RISK LEVEL" value={threat.risk} />
          <Field label="TIMESTAMP" value={formatTimestamp(threat.timestamp)} />
        </dl>
      ) : (
        <p className="py-4 text-sm text-muted">
          Select an ATM alert to inspect.
        </p>
      )}
    </section>
  );
}

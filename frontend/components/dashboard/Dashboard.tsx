"use client";

import { useMemo, useState } from "react";
import { ROLE_LABELS, hasPermission, type UserRole } from "@/lib/security/rbac";
import { useThreats } from "@/hooks/useThreats";
import { dispatchInterception } from "@/lib/dispatch";
import { DispatchButton, type DispatchUiStatus } from "./DispatchButton";
import { Header } from "./Header";
import { StatsBar } from "./StatsBar";
import { ThreatDetail } from "./ThreatDetail";
import { ThreatMap } from "./ThreatMap";
import { ThreatSidebar } from "./ThreatSidebar";

export function Dashboard() {
  const { threats, status, isLoading, error } = useThreats();
  const [selectedThreatId, setSelectedThreatId] = useState<string | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<DispatchUiStatus>("idle");
  const [dispatchError, setDispatchError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("POLICE_INVESTIGATOR");
  const canDispatch = hasPermission(selectedRole, "dispatch:create");

  const selectedThreat = useMemo(
    () => threats.find((threat) => threat.id === selectedThreatId) ?? null,
    [threats, selectedThreatId],
  );

  function handleSelect(id: string) {
    setSelectedThreatId(id);
    setDispatchStatus("idle");
    setDispatchError(null);
  }

  async function handleDispatch() {
    if (!selectedThreat || dispatchStatus === "loading") {
      return;
    }

    setDispatchStatus("loading");
    setDispatchError(null);

    const result = await dispatchInterception(selectedThreat);
    if (result.ok) {
      setDispatchStatus("success");
      return;
    }

    setDispatchStatus("error");
    setDispatchError(result.message);
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header status={status} />
      <div className="flex items-center justify-between rounded-lg border bg-card p-3">
  <div>
    <p className="text-sm font-medium">Security Role</p>
    <p className="text-xs text-muted-foreground">
      {ROLE_LABELS[selectedRole]}
    </p>
  </div>

  <select
    value={selectedRole}
    onChange={(event) => setSelectedRole(event.target.value as UserRole)}
    className="rounded-md border bg-background px-3 py-2 text-sm"
  >
    {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
      <option key={role} value={role}>
        {ROLE_LABELS[role]}
      </option>
    ))}
  </select>
</div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 lg:overflow-hidden lg:p-4">
        <StatsBar threats={threats} isLoading={isLoading} />
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)] lg:overflow-z">
        <aside className="order-1 flex min-h-[400px] flex-col gap-3 lg:order-2 lg:min-h-0 lg:overflow-y-auto">
            <ThreatSidebar
              threats={threats}
              selectedThreatId={selectedThreatId}
              onSelectThreat={handleSelect}
              isLoading={isLoading}
              error={error}
            />
            <ThreatDetail threat={selectedThreat} />
            {canDispatch ? (
  <DispatchButton
    threat={selectedThreat}
    status={dispatchStatus}
    error={dispatchError}
    onDispatch={handleDispatch}
  />
) : (
  <div className="rounded-lg border bg-card p-3 text-sm">
    <p className="font-medium">Dispatch Access Restricted</p>
    <p className="text-xs text-muted-foreground">
      {ROLE_LABELS[selectedRole]} does not have permission to dispatch an interception unit.
    </p>
  </div>
)}
          </aside>
          <div className="order-2 min-h-0 h-full lg:order-1">
            <ThreatMap
              threats={threats}
              selectedThreatId={selectedThreatId}
              onSelectThreat={handleSelect}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

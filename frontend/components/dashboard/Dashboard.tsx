"use client";

import { useMemo, useState } from "react";
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
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 lg:overflow-hidden lg:p-4">
        <StatsBar threats={threats} isLoading={isLoading} />
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)] lg:overflow-hidden">
          <aside className="order-1 flex min-h-0 flex-col gap-3 lg:order-2 lg:overflow-y-auto">
            <ThreatSidebar
              threats={threats}
              selectedThreatId={selectedThreatId}
              onSelectThreat={handleSelect}
              isLoading={isLoading}
              error={error}
            />
            <ThreatDetail threat={selectedThreat} />
            <DispatchButton
              threat={selectedThreat}
              status={dispatchStatus}
              error={dispatchError}
              onDispatch={handleDispatch}
            />
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

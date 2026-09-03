"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useCommandCoreSocket } from "@/hooks/useCommandCoreSocket";
import { useThreats } from "@/hooks/useThreats";
import { dispatchInterception } from "@/lib/dispatch";
import {
  ROLE_LABELS,
  hasPermission,
  type UserRole,
} from "@/lib/security/rbac";

import { DispatchButton, type DispatchUiStatus } from "./DispatchButton";
import { Header } from "./Header";
import { StatsBar } from "./StatsBar";
import { ThreatDetail } from "./ThreatDetail";
import { ThreatMap } from "./ThreatMap";
import { ThreatSidebar } from "./ThreatSidebar";

export function Dashboard() {
  useCommandCoreSocket();

  const { threats, status, isLoading, error } = useThreats();

  const [selectedThreatId, setSelectedThreatId] = useState<string | null>(
    null,
  );

  const [dispatchStatus, setDispatchStatus] =
    useState<DispatchUiStatus>("idle");

  const [dispatchError, setDispatchError] = useState<string | null>(null);

  const [selectedRole, setSelectedRole] = useState<UserRole>(
    "POLICE_INVESTIGATOR",
  );

  const canDispatch = hasPermission(
    selectedRole,
    "dispatch:create",
  );

  const selectedThreat = useMemo(
    () =>
      threats.find(
        (threat) => threat.id === selectedThreatId,
      ) ?? null,
    [threats, selectedThreatId],
  );

  useEffect(() => {
    const hasCriticalThreat = threats.some(
      (threat) => threat.risk === "CRITICAL",
    );

    if (hasCriticalThreat) {
      toast.error("🚨 SPATIAL ANOMALY DETECTED", {
        position: "top-right",
        style: {
          background: "#111827",
          color: "#ffffff",
          border: "1px solid #ef4444",
        },
      });
    }
  }, [threats]);

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

      toast.success(
        "✔ Interception Unit Dispatched via Twilio",
      );

      return;
    }

    setDispatchStatus("error");
    setDispatchError(result.message);
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header status={status} />

      {/* Security Role */}
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
        <div>
          <p className="text-sm font-medium">
            Security Role
          </p>

          <p className="text-xs text-muted-foreground">
            {ROLE_LABELS[selectedRole]}
          </p>
        </div>

        <select
          value={selectedRole}
          onChange={(event) =>
            setSelectedRole(
              event.target.value as UserRole,
            )
          }
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          {(Object.keys(ROLE_LABELS) as UserRole[]).map(
            (role) => (
              <option key={role} value={role}>
                {ROLE_LABELS[role]}
              </option>
            ),
          )}
        </select>
      </div>

      {/* Main Dashboard */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 lg:overflow-hidden lg:p-4">
        {/* Security Status */}
        <div className="rounded-lg border bg-card p-3">
          <p className="mb-2 text-sm font-semibold">
            Security Status
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-5">
            <div className="rounded-md border p-2">
              🔐 RBAC Active
            </div>

            <div className="rounded-md border p-2">
              🛡️ API Security
            </div>

            <div className="rounded-md border p-2">
              🔎 Audit Logging
            </div>

            <div className="rounded-md border p-2">
              #️⃣ SHA-256 Integrity
            </div>

            <div className="rounded-md border p-2">
              👤 Role Protected
            </div>
          </div>
        </div>

        

        {/* Audit Log */}
        <div className="rounded-lg border bg-card p-3">
          <p className="mb-2 text-sm font-semibold">
            Audit Log
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between gap-3 rounded-md border p-2">
              <span>Threat data accessed</span>
              <span className="text-muted-foreground">
                {ROLE_LABELS[selectedRole]}
              </span>
            </div>

            <div className="flex justify-between gap-3 rounded-md border p-2">
              <span>Security role verified</span>
              <span className="text-muted-foreground">
                RBAC
              </span>
            </div>

            <div className="flex justify-between gap-3 rounded-md border p-2">
              <span>Evidence integrity checked</span>
              <span className="text-muted-foreground">
                SHA-256
              </span>
            </div>
          </div>
        </div>

        <StatsBar
          threats={threats}
          isLoading={isLoading}
        
      
          
        />

        {/* Map + Threat List */}
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
          
          {/* Map */}
          <div className="order-2 min-h-[500px] lg:order-1 lg:min-h-0">
            <ThreatMap
              threats={threats}
              selectedThreatId={selectedThreatId}
              onSelectThreat={handleSelect}
              isLoading={isLoading}
              error={error}
            />
          </div>

          {/* Threat List / Details */}
          <aside className="order-1 flex min-h-[400px] flex-col gap-3 overflow-y-auto lg:order-2 lg:min-h-0">
            
            <ThreatSidebar
              threats={threats}
              selectedThreatId={selectedThreatId}
              onSelectThreat={handleSelect}
              isLoading={isLoading}
              error={error}
            />

            <ThreatDetail
              threat={selectedThreat}
            />

            {/* Dispatch Security Check */}
            {canDispatch ? (
              <DispatchButton
                threat={selectedThreat}
                status={dispatchStatus}
                error={dispatchError}
                onDispatch={handleDispatch}
              />
            ) : (
              <div className="rounded-lg border bg-card p-3 text-sm">
                <p className="font-medium">
                  Dispatch Access Restricted
                </p>

                <p className="text-xs text-muted-foreground">
                  {ROLE_LABELS[selectedRole]} does not
                  have permission to dispatch an
                  interception unit.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
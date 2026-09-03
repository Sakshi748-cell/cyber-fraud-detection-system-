"use client";

import { useEffect, useState } from "react";
import { loadCsvThreats } from "@/lib/csv-threats";
import { MOCK_THREATS } from "@/lib/mock-threats";
import type { Threat } from "@/lib/types";

export type FeedStatus = "mock" | "connecting" | "live" | "error";

export interface UseThreatsResult {
  threats: Threat[];
  status: FeedStatus;
  isLoading: boolean;
  error: string | null;
}

export function useThreats(): UseThreatsResult {
  const [threats, setThreats] = useState<Threat[]>(MOCK_THREATS);
  const [status, setStatus] = useState<FeedStatus>("mock");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadThreatData() {
      try {
        setStatus("connecting");

        const csvThreats = await loadCsvThreats();

        if (cancelled) {
          return;
        }

        setThreats(csvThreats.length > 0 ? csvThreats : MOCK_THREATS);
        setStatus(csvThreats.length > 0 ? "live" : "mock");
        setError(null);
      } catch {
        if (cancelled) {
          return;
        }

        setThreats(MOCK_THREATS);
        setStatus("mock");
        setError("CSV threat data unavailable. Using demo data.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadThreatData();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    threats,
    status,
    isLoading,
    error,
  };
}
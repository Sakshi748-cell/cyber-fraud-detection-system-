"use client";

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
  return {
    threats: MOCK_THREATS,
    status: "mock",
    isLoading: false,
    error: null,
  };
}

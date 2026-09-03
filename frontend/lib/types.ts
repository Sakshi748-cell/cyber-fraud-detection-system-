export type RiskLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface Threat {
  id: string;
  atm_id: string;
  latitude: number;
  longitude: number;
  amount: number;
  risk: RiskLevel;
  timestamp: string;
}

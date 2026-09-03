import type { Threat } from "./types";

export const MOCK_THREATS: Threat[] = [
  {
    id: "thr-001",
    atm_id: "PNQ-SBI-0142",
    latitude: 18.5289,
    longitude: 73.8746,
    amount: 485000,
    risk: "CRITICAL",
    timestamp: "2026-09-03T08:14:00+05:30",
  },
  {
    id: "thr-002",
    atm_id: "PNQ-HDFC-2218",
    latitude: 18.5913,
    longitude: 73.7389,
    amount: 275000,
    risk: "HIGH",
    timestamp: "2026-09-03T07:51:00+05:30",
  },
  {
    id: "thr-003",
    atm_id: "PNQ-ICICI-0904",
    latitude: 18.5362,
    longitude: 73.8938,
    amount: 190000,
    risk: "HIGH",
    timestamp: "2026-09-03T07:22:00+05:30",
  },
  {
    id: "thr-004",
    atm_id: "PNQ-BOB-1176",
    latitude: 18.5074,
    longitude: 73.8077,
    amount: 85000,
    risk: "MEDIUM",
    timestamp: "2026-09-03T06:48:00+05:30",
  },
  {
    id: "thr-005",
    atm_id: "PNQ-AXIS-3341",
    latitude: 18.5089,
    longitude: 73.9259,
    amount: 24000,
    risk: "LOW",
    timestamp: "2026-09-03T06:05:00+05:30",
  },
];
